import Link from "next/link";
import { Meta } from "../components/PageParts";
import { Layout } from "../components/SiteChrome";

const plans = [
  {
    name: "Esencial",
    price: "99",
    scope: "Hasta 25 comunidades",
    description: "El empleado digital completo para un despacho con un volumen inicial de comunidades.",
    features: ["Atención por WhatsApp", "Cerebro y memoria de comunidades", "Respuestas desde información verificada", "Incidencias, tareas y cronología", "Actas: extracción, revisión, tareas y PDF"],
  },
  {
    name: "Profesional",
    price: "199",
    scope: "Hasta 75 comunidades",
    featured: true,
    description: "El mismo núcleo completo, preparado para más comunidades y mayor actividad diaria.",
    features: ["Todo el producto base", "Hasta 75 comunidades", "Más volumen de conversaciones y documentos", "Varios empleados y reparto de tareas", "Soporte prioritario por correo y WhatsApp"],
  },
  {
    name: "Despacho",
    price: "299",
    scope: "Hasta 150 comunidades",
    description: "El mismo producto completo para equipos con más volumen y necesidad de control interno.",
    features: ["Todo el producto base", "Hasta 150 comunidades", "Mayor volumen operativo", "Usuarios, roles y auditoría", "Soporte prioritario por correo y WhatsApp"],
  },
];

export default function Precios() {
  return (
    <Layout>
      <Meta title="Planes y precios" description="Planes claros de AfincalIA para despachos de administración de fincas." />
      <section className="pricing-hero page-shell">
        <span className="eyebrow">Planes y precios</span>
        <h1>Empieza por el trabajo que quieres dejar de hacer a mano.</h1>
        <p>Todos los planes incluyen el núcleo completo —WhatsApp, cerebro, incidencias, tareas, cronología, documentos y actas— y cambian por volumen. Los precios son mensuales y no incluyen IVA.</p>
        <p className="source-note"><strong>WhatsApp pertenece al despacho.</strong> Meta cobra directamente al titular el uso de su propia cuenta de WhatsApp Business Platform. AfincalIA no interviene en esa facturación ni aplica recargos.</p>
      </section>

      <section className="pricing-grid page-shell">
        {plans.map((plan) => (
          <article className={plan.featured ? "price-card featured" : "price-card"} key={plan.name}>
            {plan.featured ? <span className="price-badge">Más elegido</span> : null}
            <small>{plan.name}</small>
            <div className="price"><b>{plan.price} €</b><span>/mes + IVA</span></div>
            <h2>{plan.scope}</h2>
            <p>{plan.description}</p>
            <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <Link className={plan.featured ? "button button-light" : "button"} href="/contacto">Solicitar piloto</Link>
          </article>
        ))}
      </section>

      <section className="enterprise-price page-shell"><div><span className="eyebrow">Más de 150 comunidades</span><h2>Plan a medida, después de medir el uso real.</h2><p>No fijamos una cifra ficticia sin conocer el volumen de mensajes, documentos, empleados y automatizaciones del despacho.</p></div><Link className="button" href="/contacto">Consultar</Link></section>

      <section className="pilot-price page-shell">
        <div><span className="eyebrow light">Oferta para primeros despachos</span><h2>Un mes de piloto y tres meses más si continúas.</h2><p>El piloto de 30 días es gratuito. Si decides seguir, los tres meses siguientes también serán gratuitos a cambio de uso real y feedback. Después eliges plan y solo se factura con aceptación expresa.</p></div>
        <Link className="button button-coral" href="/piloto">Ver condiciones</Link>
      </section>

      <section className="pricing-faq page-shell">
        <div className="section-head"><span className="eyebrow">Sin letra pequeña</span><h2>Qué ocurre al terminar la prueba.</h2></div>
        <div className="policy-grid"><article><h2>¿Se cobra automáticamente?</h2><p>No. Para continuar el despacho debe aceptar expresamente el plan y las condiciones.</p></article><article><h2>¿Hay permanencia?</h2><p>No. La oferta inicial busca obtener uso real y comentarios, no encerrar al despacho.</p></article><article><h2>¿Hay que cambiar el programa contable?</h2><p>No. AfincalIA se posiciona como capa de atención y operaciones, no como sustituto inmediato del sistema contable.</p></article><article><h2>¿Actas está incluida?</h2><p>Sí, en todos los planes: extracción, revisión humana, versiones, tareas, PDF, archivo y envío por correo profesional.</p></article></div>
      </section>
    </Layout>
  );
}
