import Link from "next/link";
import { Meta } from "../../components/PageParts";
import { CTA, Layout } from "../../components/SiteChrome";
import { articles, getArticle } from "../../content/articles";

export default function ArticlePage({article}){return <Layout>
  <Meta title={article.title} description={article.description} path={`/blog/${article.slug}`} type="article" />
  <article className="article-page page-shell">
    <header><span className="eyebrow">{article.category} · {article.readingTime}</span><h1>{article.title}</h1><p>{article.intro}</p></header>
    <div className="article-body">{article.sections.map((section)=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>)}</div>
    <div className="article-next"><Link className="text-link" href="/blog">← Ver todos los recursos</Link><Link className="button" href="/piloto">Solicitar piloto fundador</Link></div>
  </article>
  <CTA title="Evalúa AfincalIA con un flujo real." text="Treinta días, un problema prioritario y métricas acordadas antes de empezar." />
</Layout>}

export function getStaticPaths(){return {paths:articles.map((article)=>({params:{slug:article.slug}})),fallback:false}}
export function getStaticProps({params}){return {props:{article:getArticle(params.slug)}}}
