import Link from 'next/link';
import { Layout } from '../components/SiteChrome';
import { Meta } from '../components/PageParts';
import { ready } from '../lib/leads';

const PRIVACY_EMAIL = 'privacidad@afincalia.es';

export async function getServerSideProps() {
  // Publishing this notice does not enable the lead form or the community pilot.
  return { props: { enabled: ready() } };
}

export default function Privacy({ enabled }) {
  return <Layout><Meta title="Política de privacidad" description="Responsable, usos y derechos sobre los datos de contacto y las relaciones comerciales de AfincalIA."/><article className="content-page legal-page page-shell">
    <h1>Política de privacidad de AfincalIA</h1>
    <p>Web comercial y relaciones propias del negocio. Actualizada el 2 de octubre de 2026.</p>

    <h2>Responsable y contacto</h2>
    <p>El responsable de los tratamientos descritos en este aviso es <strong>Alberto Miguel Fonfria Toledo</strong>, que opera bajo el nombre comercial <strong>AfincalIA</strong>. Domicilio de contacto: Avenida Europa 18, 2A, Colindres, Cantabria, España.</p>
    <p>Para cuestiones de protección de datos y ejercicio de derechos: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. Esta dirección recibe en el buzón de atención de AfincalIA; las respuestas pueden enviarse desde <a href="mailto:hola@afincalia.es">hola@afincalia.es</a>.</p>
    <p><Link href="/aviso-legal">Consultar la identificación del titular</Link>.</p>

    <h2>Alcance de este aviso</h2>
    <p>Este aviso se refiere a las personas que visitan la web, solicitan información o demostraciones, contactan con AfincalIA o mantienen una relación comercial con el negocio. No atribuye al titular de AfincalIA la responsabilidad sobre todos los datos que los despachos o las comunidades gestionen con la aplicación.</p>
    <p>El tratamiento de datos de vecinos, comunidades y documentación de clientes se rige por la información y los acuerdos específicos de cada servicio, con la identificación del responsable correspondiente y del papel de AfincalIA. Publicar este aviso comercial no autoriza por sí mismo la incorporación de esos datos a un piloto.</p>

    <h2>Qué datos se tratan y de dónde proceden</h2>
    <p>Los datos proceden principalmente de lo que facilitas al contactar: nombre, despacho o entidad a la que representas, email, teléfono si lo proporcionas y contenido de la consulta. Si se formaliza una relación comercial, se tratarán además los datos de contacto, contratación y facturación necesarios para gestionarla.</p>
    <p>El alojamiento y los servicios de seguridad pueden tratar datos técnicos de conexión, como dirección IP, fecha, navegador y solicitudes realizadas, para servir y proteger la web. No envíes datos de salud, documentos de identidad ni información de vecinos que no sea necesaria para la consulta comercial.</p>

    <h2>Para qué se utilizan los datos y con qué base</h2>
    <p><strong>Consultas y demostraciones:</strong> atender la petición, organizar la demostración y responder por el canal elegido. Cuando la petición busca contratar un servicio, la base es la aplicación de medidas precontractuales solicitadas por la persona interesada, conforme al artículo 6.1.b del RGPD. Para consultas profesionales o realizadas en representación de un despacho, la base es el interés legítimo en atenderlas y mantener esa relación profesional, conforme al artículo 6.1.f.</p>
    <p><strong>Clientes y colaboradores:</strong> gestionar la relación y prestar el servicio contratado, conforme al artículo 6.1.b; en el caso de personas de contacto de una entidad, atender esa relación profesional sobre la base del interés legítimo. Los datos exigidos para obligaciones fiscales, contables o de otra naturaleza legal se tratan conforme al artículo 6.1.c.</p>
    <p><strong>Seguridad y atención de derechos:</strong> prevenir abuso, proteger los sistemas y gestionar incidencias sobre la base del interés legítimo en mantener un servicio seguro. Las solicitudes de protección de datos se atienden para cumplir las obligaciones del RGPD.</p>
    <p>Solicitar información no implica suscribirse a publicidad. La casilla de lectura de la política, cuando aparece, deja constancia de la información facilitada y no autoriza por sí sola campañas comerciales. Cualquier comunicación promocional debe cumplir los requisitos específicos aplicables y permitir oponerse a su recepción.</p>

    <h2>Formulario de contacto</h2>
    {!enabled && <p className="legal-note">El formulario web de solicitudes está desactivado. Puedes contactar por los canales publicados. La publicación de esta política no activa el formulario.</p>}
    <p>Cuando el formulario esté habilitado, solicitará nombre, despacho y email, y permitirá facilitar teléfono, número aproximado de comunidades y un mensaje. También registrará el tipo de solicitud, la página de origen, fecha, referencia y versión de la información de privacidad presentada. Los campos obligatorios se utilizan para identificar y responder a la solicitud; sin ellos no podrá tramitarse por ese formulario.</p>
    <p>Para limitar envíos repetidos, el formulario utiliza temporalmente una huella de la dirección de conexión calculada con una clave privada y una referencia diaria. Esa huella no equivale a anonimato; la dirección IP no se guarda como tal en la tabla de solicitudes. Los registros del alojamiento se gestionan por separado.</p>

    <h2>Conservación</h2>
    <p>Las consultas se conservan mientras sean necesarias para responder y realizar el seguimiento solicitado. Al concluir la consulta o descartarse la contratación, se eliminarán los datos que ya no sean necesarios; no se conservarán indefinidamente para futuras campañas. Si se establece una relación comercial, los datos necesarios se conservarán mientras dure esa relación y, después, durante los plazos legales de conservación o de atención de posibles responsabilidades, con acceso restringido cuando corresponda.</p>
    <p>La documentación fiscal y contable se conserva durante los plazos que le sean aplicables. Los registros de seguridad se limitan al tiempo necesario para prevenir, investigar y resolver incidencias. Una obligación de conservación o una reclamación puede justificar la conservación restringida de datos concretos, no su uso para otros fines.</p>

    <h2>Destinatarios y proveedores</h2>
    <p>Solo deben acceder a los datos las personas autorizadas para atender las consultas y gestionar el negocio y los proveedores que presten servicios necesarios. Pueden comunicarse a autoridades, administraciones o tribunales cuando exista una obligación legal, y a asesores cuando sea necesario para la relación o para cumplir esas obligaciones.</p>
    <p>La web utiliza Vercel para alojamiento y Cloudflare para servicios de red y seguridad. El correo profesional se gestiona con Zoho Mail. Cuando el formulario esté activo, Supabase almacenará las solicitudes y Resend tramitará la notificación por correo a AfincalIA. Si eliges WhatsApp, interviene también su proveedor; ese canal no se abre por el mero hecho de consultar este aviso.</p>

    <h2>Tratamientos fuera del Espacio Económico Europeo</h2>
    <p>Estos proveedores pueden operar o permitir acceso a datos desde países fuera del Espacio Económico Europeo, entre ellos Estados Unidos. No se afirma que todos los datos permanezcan exclusivamente en Europa. Las transferencias que lo requieran deben estar amparadas por una decisión de adecuación aplicable o por garantías adecuadas, como las cláusulas contractuales tipo de la Comisión Europea, junto con las medidas adicionales necesarias.</p>
    <p>Puedes solicitar al contacto de privacidad información sobre los destinos y una copia o referencia de las garantías aplicables a tus datos. La documentación general de los proveedores puede consultarse en <a href="https://vercel.com/legal/dpa">Vercel</a>, <a href="https://www.cloudflare.com/cloudflare-customer-dpa/">Cloudflare</a>, <a href="https://www.zoho.com/gdpr.html">Zoho</a>, <a href="https://supabase.com/legal/customer-resources/data-processing-addendum">Supabase</a> y la <a href="https://resend.com/legal/privacy-policy">política de Resend</a>. Esas páginas no sustituyen la comprobación de las condiciones efectivamente aplicables a la cuenta y al servicio contratado.</p>

    <h2>Tus derechos</h2>
    <p>Puedes solicitar acceso, rectificación, supresión, limitación u oposición y, cuando corresponda, portabilidad, escribiendo a <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> o al domicilio indicado. Cuando un tratamiento se base en consentimiento, puedes retirarlo sin afectar a la licitud del tratamiento previo. Para los tratamientos basados en interés legítimo, puedes oponerte por motivos relacionados con tu situación particular.</p>
    <p>Indica el derecho que quieres ejercer y la información necesaria para localizar tu solicitud. Solo se pedirá información adicional para verificar la identidad cuando sea necesaria. Puedes presentar una reclamación ante la <a href="https://www.aepd.es/">Agencia Española de Protección de Datos</a>.</p>

    <h2>Decisiones automatizadas, medición y cookies</h2>
    <p>El tratamiento de consultas comerciales descrito aquí no tiene como finalidad adoptar decisiones exclusivamente automatizadas con efectos jurídicos o de importancia similar sobre las personas. La demostración pública utiliza datos de ejemplo, no datos de tu despacho.</p>
    <p>La información sobre cookies, registros técnicos y el estado de la medición está en <Link href="/cookies">Cookies y medición</Link>. Una modificación de los fines o de los tratamientos se reflejará en una actualización de este aviso y, cuando corresponda, se comunicará a las personas afectadas.</p>
  </article></Layout>;
}
