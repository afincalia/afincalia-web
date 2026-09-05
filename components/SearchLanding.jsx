import Link from "next/link";
import { Meta } from "./PageParts";
import { CTA, Layout } from "./SiteChrome";

export default function SearchLanding({ metaTitle, description, path, eyebrow, title, intro, pains, steps, fit, related }) {
  return <Layout>
    <Meta title={metaTitle} description={description} path={path} />
    <section className="case-hero page-shell">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{intro}</p>
      <div className="actions"><Link className="button" href="/piloto">Solicitar piloto fundador</Link><Link className="text-link" href="/como-funciona">Ver el flujo completo →</Link></div>
    </section>
    <section className="problem-section page-shell">
      <div className="section-head"><h2>El problema operativo</h2></div>
      <div className="problem-grid">{pains.map((item, index)=><article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
    <section className="split-section page-shell">
      <div><span className="eyebrow">Cómo lo resuelve AfincalIA</span><h2>Del mensaje suelto al caso trazable.</h2><p className="lead">AfincalIA no sustituye el programa contable ni el criterio profesional. Conecta la atención diaria con el trabajo que el equipo debe ejecutar.</p></div>
      <ol className="process-list">{steps.map((item,index)=><li key={item}><b>{index + 1}</b><span>{item}</span></li>)}</ol>
    </section>
    <section className="content-page page-shell">
      <div className="section-head"><span className="eyebrow">Encaje</span><h2>{fit.title}</h2><p>{fit.text}</p></div>
      <div className="related-links"><strong>También puede interesarte</strong>{related.map(([label,href])=><Link href={href} key={href}>{label} →</Link>)}</div>
    </section>
    <CTA eyebrow="Piloto fundador" title="Prueba un flujo real durante 30 días." text="Seleccionamos un problema prioritario del despacho, medimos el resultado y decidimos con datos si AfincalIA encaja." />
  </Layout>;
}
