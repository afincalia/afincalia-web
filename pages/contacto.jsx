import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Meta } from '../components/PageParts';
import { EMAIL, Layout, PHONE, WA_URL } from '../components/SiteChrome';
import { track } from '../lib/analytics-client';

export default function Contacto() {
  const router = useRouter();
  const [available, setAvailable] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [reference, setReference] = useState('');
  const busy = useRef(false), requestId = useRef(''), started = useRef(false), opened = useRef(false);
  const source = typeof router.query.origen === 'string' && /^\/[a-z0-9/-]{0,100}$/.test(router.query.origen) ? router.query.origen : '/contacto';
  useEffect(() => { let active = true; fetch('/api/leads').then(r => r.json()).then(r => { if (active) setAvailable(r.available === true); }).catch(() => { if (active) setAvailable(false); }); return () => { active = false; }; }, []);
  useEffect(() => { if (available && router.isReady && !opened.current) { opened.current = true; track('form_open', source); } }, [available, router.isReady, source]);
  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true; setStatus('sending'); setErrors({});
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ ...values, consent: values.consent === 'on', source, requestId: requestId.current }) });
      const data = await response.json();
      if (!response.ok || !data.ok || !data.reference) { setErrors(data.errors || {}); throw new Error(response.status === 429 ? 'rate' : 'send'); }
      setReference(data.reference); setStatus('success'); track('form_success', source);
    } catch (error) { setStatus(error.message === 'rate' ? 'limited' : 'error'); track('form_error', source); }
    finally { clearTimeout(timeout); busy.current = false; }
  }
  return <Layout><Meta title="Solicitar demo o piloto de AfincalIA" description="Cuéntanos qué trabajo quieres reducir en tu despacho y solicita una demo o el piloto de 30 días de AfincalIA." />
    <section className="contact-page page-shell"><div><span className="eyebrow">Demo y piloto</span><h1>Prueba tu empleado digital con un caso del despacho.</h1><p>Cuéntanos qué quieres resolver. Revisaremos tu solicitud y te contactaremos para concretar la demostración o el piloto.</p><p>30 días de piloto gratis, sin cobro automático ni permanencia.</p><Link className="text-link" href="/demo">Explorar la demo sin registro →</Link><div className="contact-lines"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href="tel:+34624934148">{PHONE}</a><a href={WA_URL}>Solicitar demo por WhatsApp</a></div></div>
    {available === null ? <p role="status">Preparando contacto…</p> : !available ? <div className="contact-form"><h2>Hablemos de tu despacho.</h2><p>Solicita la demo o el piloto por WhatsApp, teléfono o correo. El envío desde esta página todavía no está disponible.</p><a className="button" href={WA_URL}>Solicitar demo por WhatsApp</a><a className="text-link" href={`mailto:${EMAIL}?subject=Solicitud%20de%20demo%20AfincalIA`}>Escribir a {EMAIL}</a><small>Los enlaces de correo abren tu aplicación de email. También puedes llamarnos al {PHONE}.</small></div> : status === 'success' ? <div className="contact-form" role="status" aria-live="polite"><h2>Tu solicitud ha quedado registrada.</h2><p>Gracias. El equipo de AfincalIA revisará tu caso y te contactará en el email que has indicado.</p><p className="receipt">Referencia: {reference}</p><Link className="button" href="/demo">Mientras tanto, explora la demo</Link></div> :
    <form className="contact-form" onSubmit={submit} aria-busy={status === 'sending'} onFocus={() => { if (!started.current) { started.current = true; track('form_start', source); } }} onChange={() => { if (status === 'error' || status === 'limited') requestId.current = ''; }}>
      <p>Los campos con * son obligatorios.</p>
      {[['name','Nombre *','text','name',100],['company','Empresa / despacho *','text','organization',160],['email','Email *','email','email',254],['phone','Teléfono (opcional)','tel','tel',30],['communities','Nº aproximado de comunidades (opcional)','text','off',5]].map(([name,label,type,autoComplete,maxLength]) => <label key={name}>{label}<input name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} required={['name','company','email'].includes(name)} minLength={['name','company'].includes(name) ? 2 : undefined} inputMode={name === 'communities' ? 'numeric' : undefined} pattern={name === 'communities' ? '[0-9]{1,5}' : undefined} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `error-${name}` : undefined}/>{errors[name] && <span className="field-error" id={`error-${name}`}>{errors[name]}</span>}</label>)}
      <label>Me interesa<select name="interest" defaultValue={router.query.interes === 'piloto' ? 'piloto' : 'demo'}><option value="demo">Una demostración</option><option value="piloto">El piloto de 30 días</option></select></label>
      <label>Mensaje (opcional)<textarea name="message" maxLength={3000} rows={4} placeholder="¿Qué trabajo quieres quitarle de encima al equipo? No incluyas datos de vecinos ni documentos privados."/></label>
      <div className="honeypot" aria-hidden="true"><label>Deja vacío este campo<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <label className="privacy-check"><input name="consent" type="checkbox" required/><span>He leído la <Link href="/politica-privacidad" target="_blank" rel="noopener">política de privacidad</Link> y solicito que me contacten para atender esta petición. *</span></label>
      {errors.consent && <p className="field-error">{errors.consent}</p>}
      {(status === 'error' || status === 'limited') && <div className="form-error" role="alert">{status === 'limited' ? 'Has realizado varios envíos. Espera 10 minutos o contacta por WhatsApp.' : 'No hemos podido confirmar el envío. Conservamos lo que has escrito: puedes volver a intentarlo. Si ya se registró, el reintento no creará otra solicitud.'}</div>}
      <button className="button" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Enviando…' : 'Solicitar demo o piloto'}</button><small>Usaremos estos datos para atender tu solicitud. No te suscribimos a publicidad.</small>
    </form>}</section></Layout>;
}
