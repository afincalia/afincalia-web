import { Meta } from "../components/PageParts";
import ExperienceChoices from "../components/ExperienceChoices";
import ContactEmail from "../components/ContactEmail";
import { DEMO_URL, DEMO_CTA_URL, Layout } from "../components/SiteChrome";

const measures = [
  ["Consultas", "Atendidas y preparadas para revisión"],
  ["Incidencias", "Detectadas desde conversaciones"],
  ["Tareas", "Creadas, asignadas y resueltas"],
  ["Actas", "Acuerdos extraídos y convertidos en trabajo"],
  ["Memoria", "Veces que recupera contexto validado"],
  ["Trabajo del equipo", "Tiempo dedicado, revisiones y pendientes observados"],
];

export default function Piloto() {
  return (
    <Layout>
      <Meta title="Piloto gratuito de 30 días" description="Prueba AfincalIA durante 30 días, sin cobro automático ni permanencia. Al terminar, decides si continúas y aceptas expresamente el plan elegido." />
      <section className="content-page page-shell">
        <div className="section-head">
          <span className="eyebrow">Piloto completamente online</span>
          <h1>30 días para comprobar cuánto trabajo puede asumir AfincalIA.</h1>
          <p>Las capturas te permiten conocer las pantallas. La demostración guiada sirve para resolver dudas con el equipo. El piloto es el paso siguiente: acordamos las comunidades, los casos de uso, responsables y permisos antes de empezar.</p>
        </div>

        <div className="offer-card">
          <h2>30 días de piloto gratuito.</h2>
          <p>Prueba AfincalIA durante 30 días, sin cobro automático ni permanencia. Al terminar, decides si continúas y aceptas expresamente el plan elegido.</p>
          <ul>
            <li>Recorrido visual disponible sin registro y demo guiada por solicitud</li>
            <li>Configuración online del despacho y del caso prioritario</li>
            <li>Comunidades, fuentes y permisos revisados antes de empezar</li>
            <li>Acompañamiento y soporte escrito durante la evaluación</li>
            <li>Resumen final de actividad y resultados</li>
          </ul>
          <div className="actions"><a className="button button-light" href={DEMO_URL}>Ver capturas</a><a className="button button-coral" href={DEMO_CTA_URL}>Solicitar demo</a></div><ContactEmail light />
        </div>

        <ExperienceChoices />

        <div className="section-head"><span className="eyebrow">Resultados del piloto</span><h2>No medimos si “gusta”. Medimos el trabajo que organiza.</h2></div>
        <div className="roi-grid">{measures.map(([title, text]) => <article key={title}><b>{title}</b><span>{text}</span></article>)}</div>

        <div className="pilot-grid">
          <article><span>01</span><h2>Comprueba el recorrido</h2><p>Explora las capturas y solicita una demostración guiada para comprender las funciones disponibles. Las imágenes no son una sesión operable del producto.</p></article>
          <article><span>02</span><h2>Acuerda el piloto</h2><p>Revisamos el caso, el alcance y los permisos con el despacho. Solicitar información no abre una cuenta ni activa comunicaciones.</p></article>
          <article><span>03</span><h2>Trabaja y consulta</h2><p>El equipo registra y revisa el trabajo. Si se evalúan actas, distingue borrador, aprobación, archivo y envío autorizado; si se usa un canal, se configura previamente.</p></article>
          <article><span>04</span><h2>Decide con resultados</h2><p>Al terminar se revisa la actividad registrada. Continuar exige aceptar expresamente el plan elegido.</p></article>
        </div>

        <div className="legal-note"><strong>Datos reales:</strong> solo se incorporarán cuando estén preparados los contratos, encargos de tratamiento y garantías aplicables. La participación no obliga a contratar.</div>
      </section>
    </Layout>
  );
}
