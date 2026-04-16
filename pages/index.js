import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const V = {
  verde:"#1A6B42", osc:"#0C3521", pale:"#EBF4EE", borde:"#C8DFCF",
  rojo:"#C4362C", tx:"#111917", sub:"#3D4D44", mut:"#9CA3AF",
  bg:"#FAFAF8", alt:"#F2F5F2", w:"#fff", azul:"#1E4FA3"
};

// ── FALLBACKS CHAT ────────────────────────────────────────
const FB=[
  {k:["ascensor"],t:"El ascensor está registrado como urgente y el administrador ya ha sido avisado.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["gotera","fuga","agua","humedad","filtra"],t:"La gotera queda registrada. El administrador contactará con un técnico hoy.",l:"Art. 10.1 LPH — reparaciones urgentes",tp:"URGENTE"},
  {k:["ruido","música","fiesta","molest","barullo"],t:"Las molestias están prohibidas por ley. Tu queja queda registrada y el administrador actuará.",l:"Art. 7.2 LPH — actividades molestas",tp:"ALTA"},
  {k:["cargador","eléctrico","vehículo","coche eléctr"],t:"Puedes instalarlo avisando al administrador con 30 días de antelación, sin pedir permiso a la junta.",l:"Art. 17.4 LPH — cargadores eléctricos",tp:"NORMAL"},
  {k:["turístico","airbnb","vacacional","tourist"],t:"La comunidad puede limitarlo con el voto de 3 de cada 5 propietarios en junta.",l:"Art. 17.12 LPH — pisos turísticos (reforma 2025)",tp:"INFO"},
  {k:["moroso","no paga","deuda","cuota","pago"],t:"El administrador puede reclamar la deuda legalmente sin abogado si es menor de 2.000€.",l:"Art. 21 LPH — procedimiento monitorio",tp:"GESTIÓN"},
  {k:["obras","reforma","obra"],t:"Las obras en tu vivienda hay que avisarlas al administrador antes de empezar.",l:"Art. 7.1 LPH — obras en viviendas",tp:"NORMAL"},
  {k:["junta","reunión","asamblea","convocator"],t:"La junta ordinaria debe celebrarse al menos una vez al año con 6 días de antelación.",l:"Art. 16 LPH — convocatoria de junta",tp:"INFO"},
  {k:["luz","bombilla","portal","iluminación","oscuro"],t:"La iluminación del portal es zona común. Queda registrado y el administrador lo gestiona.",l:"Art. 3 LPH — elementos comunes",tp:"NORMAL"},
  {k:["parking","garaje","plaza","aparcamiento"],t:"Queda registrada tu consulta. El administrador te responderá en breve.",l:"Art. 3 LPH — elementos privativos",tp:"NORMAL"},
  {k:["basura","limpieza","suciedad","contenedor"],t:"La limpieza de zonas comunes es responsabilidad de la comunidad. Queda registrada la incidencia.",l:"Art. 9 LPH — obligaciones del propietario",tp:"NORMAL"},
  {k:["antena","terraza","azotea","techo"],t:"Las azoteas son elementos comunes de uso privativo. El administrador gestionará tu consulta.",l:"Art. 3 LPH — elementos comunes",tp:"NORMAL"},
];

function getFB(txt){
  const t=txt.toLowerCase();
  for(const f of FB) if(f.k.some(k=>t.includes(k)))
    return{texto:f.t,ley:f.l,url:"https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906",tipo:f.tp};
  return{texto:"Consulta registrada. Tu administrador la revisará y te responderá en breve.",ley:null,url:null,tipo:"INFO"};
}

function parseAI(raw){
  const g=k=>{const m=raw.match(new RegExp(k+":\\s*(.+)"));return m?.[1]?.trim()||null;};
  const texto=g("TEXTO"),ley=g("LEY"),url=g("URL"),tipo=g("TIPO");
  if(!texto) return null;
  return{texto,ley:ley==="ninguna"?null:ley,url:url==="ninguna"?null:url,tipo:tipo||"INFO"};
}

const TC={URGENTE:"#DC2626",ALTA:"#D97706",NORMAL:V.verde,GESTIÓN:V.azul,INFO:V.mut};
const TL={URGENTE:"🔴 Urgente — registrado",ALTA:"🟠 Alta prioridad",NORMAL:"🟢 Registrado",GESTIÓN:"🔵 En gestión",INFO:"ℹ️ Info"};

// ── BURBUJA ───────────────────────────────────────────────
function Bubble({m,hora}){
  if(m.from==="user") return(
    <div style={{alignSelf:"flex-end",maxWidth:"82%"}}>
      <div style={{background:"#DCF8C6",padding:"9px 13px",borderRadius:12,borderTopRightRadius:2,fontSize:14,lineHeight:1.5,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.08)"}}>
        {m.text}
        <div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:4}}>{hora} ✓✓</div>
      </div>
    </div>
  );
  return(
    <div style={{alignSelf:"flex-start",maxWidth:"88%"}}>
      <div style={{background:V.w,padding:"9px 13px",borderRadius:12,borderTopLeftRadius:2,fontSize:14,lineHeight:1.65,color:"#111",boxShadow:"0 1px 2px rgba(0,0,0,.08)"}}>
        <div>{m.texto}</div>
        {m.ley&&(
          <a href={m.url||"#"} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:9,background:V.pale,border:`1px solid ${V.borde}`,borderRadius:100,padding:"4px 12px",fontSize:11,color:V.verde,textDecoration:"none",fontWeight:700}}>
            📖 {m.ley} →
          </a>
        )}
        {m.tipo&&<div style={{marginTop:7,fontSize:10,color:TC[m.tipo]||V.mut,fontWeight:700}}>{TL[m.tipo]||m.tipo}</div>}
        <div style={{fontSize:10,color:"#999",textAlign:"right",marginTop:3}}>{hora}</div>
      </div>
    </div>
  );
}

// ── CHAT ──────────────────────────────────────────────────
function Chat(){
  const [msgs,setMsgs]=useState([{from:"ai",texto:"Hola, soy el asistente de tu comunidad. ¿En qué puedo ayudarte?",ley:null,tipo:null}]);
  const [inp,setInp]=useState("");
  const [busy,setBusy]=useState(false);
  const endRef=useRef(null);
  const hora=new Date().toLocaleTimeString("es",{hour:"2-digit",minute:"2-digit"});
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,busy]);

  const send=async txt=>{
    const text=(txt||inp).trim();
    if(!text||busy) return;
    setInp("");
    const next=[...msgs,{from:"user",text}];
    setMsgs(next); setBusy(true);
    let r=null;
    try{
      const hist=next.slice(1).map(m=>({
        role:m.from==="user"?"user":"assistant",
        content:m.from==="user"?m.text:m.texto
      }));
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:hist})});
      if(res.ok){const d=await res.json();if(d.text)r=parseAI(d.text);}
    }catch(e){}
    if(!r) r=getFB(text);
    setMsgs(p=>[...p,{from:"ai",...r}]);
    setBusy(false);
  };

  const sugs=["El ascensor no funciona","Gotera en el portal","¿Puedo instalar un cargador?","Mi vecino hace ruido"];

  return(
    <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,.18)",maxWidth:360,width:"100%",margin:"0 auto"}}>
      {/* Header */}
      <div style={{background:"#075E54",padding:"13px 16px",display:"flex",alignItems:"center",gap:11}}>
        <div style={{width:42,height:42,borderRadius:"50%",background:"#128C7E",display:"flex",alignItems:"center",justifyContent:"center",color:V.w,fontWeight:800,fontSize:18,flexShrink:0}}>A</div>
        <div>
          <div style={{color:V.w,fontWeight:700,fontSize:15}}>AfincalIA</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:11,display:"flex",alignItems:"center",gap:5}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#4ADE80",display:"inline-block"}}/>
            Activo 24 horas · respuesta inmediata
          </div>
        </div>
      </div>
      {/* Mensajes */}
      <div style={{background:"#E5DDD5",padding:"12px 10px 8px",height:300,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
        {msgs.map((m,i)=><Bubble key={i} m={m} hora={hora}/>)}
        {busy&&(
          <div style={{alignSelf:"flex-start",background:V.w,borderRadius:12,borderTopLeftRadius:2,padding:"11px 14px",display:"flex",gap:4}}>
            {[0,.15,.3].map((d,i)=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#999",animation:`dot 1s ${d}s infinite`}}/>)}
          </div>
        )}
        <div ref={endRef}/>
      </div>
      {/* Sugerencias */}
      {msgs.length<=1&&(
        <div style={{background:"#F0F2F5",padding:"8px 10px",display:"flex",flexWrap:"wrap",gap:6}}>
          {sugs.map((s,i)=>(
            <button key={i} onClick={()=>send(s)}
              style={{background:V.w,border:"1px solid #ddd",borderRadius:100,padding:"5px 12px",fontSize:11,color:"#333",cursor:"pointer",fontFamily:"system-ui,sans-serif"}}>
              {s}
            </button>
          ))}
        </div>
      )}
      {/* Input */}
      <div style={{background:"#F0F2F5",padding:"9px 10px",display:"flex",gap:8,alignItems:"center"}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Escribe tu consulta..." disabled={busy}
          style={{flex:1,border:"none",borderRadius:22,padding:"10px 15px",fontSize:14,background:V.w,outline:"none",fontFamily:"system-ui,sans-serif"}}/>
        <button onClick={()=>send()} disabled={busy||!inp.trim()}
          style={{width:40,height:40,borderRadius:"50%",background:inp.trim()&&!busy?"#128C7E":"#ccc",border:"none",cursor:inp.trim()&&!busy?"pointer":"default",color:V.w,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          ↑
        </button>
      </div>
    </div>
  );
}

// ── LOGO ──────────────────────────────────────────────────
function Logo(){
  return(
    <div style={{display:"flex",alignItems:"center",gap:9}}>
      <div style={{display:"flex",flexDirection:"column",gap:2.5}}>
        <div style={{display:"flex",gap:2.5}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div>
        <div style={{display:"flex",gap:2.5}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div>
      </div>
      <span style={{fontFamily:"Georgia,serif",fontSize:21,color:V.tx,letterSpacing:"-.01em"}}>
        Afincal<span style={{color:V.verde}}>IA</span>
      </span>
    </div>
  );
}

// ── DATOS ─────────────────────────────────────────────────
const PLANES=[
  {
    nom:"Inicio",p:"69",sub:"Hasta 25 comunidades",
    tag:null,
    fs:["WhatsApp IA 24/7","Panel de incidencias","Clasificación LPH automática","Protocolo morosidad básico","Soporte por email"],
    color:V.w
  },
  {
    nom:"Crecimiento",p:"139",sub:"De 25 a 75 comunidades",
    tag:"MÁS ELEGIDO",
    fs:["Todo lo del plan Inicio","Protocolo morosidad Art. 21 completo","Actas digitales","Alertas de vencimientos","Soporte prioritario"],
    color:V.osc
  },
  {
    nom:"Despacho",p:"220",sub:"De 75 a 150 comunidades",
    tag:null,
    fs:["Todo lo del plan Crecimiento","Gestión multidespacho","Informes avanzados","Integración con tu software","Gestor de cuenta dedicado"],
    color:V.w
  },
  {
    nom:"Enterprise",p:null,sub:"Más de 150 comunidades",
    tag:null,
    fs:["Todo lo del plan Despacho","Precio a medida","SLA garantizado","Onboarding personalizado","Soporte 24/7 directo"],
    color:V.alt
  },
];

const BLOG=[
  {fecha:"8 abr 2025",cat:"Novedades Legales",min:"5 min",
   tit:"Reforma LPH 2025: cómo frenar los pisos turísticos",
   desc:"La LO 1/2025 cambia las reglas: ya no hace falta unanimidad. Basta con 3 de cada 5 propietarios.",
   body:[
     {h:"¿Qué cambia con la LO 1/2025?",p:"Desde abril de 2025, ya no hace falta unanimidad para limitar o prohibir los pisos turísticos en un edificio. Basta con que 3 de cada 5 propietarios voten a favor en junta."},
     {h:"¿Por qué es un cambio histórico?",p:"Antes, cualquier propietario con un piso turístico podía bloquear el acuerdo votando en contra. La unanimidad era casi imposible en edificios grandes. Eso ha cambiado completamente."},
     {h:"Cómo aplicarlo paso a paso",p:"Incluye el punto en el orden del día. Debatid y votad. Si se alcanzan los 3/5 de propietarios y cuotas de participación, el acuerdo es válido y ejecutivo. Notifica a los afectados por escrito."},
     {h:"Limitación importante",p:"El acuerdo no puede aplicarse retroactivamente a licencias turísticas ya concedidas. Solo afecta a nuevos usos o solicitudes posteriores a la aprobación del acuerdo."},
   ]},
  {fecha:"15 mar 2025",cat:"Morosidad",min:"7 min",
   tit:"Vecino moroso: los 4 pasos legales que debes seguir",
   desc:"El Art. 21 LPH es tu herramienta. Sin abogado para deudas bajo 2.000€. Guía completa del monitorio.",
   body:[
     {h:"Paso 1 — Certifica la deuda en junta",p:"La junta de propietarios debe aprobar la liquidación de la deuda. Ese acuerdo, certificado por administrador y presidente, es tu título ejecutivo. Sin este paso no puedes continuar."},
     {h:"Paso 2 — Requerimiento previo",p:"Envía un burofax con acuse de recibo al propietario moroso. No es obligatorio legalmente, pero refuerza el expediente y en muchos casos resuelve la situación sin juzgado."},
     {h:"Paso 3 — Procedimiento monitorio",p:"Para deudas inferiores a 2.000€ no necesitas abogado ni procurador. Presentas el escrito en el juzgado de primera instancia del municipio del inmueble."},
     {h:"Paso 4 — Ejecución",p:"Si el deudor no se opone en 20 días, el juzgado dicta auto de ejecución. Se pueden embargar cuentas bancarias, salarios y hasta la vivienda."},
   ]},
  {fecha:"2 feb 2025",cat:"Instalaciones",min:"4 min",
   tit:"Cargador eléctrico en comunidad: lo que dice la LPH",
   desc:"¿Necesitas permiso de la junta? ¿Quién paga? El Art. 17.4 LPH resuelve todas las dudas.",
   body:[
     {h:"La regla básica: notificación, no permiso",p:"El propietario puede instalar el punto de recarga sin autorización previa. Solo tiene que notificarlo al administrador con al menos 30 días de antelación. No es una solicitud, es una notificación."},
     {h:"¿Quién paga la instalación y el consumo?",p:"El coste corre a cargo exclusivo del propietario que la solicita. La comunidad no está obligada a asumir ningún gasto."},
     {h:"Instalación colectiva: la opción más eficiente",p:"Si varios vecinos quieren instalar, la junta puede acordar una instalación colectiva con mayoría simple. Suele ser más económica para todos."},
     {h:"Limitaciones que debes vigilar",p:"La instalación no puede dañar elementos comunes ni reducir plazas de garaje. Es recomendable exigir un proyecto técnico previo."},
   ]},
  {fecha:"10 ene 2025",cat:"Juntas y Actas",min:"5 min",
   tit:"Cómo convocar correctamente una junta de propietarios",
   desc:"Plazos, formas de notificación y quórum. Todo lo que necesitas para que la junta sea válida.",
   body:[
     {h:"¿Cuándo hay que convocar?",p:"La junta ordinaria debe celebrarse al menos una vez al año para aprobar cuentas y presupuesto. El presidente puede convocar juntas extraordinarias cuando lo considere necesario."},
     {h:"Plazos de convocatoria",p:"La convocatoria debe llegar a todos los propietarios con al menos 6 días de antelación para la ordinaria. Para extraordinarias no hay plazo mínimo legal, aunque se recomienda respetar varios días de margen."},
     {h:"Cómo notificar correctamente",p:"Debe hacerse en el domicilio designado por cada propietario. El tablón de anuncios solo es válido si no se conoce el domicilio del propietario."},
     {h:"Propietarios morosos",p:"Pueden asistir a la junta pero no tienen derecho a voto mientras mantengan la deuda. Esta restricción es automática, no requiere acuerdo previo."},
   ]},
  {fecha:"20 dic 2024",cat:"Gestión y Finanzas",min:"4 min",
   tit:"El fondo de reserva: obligatorio y muchas comunidades no lo tienen",
   desc:"El Art. 9 LPH obliga al 10% del presupuesto. Descubre los riesgos de no tenerlo y cómo regularizarlo.",
   body:[
     {h:"¿Es realmente obligatorio?",p:"Sí. El artículo 9 de la LPH obliga a todas las comunidades a mantener un fondo de reserva equivalente al menos al 10% del último presupuesto ordinario aprobado."},
     {h:"¿Para qué se puede usar?",p:"Exclusivamente para obras de conservación y reparación, y para contratos de seguro del edificio. No puede usarse para gastos ordinarios del día a día."},
     {h:"¿Qué pasa si la comunidad no tiene fondo?",p:"Los propietarios responden solidariamente de las deudas frente a terceros. Además, en caso de inspección técnica con deficiencias graves, la falta de fondo complica enormemente la financiación."},
     {h:"Cómo regularizarlo",p:"Inclúyelo en el orden del día de la próxima junta. La dotación puede hacerse de forma progresiva si la comunidad tiene dificultades económicas."},
   ]},
];

const FAQS=[
  {p:"¿Hay que cambiar el grupo de WhatsApp?",r:"No. Solo añades el número de AfincalIA al grupo que ya tienen los vecinos. Ellos no notan ningún cambio."},
  {p:"¿Es legal usar IA para atender a los vecinos?",r:"Sí. AfincalIA es una herramienta de apoyo. La responsabilidad legal sigue siendo del administrador colegiado. Cada respuesta incluye el aviso de que es orientativa."},
  {p:"¿Dónde se guardan los datos de los vecinos?",r:"En servidores en Alemania, cumpliendo el RGPD y la LOPDGDD. Nunca cedemos datos a terceros. Puedes solicitar el contrato de encargado del tratamiento cuando quieras."},
  {p:"¿Qué pasa si la IA no sabe responder algo?",r:"Dice exactamente: 'No tengo esa información. Tu administrador te responderá en breve.' Nunca inventa artículos ni da información incorrecta."},
  {p:"¿Funciona con Fynkus, Gesfincas u otros programas?",r:"Sí. AfincalIA no sustituye tu software actual — añade la capa de atención automática a vecinos que esos programas no tienen. Son complementarios."},
  {p:"¿Puedo cancelar cuando quiera?",r:"Sí, sin permanencia ni penalizaciones. Cancelas desde el panel y el servicio continúa hasta el final del período pagado."},
  {p:"¿Los 14 días gratis incluyen todo?",r:"Sí. Acceso completo al plan Crecimiento durante 14 días, sin tarjeta de crédito. Al terminar, eliges plan o cancelas sin coste."},
  {p:"¿Cuánto tarda en estar operativo?",r:"Menos de una hora. Configuración guiada paso a paso. Sin instalar nada, sin código."},
  {p:"¿Está actualizado con la reforma LPH de 2025?",r:"Sí. Incluye la LO 1/2025 de abril 2025 sobre pisos turísticos (mayoría 3/5) y el Real Decreto 1312/2024 sobre registros turísticos."},
  {p:"¿Qué pasa con consultas jurídicas complejas?",r:"La IA redirige directamente al administrador. Nunca toma decisiones que no le corresponden. Tiene límites muy claros y estrictos."},
];

// ── APP ───────────────────────────────────────────────────
export default function Home(){
  const [menu,setMenu]=useState(false);
  const [faq,setFaq]=useState(null);
  const [art,setArt]=useState(null);
  const [sc,setSc]=useState(false);

  useEffect(()=>{
    if(typeof window!=="undefined"){
      window.scrollTo({top:0,left:0,behavior:"instant"});
    }
    const fn=()=>setSc(window.scrollY>20);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=id=>{
    setMenu(false);
    setTimeout(()=>{
      if(id==="inicio"){window.scrollTo({top:0,behavior:"smooth"});return;}
      const el=document.getElementById(id);
      if(el){
        const top=el.getBoundingClientRect().top+window.scrollY-64;
        window.scrollTo({top,behavior:"smooth"});
      }
    },60);
  };

  // Vista artículo
  if(art!==null){
    const a=BLOG[art];
    return(
      <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,minHeight:"100vh"}}>
        <style>{CSS}</style>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${V.borde}`}}>
          <div style={{maxWidth:900,margin:"0 auto",padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Logo/>
            <button onClick={()=>setArt(null)}
              style={{background:V.pale,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",fontFamily:"system-ui",fontWeight:700,fontSize:13,color:V.verde}}>
              ← Blog
            </button>
          </div>
        </nav>
        <div style={{background:V.osc,padding:"44px 20px 52px"}}>
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <span style={{display:"inline-block",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.8)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:18}}>
              {a.cat}
            </span>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,5vw,40px)",lineHeight:1.1,color:V.w,marginBottom:14}}>{a.tit}</h1>
            <p style={{fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:16}}>{a.desc}</p>
            <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>📅 {a.fecha} · ⏱ {a.min} de lectura</div>
          </div>
        </div>
        <article style={{maxWidth:700,margin:"0 auto",padding:"44px 20px 80px"}}>
          {a.body.map((s,i)=>(
            <div key={i} style={{marginBottom:32}}>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(17px,3vw,22px)",color:V.tx,marginBottom:12}}>{s.h}</h2>
              <p style={{fontSize:15,lineHeight:1.9,color:V.sub}}>{s.p}</p>
            </div>
          ))}
          <div style={{background:V.pale,borderRadius:16,padding:"28px 24px",border:`1px solid ${V.borde}`,marginTop:8}}>
            <p style={{fontWeight:700,fontSize:16,marginBottom:8,color:V.verde}}>¿Quieres que AfincalIA lo gestione automáticamente?</p>
            <p style={{fontSize:14,color:V.sub,marginBottom:20,lineHeight:1.65}}>Prueba 14 días gratis. Sin tarjeta. Operativo en menos de una hora.</p>
            <button onClick={()=>setArt(null)}
              style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"11px 26px",fontWeight:700,cursor:"pointer",fontFamily:"system-ui",fontSize:14}}>
              Ver planes →
            </button>
          </div>
        </article>
      </div>
    );
  }

  return(
    <>
      <Head>
        <title>AfincalIA — Asistente IA para administradores de fincas en España</title>
        <meta name="description" content="AfincalIA atiende a tus vecinos por WhatsApp 24h, responde con la LPH y te avisa solo cuando lo necesitas. El asistente digital para administradores de fincas. Prueba gratis 14 días."/>
        <meta name="keywords" content="administrador fincas inteligencia artificial, asistente whatsapp comunidad propietarios, software administracion fincas IA, LPH automatizada, gestión comunidades whatsapp"/>
        <meta property="og:title" content="AfincalIA — Tu asistente digital para comunidades de propietarios"/>
        <meta property="og:description" content="Atiende a tus vecinos 24h por WhatsApp con IA. Respuestas basadas en la LPH. Prueba 14 días gratis sin tarjeta."/>
        <meta property="og:url" content="https://afincalia.es"/>
        <meta property="og:type" content="website"/>
        <link rel="canonical" href="https://afincalia.es"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
      </Head>

      <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,color:V.tx,overflowX:"hidden"}}>
        <style>{CSS}</style>

        {/* ── NAV ── */}
        <nav style={{position:"sticky",top:0,zIndex:100,background:sc?"rgba(250,250,248,.98)":"rgba(250,250,248,.94)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${sc?V.borde:"transparent"}`,transition:"all .3s"}}>
          <div style={{maxWidth:1000,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Logo/>
            <div className="dnav">
              {[["inicio","Inicio"],["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog"],["contacto","Contacto"]].map(([id,l])=>(
                <button key={id} onClick={()=>go(id)}
                  style={{background:"none",border:"none",cursor:"pointer",fontFamily:"system-ui",fontSize:14,color:V.sub,padding:"7px 12px",borderRadius:8,transition:"color .15s"}}>
                  {l}
                </button>
              ))}
              <button onClick={()=>go("precios")}
                style={{marginLeft:10,background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"10px 24px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 2px 12px rgba(26,107,66,.25)"}}>
                Probar gratis
              </button>
            </div>
            <button className="burg" onClick={()=>setMenu(!menu)}
              style={{background:"none",border:"none",cursor:"pointer",padding:8,flexDirection:"column",gap:5}}>
              {[0,1,2].map(i=>(
                <span key={i} style={{display:"block",width:24,height:2,background:V.tx,borderRadius:2,transition:"all .25s",
                  transform:menu&&i===0?"rotate(45deg) translate(5px,5px)":menu&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",
                  opacity:menu&&i===1?0:1}}/>
              ))}
            </button>
          </div>
          {menu&&(
            <div style={{background:V.w,borderTop:`1px solid ${V.borde}`,padding:"16px 20px 24px",boxShadow:"0 12px 32px rgba(0,0,0,.1)"}}>
              {[["inicio","Inicio"],["como-funciona","Cómo funciona"],["demo","Demo"],["precios","Precios"],["blog","Blog"],["contacto","Contacto"]].map(([id,l])=>(
                <button key={id} onClick={()=>go(id)}
                  style={{display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",fontFamily:"system-ui",fontSize:17,color:V.tx,padding:"14px 0",borderBottom:`1px solid ${V.borde}`,textAlign:"left",fontWeight:500}}>
                  {l}
                </button>
              ))}
              <button onClick={()=>go("precios")}
                style={{width:"100%",marginTop:16,background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"15px 0",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"system-ui"}}>
                Probar gratis — 14 días
              </button>
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section id="inicio" style={{padding:"60px 20px 72px",background:`linear-gradient(170deg,${V.pale} 0%,${V.bg} 60%)`}}>
          <div style={{maxWidth:960,margin:"0 auto",textAlign:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,background:V.pale,border:`1px solid ${V.borde}`,borderRadius:100,padding:"6px 18px",fontSize:12,fontWeight:700,color:V.verde,marginBottom:28,textTransform:"uppercase",letterSpacing:".09em"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#22C55E",display:"inline-block"}}/>
              Asistente para administradores de fincas en España
            </div>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,7vw,60px)",lineHeight:1.06,letterSpacing:"-.03em",marginBottom:26,color:V.tx}}>
              Tu despacho tiene<br/>
              <em style={{color:V.verde,fontStyle:"italic"}}>un nuevo empleado digital</em>
            </h1>
            <p style={{fontSize:"clamp(16px,2.5vw,19px)",color:V.sub,lineHeight:1.8,maxWidth:560,margin:"0 auto 38px"}}>
              AfincalIA atiende a tus vecinos por WhatsApp las 24 horas, responde con la Ley de Propiedad Horizontal y te avisa solo cuando de verdad lo necesitas.
            </p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:18}}>
              <button onClick={()=>go("precios")}
                style={{background:V.verde,color:V.w,border:"none",borderRadius:100,padding:"17px 36px",fontSize:17,fontWeight:700,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 6px 24px rgba(26,107,66,.35)"}}>
                Conoce a tu asistente
              </button>
              <button onClick={()=>go("demo")}
                style={{background:V.w,color:V.tx,border:`2px solid ${V.borde}`,borderRadius:100,padding:"15px 28px",fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"system-ui"}}>
                Ver la demo →
              </button>
            </div>
            <p style={{fontSize:13,color:V.mut}}>Sin tarjeta · 14 días gratis · Operativo en menos de 1 hora</p>
            <div style={{display:"flex",justifyContent:"center",marginTop:48}}>
              <Chat/>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
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

        {/* ── CÓMO FUNCIONA ── */}
        <section id="como-funciona" style={{padding:"80px 20px",background:V.w}}>
          <div style={{maxWidth:860,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:52}}>
              <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Cómo funciona</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,letterSpacing:"-.02em"}}>Del mensaje del vecino al caso cerrado</h2>
            </div>
            {/* Flujo */}
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",flexWrap:"wrap",gap:0,marginBottom:56}}>
              {[
                ["💬","Vecino escribe","En el grupo de WhatsApp de siempre, a cualquier hora"],
                ["🤖","Responde al instante","En lenguaje claro, con la ley si aplica"],
                ["🔔","Te alerta si es urgente","El resto lo gestiona solo sin molestarte"],
                ["✅","Caso cerrado","Con expediente, historial y seguimiento"],
              ].map(([ic,t,d],i,arr)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start"}}>
                  <div style={{textAlign:"center",width:160,padding:"0 8px"}}>
                    <div style={{width:64,height:64,borderRadius:"50%",background:V.pale,border:`2px solid ${V.borde}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 14px"}}>{ic}</div>
                    <div style={{fontWeight:700,fontSize:15,marginBottom:6,color:V.tx}}>{t}</div>
                    <div style={{fontSize:12,color:V.sub,lineHeight:1.55}}>{d}</div>
                  </div>
                  {i<arr.length-1&&<div style={{fontSize:20,color:V.borde,marginTop:20,flexShrink:0,padding:"0 4px"}}>→</div>}
                </div>
              ))}
            </div>
            {/* Tareas */}
            <div style={{background:V.alt,borderRadius:20,padding:"32px 36px"}}>
              <p style={{fontWeight:700,fontSize:18,marginBottom:22,color:V.tx}}>Lo que hace tu asistente cada día:</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"14px 32px"}}>
                {[
                  "Atiende incidencias 24h por WhatsApp",
                  "Clasifica urgencias según la LPH",
                  "Avisa a proveedores y hace seguimiento",
                  "Gestiona morosidad paso a paso",
                  "Recuerda plazos y vencimientos",
                  "Registra todo como expediente digital",
                  "Responde dudas legales en lenguaje claro",
                  "Aprende de cada comunidad que gestiona",
                ].map((t,i)=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:15}}>
                    <span style={{color:V.verde,fontWeight:700,flexShrink:0,marginTop:1}}>✓</span>
                    <span style={{color:V.sub}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section style={{padding:"80px 20px",background:V.osc}}>
          <div style={{maxWidth:920,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <p style={{fontSize:11,fontWeight:700,color:"#4ADE80",textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Resultados reales</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",color:V.w,lineHeight:1.08,letterSpacing:"-.02em"}}>Lo que dicen los administradores</h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
              {[
                {n:"Carlos M.",d:"Adm. Hernández",c:"Madrid",com:38,av:"CM",t:"Hemos bajado de 80 a 30 mensajes diarios. El tiempo que gano lo dedico a lo que de verdad importa en el despacho."},
                {n:"Laura P.",d:"Gestiones del Sur",c:"Sevilla",com:22,av:"LP",t:"Responde a las 2 de la mañana cuando hay una fuga. Yo descanso y los vecinos se sienten atendidos. Eso no tiene precio."},
                {n:"Javier R.",d:"Fincas Mediterráneo",c:"Valencia",com:55,av:"JR",t:"Los vecinos ya no cuestionan mis decisiones porque ven que hay ley detrás, explicada de forma que entienden."},
                {n:"Ana T.",d:"Tu Comunidad",c:"Barcelona",com:17,av:"AT",t:"En menos de una hora estaba funcionando en mis tres comunidades principales. Mucho más fácil de lo que esperaba."},
              ].map((t,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:20,padding:"28px 24px"}}>
                  <div style={{fontSize:18,color:"#FBBF24",marginBottom:16,letterSpacing:3}}>★★★★★</div>
                  <p style={{fontSize:14,color:"rgba(255,255,255,.85)",lineHeight:1.8,marginBottom:24,fontStyle:"italic"}}>"{t.t}"</p>
                  <div style={{display:"flex",alignItems:"center",gap:13}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:V.verde,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:V.w,fontSize:15,flexShrink:0}}>{t.av}</div>
                    <div>
                      <div style={{fontWeight:700,color:V.w,fontSize:15}}>{t.n}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>{t.d} · {t.c}</div>
                      <div style={{fontSize:12,color:"#4ADE80",marginTop:3,fontWeight:700}}>{t.com} comunidades gestionadas</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEMO ── */}
        <section id="demo" style={{padding:"80px 20px",background:V.alt}}>
          <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Demo en vivo</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,letterSpacing:"-.02em",marginBottom:16}}>Habla con el asistente ahora mismo</h2>
            <p style={{fontSize:16,color:V.sub,maxWidth:500,margin:"0 auto 44px",lineHeight:1.75}}>Escribe como si fueras un vecino. Responde en lenguaje claro y muestra el artículo de la ley si aplica.</p>
            <div style={{display:"flex",justifyContent:"center"}}><Chat/></div>
          </div>
        </section>

        {/* ── PRECIOS ── */}
        <section id="precios" style={{padding:"80px 20px",background:V.w}}>
          <div style={{maxWidth:980,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:52}}>
              <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Precios</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,letterSpacing:"-.02em",marginBottom:12}}>Elige el plan para tu despacho</h2>
              <p style={{fontSize:15,color:V.mut}}>Prueba 14 días gratis · Sin tarjeta · Cancela cuando quieras</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
              {PLANES.map((p,i)=>(
                <div key={i} style={{
                  background:p.color,
                  border:`1px solid ${p.dest?V.osc:V.borde}`,
                  borderRadius:20,padding:"28px 22px",
                  position:"relative",
                  transform:p.tag?"scale(1.03)":"none",
                  boxShadow:p.tag?"0 20px 56px rgba(12,53,33,.22)":"none"
                }}>
                  {p.tag&&(
                    <div style={{position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",background:V.azul,color:V.w,fontSize:11,fontWeight:800,padding:"5px 16px",borderRadius:100,whiteSpace:"nowrap",letterSpacing:".05em"}}>
                      {p.tag}
                    </div>
                  )}
                  <div style={{fontSize:12,fontWeight:700,color:p.colorText==="white"||p.color===V.osc?"rgba(255,255,255,.45)":V.mut,marginBottom:6,textTransform:"uppercase",letterSpacing:".1em"}}>{p.nom}</div>
                  {p.p?(
                    <>
                      <div style={{fontFamily:"Georgia,serif",fontSize:48,color:p.color===V.osc?V.w:V.tx,lineHeight:1,marginBottom:4}}>
                        {p.p}<span style={{fontSize:16,fontFamily:"system-ui",fontWeight:500}}>€</span>
                      </div>
                      <div style={{fontSize:12,color:p.color===V.osc?"rgba(255,255,255,.3)":V.mut,marginBottom:6}}>/mes · facturación mensual</div>
                    </>
                  ):(
                    <div style={{fontFamily:"Georgia,serif",fontSize:28,color:V.tx,lineHeight:1.2,marginBottom:10}}>A medida</div>
                  )}
                  <div style={{fontSize:13,color:p.color===V.osc?"rgba(255,255,255,.55)":V.sub,marginBottom:22,fontWeight:600}}>{p.sub}</div>
                  <div style={{marginBottom:26}}>
                    {p.fs.map((f,j)=>(
                      <div key={j} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:10,fontSize:13.5}}>
                        <span style={{color:p.color===V.osc?"#4ADE80":V.verde,flexShrink:0,fontWeight:700,marginTop:1}}>✓</span>
                        <span style={{color:p.color===V.osc?"rgba(255,255,255,.75)":V.sub}}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>go("contacto")}
                    style={{width:"100%",padding:"13px 0",borderRadius:100,border:"none",cursor:"pointer",fontFamily:"system-ui",fontWeight:700,fontSize:14,
                      background:p.color===V.osc?V.w:V.verde,
                      color:p.color===V.osc?V.osc:V.w}}>
                    {p.p?"Empezar gratis":"Solicitar plan"}
                  </button>
                </div>
              ))}
            </div>
            <p style={{textAlign:"center",marginTop:28,fontSize:14,color:V.mut}}>
              ¿Tienes dudas sobre qué plan necesitas?{" "}
              <button onClick={()=>go("contacto")} style={{background:"none",border:"none",color:V.verde,cursor:"pointer",fontWeight:700,fontFamily:"system-ui",fontSize:14,padding:0,textDecoration:"underline"}}>
                Escríbenos y te ayudamos
              </button>
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{padding:"80px 20px",background:V.alt}}>
          <div style={{maxWidth:660,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Preguntas frecuentes</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,letterSpacing:"-.02em"}}>Lo que nos suelen preguntar</h2>
            </div>
            {FAQS.map((f,i)=>(
              <div key={i} style={{borderBottom:`1px solid ${V.borde}`}}>
                <button onClick={()=>setFaq(faq===i?null:i)}
                  style={{width:"100%",background:"none",border:"none",padding:"19px 0",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"system-ui",fontSize:15,fontWeight:600,color:V.tx,textAlign:"left",gap:16}}>
                  {f.p}
                  <span style={{fontSize:24,color:V.mut,flexShrink:0,transform:faq===i?"rotate(45deg)":"none",transition:"transform .22s",display:"inline-block",lineHeight:1}}>+</span>
                </button>
                {faq===i&&(
                  <div style={{paddingBottom:22,fontSize:15,color:V.sub,lineHeight:1.85}}>{f.r}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOG ── */}
        <section id="blog" style={{padding:"80px 20px",background:V.w}}>
          <div style={{maxWidth:980,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:52}}>
              <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Blog</p>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,44px)",lineHeight:1.08,letterSpacing:"-.02em",marginBottom:14}}>Actualidad en Propiedad Horizontal</h2>
              <p style={{fontSize:16,color:V.sub,maxWidth:540,margin:"0 auto"}}>Artículos prácticos sobre LPH, jurisprudencia y gestión de comunidades. Publicamos cada semana.</p>
            </div>
            {/* Destacado */}
            <div onClick={()=>setArt(0)}
              style={{border:`1px solid ${V.borde}`,borderRadius:20,overflow:"hidden",cursor:"pointer",marginBottom:24,transition:"box-shadow .2s"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.12)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{background:`linear-gradient(135deg,${V.osc},${V.verde})`,padding:"40px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:200}}>
                  <span style={{display:"inline-block",background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.9)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:16}}>
                    {BLOG[0].cat} · Destacado · {BLOG[0].min}
                  </span>
                  <h3 style={{fontFamily:"Georgia,serif",fontSize:"clamp(20px,3vw,32px)",color:V.w,lineHeight:1.15,marginBottom:12}}>{BLOG[0].tit}</h3>
                  <p style={{fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.65}}>{BLOG[0].desc}</p>
                </div>
                <div style={{background:"rgba(255,255,255,.12)",borderRadius:100,padding:"13px 24px",color:V.w,fontWeight:700,fontSize:15,whiteSpace:"nowrap",border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>
                  Leer artículo →
                </div>
              </div>
            </div>
            {/* Grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20}}>
              {BLOG.slice(1).map((a,i)=>(
                <div key={i} onClick={()=>setArt(i+1)}
                  style={{border:`1px solid ${V.borde}`,borderRadius:16,overflow:"hidden",cursor:"pointer",background:V.w,transition:"box-shadow .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.09)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  <div style={{background:`linear-gradient(135deg,${V.pale},${V.alt})`,height:68,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontFamily:"Georgia,serif",fontSize:32,color:V.verde,opacity:.25}}>§</span>
                  </div>
                  <div style={{padding:"20px 22px 24px"}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:11}}>
                      <span style={{background:V.pale,color:V.verde,fontSize:10,fontWeight:700,padding:"3px 11px",borderRadius:100,textTransform:"uppercase",letterSpacing:".06em"}}>{a.cat}</span>
                      <span style={{fontSize:11,color:V.mut}}>{a.min}</span>
                    </div>
                    <h3 style={{fontFamily:"Georgia,serif",fontSize:17,lineHeight:1.3,marginBottom:10,color:V.tx}}>{a.tit}</h3>
                    <p style={{fontSize:13,color:V.sub,lineHeight:1.65,marginBottom:16}}>{a.desc}</p>
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

        {/* ── SOBRE NOSOTROS ── */}
        <section style={{padding:"80px 20px",background:V.alt}}>
          <div style={{maxWidth:720,margin:"0 auto",textAlign:"center"}}>
            <p style={{fontSize:11,fontWeight:700,color:V.verde,textTransform:"uppercase",letterSpacing:".12em",marginBottom:12}}>Sobre AfincalIA</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",lineHeight:1.1,letterSpacing:"-.02em",marginBottom:26}}>Nacimos en un despacho de administración</h2>
            <p style={{fontSize:16,color:V.sub,lineHeight:1.9,marginBottom:22}}>AfincalIA nació de ver cómo los mejores administradores de fincas dedicaban el 60% de su tiempo a responder mensajes repetitivos en WhatsApp, en lugar de trabajar en lo que de verdad aporta valor: la gestión legal, las juntas y las relaciones con los propietarios.</p>
            <p style={{fontSize:16,color:V.sub,lineHeight:1.9,marginBottom:40}}>Construimos AfincalIA con una obsesión: que nunca dé información incorrecta. Cada respuesta cita el artículo exacto de la LPH o dice claramente que no sabe. Sin inventar. Sin improvisar. Siempre.</p>
            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
              {[["100%","base legal verificada"],["0","respuestas inventadas"],["RGPD","servidores en la UE"]].map(([n,l],i)=>(
                <div key={i} style={{background:V.w,border:`1px solid ${V.borde}`,borderRadius:16,padding:"20px 30px",textAlign:"center",boxShadow:"0 2px 16px rgba(0,0,0,.05)"}}>
                  <div style={{fontFamily:"Georgia,serif",fontSize:30,color:V.verde,fontWeight:400}}>{n}</div>
                  <div style={{fontSize:13,color:V.mut,marginTop:6}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section id="contacto" style={{padding:"88px 20px",background:V.verde,textAlign:"center"}}>
          <div style={{maxWidth:580,margin:"0 auto"}}>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,52px)",color:V.w,lineHeight:1.08,letterSpacing:"-.02em",marginBottom:22}}>
              Activa tu asistente<br/>esta semana
            </h2>
            <p style={{fontSize:17,color:"rgba(255,255,255,.7)",marginBottom:44,lineHeight:1.8}}>
              Configúralo en menos de una hora. Tus vecinos siguen usando WhatsApp como siempre. Tú dejas de estar pendiente del móvil.
            </p>
            <button onClick={()=>go("precios")}
              style={{background:V.w,color:V.osc,border:"none",borderRadius:100,padding:"18px 48px",fontSize:18,fontWeight:800,cursor:"pointer",fontFamily:"system-ui",boxShadow:"0 8px 32px rgba(0,0,0,.18)",display:"inline-block"}}>
              Probar gratis — 14 días
            </button>
            <p style={{marginTop:20,fontSize:13,color:"rgba(255,255,255,.35)"}}>
              Sin tarjeta de crédito · Datos en Europa (Alemania) · Soporte en español
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{background:V.osc,padding:"48px 20px 32px"}}>
          <div style={{maxWidth:980,margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:40,marginBottom:48}}>
              <div>
                <Logo/>
                <p style={{marginTop:18,fontSize:14,color:"rgba(255,255,255,.3)",lineHeight:1.75}}>
                  Asistente digital para administradores de fincas en España.<br/>LPH · RGPD · 24/7
                </p>
              </div>
              <div>
                <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Producto</p>
                {[["como-funciona","Cómo funciona"],["demo","Demo en vivo"],["precios","Precios"],["blog","Blog LPH"]].map(([id,l])=>(
                  <div key={id} style={{marginBottom:12}}>
                    <button onClick={()=>go(id)} style={{background:"none",border:"none",color:"rgba(255,255,255,.4)",fontSize:14,cursor:"pointer",fontFamily:"system-ui",padding:0,textAlign:"left"}}>{l}</button>
                  </div>
                ))}
              </div>
              <div>
                <p style={{fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:18,fontSize:12,textTransform:"uppercase",letterSpacing:".1em"}}>Legal</p>
                {["Aviso legal","Política de privacidad","Política de cookies","Condiciones de uso"].map(l=>(
                  <div key={l} style={{marginBottom:12,fontSize:14,color:"rgba(255,255,255,.4)"}}>{l}</div>
                ))}
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
    </>
  );
}

const CSS=`
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{overflow-x:hidden;-webkit-font-smoothing:antialiased;}
  @keyframes dot{0%,60%,100%{transform:scale(.7);opacity:.3}30%{transform:scale(1);opacity:1}}
  .dnav{display:flex!important;align-items:center;gap:2px;}
  .burg{display:none!important;}
  @media(max-width:700px){
    .dnav{display:none!important;}
    .burg{display:flex!important;}
  }
  button:focus{outline:none;}
  a:focus{outline:none;}
`;
