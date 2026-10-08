import Link from "next/link";
import { Meta } from "../components/PageParts";
import ContactEmail from "../components/ContactEmail";
import { DEMO_CTA_URL, Layout } from "../components/SiteChrome";

const plans = [
  {
    name: "Esencial",
    price: "149",
    onboarding: "199",
    scope: "Hasta 25 comunidades",
    description: "La capa operativa completa para un despacho con un volumen inicial de comunidades.",
    features: ["Hasta 3 usuarios internos", "Atención por WhatsApp", "Conocimiento y memoria de comunidades", "Respuestas desde información verificada", "Incidencias, tareas y cronología", "Actas: extracción, revisión, tareas y PDF"],
  },
  {
    name: "Profesional",
    price: "349",
    onboarding: "399",
    scope: "Hasta 75 comunidades",
    featured: true,
    description: "El mismo núcleo completo, preparado para más comunidades y mayor actividad diaria.",
    features: ["Hasta 8 usuarios internos", "Todo el producto base", "Conversaciones y documentos por comunidad", "Trabajo compartido con funciones y permisos", "Soporte con alcance acordado"],
  },
  {
    name: "Despacho",
    price: "649",
    onboarding: "699",
    scope: "Hasta 150 comunidades",
    description: "El mismo producto completo para equipos con más volumen y necesidad de control interno.",
    features: ["Hasta 15 usuarios internos", "Todo el producto base", "Información organizada por comunidad", "Trazabilidad para revisar el trabajo del equipo", "Soporte con alcance acordado"],
  },
];

export default function Precios() {
  return (
    <Layout>
      <Meta title="Planes y precios" description="Planes claros de AfincalIA para despachos de administración de fincas." />
      <section className="pricing-hero page-shell">
        <span className="eyebrow">Planes y precios</span>
        <h1>Planes para el trabajo diario de tu despacho.</h1>
        <p>Los tres planes incluyen conversaciones, conocimiento por comunidad, incidencias, tareas, cronología, documentos y actas. Elige según tu cartera y el uso que necesite el equipo. Cuotas mensuales e incorporación sin IVA.</p>
        <p className="source-note"><strong>WhatsApp pertenece al despacho.</strong> Meta cobra directamente al titular el uso de su propia cuenta de WhatsApp Business Platform. AfincalIA no interviene en esa facturación ni aplica recargos.</p>
      </section>

      <section className="pricing-grid page-shell">
        {plans.map((plan) => (
          <article className={plan.featured ? "price-card featured" : "price-card"} key={plan.name}>
            {plan.featured ? <span className="price-badge">Hasta 75 comunidades</span> : null}
            <small>{plan.name}</small>
            <div className="price"><b>{plan.price} €</b><span>/mes + IVA</span></div>
            <h2>{plan.scope}</h2>
            <p>{plan.description}</p>
            <p><strong>Incorporación: {plan.onboarding} € + IVA.</strong> Pago único tras aceptar la continuidad después del piloto.</p>
            <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <a className={plan.featured ? "button button-light" : "button"} href={DEMO_CTA_URL}>Solicitar demo</a>
          </article>
        ))}
      </section>

      <section className="pricing-scope page-shell"><h2>Un alcance acordado para tu despacho.</h2><p>Actas, permisos y trazabilidad forman parte del producto. Los canales de comunicación y los seguimientos necesitan configuración y autorización; no se activan al elegir un plan.</p><p>Los usuarios incluidos son personas del equipo del despacho; los vecinos y proveedores no consumen esos puestos internos. Antes de contratar, concretamos procesamiento asistido, documentos, almacenamiento y soporte. El coste de la mensajería de WhatsApp se mantiene separado y lo paga directamente el despacho a Meta.</p><p>La incorporación amplía lo preparado durante el piloto al alcance acordado, con usuarios, fuentes seleccionadas y orientación inicial. No se cobra de nuevo el trabajo ya realizado ni se incluyen nuevas integraciones o migraciones no acordadas.</p><ContactEmail /></section>

      <section className="enterprise-price page-shell"><div><span className="eyebrow">Más de 150 comunidades</span><h2>Plan a medida, después de medir el uso real.</h2><p>No fijamos una cifra ficticia sin conocer el volumen de mensajes, documentos, empleados y automatizaciones del despacho.</p></div><a className="button" href={DEMO_CTA_URL}>Solicitar demo</a></section>

      <section className="pilot-price page-shell">
        <div><span className="eyebrow light">Conoce AfincalIA en tu despacho</span><h2>30 días de piloto gratuito.</h2><p>Prueba AfincalIA durante 30 días, sin cobro automático ni permanencia. Al terminar, decides si continúas y aceptas expresamente el plan, su cuota y la incorporación correspondiente.</p></div>
        <Link className="button button-coral" href="/piloto">Ver condiciones</Link>
      </section>

      <section className="pricing-faq page-shell">
        <div className="section-head"><span className="eyebrow">Sin letra pequeña</span><h2>Qué ocurre al terminar la prueba.</h2></div>
        <div className="policy-grid"><article><h2>¿Se cobra automáticamente?</h2><p>No. Para continuar el despacho debe aceptar expresamente el plan, la cuota mensual, la incorporación y las condiciones. El piloto no se factura retrospectivamente.</p></article><article><h2>¿Hay permanencia?</h2><p>No. La oferta inicial busca obtener uso real y comentarios, no encerrar al despacho.</p></article><article><h2>¿Hay que cambiar el programa contable?</h2><p>No. AfincalIA se posiciona como capa de atención y operaciones, no como sustituto inmediato del sistema contable.</p></article><article><h2>¿Actas está incluida?</h2><p>Sí: borrador, revisión humana, versiones, acuerdos, tareas y PDF archivado. El envío por correo profesional es una acción aparte del administrador, con destinatarios elegidos y configuración válida. Archivar o aprobar no envía el acta automáticamente.</p></article></div>
      </section>
    </Layout>
  );
}
