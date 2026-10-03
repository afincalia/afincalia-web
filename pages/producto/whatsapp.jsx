import Link from "next/link";
import { Meta } from "../../components/PageParts";
import { DEMO_CTA_URL, Layout } from "../../components/SiteChrome";
import { CommercialCTA, HumanControl, SectionHeading } from "../../components/CommercialSections";
import { ProductCapture, productScreens } from "../../components/ProductStory";
import { WhatsAppCases, WhatsAppExample } from "../../components/WhatsAppJourney";

export default function Whatsapp() {
  return <Layout><div className="commercial-v2">
    <Meta title="Atención a comunidades por WhatsApp" description="Del mensaje del vecino a una respuesta con fuente, una petición de datos o una incidencia. AfincalIA ayuda a atender; tu despacho conserva el control." />
    <section className="review-hero wa-hero page-shell">
      <div className="review-hero-copy"><span className="review-kicker">Atención por WhatsApp</span><h1>El vecino escribe.<br/>AfincalIA ayuda.<br/><em>Tu despacho controla.</em></h1><p className="review-intro">Consultas cotidianas, avisos que necesitan actuación y asuntos que debe revisar una persona. El mensaje se conecta con el contacto, la comunidad y sus fuentes cuando constan.</p><p className="wa-hero-detail">Con la configuración autorizada, puede responder con información verificada, pedir datos y registrar determinados avisos. Si falta contexto o el caso es sensible, interviene el equipo.</p><div className="review-actions"><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a><Link className="review-text-link" href="/demo">Ver ejemplos y capturas</Link></div></div>
      <WhatsAppExample />
    </section>
    <section className="review-section page-shell"><SectionHeading label="Desde el mensaje hasta el siguiente paso" title="Atender no siempre significa lo mismo." text="Estos ejemplos ilustran el alcance. Cada envío requiere un canal válido y permisos; el despacho revisa las excepciones."/><WhatsAppCases /></section>
    <section className="review-product-section"><div className="product-split page-shell"><div><SectionHeading label="Cuando te toca intervenir" title="El contexto acompaña al mensaje." text="El equipo revisa la conversación, consulta la información disponible y prepara su respuesta. La pantalla señala la intervención humana y distingue escribir de enviar."/><ul className="plain-checks"><li>Si no se conoce con certeza el contacto o la comunidad, se revisa.</li><li>Las consultas económicas, jurídicas o sensibles se derivan al despacho.</li><li>Una respuesta recibida no demuestra que una reparación esté terminada.</li></ul><Link href="/como-funciona" className="review-text-link">Seguir el recorrido completo</Link></div><ProductCapture screen={productScreens[4]} pins={false}/></div></section>
    <section className="review-section page-shell"><HumanControl /></section>
    <CommercialCTA />
  </div></Layout>;
}
