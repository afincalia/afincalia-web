import Link from "next/link";
import { Meta } from "../../components/PageParts";
import { CTA, Layout } from "../../components/SiteChrome";

const rows = [
  ["01", "Conversación", "Muestra los mensajes, su contacto y comunidad, y las indicaciones de revisión."],
  ["02", "Conocimiento", "Utiliza información aprobada por el despacho y separada por comunidad."],
  ["03", "Incidencia", "Permite registrar el trabajo que requiere actuación con prioridad y estado."],
  ["04", "Tarea", "Asigna trabajo, responsable y fecha sin perder el vínculo con la conversación."],
  ["05", "Acta", "Prepara un borrador desde las notas de la junta y permite revisar acuerdos, vincular tareas y archivar el PDF aprobado."],
  ["06", "Cronología", "Conserva decisiones, actualizaciones y resolución en una historia común."],
];

const areas = [
  ["Entrada", "Atención por WhatsApp", "Identidad, comunidad, contexto y revisión.", "/producto/whatsapp"],
  ["Memoria", "Memoria del despacho", "Fuentes y contexto controlados por el equipo.", "/producto/conocimiento"],
  ["Ejecución", "Incidencias y tareas", "Trabajo asignado, actualizado y resuelto.", "/producto/incidencias-tareas"],
  ["Juntas", "Actas", "Extracción, revisión, acuerdos, tareas y PDF final.", "/actas"],
  ["Control", "Trazabilidad", "Una cronología común para el equipo.", "/producto/trazabilidad"],
];

export default function Producto() {
  return (
    <Layout>
      <Meta title="Producto" description="Conoce cómo la capa operativa de AfincalIA conecta conversaciones, conocimiento, incidencias, tareas y actas." />
      <section className="overview-intro page-shell">
        <span className="eyebrow">Vista general del producto</span>
        <h1>Tu empleado digital, con un alcance definido por el despacho.</h1>
        <p>AfincalIA conecta conversaciones, información verificada y trabajo pendiente. El equipo consulta los estados, asigna trabajo según sus permisos y ve qué necesita revisión. No sustituye al programa contable ni al criterio profesional.</p>
      </section>
      <section className="overview-map page-shell">
        {rows.map(([number, title, text]) => <div className="overview-row" key={number}><span>{number}</span><h2>{title}</h2><p>{text}</p></div>)}
      </section>
      <section className="features-section page-shell">
        <div className="section-head"><span className="eyebrow">Explora cada área</span><h2>Más detalle, sin promesas genéricas.</h2></div>
        <div className="feature-grid">
          {areas.map(([label, title, text, href]) => <Link className="feature-card" href={href} key={href}><small>{label}</small><b>↗</b><h3>{title}</h3><p>{text}</p></Link>)}
        </div>
      </section>
      <section className="pricing-faq page-shell" id="control-humano">
        <div className="section-head"><span className="eyebrow">Control humano · preguntas frecuentes</span><h2>Tú defines el alcance. El equipo conserva el criterio.</h2></div>
        <div className="policy-grid">
          <article><h2>¿AfincalIA decide y ejecuta cualquier cosa sola?</h2><p>No. El equipo conserva las decisiones y la verificación del resultado. La aplicación muestra estados, contexto y controles de intervención; no otorga autoridad para pagos, decisiones jurídicas o contratación de proveedores por un simple mensaje.</p></article>
          <article><h2>¿Quién puede detener una petición?</h2><p>Un administrador puede detener su seguimiento cuando el estado de la petición lo permite y registrar el motivo. Las demás peticiones mantienen su estado. Si no se sabe si un mensaje llegó a enviarse, hay que revisarlo: detener el seguimiento no demuestra que una avería esté resuelta.</p></article>
          <article><h2>¿Sustituye al administrador o a su programa contable?</h2><p>No. Organiza atención y operaciones sobre el ámbito configurado, conserva información y ayuda al equipo a dar seguimiento. El despacho mantiene la responsabilidad profesional y su herramienta contable.</p></article>
        </div>
      </section>
      <CTA />
    </Layout>
  );
}
