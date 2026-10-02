import Link from 'next/link';
import { Layout, EMAIL } from '../components/SiteChrome';
import { Meta } from '../components/PageParts';

export default function Legal() {
  return <Layout><Meta title="Aviso legal" description="Identificación de Alberto Miguel Fonfria Toledo como titular del sitio comercial AfincalIA."/><article className="content-page legal-page page-shell">
    <h1>Aviso legal</h1>
    <p>Actualizado el 2 de octubre de 2026.</p>
    <h2>Titular y contacto</h2>
    <p>AfincalIA es el nombre comercial utilizado por el titular de este sitio web, identificado a continuación como persona física.</p>
    <dl>
      <dt>Titular</dt><dd>Alberto Miguel Fonfria Toledo</dd>
      <dt>NIF</dt><dd>20203163D</dd>
      <dt>Domicilio de contacto</dt><dd>Avenida Europa 18, 2A, Colindres, Cantabria, España</dd>
      <dt>Contacto general</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
      <dt>Protección de datos</dt><dd><a href="mailto:privacidad@afincalia.es">privacidad@afincalia.es</a></dd>
    </dl>
    <h2>Finalidad del sitio</h2>
    <p>Presentar AfincalIA, sus funciones y condiciones comerciales, y facilitar solicitudes de información, demostración o piloto mediante los canales disponibles. Una solicitud no formaliza por sí misma una contratación ni autoriza un cobro.</p>
    <h2>Demostración</h2>
    <p>El recorrido público utiliza un caso simulado. Sus nombres, importes, tiempos y resultados ilustrativos no son testimonios ni resultados de clientes.</p>
    <h2>Condiciones del servicio</h2>
    <p>La contratación y el uso de datos reales requieren acordar previamente las condiciones del servicio y del tratamiento de datos que correspondan. Este aviso no sustituye esos acuerdos. Los precios publicados se indican sin IVA.</p>
    <h2>Privacidad</h2>
    <p>La <Link href="/politica-privacidad">política de privacidad</Link> informa sobre el tratamiento de las consultas y relaciones propias del negocio. El tratamiento de datos por cuenta de despachos o comunidades se documenta por separado.</p>
  </article></Layout>;
}
