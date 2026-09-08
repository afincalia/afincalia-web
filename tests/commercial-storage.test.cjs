const { test } = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { mkdtempSync, readFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { PGlite } = require('@electric-sql/pglite');
const handler = require('../.test-build/pages/api/leads.js').default;

test('commercial API with product SQL, durable PostgreSQL and simulated email transport', async ctx => {
  const directory = mkdtempSync(join(tmpdir(), 'afincalia-leads-pg-'));
  let db = await PGlite.create(directory);
  const previousFetch = global.fetch;
  const previousEnv = { ...process.env };
  let emailUnavailable = false;
  const acceptedEmails = new Map();
  const rowCount = async () => (await db.query('select count(*)::int as n from commercial_leads')).rows[0].n;
  const payload = () => ({ name: 'Prueba controlada', company: 'Despacho QA', email: 'qa@example.invalid', phone: '', communities: '25', message: 'Solicitud de prueba', interest: 'piloto', source: '/demo', consent: true, requestId: randomUUID() });
  async function submit(body) {
    const res = { code: 200, body: null, setHeader() {}, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; }, end() { return this; } };
    await handler({ method: 'POST', headers: { origin: 'https://afincalia.es', 'content-type': 'application/json' }, body, socket: { remoteAddress: '192.0.2.25' } }, res);
    return res;
  }
  try {
    await db.exec('create role anon; create role authenticated; create role service_role bypassrls;');
    await db.exec(readFileSync('db/commercial-leads.sql', 'utf8'));
    await db.exec('set role service_role');
    for (const key of ['AFINCALIA_LEGAL_NAME', 'AFINCALIA_TAX_ID', 'AFINCALIA_LEGAL_ADDRESS', 'AFINCALIA_LEAD_RETENTION', 'SUPABASE_SECRET_KEY', 'RESEND_API_KEY', 'AFINCALIA_EMAIL_FROM', 'LEAD_RATE_SECRET', 'CRON_SECRET']) process.env[key] = 'controlled-test-only';
    process.env.SUPABASE_URL = 'https://controlled.example.invalid';
    process.env.LEADS_ENABLED = 'true';
    global.fetch = async (url, options) => {
      const body = JSON.parse(options.body);
      if (url === 'https://api.resend.com/emails') {
        // This is the only simulated external side effect; SQL below is not mocked.
        assert.ok(await rowCount() > 0, 'lead must exist before notification');
        if (emailUnavailable) return new Response('{}', { status: 503 });
        const key = options.headers['Idempotency-Key'];
        if (!acceptedEmails.has(key)) acceptedEmails.set(key, randomUUID());
        return new Response(JSON.stringify({ id: acceptedEmails.get(key) }));
      }
      if (url.endsWith('/rest/v1/rpc/submit_commercial_lead')) {
        try {
          const result = await db.query('select submit_commercial_lead($1::jsonb,$2,$3) as value', [JSON.stringify(body.payload), body.dedup_hash, body.rate_key]);
          return new Response(JSON.stringify(result.rows[0].value));
        } catch { return new Response('{}', { status: 503 }); }
      }
      const match = /^https:\/\/controlled\.example\.invalid\/rest\/v1\/commercial_leads\?id=eq\.([0-9a-f-]+)$/.exec(url);
      assert.ok(match && options.method === 'PATCH', 'unexpected request must not reach network');
      const result = await db.query('update commercial_leads set notified_at=$1,notification_id=$2 where id=$3 returning id', [body.notified_at, body.notification_id, match[1]]);
      return new Response(JSON.stringify(result.rows));
    };
    await ctx.test('valid request persists before notification and returns its durable reference', async () => {
      const result = await submit(payload());
      assert.equal(result.code, 201);
      const row = (await db.query('select * from commercial_leads where id=$1', [result.body.reference])).rows[0];
      assert.equal(row.email, 'qa@example.invalid');assert.equal(row.source, '/demo');
      assert.ok(row.consent_at);assert.ok(row.notified_at);assert.ok(row.notification_id);
      assert.equal(acceptedEmails.size, 1);
    });
    await ctx.test('immediate parallel clicks and a new request ID reuse one lead and notification key', async () => {
      const p = payload();p.message = 'Duplicado controlado';
      const beforeRows = await rowCount();const beforeEmails = acceptedEmails.size;
      const replies = await Promise.all([submit(p), submit(p), submit({ ...p, requestId: randomUUID() })]);
      assert.ok(replies.every(r => r.code === 201));
      assert.equal(new Set(replies.map(r => r.body.reference)).size, 1);
      assert.equal(await rowCount(), beforeRows + 1);assert.equal(acceptedEmails.size, beforeEmails + 1);
    });
    await ctx.test('failed notification survives database reopen and is retried against the same lead', async () => {
      const p = payload();p.message = 'Fallo de email controlado';emailUnavailable = true;
      const first = await submit(p);assert.equal(first.code, 201);
      assert.equal((await db.query('select notified_at from commercial_leads where id=$1', [first.body.reference])).rows[0].notified_at, null);
      const before = await rowCount();await db.close();db = await PGlite.create(directory);await db.exec('set role service_role');
      emailUnavailable = false;
      const second = await submit(p);assert.equal(second.code, 201);assert.equal(second.body.reference, first.body.reference);
      assert.equal(await rowCount(), before);
      assert.ok((await db.query('select notified_at from commercial_leads where id=$1', [first.body.reference])).rows[0].notified_at);
    });
    await ctx.test('invalid email or consent never creates a row; SQL also enforces consent', async () => {
      const before = await rowCount();
      assert.equal((await submit({ ...payload(), email: 'invalid' })).code, 422);
      assert.equal((await submit({ ...payload(), consent: false })).code, 422);
      await assert.rejects(db.query('select submit_commercial_lead($1::jsonb,$2,$3)', [JSON.stringify({ ...payload(), consent: false }), 'controlled-hash', 'controlled-rate']), /privacy acknowledgement required/);
      assert.equal(await rowCount(), before);
    });
    await ctx.test('anon and authenticated cannot enumerate, read, insert, edit, delete or invoke private RPCs', async () => {
      const before = await rowCount();
      for (const role of ['anon', 'authenticated']) {
        await db.exec(`reset role; set role ${role}`);
        for (const table of ['commercial_leads', 'commercial_rate_limits', 'commercial_events']) {
          for (const query of [`select * from ${table}`, `select count(*) from ${table}`, `delete from ${table}`, `insert into ${table} default values`]) {
            await assert.rejects(db.query(query), error => error.code === '42501');
          }
        }
        await assert.rejects(db.query("update commercial_leads set name='forbidden'"), error => error.code === '42501');
        await assert.rejects(db.query("select submit_commercial_lead('{}'::jsonb,'x','x')"), error => error.code === '42501');
        await assert.rejects(db.query("select count_commercial_event('form_success','/demo')"), error => error.code === '42501');
      }
      await db.exec('reset role; set role service_role');assert.equal(await rowCount(), before);
      const policies = (await db.query("select relrowsecurity from pg_class where relname in ('commercial_leads','commercial_rate_limits','commercial_events') and relnamespace='public'::regnamespace")).rows;
      assert.equal(policies.length, 3);assert.ok(policies.every(r => r.relrowsecurity));
    });
  } finally {
    global.fetch = previousFetch;
    for (const key of Object.keys(process.env)) if (!(key in previousEnv)) delete process.env[key];
    Object.assign(process.env, previousEnv);
    await db.close();rmSync(directory, { recursive: true, force: true });
  }
});
