import Link from "next/link";
import { Meta } from "../../components/PageParts";
import { Layout } from "../../components/SiteChrome";
import { CommercialCTA, CommercialFAQ, HumanControl, SectionHeading } from "../../components/CommercialSections";
import { ProductCapture, productScreens } from "../../components/ProductStory";

const areas = [
  ["Cuando el vecino escribe por WhatsApp", "Atención con contexto y permisos", "AfincalIA puede responder consultas sencillas con una fuente verificada, pedir información que falta y registrar avisos admitidos. Si el asunto necesita criterio profesional, pasa a revisión del despacho.", "/producto/whatsapp", "Conocer la atención por WhatsApp"],
  ["Cuando buscas una respuesta fiable", "Conocimiento por comunidad", "Fuentes y datos revisados, con procedencia y ámbito. El despacho controla qué información incorpora y cuándo la revisa.", "/producto/conocimiento", "Ver cómo se organiza la información"],
  ["Cuando hace falta actuar", "Incidencias y tareas conectadas", "Registra el trabajo, vincula una tarea y consulta responsable, fecha y estado. Lo completado sigue disponible para revisar el caso.", "/producto/incidencias-tareas", "Conocer el recorrido del trabajo"],
  ["Cuando termina una junta", "Actas que se pueden revisar", "Prepara un borrador desde las notas, contrasta los acuerdos y archiva el PDF aprobado. Puedes vincular acuerdos a tareas y conocimiento.", "/actas", "Ver el recorrido de un acta"],
  ["Cuando necesitas saber qué pasó", "Actividad e historial consultables", "El panel y la cronología reúnen el contexto de la comunidad. Revisa actuaciones, cambios y pendientes antes de decidir el siguiente paso.", "/producto/trazabilidad", "Conocer el historial"],
];

export default function Producto() {
  return <Layout><div className="commercial-v2">
    <Meta title="Qué hace AfincalIA" description="Atención a comunidades por WhatsApp conectada con información verificada, incidencias, tareas y actas. Automatizaciones acotadas y control del despacho."/>
    <section className="review-page-hero page-shell"><span className="review-kicker">Atención y trabajo conectados</span><h1>Tus comunidades escriben<br/><em>por WhatsApp.</em></h1><p>AfincalIA ayuda a atender el mensaje y a organizar lo que viene después. Tu equipo controla las fuentes, las excepciones y las actuaciones desde la aplicación.</p><p>Las respuestas y actuaciones automáticas requieren un canal configurado, contexto suficiente y autorización. La gestión del despacho continúa en el panel.</p></section>
    <section className="product-editorial page-shell">{areas.map(([label,title,text,href,link],i)=><article key={href}><span className="product-index">0{i+1}</span><div><small>{label}</small><h2>{title}</h2></div><div><p>{text}</p><Link href={href} className="review-text-link">{link}</Link></div></article>)}</section>
    <section className="review-product-section"><div className="product-split page-shell"><div><SectionHeading label="Una vista concreta" title="Tu información, dentro de su comunidad." text="En Conocimiento se distinguen fuentes, datos revisados y ámbito. No es una biblioteca genérica separada del trabajo diario."/><ul className="plain-checks"><li>El filtro de comunidad permanece visible.</li><li>Los documentos y los datos tienen su propio lugar.</li><li>La pantalla recuerda cuándo hace falta revisión.</li></ul><Link href="/demo" className="review-text-link">Explorar más capturas</Link></div><ProductCapture screen={productScreens[1]} pins={false}/></div></section>
    <section className="availability-section page-shell"><SectionHeading label="Un alcance explicado" title="Qué puede hacer. Qué puedes ver. Qué se habilita."/><div className="availability-columns"><article><span>Capacidad del producto</span><h3>Atender y organizar</h3><p>Respuestas con información verificada, petición de datos y registro de ciertos avisos. El equipo gestiona incidencias, tareas, actas e historial con sus permisos.</p></article><article><span>En este recorrido visual</span><h3>Ver el control del equipo</h3><p>Las capturas reales muestran dónde se consulta y revisa el trabajo. Los ejemplos explican el recorrido; no son recibos de envíos ni una demostración de automatismos activos.</p></article><article><span>En tu despacho</span><h3>Acordar la configuración</h3><p>Antes del piloto se comprueban canal, fuentes y autorizaciones. Los recordatorios necesitan una habilitación específica; no se activan al elegir un plan.</p></article></div></section>
    <section className="review-section page-shell"><HumanControl compact/></section>
    <CommercialFAQ/><CommercialCTA/>
  </div></Layout>;
}
