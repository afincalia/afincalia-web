import Link from "next/link";
import { Meta } from "../../components/PageParts";
import { CTA, Layout } from "../../components/SiteChrome";

const rows = [
  ["01", "Conversación", "Ordena la entrada de WhatsApp, identifica el contexto y permite revisar la respuesta."],
  ["02", "Conocimiento", "Utiliza información aprobada por el despacho y separada por comunidad."],
  ["03", "Incidencia", "Convierte el mensaje que requiere actuación en un caso con prioridad y estado."],
  ["04", "Tarea", "Asigna trabajo, responsable y fecha sin perder el vínculo con la conversación."],
  ["05", "Acta", "Extrae, revisa y convierte los acuerdos de una junta en memoria y trabajo operativo."],
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
      <Meta title="Producto" description="Conoce cómo trabaja el empleado digital de AfincalIA junto al equipo del despacho." />
      <section className="overview-intro page-shell">
        <span className="eyebrow">Vista general del producto</span>
        <h1>Un empleado digital entre el mensaje y el trabajo terminado.</h1>
        <p>AfincalIA conoce el contexto del despacho y ayuda al equipo a entender, responder, organizar, ejecutar y dejar constancia. No obliga a sustituir el programa contable: trabaja sobre la parte operativa que consume tiempo cada día.</p>
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
      <CTA />
    </Layout>
  );
}
