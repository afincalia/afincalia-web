import Link from "next/link";
import { Meta } from "../components/PageParts";
import { Layout } from "../components/SiteChrome";
import { ProductStory } from "../components/ProductStory";
import { CommercialCTA, HumanControl } from "../components/CommercialSections";

const steps = [
  ["El vecino escribe por WhatsApp", "AfincalIA conserva el mensaje y utiliza el contacto y la comunidad cuando están identificados. Si faltan o hay ambigüedad, el caso requiere revisión.", "Entrada", "Una consulta puede necesitar una respuesta, una aclaración o una actuación."],
  ["Una respuesta con base, o el dato que falta", "Puede responder una consulta sencilla desde un dato verificado o pedir la ubicación de un aviso incompleto, cuando el canal y la autorización lo permiten. Los asuntos sensibles pasan al despacho.", "Atención", "Una propuesta de respuesta no es un envío. Sin fuente suficiente no se inventa la información."],
  ["El aviso se conecta con el trabajo", "Los avisos admitidos con datos suficientes pueden convertirse en incidencias. El despacho organiza la actuación y vincula tareas con responsable, estado y fecha; no todas las conversaciones siguen este camino.", "Actuación", "El vecino se comunica por WhatsApp; el equipo controla el trabajo en la aplicación."],
  ["Se revisa y queda registrado", "El equipo comprueba el resultado, actualiza el estado y consulta la actividad anterior. Cada petición conserva su propio origen, respuesta asociada y estado.", "Seguimiento", "Finalizar una petición de información no equivale a dar por reparada una avería."],
];

export default function ComoFunciona() {
  return <Layout><div className="commercial-v2">
    <Meta title="Cómo funciona AfincalIA por WhatsApp" description="Del WhatsApp del vecino a la información verificada, la petición de datos o la actuación del despacho. Un recorrido con permisos, seguimiento y revisión."/>
    <section className="review-page-hero page-shell"><span className="review-kicker">Cómo funciona</span><h1>Todo empieza<br/><em>con un WhatsApp.</em></h1><p>Una respuesta, una aclaración o una actuación: AfincalIA ayuda a encaminar cada mensaje. El despacho autoriza el alcance, interviene cuando corresponde y comprueba el resultado.</p><div className="review-actions"><Link className="button" href="/demo">Ver ejemplos y capturas</Link><a href="#el-recorrido" className="review-text-link">Leer los cuatro pasos</a></div></section>
    <section className="process-editorial page-shell" id="el-recorrido">{steps.map(([title,text,label,result],i)=><article key={title}><div className="process-index"><span>0{i+1}</span><small>{label}</small></div><div><h2>{title}</h2><p>{text}</p></div><aside><strong>Lo que conviene distinguir</strong><p>{result}</p></aside></article>)}</section>
    <section className="review-product-section"><div className="page-shell"><div className="review-section-heading"><span className="review-kicker">Dónde se ve</span><h2>Las pantallas que acompañan ese trabajo.</h2><p>Estas capturas muestran las vistas del piloto, con datos de demostración. Son una guía de lectura, no una simulación de envíos automáticos.</p></div><ProductStory includeConversation id="recorrido-completo"/></div></section>
    <section className="request-explainer page-shell"><div><span className="review-kicker">Después del primer mensaje</span><h2>Cada petición mantiene<br/>su propia historia.</h2><p>La aplicación muestra el origen, la respuesta asociada cuando existe y el estado de cada petición. Los recordatorios automáticos requieren su propia configuración y autorización; no están habilitados por defecto.</p></div><div className="request-facts"><article><h3>Una respuesta tiene un contexto</h3><p>Recibir información para una petición no completa las demás.</p></article><article><h3>Una excepción pide intervención</h3><p>El administrador puede asumirla, mantenerla pendiente o detener el seguimiento cuando el estado lo permite.</p></article><article><h3>Un resultado incierto no se da por hecho</h3><p>Si no se puede confirmar una entrega, hay que revisarla antes de repetir la comunicación.</p></article></div></section>
    <section className="review-section page-shell"><HumanControl compact/></section>
    <CommercialCTA/>
  </div></Layout>;
}
