import { useState, useEffect } from "react";
import Link from "next/link";

const V={verde:"#1A6B42",osc:"#0C3521",pale:"#EBF4EE",borde:"#C8DFCF",rojo:"#C4362C",tx:"#111917",sub:"#3D4D44",mut:"#9CA3AF",bg:"#FAFAF8",alt:"#F2F5F2",w:"#fff",azul:"#1E4FA3",amarillo:"#D97706"};
const WA="https://wa.me/34614557419?text=Hola%2C%20me%20interesa%20AfincalIA";

const PLANES=[
  {nom:"Esencial",m:"69",a:"58",at:"696",sub:"Hasta 25 comunidades",fs:["WhatsApp IA 24/7","Guardián RGPD activo","Clasificación LPH automática","Panel de incidencias","Soporte por WhatsApp"]},
  {nom:"Profesional",m:"159",a:"133",at:"1.596",sub:"Hasta 75 comunidades",dest:true,fs:["Todo lo del plan Esencial","Actas desde foto o audio","Protocolo morosidad Art. 21","Expediente digital por comunidad","Alertas de vencimientos","Soporte prioritario WhatsApp"]},
  {nom:"Despacho",m:"249",a:"208",at:"2.496",sub:"Hasta 150 comunidades",fs:["Todo lo del plan Profesional","Gestión multidespacho","Informes avanzados","Integración con Fynkus/Gesfincas","Onboarding por videollamada","Configuración personalizada"]},
  {nom:"Enterprise",sub:"Más de 150 comunidades",fs:["Todo lo del plan Despacho","Precio a medida","SLA garantizado","Soporte WhatsApp 24/7 directo"]},
];

const FAQS=[
  {p:"¿Qué incluyen los 14 días gratis?",r:"El plan Profesional completo: WhatsApp IA 24/7, actas desde foto o audio, expediente digital, protocolo de morosidad y guardián RGPD. Sin tarjeta ni permanencia."},
  {p:"¿Hay que cambiar el grupo de WhatsApp?",r:"No. Solo añades el número de AfincalIA al grupo. Los vecinos no notan ningún cambio."},
  {p:"¿Puedo cancelar cuando quiera?",r:"Sí, sin permanencia ni penalizaciones. Por WhatsApp directamente."},
  {p:"¿Funciona con Fynkus o Gesfincas?",r:"Sí. No los sustituye — los complementa. El plan Despacho incluye integración directa."},
  {p:"¿Cuánto tarda en estar operativo?",r:"Menos de una hora. Sin instalar nada, sin código."},
  {p:"¿Qué pasa al terminar los 14 días?",r:"Eliges el plan que mejor se ajusta y continúas. Si no quieres seguir, cancelas sin coste."},
  {p:"¿Es legal usar IA para atender vecinos?",r:"Sí. AfincalIA cumple el RGPD y la LOPDGDD. Datos en Alemania (UE), contrato DPA incluido."},
];

function Logo(){return(<Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:8}}><div style={{display:"flex",flexDirection:"column",gap:2}}><div style={{display:"flex",gap:2}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div><div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div></div><span style={{fontFamily:"Georgia,serif",fontSize:20,color:V.tx}}>Afincal<span style={{color:V.verde}}>IA</span></span></Link>);}
function WaSvg({s=20}){return(<svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>);}

function Modal({plan,billing,onClose}){
  const [form,setForm]=useState({nombre:"",email:"",telefono:"",despacho:"",ciudad:"",comunidades:""});
  const [step,setStep]=useState("form");
  const up=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const ok=Object.values(form).every(v=>String(v).trim());
  const submit=async()=>{if(!ok)return;setStep("loading");try{await fetch("/api/registro",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,plan,facturacion:billing,trial:14})});}catch(e){}setStep("success");};
  const si={width:"100%",border:`1px solid ${V.borde}`,borderRadius:10,padding:"12px 14px",fontSize:15,outline:"none",background:V.bg,marginBottom:10,boxSizing:"border-box",fontFamily:"system-ui"};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:V.w,borderRadius:20,width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",position:"relative",boxShadow:"0 24px 64px rgba(0,0,0,.28)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:V.alt,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:20,color:V.sub,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1}}>×</button>
        {step==="loading"&&<div style={{textAlign:"center",padding:"60px 24px"}}><div style={{width:44,height:44,border:`3px solid ${V.pale}`,borderTop:`3px solid ${V.verde}`,borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 18px"}}/><p style={{color:V.sub}}>Activando tu prueba gratis...</p></div>}
        {step==="success"&&<div style={{textAlign:"center",padding:"44px 24px"}}><div style={{fontSize:56,marginBottom:18}}>🎉</div><h3 style={{fontFamily:"Georgia,serif",fontSize:24,marginBottom:12}}>¡Todo listo!</h3><p style={{fontSize:15,color:V.sub,lineHeight:1.75,marginBottom:8}}>En menos de 2 minutos recibirás un WhatsApp en <strong>{form.telefono}</strong> con las instrucciones.</p><p style={{fontSize:13,color:V.mut,marginBottom:28}}>14 días plan Profesional. Sin tarjeta.</p><button onClick={onClose} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"13px 32px",fontWeight:700,cursor:"pointer",fontSize:15,fontFamily:"system-ui"}}>Perfecto ✓</button></div>}
        {step==="form"&&<div style={{padding:"28px 24px 24px"}}><div style={{background:V.pale,borderRadius:12,padding:"14px 16px",marginBottom:20,border:`1px solid ${V.borde}`}}><div style={{fontSize:13,fontWeight:700,color:V.verde,marginBottom:4}}>✓ 14 días gratis — Plan Profesional completo</div><div style={{fontSize:12,color:V.sub}}>Plan: {plan} · Sin tarjeta.</div></div><input style={si} placeholder="Nombre y apellidos *" value={form.nombre} onChange={up("nombre")}/><input style={si} placeholder="Email profesional *" type="email" value={form.email} onChange={up("email")}/><input style={si} placeholder="Teléfono (recibirás WhatsApp) *" type="tel" value={form.telefono} onChange={up("telefono")}/><input style={si} placeholder="Nombre del despacho *" value={form.despacho} onChange={up("despacho")}/><input style={si} placeholder="Ciudad *" value={form.ciudad} onChange={up("ciudad")}/><input style={si} placeholder="Nº de comunidades que gestionas *" type="number" min="1" value={form.comunidades} onChange={up("comunidades")}/><p style={{fontSize:11,color:V.mut,marginBottom:14,lineHeight:1.6}}>Al enviar aceptas nuestra <Link href="/politica-privacidad" style={{color:V.verde}}>política de privacidad</Link>. Datos en Alemania. RGPD.</p><button onClick={submit} disabled={!ok} style={{width:"100%",padding:"15px 0",borderRadius:100,border:"none",cursor:ok?"pointer":"default",fontWeight:700,fontSize:16,background:ok?V.verde:"#ccc",color:V.w,fontFamily:"system-ui"}}>Empezar mis 14 días gratis →</button></div>}
      </div>
    </div>
  );
}

function Navbar(){
  const [menu,setMenu]=useState(false);
  const [sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>20);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const links=[["Cómo funciona","/como-funciona"],["Actas IA","/actas"],["RGPD","/rgpd"],["Precios","/precios"],["Blog","/blog"]];
  return(
    <nav style={{position:"sticky",top:0,zIndex:100,background:sc?"rgba(250,250,248,.98)":"rgba(250,250,248,.94)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${sc?V.borde:"transparent"}`,transition:"all .3s"}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Logo/>
        <div className="dnav">
          {links.map(([l,href])=><Link key={href} href={href} style={{fontSize:14,color:href==="/precios"?V.verde:V.sub,padding:"7px 12px",textDecoration:"none",fontWeight:href==="/precios"?700:400}}>{l}</Link>)}
          <span style={{marginLeft:12,background:V.verde,color:V.w,borderRadius:100,padding:"10px 22px",fontSize:14,fontWeight:700}}>14 días gratis</span>
        </div>
        <button className="burg" onClick={()=>setMenu(!menu)} style={{background:"none",border:"none",cursor:"pointer",padding:8,display:"flex",flexDirection:"column",gap:5}}>
          {[0,1,2].map(i=><span key={i} style={{display:"block",width:24,height:2,background:V.tx,borderRadius:2,transition:"all .25s",transform:menu&&i===0?"rotate(45deg) translate(5px,5px)":menu&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",opacity:menu&&i===1?0:1}}/>)}
        </button>
      </div>
      {menu&&<div style={{background:V.w,borderTop:`1px solid ${V.borde}`,padding:"16px 20px 24px"}}>{links.map(([l,href])=><Link key={href} href={href} onClick={()=>setMenu(false)} style={{display:"block",fontSize:15,color:V.tx,padding:"12px 0",borderBottom:`1px solid ${V.borde}`,textDecoration:"none"}}>{l}</Link>)}</div>}
    </nav>
  );
}

export default function Precios(){
  const [billing,setBilling]=useState("mensual");
  const [faq,setFaq]=useState(null);
  const [modal,setModal]=useState(null);

  return(
    <>
      <style>{CSS}</style>
      {modal&&<Modal plan={modal.plan} billing={modal.billing} onClose={()=>setModal(null)}/>}
      <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-float"><WaSvg/><span className="wa-txt">¿Tienes dudas?</span></a>
      <Navbar/>
      <div style={{background:V.osc,padding:"52px 20px 60px",textAlign:"center"}}>
        <p style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:16}}>Precios</p>
        <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(30px,5vw,52px)",color:V.w,lineHeight:1.08,marginBottom:14}}>Elige el plan para tu despacho</h1>
        <p style={{fontSize:16,color:"rgba(255,255,255,.5)",marginBottom:28}}>14 días gratis con el plan Profesional · Sin tarjeta · Cancela cuando quieras</p>
        <div style={{display:"inline-flex",background:"rgba(255,255,255,.1)",borderRadius:100,padding:4}}>
          <button onClick={()=>setBilling("mensual")} style={{background:billing==="mensual"?V.verde:"transparent",color:V.w,border:"none",borderRadius:100,padding:"9px 22px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"system-ui",transition:"all .2s"}}>Mensual</button>
          <button onClick={()=>setBilling("anual")} style={{background:billing==="anual"?V.verde:"transparent",color:V.w,border:"none",borderRadius:100,padding:"9px 22px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"system-ui",transition:"all .2s",display:"flex",alignItems:"center",gap:7}}>
            Anual <span style={{background:"rgba(255,255,255,.15)",color:V.w,fontSize:11,fontWeight:800,borderRadius:100,padding:"2px 9px"}}>2 meses gratis</span>
          </button>
        </div>
      </div>
      <section style={{padding:"48px 20px 64px",background:V.alt}}>
        <div style={{maxWidth:1040,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
            {PLANES.map((p,i)=>(
              <div key={i} style={{background:p.dest?V.osc:V.w,border:`1px solid ${p.dest?V.osc:V.borde}`,borderRadius:20,padding:"28px 22px",position:"relative",transform:p.dest?"scale(1.04)":"none",boxShadow:p.dest?"0 24px 60px rgba(12,53,33,.25)":"0 2px 12px rgba(0,0,0,.05)"}}>
                {p.dest&&<div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:V.azul,color:V.w,fontSize:11,fontWeight:800,padding:"5px 16px",borderRadius:100,whiteSpace:"nowrap"}}>MÁS ELEGIDO</div>}
                <div style={{fontSize:12,fontWeight:700,color:p.dest?"rgba(255,255,255,.4)":V.mut,marginBottom:8,textTransform:"uppercase",letterSpacing:".1em"}}>{p.nom}</div>
                {p.m?(<>
                  <div style={{fontFamily:"Georgia,serif",fontSize:50,color:p.dest?V.w:V.tx,lineHeight:1,marginBottom:2}}>{billing==="anual"?p.a:p.m}<span style={{fontSize:16,fontFamily:"system-ui",fontWeight:400}}>€</span></div>
                  <div style={{fontSize:12,color:p.dest?"rgba(255,255,255,.35)":V.mut,marginBottom:billing==="anual"?2:16}}>/mes{billing==="anual"?` · ${p.at}€/año`:" · facturación mensual"}</div>
                  {billing==="anual"&&<div style={{fontSize:11,color:"#22C55E",fontWeight:700,marginBottom:16}}>✓ 2 meses gratis</div>}
                </>):<div style={{fontFamily:"Georgia,serif",fontSize:28,color:V.tx,marginBottom:10,marginTop:8}}>A medida</div>}
                <div style={{fontSize:13,color:p.dest?"rgba(255,255,255,.55)":V.sub,marginBottom:20,fontWeight:600}}>{p.sub}</div>
                <div style={{marginBottom:24}}>{p.fs.map((f,j)=>(<div key={j} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:10,fontSize:13.5}}><span style={{color:f.includes("RGPD")||f.includes("Actas")||f.includes("Expediente")?V.azul:p.dest?"#4ADE80":V.verde,flexShrink:0,fontWeight:700,marginTop:1}}>✓</span><span style={{color:p.dest?"rgba(255,255,255,.75)":V.sub,fontWeight:f.includes("Actas")||f.includes("RGPD")?700:400}}>{f}</span></div>))}</div>
                {p.m?<button onClick={()=>setModal({plan:p.nom,billing})} style={{width:"100%",padding:"13px 0",borderRadius:100,border:"none",cursor:"pointer",fontFamily:"system-ui",fontWeight:700,fontSize:14,background:p.dest?V.w:V.verde,color:p.dest?V.osc:V.w}}>Empezar 14 días gratis →</button>
                :<a href="mailto:hola@afincalia.es?subject=Plan Enterprise AfincalIA" style={{display:"block",textAlign:"center",padding:"13px 0",borderRadius:100,border:`2px solid ${V.verde}`,fontFamily:"system-ui",fontWeight:700,fontSize:14,color:V.verde,textDecoration:"none"}}>Solicitar plan</a>}
              </div>
            ))}
          </div>
          <p style={{textAlign:"center",marginTop:20,fontSize:14,color:V.mut}}>¿Dudas? <a href={WA} target="_blank" rel="noopener noreferrer" style={{color:V.verde,fontWeight:700,textDecoration:"none"}}>Escríbenos por WhatsApp →</a></p>
        </div>
      </section>
      <section style={{padding:"64px 20px",background:V.w}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,3vw,36px)",textAlign:"center",marginBottom:36}}>Preguntas frecuentes</h2>
          {FAQS.map((f,i)=>(
            <div key={i} style={{borderBottom:`1px solid ${V.borde}`}}>
              <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"18px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"system-ui",fontSize:15,fontWeight:600,color:V.tx,textAlign:"left",gap:16}}>
                {f.p}<span style={{fontSize:24,color:V.mut,flexShrink:0,transform:faq===i?"rotate(45deg)":"none",transition:"transform .22s",display:"inline-block",lineHeight:1}}>+</span>
              </button>
              {faq===i&&<div style={{paddingBottom:20,fontSize:15,color:V.sub,lineHeight:1.85}}>{f.r}</div>}
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:"64px 20px",background:"#0F2D1A",textAlign:"center"}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",color:V.w,marginBottom:14,lineHeight:1.1}}>Contrata tu empleado digital ya</h2>
          <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:28,lineHeight:1.75}}>14 días con el plan Profesional completo. Sin tarjeta. Sin riesgo.</p>
          <button onClick={()=>setModal({plan:"Profesional",billing})} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"15px 36px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>Empezar gratis →</button>
        </div>
      </section>
    </>
  );
}

const CSS=`*{margin:0;padding:0;box-sizing:border-box;}body{font-family:system-ui,sans-serif;background:#FAFAF8;color:#111917;overflow-x:hidden;-webkit-font-smoothing:antialiased;}@keyframes spin{to{transform:rotate(360deg)}}.dnav{display:flex!important;align-items:center;gap:4px;}.burg{display:none!important;}.wa-float{position:fixed;bottom:24px;right:20px;z-index:900;display:flex;align-items:center;gap:10px;background:#25D366;color:#fff;border-radius:100px;padding:12px 20px;box-shadow:0 4px 20px rgba(37,211,102,.4);text-decoration:none;font-weight:700;font-size:14px;font-family:system-ui;}.wa-txt{display:inline;}@media(max-width:740px){.dnav{display:none!important;}.burg{display:flex!important;}.wa-txt{display:none;}.wa-float{padding:14px;}}button:focus{outline:none;}`;
