import Link from "next/link";
import { Meta } from "../components/PageParts";
import { DEMO_CTA_URL, Layout } from "../components/SiteChrome";
import { ProductCapture, ProductStory, productScreens } from "../components/ProductStory";
import { CommercialCTA, CommercialFAQ, HumanControl, SectionHeading } from "../components/CommercialSections";

const dailyWork = [
  { number: "01", need: "Una consulta sobre una comunidad", title: "El contexto, junto a la conversación.", text: "Consulta mensajes, contacto, comunidad y necesidad de intervención. Revisa la información antes de preparar una respuesta.", href: "/producto/whatsapp", link: "Conversaciones y atención" },
  { number: "02", need: "Un aviso que necesita actuación", title: "De la incidencia al trabajo asignado.", text: "Registra el caso y vincula tareas con responsable, estado y fecha. Consulta lo pendiente y conserva el trabajo completado.", href: "/producto/incidencias-tareas", link: "Incidencias y tareas" },
  { number: "03", need: "Una decisión que habrá que recordar", title: "Las fuentes siguen acompañando al caso.", text: "Organiza documentos y datos revisados por comunidad. Consulta su procedencia y la actividad registrada por el equipo.", href: "/producto/conocimiento", link: "Conocimiento y fuentes" },
];

export default function Home() {
  return <Layout><div className="commercial-v2">
    <Meta title="AfincalIA · Consultas y trabajo organizado" description="Tu empleado digital para organizar conversaciones, información por comunidad, incidencias, tareas y actas. El contexto a la vista y el control en tu despacho." />
    <section className="review-hero page-shell">
      <div className="review-hero-copy"><span className="review-kicker">Para administradores de fincas y despachos</span><h1>De la consulta<br/>al trabajo<br/><em>organizado.</em></h1><p className="review-intro">AfincalIA es el empleado digital del despacho: reúne las consultas con la información de cada comunidad y ayuda a seguir incidencias, tareas y actas. Tu equipo ve qué falta, quién debe intervenir y qué resultado ha quedado registrado.</p><div className="review-actions"><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a><Link className="review-text-link" href="/demo">Ver capturas del producto</Link></div><p className="review-hero-note">Sin sustituir tu programa contable. Con permisos y revisión del equipo.</p></div>
      <div className="hero-evidence"><div className="hero-evidence-heading"><span>Así se ve en AfincalIA</span><strong>El trabajo pendiente, localizado.</strong></div><ProductCapture screen={productScreens[2]} pins={false}/><div className="hero-evidence-caption"><span>Qué mirar</span><p>Filtros por comunidad, responsable y estado. Debajo, el aviso simulado que necesita actuación.</p></div><Link href="/demo" className="review-text-link">Explorar las capturas explicadas</Link></div>
    </section>
    <nav className="review-section-nav page-shell" aria-label="En esta página"><span>Conoce AfincalIA</span><a href="#trabajo-diario">Qué te ayuda a gestionar</a><a href="#producto-en-pantalla">Cómo se ve</a><a href="#control-humano">Tu control</a><a href="#preguntas-frecuentes">Preguntas frecuentes</a></nav>
    <section className="review-section page-shell" id="trabajo-diario">
      <SectionHeading label="El trabajo diario" title="Cada asunto necesita algo más que un mensaje." text="Encontrar el contexto, decidir qué hacer y poder volver al resultado. AfincalIA reúne esas piezas en el mismo entorno." />
      <div className="daily-work-grid">{dailyWork.map(item=><article key={item.number}><div className="daily-work-top"><span>{item.number}</span><p>{item.need}</p></div><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href} className="review-text-link">{item.link}</Link></article>)}</div>
    </section>
    <section className="review-product-section" id="producto-en-pantalla"><div className="page-shell">
      <SectionHeading label="El producto, en pantalla" title="Mira dónde queda cada cosa." text="Un recorrido por cuatro vistas reales del piloto. Selecciona un paso y descubre qué puede consultar el equipo y qué decisión le corresponde." />
      <ProductStory id="recorrido-portada" />
      <div className="story-footnote"><span>Capturas reales · datos de demostración · sin envíos</span><Link href="/como-funciona" className="review-text-link">Entender el recorrido completo</Link></div>
    </div></section>
    <section className="review-section page-shell"><HumanControl /></section>
    <section className="minutes-feature page-shell"><div><span className="review-kicker">También después de la junta</span><h2>Las notas se convierten<br/>en un <em>borrador revisable.</em></h2><p>Prepara el borrador desde el texto de la junta, revisa los puntos y acuerdos y archiva el PDF aprobado. Los acuerdos pueden vincularse a tareas y a la información de la comunidad.</p><Link className="review-text-link" href="/actas">Conocer el recorrido de las actas</Link></div><ol aria-label="Recorrido de las actas"><li><span>01</span><div><strong>Notas y original</strong><p>El punto de partida queda vinculado a la comunidad.</p></div></li><li><span>02</span><div><strong>Borrador y revisión</strong><p>El administrador contrasta los acuerdos y su evidencia.</p></div></li><li><span>03</span><div><strong>Aprobación y archivo</strong><p>El PDF aprobado se conserva. Archivar no significa enviar.</p></div></li></ol></section>
    <section className="getting-started page-shell"><SectionHeading label="Empezar con un caso concreto" title="Primero lo ves. Después decides el alcance."/><div className="start-steps"><article><span>1</span><h3>Explora las capturas</h3><p>Consulta el recorrido visual con datos de demostración. No necesitas una cuenta ni aportas datos de clientes.</p></article><article><span>2</span><h3>Solicita una demo guiada</h3><p>Vemos contigo el caso de uso, las funciones y sus permisos. Los canales y automatismos requieren configuración y autorización.</p></article><article><span>3</span><h3>Evalúa el piloto</h3><p>Conserva un alcance concreto y comprueba el trabajo realizado, los pendientes y las excepciones.</p><Link href="/piloto" className="review-text-link">Ver las condiciones vigentes</Link></article></div></section>
    <CommercialFAQ />
    <CommercialCTA />
  </div></Layout>;
}
