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

export default function RGPD(){
  return(
    <>
      <style>{CSS}</style>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-float"><WaSvg/><span className="wa-txt">¿Tienes dudas?</span></a>
      <Navbar active="/rgpd"/>
      <div style={{background:"#0F2D1A",padding:"56px 20px 64px",textAlign:"center"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(74,222,128,.1)",border:"1px solid rgba(74,222,128,.2)",borderRadius:100,padding:"6px 18px",marginBottom:20}}>
            <span>🛡️</span><span style={{fontSize:12,color:"#4ADE80",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em"}}>Guardián RGPD — exclusivo de AfincalIA</span>
          </div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(30px,5vw,52px)",color:V.w,lineHeight:1.08,marginBottom:16}}>Tu empleado digital cumple la ley por ti</h1>
          <p style={{fontSize:16,color:"rgba(255,255,255,.55)",lineHeight:1.75,maxWidth:560,margin:"0 auto"}}>La AEPD ha multado a más de 200 comunidades desde 2020. La mayoría por datos personales compartidos en el grupo de WhatsApp. AfincalIA lo detecta en tiempo real.</p>
        </div>
      </div>
      <section style={{padding:"56px 20px",background:"#0F2D1A"}}>
        <div style={{maxWidth:480,margin:"0 auto"}}>
          <div style={{background:"#E5DDD5",borderRadius:16,overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,.3)"}}>
            <div style={{background:"#075E54",padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"#128C7E",display:"flex",alignItems:"center",justifyContent:"center",color:V.w,fontWeight:800,fontSize:13}}>A</div>
              <div><div style={{color:V.w,fontWeight:700,fontSize:13}}>Comunidad Calle Mayor 12</div><div style={{color:"rgba(255,255,255,.6)",fontSize:10}}>38 participantes</div></div>
            </div>
            <div style={{padding:"12px 12px 16px",display:"flex",flexDirection:"column",gap:8}}>
              <div style={{alignSelf:"flex-end",maxWidth:"80%"}}><div style={{background:"#DCF8C6",padding:"8px 12px",borderRadius:10,borderTopRightRadius:2,fontSize:12,color:"#111"}}><div style={{fontWeight:600,color:"#075E54",fontSize:11,marginBottom:3}}>Presidente</div>Os adjunto el recibo de Juan García — IBAN ES76 2100 0418 ****<div style={{fontSize:9,color:"#999",textAlign:"right",marginTop:3}}>14:32 ✓✓</div></div></div>
              <div style={{alignSelf:"flex-start",maxWidth:"92%"}}><div style={{background:V.w,padding:"11px 13px",borderRadius:10,borderTopLeftRadius:2,fontSize:12,color:"#111",border:"1.5px solid #FCA5A5"}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:7}}><span>🛡️</span><span style={{fontWeight:700,color:"#DC2626",fontSize:11,textTransform:"uppercase"}}>Aviso de protección de datos</span></div><p style={{lineHeight:1.65,color:"#333",marginBottom:8}}>Se ha detectado un posible dato bancario. Este tipo de información no debe compartirse en el grupo.</p><p style={{fontSize:11,color:V.sub}}>📩 El administrador ha sido notificado.</p><div style={{fontSize:9,color:"#999",textAlign:"right",marginTop:6}}>14:32 · Aviso registrado</div></div></div>
            </div>
          </div>
        </div>
      </section>
      <section style={{padding:"64px 20px",background:V.w}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3vw,38px)",textAlign:"center",marginBottom:36,lineHeight:1.1}}>Las 4 garantías legales incluidas en todos los planes</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:40}}>
            {[{ic:"🇩🇪",t:"Servidores en Alemania",d:"Datos dentro de la UE. Cumplimiento total del RGPD y la LOPDGDD.",ley:"RGPD Art. 44-49"},{ic:"📋",t:"Contrato DPA incluido",d:"Contrato de encargado del tratamiento desde el primer día, sin coste.",ley:"LOPDGDD Art. 28"},{ic:"⚖️",t:"Aviso legal en cada respuesta",d:"Cada mensaje incluye el aviso de que es orientativo y no vinculante.",ley:"RGPD Art. 13"},{ic:"🔒",t:"Sin cruce de datos",d:"El asistente nunca comparte información de un vecino con otro.",ley:"RGPD Art. 5.1.f"}].map((g,i)=>(
              <div key={i} style={{background:V.osc,borderRadius:14,padding:"20px 18px",border:"1px solid rgba(255,255,255,.08)"}}>
                <div style={{fontSize:26,marginBottom:10}}>{g.ic}</div>
                <div style={{fontWeight:700,fontSize:13,marginBottom:4,color:V.w}}>{g.t}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.6,marginBottom:8}}>{g.d}</div>
                <div style={{fontSize:10,color:"#4ADE80",fontWeight:700}}>{g.ley}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#D1FAE5",border:"2px solid #6EE7B7",borderRadius:16,padding:"20px 24px",textAlign:"center"}}>
            <p style={{fontSize:15,color:"#065F46",lineHeight:1.75}}><strong>Ningún otro asistente del mercado hace esto.</strong> Finky, Fincora y los chatbots genéricos atienden mensajes — pero ninguno vigila activamente que nadie exponga datos personales en el grupo.</p>
          </div>
        </div>
      </section>
      <section style={{padding:"64px 20px",background:"#0F2D1A",textAlign:"center"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",color:V.w,marginBottom:14,lineHeight:1.1}}>Contrata tu empleado digital ya</h2>
          <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:28,lineHeight:1.75}}>El guardián RGPD está en todos los planes. 14 días gratis, sin tarjeta.</p>
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
