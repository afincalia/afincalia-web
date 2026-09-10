import type { NextApiRequest, NextApiResponse } from 'next';
import { allowedLeadOrigin, db, fingerprint, notifyLead, PRIVACY_VERSION, rateHash, ready, validateLead } from '../../lib/leads';

export const config = { api: { bodyParser: { sizeLimit: '12kb' } } };
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ available: ready() });
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'method_not_allowed' }); }
  if (!allowedLeadOrigin(req.headers.origin)) return res.status(403).json({ error: 'origin_rejected' });
  if (!ready()) return res.status(503).json({ error: 'unavailable' });
  if (!String(req.headers['content-type']).startsWith('application/json')) return res.status(415).json({ error: 'invalid_content_type' });
  const { lead, errors } = validateLead(req.body);
  if (!lead) return res.status(422).json({ error: 'validation', errors });
  if (lead.website) return res.status(422).json({ error: 'validation' });
  try {
    const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
    const result = await db('rpc/submit_commercial_lead', { payload: { ...lead, website: undefined, privacy_version: PRIVACY_VERSION }, dedup_hash: fingerprint(lead), rate_key: rateHash(ip) });
    if (result.limited) { res.setHeader('Retry-After','600'); return res.status(429).json({ error: 'rate_limited' }); }
    const row = result.lead;
    if (!row?.id) throw new Error('storage_unavailable');
    let notified = false;
    try { notified = await notifyLead(row); } catch { /* Durable row remains in the outbox for retry. */ }
    if (!notified) console.error(JSON.stringify({ event: 'lead_notification_pending', leadId: row.id }));
    return res.status(201).json({ ok: true, reference: row.id });
  } catch {
    console.error(JSON.stringify({ event: 'lead_storage_error' }));
    return res.status(503).json({ error: 'storage_unavailable' });
  }
}
