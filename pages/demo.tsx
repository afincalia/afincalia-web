import Link from "next/link";
import { Meta } from "../components/PageParts";
import { DEMO_CTA_URL, Layout } from "../components/SiteChrome";
import { ProductStory } from "../components/ProductStory";
import { CommercialCTA } from "../components/CommercialSections";

export default function DemoPage() {
  return <Layout><div className="commercial-v2">
    <Meta title="Demo visual de AfincalIA" description="Explora capturas reales del producto con datos de demostración: conversación, comunidad, fuentes, incidencias y tareas. Sin registro ni envíos." path="/demo"/>
    <section className="review-page-hero demo-guide-hero page-shell"><span className="review-kicker">Recorrido visual · datos de demostración</span><h1>Entra en las pantallas.<br/><em>Entiende el trabajo.</em></h1><p>Selecciona una vista, sigue las anotaciones y amplía el detalle. Son capturas reales de la interfaz del piloto; no una aplicación que esté enviando mensajes o gestionando casos.</p><div className="demo-guide-meta"><span>Sin registro</span><span>Sin datos de clientes</span><span>Sin envíos</span></div></section>
    <section className="demo-guide page-shell"><ProductStory includeConversation id="recorrido-demo"/></section>
    <section className="demo-observation page-shell"><div><span className="review-kicker">Lo que muestra este recorrido</span><h2>Contexto, organización<br/>y puntos de revisión.</h2><p>Las capturas enseñan dónde encontrar la información. No demuestran por sí solas que una respuesta se envíe automáticamente ni que una reparación esté terminada.</p></div><div><h3>¿Quieres comprobar un caso de principio a fin?</h3><p>En una demostración guiada podemos explicar el flujo, los permisos y la configuración que necesita cada actuación, utilizando datos de ejemplo.</p><a href={DEMO_CTA_URL} className="button">Solicitar demo</a><Link className="review-text-link" href="/como-funciona">Leer cómo funciona</Link></div></section>
    <CommercialCTA/>
  </div></Layout>;
}
