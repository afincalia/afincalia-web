import Link from "next/link";
import { Meta } from "../components/PageParts";
import { Layout } from "../components/SiteChrome";

const plans = [
  {
    name: "Esencial",
    price: "69",
    scope: "Hasta 25 comunidades",
    description: "El empleado digital completo para un despacho con un volumen inicial de comunidades.",
    features: ["Atención por WhatsApp", "Cerebro y memoria de comunidades", "Respuestas desde información verificada", "Incidencias, tareas y cronología", "Actas: extracción, revisión, tareas y PDF"],
  },
  {
    name: "Profesional",
    price: "159",
    scope: "Hasta 75 comunidades",
    featured: true,
    description: "El mismo núcleo completo, preparado para más comunidades y mayor actividad diaria.",
    features: ["Todo el producto base", "Hasta 75 comunidades", "Más volumen de conversaciones y documentos", "Varios empleados y reparto de tareas", "Soporte prioritario por correo y WhatsApp"],
  },
  {
    name: "Despacho",
    price: "249",
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
        <p>Todos los planes incluyen el núcleo completo —WhatsApp, cerebro, incidencias, tareas, cronología, documentos y actas— y cambian por volumen. Los precios son mensuales y no incluyen IVA ni costes externos de WhatsApp.</p>
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

      <section className="whatsapp-cost page-shell">
        <div className="section-head"><span className="eyebrow">Coste de WhatsApp</span><h2>La ventana de 24 horas sigue existiendo, pero cambia su precio.</h2></div>
        <div className="whatsapp-cost-grid">
          <article><small>Hasta el 30 de septiembre de 2026</small><h3>Respuestas de servicio sin cargo de Meta</h3><p>Cuando el vecino escribe, se abre una ventana de 24 horas. Dentro de ella, las respuestas de servicio —también las preparadas por una IA externa— no tienen cargo de Meta. Cada nuevo mensaje del vecino reinicia la ventana.</p></article>
          <article><small>Desde el 1 de octubre de 2026</small><h3>Meta cobrará por mensaje de servicio</h3><p>Meta ha anunciado facturación por unidad también para las respuestas no plantilla dentro de esa ventana. Los mensajes entrantes continúan siendo gratuitos.</p></article>
        </div>
        <p className="source-note">Los cargos de Meta y, cuando corresponda, del proveedor de acceso a WhatsApp Business Platform se facturan aparte. Se aplicará siempre la tarifa vigente. <a href="https://whatsappbusiness.com/products/platform-pricing/" target="_blank" rel="noreferrer">Consultar precios oficiales de WhatsApp ↗</a></p>
      </section>

      <section className="pricing-faq page-shell">
        <div className="section-head"><span className="eyebrow">Sin letra pequeña</span><h2>Qué ocurre al terminar la prueba.</h2></div>
        <div className="policy-grid"><article><h2>¿Se cobra automáticamente?</h2><p>No. Para continuar el despacho debe aceptar expresamente el plan y las condiciones.</p></article><article><h2>¿Hay permanencia?</h2><p>No. La oferta inicial busca obtener uso real y comentarios, no encerrar al despacho.</p></article><article><h2>¿Hay que cambiar el programa contable?</h2><p>No. AfincalIA se posiciona como capa de atención y operaciones, no como sustituto inmediato del sistema contable.</p></article><article><h2>¿Actas está incluida?</h2><p>Sí, en todos los planes: extracción, revisión humana, versiones, tareas, PDF, archivo y envío por correo profesional.</p></article></div>
      </section>
    </Layout>
  );
}
