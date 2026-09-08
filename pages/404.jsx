import Link from 'next/link';
import Head from 'next/head';
import { Layout } from '../components/SiteChrome';
export default function NotFound() {
  return <Layout><Head><title>Página no encontrada · AfincalIA</title><meta name="robots" content="noindex,follow"/></Head><section className="content-page page-shell"><h1>No encontramos esta página.</h1><p>Puedes volver al inicio o explorar cómo trabaja AfincalIA.</p><div className="actions"><Link className="button" href="/">Ir al inicio</Link><Link className="button" href="/demo">Ver la demo</Link></div></section></Layout>;
}
