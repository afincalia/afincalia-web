import type { NextApiRequest, NextApiResponse } from 'next';
import { db, notifyLead, ready, NOTIFICATION_RETRY_WINDOW_MS, leadNotificationSourceFilter } from '../../lib/leads';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control','no-store');
  if (req.method !== 'GET') return res.status(405).end();
  if (!process.env.CRON_SECRET || req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) return res.status(401).end();
  if (!ready()) return res.status(503).json({ error: 'unavailable' });
  try {
    const cutoff = encodeURIComponent(new Date(Date.now() - NOTIFICATION_RETRY_WINDOW_MS).toISOString());
    const scope = leadNotificationSourceFilter();
    const expired = await db(`commercial_leads?${scope}&select=id&notified_at=is.null&created_at=lte.${cutoff}&limit=1`, undefined, 'GET');
    const needsReconciliation = expired.length > 0;
    if (needsReconciliation) console.error(JSON.stringify({ event: 'lead_notification_reconciliation_required', leadId: expired[0].id }));
    // Old uncertain leads remain durable; they must not starve recent requests.
    const rows = await db(`commercial_leads?${scope}&notified_at=is.null&created_at=gt.${cutoff}&order=created_at.asc&limit=5`, undefined, 'GET');
    let sent = 0;
    for (const row of rows) { try { if (await notifyLead(row)) sent++; } catch { /* Retry on next invocation. */ } }
    return res.status(sent === rows.length && !needsReconciliation ? 200 : 503).json({ sent, pending: rows.length - sent, reconciliationRequired: needsReconciliation });
  } catch { return res.status(503).json({ error: 'notification_retry_failed' }); }
}
