import Link from "next/link";
import { Meta } from "../components/PageParts";
import { DEMO_CTA_URL, Layout } from "../components/SiteChrome";
import { ProductStory } from "../components/ProductStory";
import { CommercialCTA } from "../components/CommercialSections";
import ExperienceChoices from "../components/ExperienceChoices";

export default function DemoPage() {
  return <Layout><div className="commercial-v2">
    <Meta title="Recorrido visual de AfincalIA" description="Explora capturas reales del producto con datos de demostración: conversación, comunidad, fuentes, incidencias y tareas. Sin registro ni envíos." path="/demo"/>
    <section className="review-page-hero demo-guide-hero page-shell"><span className="review-kicker">Recorrido visual · datos de demostración</span><h1>Mira las pantallas.<br/><em>Entiende el trabajo.</em></h1><p>Selecciona una captura, sigue las anotaciones y amplía el detalle. Aquí puedes ver cómo se organiza la información; los controles dentro de las imágenes no ejecutan acciones ni crean casos.</p><div className="demo-guide-meta"><span>Sin registro</span><span>Sin datos de clientes</span><span>Sin envíos</span></div></section>
    <section className="demo-guide page-shell"><ProductStory includeConversation id="recorrido-demo"/></section>
    <section className="demo-observation page-shell"><div><span className="review-kicker">Lo que muestra este recorrido</span><h2>Contexto, organización<br/>y puntos de revisión.</h2><p>Las capturas enseñan dónde encontrar la información. No demuestran por sí solas que una respuesta se envíe automáticamente ni que una reparación esté terminada.</p></div><div><h3>¿Quieres comprobar un caso de principio a fin?</h3><p>En una demostración guiada podemos explicar el flujo, los permisos y la configuración que necesita cada actuación, utilizando datos de ejemplo.</p><a href={DEMO_CTA_URL} className="button">Solicitar demo</a><Link className="review-text-link" href="/como-funciona">Leer cómo funciona</Link></div></section>
    <section className="experience-section page-shell"><h2>Ver, preguntar y evaluar son pasos distintos.</h2><ExperienceChoices /></section>
    <CommercialCTA/>
  </div></Layout>;
}
