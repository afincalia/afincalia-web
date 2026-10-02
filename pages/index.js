import Link from "next/link";
import { Meta } from "../components/PageParts";
import { CTA, DEMO_URL, DEMO_CTA_URL, Layout } from "../components/SiteChrome";

const features = [
  ["Conversaciones con contexto", "Consulta los mensajes, el contacto y la comunidad vinculada. El equipo dispone del historial y de las indicaciones de revisión para decidir cómo responder.", "/producto/whatsapp"],
  ["Conocimiento verificado", "Consulta documentos y datos revisados por el despacho, con su comunidad, procedencia y fecha de verificación.", "/producto/conocimiento"],
  ["Incidencias y tareas", "Organiza los avisos que necesitan actuación con contexto, responsable, fecha y estado. El equipo puede consultar y actualizar el trabajo pendiente.", "/producto/incidencias-tareas"],
  ["Actas", "Revisa borradores, acuerdos y tareas vinculadas a una junta. El administrador conserva la revisión y aprobación del documento.", "/actas"],
  ["Trazabilidad y control", "Consulta el origen de una petición, su respuesta asociada, su estado y las intervenciones registradas. Recibir información no significa que la avería esté resuelta.", "/producto/trazabilidad"],
];

export default function Home() {
  return (
    <Layout>
      <Meta title="Tu empleado digital para la administración de fincas" description="Organiza conversaciones, información verificada, incidencias, tareas y actas. Consulta el seguimiento por petición y conserva el control del despacho." />
      <section className="hero page-shell">
        <div className="hero-copy">
          <span className="eyebrow">Tu empleado digital para la administración de fincas</span>
          <h1>Atiende consultas y sigue el <em>trabajo de tu despacho.</em></h1>
          <p>AfincalIA reúne conversaciones, información verificada, incidencias, tareas y actas. Te ayuda a ver qué falta, quién se ocupa y qué necesita revisión. Tu equipo decide las actuaciones y comprueba el resultado antes de cerrar.</p>
          <div className="hero-tags" aria-label="Áreas de Afincalia"><span>WhatsApp</span><span>Memoria del despacho</span><span>Incidencias</span><span>Tareas</span><span>Actas</span></div>
          <div className="actions"><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a><Link className="text-link" href="/demo">Ver demo ilustrativa →</Link></div>
          <p className="hero-note">Sin sustituir tu programa contable. Las acciones disponibles dependen de los permisos del usuario y del estado del caso. Las decisiones sensibles siguen en manos de una persona.</p>
        </div>
        <div className="product-shot"><img src="/demo/01-dashboard.jpg" alt="Panel de AfincalIA con el resumen de una comunidad piloto y datos simulados" /></div>
      </section>
      <section className="benefit-section page-shell">
        <div className="section-head"><span className="eyebrow">La diferencia en el trabajo diario</span><h2>Menos pasos manuales entre el mensaje y la solución.</h2></div>
        <div className="before-after">
          <article className="compare-card before"><span>Sin AfincalIA</span><h3>El equipo reconstruye el caso</h3><ol><li>Leer el WhatsApp</li><li>Identificar la comunidad</li><li>Buscar el documento o preguntar</li><li>Anotar la incidencia</li><li>Recordar quién debe ocuparse</li><li>Volver al chat para responder</li></ol></article>
          <article className="compare-card after"><span>Con AfincalIA</span><h3>El equipo consulta el caso con contexto</h3><ol><li>Ve el contacto y la comunidad vinculada</li><li>Consulta fuentes verificadas</li><li>Revisa la conversación y decide la respuesta</li><li>Registra una incidencia cuando hace falta actuar</li><li>Vincula tareas y responsables</li><li>Conserva cambios, pendientes y comprobaciones</li></ol></article>
        </div>
      </section>
      <section className="trust-strip page-shell" aria-label="Principios del producto">
        <div><b>Una entrada</b><span>Conversaciones organizadas y vinculadas a cada comunidad.</span></div>
        <div><b>Una fuente</b><span>Información revisada antes de utilizarse en una respuesta.</span></div>
        <div><b>Un responsable</b><span>Incidencias convertidas en tareas con seguimiento.</span></div>
        <div><b>Una historia</b><span>Historial consultable de mensajes, cambios y resolución.</span></div>
      </section>
      <section className="consultation-pain page-shell">
        <div><span className="eyebrow">La primera línea del despacho</span><h2>Las consultas no solo ocupan tiempo. También desgastan.</h2><p>Mensajes repetidos, respuestas exigidas al momento y conversaciones que empiezan con tensión. AfincalIA reúne el historial, los datos de la comunidad y las fuentes revisadas para que el equipo atienda cada caso con contexto. La pantalla distingue lo que requiere intervención humana.</p></div>
        <div className="consultation-list"><div><b>Consulta antes de responder</b><span>El historial y las fuentes revisadas permiten comprobar qué información tiene el despacho.</span></div><div><b>Reutiliza la información revisada</b><span>Las consultas habituales pueden apoyarse en la información ya revisada por el despacho.</span></div><div><b>Deriva lo sensible</b><span>Reclamaciones, riesgos y decisiones delicadas requieren criterio humano, con el contexto disponible para revisarlo.</span></div></div>
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
        <div className="section-head"><span className="eyebrow">El producto, por dentro</span><h2>Cinco piezas conectadas. No cinco herramientas aisladas.</h2><p>Entra en cada área para ver qué resuelve, cómo funciona y qué control conserva el equipo.</p></div>
        <div className="feature-grid">{features.map(([title, text, href], index) => <Link className="feature-card" href={href} key={href}><small>0{index + 1}</small><b>↗</b><h3>{title}</h3><p>{text}</p></Link>)}</div>
      </section>
      <section className="memory-section page-shell">
        <div className="memory-copy"><span className="eyebrow light">Memoria operativa</span><h2>AfincalIA recuerda lo que tu despacho sabe.</h2><p>El equipo puede consultar documentos, datos de la comunidad, contactos, conversaciones, incidencias y tareas. Su historial conserva el contexto para revisar lo ocurrido y el trabajo que sigue pendiente.</p><Link className="button button-light" href="/producto/conocimiento">Conocer la memoria del despacho</Link></div>
        <div className="memory-stack" aria-label="Información que forma la memoria operativa"><span>Comunidades</span><span>Documentos verificados</span><span>Contactos y proveedores</span><span>Conversaciones</span><span>Incidencias y tareas</span><span>Historial y decisiones</span><strong>Contexto del despacho</strong></div>
      </section>
      <section className="workflow-section page-shell">
        <div className="workflow-frame">
          <div><span className="eyebrow">Seguimiento por petición</span><h2 className="section-head">Que lo pendiente no dependa de acordarse del chat.</h2><p className="lead">Cada petición conserva su mensaje de origen, la respuesta asociada cuando existe y su estado. Si dispone de un ciclo operable, un administrador puede detener esa petición o registrar una decisión sobre su excepción, sin confundirla con las demás.</p><p>Una petición de información y una actuación del proveedor son cosas distintas. Recibir el dato que falta no cierra la avería: el equipo debe comprobar el resultado.</p><Link className="text-link" href="/como-funciona">Ver cómo funciona →</Link></div>
          <ol className="workflow-list"><li>Consulta el mensaje y su contexto.</li><li>Revisa la información disponible.</li><li>Decide la respuesta o el trabajo necesario.</li><li>Vincula incidencias, tareas y responsables.</li><li>Consulta cada petición y su estado.</li><li>Revisa excepciones y comprueba el resultado.</li><li>Conserva las actuaciones en el historial.</li></ol>
        </div>
      </section>
      <section className="screens-section page-shell">
        <div className="section-head"><span className="eyebrow">Capturas de la interfaz</span><h2>Información, incidencias y tareas a la vista.</h2><p>Capturas del piloto con datos de demostración. Muestran las vistas indicadas; la demo pública ofrece un ejemplo guiado independiente.</p></div>
        <div className="screens-grid"><figure><img src="/demo/03-knowledge.jpg" alt="Base de conocimiento de la comunidad piloto con fuentes y datos verificados" /><figcaption>Conocimiento: fuentes y datos del piloto</figcaption></figure><figure><img src="/demo/04-incidents.jpg" alt="Listado de incidencias del piloto con filtros de estado, prioridad, responsable y comunidad" /><figcaption>Incidencias: filtros y estado de un caso simulado</figcaption></figure><figure><img src="/demo/05-tasks.jpg" alt="Vista de tareas con filtros y acceso a las tareas completadas" /><figcaption>Tareas: filtros y archivo de completadas</figcaption></figure></div>
      </section>
      <section className="demo-experience page-shell"><div><span className="eyebrow">Demo interactiva · caso simulado</span><h2>Recorre un ejemplo de trabajo con AfincalIA.</h2><p>Sin registro, datos reales ni envíos. Este ejemplo simula una consulta que requiere revisión humana, una incidencia, su tarea y el cierre registrado. No todas las consultas necesitan recorrer esos pasos.</p></div><div className="demo-actions"><span>💬 Consulta del vecino</span><span>🛠️ Incidencia y tarea</span><span>🧠 Información verificada</span><a className="button" href={DEMO_URL}>Abrir demostración</a></div></section>
      <CTA title="30 días para medir cuánto trabajo puede asumir AfincalIA." text="El despacho activa un caso prioritario mediante un recorrido guiado y obtiene resultados concretos sobre consultas, incidencias, tareas, actas y uso del conocimiento." />
    </Layout>
  );
}
