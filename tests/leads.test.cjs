const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { validateLead, sourcePath, fingerprint, ready, notifyLead } = require('../.test-build/lib/leads.js');
const handler = require('../.test-build/pages/api/leads.js').default;
const originalFetch = global.fetch;
const originalEnv = {...process.env};
test('only the explicitly configured preview origin reaches the form backend',async()=>{
  enable();process.env.VERCEL_ENV='preview';process.env.VERCEL_GIT_COMMIT_REF='codex/validacion-formulario';
  const origin='https://afincalia-web-dxnf-controlled-afincalia.vercel.app';process.env.LEAD_PREVIEW_ORIGIN=origin;
  const calls=[];global.fetch=async(url)=>{calls.push(url);if(url.includes('/rpc/'))return new Response(JSON.stringify({lead:{...valid,id:'controlled-preview',created_at:new Date().toISOString()}}));if(url.includes('resend'))return new Response('{"id":"controlled-email"}');return new Response('[]');};
  assert.equal((await send(valid,{origin})).statusCode,201);
  assert.equal(calls.length,3);
  for(const other of ['https://another.vercel.app',origin+'.evil.example','null','',origin+'/'])assert.equal((await send(valid,{origin:other})).statusCode,403);
  assert.equal(calls.length,3);
});
test('preview permission fails closed in production, other branches and malformed configuration',async()=>{
  enable();const origin='https://afincalia-web-dxnf-controlled-afincalia.vercel.app';process.env.LEAD_PREVIEW_ORIGIN=origin;
  global.fetch=()=>{throw new Error('unexpected persistence');};
  for(const [environment,branch] of [['production','codex/validacion-formulario'],['preview','main'],['','codex/validacion-formulario']]){
    process.env.VERCEL_ENV=environment;process.env.VERCEL_GIT_COMMIT_REF=branch;
    assert.equal((await send(valid,{origin})).statusCode,403);
  }
  process.env.VERCEL_ENV='preview';process.env.VERCEL_GIT_COMMIT_REF='codex/validacion-formulario';
  for(const value of ['http://preview.vercel.app','https://preview.vercel.app:444','https://preview.vercel.app/path','https://user@preview.vercel.app','https://evil.example','*','']){
    process.env.LEAD_PREVIEW_ORIGIN=value;assert.equal((await send(valid,{origin:value})).statusCode,403);
  }
});
afterEach(() => { global.fetch = originalFetch; for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key]; Object.assign(process.env, originalEnv); });
const valid = {name:'Prueba QA', company:'Despacho de prueba', email:'qa@example.com',phone:'',communities:'25',message:'Prueba controlada',interest:'demo',source:'/precios?email=private', consent:true,requestId:'bb988fe0-41d3-4b9e-a734-524601c61b1e'};
function enable() { for(const key of ['AFINCALIA_LEGAL_NAME','AFINCALIA_TAX_ID','AFINCALIA_LEGAL_ADDRESS','AFINCALIA_LEAD_RETENTION','SUPABASE_URL','SUPABASE_SECRET_KEY','RESEND_API_KEY','AFINCALIA_EMAIL_FROM','LEAD_RATE_SECRET','CRON_SECRET']) process.env[key]='test-only'; process.env.SUPABASE_URL='https://example.supabase.co';process.env.LEADS_ENABLED='true'; }
function response() { return {statusCode:200,body:null,headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.statusCode=n;return this;},json(b){this.body=b;return this;},end(){return this;}}; }
async function send(body=valid,headers={}) { const r=response();await handler({method:'POST',headers:{origin:'https://afincalia.es','content-type':'application/json',...headers},body,socket:{remoteAddress:'192.0.2.1'}},r); return r; }
test('validates and normalizes a complete request without keeping query parameters',()=>{const r=validateLead({...valid,email:' QA@EXAMPLE.COM '});assert.deepEqual(r.errors,{});assert.equal(r.lead.email,'qa@example.com');assert.equal(r.lead.source,'/precios');});
test('rejects malformed, incomplete and oversized requests',()=>{for(const b of [null,[],{}, {...valid,email:'wrong'}, {...valid,name:' '}, {...valid,company:''},{...valid,consent:false},{...valid,consent:'true'},{...valid,communities:'-1'},{...valid,message:'x'.repeat(3001)},{...valid,requestId:'invalid'}])assert.ok(Object.keys(validateLead(b).errors).length);});
test('optional phone and community count can be omitted',()=>assert.deepEqual(validateLead({...valid,communities:'',phone:''}).errors,{}));
test('source refuses external URL and personal query strings',()=>{assert.equal(sourcePath('https://evil.example/'),'/');assert.equal(sourcePath('/precios?email=x#abc'),'/precios');});
test('same lead has stable fingerprint across immediate retry',()=>assert.equal(fingerprint(valid),fingerprint({...valid,requestId:'other',source:'/demo'})));
test('form activation requires legal data and infrastructure',()=>{enable();assert.equal(ready(),true);delete process.env.AFINCALIA_TAX_ID;assert.equal(ready(),false);});
test('unavailable backend cannot claim successful receipt',async()=>{delete process.env.LEADS_ENABLED;const r=await send();assert.equal(r.statusCode,503);assert.equal(r.body.ok,undefined);});
test('cross origin and invalid consent do not call persistence',async()=>{enable();global.fetch=()=>{throw new Error('unexpected call');};assert.equal((await send(valid,{origin:'https://evil.example'})).statusCode,403);assert.equal((await send({...valid,consent:false})).statusCode,422);});
test('honeypot is rejected without persistence',async()=>{enable();global.fetch=()=>{throw new Error('unexpected call');};assert.equal((await send({...valid,website:'spam'})).statusCode,422);});
test('persistence precedes notification and confirmation',async()=>{enable();const calls=[];global.fetch=async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});if(url.includes('/rpc/'))return new Response(JSON.stringify({lead:{...valid,id:'lead-test-id',created_at:new Date().toISOString()}}));if(url.includes('resend'))return new Response(JSON.stringify({id:'email-test-id'}));return new Response(JSON.stringify([]));};const r=await send();assert.equal(r.statusCode,201);assert.equal(r.body.reference,'lead-test-id');assert.match(calls[0].url,/submit_commercial_lead/);assert.match(calls[1].url,/resend/);assert.match(calls[2].url,/commercial_leads/);assert.equal(calls[1].body.to[0],'hola@afincalia.es');assert.equal(calls[0].body.payload.source,'/precios');});
test('storage failure is visible and never sends email',async()=>{enable();let n=0;global.fetch=async()=>{n++;return new Response('{}',{status:503});};const r=await send();assert.equal(r.statusCode,503);assert.equal(n,1);});
test('failed notification leaves persisted lead for retry',async()=>{enable();let n=0;global.fetch=async()=>{n++;return n===1?new Response(JSON.stringify({lead:{...valid,id:'lead-test-id',created_at:new Date().toISOString()}})):new Response('{}',{status:503});};const r=await send();assert.equal(r.statusCode,201);assert.equal(n,2);});
test('rate limit gives retry guidance without email',async()=>{enable();global.fetch=async()=>new Response('{"limited":true}');const r=await send();assert.equal(r.statusCode,429);assert.equal(r.headers['Retry-After'],'600');});
test('already notified lead is not sent again',async()=>{global.fetch=()=>{throw new Error('unexpected send');};assert.equal(await notifyLead({id:'x',notified_at:'2026-09-08'}),true);});
test('notification retry uses stable provider idempotency key',async()=>{enable();const keys=[];global.fetch=async(url,options)=>{if(url.includes('resend')){keys.push(options.headers['Idempotency-Key']);return new Response('{}',{status:503});}throw new Error('unexpected');};await notifyLead({...valid,id:'fixed',created_at:new Date().toISOString()});await notifyLead({...valid,id:'fixed',created_at:new Date().toISOString()});assert.deepEqual(keys,['commercial-lead/fixed','commercial-lead/fixed']);});

test('uncertain notifications never retry beyond provider idempotency window',async()=>{enable();global.fetch=()=>{throw new Error('must reconcile before sending');};for(const created_at of [undefined,'invalid',new Date(Date.now()-24*60*60*1000).toISOString(),new Date(Date.now()+60000).toISOString()])assert.equal(await notifyLead({...valid,id:'controlled-old',created_at}),false);});

test('expired notifications request reconciliation without starving fresh leads',async()=>{enable();const retry=require('../.test-build/pages/api/lead-notifications.js').default;const calls=[];global.fetch=async(url,options)=>{calls.push(url);if(url.includes('created_at=lte.'))return new Response(JSON.stringify([{id:'old-controlled'}]));if(url.includes('created_at=gt.'))return new Response(JSON.stringify([{...valid,id:'fresh-controlled',created_at:new Date().toISOString()}]));if(url.includes('resend'))return new Response(JSON.stringify({id:'accepted-controlled'}));return new Response('[]');};const r=response();await retry({method:'GET',headers:{authorization:'Bearer test-only'}},r);assert.equal(r.statusCode,503);assert.equal(r.body.sent,1);assert.equal(r.body.reconciliationRequired,true);assert.equal(calls.filter(x=>x.includes('resend')).length,1);});
