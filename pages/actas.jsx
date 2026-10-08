import Link from "next/link";
import { Meta } from "../components/PageParts";
import { CTA, DEMO_CTA_URL, Layout } from "../components/SiteChrome";

const steps = [
  ["01", "Añade el original", "Pega las notas de la junta o incorpora una fotografía de los apuntes. El original queda privado y vinculado a su comunidad. La extracción desde imagen requiere la lectura de fotografías configurada."],
  ["02", "Prepara el borrador", "A partir del texto disponible, AfincalIA estructura un borrador con asistentes, puntos y acuerdos. Si partes de una fotografía, revisa también la lectura del original: lo que no se reconoce debe completarse o corregirse."],
  ["03", "Revisa la evidencia", "Cada punto permanece pendiente de revisión. El administrador contrasta la extracción con el original y corrige lo necesario."],
  ["04", "Convierte acuerdos en trabajo", "Los acuerdos pueden generar tareas con responsable y fecha sin volver a copiarlos en otra herramienta."],
  ["05", "Aprueba y archiva", "La aprobación humana genera el PDF definitivo, conserva la versión y lo archiva en la comunidad."],
  ["06", "Decide si se envía", "El envío por correo es una acción separada del administrador: requiere el acta aprobada, su PDF archivado, destinatarios elegidos y correo profesional configurado. Archivar no envía el documento automáticamente."],
];

export default function Actas() {
  return (
    <Layout>
      <Meta title="Actas" description="Convierte notas o fotografías de los apuntes de una junta en un acta revisada, aprobada y conectada con las tareas del despacho." />
      <section className="actas-hero page-shell">
        <div>
          <span className="eyebrow">Actas conectadas con el trabajo</span>
          <h1>De las notas de la junta al acta revisada.</h1>
          <p>Prepara un borrador desde las notas, revisa asistentes y acuerdos y conserva el PDF aprobado. Los acuerdos pueden convertirse en tareas y conocimiento consultable por comunidad. Tú decides cuándo aprobar, archivar y enviar.</p>
          <div className="actions"><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a><Link className="text-link" href="/precios">Ver planes →</Link></div>
        </div>
        <div className="actas-summary" aria-label="Resultado del flujo de actas">
          <span>Original privado</span><b>Foto de apuntes · Notas</b>
          <span>Revisión humana</span><b>Asistentes · Votos · Acuerdos</b>
          <span>Resultado operativo</span><b>Tareas · Memoria · PDF archivado</b>
        </div>
      </section>

      <section className="actas-flow page-shell">
        <div className="section-head"><span className="eyebrow">El flujo completo</span><h2>AfincalIA prepara el borrador. El administrador comprueba y aprueba.</h2><p>Ningún acuerdo se convierte automáticamente en información válida sin revisión.</p></div>
        <div className="actas-steps">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div>
      </section>

      <section className="actas-memory page-shell">
        <div><span className="eyebrow light">Memoria de la comunidad</span><h2>Un acuerdo deja de quedar enterrado en un documento.</h2><p>Los acuerdos aprobados pueden convertirse individualmente en conocimiento verificado. Después AfincalIA puede recuperar qué se decidió, en qué punto del acta aparece y qué tarea se creó a partir de ello.</p></div>
        <ul><li>Fuente y punto exacto del acta</li><li>Versiones y persona que aprobó</li><li>Tarea, responsable y vencimiento</li><li>Actividad completa en la cronología</li></ul>
      </section>

      <section className="legal-note page-shell actas-note"><strong>Control profesional:</strong> AfincalIA genera un borrador de trabajo. La exactitud, aprobación, firma y comunicación formal del acta corresponden al presidente, secretario-administrador y demás responsables conforme al procedimiento aplicable.</section>
      <section className="source-note page-shell actas-included"><strong>Actas está incluida en los tres planes.</strong> Borrador, revisión, versiones, acuerdos, tareas y PDF archivado forman parte del recorrido. La función de envío por correo también está contemplada, pero necesita configuración y una decisión explícita; no queda activada por aprobar el acta.</section>
      <CTA title="Conoce el recorrido completo de Actas." text="En una demostración guiada revisamos cómo un original se convierte en documento aprobado, acuerdos consultables y tareas. Sin usar información de tus comunidades." />
    </Layout>
  );
}
