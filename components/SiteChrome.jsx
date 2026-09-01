import Link from "next/link";

export const DEMO_URL = "https://afincalia-app.vercel.app/demo";
export const EMAIL = "hola@afincalia.es";
export const PHONE = "624 934 148";
export const WA_URL = "https://wa.me/34624934148?text=Hola%2C%20quiero%20conocer%20Afincalia";

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Afincalia, inicio">
      <span className="brand-mark" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((dot) => <i key={dot} />)}
      </span>
      <span>Afincal<strong>IA</strong></span>
    </Link>
  );
}

const productLinks = [
  ["Vista general", "/producto", "Todo el sistema, de principio a fin"],
  ["Atención por WhatsApp", "/producto/whatsapp", "Identidad, contexto y revisión"],
  ["Conocimiento verificado", "/producto/conocimiento", "Respuestas basadas en fuentes del despacho"],
  ["Incidencias y tareas", "/producto/incidencias-tareas", "Responsables, estados y seguimiento"],
  ["Trazabilidad y control", "/producto/trazabilidad", "Cronología, panel y visión operativa"],
];

export function Header() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegación principal">
          <details className="nav-dropdown">
            <summary>Producto <span aria-hidden="true">⌄</span></summary>
            <div className="dropdown-panel">
              <p>Tu empleado digital</p>
              {productLinks.map(([label, href, description]) => (
                <Link href={href} key={href}><strong>{label}</strong><span>{description}</span></Link>
              ))}
            </div>
          </details>
          <Link href="/como-funciona">Cómo funciona</Link>
          <Link href="/seguridad">Seguridad</Link>
          <Link href="/piloto">Piloto</Link>
        </nav>
        <Link className="button button-small nav-cta" href="/contacto">Solicitar demo</Link>
        <details className="mobile-menu">
          <summary aria-label="Abrir menú"><span /><span /><span /></summary>
          <div className="mobile-panel">
            <p>Producto</p>
            {productLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <p>Conocer Afincalia</p>
            <Link href="/como-funciona">Cómo funciona</Link>
            <Link href="/seguridad">Seguridad</Link>
            <Link href="/piloto">Piloto</Link>
            <Link className="button" href="/contacto">Solicitar demo</Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><Logo /><p>El empleado digital que conoce el contexto del despacho y ayuda al equipo a atender, organizar y resolver.</p></div>
        <div><h3>Producto</h3>{productLinks.slice(1).map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
        <div><h3>Conocer</h3><Link href="/como-funciona">Cómo funciona</Link><Link href="/seguridad">Privacidad y seguridad</Link><Link href="/piloto">Piloto acompañado</Link></div>
        <div><h3>Contacto</h3><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href="tel:+34624934148">{PHONE}</a><a href={WA_URL}>WhatsApp</a></div>
      </div>
      <div className="footer-note"><span>© 2026 Afincalia · Empresa española</span><span>No sustituye al programa contable ni al criterio profesional.</span></div>
    </footer>
  );
}

export function Layout({ children }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

export function CTA({ eyebrow = "Demostración online", title = "Comprueba el flujo con un caso completo.", text = "Te enseñamos Afincalia sobre un escenario realista de tu despacho, sin cargar información real durante la primera evaluación." }) {
  return (
    <section className="cta-band page-shell">
      <div><span className="eyebrow light">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>
      <div className="actions"><Link className="button button-coral" href="/contacto">Solicitar demo</Link><Link className="button button-light" href="/piloto">Ver condiciones del piloto</Link></div>
    </section>
  );
}
