import type { NextApiRequest, NextApiResponse } from 'next';
import { db, notifyLead, ready } from '../../lib/leads';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'GET') return res.status(405).end();
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).end();
  if (!ready()) return res.status(503).json({ error: 'unavailable' });
  try {
    const rows = await db('commercial_leads?notified_at=is.null&order=created_at.asc&limit=5', undefined, 'GET');
    let sent = 0;
    for (const row of rows) { try { if (await notifyLead(row)) sent++; } catch { /* Retry on next invocation. */ } }
    return res.status(sent === rows.length ? 200 : 503).json({ sent, pending: rows.length - sent });
  } catch { return res.status(503).json({ error: 'notification_retry_failed' }); }
}
