import { createHash, createHmac } from 'node:crypto';

export const PRIVACY_VERSION = '2026-09-08';
// Resend retains idempotency keys for 24 hours. Stop conservatively before expiry.
// Creation predates every possible attempt, so this bound needs no second outbox.
export const NOTIFICATION_RETRY_WINDOW_MS = 23 * 60 * 60 * 1000;
export type Lead = { name: string; company: string; email: string; phone: string; communities: string; message: string; interest: string; source: string; consent: boolean; website?: string; requestId: string };
export function allowedLeadOrigin(origin: unknown): boolean {
  if (origin === 'https://afincalia.es') return true;
  if (process.env.NODE_ENV === 'development' && origin === 'http://localhost:3000') return true;
  // A single operator-selected origin, never a wildcard or a client-supplied Host.
  if (process.env.VERCEL_ENV !== 'preview' || process.env.VERCEL_GIT_COMMIT_REF !== 'codex/validacion-formulario') return false;
  const configured = process.env.LEAD_PREVIEW_ORIGIN?.trim();
  if (!configured || origin !== configured) return false;
  try {
    const url = new URL(configured);
    return url.protocol === 'https:' && url.origin === configured && !url.username && !url.password && !url.port && url.hostname.endsWith('.vercel.app');
  } catch { return false; }
}
export function sourcePath(value: unknown): string {
  if (typeof value !== 'string') return '/';
  const path = value.split(/[?#]/)[0];
  return /^\/(?:[a-z0-9/-]{0,100})$/.test(path) ? path : '/';
}
export function validateLead(input: unknown): { lead?: Lead; errors: Record<string, string> } {
  const b = input && typeof input === 'object' && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const str = (key: string) => typeof b[key] === 'string' ? (b[key] as string).trim() : '';
  const lead: Lead = { name: str('name'), company: str('company'), email: str('email').toLowerCase(), phone: str('phone'), communities: str('communities'), message: str('message'), interest: str('interest') || 'demo', source: sourcePath(b.source), consent: b.consent === true, website: str('website'), requestId: str('requestId') };
  const errors: Record<string, string> = {};
  if (lead.name.length < 2 || lead.name.length > 100) errors.name = 'Introduce tu nombre (entre 2 y 100 caracteres).';
  if (lead.company.length < 2 || lead.company.length > 160) errors.company = 'Introduce el nombre del despacho.';
  if (lead.email.length > 254 || !/^[^\s@\x00-\x1f]+@[^\s@\x00-\x1f]+\.[^\s@\x00-\x1f]+$/.test(lead.email)) errors.email = 'Introduce un email válido.';
  if (lead.phone && !/^[+0-9 ()-]{6,30}$/.test(lead.phone)) errors.phone = 'Revisa el teléfono o déjalo vacío.';
  if (lead.communities && !/^(0|[1-9][0-9]{0,4})$/.test(lead.communities)) errors.communities = 'Indica un número aproximado o deja el campo vacío.';
  if (lead.message.length > 3000) errors.message = 'El mensaje puede tener hasta 3.000 caracteres.';
  if (!['demo', 'piloto'].includes(lead.interest)) errors.interest = 'Selecciona demo o piloto.';
  if (!lead.consent) errors.consent = 'Confirma que has leído la política de privacidad.';
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(lead.requestId)) errors.requestId = 'Recarga la página antes de enviar.';
  return Object.keys(errors).length ? { errors } : { lead, errors };
}
export function legalConfig() {
  return { name: process.env.AFINCALIA_LEGAL_NAME?.trim() || '', taxId: process.env.AFINCALIA_TAX_ID?.trim() || '', address: process.env.AFINCALIA_LEGAL_ADDRESS?.trim() || '', retention: process.env.AFINCALIA_LEAD_RETENTION?.trim() || '' };
}
export function ready() {
  const l = legalConfig();
  return process.env.LEADS_ENABLED === 'true' && !!(l.name && l.taxId && l.address && l.retention && process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY && process.env.RESEND_API_KEY && process.env.AFINCALIA_EMAIL_FROM && process.env.LEAD_RATE_SECRET && process.env.CRON_SECRET);
}
export async function db(path: string, body?: unknown, method = 'POST') {
  const key = process.env.SUPABASE_SECRET_KEY || '';
  const headers: Record<string,string> = { apikey: key, 'Content-Type': 'application/json', Prefer: 'return=representation' };
  if (!key.startsWith('sb_secret_')) headers.Authorization = `Bearer ${key}`;
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('storage_unavailable');
  return response.status === 204 ? null : response.json();
}
export function rateHash(ip: string) {
  return createHmac('sha256', process.env.LEAD_RATE_SECRET || '').update(`${new Date().toISOString().slice(0,10)}:${ip}`).digest('hex');
}
export function fingerprint(lead: Lead) {
  return createHash('sha256').update(JSON.stringify([lead.email, lead.company.toLowerCase(), lead.interest, lead.message, lead.name, lead.phone, lead.communities])).digest('hex');
}
export async function notifyLead(row: Record<string, any>): Promise<boolean> {
  if (row.notified_at) return true;
  const created = Date.parse(row.created_at);
  const age = Date.now() - created;
  if (!Number.isFinite(age) || age < 0 || age >= NOTIFICATION_RETRY_WINDOW_MS) {
    console.error(JSON.stringify({ event: 'lead_notification_reconciliation_required', leadId: row.id }));
    return false;
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', signal: AbortSignal.timeout(8000),
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `commercial-lead/${row.id}` },
    body: JSON.stringify({ from: process.env.AFINCALIA_EMAIL_FROM, to: ['hola@afincalia.es'], reply_to: row.email,
      subject: `Nueva solicitud de ${row.interest === 'piloto' ? 'piloto' : 'demo'} · AfincalIA`,
      text: `Referencia: ${row.id}\nNombre: ${row.name}\nDespacho: ${row.company}\nEmail: ${row.email}\nTeléfono: ${row.phone || 'No indicado'}\nComunidades: ${row.communities || 'No indicado'}\nOrigen: ${row.source}\n\n${row.message || ''}` })
  });
  if (!response.ok) return false;
  const result = await response.json();
  if (!result.id) return false;
  await db(`commercial_leads?id=eq.${encodeURIComponent(row.id)}`, { notified_at: new Date().toISOString(), notification_id: result.id }, 'PATCH');
  return true;
}
