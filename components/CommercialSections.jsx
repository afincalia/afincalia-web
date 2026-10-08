import Link from "next/link";
import { DEMO_CTA_URL } from "./SiteChrome";
import ContactEmail from "./ContactEmail";

export const commercialFaqs = [
  ["¿Qué hace AfincalIA con los mensajes de WhatsApp?", "Ayuda a atender consultas y avisos con el contexto de cada comunidad. Con el canal y los permisos adecuados, puede responder consultas sencillas con información verificada, pedir datos que faltan y registrar ciertos avisos. El despacho controla las excepciones, las incidencias y las tareas desde la aplicación."],
  ["¿Qué puede responder automáticamente y qué revisa el despacho?", "Una consulta sencilla puede recibir una respuesta automática si hay una fuente verificada, contacto y comunidad identificados y autorización de envío. Las consultas económicas, jurídicas, los conflictos y los casos sensibles o ambiguos se derivan al equipo. Los recordatorios necesitan configuración específica y no están habilitados por defecto."],
  ["¿Qué ocurre cuando falta información?", "En un aviso admitido, puede pedir la ubicación necesaria antes de registrar la incidencia. Si falta identificar el contacto o la comunidad, o no hay una fuente suficiente para responder, se necesita revisión. Las peticiones conservan su origen, la respuesta asociada y su estado; no se inventa un resultado."],
  ["¿Qué puede hacer cada persona del despacho?", "El acceso depende del usuario y de su despacho. El administrador gestiona el conocimiento y las actas, y puede intervenir en peticiones cuando su estado lo permite. Los empleados pueden actualizar las tareas asignadas a su usuario."],
  ["¿Cómo empezamos?", "Puedes explorar las capturas o solicitar una demostración guiada por correo. Si encaja, acordamos las comunidades, casos de uso, equipo, fuentes y permisos de un piloto gratuito de 30 días. Sin cobro automático ni permanencia; al terminar, decides si continúas y aceptas expresamente el plan elegido."],
  ["¿Sustituye mi programa contable?", "No. AfincalIA se ocupa de la atención y la organización del trabajo descritas aquí. Tu programa contable y las decisiones profesionales siguen formando parte del despacho."],
  ["¿Necesito aportar conversaciones reales para ver la demo?", "No. El recorrido público utiliza capturas y datos de demostración. Para solicitar una presentación solo necesitas escribir a hola@afincalia.es; no hace falta incluir datos de vecinos, credenciales ni documentación privada."],
];

export function SectionHeading({ label, title, text, children }) {
  return <div className="review-section-heading"><span className="review-kicker">{label}</span><h2>{title}</h2>{text && <p>{text}</p>}{children}</div>;
}

export function HumanControl({ compact = false }) {
  return <section className="human-control" id="control-humano">
    <div className="control-intro"><span className="review-kicker">El control sigue en el despacho</span><h2>Ayuda para atender.<br/><em>Criterio para decidir.</em></h2><p>AfincalIA puede atender los casos autorizados y hace visibles los que necesitan al equipo. Tu despacho revisa las fuentes, decide las actuaciones y comprueba el resultado.</p><Link href="/seguridad" className="review-text-link">Ver permisos y revisión humana</Link></div>
    <div className="control-decisions">
      <article><span>01</span><div><h3>Decide qué información se utiliza</h3><p>El administrador revisa las fuentes de cada comunidad y el contenido que se incorpora como conocimiento.</p></div></article>
      <article><span>02</span><div><h3>Interviene cuando hace falta</h3><p>Las peticiones muestran su estado. Un administrador puede asumir una excepción o detener el seguimiento cuando el estado lo permite.</p></div></article>
      <article><span>03</span><div><h3>Comprueba antes de cerrar</h3><p>Una respuesta recibida no prueba que una reparación esté terminada. Lo incierto requiere revisión, no un cierre automático.</p></div></article>
      {!compact && <div className="control-config"><strong>Los permisos y la configuración importan.</strong><p>Un envío necesita un canal y una autorización válidos. Los recordatorios automáticos permanecen desactivados por defecto.</p></div>}
    </div>
  </section>;
}

export function CommercialFAQ({ short = false }) {
  const questions = short ? commercialFaqs.slice(0, 5) : commercialFaqs;
  return <section className="review-faq review-section page-shell" id="preguntas-frecuentes">
    <SectionHeading label="Antes de probarlo" title="Preguntas que conviene resolver." text="Qué incluye el producto, qué depende de la configuración y qué conserva el equipo." />
    <div className="faq-list">{questions.map(([question, answer], i) => <details key={question}><summary><span>{question}</span><b aria-hidden="true">+</b></summary><div><p>{answer}</p>{i === 4 && <Link href="/piloto" className="review-text-link">Consultar las condiciones del piloto</Link>}</div></details>)}</div>
  </section>;
}

export function CommercialCTA() {
  return <section className="review-cta page-shell">
    <div><span className="review-kicker">Hablemos de tu despacho</span><h2>Veamos la atención<br/>por WhatsApp en tu despacho.</h2><p>Partimos de un mensaje y seguimos su recorrido: respuesta, petición de datos o actuación. Comprueba qué puede asumir AfincalIA y cuándo interviene tu equipo.</p></div>
    <div className="review-cta-action"><a className="button button-coral" href={DEMO_CTA_URL}>Solicitar demo</a><ContactEmail /><small>El botón abre tu aplicación de correo. También puedes copiar la dirección y escribir desde tu correo web.</small><Link href="/piloto">Ver la promoción y el piloto vigentes</Link></div>
  </section>;
}
