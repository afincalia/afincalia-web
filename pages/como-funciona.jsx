import { Meta } from "../components/PageParts";
import { CTA, Layout } from "../components/SiteChrome";

const steps = [
  ["El vecino escribe", "Envía por WhatsApp una consulta sobre una avería en una zona común.", "/demo/02b-conversation-detail.jpg"],
  ["Afincalia identifica", "Relaciona el teléfono con el contacto y con su comunidad para recuperar el contexto correcto.", "/demo/02-conversations.jpg"],
  ["Responde con información verificada", "Consulta las fuentes revisadas para esa comunidad y prepara una respuesta que el equipo puede supervisar.", "/demo/03-knowledge.jpg"],
  ["Crea una incidencia", "El mensaje que requiere actuación pasa a ser un caso con prioridad, estado y contexto.", "/demo/04-incidents.jpg"],
  ["Vincula una tarea", "El empleado asigna responsable y seguimiento sin copiar la conversación a otra herramienta.", "/demo/05-tasks.jpg"],
  ["Actualiza y resuelve", "El equipo registra avances y cierre; el estado deja de depender de recordar mensajes antiguos.", "/demo/05-tasks.jpg"],
  ["Conserva la cronología", "El administrador puede reconstruir el caso y consultar panel, documentos, contactos y agenda.", "/demo/07-administration.jpg"],
];

export default function ComoFunciona(){return <Layout><Meta title="Cómo funciona" description="Recorre un caso completo desde el WhatsApp hasta la resolución y la cronología."/><section className="case-hero page-shell"><span className="eyebrow">Caso completo</span><h1>De una consulta por WhatsApp a una incidencia resuelta.</h1><p>No es un recorrido de menús. Es la historia de un mensaje que entra, encuentra contexto, se convierte en trabajo y termina con una resolución registrada.</p></section><section className="case-timeline page-shell">{steps.map(([title,text,image],index)=><article className="case-step" key={`${index}-${title}`}><span>0{index+1}</span><div><h2>{title}</h2><p>{text}</p></div><div><img src={image} alt={`${title} en Afincalia`}/></div></article>)}</section><CTA title="Ahora recórrelo tú, paso a paso." text="La demostración guiada reproduce el caso completo para que cualquier despacho pueda entenderlo de forma autónoma."/></Layout>}
