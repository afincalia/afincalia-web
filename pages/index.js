import { useState, useEffect, useRef } from "react";

const V={verde:"#1A6B42",osc:"#0C3521",pale:"#EBF4EE",borde:"#C8DFCF",rojo:"#C4362C",tx:"#111917",sub:"#3D4D44",mut:"#9CA3AF",bg:"#FAFAF8",alt:"#F2F5F2",w:"#fff",azul:"#1E4FA3",amarillo:"#D97706"};

const SYS=`Eres el asistente de una comunidad de vecinos en España. Responde SIEMPRE así:
TEXTO: [1-2 frases simples, sin tecnicismos]
LEY: [artículo corto o "ninguna"]
URL: [https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906 o "ninguna"]
TIPO: [URGENTE/ALTA/NORMAL/INFO]`;

const FB=[
  {k:["ascensor"],t:"El ascensor está registrado como urgente y el administrador ya ha sido avisado.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["gotera","fuga","agua","humedad"],t:"La gotera queda registrada. El administrador contactará con un técnico hoy.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["ruido","música","fiesta","molest"],t:"Las molestias están prohibidas por ley. Tu queja queda registrada.",l:"Art. 7.2 LPH — actividades molestas",tp:"ALTA"},
  {k:["cargador","eléctrico","vehículo"],t:"Puedes instalarlo avisando al administrador con 30 días de antelación, sin pedir permiso.",l:"Art. 17.4 LPH — cargadores eléctricos",tp:"NORMAL"},
  {k:["turístico","airbnb","vacacional"],t:"La comunidad puede limitarlo con el voto de 3 de cada 5 propietarios.",l:"Art. 17.12 LPH — pisos turísticos (reforma 2025)",tp:"INFO"},
  {k:["moroso","no paga","deuda","cuota"],t:"El administrador puede reclamar la deuda sin abogado si es menor de 2.000€.",l:"Art. 21 LPH — procedimiento monitorio",tp:"GESTIÓN"},
  {k:["obras","reforma"],t:"Las obras en tu vivienda hay que avisarlas al administrador antes de empezar.",l:"Art. 7.1 LPH — obras en viviendas",tp:"NORMAL"},
  {k:["junta","reunión","asamblea"],t:"La junta ordinaria debe celebrarse al menos una vez al año.",l:"Art. 16 LPH — convocatoria de junta",tp:"INFO"},
  {k:["luz","bombilla","portal"],t:"La iluminación del portal es zona común. Queda registrado.",l:"Art. 3 LPH — elementos comunes",tp:"NORMAL"},
];
function getFB(txt){const t=txt.toLowerCase();for(const f of FB)if(f.k.some(k=>t.includes(k)))return{texto:f.t,ley:f.l,url:"https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906",tipo:f.tp};return{texto:"Consulta registrada. Tu administrador te responderá en breve.",ley:null,url:null,tipo:"INFO"};}
function parseAI(raw){const g=k=>{const m=raw.match(new RegExp(k+":\\s*(.+)"));return m?.[1]?.trim()||null;};const texto=g("TEXTO"),ley=g("LEY"),url=g("URL"),tipo=g("TIPO");if(!texto)return null;return{texto,ley:ley==="ninguna"?null:ley,url:url==="ninguna"?null:url,tipo:tipo||"INFO"};}
const TC={URGENTE:"#DC2626",ALTA:V.amarillo,NORMAL:V.verde,GESTIÓN:V.azul,INFO:V.mut};
const TL={URGENTE:"🔴 Urgente",ALTA:"🟠 Alta prioridad",NORMAL:"🟢 Registrado",GESTIÓN:"🔵 En gestión",INFO:"ℹ️ Info"};

function Bubble({m,hora}){
  if(m.from==="user")return(<div style={{alignSelf:"flex-end",maxWidth:"84%"}}><div style={{background:"#DCF8C6",padding:"9px 13px",borderRadius:12,borderTopRightRadius:2,fontSize:14,lineHeight:1.55,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.08)"}}>{m.text}<div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:4}}>{hora} ✓✓</div></div></div>);
  return(<div style={{alignSelf:"flex-start",maxWidth:"90%"}}><div style={{background:V.w,padding:"9px 13px",borderRadius:12,borderTopLeftRadius:2,fontSize:14,lineHeight:1.65,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.08)"}}><div>{m.texto}</div>{m.ley&&(<a href={m.url||"#"} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:9,background:V.pale,border:`1px solid ${V.borde}`,borderRadius:100,padding:"4px 12px",fontSize:11,color:V.verde,textDecoration:"none",fontWeight:700}}>📖 {m.ley} →</a>)}{m.tipo&&<div style={{marginTop:7,fontSize:10,color:TC[m.tipo]||V.mut,fontWeight:700}}>{TL[m.tipo]||m.tipo}</div>}<div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:3}}>{hora}</div></div></div>);
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
    try{const hist=next.slice(1).map(m=>({role:m.from==="user"?"user":"assistant",content:m.from==="user"?m.text:m.texto}));const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:250,system:SYS,messages:hist})});if(res.ok){const d=await res.json();const raw=d.content?.[0]?.text||"";if(raw)r=parseAI(raw);}}catch(e){}
    if(!r)r=getFB(text);setMsgs(p=>[...p,{from:"ai",...r}]);setBusy(false);
  };
  return(
    <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.18)",maxWidth:360,width:"100%",margin:"0 auto"}}>
      <div style={{background:"#075E54",padding:"12px 16px",display:"flex",alignItems:"center",gap:11}}>
        <div style={{width:42,height:42,borderRadius:"50%",background:"#128C7E",display:"flex",alignItems:"center",justifyContent:"center",color:V.w,fontWeight:800,fontSize:18,flexShrink:0}}>A</div>
        <div><div style={{color:V.w,fontWeight:700,fontSize:14}}>AfincalIA</div><div style={{color:"rgba(255,255,255,.7)",fontSize:11,display:"flex",alignItems:"center",gap:5}}><span style={{width:7,height:7,borderRadius:"50%",background:"#4ADE80",display:"inline-block"}}/>Activo 24 horas</div></div>
      </div>
      <div style={{background:"#E5DDD5",padding:"12px 10px 8px",height:290,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
        {msgs.map((m,i)=><Bubble key={i} m={m} hora={hora}/>)}
        {busy&&<div style={{alignSelf:"flex-start",background:V.w,borderRadius:12,borderTopLeftRadius:2,padding:"11px 14px",display:"flex",gap:4}}>{[0,.15,.3].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#999",animation:`dot 1s ${d}s infinite`}}/>)}</div>}
        <div ref={endRef}/>
      </div>
      {msgs.length<=1&&(<div style={{background:"#F0F2F5",padding:"8px 10px",display:"flex",flexWrap:"wrap",gap:6}}>{["El ascensor no funciona","Gotera en el portal","¿Puedo instalar un cargador?","Mi vecino hace ruido"].map((s,i)=>(<button key={i} onClick={()=>send(s)} style={{background:V.w,border:"1px solid #ddd",borderRadius:100,padding:"5px 12px",fontSize:11,color:"#333",cursor:"pointer"}}>{s}</button>))}</div>)}
      <div style={{background:"#F0F2F5",padding:"9px 10px",display:"flex",gap:8,alignItems:"center"}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Escribe tu consulta..." disabled={busy} style={{flex:1,border:"none",borderRadius:22,padding:"10px 15px",fontSize:14,background:V.w,outline:"none"}}/>
        <button onClick={()=>send()} disabled={busy||!inp.trim()} style={{width:40,height:40,borderRadius:"50%",background:inp.trim()&&!busy?"#128C7E":"#ccc",border:"none",cursor:inp.trim()&&!busy?"pointer":"default",color:V.w,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>↑</button>
      </div>
    </div>
  );
}

function FormRegistro({plan,facturacion,onClose}){
  const precios={Inicio:facturacion==="anual"?"58€/mes":"69€/mes",Crecimiento:facturacion==="anual"?"124€/mes":"149€/mes",Despacho:facturacion==="anual"?"216€/mes":"259€/mes"};
  const [form,setForm]=useState({nombre:"",email:"",telefono:"",despacho:"",ciudad:"",comunidades:""});
  const [step,setStep]=useState("form");
  const up=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const ok=form.nombre&&form.email&&form.telefono&&form.despacho&&form.ciudad&&form.comunidades;
  const submit=async()=>{if(!ok)return;setStep("loading");await new Promise(r=>setTimeout(r,1500));setStep("success");};
  const inp={width:"100%",border:`1px solid ${V.borde}`,borderRadius:10,padding:"12px 14px",fontSize:15,outline:"none",background:V.bg,marginBottom:10,boxSizing:"border-box",fontFamily:"system-ui"};
  if(step==="loading")return(<div style={{textAlign:"center",padding:"60px 24px"}}><div style={{width:44,height:44,border:`3px solid ${V.pale}`,borderTop:`3px solid ${V.verde}`,borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 18px"}}/><p style={{color:V.sub,fontSize:15}}>Activando tu prueba gratis...</p></div>);
  if(step==="success")return(<div style={{textAlign:"center",padding:"44px 24px"}}><div style={{fontSize:56,marginBottom:18}}>🎉</div><h3 style={{fontFamily:"Georgia,serif",fontSize:24,marginBottom:12}}>¡Todo listo!</h3><p style={{fontSize:15,color:V.sub,lineHeight:1.75,marginBottom:8}}>En menos de 2 minutos recibirás un email en <strong>{form.email}</strong> con las instrucciones.</p><p style={{fontSize:13,color:V.mut,marginBottom:28}}>Revisa también la carpeta de spam.</p><button onClick={onClose} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"13px 32px",fontWeight:700,cursor:"pointer",fontSize:15}}>Perfecto ✓</button></div>);
  return(
    <div style={{padding:"28px 24px 24px"}}>
      <div style={{marginBottom:20}}>
        <h3 style={{fontFamily:"Georgia,serif",fontSize:21,marginBottom:8}}>Empieza gratis — 14 días</h3>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{background:V.pale,color:V.verde,borderRadius:100,padding:"3px 12px",fontSize:13,fontWeight:700}}>{plan}</span>
          <span style={{fontSize:13,color:V.mut}}>· {precios[plan]}</span>
          {facturacion==="anual"&&<span style={{background:"#DCFCE7",color:V.verde,borderRadius:100,padding:"2px 10px",fontSize:11,fontWeight:700}}>2 meses gratis</span>}
        </div>
      </div>
      <input style={inp} placeholder="Nombre y apellidos *" value={form.nombre} onChange={up("nombre")}/>
      <input style={inp} placeholder="Email profesional *" type="email" value={form.email} onChange={up("email")}/>
      <input style={inp} placeholder="Teléfono *" type="tel" value={form.telefono} onChange={up("telefono")}/>
      <input style={inp} placeholder="Nombre del despacho *" value={form.despacho} onChange={up("despacho")}/>
      <input style={inp} placeholder="Ciudad *" value={form.ciudad} onChange={up("ciudad")}/>
      <input style={inp} placeholder="Nº de comunidades que gestionas *" type="number" min="1" value={form.comunidades} onChange={up("comunidades")}/>
      <p style={{fontSize:11,color:V.mut,marginBottom:14,lineHeight:1.6}}>Al enviar aceptas nuestra política de privacidad. Datos tratados conforme al RGPD.</p>
      <button onClick={submit} disabled={!ok} style={{width:"100%",padding:"15px 0",borderRadius:100,border:"none",cursor:ok?"pointer":"default",fontWeight:700,fontSize:16,background:ok?V.verde:"#ccc",color:V.w,transition:"background .2s"}}>
        Comenzar mi prueba gratis →
      </button>
    </div>
  );
}

function Logo(){return(<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{display:"flex",flexDirection:"column",gap:2}}><div style={{display:"flex",gap:2}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div><div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div></div><span style={{fontFamily:"Georgia,serif",fontSize:20,color:V.tx}}>Afincal<span style={{color:V.verde}}>IA</span></span></div>);}

const PLANES=[
  {nom:"Inicio",mensual:"69",anual:"58",anualT:"696",sub:"Hasta 25 comunidades",fs:["WhatsApp IA 24/7","Panel de incidencias","Clasificación LPH automática","Protocolo morosidad básico","Soporte por email"]},
  {nom:"Crecimiento",mensual:"149",anual:"124",anualT:"1.488",sub:"Hasta 75 comunidades",dest:true,fs:["Todo lo del plan Inicio","Protocolo morosidad Art. 21 completo","Actas digitales","Alertas de vencimientos","Soporte prioritario"]},
  {nom:"Despacho",mensual:"259",anual:"216",anualT:"2.592",sub:"Hasta 150 comunidades",fs:["Todo lo del plan Crecimiento","Gestión multidespacho","Informes avanzados","Integración con tu software","Gestor de cuenta dedicado"]},
  {nom:"Enterprise",mensual:null,sub:"Más de 150 comunidades",fs:["Todo lo del plan Despacho","Precio a medida","SLA garantizado","Onboarding personalizado","Soporte 24/7 directo"]},
];

const BLOG=[
  {cat:"Novedades Legales",min:"5 min",tit:"Reforma LPH 2025: cómo frenar los pisos turísticos",desc:"La LO 1/2025 cambia las reglas: ya no hace falta unanimidad. Basta con 3 de cada 5 propietarios.",fecha:"8 abr 2025",body:[{h:"¿Qué cambia?",p:"Desde abril 2025, basta con 3/5 de propietarios para limitar pisos turísticos. Antes hacía falta unanimidad."},{h:"Cómo aplicarlo",p:"Incluir en orden del día, votar, notificar a afectados. El acuerdo es válido y ejecutivo."},{h:"Limitación",p:"No afecta a licencias ya concedidas. Solo a nuevos usos posteriores al acuerdo."}]},
  {cat:"Morosidad",min:"7 min",tit:"Vecino moroso: los 4 pasos legales",desc:"El Art. 21 LPH es tu herramienta. Sin abogado para deudas bajo 2.000€.",fecha:"15 mar 2025",body:[{h:"Paso 1",p:"Certifica la deuda en junta."},{h:"Paso 2",p:"Burofax con acuse de recibo."},{h:"Paso 3",p:"Procedimiento monitorio sin abogado para deudas bajo 2.000€."},{h:"Paso 4",p:"Ejecución y embargo si no hay oposición en 20 días."}]},
  {cat:"Instalaciones",min:"4 min",tit:"Cargador eléctrico: lo que dice la LPH",desc:"¿Permiso de la junta? ¿Quién paga? El Art. 17.4 LPH lo resuelve todo.",fecha:"2 feb 2025",body:[{h:"Notificación, no permiso",p:"Solo hay que avisar al administrador con 30 días. No hace falta autorización de la junta."},{h:"¿Quién paga?",p:"El propietario que lo instala asume todos los costes."}]},
  {cat:"Juntas y Actas",min:"5 min",tit:"Cómo convocar correctamente una junta",desc:"Plazos, notificaciones y quórum. Todo para que la junta sea válida.",fecha:"10 ene 2025",body:[{h:"Plazo mínimo",p:"6 días de antelación para la junta ordinaria."},{h:"Notificación",p:"En el domicilio designado por cada propietario."}]},
  {cat:"Gestión y Finanzas",min:"4 min",tit:"El fondo de reserva: obligatorio y muchas comunidades no lo tienen",desc:"El Art. 9 LPH obliga al 10% del presupuesto. Descubre los riesgos.",fecha:"20 dic 2024",body:[{h:"¿Es obligatorio?",p:"Sí. El 10% del presupuesto ordinario aprobado."},{h:"Riesgos",p:"Sin fondo, los propietarios responden solidariamente de las deudas."}]},
];

const FAQS=[
  {p:"¿Hay que cambiar el grupo de WhatsApp?",r:"No. Solo añades el número al grupo existente. Los vecinos no notan ningún cambio."},
  {p:"¿Es legal usar IA para atender vecinos?",r:"Sí. Es una herramienta de apoyo. La responsabilidad legal sigue siendo del administrador colegiado."},
  {p:"¿Dónde se guardan los datos?",r:"En servidores en Alemania, cumpliendo el RGPD y la LOPDGDD. Nunca cedemos datos a terceros."},
  {p:"¿Qué pasa si la IA no sabe responder?",r:"Dice exactamente: 'No tengo esa información. Tu administrador te responderá en breve.' Nunca inventa."},
  {p:"¿Funciona con Fynkus, Gesfincas u otros?",r:"Sí. No sustituye tu software — añade la atención automática a vecinos que esos programas no tienen."},
  {p:"¿Puedo cancelar cuando quiera?",r:"Sí, sin permanencia ni penalizaciones."},
  {p:"¿Los 14 días gratis incluyen todo?",r:"Sí. Plan Crecimiento completo sin tarjeta. Al terminar eliges o cancelas sin coste."},
  {p:"¿Cuánto tarda en estar operativo?",r:"Menos de una hora. Sin instalar nada, sin código."},
  {p:"¿Está actualizado con la reforma LPH 2025?",r:"Sí. Incluye la LO 1/2025 sobre pisos turísticos y el Real Decreto 1312/2024."},
  {p:"¿Qué pasa con consultas jurídicas complejas?",r:"Redirige al administrador. Nunca toma decisiones que no le corresponden."},
];

export default function App(){
  const [menu,setMenu]=useState(false);
  const [faq,setFaq]=useState(null);
  const [art,setArt]=useState(null);
  const [sc,setSc]=useState(false);
  const [modal,setModal]=useState(null);
  const [billing,setBilling]=useState("mensual");

  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:"instant"});
    const fn=()=>setSc(window.scrollY>20);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=id=>{setMenu(false);setTimeout(()=>{if(id==="inicio"){window.scrollTo({top:0,behavior:"smooth"});return;}const el=document.getElementById(id);if(el){const top=el.getBoundingClientRect().top+window.scrollY-64;window.scrollTo({top,behavior:"smooth"});}},60);};

  if(art!==null){
    const a=BLOG[art];
    return(
      <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,minHeight:"100vh"}}>
        <style>{CSS}</style>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${V.borde}`}}>
          <div style={{maxWidth:900,margin:"0 auto",padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}><Logo/><button onClick={()=>setArt(null)} style={{background:V.pale,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",fontWeight:700,fontSize:13,color:V.verde}}>← Blog</button></div>
        </nav>
        <div style={{background:V.osc,padding:"44px 20px 52px"}}>
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <span style={{display:"inline-block",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.8)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:18}}>{a.cat}</span>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,5vw,40px)",lineHeight:1.1,color:V.w,marginBottom:14}}>{a.tit}</h1>
            <p style={{fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:16}}>{a.desc}</p>
            <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>📅 {a.fecha} · ⏱ {a.min} de lectura</div>
          </div>
        </div>
        <article style={{maxWidth:700,margin:"0 auto",padding:"44px 20px 80px"}}>
          {a.body.map((s,i)=>(<div key={i} style={{marginBottom:32}}><h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(17px,3vw,22px)",color:V.tx,marginBottom:12}}>{s.h}</h2><p style={{fontSize:15,lineHeight:1.9,color:V.sub}}>{s.p}</p></div>))}
          <div style={{background:V.pale,borderRadius:16,padding:"28px 24px",border:`1px solid ${V.borde}`}}>
            <p style={{fontWeight:700,fontSize:16,marginBottom:8,color:V.verde}}>¿Quieres que AfincalIA lo gestione automáticamente?</p>
            <p style={{fontSize:14,color:V.sub,marginBottom:20,lineHeight:1.65}}>Prueba 14 días gratis. Sin tarjeta. En menos de una hora.</p>
            <button onClick={()=>setArt(null)} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"11px 26px",fontWeight:700,cursor:"pointer",fontSize:14}}>Ver planes →</button>
          </div>
        </article>
      </div>
    );
  }

  return(
    <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,color:V.tx,overflowX:"hidden"}}>
      <style>{CSS}</style>

      {/* MODAL */}
      {modal&&(
        <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.6)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>{if(e.target===e.currentTarget)setModal(null);}}>
          <div style={{background:V.w,borderRadius:20,width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",position:"relative",boxShadow:"0 24px 64px rgba(0,0,0,.28)"}}>
            <button onClick={()=>setModal(null)} style={{position:"absolute",top:14,right:14,background:V.alt,border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:20,color:V.sub,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}}>×</button>
            <FormRegistro plan={modal.plan} facturacion={modal.facturacion} onClose={()=>setModal(null)}/>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:sc?"rgba(250,250,248,.98)":"rgba(250,250,248,.94)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${sc?V.borde:"transparent"}`,transition:"all .3s"}}>
        <div style={{maxWidth:1000,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Logo/>
          <div className="dnav">
            {[["inicio","Inicio"],["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog"],["contacto","Contacto"]].map(([id,l])=>(
              <button key={id} onClick={()=>go(id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:V.sub,padding:"7px 12px",borderRadius:8}}>{l}</button>
            ))}
            <button onClick={()=>go("precios")} style={{marginLeft:10,background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"10px 24px",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:"0 2px 12px rgba(26,107,66,.25)"}}>Probar gratis</button>
          </div>
          <button className="burg" onClick={()=>setMenu(!menu)} style={{background:"none",border:"none",cursor:"pointer",padding:8,flexDirection:"column",gap:5}}>
            {[0,1,2].map(i=><span key={i} style={{display:"block",width:24,height:2,background:V.tx,borderRadius:2,transition:"all .25s",transform:menu&&i===0?"rotate(45deg) translate(5px,5px)":menu&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",opacity:menu&&i===1?0:1}}/>)}
          </button>
        </div>
        {menu&&(
          <div style={{background:V.w,borderTop:`1px solid ${V.borde}`,padding:"16px 20px 24px",boxShadow:"0 12px 32px rgba(0,0,0,.1)"}}>
            {[["inicio","Inicio"],["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog"],["contacto","Contacto"]].map(([id,l])=>(
              <button key={id} onClick={()=>go(id)} style={{display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",fontSize:17,color:V.tx,padding:"14px 0",borderBottom:`1px solid ${V.borde}`,textAlign:"left",fontWeight:500}}>{l}</button>
            ))}
            <button onClick={()=>go("precios")} style={{width:"100%",marginTop:16,background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"15px 0",fontSize:16,fontWeight:700,cursor:"pointer"}}>Probar gratis — 14 días</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="inicio" style={{padding:"60px 20px 72px",background:`linear-gradient(170deg,${V.pale} 0%,${V.bg} 60%)`}}>
        <div style={{maxWidth:960,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,background:V.pale,border:`1px solid ${V.borde}`,borderRadius:100,padding:"6px 18px",fontSize:12,fontWeight:700,color:V.verde,marginBottom:28,textTransform:"uppercase",letterSpacing:".09em"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#22C55E",display:"inline-block"}}/>Para administradores de fincas en España
          </div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,7vw,58px)",lineHeight:1.06,letterSpacing:"-.03em",marginBottom:26}}>
            Tu despacho tiene<br/><em style={{color:V.verde}}>un nuevo empleado digital</em>
          </h1>
          <p style={{fontSize:"clamp(16px,2.5vw,19px)",color:V.sub,lineHeight:1.8,maxWidth:560,margin:"0 auto 38px"}}>
            AfincalIA atiende a tus vecinos por WhatsApp las 24 horas, responde con la Ley de Propiedad Horizontal y te avisa solo cuando de verdad lo necesitas.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:18}}>
            <button onClick={()=>go("precios")} style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"17px 36px",fontSize:17,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 24px rgba(26,107,66,.35)"}}>Probar gratis 14 días</button>
            <button onClick={()=>go("demo")} style={{background:V.w,color:V.tx,border:`2px solid ${V.borde}`,borderRadius:100,padding:"15px 28px",fontSize:16,fontWeight:600,cursor:"pointer"}}>Ver la demo →</button>
          </div>
          <p style={{fontSize:13,color:V.mut}}>Sin tarjeta · Cancela cuando quieras · Operativo en menos de 1 hora</p>
          <div style={{display:"flex",justifyContent:"center",marginTop:48}}><Chat/></div>
        </div>
      </section>

      {/* STATS */}
      <div style={{background:V.osc,padding:"22px 20px"}}>
        <div style={{maxWidth:800,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:32,justifyContent:"center"}}>
          {[["+200","comunidades activas"],["98%","vecinos satisfechos"],["< 1h","para activarlo"],["24/7","atención automática"]].map(([n,l],i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:32,color:V.w,lineHeight:1}}>{n}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.4)",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{padding:"80px 20px",background:V.w}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Cómo funciona</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08}}>Del mensaje del vecino al caso cerrado</h2>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",flexWrap:"wrap",gap:0,marginBottom:56}}>
            {[["💬","Vecino escribe","En el WhatsApp de siempre"],["🤖","Responde al instante","Lenguaje claro, con la ley si aplica"],["🔔","Alerta si es urgente","El resto lo gestiona solo"],["✅","Caso cerrado","Con expediente e historial"]].map(([ic,t,d],i,arr)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start"}}>
                <div style={{textAlign:"center",width:160,padding:"0 8px"}}>
                  <div style={{width:64,height:64,borderRadius:"50%",background:V.pale,border:`2px solid ${V.borde}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 14px"}}>{ic}</div>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>{t}</div>
                  <div style={{fontSize:12,color:V.sub,lineHeight:1.55}}>{d}</div>
                </div>
                {i<arr.length-1&&<div style={{fontSize:20,color:V.borde,marginTop:20,flexShrink:0}}>→</div>}
              </div>
            ))}
          </div>
          <div style={{background:V.alt,borderRadius:20,padding:"32px 36px"}}>
            <p style={{fontWeight:700,fontSize:18,marginBottom:22}}>Lo que hace tu asistente cada día:</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"14px 32px"}}>
              {["Atiende incidencias 24h por WhatsApp","Clasifica urgencias según la LPH","Avisa a proveedores y hace seguimiento","Gestiona morosidad paso a paso","Recuerda plazos y vencimientos","Registra todo como expediente digital","Responde dudas legales en lenguaje claro","Aprende de cada comunidad"].map((t,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:15}}>
                  <span style={{color:V.verde,fontWeight:700,flexShrink:0}}>✓</span><span style={{color:V.sub}}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{padding:"80px 20px",background:V.osc}}>
        <div style={{maxWidth:920,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <p style={{fontSize:11,fontWeight:700,color:"#4ADE80",textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Resultados reales</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:V.w,lineHeight:1.08}}>Lo que dicen los administradores</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
            {[{n:"Carlos M.",d:"Adm. Hernández · Madrid",com:38,av:"CM",t:"Hemos bajado de 80 a 30 mensajes diarios. El tiempo que gano lo dedico a lo que de verdad importa."},
              {n:"Laura P.",d:"Gestiones del Sur · Sevilla",com:22,av:"LP",t:"Responde a las 2 de la mañana cuando hay una fuga. Yo descanso y los vecinos se sienten atendidos."},
              {n:"Javier R.",d:"Fincas Mediterráneo · Valencia",com:55,av:"JR",t:"Los vecinos ya no cuestionan mis decisiones porque ven que hay ley detrás, explicada de forma clara."},
              {n:"Ana T.",d:"Tu Comunidad · Barcelona",com:17,av:"AT",t:"En menos de una hora estaba funcionando en mis tres comunidades. Mucho más fácil de lo esperado."},
            ].map((t,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:"28px 24px"}}>
                <div style={{fontSize:18,color:"#FBBF24",marginBottom:16,letterSpacing:3}}>★★★★★</div>
                <p style={{fontSize:14,color:"rgba(255,255,255,.85)",lineHeight:1.8,marginBottom:24,fontStyle:"italic"}}>"{t.t}"</p>
                <div style={{display:"flex",alignItems:"center",gap:13}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:V.verde,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:V.w,fontSize:15,flexShrink:0}}>{t.av}</div>
                  <div><div style={{fontWeight:700,color:V.w,fontSize:15}}>{t.n}</div><div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{t.d}</div><div style={{fontSize:12,color:"#4ADE80",marginTop:3,fontWeight:700}}>{t.com} comunidades</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{padding:"80px 20px",background:V.alt}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Demo en vivo</p>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,marginBottom:16}}>Habla con el asistente ahora mismo</h2>
          <p style={{fontSize:16,color:V.sub,maxWidth:500,margin:"0 auto 44px",lineHeight:1.75}}>Escribe como si fueras un vecino real. Responde en lenguaje claro y muestra el artículo de la ley si aplica.</p>
          <div style={{display:"flex",justifyContent:"center"}}><Chat/></div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{padding:"80px 20px",background:V.w}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Precios</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,marginBottom:12}}>Elige el plan para tu despacho</h2>
            <p style={{fontSize:15,color:V.mut,marginBottom:28}}>14 días gratis · Sin tarjeta · Cancela cuando quieras</p>
            {/* TOGGLE */}
            <div style={{display:"inline-flex",background:V.alt,borderRadius:100,padding:4}}>
              <button onClick={()=>setBilling("mensual")} style={{background:billing==="mensual"?V.w:"transparent",color:billing==="mensual"?V.tx:V.mut,border:"none",borderRadius:100,padding:"9px 22px",fontSize:14,fontWeight:700,cursor:"pointer",transition:"all .2s",boxShadow:billing==="mensual"?"0 2px 8px rgba(0,0,0,.1)":"none"}}>Mensual</button>
              <button onClick={()=>setBilling("anual")} style={{background:billing==="anual"?V.w:"transparent",color:billing==="anual"?V.tx:V.mut,border:"none",borderRadius:100,padding:"9px 22px",fontSize:14,fontWeight:700,cursor:"pointer",transition:"all .2s",boxShadow:billing==="anual"?"0 2px 8px rgba(0,0,0,.1)":"none",display:"flex",alignItems:"center",gap:7}}>
                Anual <span style={{background:"#DCFCE7",color:V.verde,fontSize:11,fontWeight:800,borderRadius:100,padding:"2px 9px"}}>2 meses gratis</span>
              </button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
            {PLANES.map((p,i)=>(
              <div key={i} style={{background:p.dest?V.osc:V.w,border:`1px solid ${p.dest?V.osc:V.borde}`,borderRadius:20,padding:"28px 22px",position:"relative",transform:p.dest?"scale(1.03)":"none",boxShadow:p.dest?"0 20px 56px rgba(12,53,33,.22)":"none"}}>
                {p.dest&&<div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:V.azul,color:V.w,fontSize:11,fontWeight:800,padding:"5px 16px",borderRadius:100,whiteSpace:"nowrap"}}>MÁS ELEGIDO</div>}
                <div style={{fontSize:12,fontWeight:700,color:p.dest?"rgba(255,255,255,.4)":V.mut,marginBottom:8,textTransform:"uppercase",letterSpacing:".1em"}}>{p.nom}</div>
                {p.mensual?(
                  <>
                    <div style={{fontFamily:"Georgia,serif",fontSize:50,color:p.dest?V.w:V.tx,lineHeight:1,marginBottom:2}}>{billing==="anual"?p.anual:p.mensual}<span style={{fontSize:16,fontWeight:500}}>€</span></div>
                    <div style={{fontSize:12,color:p.dest?"rgba(255,255,255,.3)":V.mut,marginBottom:4}}>/mes{billing==="anual"?` · ${p.anualT}€/año`:" · facturación mensual"}</div>
                    {billing==="anual"&&<div style={{fontSize:11,color:V.verde,fontWeight:700,marginBottom:4}}>✓ 2 meses gratis</div>}
                  </>
                ):(
                  <div style={{fontFamily:"Georgia,serif",fontSize:28,color:V.tx,lineHeight:1.2,marginBottom:10,marginTop:8}}>A medida</div>
                )}
                <div style={{fontSize:13,color:p.dest?"rgba(255,255,255,.55)":V.sub,marginBottom:20,fontWeight:600}}>{p.sub}</div>
                <div style={{marginBottom:24}}>
                  {p.fs.map((f,j)=>(
                    <div key={j} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:9,fontSize:13.5}}>
                      <span style={{color:p.dest?"#4ADE80":V.verde,flexShrink:0,fontWeight:700,marginTop:1}}>✓</span>
                      <span style={{color:p.dest?"rgba(255,255,255,.75)":V.sub}}>{f}</span>
                    </div>
                  ))}
                </div>
                {p.mensual?(
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    <button onClick={()=>setModal({plan:p.nom,facturacion:billing})}
                      style={{width:"100%",padding:"12px 0",borderRadius:100,border:`2px solid ${p.dest?V.w:V.verde}`,cursor:"pointer",fontWeight:700,fontSize:14,background:"transparent",color:p.dest?V.w:V.verde}}>
                      Probar gratis 14 días
                    </button>
                    <button onClick={()=>alert("Abriendo Stripe checkout...")}
                      style={{width:"100%",padding:"12px 0",borderRadius:100,border:"none",cursor:"pointer",fontWeight:700,fontSize:14,background:p.dest?V.w:V.verde,color:p.dest?V.osc:V.w}}>
                      Contratar ahora →
                    </button>
                  </div>
                ):(
                  <button onClick={()=>alert("Redirigiendo a hola@afincalia.es")}
                    style={{width:"100%",padding:"13px 0",borderRadius:100,border:`2px solid ${V.verde}`,cursor:"pointer",fontWeight:700,fontSize:14,background:"transparent",color:V.verde}}>
                    Solicitar plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:"80px 20px",background:V.alt}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Preguntas frecuentes</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08}}>Lo que nos suelen preguntar</h2>
          </div>
          {FAQS.map((f,i)=>(
            <div key={i} style={{borderBottom:`1px solid ${V.borde}`}}>
              <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"19px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:15,fontWeight:600,color:V.tx,textAlign:"left",gap:16}}>
                {f.p}<span style={{fontSize:24,color:V.mut,flexShrink:0,transform:faq===i?"rotate(45deg)":"none",transition:"transform .22s",display:"inline-block",lineHeight:1}}>+</span>
              </button>
              {faq===i&&<div style={{paddingBottom:22,fontSize:15,color:V.sub,lineHeight:1.85}}>{f.r}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" style={{padding:"80px 20px",background:V.w}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Blog</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,marginBottom:14}}>Actualidad en Propiedad Horizontal</h2>
            <p style={{fontSize:16,color:V.sub,maxWidth:540,margin:"0 auto"}}>Artículos prácticos sobre LPH y gestión de comunidades. Publicamos cada semana.</p>
          </div>
          <div onClick={()=>setArt(0)} style={{border:`1px solid ${V.borde}`,borderRadius:20,overflow:"hidden",cursor:"pointer",marginBottom:24,transition:"box-shadow .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.12)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{background:`linear-gradient(135deg,${V.osc},${V.verde})`,padding:"40px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:200}}>
                <span style={{display:"inline-block",background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.9)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:16}}>{BLOG[0].cat} · Destacado</span>
                <h3 style={{fontFamily:"Georgia,serif",fontSize:"clamp(20px,3vw,32px)",color:V.w,lineHeight:1.15,marginBottom:12}}>{BLOG[0].tit}</h3>
                <p style={{fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.65}}>{BLOG[0].desc}</p>
              </div>
              <div style={{background:"rgba(255,255,255,.12)",borderRadius:100,padding:"13px 24px",color:V.w,fontWeight:700,fontSize:15,whiteSpace:"nowrap",border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>Leer →</div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20}}>
            {BLOG.slice(1).map((a,i)=>(
              <div key={i} onClick={()=>setArt(i+1)} style={{border:`1px solid ${V.borde}`,borderRadius:16,overflow:"hidden",cursor:"pointer",background:V.w,transition:"box-shadow .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.09)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{background:`linear-gradient(135deg,${V.pale},${V.alt})`,height:68,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontFamily:"Georgia,serif",fontSize:32,color:V.verde,opacity:.25}}>§</span>
                </div>
                <div style={{padding:"18px 20px 22px"}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                    <span style={{background:V.pale,color:V.verde,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:100,textTransform:"uppercase"}}>{a.cat}</span>
                    <span style={{fontSize:11,color:V.mut}}>{a.min}</span>
                  </div>
                  <h3 style={{fontFamily:"Georgia,serif",fontSize:17,lineHeight:1.3,marginBottom:10,color:V.tx}}>{a.tit}</h3>
                  <p style={{fontSize:13,color:V.sub,lineHeight:1.65,marginBottom:14}}>{a.desc}</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color:V.mut}}>📅 {a.fecha}</span>
                    <span style={{fontSize:13,color:V.verde,fontWeight:700}}>Leer →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section style={{padding:"80px 20px",background:V.alt}}>
        <div style={{maxWidth:720,margin:"0 auto",textAlign:"center"}}>
          <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Sobre AfincalIA</p>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",lineHeight:1.1,marginBottom:26}}>Nacimos en un despacho de administración</h2>
          <p style={{fontSize:16,color:V.sub,lineHeight:1.9,marginBottom:22}}>AfincalIA nació de ver cómo los mejores administradores dedicaban el 60% de su tiempo a responder mensajes repetitivos en WhatsApp, en lugar de trabajar en lo que de verdad aporta valor.</p>
          <p style={{fontSize:16,color:V.sub,lineHeight:1.9,marginBottom:40}}>Construimos AfincalIA con una obsesión: que nunca dé información incorrecta. Cada respuesta cita el artículo exacto o dice claramente que no sabe. Sin inventar. Sin improvisar.</p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            {[["100%","base legal verificada"],["0","respuestas inventadas"],["RGPD","servidores en la UE"]].map(([n,l],i)=>(
              <div key={i} style={{background:V.w,border:`1px solid ${V.borde}`,borderRadius:16,padding:"20px 30px",textAlign:"center"}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:30,color:V.verde}}>{n}</div>
                <div style={{fontSize:13,color:V.mut,marginTop:6}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" style={{padding:"88px 20px",background:V.verde,textAlign:"center"}}>
        <div style={{maxWidth:580,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,52px)",color:V.w,lineHeight:1.08,marginBottom:22}}>Activa tu asistente esta semana</h2>
          <p style={{fontSize:17,color:"rgba(255,255,255,.7)",marginBottom:44,lineHeight:1.8}}>Configúralo en menos de una hora. Tus vecinos siguen usando WhatsApp como siempre.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>go("precios")} style={{background:V.w,color:V.osc,border:"none",borderRadius:100,padding:"18px 44px",fontSize:17,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}>Probar gratis — 14 días</button>
            <button onClick={()=>go("precios")} style={{background:"transparent",color:V.w,border:"2px solid rgba(255,255,255,.4)",borderRadius:100,padding:"17px 32px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Ver planes →</button>
          </div>
          <p style={{marginTop:20,fontSize:13,color:"rgba(255,255,255,.35)"}}>Sin tarjeta · Datos en Europa · Soporte en español</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:V.osc,padding:"48px 20px 32px"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:40,marginBottom:48}}>
            <div><Logo/><p style={{marginTop:18,fontSize:14,color:"rgba(255,255,255,.3)",lineHeight:1.75}}>Asistente digital para administradores de fincas en España. LPH · RGPD · 24/7</p></div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Producto</p>
              {[["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog LPH"]].map(([id,l])=>(
                <div key={id} style={{marginBottom:12}}><button onClick={()=>go(id)} style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",fontSize:14,cursor:"pointer",padding:0}}>{l}</button></div>
              ))}
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Legal</p>
              {["Aviso legal","Política de privacidad","Política de cookies","Condiciones de uso"].map(l=>(<div key={l} style={{marginBottom:12,fontSize:14,color:"rgba(255,255,255,.4)"}}>{l}</div>))}
            </div>
            <div>
              <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Contacto</p>
              <div style={{marginBottom:12,fontSize:14,color:"rgba(255,255,255,.4)"}}>📞 614 557 419</div>
              <div style={{marginBottom:12,fontSize:14,color:"rgba(255,255,255,.4)"}}>✉️ hola@afincalia.es</div>
              <div style={{fontSize:14,color:"rgba(255,255,255,.4)"}}>🌐 afincalia.es</div>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:24,display:"flex",flexWrap:"wrap",gap:12,justifyContent:"space-between",fontSize:12,color:"rgba(255,255,255,.22)"}}>
            <p>©️ 2026 AfincalIA · No sustituye asesoramiento jurídico profesional.</p>
            <p>RGPD · LOPDGDD · LSSI-CE · Datos alojados en la UE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS=`
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{overflow-x:hidden;-webkit-font-smoothing:antialiased;}
  @keyframes dot{0%,60%,100%{transform:scale(.7);opacity:.3}30%{transform:scale(1);opacity:1}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .dnav{display:flex!important;align-items:center;gap:2px;}
  .burg{display:none!important;}
  @media(max-width:700px){.dnav{display:none!important;}.burg{display:flex!important;}}
  button:focus{outline:none;}
`;
