import Link from "next/link";
import { Meta } from "../components/PageParts";
import { Layout } from "../components/SiteChrome";
import { ProductStory } from "../components/ProductStory";
import { CommercialCTA, HumanControl } from "../components/CommercialSections";

const steps = [
  ["Entra una consulta", "La conversación conserva mensajes, contacto y comunidad cuando están vinculados. El equipo revisa ese contexto y las indicaciones de intervención.", "Entrada", "Una consulta puede necesitar una respuesta, una aclaración o una actuación."],
  ["Se comprueba la información", "El despacho consulta las fuentes y los datos revisados de la comunidad. La falta de información no se convierte en una respuesta cierta.", "Contexto", "Se distingue la información disponible de lo que aún hay que comprobar."],
  ["Se organiza el siguiente paso", "Cuando hace falta trabajo, se registra una incidencia y se vinculan tareas con responsable, estado y fecha. La actuación depende del caso y del rol del usuario.", "Trabajo", "No todas las consultas tienen que convertirse en incidencias."],
  ["Se revisa y queda registrado", "El equipo comprueba el resultado, actualiza el estado y consulta la actividad anterior. Cada petición conserva su propio origen, respuesta asociada y estado.", "Seguimiento", "Finalizar una petición de información no equivale a dar por reparada una avería."],
];

export default function ComoFunciona() {
  return <Layout><div className="commercial-v2">
    <Meta title="Cómo funciona AfincalIA" description="Consulta, contexto, actuación y revisión: conoce qué hace AfincalIA, cuándo interviene el equipo y dónde queda registrado el trabajo."/>
    <section className="review-page-hero page-shell"><span className="review-kicker">Cómo funciona</span><h1>Un recorrido claro,<br/><em>desde la consulta hasta la revisión.</em></h1><p>No todos los asuntos necesitan el mismo camino. AfincalIA organiza el contexto y el trabajo; el despacho decide cómo atender cada caso.</p><div className="review-actions"><Link className="button" href="/demo">Explorar las pantallas reales</Link><a href="#el-recorrido" className="review-text-link">Leer los cuatro pasos</a></div></section>
    <section className="process-editorial page-shell" id="el-recorrido">{steps.map(([title,text,label,result],i)=><article key={title}><div className="process-index"><span>0{i+1}</span><small>{label}</small></div><div><h2>{title}</h2><p>{text}</p></div><aside><strong>Lo que conviene distinguir</strong><p>{result}</p></aside></article>)}</section>
    <section className="review-product-section"><div className="page-shell"><div className="review-section-heading"><span className="review-kicker">Dónde se ve</span><h2>Las pantallas que acompañan ese trabajo.</h2><p>Estas capturas muestran las vistas del piloto, con datos de demostración. Son una guía de lectura, no una simulación de envíos automáticos.</p></div><ProductStory includeConversation id="recorrido-completo"/></div></section>
    <section className="request-explainer page-shell"><div><span className="review-kicker">Cuando faltan datos</span><h2>Cada petición mantiene<br/>su propia historia.</h2><p>Una conversación puede contener varios asuntos. La aplicación muestra el origen de cada petición, la respuesta asociada cuando existe y su estado, para que el equipo sepa qué está revisando.</p></div><div className="request-facts"><article><h3>Una respuesta tiene un contexto</h3><p>Recibir información para una petición no completa las demás.</p></article><article><h3>Una excepción pide intervención</h3><p>El administrador puede asumirla, mantenerla pendiente o detener el seguimiento cuando el estado lo permite.</p></article><article><h3>Un resultado incierto no se da por hecho</h3><p>Si no se puede confirmar una entrega, hay que revisarla antes de repetir la comunicación.</p></article></div></section>
    <section className="review-section page-shell"><HumanControl compact/></section>
    <CommercialCTA/>
  </div></Layout>;
}
