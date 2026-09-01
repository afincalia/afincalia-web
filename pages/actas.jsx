import Link from "next/link";
import { Meta } from "../components/PageParts";
import { CTA, Layout } from "../components/SiteChrome";

const steps = [
  ["01", "Añade el original", "Sube un audio, una fotografía, un PDF o pega las notas de la junta. El archivo queda privado y vinculado a su comunidad."],
  ["02", "Obtén el borrador", "AfincalIA transcribe y separa asistentes, orden del día, votaciones, acuerdos, responsables y vencimientos."],
  ["03", "Revisa la evidencia", "Cada punto permanece pendiente de revisión. El administrador contrasta la extracción con el original y corrige lo necesario."],
  ["04", "Convierte acuerdos en trabajo", "Los acuerdos pueden generar tareas con responsable y fecha sin volver a copiarlos en otra herramienta."],
  ["05", "Aprueba y archiva", "La aprobación humana genera el PDF definitivo, conserva la versión y lo archiva en la comunidad."],
  ["06", "Envía y conserva", "El PDF aprobado se envía desde un correo profesional y el envío queda registrado en la cronología."],
];

export default function Actas() {
  return (
    <Layout>
      <Meta title="Actas" description="Convierte audio, fotografía, PDF o notas de una junta en un acta revisada, aprobada y conectada con las tareas del despacho." />
      <section className="actas-hero page-shell">
        <div>
          <span className="eyebrow">Actas conectadas con el trabajo</span>
          <h1>Del borrador de la junta a los acuerdos ejecutados.</h1>
          <p>AfincalIA no se limita a guardar un PDF. Estructura el acta, obliga a revisar los datos extraídos y conecta cada acuerdo con la memoria, las tareas y la cronología de la comunidad.</p>
          <div className="actions"><Link className="button" href="/contacto">Solicitar acceso</Link><Link className="text-link" href="/precios">Ver planes →</Link></div>
        </div>
        <div className="actas-summary" aria-label="Resultado del flujo de actas">
          <span>Original privado</span><b>Audio · Foto · PDF · Notas</b>
          <span>Revisión humana</span><b>Asistentes · Votos · Acuerdos</b>
          <span>Resultado operativo</span><b>Tareas · Memoria · PDF · Envío</b>
        </div>
      </section>

      <section className="actas-flow page-shell">
        <div className="section-head"><span className="eyebrow">El flujo completo</span><h2>La IA prepara. El administrador comprueba y aprueba.</h2><p>Ningún acuerdo se convierte automáticamente en información válida sin revisión.</p></div>
        <div className="actas-steps">{steps.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div>
      </section>

      <section className="actas-memory page-shell">
        <div><span className="eyebrow light">Memoria de la comunidad</span><h2>Un acuerdo deja de quedar enterrado en un documento.</h2><p>Los acuerdos aprobados pueden convertirse individualmente en conocimiento verificado. Después AfincalIA puede recuperar qué se decidió, en qué punto del acta aparece y qué tarea se creó a partir de ello.</p></div>
        <ul><li>Fuente y punto exacto del acta</li><li>Versiones y persona que aprobó</li><li>Tarea, responsable y vencimiento</li><li>Actividad completa en la cronología</li></ul>
      </section>

      <section className="legal-note page-shell actas-note"><strong>Control profesional:</strong> AfincalIA genera un borrador de trabajo. La exactitud, aprobación, firma y comunicación formal del acta corresponden al presidente, secretario-administrador y demás responsables conforme al procedimiento aplicable.</section>
      <CTA title="Prueba el recorrido completo de Actas." text="Comprueba cómo un original se convierte en un documento revisado, acuerdos consultables y tareas con seguimiento." />
    </Layout>
  );
}
