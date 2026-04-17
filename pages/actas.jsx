import { useState, useEffect } from "react";
import Link from "next/link";

const V={verde:"#1A6B42",osc:"#0C3521",pale:"#EBF4EE",borde:"#C8DFCF",rojo:"#C4362C",tx:"#111917",sub:"#3D4D44",mut:"#9CA3AF",bg:"#FAFAF8",alt:"#F2F5F2",w:"#fff",azul:"#1E4FA3",amarillo:"#D97706"};
const WA="https://wa.me/34614557419?text=Hola%2C%20me%20interesa%20AfincalIA";

function Logo(){return(<Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:8}}><div style={{display:"flex",flexDirection:"column",gap:2}}><div style={{display:"flex",gap:2}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div><div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div></div><span style={{fontFamily:"Georgia,serif",fontSize:20,color:V.tx}}>Afincal<span style={{color:V.verde}}>IA</span></span></Link>);}
function WaSvg({s=20}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>);}

function Navbar({active}){
  const [menu,setMenu]=useState(false);
  const [sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>20);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const links=[["Cómo funciona","/como-funciona"],["Actas IA","/actas"],["RGPD","/rgpd"],["Precios","/precios"],["Blog","/blog"]];
  return(
    <nav style={{position:"sticky",top:0,zIndex:100,background:sc?"rgba(250,250,248,.98)":"rgba(250,250,248,.94)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${sc?V.borde:"transparent"}`,transition:"all .3s"}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Logo/>
        <div className="dnav">
          {links.map(([l,href])=><Link key={href} href={href} style={{fontSize:14,color:href===active?V.verde:V.sub,padding:"7px 12px",textDecoration:"none",fontWeight:href===active?700:400}}>{l}</Link>)}
          <Link href="/precios" style={{marginLeft:12,background:V.verde,color:V.w,borderRadius:100,padding:"10px 22px",fontSize:14,fontWeight:700,textDecoration:"none"}}>14 días gratis</Link>
        </div>
        <button className="burg" onClick={()=>setMenu(!menu)} style={{background:"none",border:"none",cursor:"pointer",padding:8,display:"flex",flexDirection:"column",gap:5}}>
          {[0,1,2].map(i=><span key={i} style={{display:"block",width:24,height:2,background:V.tx,borderRadius:2,transition:"all .25s",transform:menu&&i===0?"rotate(45deg) translate(5px,5px)":menu&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",opacity:menu&&i===1?0:1}}/>)}
        </button>
      </div>
      {menu&&(
        <div style={{background:V.w,borderTop:`1px solid ${V.borde}`,padding:"16px 20px 24px"}}>
          {[["🤖","Cómo funciona","/como-funciona"],["📄","Actas IA","/actas"],["🛡️","RGPD","/rgpd"],["💰","Precios","/precios"],["📝","Blog","/blog"]].map(([ic,l,href])=>(
            <Link key={href} href={href} onClick={()=>setMenu(false)} style={{display:"flex",alignItems:"center",gap:12,fontSize:15,color:V.tx,padding:"12px 0",borderBottom:`1px solid ${V.borde}`,textDecoration:"none"}}><span style={{width:26}}>{ic}</span>{l}</Link>
          ))}
          <Link href="/precios" style={{display:"block",textAlign:"center",marginTop:16,background:V.verde,color:V.w,borderRadius:100,padding:"14px 0",fontSize:16,fontWeight:700,textDecoration:"none"}}>Empezar 14 días gratis →</Link>
        </div>
      )}
    </nav>
  );
}

export default function Actas(){
  return(
    <>
      <style>{CSS}</style>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-float"><WaSvg/><span className="wa-txt">¿Tienes dudas?</span></a>
      <Navbar active="/actas"/>
      <div style={{background:V.osc,padding:"56px 20px 64px",textAlign:"center"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <p style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:16}}>Actas e historial IA</p>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(30px,5vw,52px)",color:V.w,lineHeight:1.08,marginBottom:16}}>Del papel o del audio al acta estructurada en minutos</h1>
          <p style={{fontSize:16,color:"rgba(255,255,255,.55)",lineHeight:1.75,maxWidth:520,margin:"0 auto"}}>Sal de la junta, haz una foto al borrador o manda un audio mientras conduces. AfincalIA hace el resto.</p>
        </div>
      </div>
      <section style={{padding:"64px 20px",background:V.w}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:48}}>
            {[{ic:"📸",t:"Foto del acta",d:"Fotografía el borrador manuscrito o el documento impreso tras la junta"},{ic:"🎙️",t:"O manda un audio",d:"Dicta los puntos clave mientras conduces de vuelta al despacho"},{ic:"✨",t:"AfincalIA procesa",d:"Extrae acuerdos, votaciones, tareas y plazos automáticamente"},{ic:"📋",t:"Acta lista",d:"Documento estructurado y archivado bajo esa comunidad"}].map((s,i)=>(
              <div key={i} style={{background:V.alt,borderRadius:16,padding:"24px 20px",border:`1px solid ${V.borde}`,textAlign:"center"}}>
                <div style={{fontSize:36,marginBottom:14}}>{s.ic}</div>
                <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>{s.t}</div>
                <div style={{fontSize:13,color:V.sub,lineHeight:1.6}}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{background:V.w,borderRadius:20,border:`1px solid ${V.borde}`,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.07)",marginBottom:40}}>
            <div style={{background:V.osc,padding:"16px 24px",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:20}}>📋</span>
              <div><div style={{color:V.w,fontWeight:700,fontSize:14}}>Acta generada automáticamente</div><div style={{color:"rgba(255,255,255,.5)",fontSize:12}}>Comunidad Calle Mayor 12 · Junta ordinaria · 15 abr 2026</div></div>
            </div>
            <div style={{padding:"24px"}}>
              <div style={{marginBottom:20}}>
                <div style={{fontSize:11,fontWeight:700,color:V.mut,textTransform:"uppercase",letterSpacing:".08em",marginBottom:12}}>Acuerdos adoptados</div>
                {[{n:"1",t:"Aprobación presupuesto anual 2026",v:"Aprobado por unanimidad"},{n:"2",t:"Reparación del ascensor — Elevalia S.L.",v:"8 votos a favor, 1 abstención"},{n:"3",t:"Cuota extraordinaria 85€ por vivienda",v:"Aprobado por mayoría simple"}].map((a,i)=>(
                  <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:`1px solid ${V.borde}`}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:V.pale,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:V.verde,flexShrink:0}}>{a.n}</div>
                    <div><div style={{fontSize:14,color:V.tx,marginBottom:3}}>{a.t}</div><div style={{fontSize:11,color:V.verde,fontWeight:700}}>{a.v}</div></div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:V.mut,textTransform:"uppercase",letterSpacing:".08em",marginBottom:12}}>Tareas pendientes</div>
                {[{t:"Contactar con Elevalia S.L. para presupuesto definitivo",p:"Administrador",f:"22 abr 2026"},{t:"Enviar circular cuota extraordinaria",p:"Administrador",f:"20 abr 2026"},{t:"Convocar próxima junta ordinaria",p:"Presidente",f:"oct 2026"}].map((tarea,i,arr)=>(
                  <div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<arr.length-1?`1px solid ${V.borde}`:"none",alignItems:"flex-start"}}>
                    <span style={{color:V.amarillo,fontSize:14,flexShrink:0,marginTop:1}}>⏳</span>
                    <div><div style={{fontSize:13,color:V.tx,marginBottom:3}}>{tarea.t}</div><div style={{fontSize:11,color:V.mut}}>{tarea.p} · <strong style={{color:V.rojo}}>{tarea.f}</strong></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14,marginBottom:40}}>
            {[{ic:"🗂️",t:"Historial por comunidad",d:"Todas las actas, incidencias y comunicaciones en un solo lugar"},{ic:"🔍",t:"Búsqueda instantánea",d:"Encuentra cualquier acuerdo por fecha, comunidad o palabra clave"},{ic:"📤",t:"Envío automático",d:"El acta llega al presidente por WhatsApp o email en segundos"}].map((c,i)=>(
              <div key={i} style={{background:V.alt,borderRadius:14,padding:"20px 18px",border:`1px solid ${V.borde}`}}>
                <div style={{fontSize:28,marginBottom:10}}>{c.ic}</div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{c.t}</div>
                <div style={{fontSize:13,color:V.sub,lineHeight:1.6}}>{c.d}</div>
              </div>
            ))}
          </div>
          <div style={{background:V.pale,borderRadius:14,padding:"20px 24px",border:`1px solid ${V.borde}`}}>
            <p style={{fontSize:14,color:V.sub,lineHeight:1.75}}><strong style={{color:V.verde}}>¿Es válida legalmente el acta generada por IA?</strong> Sí, con la misma validez que cualquier acta redactada por el administrador, siempre que sea firmada por presidente y secretario conforme al Art. 19 LPH.</p>
          </div>
        </div>
      </section>
      <section style={{padding:"64px 20px",background:"#0F2D1A",textAlign:"center"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",color:V.w,marginBottom:14,lineHeight:1.1}}>Contrata tu empleado digital ya</h2>
          <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:28,lineHeight:1.75}}>Las actas IA están en el plan Profesional. 14 días gratis, sin tarjeta.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/precios" style={{background:V.verde,color:V.w,borderRadius:100,padding:"15px 36px",fontSize:16,fontWeight:700,textDecoration:"none"}}>Ver planes →</Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:"transparent",color:V.w,border:"2px solid rgba(255,255,255,.3)",borderRadius:100,padding:"14px 24px",fontSize:15,fontWeight:700,textDecoration:"none"}}><WaSvg s={16}/>WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

const CSS=`*{margin:0;padding:0;box-sizing:border-box;}body{font-family:system-ui,sans-serif;background:#FAFAF8;color:#111917;overflow-x:hidden;-webkit-font-smoothing:antialiased;}.dnav{display:flex!important;align-items:center;gap:4px;}.burg{display:none!important;}.wa-float{position:fixed;bottom:24px;right:20px;z-index:900;display:flex;align-items:center;gap:10px;background:#25D366;color:#fff;border-radius:100px;padding:12px 20px;box-shadow:0 4px 20px rgba(37,211,102,.4);text-decoration:none;font-weight:700;font-size:14px;font-family:system-ui;}.wa-txt{display:inline;}@media(max-width:740px){.dnav{display:none!important;}.burg{display:flex!important;}.wa-txt{display:none;}.wa-float{padding:14px;}}button:focus{outline:none;}`;
