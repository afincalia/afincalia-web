import Link from "next/link";
import { Meta } from "../components/PageParts";
import { DEMO_URL, Layout } from "../components/SiteChrome";

const measures = [
  ["Consultas", "Atendidas y preparadas para revisión"],
  ["Incidencias", "Detectadas desde conversaciones"],
  ["Tareas", "Creadas, asignadas y resueltas"],
  ["Actas", "Acuerdos extraídos y convertidos en trabajo"],
  ["Memoria", "Veces que recupera contexto validado"],
  ["Tiempo", "Estimación del trabajo operativo ahorrado"],
];

export default function Piloto() {
  return (
    <Layout>
      <Meta title="Piloto online" description="30 días para medir cuánto trabajo puede asumir AfincalIA en un flujo real del despacho." />
      <section className="content-page page-shell">
        <div className="section-head">
          <span className="eyebrow">Piloto completamente online</span>
          <h2>30 días para comprobar cuánto trabajo puede asumir AfincalIA.</h2>
          <p>Primero recorres la demostración guiada. Si el producto encaja, activamos un espacio de piloto con instrucciones dentro de la aplicación, una comunidad y un caso de uso prioritario.</p>
        </div>

        <div className="offer-card">
          <h2>Un mes de piloto gratis.</h2>
          <p>Sin cobro automático y sin permanencia. Los primeros despachos que continúen después del piloto tendrán además tres meses gratuitos a cambio de utilizar el producto y compartir feedback periódico. El primer cobro llegaría después de esos cuatro meses gratuitos y siempre requerirá aceptación expresa.</p>
          <ul>
            <li>Acceso inmediato a una demostración guiada</li>
            <li>Configuración online del despacho y del caso prioritario</li>
            <li>Lista de puesta en marcha dentro del producto</li>
            <li>Centro de ayuda y soporte escrito cuando sea necesario</li>
            <li>Resumen final de actividad y resultados</li>
          </ul>
          <div className="actions"><a className="button button-light" href={DEMO_URL}>Abrir demostración</a><Link className="button button-coral" href="/contacto">Solicitar piloto</Link></div>
        </div>

        <div className="section-head"><span className="eyebrow">Resultados del piloto</span><h2>No medimos si “gusta”. Medimos el trabajo que organiza.</h2></div>
        <div className="roi-grid">{measures.map(([title, text]) => <article key={title}><b>{title}</b><span>{text}</span></article>)}</div>

        <div className="pilot-grid">
          <article><span>01</span><h2>Comprueba el recorrido</h2><p>La demo enseña WhatsApp, conocimiento, incidencia, tarea, resolución, cronología y actas sin necesitar explicación en directo.</p></article>
          <article><span>02</span><h2>Activa el piloto</h2><p>El despacho completa online la información necesaria y elige la comunidad y el caso que quiere medir primero.</p></article>
          <article><span>03</span><h2>Trabaja y consulta</h2><p>El producto guía la puesta en marcha y reúne las explicaciones necesarias para completar cada paso.</p></article>
          <article><span>04</span><h2>Decide con resultados</h2><p>Al terminar se revisa la actividad registrada. Continuar exige aceptar expresamente el plan elegido.</p></article>
        </div>

        <div className="legal-note"><strong>Datos reales:</strong> solo se incorporarán cuando estén preparados los contratos, encargos de tratamiento y garantías aplicables. La participación no obliga a contratar.</div>
      </section>
    </Layout>
  );
}
