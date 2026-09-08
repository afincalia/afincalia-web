import Link from "next/link";
import { Meta } from "../components/PageParts";
import { CTA, Layout } from "../components/SiteChrome";

const principles=[
  ["Separación por despacho y comunidad","El acceso y el contexto deben limitarse al ámbito autorizado para cada usuario y cada caso."],
  ["Información verificada","Las respuestas se preparan desde fuentes y datos que el despacho ha incorporado y revisado."],
  ["Control humano","El equipo decide qué puede avanzar y qué requiere revisión, especialmente ante ambigüedad, riesgo o decisiones sensibles."],
  ["Trazabilidad","Mensajes, cambios, responsables y resoluciones quedan vinculados al caso para facilitar su revisión."],
];

export default function Rgpd(){return <Layout>
  <Meta title="RGPD y tratamiento de datos" description="Criterios de privacidad, control y contratación que AfincalIA aplica antes de incorporar datos reales de un despacho." path="/rgpd" />
  <section className="content-page page-shell">
    <div className="section-head"><span className="eyebrow">Privacidad y RGPD</span><h1>La confianza se documenta antes de incorporar datos reales.</h1><p>AfincalIA se evalúa primero con información de demostración. Para cada piloto real se identifican las partes, finalidades, accesos, conservación, proveedores y medidas aplicables antes de comenzar el tratamiento.</p></div>
    <div className="policy-grid">{principles.map(([title,text])=><article key={title}><h2>{title}</h2><p>{text}</p></article>)}</div>
    <div className="legal-note"><strong>Alcance de esta información:</strong> describe el enfoque operativo del producto. No sustituye el análisis jurídico del despacho ni promete cumplimiento automático. Las condiciones concretas se recogen en los documentos contractuales del piloto.</div>
    <p style={{marginTop:24}}><Link className="text-link" href="/seguridad">Ver privacidad y seguridad →</Link></p>
  </section>
  <CTA eyebrow="Evaluación responsable" title="Comprueba el producto antes de incorporar información real." />
</Layout>}
