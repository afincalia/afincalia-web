-- PROPOSED, NOT APPLIED. Inspect AfincalIA for an existing lead store first.
-- Additive transaction. No product tables or data are changed.
begin;
create table public.commercial_leads (
  id uuid primary key default gen_random_uuid(), request_id uuid not null unique,
  fingerprint text not null, created_at timestamptz not null default now(),
  name text not null check (length(name) between 2 and 100),
  company text not null check (length(company) between 2 and 160),
  email text not null check (length(email) <= 254),
  phone text not null default '', communities text not null default '',
  message text not null default '' check (length(message) <= 3000),
  interest text not null check (interest in ('demo','piloto')), source text not null,
  privacy_version text not null, consent_at timestamptz not null default now(),
  notified_at timestamptz, notification_id text
);
create index commercial_leads_dedup on public.commercial_leads(fingerprint,created_at desc);
create index commercial_leads_outbox on public.commercial_leads(created_at) where notified_at is null;
create table public.commercial_rate_limits (key text primary key, window_start timestamptz not null, count integer not null);
create table public.commercial_events (day date not null, event text not null, source text not null, count bigint not null default 1, primary key(day,event,source));
alter table public.commercial_leads enable row level security;
alter table public.commercial_rate_limits enable row level security;
alter table public.commercial_events enable row level security;
revoke all on public.commercial_leads, public.commercial_rate_limits, public.commercial_events from public, anon, authenticated;
grant select, insert, update, delete on public.commercial_leads, public.commercial_rate_limits, public.commercial_events to service_role;
create function public.submit_commercial_lead(payload jsonb, dedup_hash text, rate_key text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare item public.commercial_leads; hits integer;
begin
  if payload->>'consent' is distinct from 'true' then raise exception 'privacy acknowledgement required'; end if;
  perform pg_advisory_xact_lock(hashtextextended(dedup_hash,0));
  select * into item from public.commercial_leads
    where request_id = (payload->>'requestId')::uuid
       or (fingerprint = dedup_hash and created_at > now() - interval '10 minutes')
    order by created_at desc limit 1;
  if found then
    if item.fingerprint <> dedup_hash then raise exception 'request id already used'; end if;
    return jsonb_build_object('lead',to_jsonb(item));
  end if;
  insert into public.commercial_rate_limits(key,window_start,count) values(rate_key,now(),1)
  on conflict(key) do update set
    count = case when commercial_rate_limits.window_start < now()-interval '10 minutes' then 1 else commercial_rate_limits.count+1 end,
    window_start = case when commercial_rate_limits.window_start < now()-interval '10 minutes' then now() else commercial_rate_limits.window_start end
  returning count into hits;
  if hits > 5 then return '{"limited":true}'::jsonb; end if;
  delete from public.commercial_rate_limits where window_start < now()-interval '2 days';
  insert into public.commercial_leads(request_id,fingerprint,name,company,email,phone,communities,message,interest,source,privacy_version)
  values ((payload->>'requestId')::uuid,dedup_hash,payload->>'name',payload->>'company',payload->>'email',payload->>'phone',payload->>'communities',payload->>'message',payload->>'interest',payload->>'source',payload->>'privacy_version)
  returning * into item;
  return jsonb_build_object('lead',to_jsonb(item));
end $$;
revoke all on function public.submit_commercial_lead(jsonb,text,text) from public, anon, authenticated;
grant execute on function public.submit_commercial_lead(jsonb,text,text) to service_role;
create function public.count_commercial_event(event_name text, source_path text)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if event_name not in ('cta_click','form_open','form_start','form_success','form_error')
     or source_path !~ '^/[a-z0-9/-]{0,100}$' then raise exception 'invalid event'; end if;
  insert into public.commercial_events(day,event,source) values(current_date,event_name,source_path)
  on conflict(day,event,source) do update set count = least(commercial_events.count+1,1000000);
end $$;
revoke all on function public.count_commercial_event(text,text) from public, anon, authenticated;
grant execute on function public.count_commercial_event(text,text) to service_role;
commit;
