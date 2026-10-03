import Link from "next/link";
import { Meta } from "../components/PageParts";
import { DEMO_CTA_URL, Layout } from "../components/SiteChrome";
import { ProductStory } from "../components/ProductStory";
import { WhatsAppCases, WhatsAppExample } from "../components/WhatsAppJourney";
import { CommercialCTA, CommercialFAQ, HumanControl, SectionHeading } from "../components/CommercialSections";

export default function Home() {
  return <Layout><div className="commercial-v2">
    <Meta title="AfincalIA · El cerebro de tu despacho" description="El cerebro de tu despacho. Tus comunidades, atendidas por WhatsApp. Conecta información verificada, conversaciones, incidencias, tareas y actas con el control de tu equipo." />
    <section className="review-hero wa-hero page-shell">
      <div className="review-hero-copy"><span className="review-kicker">Para administradores de fincas y despachos</span><h1><span>El cerebro de tu despacho.</span><em>Tus comunidades, atendidas por WhatsApp.</em></h1><p className="review-intro">Conecta las conversaciones con la información de cada comunidad, las incidencias, las tareas y las actas. Atiende consultas con información verificada y ayuda a organizar el trabajo, mientras tu equipo conserva el control.</p><p className="wa-hero-detail">Recupera antecedentes, relaciona cada asunto con su comunidad y hace visibles los pendientes para que tu equipo pueda darles continuidad.</p><div className="review-actions"><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a><Link className="review-text-link" href="/demo">Ver el recorrido por WhatsApp</Link></div><p className="review-hero-note">Las respuestas y actuaciones dependen de la información, la configuración y los permisos del despacho.</p></div>
      <WhatsAppExample />
    </section>
    <nav className="review-section-nav page-shell" aria-label="En esta página"><span>Conoce AfincalIA</span><a href="#trabajo-diario">Qué te ayuda a gestionar</a><a href="#producto-en-pantalla">Cómo se ve</a><a href="#control-humano">Tu control</a><a href="#preguntas-frecuentes">Preguntas frecuentes</a></nav>
    <section className="review-section page-shell" id="trabajo-diario">
      <SectionHeading label="Todo empieza con un WhatsApp" title="Tres mensajes. Tres formas de atenderlos." text="Ejemplos explicados de consultas, avisos e intervención humana. La respuesta depende del contexto, las fuentes y los permisos de cada caso." />
      <WhatsAppCases />
    </section>
    <section className="review-product-section" id="producto-en-pantalla"><div className="page-shell">
      <SectionHeading label="Así lo controla tu despacho" title="La conversación inicia el trabajo. El panel le da continuidad." text="Cinco vistas reales con datos de demostración: conversación, comunidad, información, incidencia y tarea. Aquí ves dónde revisa e interviene tu equipo." />
      <ProductStory includeConversation id="recorrido-portada" />
      <div className="story-footnote"><span>Capturas reales · datos de demostración · sin envíos</span><Link href="/como-funciona" className="review-text-link">Entender el recorrido completo</Link></div>
    </div></section>
    <section className="review-section page-shell"><HumanControl /></section>
    <section className="minutes-feature page-shell"><div><span className="review-kicker">También después de la junta</span><h2>Las notas se convierten<br/>en un <em>borrador revisable.</em></h2><p>Prepara el borrador desde el texto de la junta, revisa los puntos y acuerdos y archiva el PDF aprobado. Los acuerdos pueden vincularse a tareas y a la información de la comunidad.</p><Link className="review-text-link" href="/actas">Conocer el recorrido de las actas</Link></div><ol aria-label="Recorrido de las actas"><li><span>01</span><div><strong>Notas y original</strong><p>El punto de partida queda vinculado a la comunidad.</p></div></li><li><span>02</span><div><strong>Borrador y revisión</strong><p>El administrador contrasta los acuerdos y su evidencia.</p></div></li><li><span>03</span><div><strong>Aprobación y archivo</strong><p>El PDF aprobado se conserva. Archivar no significa enviar.</p></div></li></ol></section>
    <section className="getting-started page-shell"><SectionHeading label="Empezar con un caso concreto" title="Primero lo ves. Después decides el alcance."/><div className="start-steps"><article><span>1</span><h3>Explora las capturas</h3><p>Consulta el recorrido visual con datos de demostración. No necesitas una cuenta ni aportas datos de clientes.</p></article><article><span>2</span><h3>Solicita una demo guiada</h3><p>Vemos contigo el caso de uso, las funciones y sus permisos. Los canales y automatismos requieren configuración y autorización.</p></article><article><span>3</span><h3>Prueba 30 días gratis</h3><p>Evalúa el trabajo realizado, los pendientes y las excepciones. Sin cobro automático ni permanencia; al terminar, decides si continúas y aceptas el plan elegido.</p><Link href="/piloto" className="review-text-link">Ver las condiciones del piloto</Link></article></div></section>
    <CommercialFAQ />
    <CommercialCTA />
  </div></Layout>;
}
