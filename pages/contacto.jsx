import Link from 'next/link';
import { Meta } from '../components/PageParts';
import ContactEmail from '../components/ContactEmail';
import { DEMO_CTA_URL, Layout } from '../components/SiteChrome';

export default function Contacto() {
  return <Layout><Meta title="Solicitar demo de AfincalIA" description="Solicita una demostración de AfincalIA escribiendo a hola@afincalia.es." />
    <section className="contact-page page-shell">
      <div><span className="eyebrow">Demo y piloto</span><h1>Conoce el cerebro de tu despacho.</h1><p>Escríbenos para ver cómo se conectan las conversaciones de WhatsApp, la información de cada comunidad, las incidencias, las tareas y las actas, con el control de tu equipo.</p><p>30 días de piloto gratis, sin cobro automático ni permanencia.</p><Link className="text-link" href="/demo">Ver el recorrido de capturas →</Link></div>
      <div className="contact-form"><h2>Hablemos de tu despacho.</h2><p>Puedes abrir tu aplicación de correo o copiar la dirección para escribir desde tu correo web.</p><ContactEmail /><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a><small>Indica el nombre del despacho, cuántas comunidades gestionas y qué caso quieres ver. No incluyas datos de vecinos ni documentación privada. Esta página no envía solicitudes.</small></div>
    </section>
  </Layout>;
}
