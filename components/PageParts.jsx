import Head from "next/head";
import Link from "next/link";
import { CTA, DEMO_URL, Layout } from "./SiteChrome";

export function Meta({ title, description }) {
  return <Head><title>{title} · Afincalia</title><meta name="description" content={description} /><meta name="viewport" content="width=device-width, initial-scale=1" /></Head>;
}

export function PageHero({ eyebrow, title, text, image, imageAlt, children }) {
  return (
    <section className="inner-hero page-shell">
      <div className="inner-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{children}</div>
      {image ? <div className="product-shot"><img src={image} alt={imageAlt} /></div> : null}
    </section>
  );
}

export function DetailPage({ metaTitle, description, eyebrow, title, intro, image, imageAlt, outcomes, process, processTitle, note }) {
  return (
    <Layout>
      <Meta title={metaTitle} description={description} />
      <PageHero eyebrow={eyebrow} title={title} text={intro} image={image} imageAlt={imageAlt}>
        <div className="actions"><a className="button" href={DEMO_URL}>Probar demo</a><Link className="text-link" href="/como-funciona">Ver el caso completo →</Link></div>
      </PageHero>
      <section className="detail-grid page-shell">
        {outcomes.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h2>{item.title}</h2><p>{item.text}</p></article>)}
      </section>
      <section className="split-section page-shell">
        <div><span className="eyebrow">En la práctica</span><h2>{processTitle}</h2>{note ? <p className="lead">{note}</p> : null}</div>
        <ol className="process-list">{process.map((item, index) => <li key={item}><b>{index + 1}</b><span>{item}</span></li>)}</ol>
      </section>
      <CTA />
    </Layout>
  );
}
