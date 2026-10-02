import Link from 'next/link';
import { Meta } from '../components/PageParts';
import { DEMO_CTA_URL, EMAIL, Layout } from '../components/SiteChrome';

export default function Contacto() {
  return <Layout><Meta title="Solicitar demo de AfincalIA" description="Solicita una demostración de AfincalIA escribiendo a hola@afincalia.es." />
    <section className="contact-page page-shell">
      <div><span className="eyebrow">Demo y piloto</span><h1>Conoce tu empleado digital para el despacho.</h1><p>Escríbenos para ver cómo se organizan conversaciones, información, incidencias, tareas y actas, y qué control conserva el equipo.</p><p>30 días de piloto gratis, sin cobro automático ni permanencia.</p><Link className="text-link" href="/demo">Ver demo ilustrativa →</Link></div>
      <div className="contact-form"><h2>Hablemos de tu despacho.</h2><p>La solicitud se realiza por correo en {EMAIL}.</p><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a><small>Se abrirá tu aplicación de correo. No se envía ninguna solicitud desde esta página.</small></div>
    </section>
  </Layout>;
}
