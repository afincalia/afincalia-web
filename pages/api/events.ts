import type { NextApiRequest, NextApiResponse } from 'next';
import { db, sourcePath } from '../../lib/leads';
const events = ['cta_click', 'form_open', 'form_start', 'form_success', 'form_error'];
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'POST') return res.status(405).end();
  if (req.headers.origin !== 'https://afincalia.es') return res.status(403).end();
  if (process.env.CONVERSION_ANALYTICS_ENABLED !== 'true') return res.status(204).end();
  if (!events.includes(req.body?.event)) return res.status(422).end();
  try { await db('rpc/count_commercial_event', { event_name: req.body.event, source_path: sourcePath(req.body.source) }); return res.status(204).end(); }
  catch { console.error(JSON.stringify({ event: 'conversion_counter_failed' })); return res.status(503).end(); }
}
export const config = { api: { bodyParser: { sizeLimit: '1kb' } } };
