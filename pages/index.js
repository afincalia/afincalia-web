import { useState, useEffect, useRef } from "react";

const LPH_PROMPT = `Eres AfincalIA, asistente de comunidades de propietarios en España. REGLAS: Solo citas artículos LPH que conoces. Si no sabes di: "No tengo información precisa. Tu administrador te responderá en breve." Añade siempre: (Orientativo — consulta con tu administrador para decisiones importantes). Máximo 3 frases. Sin listas. Tono cercano. BASE LEGAL: Art.3 elementos comunes. Art.7.1 obras en privativo notificar admin. Art.7.2 actividades molestas prohibidas. Art.9 pagar gastos. Art.10.1 obras urgentes obligatorias. Art.16 junta anual 6 días convocatoria. Art.17.4 cargador VE sin autorización notificar 30 días. Art.17.12 pisos turísticos mayoría 3/5 desde abril 2025. Art.21 morosidad monitorio menores 2000 euros. Art.22 fondo reserva 10 por ciento. Al final: [TIPO:URGENTE|ALTA|NORMAL|GESTIÓN|INFO]`;

function ChatDemo() {
  const [msgs, setMsgs] = useState([{ from: "ai", text: "Hola, soy el asistente de tu comunidad. ¿En qué puedo ayudarte?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async (txt) => {
    const text = (txt || input).trim();
    if (!text || loading) return;
    setInput("");
    const next = [...msgs, { from: "user", text }];
    setMsgs(next);
    setLoading(true);
    try {
      const history = next.slice(1).map(m => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 350, system: LPH_PROMPT, messages: history })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "Error de conexión.";
      setMsgs(p => [...p, { from: "ai", text: raw.replace(/\[TIPO:.*?\]/g, "").trim() }]);
    } catch { setMsgs(p => [...p, { from: "ai", text: "Error de conexión. Contacta con tu administrador." }]); }
    setLoading(false);
  };

  const hints = ["Ascensor averiado", "Vecino con ruido hasta las 3am", "¿Necesito permiso para cargador eléctrico?", "Cuota pendiente"];
  const t = new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 56px rgba(0,0,0,.16)", width: "100%", maxWidth: 340, margin: "0 auto" }}>
      <div style={{ background: "#075E54", padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#128C7E", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>A</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>AfincalIA</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.7)", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} /> Activo 24 horas
          </div>
        </div>
      </div>
      <div style={{ background: "#E5DDD5", padding: 9, height: 230, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", maxWidth: "84%" }}>
            <div style={{ background: m.from === "user" ? "#DCF8C6" : "#fff", padding: "7px 10px", borderRadius: 9, borderTopRightRadius: m.from === "user" ? 2 : 9, borderTopLeftRadius: m.from === "ai" ? 2 : 9, fontSize: 12, lineHeight: 1.55, color: "#111", boxShadow: "0 1px 2px rgba(0,0,0,.07)" }}>
              {m.text}
              <div style={{ fontSize: 9, color: "#999", textAlign: "right", marginTop: 2 }}>{t}{m.from === "user" ? " ✓✓" : ""}</div>
            </div>
          </div>
        ))}
        {loading && <div style={{ alignSelf: "flex-start", background: "#fff", borderRadius: 9, borderTopLeftRadius: 2, padding: "9px 12px", display: "flex", gap: 4 }}>
          {[0,.15,.3].map((d,i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#bbb", animation: `tdot 1s ${d}s infinite` }} />)}
        </div>}
        <div ref={endRef} />
      </div>
      {msgs.length <= 1 && (
        <div style={{ background: "#F0F2F5", padding: "6px 8px", display: "flex", flexWrap: "wrap", gap: 4 }}>
          {hints.map((h, i) => <button key={i} onClick={() => send(h)} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 100, padding: "3px 9px", fontSize: 10, color: "#333", cursor: "pointer", fontFamily: "inherit" }}>{h}</button>)}
        </div>
      )}
      <div style={{ background: "#F0F2F5", padding: "7px 9px", display: "flex", gap: 6 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Escribe tu consulta..." disabled={loading}
          style={{ flex: 1, border: "none", borderRadius: 18, padding: "7px 12px", fontSize: 12, outline: "none", background: "#fff", fontFamily: "inherit", minWidth: 0 }} />
        <button onClick={() => send()} disabled={loading || !input.trim()}
          style={{ width: 32, height: 32, borderRadius: "50%", background: (input.trim() && !loading) ? "#128C7E" : "#ccc", border: "none", color: "#fff", fontSize: 14, cursor: (input.trim() && !loading) ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>↑</button>
      </div>
    </div>
  );
}

function Calculadora() {
  const [comunidades, setComunidades] = useState(20);
  const [consultas, setConsultas] = useState(12);
  const hSemana = Math.round(consultas * comunidades * 0.05);
  const hMes = hSemana * 4;

  return (
    <div style={{ background: "#fff", border: "1px solid #DDE5DF", borderRadius: 16, padding: "24px 20px", width: "100%" }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: "#111917", marginBottom: 4 }}>Calcula tu situación actual</div>
      <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 22 }}>Ajusta los datos de tu despacho</div>

      {[
        { label: "Comunidades que gestionas", val: comunidades, set: setComunidades, min: 1, max: 150 },
        { label: "Consultas repetitivas por comunidad/semana", val: consultas, set: setConsultas, min: 1, max: 30 },
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", flex: 1, paddingRight: 12 }}>{s.label}</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1A6B42", flexShrink: 0 }}>{s.val}</span>
          </div>
          <input type="range" min={s.min} max={s.max} value={s.val} onChange={e => s.set(+e.target.value)}
            style={{ width: "100%", accentColor: "#1A6B42", cursor: "pointer" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#C4CCCF", marginTop: 3 }}>
            <span>{s.min}</span><span>{s.max}</span>
          </div>
        </div>
      ))}

      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "18px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1A6B42", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>
          Tiempo que AfincalIA gestionaría por ti
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { n: hSemana + "h", l: "a la semana" },
            { n: hMes + "h", l: "al mes" },
            { n: hMes * 12 + "h", l: "al año" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", background: "#fff", borderRadius: 10, padding: "12px 4px" }}>
              <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(16px,4vw,22px)", color: "#1A6B42", fontWeight: 700 }}>{s.n}</div>
              <div style={{ fontSize: 10, color: "#6B7280", marginTop: 3, lineHeight: 1.4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 12, color: "#374151", lineHeight: 1.6, textAlign: "center" }}>
          Horas que podrías dedicar a crecer, a nuevos clientes, o simplemente a desconectar.
        </p>
      </div>

      <a href="#precios" style={{ display: "block", marginTop: 16, background: "#1A6B42", color: "#fff", borderRadius: 100, padding: "13px 0", fontSize: 14, fontWeight: 700, textAlign: "center" }}>
        Ver qué plan me corresponde →
      </a>
    </div>
  );
}

const FEATURES = [
  { icon: "💬", t: "WhatsApp 24/7 sin tocarlo tú", d: "El vecino escribe y recibe respuesta en segundos con el artículo correcto de la LPH. Tú no tocas nada." },
  { icon: "⚖️", t: "Base legal que no inventa", d: "Solo responde con artículos verificados. Si no sabe la respuesta, lo dice y te avisa. Cero riesgo legal." },
  { icon: "📋", t: "Panel único para todo", d: "Todas las comunidades e incidencias en un solo lugar. Sin buscar entre grupos de WhatsApp." },
  { icon: "💸", t: "Morosidad sin perseguir a nadie", d: "Avisos automáticos, certificado para monitorio y seguimiento del Art. 21 sin que toques nada." },
  { icon: "📸", t: "Actas desde una foto", d: "Fotografía tus notas de la reunión. AfincalIA transcribe y genera el acta en formato legal en segundos." },
  { icon: "🔔", t: "Contratos que no se escapan", d: "Te avisa 30 días antes de que venza cualquier contrato de cualquier comunidad." },
];

const COMPARATIVA = [
  { f: "Atención vecinos WhatsApp IA", af: true, otros: false },
  { f: "Respuestas verificadas en LPH", af: true, otros: false },
  { f: "Clasificación de incidencias", af: true, otros: false },
  { f: "Morosidad automatizada Art. 21", af: true, otros: false },
  { f: "Actas desde foto o voz", af: true, otros: false },
  { f: "Alertas de vencimientos", af: true, otros: true },
  { f: "Panel web de gestión", af: true, otros: true },
  { f: "RGPD · Datos en Europa", af: true, otros: true },
];

const PLANES = [
  {
    nombre: "Esencial", precio: "49",
    comunidades: "Hasta 15 comunidades",
    features: ["WhatsApp IA 24/7", "Panel de incidencias", "Clasificación automática LPH", "Soporte por email"],
    cta: "Probar con 1 comunidad gratis"
  },
  {
    nombre: "Profesional", precio: "99",
    comunidades: "De 15 a 50 comunidades",
    features: ["Todo lo del Esencial", "Protocolo morosidad Art. 21", "Alertas vencimientos", "Soporte prioritario"],
    cta: "Probar con 1 comunidad gratis"
  },
  {
    nombre: "Despacho", precio: "179",
    comunidades: "Hasta 110 comunidades",
    destacado: true,
    features: ["Todo lo del Profesional", "Actas desde foto o voz", "Gestión multidespacho", "Informes avanzados"],
    cta: "Probar con 1 comunidad gratis"
  },
  {
    nombre: "Enterprise", precio: "249",
    comunidades: "De 110 a 150 comunidades",
    features: ["Todo lo del Despacho", "Comunidades sin límite", "API de integración", "Gestor dedicado"],
    cta: "Solicitar acceso"
  },
  {
    nombre: "A medida", precio: null,
    comunidades: "Más de 150 comunidades",
    features: ["Plan completamente personalizado", "Precio adaptado a tu volumen", "Implantación asistida", "Soporte dedicado"],
    cta: "Consúltanos",
    custom: true
  }
];

const FAQS = [
  { q: "¿Cuánto tarda la implantación?", a: "Menos de 48 horas. Configuras tu cuenta, añades el número al grupo de WhatsApp de cada comunidad y ya funciona. Sin formación, sin instalaciones." },
  { q: "¿Mis vecinos mayores sabrán usarlo?", a: "Sí, porque no cambia nada para ellos. Siguen escribiendo en el mismo grupo de siempre. La diferencia es que ahora tienen respuesta en segundos, a cualquier hora." },
  { q: "¿Tengo que cambiar mi software actual?", a: "No. AfincalIA no sustituye a Fynkus, Gesfincas ni ningún otro programa. Se añade encima y se encarga de la atención a vecinos." },
  { q: "¿Qué pasa si la IA se equivoca?", a: "Cada respuesta lleva el aviso 'Orientativo — consulta con tu administrador'. Si no conoce la respuesta, lo dice y te avisa. Nunca inventa." },
  { q: "¿Y si falla a las 3 de la madrugada?", a: "Tenemos monitorización 24/7. Si algo falla te avisamos antes de que lo notes. En el peor caso el vecino recibe un mensaje diciendo que el administrador le llamará." },
  { q: "¿Cómo funciona la prueba gratuita?", a: "Empiezas con 1 comunidad real, sin tarjeta, sin compromiso. Si en 14 días no ves el valor, no pagas nada." },
];

function Logo({ dark }) {
  const c = dark ? "#fff" : "#C4362C";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", gap: 2 }}>{[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />)}</div>
        <div style={{ display: "flex", gap: 2 }}>{[0,1,2,3,4].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />)}</div>
      </div>
      <span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 19, color: dark ? "#fff" : "#111917", letterSpacing: "-.01em" }}>
        Afincal<span style={{ color: dark ? "#6EE7A0" : "#1A6B42" }}>IA</span>
      </span>
    </div>
  );
}

const G = "#1A6B42";
const D = "#0C3521";

export default function AfincalIA() {
  const [faq, setFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const lbl = { fontSize: 11, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10, display: "block" };
  const H2 = { fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(24px,5vw,38px)", lineHeight: 1.15, letterSpacing: "-.02em", color: "#111917" };

  return (
    <div style={{ fontFamily: "'Outfit',system-ui,sans-serif", background: "#FAFAF8", color: "#111917", overflowX: "hidden", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{overflow-x:hidden;width:100%}
        @keyframes tdot{0%,60%,100%{transform:scale(.7);opacity:.3}30%{transform:scale(1);opacity:1}}
        a{text-decoration:none;color:inherit}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #DDE5DF", boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,.06)" : "none" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#"><Logo /></a>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href="#precios" style={{ fontSize: 14, color: "#3D4D44", padding: "6px 10px" }}>Precios</a>
            <a href="#precios" style={{ background: G, color: "#fff", borderRadius: 100, padding: "9px 18px", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>Prueba gratis</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "44px 16px 52px", background: "linear-gradient(160deg,#EBF4EE 0%,#FAFAF8 65%)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EBF4EE", border: "1px solid #C8DFCF", borderRadius: 100, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: G, marginBottom: 20, textTransform: "uppercase", letterSpacing: ".08em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
            Para administradores de fincas en España
          </div>

          <h1 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(30px,7vw,54px)", lineHeight: 1.1, letterSpacing: "-.025em", color: "#111917", marginBottom: 18 }}>
            Gestiona más comunidades.<br />Con menos estrés.
          </h1>

          <p style={{ fontSize: "clamp(14px,3.5vw,17px)", color: "#3D4D44", lineHeight: 1.75, marginBottom: 10 }}>
            AfincalIA responde por WhatsApp a los vecinos a cualquier hora — incidencias, consultas legales, morosidad — y tú intervenes solo cuando hace falta tu criterio profesional.
          </p>
          <p style={{ fontSize: "clamp(13px,3vw,15px)", color: G, fontWeight: 700, marginBottom: 28 }}>
            Sin cambiar tu WhatsApp · Sin cambiar tu software · Operativo en 48h
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto 14px" }}>
            <a href="#precios" style={{ background: G, color: "#fff", borderRadius: 100, padding: "15px 0", fontSize: 16, fontWeight: 800, display: "block", textAlign: "center", boxShadow: "0 4px 20px rgba(26,107,66,.28)" }}>
              Probar con 1 comunidad gratis
            </a>
            <a href="#demo" style={{ color: G, fontSize: 14, fontWeight: 600, padding: "6px 0", textAlign: "center" }}>
              Ver cómo funciona ↓
            </a>
          </div>
          <p style={{ fontSize: 11, color: "#9CA3AF" }}>Sin tarjeta · Cancela cuando quieras · Datos en Europa</p>
        </div>
        <div style={{ marginTop: 36, display: "flex", justifyContent: "center", padding: "0 16px" }}>
          <ChatDemo />
        </div>
      </section>

      {/* ANTES / DESPUÉS */}
      <section style={{ padding: "52px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={lbl}>Lo que cambia</span>
            <h2 style={H2}>Tu semana, antes y después</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 14, padding: "20px 18px" }}>
              <div style={{ fontWeight: 800, fontSize: 12, color: "#DC2626", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>❌ Ahora mismo</div>
              {[
                "El teléfono no para, siempre con el mismo tipo de consulta",
                "Incidencias que se pierden entre cientos de mensajes",
                "Vecinos que no entienden por qué no puedes atenderles al momento",
                "Fines de semana pendiente del móvil por si hay urgencia",
                "Imposible crecer sin contratar a alguien más",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 9, marginBottom: 9, fontSize: 13.5, color: "#374151", alignItems: "flex-start" }}>
                  <span style={{ color: "#FCA5A5", flexShrink: 0 }}>—</span>{t}
                </div>
              ))}
            </div>
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, padding: "20px 18px" }}>
              <div style={{ fontWeight: 800, fontSize: 12, color: G, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>✓ Con AfincalIA</div>
              {[
                "Los vecinos tienen respuesta inmediata, aunque sean las 11 de la noche",
                "Cada incidencia registrada, clasificada y con expediente automático",
                "Solo recibes lo que necesita tu criterio profesional",
                "Los fines de semana son tuyos, de verdad",
                "Puedes asumir más comunidades con el mismo equipo",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 9, marginBottom: 9, fontSize: 13.5, color: "#374151", alignItems: "flex-start" }}>
                  <span style={{ color: G, flexShrink: 0 }}>✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section style={{ padding: "52px 16px", background: "#F2F5F2" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span style={lbl}>Tu situación actual</span>
            <h2 style={{ ...H2, marginBottom: 8 }}>¿Cuánto tiempo gestionas tú que podría gestionar la IA?</h2>
            <p style={{ fontSize: 14, color: "#3D4D44" }}>Ajusta los datos de tu despacho</p>
          </div>
          <Calculadora />
        </div>
      </section>

      {/* FUNCIONES */}
      <section style={{ padding: "52px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={lbl}>Qué incluye</span>
            <h2 style={{ ...H2, marginBottom: 10 }}>Todo en un solo sitio</h2>
            <p style={{ fontSize: 14, color: "#3D4D44", maxWidth: 440, margin: "0 auto" }}>Diseñado para administradores de fincas en España. No un software genérico adaptado.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: "#F7F9F7", border: "1px solid #DDE5DF", borderRadius: 13, padding: "20px 18px" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111917", marginBottom: 6 }}>{f.t}</div>
                <div style={{ fontSize: 13, color: "#3D4D44", lineHeight: 1.65 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ padding: "52px 16px", background: D }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ ...lbl, color: "#4ADE80" }}>Implantación</span>
            <h2 style={{ ...H2, color: "#fff" }}>Operativo en 48 horas</h2>
          </div>
          {[
            { n: "01", t: "Das de alta tus comunidades", d: "Registras el nombre y datos de cada comunidad. Un formulario sencillo, sin migraciones ni importaciones." },
            { n: "02", t: "Añades el número al grupo", d: "Solo añades el número de AfincalIA al grupo de WhatsApp existente. Los vecinos no notan ningún cambio." },
            { n: "03", t: "La IA trabaja sola desde el minuto uno", d: "Responde incidencias, las clasifica por urgencia y las registra. Tú recibes solo lo que necesita tu atención." },
            { n: "04", t: "Tú actúas cuando quieres, no cuando te obligan", d: "Panel con todo ordenado por prioridad. Decides cuándo entrar, qué responder y qué delegar." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 18, padding: "22px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
              <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 32, color: G, lineHeight: 1, minWidth: 44, flexShrink: 0, opacity: .5, paddingTop: 3 }}>{s.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 6 }}>{s.t}</div>
                <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ padding: "52px 16px", background: "#F2F5F2" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          <div style={{ textAlign: "center" }}>
            <span style={lbl}>Demo en vivo</span>
            <h2 style={{ ...H2, marginBottom: 12 }}>Pruébalo ahora mismo</h2>
            <p style={{ fontSize: 14, color: "#3D4D44", lineHeight: 1.7 }}>Este es el asistente real. Escribe como un vecino y verás cómo clasifica la incidencia y cita el artículo de la LPH.</p>
          </div>
          <ChatDemo />
          <a href="#precios" style={{ background: G, color: "#fff", borderRadius: 100, padding: "13px 32px", fontSize: 15, fontWeight: 700, textAlign: "center", display: "block", width: "100%", maxWidth: 340 }}>
            Quiero esto para mis comunidades →
          </a>
        </div>
      </section>

      {/* COMPARATIVA */}
      <section style={{ padding: "52px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={lbl}>Comparativa</span>
            <h2 style={{ ...H2, marginBottom: 8 }}>AfincalIA vs software tradicional</h2>
            <p style={{ fontSize: 13, color: "#9CA3AF" }}>Fynkus, Gesfincas, TuComunidad y similares</p>
          </div>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", minWidth: 300, borderCollapse: "collapse", border: "1px solid #DDE5DF", borderRadius: 14, overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#F7F9F7", borderBottom: "1px solid #DDE5DF" }}>
                  <th style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: ".05em" }}>Funcionalidad</th>
                  <th style={{ padding: "11px 14px", textAlign: "center", fontSize: 13, fontWeight: 800, color: G, width: 90 }}>AfincalIA</th>
                  <th style={{ padding: "11px 14px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#9CA3AF", width: 80 }}>Otros</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVA.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < COMPARATIVA.length - 1 ? "1px solid #F3F4F6" : "none", background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                    <td style={{ padding: "12px 16px", fontSize: 13.5, color: "#374151" }}>{row.f}</td>
                    <td style={{ padding: "12px 0", textAlign: "center" }}>{row.af ? <span style={{ color: G, fontSize: 17, fontWeight: 700 }}>✓</span> : <span style={{ color: "#E5E7EB" }}>—</span>}</td>
                    <td style={{ padding: "12px 0", textAlign: "center" }}>{row.otros ? <span style={{ color: "#9CA3AF", fontSize: 15 }}>✓</span> : <span style={{ color: "#FCA5A5", fontSize: 15 }}>✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{ padding: "52px 16px", background: "#F2F5F2" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={lbl}>Precios</span>
            <h2 style={{ ...H2, marginBottom: 8 }}>Elige el plan para tu despacho</h2>
            <p style={{ fontSize: 13, color: "#9CA3AF" }}>Prueba con 1 comunidad gratis · Sin tarjeta · Cancela cuando quieras</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, alignItems: "start" }}>
            {PLANES.map((p, i) => (
              <div key={i} style={{
                background: p.destacado ? D : p.custom ? "#F7F9F7" : "#fff",
                border: `1.5px solid ${p.destacado ? G : "#DDE5DF"}`,
                borderRadius: 16, padding: "22px 18px", position: "relative",
                boxShadow: p.destacado ? "0 14px 44px rgba(12,53,33,.22)" : "none"
              }}>
                {p.destacado && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#1E4FA3", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 12px", borderRadius: 100, whiteSpace: "nowrap", letterSpacing: ".04em" }}>MÁS VENDIDO</div>}

                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: p.destacado ? "rgba(255,255,255,.4)" : "#9CA3AF", marginBottom: 5 }}>{p.nombre}</div>

                {p.precio ? (
                  <>
                    <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 38, lineHeight: 1, color: p.destacado ? "#fff" : "#111917", marginBottom: 2 }}>
                      {p.precio}<span style={{ fontSize: 13, fontFamily: "'Outfit',sans-serif", fontWeight: 500 }}>€</span>
                    </div>
                    <div style={{ fontSize: 11, color: p.destacado ? "rgba(255,255,255,.35)" : "#9CA3AF", marginBottom: 12 }}>/mes</div>
                  </>
                ) : (
                  <div style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 22, color: G, lineHeight: 1.2, marginBottom: 12, fontWeight: 700 }}>Plan a medida</div>
                )}

                {/* Comunidades — único dato clave */}
                <div style={{ background: p.destacado ? "rgba(255,255,255,.1)" : p.custom ? "#EBF4EE" : "#EBF4EE", border: `1px solid ${p.destacado ? "rgba(255,255,255,.15)" : "#C8DFCF"}`, borderRadius: 8, padding: "7px 10px", marginBottom: 16, textAlign: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: p.destacado ? "#6EE7A0" : G }}>{p.comunidades}</span>
                </div>

                <div style={{ marginBottom: 18 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 7, fontSize: 12.5 }}>
                      <span style={{ color: p.destacado ? "#4ADE80" : G, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ color: p.destacado ? "rgba(255,255,255,.75)" : "#3D4D44", lineHeight: 1.45 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a href="mailto:hola@afincalia.es" style={{ display: "block", padding: "11px 0", borderRadius: 100, fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 13, background: p.destacado ? "#fff" : p.custom ? G : G, color: p.destacado ? D : "#fff", textAlign: "center" }}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "52px 16px", background: "#fff" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={lbl}>Preguntas frecuentes</span>
            <h2 style={H2}>Las dudas que seguramente tienes</h2>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #DDE5DF" }}>
              <button onClick={() => setFaq(faq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "17px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600, color: "#111917", textAlign: "left", gap: 14 }}>
                <span style={{ flex: 1 }}>{f.q}</span>
                <span style={{ fontSize: 22, color: "#9CA3AF", flexShrink: 0, transform: faq === i ? "rotate(45deg)" : "none", transition: "transform .2s", display: "inline-block" }}>+</span>
              </button>
              {faq === i && <div style={{ paddingBottom: 16, fontSize: 14, color: "#3D4D44", lineHeight: 1.8 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: "64px 16px", background: G, textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <Logo dark />
          <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(26px,5.5vw,40px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-.02em", margin: "22px 0 14px" }}>
            Empieza esta semana.<br />Sin riesgos.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.65)", marginBottom: 28, lineHeight: 1.75 }}>
            Una comunidad gratis para empezar. Operativo en 48 horas. Tus vecinos siguen en el mismo WhatsApp. Tú recuperas tu tranquilidad.
          </p>
          <a href="mailto:hola@afincalia.es" style={{ display: "block", maxWidth: 360, margin: "0 auto", background: "#fff", color: D, borderRadius: 100, padding: "15px 0", fontSize: 16, fontWeight: 800, boxShadow: "0 4px 24px rgba(0,0,0,.12)" }}>
            Probar con 1 comunidad gratis
          </a>
          <p style={{ marginTop: 12, fontSize: 11, color: "rgba(255,255,255,.3)" }}>Sin tarjeta · Datos en Europa · Cancela cuando quieras</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: D, color: "rgba(255,255,255,.3)", textAlign: "center", padding: "32px 16px", fontSize: 12, lineHeight: 2.4 }}>
        <div><strong style={{ color: "rgba(255,255,255,.6)" }}>AfincalIA</strong> · Asistente IA para administradores de fincas en España</div>
        <div>
          <a href="tel:614557419" style={{ color: "rgba(255,255,255,.4)" }}>614 557 419</a>{" · "}
          <a href="mailto:hola@afincalia.es" style={{ color: "rgba(255,255,255,.4)" }}>hola@afincalia.es</a>{" · "}
          <a href="https://afincalia.es" style={{ color: "rgba(255,255,255,.4)" }}>afincalia.es</a>
        </div>
        <div style={{ marginTop: 4 }}>Ley 49/1960 LPH · RGPD · LOPDGDD · LSSI-CE</div>
        <div style={{ marginTop: 4, fontSize: 11 }}>AfincalIA es herramienta de asistencia. No sustituye asesoramiento jurídico. La responsabilidad recae en el administrador colegiado.</div>
        <div style={{ marginTop: 10, opacity: .4, fontSize: 11 }}>
          <a href="#" style={{ color: "inherit" }}>Aviso legal</a>{" · "}
          <a href="#" style={{ color: "inherit" }}>Privacidad</a>{" · "}
          <a href="#" style={{ color: "inherit" }}>Cookies</a>{" · "}
          <a href="#" style={{ color: "inherit" }}>Términos</a>
        </div>
        <div style={{ marginTop: 6, opacity: .2, fontSize: 10 }}>©️ 2026 AfincalIA</div>
      </footer>
    </div>
  );
}
