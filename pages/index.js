import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const C={verde:"#1A6B42",osc:"#0C3521",pale:"#EBF4EE",borde:"#C8DFCF",rojo:"#C4362C",tx:"#111917",sub:"#3D4D44",mut:"#9CA3AF",bg:"#FAFAF8",alt:"#F2F5F2",w:"#fff",azul:"#1E4FA3"};

const SYS=`Eres el asistente de una comunidad de vecinos. Responde SIEMPRE así:
TEXTO: [1-2 frases simples, sin tecnicismos]
LEY: [artículo corto o "ninguna"]
URL: [https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906 o "ninguna"]
TIPO: [URGENTE/ALTA/NORMAL/INFO]`;

const FB=[
  {k:["ascensor"],t:"El ascensor está registrado como urgente y el administrador ya ha sido avisado.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["gotera","fuga","agua","humedad"],t:"La gotera queda registrada. El administrador contactará con un técnico hoy.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["ruido","música","fiesta"],t:"Las molestias están prohibidas por ley. Tu queja queda registrada.",l:"Art. 7.2 LPH — actividades molestas",tp:"ALTA"},
  {k:["cargador","eléctrico","vehículo"],t:"Puedes instalarlo avisando al administrador con 30 días de antelación, sin pedir permiso.",l:"Art. 17.4 LPH — cargadores eléctricos",tp:"NORMAL"},
  {k:["turístico","airbnb","vacacional"],t:"La comunidad puede limitarlo con el voto de 3 de cada 5 propietarios.",l:"Art. 17.12 LPH — pisos turísticos",tp:"INFO"},
  {k:["moroso","no paga","deuda","cuota"],t:"El administrador puede reclamar la deuda sin abogado si es menor de 2.000€.",l:"Art. 21 LPH — procedimiento monitorio",tp:"GESTIÓN"},
  {k:["obras","reforma"],t:"Las obras en tu vivienda hay que avisarlas al administrador antes de empezar.",l:"Art. 7.1 LPH — obras en viviendas",tp:"NORMAL"},
  {k:["junta","reunión","asamblea"],t:"La junta ordinaria debe celebrarse al menos una vez al año.",l:"Art. 16 LPH — convocatoria de junta",tp:"INFO"},
  {k:["luz","bombilla","portal"],t:"La iluminación del portal es zona común. Queda registrado.",l:"Art. 3 LPH — elementos comunes",tp:"NORMAL"},
];

function getFB(txt){
  const t=txt.toLowerCase();
  for(const f of FB)if(f.k.some(k=>t.includes(k)))
    return{texto:f.t,ley:f.l,url:"https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906",tipo:f.tp};
  return{texto:"Consulta registrada. Tu administrador te responderá en breve.",ley:null,url:null,tipo:"INFO"};
}

function parseAI(raw){
  const g=k=>{const m=raw.match(new RegExp(k+":\\s*(.+)"));return m?.[1]?.trim()||null;};
  const texto=g("TEXTO"),ley=g("LEY"),url=g("URL"),tipo=g("TIPO");
  if(!texto)return null;
  return{texto,ley:ley==="ninguna"?null:ley,url:url==="ninguna"?null:url,tipo:tipo||"INFO"};
}

const TC={URGENTE:"#DC2626",ALTA:"#D97706",NORMAL:"#1A6B42",GESTIÓN:"#1E4FA3",INFO:"#9CA3AF"};
const TL={URGENTE:"🔴 Urgente",ALTA:"🟠 Alta prioridad",NORMAL:"🟢 Registrado",GESTIÓN:"🔵 En gestión",INFO:"ℹ️ Info"};

function Bubble({m,hora}){
  if(m.from==="user")return(
    <div style={{alignSelf:"flex-end",maxWidth:"85%"}}>
      <div style={{background:"#DCF8C6",padding:"9px 12px",borderRadius:10,borderTopRightRadius:2,fontSize:13.5,lineHeight:1.55,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.07)"}}>
        {m.text}<div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:3}}>{hora} ✓✓</div>
      </div>
    </div>
  );
  return(
    <div style={{alignSelf:"flex-start",maxWidth:"90%"}}>
      <div style={{background:"#fff",padding:"9px 12px",borderRadius:10,borderTopLeftRadius:2,fontSize:13.5,lineHeight:1.65,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.07)"}}>
        <div>{m.texto}</div>
        {m.ley&&<a href={m.url||"#"} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:8,background:"#EBF4EE",border:"1px solid #C8DFCF",borderRadius:100,padding:"4px 11px",fontSize:11,color:"#1A6B42",textDecoration:"none",fontWeight:600}}>📖 {m.ley} →</a>}
        {m.tipo&&<div style={{marginTop:6,fontSize:10,color:TC[m.tipo]||"#9CA3AF",fontWeight:600}}>{TL[m.tipo]||m.tipo}</div>}
        <div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:2}}>{hora}</div>
      </div>
    </div>
  );
}

function Chat(){
  const [msgs,setMsgs]=useState([{from:"ai",texto:"Hola, soy el asistente de tu comunidad. ¿En qué puedo ayudarte?",ley:null,tipo:null}]);
  const [inp,setInp]=useState("");
  const [busy,setBusy]=useState(false);
  const endRef=useRef(null);
  const hora=new Date().toLocaleTimeString("es",{hour:"2-digit",minute:"2-digit"});
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,busy]);

  const send=async txt=>{
    const text=(txt||inp).trim();if(!text||busy)return;
    setInp("");
    const next=[...msgs,{from:"user",text}];
    setMsgs(next);setBusy(true);
    let r=null;
    try{
      const hist=next.slice(1).map(m=>({role:m.from==="user"?"user":"assistant",content:m.from==="user"?m.text:m.texto}));
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:hist})});
      if(res.ok){const d=await res.json();if(d.text)r=parseAI(d.text);}
    }catch(e){}
    if(!r)r=getFB(text);
    setMsgs(p=>[...p,{from:"ai",...r}]);
    setBusy(false);
  };

  return(
    <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 28px 70px rgba(0,0,0,.16)",maxWidth:340,width:"100%",margin:"0 auto",fontFamily:"'Outfit',sans-serif"}}>
      <div style={{background:"#075E54",padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:"#128C7E",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:17}}>A</div>
        <div>
          <div style={{color:"#fff",fontWeight:700,fontSize:14}}>AfincalIA</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:11,display:"flex",alignItems:"center",gap:4}}><span style={{width:6,height:6,borderRadius:"50%",background:"#4ADE80",display:"inline-block"}}/> Activo 24 horas</div>
        </div>
      </div>
      <div style={{background:"#E5DDD5",padding:"10px",height:290,overflowY:"auto",display:"flex",flexDirection:"column",gap:7}}>
        {msgs.map((m,i)=><Bubble key={i} m={m} hora={hora}/>)}
        {busy&&<div style={{alignSelf:"flex-start",background:"#fff",borderRadius:10,borderTopLeftRadius:2,padding:"11px 14px",display:"flex",gap:4}}>
          {[0,.15,.3].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#999",animation:`dot 1s ${d}s infinite`}}/>)}
        </div>}
        <div ref={endRef}/>
      </div>
      {msgs.length<=1&&(
        <div style={{background:"#F0F2F5",padding:"8px 10px",display:"flex",flexWrap:"wrap",gap:5}}>
          {["El ascensor no funciona","Gotera en el portal","¿Puedo instalar un cargador?","Mi vecino hace ruido"].map((s,i)=>(
            <button key={i} onClick={()=>send(s)} style={{background:"#fff",border:"1px solid #ddd",borderRadius:100,padding:"5px 11px",fontSize:11,color:"#333",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{s}</button>
          ))}
        </div>
      )}
      <div style={{background:"#F0F2F5",padding:"8px 10px",display:"flex",gap:8,alignItems:"center"}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Escribe tu consulta..." disabled={busy}
          style={{flex:1,border:"none",borderRadius:20,padding:"9px 14px",fontSize:13,background:"#fff",outline:"none",fontFamily:"'Outfit',sans-serif"}}/>
        <button onClick={()=>send()} disabled={busy||!inp.trim()}
          style={{width:38,height:38,borderRadius:"50%",background:inp.trim()&&!busy?"#128C7E":"#ccc",border:"none",cursor:inp.trim()&&!busy?"pointer":"default",color:"#fff",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>↑</button>
      </div>
    </div>
  );
}

function Logo(){return(
  <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{display:"flex",flexDirection:"column",gap:2}}>
      <div style={{display:"flex",gap:2}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:"#C4362C"}}/>)}</div>
      <div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:"#C4362C"}}/>)}</div>
    </div>
    <span style={{fontFamily:"Georgia,serif",fontSize:20,color:"#111917"}}>Afincal<span style={{color:"#1A6B42"}}>IA</span></span>
  </div>
);}

const BLOG=[
  {fecha:"8 abr 2025",cat:"Novedades Legales",min:"5 min",tit:"Reforma LPH 2025: cómo frenar los pisos turísticos",desc:"La LO 1/2025 cambia las reglas: ya no hace falta unanimidad. Basta con 3 de cada 5 propietarios.",
   body:[{h:"¿Qué cambia?",p:"La LO 1/2025 modifica el Art. 17.12 LPH desde abril 2025: ya no hace falta unanimidad para limitar pisos turísticos. Basta con 3/5 de propietarios y cuotas."},{h:"¿Por qué importa?",p:"Antes cualquier propietario podía bloquear el acuerdo. La unanimidad era casi imposible. Ahora el equilibrio de poder en las juntas ha cambiado completamente."},{h:"Cómo aplicarlo",p:"Incluye el punto en el orden del día. Votad. Si se alcanzan los 3/5, el acuerdo es válido y ejecutivo. Notifica a los afectados por escrito."},{h:"Limitación clave",p:"El acuerdo no afecta a licencias turísticas ya concedidas. Solo aplica a nuevos usos posteriores a la aprobación."}]},
  {fecha:"15 mar 2025",cat:"Morosidad",min:"7 min",tit:"Vecino moroso: los 4 pasos legales",desc:"El Art. 21 LPH es tu herramienta. Sin abogado para deudas bajo 2.000€.",
   body:[{h:"Paso 1 — Certifica la deuda",p:"La junta aprueba la liquidación. Ese acuerdo firmado por administrador y presidente es tu título ejecutivo."},{h:"Paso 2 — Requerimiento",p:"Envía un burofax con acuse de recibo. Refuerza el expediente y en muchos casos evita el juzgado."},{h:"Paso 3 — Monitorio",p:"Para deudas menores de 2.000€ no necesitas abogado. Presentas el escrito en el juzgado del municipio."},{h:"Paso 4 — Ejecución",p:"Si no se opone en 20 días, el juzgado dicta auto de ejecución. Se pueden embargar cuentas y la vivienda."}]},
  {fecha:"2 feb 2025",cat:"Instalaciones",min:"4 min",tit:"Cargador eléctrico en comunidad: lo que dice la ley",desc:"¿Permiso de la junta? ¿Quién paga? El Art. 17.4 LPH lo resuelve.",
   body:[{h:"Notificación, no permiso",p:"El propietario puede instalar el cargador sin autorización previa. Solo tiene que notificarlo al administrador con 30 días de antelación."},{h:"¿Quién paga?",p:"El coste de instalación y consumo corre a cargo exclusivo del propietario. La comunidad no asume ningún gasto."},{h:"Instalación colectiva",p:"Si varios vecinos quieren instalar, la junta puede acordar una instalación colectiva con mayoría simple."},{h:"Limitaciones",p:"La instalación no puede dañar elementos comunes ni reducir plazas. Se recomienda exigir proyecto técnico previo."}]},
  {fecha:"10 ene 2025",cat:"Juntas y Actas",min:"5 min",tit:"Cómo convocar correctamente una junta",desc:"Plazos, notificaciones y quórum. Todo para que la junta sea válida.",
   body:[{h:"¿Cuándo convocar?",p:"La junta ordinaria al menos una vez al año para aprobar cuentas. El presidente puede convocar extraordinarias cuando sea necesario."},{h:"Plazos",p:"La convocatoria debe llegar con al menos 6 días de antelación para la ordinaria."},{h:"Cómo notificar",p:"En el domicilio designado por cada propietario. El tablón solo vale si no se conoce el domicilio."},{h:"Propietarios morosos",p:"Pueden asistir pero no tienen derecho a voto mientras mantengan la deuda."}]},
  {fecha:"20 dic 2024",cat:"Gestión y Finanzas",min:"4 min",tit:"El fondo de reserva: qué es y para qué sirve",desc:"Obligatorio al 10% del presupuesto. Muchas comunidades no lo tienen.",
   body:[{h:"¿Es obligatorio?",p:"Sí. El Art. 9 LPH obliga a mantener un fondo de reserva del 10% del presupuesto ordinario. No es opcional."},{h:"¿Para qué sirve?",p:"Para obras de conservación y reparación, y contratos de seguro del edificio."},{h:"¿Qué pasa si no hay fondo?",p:"Los propietarios responden solidariamente de las deudas. Complica la financiación de reparaciones urgentes."},{h:"Cómo regularizarlo",p:"Inclúyelo en el orden del día de la próxima junta. La dotación puede hacerse de forma progresiva."}]},
];

const FAQS=[
  {p:"¿Hay que cambiar el grupo de WhatsApp?",r:"No. Solo añades el número de AfincalIA al grupo existente. Los vecinos no notan ningún cambio."},
  {p:"¿Es legal usar IA para atender vecinos?",r:"Sí. Es una herramienta de apoyo. La responsabilidad legal sigue siendo del administrador."},
  {p:"¿Dónde se guardan los datos?",r:"En servidores en Alemania, cumpliendo el RGPD y la LOPDGDD. Nunca cedemos datos a terceros."},
  {p:"¿Qué pasa si la IA no sabe responder?",r:"Dice exactamente: 'No tengo esa información. Tu administrador te responderá en breve.' Nunca inventa."},
  {p:"¿Funciona con Fynkus, Gesfincas u otros?",r:"Sí. No sustituye tu software — añade la atención automática a vecinos que esos programas no tienen."},
  {p:"¿Puedo cancelar cuando quiera?",r:"Sí, sin permanencia ni penalizaciones."},
  {p:"¿Los 14 días gratis incluyen todo?",r:"Sí. Plan Profesional completo sin tarjeta. Al terminar eliges o cancelas sin coste."},
  {p:"¿Cuánto tarda en estar operativo?",r:"Menos de una hora. Sin instalar nada, sin código."},
  {p:"¿Está actualizado con la reforma LPH 2025?",r:"Sí. Incluye la LO 1/2025 sobre pisos turísticos y el Real Decreto 1312/2024."},
  {p:"¿Qué pasa con consultas jurídicas complejas?",r:"Redirige al administrador. Nunca toma decisiones que no le corresponden."},
];

const PLANES=[
  {nom:"Esencial",p:"49",sub:"Hasta 15 comunidades",fs:["WhatsApp IA 24/7","Panel de incidencias","Clasificación LPH automática","Soporte por email"]},
  {nom:"Profesional",p:"99",sub:"Hasta 50 comunidades",dest:true,fs:["Todo lo del Esencial","Protocolo morosidad Art. 21","Actas digitales","Alertas vencimientos","Soporte prioritario"]},
  {nom:"Despacho",p:"179",sub:"Sin límite",fs:["Todo lo del Profesional","Gestión multidespacho","Informes avanzados","Gestor de cuenta dedicado"]},
];

export default function Home(){
  const [menu,setMenu]=useState(false);
  const [faq,setFaq]=useState(null);
  const [art,setArt]=useState(null);
  const [sc,setSc]=useState(false);

  useEffect(()=>{
    const fn=()=>setSc(window.scrollY>20);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=id=>{
    setMenu(false);
    setTimeout(()=>{
      if(id==="inicio"){window.scrollTo({top:0,behavior:"smooth"});return;}
      const el=document.getElementById(id);
      if(el){const top=el.getBoundingClientRect().top+window.scrollY-64;window.scrollTo({top,behavior:"smooth"});}
    },60);
  };

  if(art!==null){
    const a=BLOG[art];
    return(
      <div style={{fontFamily:"system-ui,sans-serif",background:"#FAFAF8",minHeight:"100vh"}}>
        <style>{CSS}</style>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,.97)",backdropFilter:"blur(12px)",borderBottom:"1px solid #DDE5DF"}}>
          <div style={{maxWidth:900,margin:"0 auto",padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Logo/>
            <button onClick={()=>setArt(null)} style={{background:"#EBF4EE",border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",fontFamily:"system-ui",fontWeight:700,fontSize:13,color:"#1A6B42"}}>← Blog</button>
          </div>
        </nav>
        <div style={{background:"#0C3521",padding:"44px 20px 52px"}}>
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <span style={{display:"inline-block",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.8)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:18}}>{a.cat}</span>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,5vw,42px)",lineHeight:1.1,color:"#fff",marginBottom:14}}>{a.tit}</h1>
            <p style={{fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:16}}>{a.desc}</p>
            <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>📅 {a.fecha} · ⏱ {a.min} de lectura</div>
          </div>
        </div>
        <article style={{maxWidth:700,margin:"0 auto",padding:"44px 20px 80px"}}>
          {a.body.map((s,i)=>(
            <div key={i} style={{marginBottom:32}}>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(18px,3vw,24px)",color:"#111917",marginBottom:12}}>{s.h}</h2>
              <p style={{fontSize:15,lineHeight:1.9,color:"#3D4D44"}}>{s.p}</p>
            </div>
          ))}
          <div style={{background:"#EBF4EE",borderRadius:16,padding:"28px 24px",border:"1px solid #C8DFCF",marginTop:8}}>
            <p style={{fontWeight:700,fontSize:16,marginBottom:8,color:"#1A6B42"}}>¿Quieres que AfincalIA lo gestione automáticamente?</p>
            <p style={{fontSize:14,color:"#3D4D44",marginBottom:20,lineHeight:1.65}}>Prueba 14 días gratis. Sin tarjeta. En menos de una hora.</p>
            <button onClick={()=>setArt(null)} style={{background:"#1A6B42",color:"#fff",border:"none",borderRadius:100,padding:"11px 26px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui",fontSize:14}}>Ver planes →</button>
          </div>
        </article>
      </div>
    );
  }

  return(
    <>
      <Head>
        <title>AfincalIA — Asistente IA para administradores de fincas</title>
        <meta name="description" content="AfincalIA atiende a tus vecinos por WhatsApp 24h, responde con la LPH y te avisa solo cuando lo necesitas. Prueba gratis 14 días."/>
        <meta name="keywords" content="administrador fincas IA, whatsapp comunidad propietarios, asistente LPH, gestión comunidades inteligencia artificial"/>
        <meta property="og:title" content="AfincalIA — Tu asistente digital para comunidades de propietarios"/>
        <meta property="og:description" content="Atiende a tus vecinos 24h por WhatsApp con IA. Respuestas basadas en la LPH. Prueba gratis."/>
        <meta property="og:url" content="https://afincalia.es"/>
        <link rel="canonical" href="https://afincalia.es"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div style={{fontFamily:"system-ui,sans-serif",background:"#FAFAF8",color:"#111917",overflowX:"hidden"}}>
        <style>{CSS}</style>

        {/* NAV */}
        <nav style={{position:"sticky",top:0,zIndex:100,background:sc?"rgba(250,250,248,.97)":"rgba(250,250,248,.93)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${sc?"#DDE5DF":"transparent"}`,transition:"all .3s"}}>
          <div style={{maxWidth:960,margin:"0 auto",padding:"0 20px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Logo/>
            <div className="dnav">
              {[["inicio","Inicio"],["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog"],["contacto","Contacto"]].map(([id,l])=>(
                <button key={id} onClick={()=>go(id)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"system-ui",fontSize:14,color:"#3D4D44",padding:"6px 11px",borderRadius:8}}>{l}</button>
              ))}
              <button onClick={()=>go("precios")} style={{marginLeft:8,background:"#1A6B42",color:"#fff",border:"none",borderRadius:100,padding:"9px 22px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>Probar gratis</button>
            </div>
            <button className="burg" onClick={()=>setMenu(!menu)} style={{background:"none",border:"none",cursor:"pointer",padding:8,flexDirection:"column",gap:5}}>
              {[0,1,2].map(i=><span key={i} style={{display:"block",width:22,height:2,background:"#111917",borderRadius:2,transition:"all .2s",transform:menu&&i===0?"rotate(45deg) translate(5px,5px)":menu&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",opacity:menu&&i===1?0:1}}/>)}
            </button>
          </div>
          {menu&&(
            <div style={{background:"#fff",borderTop:"1px solid #DDE5DF",padding:"12px 20px 20px",boxShadow:"0 8px 24px rgba(0,0,0,.08)"}}>
              {[["inicio","Inicio"],["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog"],["contacto","Contacto"]].map(([id,l])=>(
                <button key={id} onClick={()=>go(id)} style={{display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",fontFamily:"system-ui",fontSize:16,color:"#111917",padding:"13px 0",borderBottom:"1px solid #DDE5DF",textAlign:"left",fontWeight:500}}>{l}</button>
              ))}
              <button onClick={()=>go("precios")} style={{width:"100%",marginTop:14,background:"#1A6B42",color:"#fff",border:"none",borderRadius:100,padding:"14px 0",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>Probar gratis — 14 días</button>
            </div>
          )}
        </nav>

        {/* HERO */}
        <section id="inicio" style={{padding:"56px 20px 68px",background:"linear-gradient(170deg,#EBF4EE 0%,#FAFAF8 65%)"}}>
          <div style={{maxWidth:920,margin:"0 auto",textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#EBF4EE",border:"1px solid #C8DFCF",borderRadius:100,padding:"5px 16px",fontSize:12,fontWeight:700,color:"#1A6B42",marginBottom:24,textTransform:"uppercase",letterSpacing:".08em"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#22C55E",display:"inline-block"}}/> Para administradores de fincas en España
            </div>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(34px,7vw,58px)",lineHeight:1.07,letterSpacing:"-.025em",marginBottom:24}}>
              Tu despacho tiene<br/><em style={{color:"#1A6B42"}}>un nuevo empleado digital</em>
            </h1>
            <p style={{fontSize:"clamp(15px,2.5vw,18px)",color:"#3D4D44",lineHeight:1.8,maxWidth:540,margin:"0 auto 36px"}}>
              AfincalIA atiende a tus vecinos por WhatsApp las 24 horas, responde con la Ley de Propiedad Horizontal y te avisa solo cuando de verdad lo necesitas.
            </p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
              <button onClick={()=>go("precios")} style={{background:"#1A6B42",color:"#fff",border:"none",borderRadius:100,padding:"16px 34px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 4px 20px rgba(26,107,66,.3)"}}>Conoce a tu asistente</button>
              <button onClick={()=>go("demo")} style={{background:"#fff",color:"#111917",border:"1.5px solid #DDE5DF",borderRadius:100,padding:"15px 28px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"system-ui"}}>Ver la demo →</button>
            </div>
            <p style={{fontSize:12,color:"#9CA3AF"}}>Sin tarjeta · 14 días gratis · Operativo en menos de 1 hora</p>
            <div style={{display:"flex",justifyContent:"center",marginTop:44}}><Chat/></div>
          </div>
        </section>

        {/* STATS */}
        <div style={{background:"#0C3521",padding:"20px"}}>
          <div style={{maxWidth:760,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:28,justifyContent:"center"}}>
            {[["+200","comunidades"],["98%","satisfacción"],["<1h","para activarlo"],["24/7","atención"]].map(([n,l],i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:30,color:"#fff",lineHeight:1}}>{n}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" style={{padding:"72px 20px",background:"#fff"}}>
          <div style={{maxWidth:820,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <p style={{fontSize:11,fontWeight:700,color:"#1A6B42",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Cómo funciona</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,42px)",lineHeight:1.1,letterSpacing:"-.02em"}}>Del mensaje del vecino al caso cerrado</h2>
            </div>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",flexWrap:"wrap",gap:0,marginBottom:52}}>
              {[["💬","Vecino escribe","En el WhatsApp de siempre"],["🤖","Responde en segundos","Lenguaje claro, sin tecnicismos"],["🔔","Alerta si es urgente","El resto lo gestiona solo"],["✅","Caso cerrado","Con historial y seguimiento"]].map(([ic,t,d],i,arr)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start"}}>
                  <div style={{textAlign:"center",width:155,padding:"0 6px"}}>
                    <div style={{width:58,height:58,borderRadius:"50%",background:"#EBF4EE",border:"2px solid #C8DFCF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 12px"}}>{ic}</div>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:5}}>{t}</div>
                    <div style={{fontSize:12,color:"#3D4D44",lineHeight:1.5}}>{d}</div>
                  </div>
                  {i<arr.length-1&&<div style={{fontSize:18,color:"#C8DFCF",marginTop:18,flexShrink:0}}>→</div>}
                </div>
              ))}
            </div>
            <div style={{background:"#F2F5F2",borderRadius:18,padding:"28px 32px"}}>
              <p style={{fontWeight:700,fontSize:17,marginBottom:20}}>Lo que hace cada día:</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"12px 28px"}}>
                {["Atiende incidencias 24h por WhatsApp","Clasifica urgencias automáticamente","Avisa a proveedores y hace seguimiento","Gestiona morosidad paso a paso","Recuerda plazos y vencimientos","Registra todo como expediente","Responde dudas legales en lenguaje claro","Se adapta a cada comunidad"].map((t,i)=>(
                  <div key={i} style={{display:"flex",gap:9,fontSize:14}}>
                    <span style={{color:"#1A6B42",fontWeight:700,flexShrink:0}}>✓</span>
                    <span style={{color:"#3D4D44"}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section style={{padding:"72px 20px",background:"#0C3521"}}>
          <div style={{maxWidth:880,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:44}}>
              <p style={{fontSize:11,fontWeight:700,color:"#4ADE80",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Testimonios reales</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,42px)",color:"#fff",lineHeight:1.1}}>Lo que dicen los administradores</h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18}}>
              {[{n:"Carlos M.",d:"Adm. Hernández · Madrid",com:38,av:"CM",t:"Hemos bajado de 80 a 30 mensajes diarios. El tiempo que gano lo dedico a lo que importa."},
                {n:"Laura P.",d:"Gestiones del Sur · Sevilla",com:22,av:"LP",t:"Responde a las 2 de la mañana cuando hay una fuga. Yo descanso y los vecinos se sienten atendidos."},
                {n:"Javier R.",d:"Fincas Mediterráneo · Valencia",com:55,av:"JR",t:"Los vecinos ya no cuestionan las decisiones porque ven la ley detrás, explicada de forma clara."},
                {n:"Ana T.",d:"Tu Comunidad · Barcelona",com:17,av:"AT",t:"En menos de una hora estaba funcionando en mis tres comunidades. Mucho más fácil de lo esperado."},
              ].map((t,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:18,padding:"26px 24px"}}>
                  <div style={{fontSize:16,color:"#FBBF24",marginBottom:14,letterSpacing:2}}>★★★★★</div>
                  <p style={{fontSize:14,color:"rgba(255,255,255,.82)",lineHeight:1.78,marginBottom:22,fontStyle:"italic"}}>"{t.t}"</p>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:42,height:42,borderRadius:"50%",background:"#1A6B42",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:14,flexShrink:0}}>{t.av}</div>
                    <div>
                      <div style={{fontWeight:700,color:"#fff",fontSize:14}}>{t.n}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.42)"}}>{t.d}</div>
                      <div style={{fontSize:11,color:"#4ADE80",marginTop:2,fontWeight:600}}>{t.com} comunidades</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" style={{padding:"72px 20px",background:"#F2F5F2"}}>
          <div style={{maxWidth:780,margin:"0 auto",textAlign:"center"}}>
            <p style={{fontSize:11,fontWeight:700,color:"#1A6B42",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Demo en vivo</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,42px)",lineHeight:1.1,marginBottom:14}}>Habla con el asistente ahora mismo</h2>
            <p style={{fontSize:15,color:"#3D4D44",maxWidth:480,margin:"0 auto 40px",lineHeight:1.75}}>Escribe como si fueras un vecino real. Responde en lenguaje claro y muestra el artículo de la ley si aplica.</p>
            <div style={{display:"flex",justifyContent:"center"}}><Chat/></div>
          </div>
        </section>

        {/* PRECIOS */}
        <section id="precios" style={{padding:"72px 20px",background:"#fff"}}>
          <div style={{maxWidth:920,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <p style={{fontSize:11,fontWeight:700,color:"#1A6B42",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Precios</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,42px)",lineHeight:1.1,marginBottom:10}}>Elige el plan para tu despacho</h2>
              <p style={{fontSize:14,color:"#9CA3AF"}}>Prueba con 1 comunidad gratis · Sin tarjeta · Cancela cuando quieras</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(265px,1fr))",gap:18}}>
              {PLANES.map((p,i)=>(
                <div key={i} style={{background:p.dest?"#0C3521":"#fff",border:`1px solid ${p.dest?"#0C3521":"#DDE5DF"}`,borderRadius:20,padding:"30px 26px",position:"relative",transform:p.dest?"scale(1.03)":"none",boxShadow:p.dest?"0 20px 56px rgba(12,53,33,.25)":"none"}}>
                  {p.dest&&<div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:"#1E4FA3",color:"#fff",fontSize:11,fontWeight:800,padding:"5px 16px",borderRadius:100,whiteSpace:"nowrap"}}>MÁS ELEGIDO</div>}
                  <div style={{fontSize:12,fontWeight:700,color:p.dest?"rgba(255,255,255,.4)":"#9CA3AF",marginBottom:4,textTransform:"uppercase",letterSpacing:".08em"}}>{p.nom}</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:52,color:p.dest?"#fff":"#111917",lineHeight:1,marginBottom:4}}>{p.p}<span style={{fontSize:17,fontFamily:"system-ui",fontWeight:500}}>€</span></div>
                  <div style={{fontSize:12,color:p.dest?"rgba(255,255,255,.3)":"#9CA3AF",marginBottom:6}}>/mes · facturación mensual</div>
                  <div style={{fontSize:13,color:p.dest?"rgba(255,255,255,.5)":"#3D4D44",marginBottom:24,fontWeight:500}}>{p.sub}</div>
                  <div style={{marginBottom:28}}>
                    {p.fs.map((f,j)=>(
                      <div key={j} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:11,fontSize:14}}>
                        <span style={{color:p.dest?"#4ADE80":"#1A6B42",flexShrink:0,fontWeight:700}}>✓</span>
                        <span style={{color:p.dest?"rgba(255,255,255,.75)":"#3D4D44"}}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>go("contacto")} style={{width:"100%",padding:"14px 0",borderRadius:100,border:"none",cursor:"pointer",fontFamily:"system-ui",fontWeight:700,fontSize:14,background:p.dest?"#fff":"#1A6B42",color:p.dest?"#0C3521":"#fff"}}>
                    {p.nom==="Despacho"?"Contactar":"Empezar gratis"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{padding:"72px 20px",background:"#F2F5F2"}}>
          <div style={{maxWidth:640,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:44}}>
              <p style={{fontSize:11,fontWeight:700,color:"#1A6B42",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Preguntas frecuentes</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,42px)",lineHeight:1.1}}>Lo que nos suelen preguntar</h2>
            </div>
            {FAQS.map((f,i)=>(
              <div key={i} style={{borderBottom:"1px solid #DDE5DF"}}>
                <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"18px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"system-ui",fontSize:15,fontWeight:600,color:"#111917",textAlign:"left",gap:16}}>
                  {f.p}
                  <span style={{fontSize:22,color:"#9CA3AF",flexShrink:0,transform:faq===i?"rotate(45deg)":"none",transition:"transform .22s",display:"inline-block"}}>+</span>
                </button>
                {faq===i&&<div style={{paddingBottom:20,fontSize:14,color:"#3D4D44",lineHeight:1.85}}>{f.r}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" style={{padding:"72px 20px",background:"#fff"}}>
          <div style={{maxWidth:940,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <p style={{fontSize:11,fontWeight:700,color:"#1A6B42",textTransform:"uppercase",letterSpacing:".1em",marginBottom:10}}>Blog</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,42px)",lineHeight:1.1,marginBottom:12}}>Actualidad en Propiedad Horizontal</h2>
              <p style={{fontSize:15,color:"#3D4D44",maxWidth:500,margin:"0 auto"}}>Artículos sobre LPH, jurisprudencia y gestión práctica. Publicamos cada semana.</p>
            </div>
            <div onClick={()=>setArt(0)} style={{border:"1px solid #DDE5DF",borderRadius:20,overflow:"hidden",cursor:"pointer",marginBottom:24,transition:"box-shadow .2s"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,.1)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{background:"linear-gradient(135deg,#0C3521,#1A6B42)",padding:"36px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
                <div style={{flex:1}}>
                  <span style={{display:"inline-block",background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.9)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:14}}>{BLOG[0].cat} · Destacado</span>
                  <h3 style={{fontFamily:"Georgia,serif",fontSize:"clamp(20px,3vw,30px)",color:"#fff",lineHeight:1.2,marginBottom:10}}>{BLOG[0].tit}</h3>
                  <p style={{fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.65}}>{BLOG[0].desc}</p>
                </div>
                <div style={{background:"rgba(255,255,255,.12)",borderRadius:100,padding:"12px 22px",color:"#fff",fontWeight:700,fontSize:14,whiteSpace:"nowrap",border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>Leer →</div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
              {BLOG.slice(1).map((a,i)=>(
                <div key={i} onClick={()=>setArt(i+1)} style={{border:"1px solid #DDE5DF",borderRadius:16,overflow:"hidden",cursor:"pointer",background:"#fff",transition:"box-shadow .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.09)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  <div style={{background:"linear-gradient(135deg,#EBF4EE,#F2F5F2)",height:64,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontFamily:"Georgia,serif",fontSize:30,color:"#1A6B42",opacity:.3}}>§</span>
                  </div>
                  <div style={{padding:"18px 20px 22px"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                      <span style={{background:"#EBF4EE",color:"#1A6B42",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:100,textTransform:"uppercase"}}>{a.cat}</span>
                      <span style={{fontSize:11,color:"#9CA3AF"}}>{a.min}</span>
                    </div>
                    <h3 style={{fontFamily:"Georgia,serif",fontSize:17,lineHeight:1.3,marginBottom:10,color:"#111917"}}>{a.tit}</h3>
                    <p style={{fontSize:13,color:"#3D4D44",lineHeight:1.65,marginBottom:14}}>{a.desc}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:12,color:"#9CA3AF"}}>📅 {a.fecha}</span>
                      <span style={{fontSize:13,color:"#1A6B42",fontWeight:700}}>Leer →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contacto" style={{padding:"80px 20px",background:"#1A6B42",textAlign:"center"}}>
          <div style={{maxWidth:560,margin:"0 auto"}}>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(30px,5vw,48px)",color:"#fff",lineHeight:1.1,marginBottom:20}}>Activa tu asistente esta semana</h2>
            <p style={{fontSize:16,color:"rgba(255,255,255,.7)",marginBottom:40,lineHeight:1.8}}>Configúralo en menos de una hora. Tus vecinos siguen usando WhatsApp como siempre.</p>
            <button onClick={()=>go("precios")} style={{background:"#fff",color:"#0C3521",border:"none",borderRadius:100,padding:"17px 44px",fontSize:17,fontWeight:800,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 8px 32px rgba(0,0,0,.15)"}}>Probar gratis — 14 días</button>
            <p style={{marginTop:18,fontSize:12,color:"rgba(255,255,255,.35)"}}>Sin tarjeta · Datos en Europa · Soporte en español</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{background:"#0C3521",padding:"44px 20px 30px"}}>
          <div style={{maxWidth:940,margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:36,marginBottom:44}}>
              <div>
                <Logo/>
                <p style={{marginTop:16,fontSize:13,color:"rgba(255,255,255,.3)",lineHeight:1.75}}>Asistente digital para administradores de fincas en España. LPH · RGPD · 24/7</p>
              </div>
              <div>
                <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:16,fontSize:12,textTransform:"uppercase",letterSpacing:".08em"}}>Producto</p>
                {[["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog LPH"]].map(([id,l])=>(
                  <div key={id} style={{marginBottom:11}}>
                    <button onClick={()=>go(id)} style={{background:"none",border:"none",color:"rgba(255,255,255,.35)",fontSize:13,cursor:"pointer",fontFamily:"system-ui",padding:0}}>{l}</button>
                  </div>
                ))}
              </div>
              <div>
                <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:16,fontSize:12,textTransform:"uppercase",letterSpacing:".08em"}}>Legal</p>
                {["Aviso legal","Política de privacidad","Política de cookies","Condiciones de uso"].map(l=>(
                  <div key={l} style={{marginBottom:11,fontSize:13,color:"rgba(255,255,255,.35)"}}>{l}</div>
                ))}
              </div>
              <div>
                <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:16,fontSize:12,textTransform:"uppercase",letterSpacing:".08em"}}>Contacto</p>
                <div style={{marginBottom:11,fontSize:13,color:"rgba(255,255,255,.35)"}}>📞 614 557 419</div>
                <div style={{marginBottom:11,fontSize:13,color:"rgba(255,255,255,.35)"}}>✉️ hola@afincalia.es</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>🌐 afincalia.es</div>
              </div>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:22,display:"flex",flexWrap:"wrap",gap:10,justifyContent:"space-between",fontSize:12,color:"rgba(255,255,255,.25)"}}>
              <p>©️ 2026 AfincalIA · No sustituye asesoramiento jurídico profesional.</p>
              <p>RGPD · LOPDGDD · LSSI-CE</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const CSS=`
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{overflow-x:hidden;}
  @keyframes dot{0%,60%,100%{transform:scale(.7);opacity:.3}30%{transform:scale(1);opacity:1}}
  .dnav{display:flex!important;align-items:center;}
  .burg{display:none!important;}
  @media(max-width:680px){.dnav{display:none!important;}.burg{display:flex!important;}}
`;
