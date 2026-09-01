import Link from "next/link";
import { Meta } from "../components/PageParts";
import { CTA, DEMO_URL, Layout } from "../components/SiteChrome";

const features = [
  ["Atención por WhatsApp", "Identifica al vecino y su comunidad, conserva el contexto y prepara una respuesta para revisión.", "/producto/whatsapp"],
  ["Conocimiento verificado", "Responde desde documentos y datos que el despacho ha revisado, sin mezclar comunidades.", "/producto/conocimiento"],
  ["Incidencias y tareas", "Convierte una conversación en trabajo asignable, con prioridad, responsable y estado.", "/producto/incidencias-tareas"],
  ["Trazabilidad y control", "Registra mensajes, decisiones y cambios para saber qué ocurrió y qué sigue pendiente.", "/producto/trazabilidad"],
];

export default function Home() {
  return (
    <Layout>
      <Meta title="WhatsApp, incidencias y tareas con trazabilidad" description="Afincalia organiza la atención y las operaciones de los despachos de administración de fincas." />
      <section className="hero page-shell">
        <div className="hero-copy">
          <span className="eyebrow">Atención y operaciones para administradores de fincas</span>
          <h1>Del WhatsApp del vecino al trabajo <em>bien resuelto.</em></h1>
          <p>Afincalia organiza las consultas, responde utilizando información verificada, transforma incidencias en tareas y conserva todo el seguimiento.</p>
          <div className="actions"><Link className="button" href="/contacto">Solicitar demo online</Link><a className="text-link" href={DEMO_URL}>Probar el producto →</a></div>
          <p className="hero-note">No sustituye al programa contable. Se incorpora como una capa inteligente de atención y operaciones para que el despacho trabaje con más contexto y control.</p>
        </div>
        <div className="product-shot"><img src="/demo/01-dashboard.jpg" alt="Panel operativo real de Afincalia" /></div>
      </section>
      <section className="trust-strip page-shell" aria-label="Principios del producto">
        <div><b>Una entrada</b><span>Conversaciones organizadas y vinculadas a cada comunidad.</span></div>
        <div><b>Una fuente</b><span>Información revisada antes de utilizarse en una respuesta.</span></div>
        <div><b>Un responsable</b><span>Incidencias convertidas en tareas con seguimiento.</span></div>
        <div><b>Una historia</b><span>Cronología completa de mensajes, cambios y resolución.</span></div>
      </section>
      <section className="problem-section page-shell">
        <div className="section-head"><span className="eyebrow">El problema diario</span><h2>La información llega por todas partes. La responsabilidad, no.</h2><p>Cuando WhatsApp, llamadas, documentos y notas viven separados, el despacho invierte tiempo reconstruyendo el contexto y el vecino no sabe qué está pasando.</p></div>
        <div className="problem-grid">
          <article><span>01</span><h3>Interrupciones constantes</h3><p>Las consultas llegan sin orden, prioridad ni relación visible con la comunidad.</p></article>
          <article><span>02</span><h3>Información fragmentada</h3><p>Una persona conoce el mensaje, otra el documento y otra la tarea pendiente.</p></article>
          <article><span>03</span><h3>Seguimiento difícil</h3><p>Sin una cronología común, cuesta explicar qué se hizo, quién lo hizo y cuándo.</p></article>
        </div>
      </section>
      <section className="features-section page-shell">
        <div className="section-head"><span className="eyebrow">El producto, por dentro</span><h2>Cuatro piezas conectadas. No cuatro herramientas aisladas.</h2><p>Entra en cada área para ver qué resuelve, cómo funciona y qué control conserva el equipo.</p></div>
        <div className="feature-grid">{features.map(([title, text, href], index) => <Link className="feature-card" href={href} key={href}><small>0{index + 1}</small><b>↗</b><h3>{title}</h3><p>{text}</p></Link>)}</div>
      </section>
      <section className="workflow-section page-shell">
        <div className="workflow-frame">
          <div><span className="eyebrow">Un caso completo</span><h2 className="section-head">Un mensaje deja de ser un mensaje suelto.</h2><p className="lead">Afincalia conecta atención, conocimiento y ejecución. El equipo mantiene el control en cada paso.</p><Link className="text-link" href="/como-funciona">Recorrer el caso completo →</Link></div>
          <ol className="workflow-list"><li>El vecino escribe por WhatsApp.</li><li>Afincalia identifica su comunidad.</li><li>Prepara una respuesta con información verificada.</li><li>La conversación se convierte en incidencia.</li><li>Se crea o vincula una tarea y se asigna.</li><li>El empleado actualiza y resuelve.</li><li>Todo queda registrado en la cronología.</li></ol>
        </div>
      </section>
      <section className="screens-section page-shell">
        <div className="section-head"><span className="eyebrow">Pantallas reales</span><h2>Lo que verá el despacho.</h2><p>Capturas del producto accesible en la demostración pública, no diseños conceptuales.</p></div>
        <div className="screens-grid"><figure><img src="/demo/02-conversations.jpg" alt="Bandeja de conversaciones" /><figcaption>Conversaciones organizadas y revisión humana</figcaption></figure><figure><img src="/demo/04-incidents.jpg" alt="Panel de incidencias" /><figcaption>Incidencias con prioridad y estado</figcaption></figure><figure><img src="/demo/05-tasks.jpg" alt="Gestión de tareas" /><figcaption>Tareas, responsables y vencimientos</figcaption></figure></div>
      </section>
      <CTA title="Pruébalo antes de ponerlo en tu despacho." text="La primera sesión utiliza un escenario preparado. Si encaja, configuramos un piloto online de 30 días con acompañamiento semanal." />
    </Layout>
  );
}
