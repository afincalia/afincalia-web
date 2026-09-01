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
      <Meta title="Tu empleado digital para la administración de fincas" description="Afincalia conoce el contexto de tu despacho y ayuda a atender, organizar y resolver el trabajo diario." />
      <section className="hero page-shell">
        <div className="hero-copy">
          <span className="eyebrow">Administración de fincas con menos trabajo disperso</span>
          <h1>Tu empleado digital para la <em>administración de fincas.</em></h1>
          <p>AfincalIA conoce el contexto de tu despacho, entiende cada comunidad y ayuda a atender, organizar y resolver el trabajo diario.</p>
          <div className="hero-tags" aria-label="Áreas de Afincalia"><span>WhatsApp</span><span>Memoria del despacho</span><span>Incidencias</span><span>Tareas</span></div>
          <div className="actions"><Link className="button" href="/como-funciona">Ver cómo trabaja</Link><Link className="text-link" href="/contacto">Solicitar piloto →</Link></div>
          <p className="hero-note">Sin cambiar tu programa de gestión. Tú decides qué puede hacer AfincalIA y qué debe revisar una persona.</p>
        </div>
        <div className="product-shot"><img src="/demo/01-dashboard.jpg" alt="Panel operativo real de Afincalia" /></div>
      </section>
      <section className="benefit-section page-shell">
        <div className="section-head"><span className="eyebrow">La diferencia en un caso real</span><h2>Menos pasos manuales entre el mensaje y la solución.</h2></div>
        <div className="before-after">
          <article className="compare-card before"><span>Sin AfincalIA</span><h3>El equipo reconstruye el caso</h3><ol><li>Leer el WhatsApp</li><li>Identificar la comunidad</li><li>Buscar el documento o preguntar</li><li>Anotar la incidencia</li><li>Recordar quién debe ocuparse</li><li>Volver al chat para responder</li></ol></article>
          <article className="compare-card after"><span>Con AfincalIA</span><h3>El caso llega con contexto</h3><ol><li>Identifica contacto y comunidad</li><li>Recupera información validada</li><li>Prepara una respuesta revisable</li><li>Convierte el mensaje en incidencia</li><li>Vincula responsable y tarea</li><li>Registra cambios y resolución</li></ol></article>
        </div>
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
      <section className="memory-section page-shell">
        <div className="memory-copy"><span className="eyebrow light">Memoria operativa</span><h2>AfincalIA recuerda lo que tu despacho sabe.</h2><p>Documentos, información de cada comunidad, proveedores, conversaciones, incidencias, tareas y decisiones operativas quedan disponibles cuando hacen falta. Cada nuevo caso incorpora contexto útil para el siguiente.</p><Link className="button button-light" href="/producto/conocimiento">Conocer la memoria del despacho</Link></div>
        <div className="memory-stack" aria-label="Información que forma la memoria operativa"><span>Comunidades</span><span>Documentos verificados</span><span>Contactos y proveedores</span><span>Conversaciones</span><span>Incidencias y tareas</span><span>Historial y decisiones</span><strong>Contexto del despacho</strong></div>
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
      <section className="demo-experience page-shell"><div><span className="eyebrow">Demo interactiva</span><h2>Prueba cómo trabaja AfincalIA.</h2><p>Sin registro y sin información real. El recorrido guiado enseña la consulta de un vecino, la respuesta con contexto, la incidencia, la tarea y el cierre registrado.</p></div><div className="demo-actions"><span>💬 Consulta del vecino</span><span>🛠️ Incidencia y tarea</span><span>🧠 Información verificada</span><a className="button" href={DEMO_URL}>Abrir demostración</a></div></section>
      <CTA title="30 días para medir cuánto trabajo puede asumir AfincalIA." text="Configuramos un caso prioritario, acompañamos al equipo y cerramos el piloto con resultados concretos sobre consultas, incidencias, tareas y uso del conocimiento del despacho." />
    </Layout>
  );
}
