import { Meta } from "../components/PageParts";
import { CTA, Layout } from "../components/SiteChrome";

const safeguards=[
  ["Separación por despacho y comunidad","La información se organiza dentro del ámbito que le corresponde para evitar cruces de contexto."],
  ["Acceso controlado","Los documentos y datos privados deben quedar disponibles únicamente para usuarios autorizados."],
  ["Revisión humana","Cuando una respuesta no tiene base suficiente o el asunto es sensible, el equipo debe intervenir."],
  ["Registro de actividad","Las acciones operativas relevantes se conservan en una cronología con responsables y fechas."],
];

export default function Seguridad(){return <Layout><Meta title="Privacidad y seguridad" description="Enfoque de privacidad y condiciones para evaluar Afincalia antes de incorporar datos reales."/><section className="content-page page-shell"><div className="section-head"><span className="eyebrow">Privacidad y seguridad</span><h2>Primero se valida el producto. Después se acuerda el tratamiento de datos.</h2><p>La demostración y la primera configuración se realizan sin información real del despacho. La incorporación de datos reales solo debe comenzar cuando estén documentadas las responsabilidades, finalidades, accesos, conservación y proveedores implicados.</p></div><div className="policy-grid">{safeguards.map(([title,text])=><article key={title}><h2>{title}</h2><p>{text}</p></article>)}</div><div className="legal-note"><strong>Un compromiso honesto:</strong> esta página explica el enfoque previsto de Afincalia; no sustituye la revisión jurídica ni afirma un cumplimiento automático. Antes de utilizar información real se concretarán las medidas técnicas y organizativas, los contratos necesarios y las condiciones de cada integración.</div></section><CTA eyebrow="Evaluación responsable" title="Comprueba el producto sin exponer información real."/></Layout>}
