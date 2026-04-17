import { useState, useEffect, useRef } from "react";

const V={verde:"#1A6B42",osc:"#0C3521",pale:"#EBF4EE",borde:"#C8DFCF",rojo:"#C4362C",tx:"#111917",sub:"#3D4D44",mut:"#9CA3AF",bg:"#FAFAF8",alt:"#F2F5F2",w:"#fff",azul:"#1E4FA3",amarillo:"#D97706"};
const WA="https://wa.me/34614557419?text=Hola%2C%20me%20interesa%20AfincalIA";
const NAV_LINKS=[["Cómo funciona","/como-funciona"],["Actas IA","/actas"],["RGPD","/rgpd"],["Precios","/precios"],["Blog","/blog"]];

const FB=[
  {k:["ascensor"],t:"El ascensor está registrado como urgente y el administrador ya ha sido avisado.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["gotera","fuga","agua","humedad"],t:"La gotera queda registrada. El administrador contactará con un técnico hoy.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["ruido","música","fiesta"],t:"Las molestias están prohibidas por ley. Tu queja queda registrada.",l:"Art. 7.2 LPH — actividades molestas",tp:"ALTA"},
  {k:["cargador","eléctrico","vehículo"],t:"Puedes instalarlo avisando al administrador con 30 días de antelación.",l:"Art. 17.4 LPH — cargadores eléctricos",tp:"NORMAL"},
  {k:["turístico","airbnb"],t:"La comunidad puede limitarlo con el voto de 3 de cada 5 propietarios.",l:"Art. 17.12 LPH — pisos turísticos",tp:"INFO"},
  {k:["moroso","no paga","deuda","cuota"],t:"El administrador puede reclamar sin abogado si la deuda es menor de 2.000€.",l:"Art. 21 LPH — procedimiento monitorio",tp:"GESTIÓN"},
  {k:["obras","reforma"],t:"Las obras en tu vivienda hay que avisarlas al administrador antes de empezar.",l:"Art. 7.1 LPH — obras en viviendas",tp:"NORMAL"},
  {k:["junta","reunión","asamblea"],t:"La junta ordinaria debe celebrarse al menos una vez al año.",l:"Art. 16 LPH — convocatoria de junta",tp:"INFO"},
  {k:["acta"],t:"Puedo generar el acta desde tu foto o audio. El administrador la recibirá estructurada y lista.",l:"Art. 19 LPH — actas de junta",tp:"INFO"},
  {k:["luz","bombilla","portal"],t:"La iluminación del portal es zona común. Queda registrado.",l:"Art. 3 LPH — elementos comunes",tp:"NORMAL"},
];
const getFB=txt=>{const t=txt.toLowerCase();for(const f of FB)if(f.k.some(k=>t.includes(k)))return{texto:f.t,ley:f.l,url:"https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906",tipo:f.tp};return{texto:"Consulta registrada. Tu administrador te responderá en breve.",ley:null,url:null,tipo:"INFO"};};
const TC={URGENTE:"#DC2626",ALTA:V.amarillo,NORMAL:V.verde,GESTIÓN:V.azul,INFO:V.mut};
const TL={URGENTE:"🔴 Urgente",ALTA:"🟠 Alta prioridad",NORMAL:"🟢 Registrado",GESTIÓN:"🔵 En gestión",INFO:"ℹ️ Info"};

function Logo(){return(<a href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:8}}><div style={{display:"flex",flexDirection:"column",gap:2}}><div style={{display:"flex",gap:2}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div><div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div></div><span style={{fontFamily:"Georgia,serif",fontSize:20,color:V.tx}}>Afincal<span style={{color:V.verde}}>IA</span></span></a>);}

const WASVG=({s=22})=><svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

function Bubble({m,hora}){
  if(m.from==="user")return(<div style={{alignSelf:"flex-end",maxWidth:"84%"}}><div style={{background:"#DCF8C6",padding:"9px 13px",borderRadius:12,borderTopRightRadius:2,fontSize:14,lineHeight:1.55,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.08)"}}>{m.text}<div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:4}}>{hora} ✓✓</div></div></div>);
  return(<div style={{alignSelf:"flex-start",maxWidth:"90%"}}><div style={{background:V.w,padding:"9px 13px",borderRadius:12,borderTopLeftRadius:2,fontSize:14,lineHeight:1.65,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.08)"}}><div>{m.texto}</div>{m.ley&&<a href="https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:9,background:V.pale,border:`1px solid ${V.borde}`,borderRadius:100,padding:"4px 12px",fontSize:11,color:V.verde,textDecoration:"none",fontWeight:700}}>📖 {m.ley} →</a>}{m.tipo&&<div style={{marginTop:7,fontSize:10,color:TC[m.tipo]||V.mut,fontWeight:700}}>{TL[m.tipo]||m.tipo}</div>}<div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:3}}>{hora}</div></div></div>);
}

function Chat(){
  const [msgs,setMsgs]=useState([{from:"ai",texto:"Hola, soy el asistente de tu comunidad. ¿En qué puedo ayudarte?",ley:null,tipo:null}]);
  const [inp,setInp]=useState("");const [busy,setBusy]=useState(false);const endRef=useRef(null);
  const hora=new Date().toLocaleTimeString("es",{hour:"2-digit",minute:"2-digit"});
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,busy]);
  const send=async txt=>{
    const text=(txt||inp).trim();if(!text||busy)return;setInp("");
    const next=[...msgs,{from:"user",text}];setMsgs(next);setBusy(true);
    let r=null;
    try{
      const hist=next.slice(1).map(m=>({role:m.from==="user"?"user":"assistant",content:m.from==="user"?m.text:m.texto}));
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:hist})});
      if(res.ok){const d=await res.json();if(d.text){const g=k=>{const m=d.text.match(new RegExp(k+":\\s*(.+)"));return m?.[1]?.trim()||null;};const texto=g("TEXTO"),ley=g("LEY"),url=g("URL"),tipo=g("TIPO");if(texto)r={texto,ley:ley==="ninguna"?null:ley,url:url==="ninguna"?null:url,tipo:tipo||"INFO"};}}
    }catch(e){}
    if(!r)r=getFB(text);setMsgs(p=>[...p,{from:"ai",...r}]);setBusy(false);
  };
  return(
    <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.18)",maxWidth:360,width:"100%",margin:"0 auto"}}>
      <div style={{background:"#075E54",padding:"12px 16px",display:"flex",alignItems:"center",gap:11}}>
        <div style={{width:42,height:42,borderRadius:"50%",background:"#128C7E",display:"flex",alignItems:"center",justifyContent:"center",color:V.w,fontWeight:800,fontSize:18,flexShrink:0}}>A</div>
        <div><div style={{color:V.w,fontWeight:700,fontSize:14}}>AfincalIA</div><div style={{color:"rgba(255,255,255,.7)",fontSize:11,display:"flex",alignItems:"center",gap:5}}><span style={{width:7,height:7,borderRadius:"50%",background:"#4ADE80",display:"inline-block"}}/>Activo 24 horas · respuesta inmediata</div></div>
      </div>
      <div style={{background:"#E5DDD5",padding:"12px 10px 8px",height:290,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
        {msgs.map((m,i)=><Bubble key={i} m={m} hora={hora}/>)}
        {busy&&<div style={{alignSelf:"flex-start",background:V.w,borderRadius:12,borderTopLeftRadius:2,padding:"11px 14px",display:"flex",gap:4}}>{[0,.15,.3].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#999",animation:`dot 1s ${d}s infinite`}}/>)}</div>}
        <div ref={endRef}/>
      </div>
      {msgs.length<=1&&<div style={{background:"#F0F2F5",padding:"8px 10px",display:"flex",flexWrap:"wrap",gap:6}}>{["El ascensor no funciona","Gotera en el portal","¿Puedo instalar un cargador?","Mi vecino hace ruido"].map((s,i)=><button key={i} onClick={()=>send(s)} style={{background:V.w,border:"1px solid #ddd",borderRadius:100,padding:"5px 12px",fontSize:11,color:"#333",cursor:"pointer",fontFamily:"system-ui"}}>{s}</button>)}</div>}
      <div style={{background:"#F0F2F5",padding:"9px 10px",display:"flex",gap:8,alignItems:"center"}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Escribe tu consulta..." disabled={busy} style={{flex:1,border:"none",borderRadius:22,padding:"10px 15px",fontSize:14,background:V.w,outline:"none",fontFamily:"system-ui"}}/>
        <button onClick={()=>send()} disabled={busy||!inp.trim()} style={{width:40,height:40,borderRadius:"50%",background:inp.trim()&&!busy?"#128C7E":"#ccc",border:"none",cursor:inp.trim()&&!busy?"pointer":"default",color:V.w,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>↑</button>
      </div>
    </div>
  );
}

function FormRegistro({onClose}){
  const [form,setForm]=useState({nombre:"",email:"",telefono:"",despacho:"",ciudad:"",comunidades:""});
  const [step,setStep]=useState("form");
  const up=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const ok=form.nombre&&form.email&&form.telefono&&form.despacho&&form.ciudad&&form.comunidades;
  const submit=async()=>{if(!ok)return;setStep("loading");try{await fetch("/api/registro",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,plan:"Profesional",trial:14})});}catch(e){}setStep("success");};
  const si={width:"100%",border:`1px solid ${V.borde}`,borderRadius:10,padding:"12px 14px",fontSize:15,outline:"none",background:V.bg,marginBottom:10,boxSizing:"border-box",fontFamily:"system-ui"};
  if(step==="loading")return(<div style={{textAlign:"center",padding:"60px 24px"}}><div style={{width:44,height:44,border:`3px solid ${V.pale}`,borderTop:`3px solid ${V.verde}`,borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 18px"}}/><p style={{color:V.sub,fontSize:15}}>Activando tu prueba gratis...</p></div>);
  if(step==="success")return(<div style={{textAlign:"center",padding:"44px 24px"}}><div style={{fontSize:56,marginBottom:18}}>🎉</div><h3 style={{fontFamily:"Georgia,serif",fontSize:24,marginBottom:12}}>¡Todo listo!</h3><p style={{fontSize:15,color:V.sub,lineHeight:1.75,marginBottom:8}}>En menos de 2 minutos recibirás un WhatsApp en <strong>{form.telefono}</strong> con las instrucciones.</p><p style={{fontSize:13,color:V.mut,marginBottom:28}}>Tienes 14 días con el plan Profesional completo. Sin tarjeta.</p><button onClick={onClose} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"13px 32px",fontWeight:700,cursor:"pointer",fontSize:15,fontFamily:"system-ui"}}>Perfecto ✓</button></div>);
  return(<div style={{padding:"28px 24px 24px"}}><div style={{background:V.pale,borderRadius:12,padding:"14px 16px",marginBottom:20,border:`1px solid ${V.borde}`}}><div style={{fontSize:13,fontWeight:700,color:V.verde,marginBottom:4}}>✓ 14 días gratis — Plan Profesional completo</div><div style={{fontSize:12,color:V.sub,lineHeight:1.5}}>Actas IA, expedientes, morosidad y guardián RGPD. Sin tarjeta.</div></div><input style={si} placeholder="Nombre y apellidos *" value={form.nombre} onChange={up("nombre")} autoComplete="name"/><input style={si} placeholder="Email profesional *" type="email" value={form.email} onChange={up("email")} autoComplete="email"/><input style={si} placeholder="Teléfono (recibirás WhatsApp) *" type="tel" value={form.telefono} onChange={up("telefono")} autoComplete="tel"/><input style={si} placeholder="Nombre del despacho *" value={form.despacho} onChange={up("despacho")}/><input style={si} placeholder="Ciudad *" value={form.ciudad} onChange={up("ciudad")}/><input style={si} placeholder="Nº de comunidades que gestionas *" type="number" min="1" value={form.comunidades} onChange={up("comunidades")}/><p style={{fontSize:11,color:V.mut,marginBottom:14,lineHeight:1.6}}>Al enviar aceptas nuestra <a href="/politica-privacidad" style={{color:V.verde}}>política de privacidad</a>. Datos tratados conforme al RGPD. Servidores en Alemania.</p><button onClick={submit} disabled={!ok} style={{width:"100%",padding:"15px 0",borderRadius:100,border:"none",cursor:ok?"pointer":"default",fontWeight:700,fontSize:16,background:ok?V.verde:"#ccc",color:V.w,transition:"background .2s",fontFamily:"system-ui"}}>Empezar mis 14 días gratis →</button></div>);
}

function Navbar({modal,setModal}){
  const [menu,setMenu]=useState(false);
  const [sc,setSc]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>20);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return(
    <nav style={{position:"sticky",top:0,zIndex:100,background:sc?"rgba(250,250,248,.98)":"rgba(250,250,248,.94)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${sc?V.borde:"transparent"}`,transition:"all .3s"}}>
      <div style={{maxWidth:1060,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Logo/>
        <div className="dnav">
          {NAV_LINKS.map(([l,href])=>(
            <a key={href} href={href} style={{fontSize:14,color:V.sub,padding:"7px 12px",textDecoration:"none",borderRadius:8,transition:"color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.color=V.verde} onMouseLeave={e=>e.currentTarget.style.color=V.sub}>{l}</a>
          ))}
          <button onClick={()=>setModal(true)} style={{marginLeft:12,background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"10px 22px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 2px 12px rgba(26,107,66,.25)"}}>14 días gratis</button>
        </div>
        <button className="burg" onClick={()=>setMenu(!menu)} style={{background:"none",border:"none",cursor:"pointer",padding:8,display:"flex",flexDirection:"column",gap:5}}>
          {[0,1,2].map(i=><span key={i} style={{display:"block",width:24,height:2,background:V.tx,borderRadius:2,transition:"all .25s",transform:menu&&i===0?"rotate(45deg) translate(5px,5px)":menu&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",opacity:menu&&i===1?0:1}}/>)}
        </button>
      </div>
      {menu&&(
        <div style={{background:V.w,borderTop:`1px solid ${V.borde}`,padding:"20px 20px 28px",boxShadow:"0 12px 32px rgba(0,0,0,.1)"}}>
          <p style={{fontSize:11,fontWeight:700,color:V.mut,textTransform:"uppercase",letterSpacing:".1em",marginBottom:12}}>El producto</p>
          {[["🤖","Cómo funciona","/como-funciona"],["📄","Actas e historial IA","/actas"],["🛡️","Seguridad RGPD","/rgpd"]].map(([ic,l,href])=>(
            <a key={href} href={href} style={{display:"flex",alignItems:"center",gap:12,fontSize:16,color:V.tx,padding:"13px 0",borderBottom:`1px solid ${V.borde}`,textDecoration:"none",fontWeight:500}}>
              <span style={{fontSize:20,width:28}}>{ic}</span>{l}
            </a>
          ))}
          <p style={{fontSize:11,fontWeight:700,color:V.mut,textTransform:"uppercase",letterSpacing:".1em",marginTop:20,marginBottom:12}}>Contratar</p>
          {[["💰","Planes y precios","/precios"],["📝","Blog","/blog"]].map(([ic,l,href])=>(
            <a key={href} href={href} style={{display:"flex",alignItems:"center",gap:12,fontSize:16,color:V.tx,padding:"13px 0",borderBottom:`1px solid ${V.borde}`,textDecoration:"none",fontWeight:500}}>
              <span style={{fontSize:20,width:28}}>{ic}</span>{l}
            </a>
          ))}
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:20}}>
            <button onClick={()=>{setMenu(false);setModal(true);}} style={{width:"100%",background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"15px 0",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>Empezar 14 días gratis →</button>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#25D366",color:V.w,borderRadius:100,padding:"14px 0",fontSize:15,fontWeight:700,textDecoration:"none"}}>
              <WASVG s={18}/>Hablar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer(){
  return(
    <footer style={{background:V.alt,padding:"48px 20px 32px",borderTop:`1px solid ${V.borde}`}}>
      <div style={{maxWidth:980,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:40,marginBottom:44}}>
          <div><Logo/><p style={{marginTop:18,fontSize:14,color:V.mut,lineHeight:1.75}}>El empleado digital para administradores de fincas en España. LPH · RGPD · 24/7</p></div>
          <div>
            <p style={{fontWeight:700,color:V.sub,marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Producto</p>
            {[["Cómo funciona","/como-funciona"],["Actas IA","/actas"],["Guardián RGPD","/rgpd"],["Demo","/#demo"],["Precios","/precios"]].map(([l,h])=>(
              <div key={l} style={{marginBottom:12}}><a href={h} style={{fontSize:14,color:V.sub,textDecoration:"none"}}>{l}</a></div>
            ))}
          </div>
          <div>
            <p style={{fontWeight:700,color:V.sub,marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Legal</p>
            {[["Aviso legal","/aviso-legal"],["Política de privacidad","/politica-privacidad"],["Política de cookies","/politica-cookies"],["Condiciones de uso","/condiciones-uso"],["Contrato DPA","/contrato-dpa"]].map(([l,h])=>(
              <div key={l} style={{marginBottom:12}}><a href={h} style={{fontSize:14,color:V.mut,textDecoration:"none"}}>{l}</a></div>
            ))}
          </div>
          <div>
            <p style={{fontWeight:700,color:V.sub,marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Contacto</p>
            <a href="tel:+34614557419" style={{display:"block",marginBottom:12,fontSize:14,color:V.sub,textDecoration:"none"}}>📞 614 557 419</a>
            <a href="mailto:hola@afincalia.es" style={{display:"block",marginBottom:12,fontSize:14,color:V.sub,textDecoration:"none"}}>✉️ hola@afincalia.es</a>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{display:"block",marginBottom:12,fontSize:14,color:V.verde,fontWeight:700,textDecoration:"none"}}>💬 WhatsApp directo →</a>
            <a href="/blog" style={{display:"block",fontSize:14,color:V.sub,textDecoration:"none"}}>📝 Blog</a>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${V.borde}`,paddingTop:24,display:"flex",flexWrap:"wrap",gap:12,justifyContent:"space-between",fontSize:12,color:V.mut}}>
          <p>© 2026 AfincalIA · No sustituye asesoramiento jurídico profesional.</p>
          <p>RGPD · LOPDGDD · LSSI-CE · Datos alojados en la UE (Alemania)</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home(){
  const [modal,setModal]=useState(false);
  useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"});},[]);

  return(
    <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,color:V.tx,overflowX:"hidden"}}>
      <style>{CSS}</style>

      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>{if(e.target===e.currentTarget)setModal(false);}}>
          <div style={{background:V.w,borderRadius:20,width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",position:"relative",boxShadow:"0 24px 64px rgba(0,0,0,.28)"}}>
            <button onClick={()=>setModal(false)} style={{position:"absolute",top:14,right:14,background:V.alt,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:20,color:V.sub,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}}>×</button>
            <FormRegistro onClose={()=>setModal(false)}/>
          </div>
        </div>
      )}

      <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-float">
        <WASVG/><span className="wa-txt">¿Tienes dudas?</span>
      </a>

      <Navbar modal={modal} setModal={setModal}/>

      {/* HERO */}
      <section style={{padding:"64px 20px 80px",background:`linear-gradient(170deg,${V.pale} 0%,${V.bg} 65%)`}}>
        <div style={{maxWidth:960,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:V.pale,border:`1px solid ${V.borde}`,borderRadius:100,padding:"6px 18px",fontSize:12,fontWeight:700,color:V.verde,marginBottom:24,textTransform:"uppercase",letterSpacing:".09em"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#22C55E",display:"inline-block"}}/>El único asistente IA para fincas con guardián RGPD integrado
          </div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,7vw,60px)",lineHeight:1.05,letterSpacing:"-.03em",marginBottom:26}}>
            Tu empleado digital<br/><em style={{color:V.verde}}>que trabaja, protege y nunca falla</em>
          </h1>
          <p style={{fontSize:"clamp(16px,2.5vw,19px)",color:V.sub,lineHeight:1.8,maxWidth:600,margin:"0 auto 24px"}}>
            Atiende vecinos 24h por WhatsApp, genera actas desde foto o audio, gestiona morosos y vigila el RGPD de tu grupo. Sin instalar nada.
          </p>
          <div style={{display:"inline-flex",alignItems:"center",gap:9,background:"#D1FAE5",border:"2px solid #6EE7B7",borderRadius:100,padding:"10px 22px",marginBottom:36}}>
            <span style={{fontSize:16}}>🛡️</span>
            <span style={{fontSize:13,color:"#065F46",fontWeight:700}}>Guardián RGPD activo — protege tu despacho de sanciones de la AEPD</span>
          </div>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
            <button onClick={()=>setModal(true)} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"17px 38px",fontSize:17,fontWeight:700,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 6px 24px rgba(26,107,66,.35)"}}>Empezar 14 días gratis</button>
            <a href="/como-funciona" style={{background:V.w,color:V.tx,border:`2px solid ${V.borde}`,borderRadius:100,padding:"15px 28px",fontSize:16,fontWeight:600,textDecoration:"none",display:"inline-flex",alignItems:"center"}}>Ver cómo funciona →</a>
          </div>
          <p style={{fontSize:13,color:V.mut,marginBottom:56}}>Sin tarjeta · Plan Profesional completo · Operativo en menos de 1 hora</p>
          <Chat/>
        </div>
      </section>

      {/* STATS */}
      <div style={{background:V.osc,padding:"24px 20px"}}>
        <div style={{maxWidth:860,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:32,justifyContent:"center"}}>
          {[["< 1h","para activarlo"],["24/7","atención automática"],["0€","sanciones AEPD"],["LPH","siempre verificada"],["RGPD","guardián activo"]].map(([n,l],i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:30,color:i===2?"#4ADE80":V.w,lineHeight:1}}>{n}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 BENEFICIOS EN GRID */}
      <section style={{padding:"80px 20px",background:V.w}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Todo en uno</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08}}>Cuatro problemas resueltos de una vez</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20}}>
            {[
              {ic:"💬",color:V.pale,bc:V.borde,t:"WhatsApp 24/7",d:"Responde a los vecinos al instante con la LPH verificada. Tú solo recibes lo que requiere tu criterio.",link:"/como-funciona"},
              {ic:"📋",color:"#EEF2FF",bc:"#C7D2FE",t:"Actas desde foto",d:"Foto o audio del borrador. Acta estructurada con acuerdos, votaciones y tareas en minutos.",link:"/actas"},
              {ic:"🛡️",color:"#D1FAE5",bc:"#6EE7B7",t:"Guardián RGPD",d:"Detecta datos personales en el grupo en tiempo real y avisa antes de que el daño esté hecho.",link:"/rgpd"},
              {ic:"📁",color:"#FEF3C7",bc:"#FDE68A",t:"Expediente digital",d:"Historial completo de cada comunidad: actas, incidencias, morosos y comunicaciones.",link:"/como-funciona"},
            ].map((b,i)=>(
              <a key={i} href={b.link} style={{background:V.alt,border:`1px solid ${V.borde}`,borderRadius:20,padding:"28px 24px",textDecoration:"none",display:"block",transition:"box-shadow .2s"}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.09)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{width:52,height:52,borderRadius:14,background:b.color,border:`2px solid ${b.bc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>{b.ic}</div>
                <div style={{fontWeight:700,fontSize:16,marginBottom:8,color:V.tx}}>{b.t}</div>
                <div style={{fontSize:13,color:V.sub,lineHeight:1.65,marginBottom:14}}>{b.d}</div>
                <div style={{fontSize:13,color:V.verde,fontWeight:700}}>Saber más →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{padding:"80px 20px",background:V.alt}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Demo en vivo</p>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,marginBottom:16}}>Habla con el asistente ahora mismo</h2>
          <p style={{fontSize:16,color:V.sub,maxWidth:500,margin:"0 auto 44px",lineHeight:1.75}}>Escribe como si fueras un vecino real. Responde con la ley si aplica y registra la incidencia.</p>
          <Chat/>
        </div>
      </section>

      {/* SOBRE */}
      <section style={{padding:"80px 20px",background:V.w}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Sobre AfincalIA</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",lineHeight:1.1}}>Nació de ver el problema de cerca</h2>
          </div>
          <div style={{background:V.alt,borderRadius:20,padding:"36px 32px",border:`1px solid ${V.borde}`,marginBottom:32}}>
            <p style={{fontSize:16,color:V.sub,lineHeight:1.95,marginBottom:20}}>Trabajando durante años junto a numerosos despachos de administración de fincas, vi siempre lo mismo: teléfonos que no paraban de sonar, grupos de WhatsApp con cientos de mensajes sin control, y vecinos llamando enfadados por los mismos problemas una y otra vez.</p>
            <p style={{fontSize:16,color:V.sub,lineHeight:1.95,marginBottom:20}}>Esa presión constante generaba un estrés enorme en administradores y empleados. El trabajo que realmente importa —gestionar, negociar, resolver, visitar comunidades— quedaba enterrado bajo una avalancha de mensajes repetitivos.</p>
            <p style={{fontSize:16,color:V.sub,lineHeight:1.95}}>De ahí nació AfincalIA. No como un producto tecnológico más, sino como una solución real a un problema que vi con mis propios ojos durante años. Con una sola obsesión: que el administrador recupere su tiempo y la tranquilidad de su despacho.</p>
          </div>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            {[["0€","sanciones AEPD"],["0","respuestas inventadas"],["100%","base legal verificada"],["RGPD","guardián 24/7"]].map(([n,l],i)=>(
              <div key={i} style={{background:V.alt,border:`1px solid ${V.borde}`,borderRadius:16,padding:"18px 22px",textAlign:"center"}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:26,color:i===3?V.azul:V.verde}}>{n}</div>
                <div style={{fontSize:12,color:V.mut,marginTop:5}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{padding:"96px 20px",background:"#0F2D1A",textAlign:"center"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(74,222,128,.1)",border:"1px solid rgba(74,222,128,.2)",borderRadius:100,padding:"6px 18px",marginBottom:24}}>
            <span>🛡️</span><span style={{fontSize:13,color:"#4ADE80",fontWeight:600}}>El único asistente con guardián RGPD integrado</span>
          </div>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,52px)",color:V.w,lineHeight:1.08,marginBottom:22}}>Contrata tu empleado<br/>digital ya</h2>
          <p style={{fontSize:17,color:"rgba(255,255,255,.6)",marginBottom:44,lineHeight:1.8}}>Configúralo en menos de una hora. Tus vecinos siguen usando WhatsApp como siempre. Tú dejas de atender mensajes y de preocuparte por el RGPD.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>setModal(true)} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"18px 44px",fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 8px 32px rgba(26,107,66,.4)"}}>Empezar 14 días gratis →</button>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:"transparent",color:V.w,border:"2px solid rgba(255,255,255,.3)",borderRadius:100,padding:"17px 32px",fontSize:16,fontWeight:700,textDecoration:"none"}}>
              <WASVG s={18}/>WhatsApp
            </a>
          </div>
          <p style={{marginTop:20,fontSize:13,color:"rgba(255,255,255,.4)"}}>Sin tarjeta · 14 días plan Profesional · Datos en Alemania (UE)</p>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

const CSS=`*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}body{overflow-x:hidden;-webkit-font-smoothing:antialiased;}@keyframes dot{0%,60%,100%{transform:scale(.7);opacity:.3}30%{transform:scale(1);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}.dnav{display:flex!important;align-items:center;gap:4px;}.burg{display:none!important;}.wa-float{position:fixed;bottom:24px;right:20px;z-index:900;display:flex;align-items:center;gap:10px;background:#25D366;color:#fff;border-radius:100px;padding:12px 20px;box-shadow:0 4px 20px rgba(37,211,102,.4);text-decoration:none;font-weight:700;font-size:14px;font-family:system-ui;}.wa-txt{display:inline;}@media(max-width:740px){.dnav{display:none!important;}.burg{display:flex!important;}.wa-txt{display:none;}.wa-float{padding:14px;}}button:focus{outline:none;}`;
