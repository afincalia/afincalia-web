import { Layout, EMAIL } from '../components/SiteChrome';
import { Meta } from '../components/PageParts';
import { legalConfig } from '../lib/leads';
export async function getServerSideProps() { return { props: { legal: legalConfig() } }; }
export default function Legal({ legal }) {
  return <Layout><Meta title="Aviso legal" description="Identificación y contacto del sitio comercial de AfincalIA."/><article className="content-page legal-page page-shell"><h1>Aviso legal</h1>
    <h2>Titular y contacto</h2><p>AfincalIA es la marca de este sitio web. Contacto: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    {legal.name && legal.taxId && legal.address ? <dl><dt>Titular</dt><dd>{legal.name}</dd><dt>NIF</dt><dd>{legal.taxId}</dd><dt>Domicilio</dt><dd>{legal.address}</dd></dl> : <p className="legal-note">La identificación jurídica completa del titular, su NIF y domicilio están pendientes de publicación. Esta página todavía no constituye un aviso legal completo.</p>}
    <h2>Finalidad del sitio</h2><p>Presentar AfincalIA, sus funciones y condiciones comerciales, y facilitar solicitudes de demostración o piloto. La solicitud no formaliza una contratación ni autoriza un cobro.</p>
    <h2>Demostración</h2><p>El recorrido público utiliza un caso simulado. Sus nombres, importes, tiempos y resultados ilustrativos no son testimonios ni resultados de clientes.</p>
    <h2>Condiciones del servicio</h2><p>La contratación y el uso de datos reales requieren acordar previamente las condiciones del servicio y del tratamiento de datos. Los precios publicados se indican sin IVA.</p></article></Layout>;
}
