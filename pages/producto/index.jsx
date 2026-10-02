import Link from "next/link";
import { Meta } from "../../components/PageParts";
import { Layout } from "../../components/SiteChrome";
import { CommercialCTA, CommercialFAQ, HumanControl, SectionHeading } from "../../components/CommercialSections";
import { ProductCapture, productScreens } from "../../components/ProductStory";

const areas = [
  ["Cuando llega una consulta", "Conversaciones con contexto", "Mensajes, contacto, comunidad y necesidad de intervención a la vista. Las respuestas manuales requieren un canal configurado y una decisión de envío.", "/producto/whatsapp", "Conocer las conversaciones"],
  ["Cuando buscas una respuesta fiable", "Conocimiento por comunidad", "Fuentes y datos revisados, con procedencia y ámbito. El despacho controla qué información incorpora y cuándo la revisa.", "/producto/conocimiento", "Ver cómo se organiza la información"],
  ["Cuando hace falta actuar", "Incidencias y tareas conectadas", "Registra el trabajo, vincula una tarea y consulta responsable, fecha y estado. Lo completado sigue disponible para revisar el caso.", "/producto/incidencias-tareas", "Conocer el recorrido del trabajo"],
  ["Cuando termina una junta", "Actas que se pueden revisar", "Prepara un borrador desde las notas, contrasta los acuerdos y archiva el PDF aprobado. Puedes vincular acuerdos a tareas y conocimiento.", "/actas", "Ver el recorrido de un acta"],
  ["Cuando necesitas saber qué pasó", "Actividad e historial consultables", "El panel y la cronología reúnen el contexto de la comunidad. Revisa actuaciones, cambios y pendientes antes de decidir el siguiente paso.", "/producto/trazabilidad", "Conocer el historial"],
];

export default function Producto() {
  return <Layout><div className="commercial-v2">
    <Meta title="Qué hace AfincalIA" description="Conversaciones, conocimiento, incidencias, tareas y actas: funciones concretas para organizar el trabajo de un despacho de administración de fincas."/>
    <section className="review-page-hero page-shell"><span className="review-kicker">El producto actual</span><h1>Lo que necesita<br/>un asunto para <em>seguir adelante.</em></h1><p>Contexto para entenderlo, información para revisarlo y trabajo organizado para actuar. Un mismo entorno, con el control del despacho.</p></section>
    <section className="product-editorial page-shell">{areas.map(([label,title,text,href,link],i)=><article key={href}><span className="product-index">0{i+1}</span><div><small>{label}</small><h2>{title}</h2></div><div><p>{text}</p><Link href={href} className="review-text-link">{link}</Link></div></article>)}</section>
    <section className="review-product-section"><div className="product-split page-shell"><div><SectionHeading label="Una vista concreta" title="Tu información, dentro de su comunidad." text="En Conocimiento se distinguen fuentes, datos revisados y ámbito. No es una biblioteca genérica separada del trabajo diario."/><ul className="plain-checks"><li>El filtro de comunidad permanece visible.</li><li>Los documentos y los datos tienen su propio lugar.</li><li>La pantalla recuerda cuándo hace falta revisión.</li></ul><Link href="/demo" className="review-text-link">Explorar más capturas</Link></div><ProductCapture screen={productScreens[1]} pins={false}/></div></section>
    <section className="availability-section page-shell"><SectionHeading label="Un alcance explicado" title="Disponible no significa activado sin control."/><div className="availability-columns"><article><span>Trabajo en la aplicación</span><h3>Consulta y gestiona</h3><p>Conversaciones, fuentes, incidencias, tareas, actas e historial, dentro del ámbito y los permisos de tu usuario.</p></article><article><span>Con configuración y autorización</span><h3>Revisa cada canal</h3><p>Conectar WhatsApp o enviar una comunicación requiere configuración válida. Los recordatorios y seguimientos automáticos no están habilitados por defecto.</p></article><article><span>Decisiones del despacho</span><h3>Comprueba el resultado</h3><p>La aprobación de un acta, el contenido verificado, las excepciones y las decisiones sensibles requieren intervención humana.</p></article></div></section>
    <section className="review-section page-shell"><HumanControl compact/></section>
    <CommercialFAQ/><CommercialCTA/>
  </div></Layout>;
}
