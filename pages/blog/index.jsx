import Link from "next/link";
import { Meta } from "../../components/PageParts";
import { CTA, Layout } from "../../components/SiteChrome";
import { articles } from "../../content/articles";

export default function Blog(){return <Layout>
  <Meta title="Recursos para administradores de fincas" description="Guías prácticas sobre WhatsApp, incidencias, inteligencia artificial y organización operativa para despachos de administración de fincas." path="/blog" />
  <section className="case-hero page-shell"><span className="eyebrow">Recursos prácticos</span><h1>Ideas para convertir conversaciones en trabajo controlado.</h1><p>Guías operativas para evaluar la inteligencia artificial con criterio: problemas concretos, flujos medibles y control profesional.</p></section>
  <section className="article-grid page-shell">{articles.map((article)=><article key={article.slug} className="article-card"><span>{article.category} · {article.readingTime}</span><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.description}</p><Link className="text-link" href={`/blog/${article.slug}`}>Leer guía →</Link></article>)}</section>
  <CTA title="¿Quieres ver uno de estos flujos con un caso real?" text="La demostración enseña cómo una consulta se convierte en respuesta, incidencia, tarea y resolución trazable." />
</Layout>}
