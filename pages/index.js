import { useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{overflow-x:hidden}
:root{--bg:#FAFBF9;--fg:#1A1F1C;--fg2:#4A5650;--fg3:#8A9690;--accent:#1B7A4E;--accent2:#15633E;--green:#1B7A4E;--green2:#15633E;--gbg:#F0F7F3;--dark:#0D1410;--card:#fff;--border:#E2E8E4;--dot:#C4362C;--head:'Fraunces',Georgia,serif;--body:'Outfit',system-ui,sans-serif}
`;

export default function Afincalia(){
  const [faq,setFaq]=useState(null);
  const S=({children,bg,id,p})=><section id={id} style={{background:bg||"var(--bg)",padding:p||"56px 20px"}}><div style={{maxWidth:"720px",margin:"0 auto"}}>{children}</div></section>;
  const Tag=({children})=><div style={{fontSize:"11px",fontWeight:700,color:"var(--accent)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:"8px"}}>{children}</div>;
  const H=({children,s})=><h2 style={{fontFamily:"var(--head)",fontSize:s||"clamp(24px,5vw,34px)",fontWeight:900,color:"var(--fg)",lineHeight:1.15,letterSpacing:"-.02em"}}>{children}</h2>;

  return(
    <div style={{fontFamily:"var(--body)",background:"var(--bg)",color:"var(--fg)",overflowX:"hidden"}}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,251,249,.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"0 20px"}}>
        <div style={{maxWidth:"720px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",height:"54px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
            {/* Logo: A hecha de puntos + fincalIA */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"1px",width:"28px"}}>
              <div style={{display:"flex",gap:"2px"}}>{[1,2,3].map(i=><div key={i} style={{width:"5px",height:"5px",borderRadius:"50%",background:"var(--dot)"}}/>)}</div>
              <div style={{display:"flex",gap:"2px"}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:"5px",height:"5px",borderRadius:"50%",background:"var(--dot)"}}/>)}</div>
              <div style={{display:"flex",gap:"2px"}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:"5px",height:"5px",borderRadius:"50%",background:"var(--dot)"}}/>)}</div>
            </div>
            <span style={{fontFamily:"var(--head)",fontWeight:900,fontSize:"18px",color:"var(--fg)"}}>fincal<span style={{color:"var(--dot)",fontWeight:900}}>IA</span></span>
          </div>
          <a href="#empezar" style={{padding:"8px 18px",borderRadius:"8px",background:"var(--accent)",color:"#fff",fontWeight:700,fontSize:"13px",textDecoration:"none"}}>Probar gratis</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:"clamp(40px,8vw,72px) 20px 48px",textAlign:"center",background:"linear-gradient(180deg,var(--bg) 0%,var(--gbg) 100%)"}}>
        <div style={{maxWidth:"600px",margin:"0 auto"}}>
          <div style={{display:"inline-block",padding:"5px 14px",borderRadius:"100px",background:"rgba(27,122,78,.08)",border:"1px solid rgba(27,122,78,.12)",fontSize:"12px",fontWeight:600,color:"var(--green)",marginBottom:"20px"}}>
            Tu asistente profesional 24/7
          </div>

          <h1 style={{fontFamily:"var(--head)",fontSize:"clamp(28px,6vw,46px)",fontWeight:900,lineHeight:1.1,letterSpacing:"-.03em",marginBottom:"16px"}}>
            Que dejen de llamarte enfadados.
          </h1>

          <p style={{fontSize:"clamp(15px,3.5vw,18px)",color:"var(--fg2)",lineHeight:1.65,marginBottom:"28px"}}>
            40 comunidades. Cientos de vecinos. Todos escribiendo a tu WhatsApp a cualquier hora. Afincal<strong style={{color:"var(--dot)"}}>IA</strong> responde por ti, clasifica todo y te devuelve tu vida.
          </p>

          <a href="#empezar" style={{display:"inline-block",padding:"16px 36px",borderRadius:"12px",background:"var
