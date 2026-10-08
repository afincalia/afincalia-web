import Link from "next/link";
import { Meta } from "../components/PageParts";
import { DEMO_CTA_URL, Layout } from "../components/SiteChrome";
import { ProductStory } from "../components/ProductStory";
import { CommercialCTA } from "../components/CommercialSections";
import ExperienceChoices from "../components/ExperienceChoices";
import { WhatsAppCases } from "../components/WhatsAppJourney";

export default function DemoPage() {
  return <Layout><div className="commercial-v2">
    <Meta title="Del WhatsApp al trabajo atendido · AfincalIA" description="Tres ejemplos explicados y capturas reales de AfincalIA: del mensaje del vecino a una respuesta, una incidencia o la intervención del despacho. Sin envíos." path="/demo"/>
    <section className="review-page-hero demo-guide-hero page-shell"><span className="review-kicker">Recorrido visual · ejemplos y capturas</span><h1>Un WhatsApp del vecino.<br/><em>Un siguiente paso claro.</em></h1><p>Empieza por lo que pregunta o comunica el vecino. Estos tres ejemplos explican qué puede hacer AfincalIA con la configuración autorizada y cuándo interviene el despacho.</p><div className="demo-guide-meta"><span>Ejemplos ilustrativos</span><span>Sin datos de clientes</span><span>Sin envíos</span></div></section>
    <section className="wa-demo-cases page-shell" aria-label="Ejemplos de atención por WhatsApp"><WhatsAppCases /></section>
    <div className="review-section-heading page-shell wa-demo-heading"><span className="review-kicker">Ahora, dentro de la aplicación</span><h2>Así lo sigue tu equipo.</h2><p>Selecciona una captura real, lee las anotaciones y amplía el detalle. Son imágenes con datos de demostración; sus controles no ejecutan acciones ni crean casos.</p></div>
    <section className="demo-guide page-shell"><ProductStory includeConversation id="recorrido-demo"/></section>
    <section className="demo-observation page-shell"><div><span className="review-kicker">Lo que muestra este recorrido</span><h2>Contexto, organización<br/>y puntos de revisión.</h2><p>Las capturas enseñan dónde encontrar la información. No demuestran por sí solas que una respuesta se envíe automáticamente ni que una reparación esté terminada.</p></div><div><h3>¿Quieres comprobar un caso de principio a fin?</h3><p>En una demostración guiada podemos explicar el flujo, los permisos y la configuración que necesita cada actuación, utilizando datos de ejemplo.</p><a href={DEMO_CTA_URL} className="button">Solicitar demo</a><Link className="review-text-link" href="/como-funciona">Leer cómo funciona</Link></div></section>
    <section className="experience-section page-shell"><h2>Ver, preguntar y evaluar son pasos distintos.</h2><ExperienceChoices /></section>
    <CommercialCTA/>
  </div></Layout>;
}
