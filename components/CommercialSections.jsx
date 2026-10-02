import Link from "next/link";
import { DEMO_CTA_URL } from "./SiteChrome";

export const commercialFaqs = [
  ["¿Qué puedo gestionar con AfincalIA?", "Conversaciones y su contexto, información revisada por comunidad, incidencias, tareas y actas. Puedes consultar qué está pendiente y quién debe intervenir. Los canales y automatismos requieren su configuración; no se activan por abrir una cuenta."],
  ["¿Responde y hace seguimiento de todo automáticamente?", "No. La aplicación dispone de controles para respuestas y seguimientos acotados, sujetos a canal, autorización, información suficiente y estado del caso. Los recordatorios automáticos no están habilitados por defecto. Las excepciones y los resultados inciertos necesitan revisión."],
  ["¿Qué ocurre cuando falta información?", "El equipo puede revisar el contexto y las fuentes disponibles. Las peticiones distinguen lo pendiente, la respuesta asociada y las excepciones. Si no se puede confirmar una actuación, no se presenta como completada; se mantiene señalada para revisión."],
  ["¿Qué puede hacer cada persona del despacho?", "El acceso depende del usuario y de su despacho. El administrador gestiona el conocimiento y las actas, y puede intervenir en peticiones cuando su estado lo permite. Los empleados pueden actualizar las tareas asignadas a su usuario."],
  ["¿Cómo empezamos?", "Primero recorremos una demo con datos de ejemplo y elegimos el caso que quieres evaluar. Después se revisan las comunidades, el equipo, las fuentes y los permisos necesarios. La promoción y las condiciones del piloto están disponibles en su página."],
  ["¿Sustituye mi programa contable?", "No. AfincalIA se ocupa de la atención y la organización del trabajo descritas aquí. Tu programa contable y las decisiones profesionales siguen formando parte del despacho."],
  ["¿Necesito aportar conversaciones reales para ver la demo?", "No. El recorrido público utiliza capturas y datos de demostración. Para solicitar una presentación solo necesitas escribir a hola@afincalia.es; no hace falta incluir datos de vecinos, credenciales ni documentación privada."],
];

export function SectionHeading({ label, title, text, children }) {
  return <div className="review-section-heading"><span className="review-kicker">{label}</span><h2>{title}</h2>{text && <p>{text}</p>}{children}</div>;
}

export function HumanControl({ compact = false }) {
  return <section className="human-control" id="control-humano">
    <div className="control-intro"><span className="review-kicker">El control sigue en el despacho</span><h2>Ayuda para avanzar.<br/><em>Criterio para decidir.</em></h2><p>AfincalIA ordena la información y hace visibles los pendientes. Las decisiones del equipo y la comprobación del resultado siguen siendo parte del trabajo.</p><Link href="/seguridad" className="review-text-link">Ver permisos y revisión humana</Link></div>
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
    <div><span className="review-kicker">Hablemos de tu despacho</span><h2>Veamos cómo encaja<br/>en tu trabajo diario.</h2><p>Recorre conversaciones, fuentes, incidencias y tareas. Comprueba qué puede asumir AfincalIA y qué decisiones conserva tu equipo.</p></div>
    <div className="review-cta-action"><a className="button button-coral" href={DEMO_CTA_URL}>Solicitar demo</a><span>hola@afincalia.es</span><small>Se abre tu aplicación de correo.<br/>No se envía nada automáticamente.</small><Link href="/piloto">Ver la promoción y el piloto vigentes</Link></div>
  </section>;
}
