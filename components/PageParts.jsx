import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CTA, DEMO_URL, Layout } from "./SiteChrome";

export function Meta({ title, description, path, type = "website" }) {
  const router = useRouter();
  const siteUrl = "https://afincalia.es";
  const cleanPath = (path || router.asPath || "/").split("?")[0];
  const canonical = `${siteUrl}${cleanPath === "/" ? "" : cleanPath}`;
  const fullTitle = title.includes("AfincalIA") ? title : `${title} · AfincalIA`;
  return <Head>
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content={type} />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="AfincalIA" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
  </Head>;
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
