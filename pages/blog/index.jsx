import { useState } from "react";
import Link from "next/link";

const V={verde:"#1A6B42",osc:"#0C3521",pale:"#EBF4EE",borde:"#C8DFCF",rojo:"#C4362C",tx:"#111917",sub:"#3D4D44",mut:"#9CA3AF",bg:"#FAFAF8",alt:"#F2F5F2",w:"#fff",azul:"#1E4FA3",amarillo:"#D97706"};
const WA="https://wa.me/34614557419?text=Hola%2C%20me%20interesa%20AfincalIA";

function Logo(){
  return(
    <Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:8}}>
      <div style={{display:"flex",flexDirection:"column",gap:2}}>
        <div style={{display:"flex",gap:2}}>
          {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}
        </div>
        <div style={{display:"flex",gap:2}}>
          {[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}
        </div>
      </div>
      <span style={{fontFamily:"Georgia,serif",fontSize:20,color:V.tx}}>Afincal<span style={{color:V.verde}}>IA</span></span>
    </Link>
  );
}

const ARTS=[
  {
    cat:"Novedades Legales",min:"5 min",dest:true,
    tit:"Reforma LPH 2025: cómo frenar los pisos turísticos en tu edificio",
    desc:"La LO 1/2025 cambia las reglas: ya no hace falta unanimidad. Basta con 3 de cada 5 propietarios.",
    fecha:"8 ene 2026",
    body:[
      {h:"¿Qué cambia con la LO 1/2025?",p:"Hasta 2025 prohibir el uso turístico requería unanimidad. La nueva ley baja el umbral a tres quintas partes de propietarios y cuotas de participación."},
      {h:"Cómo aplicarlo paso a paso",p:"Incluir el punto en el orden del día, votar en junta e inscribir el acuerdo en el Registro de la Propiedad para que sea oponible a terceros."},
      {h:"Efectos limitados a nuevos usos",p:"El acuerdo no afecta a licencias ya concedidas antes de la junta. Solo aplica a nuevos usos posteriores. Consulta con un abogado para casos concretos."},
      {h:"Cómo te ayuda AfincalIA",p:"El asistente conoce esta normativa y puede responder a vecinos citando el artículo exacto. Tras la junta genera el acta automáticamente con acuerdos y votaciones."},
    ]
  },
  {
    cat:"Actas IA",min:"4 min",
    tit:"Cómo generar el acta de una junta en 5 minutos desde el móvil",
    desc:"Foto o audio del borrador. AfincalIA hace el resto. Acuerdos numerados, votaciones y tareas en minutos.",
    fecha:"15 ene 2026",
    body:[
      {h:"El problema de las actas",p:"El acta es obligatoria por ley (Art. 19 LPH). Muchos administradores la redactan de memoria días después, con riesgo de errores con consecuencias legales."},
      {h:"El nuevo flujo con AfincalIA",p:"Al terminar la junta, el administrador hace una foto al borrador o graba un audio. AfincalIA procesa la imagen o el audio y genera un acta estructurada con todos los elementos legalmente requeridos."},
      {h:"Qué incluye el acta generada",p:"Acuerdos numerados con resultado de votación, tareas pendientes con responsable y plazo, y fecha de próxima convocatoria si se acordó."},
      {h:"¿Es válida legalmente?",p:"Sí, con la misma validez que cualquier acta redactada por el administrador, siempre que sea firmada por presidente y secretario conforme al Art. 19 LPH."},
    ]
  },
  {
    cat:"Morosidad",min:"7 min",
    tit:"Vecino moroso: los 4 pasos legales que debe seguir el administrador",
    desc:"El Art. 21 LPH es tu herramienta. Para deudas menores de 2.000€ no hace falta abogado.",
    fecha:"14 feb 2026",
    body:[
      {h:"Paso 1 — Certifica la deuda en junta",p:"La junta debe aprobar la liquidación de la deuda. El acuerdo firmado por administrador y presidente es el título ejecutivo necesario."},
      {h:"Paso 2 — Requerimiento fehaciente",p:"Burofax con acuse de recibo. No es obligatorio pero refuerza el expediente y en muchos casos provoca el pago voluntario."},
      {h:"Paso 3 — Procedimiento monitorio",p:"Para deudas bajo 2.000€ puedes presentar el escrito tú mismo en el juzgado. Sin abogado ni procurador."},
      {h:"Paso 4 — Ejecución",p:"Si el deudor no paga ni se opone en 20 días, el juzgado dicta auto de ejecución. Se puede embargar la vivienda o las rentas del alquiler."},
    ]
  },
  {
    cat:"RGPD y Legal",min:"6 min",
    tit:"WhatsApp en comunidades y RGPD: la AEPD ya ha multado más de 200 veces",
    desc:"Los riesgos son reales y las multas llegan a 20.000€. Cómo proteger tu despacho.",
    fecha:"5 mar 2026",
    body:[
      {h:"El riesgo que muchos ignoran",p:"La AEPD ha sancionado a más de 200 comunidades desde 2020. El motivo más frecuente: compartir datos personales en el grupo de WhatsApp."},
      {h:"Qué tipos de datos son problemáticos",p:"Números de cuenta, DNI, datos de salud, justificantes médicos y fotografías de personas sin consentimiento."},
      {h:"La responsabilidad recae sobre el administrador",p:"Como encargado del tratamiento, el administrador tiene obligaciones activas bajo el RGPD. No basta con no ser quien comparte los datos."},
      {h:"Qué detecta AfincalIA",p:"El guardián analiza los mensajes en tiempo real. Cuando detecta un dato sensible envía un aviso, notifica al administrador y registra el incidente."},
    ]
  },
  {
    cat:"Comparativas",min:"8 min",
    tit:"Software para administradores de fincas: comparativa completa 2026",
    desc:"Fynkus, Gesfincas, Fincora, Finky y AfincalIA. Qué ofrece cada uno y para quién es mejor.",
    fecha:"1 abr 2026",
    body:[
      {h:"Gesfincas y Fynkus — los clásicos",p:"Programas de gestión completos: contabilidad, recibos, convocatorias. Ninguno ofrece atención automática por WhatsApp ni guardián RGPD."},
      {h:"Finky y Fincora — chatbots simples",p:"Responden preguntas frecuentes pero sin LPH verificada, sin actas, sin morosidad y sin vigilancia RGPD activa."},
      {h:"AfincalIA — automatización completa",p:"Combina atención WhatsApp 24h con LPH verificada, guardián RGPD activo, actas desde foto o audio y protocolo de morosidad Art. 21."},
      {h:"¿Con cuál me quedo?",p:"Si ya usas Gesfincas o Fynkus, AfincalIA los complementa. El plan Despacho incluye integración directa con ambos."},
    ]
  },
  {
    cat:"Gestión Práctica",min:"4 min",
    tit:"Las 5 consultas que reciben todos los administradores cada semana",
    desc:"El 80% de los mensajes de WhatsApp son siempre los mismos. Aquí están las respuestas correctas.",
    fecha:"10 abr 2026",
    body:[
      {h:"1. El ascensor no funciona — Art. 10.1 LPH",p:"La comunidad está obligada a mantener los servicios comunes. AfincalIA lo registra como urgente y avisa al administrador de inmediato."},
      {h:"2. Ruido del vecino — Art. 7.2 LPH",p:"Las actividades molestas están prohibidas. AfincalIA registra la queja y explica el procedimiento de cesación paso a paso."},
      {h:"3. Gotera en el portal — Art. 10.1 LPH",p:"Reparación obligatoria con cargo al fondo de reserva. AfincalIA registra y recuerda los plazos de seguimiento."},
      {h:"4. Piso turístico — Art. 17.12 LPH",p:"Desde la LO 1/2025 basta con 3/5 de propietarios. AfincalIA explica la normativa actualizada y ayuda a preparar el punto del orden del día."},
      {h:"5. Vecino que no paga — Art. 21 LPH",p:"AfincalIA aplica el protocolo completo: registra la deuda, informa al propietario y genera el expediente de morosidad."},
    ]
  },
  {
    cat:"Productividad",min:"5 min",
    tit:"Cómo recuperar 3 horas diarias como administrador de fincas",
    desc:"Un administrador medio dedica entre 2 y 4 horas al día a WhatsApp. Así se recuperan sin perder calidad de servicio.",
    fecha:"3 mar 2026",
    body:[
      {h:"El tiempo que se va sin darte cuenta",p:"Con 30 mensajes al día, entre leer, pensar y responder, son entre 90 y 240 minutos diarios. Solo en mensajes."},
      {h:"El problema no es el tiempo, es la interrupción",p:"Cada notificación rompe el trabajo de concentración. El coste real no es solo el tiempo de respuesta sino la recuperación cognitiva después."},
      {h:"El 80% no requiere criterio",p:"Ascensores, goteras, ruidos, preguntas sobre juntas. Tienen respuesta conocida que no requiere la experiencia del administrador."},
      {h:"Cómo usar bien el tiempo recuperado",p:"Visitar comunidades, negociar con proveedores, captar nuevos clientes. La automatización libera tiempo para el trabajo que solo el administrador puede hacer."},
    ]
  },
  {
    cat:"RGPD y Legal",min:"5 min",
    tit:"Contrato DPA: qué es, por qué es obligatorio y cómo conseguirlo",
    desc:"Muchos administradores no tienen el contrato de encargado del tratamiento. Sin él la AEPD puede sancionar.",
    fecha:"20 feb 2026",
    body:[
      {h:"Qué es un contrato DPA",p:"El Data Processing Agreement regula cómo una empresa trata datos personales en nombre de otra. El Art. 28 del RGPD lo exige cuando un tercero trata datos por cuenta del responsable."},
      {h:"Por qué el administrador lo necesita",p:"El administrador trata nombres, DNI, IBAN y datos de deudas de los propietarios. Si usa software de terceros para gestionarlos necesita un DPA con cada proveedor."},
      {h:"Qué pasa sin DPA",p:"La ausencia de DPA puede ser sancionada como infracción grave. Las multas a administradores en España han estado entre 1.000€ y 15.000€."},
      {h:"Cómo lo resuelve AfincalIA",p:"AfincalIA incluye un contrato DPA completo desde el primer día de suscripción. Disponible para descarga en el panel. Datos en Alemania (UE)."},
    ]
  },
  {
    cat:"Novedades Legales",min:"4 min",
    tit:"Real Decreto 1312/2024: qué cambia para las comunidades de propietarios",
    desc:"El decreto actualiza los procedimientos de accesibilidad, eficiencia energética y responsabilidad del administrador.",
    fecha:"15 ene 2026",
    body:[
      {h:"Accesibilidad: nuevas obligaciones",p:"Los edificios con más de 10 años deben realizar inspecciones periódicas. El administrador tiene 30 días para comunicar las deficiencias a los propietarios."},
      {h:"Eficiencia energética: mayoría simple suficiente",p:"Instalación de paneles solares, climatización eficiente y aislamiento térmico ahora se aprueban con mayoría simple en lugar de mayoría cualificada."},
      {h:"Responsabilidad del administrador",p:"El administrador debe informar proactivamente a la junta sobre los plazos legales de cumplimiento. No es suficiente esperar a que pregunten."},
      {h:"AfincalIA está actualizado",p:"La base de conocimiento incluye este decreto. Cuando alguien pregunta sobre accesibilidad o eficiencia energética cita la normativa vigente actualizada."},
    ]
  },
  {
    cat:"Gestión Práctica",min:"6 min",
    tit:"Cómo convocar correctamente una junta de propietarios",
    desc:"Plazos, contenido del orden del día, quórum y notificaciones. Todo para que la junta sea válida.",
    fecha:"22 mar 2026",
    body:[
      {h:"Tipos de junta y cuándo convocarlas",p:"La junta ordinaria debe celebrarse al menos una vez al año. Las extraordinarias cuando lo solicite el presidente, el administrador o la cuarta parte de los propietarios."},
      {h:"Plazos de convocatoria",p:"Al menos 6 días de antelación para las juntas ordinarias. Para extraordinarias la doctrina recomienda al menos 3 días."},
      {h:"Qué debe contener el orden del día",p:"El orden del día es vinculante. Solo pueden adoptarse acuerdos sobre los puntos incluidos. Los acuerdos sobre puntos no incluidos son nulos."},
      {h:"Quórum y mayorías",p:"Mayoría simple para asuntos ordinarios. Tres quintos para instalar ascensores o limitar pisos turísticos. Unanimidad para modificar el título constitutivo."},
    ]
  },
  {
    cat:"Productividad",min:"5 min",
    tit:"Expediente digital por comunidad: por qué cambia todo para el administrador",
    desc:"Un historial completo de cada comunidad accesible en segundos desde el móvil.",
    fecha:"28 mar 2026",
    body:[
      {h:"El problema del archivo disperso",p:"La información está en el software de gestión, el email, el WhatsApp y carpetas físicas. Encontrar cualquier cosa requiere buscar en varios sitios."},
      {h:"Qué es el expediente digital por comunidad",p:"AfincalIA crea automáticamente un expediente para cada comunidad. Cada incidencia, acta o comunicación queda archivada sin intervención manual."},
      {h:"Lo que hay en cada expediente",p:"Todas las actas, historial de incidencias, registro de morosos, comunicaciones con proveedores y avisos RGPD. Todo con búsqueda instantánea."},
      {h:"El expediente como ventaja competitiva",p:"Un administrador que muestra un expediente digital organizado a un nuevo cliente transmite profesionalidad que los competidores sin esta herramienta no pueden igualar."},
    ]
  },
  {
    cat:"Gestión Práctica",min:"3 min",
    tit:"Fondo de reserva: cuánto debe tener la comunidad y para qué sirve",
    desc:"La LPH obliga a mantener un fondo del 10% del presupuesto. Muchas comunidades lo ignoran.",
    fecha:"5 abr 2026",
    body:[
      {h:"Qué es y quién lo regula",p:"El Art. 9.1.f de la LPH obliga a todas las comunidades a constituir un fondo de reserva para obras de conservación y reparación."},
      {h:"¿Cuánto debe tener?",p:"Al menos el 10% del último presupuesto ordinario aprobado. Si el presupuesto es 50.000€ el fondo debe ser de al menos 5.000€."},
      {h:"Consecuencias de no tenerlo",p:"Cuando surge una reparación urgente la comunidad no tiene fondos y debe aprobar una derrama de urgencia. Genera conflictos y retrasos."},
      {h:"Cómo gestionarlo correctamente",p:"El administrador debe informar en cada junta del estado del fondo y proponer dotación adicional si no llega al mínimo legal."},
    ]
  },
];

export default function Blog(){
  const [art,setArt]=useState(null);
  const [cat,setCat]=useState("Todos");

  const cats=["Todos",...Array.from(new Set(ARTS.map(a=>a.cat)))];
  const lista=cat==="Todos"?ARTS:ARTS.filter(a=>a.cat===cat);

  if(art!==null){
    const a=ARTS[art];
    return(
      <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,minHeight:"100vh"}}>
        <style>{CSS}</style>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${V.borde}`}}>
          <div style={{maxWidth:900,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Logo/>
            <button onClick={()=>setArt(null)} style={{background:V.pale,border:"none",borderRadius:100,padding:"8px 20px",cursor:"pointer",fontWeight:700,fontSize:13,color:V.verde,fontFamily:"system-ui"}}>
              ← Volver al blog
            </button>
          </div>
        </nav>
        <div style={{background:V.osc,padding:"44px 20px 52px"}}>
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <span style={{display:"inline-block",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.8)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",marginBottom:18}}>
              {a.cat}
            </span>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(24px,5vw,42px)",lineHeight:1.1,color:V.w,marginBottom:14}}>{a.tit}</h1>
            <p style={{fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:16}}>{a.desc}</p>
            <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>📅 {a.fecha} · ⏱ {a.min} de lectura</div>
          </div>
        </div>
        <article style={{maxWidth:700,margin:"0 auto",padding:"44px 20px 80px"}}>
          {a.body.map((s,i)=>(
            <div key={i} style={{marginBottom:40}}>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(18px,3vw,24px)",color:V.tx,marginBottom:14,lineHeight:1.25}}>{s.h}</h2>
              <p style={{fontSize:16,lineHeight:1.9,color:V.sub}}>{s.p}</p>
            </div>
          ))}
          <div style={{background:V.pale,borderRadius:20,padding:"32px 28px",border:`1px solid ${V.borde}`,marginTop:20}}>
            <p style={{fontWeight:700,fontSize:18,marginBottom:10,color:V.verde,fontFamily:"Georgia,serif"}}>AfincalIA lo gestiona automáticamente</p>
            <p style={{fontSize:15,color:V.sub,marginBottom:24,lineHeight:1.7}}>14 días gratis con el plan Profesional. Sin tarjeta. En menos de una hora.</p>
            <Link href="/precios" style={{display:"inline-block",background:V.verde,color:V.w,borderRadius:100,padding:"13px 32px",fontWeight:700,fontSize:15,textDecoration:"none"}}>
              Ver planes →
            </Link>
          </div>
        </article>
      </div>
    );
  }

  return(
    <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,color:V.tx,minHeight:"100vh"}}>
      <style>{CSS}</style>

      <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${V.borde}`}}>
        <div style={{maxWidth:1060,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Logo/>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <Link href="/" style={{fontSize:14,color:V.sub,textDecoration:"none"}}>← Web</Link>
            <Link href="/precios" style={{background:V.verde,color:V.w,borderRadius:100,padding:"10px 22px",fontSize:14,fontWeight:700,textDecoration:"none"}}>
              14 días gratis
            </Link>
          </div>
        </div>
      </nav>

      <div style={{background:V.osc,padding:"56px 20px 64px"}}>
        <div style={{maxWidth:720,margin:"0 auto",textAlign:"center"}}>
          <p style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:16}}>Blog AfincalIA</p>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(30px,5vw,52px)",color:V.w,lineHeight:1.08,marginBottom:16}}>Actualidad en Propiedad Horizontal</h1>
          <p style={{fontSize:16,color:"rgba(255,255,255,.5)",lineHeight:1.75,maxWidth:480,margin:"0 auto"}}>LPH, RGPD, actas digitales y gestión de comunidades para administradores de fincas.</p>
        </div>
      </div>

      <div style={{background:V.alt,borderBottom:`1px solid ${V.borde}`,padding:"14px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"flex",gap:8,whiteSpace:"nowrap"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{background:cat===c?V.verde:V.w,color:cat===c?V.w:V.sub,border:`1px solid ${cat===c?V.verde:V.borde}`,borderRadius:100,padding:"7px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"system-ui",flexShrink:0}}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:980,margin:"0 auto",padding:"48px 20px 80px"}}>
        {cat==="Todos"&&(
          <div onClick={()=>setArt(0)} style={{border:`1px solid ${V.borde}`,borderRadius:20,overflow:"hidden",cursor:"pointer",marginBottom:32}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.12)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{background:`linear-gradient(135deg,${V.osc},${V.verde})`,padding:"44px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:240}}>
                <span style={{display:"inline-block",background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.9)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",marginBottom:18}}>
                  {ARTS[0].cat} · Destacado
                </span>
                <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,3vw,34px)",color:V.w,lineHeight:1.12,marginBottom:14}}>{ARTS[0].tit}</h2>
                <p style={{fontSize:15,color:"rgba(255,255,255,.6)",lineHeight:1.65,marginBottom:16}}>{ARTS[0].desc}</p>
                <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>📅 {ARTS[0].fecha} · ⏱ {ARTS[0].min}</div>
              </div>
              <div style={{background:"rgba(255,255,255,.12)",borderRadius:100,padding:"14px 28px",color:V.w,fontWeight:700,fontSize:15,whiteSpace:"nowrap",border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>
                Leer →
              </div>
            </div>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:22}}>
          {(cat==="Todos"?lista.slice(1):lista).map((a)=>{
            const idx=ARTS.indexOf(a);
            const bc=a.cat==="RGPD y Legal"?"#EEF2FF":a.cat==="Morosidad"?"#FEF3C7":a.cat==="Actas IA"?"#DCFCE7":V.pale;
            const tc=a.cat==="RGPD y Legal"?V.azul:a.cat==="Morosidad"?V.amarillo:V.verde;
            return(
              <div key={idx} onClick={()=>setArt(idx)} style={{border:`1px solid ${V.borde}`,borderRadius:18,overflow:"hidden",cursor:"pointer",background:V.w}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.09)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{background:`linear-gradient(135deg,${V.pale},${V.alt})`,height:72,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontFamily:"Georgia,serif",fontSize:36,color:V.verde,opacity:.2}}>§</span>
                </div>
                <div style={{padding:"20px 22px 24px"}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
                    <span style={{background:bc,color:tc,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:100,textTransform:"uppercase"}}>{a.cat}</span>
                    <span style={{fontSize:11,color:V.mut}}>⏱ {a.min}</span>
                  </div>
                  <h3 style={{fontFamily:"Georgia,serif",fontSize:17,lineHeight:1.3,marginBottom:10,color:V.tx}}>{a.tit}</h3>
                  <p style={{fontSize:13,color:V.sub,lineHeight:1.65,marginBottom:16}}>{a.desc}</p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,color:V.mut}}>📅 {a.fecha}</span>
                    <span style={{fontSize:13,color:V.verde,fontWeight:700}}>Leer →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{background:"#0F2D1A",padding:"64px 20px",textAlign:"center"}}>
        <div style={{maxWidth:540,margin:"0 auto"}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,4vw,40px)",color:V.w,marginBottom:16,lineHeight:1.1}}>¿Quieres que AfincalIA lo gestione?</h2>
          <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:32,lineHeight:1.75}}>14 días gratis con el plan Profesional. Sin tarjeta. En menos de una hora.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/precios" style={{background:V.verde,color:V.w,borderRadius:100,padding:"15px 36px",fontSize:16,fontWeight:700,textDecoration:"none"}}>
              Empezar gratis →
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:"transparent",color:V.w,border:"2px solid rgba(255,255,255,.3)",borderRadius:100,padding:"14px 28px",fontSize:15,fontWeight:700,textDecoration:"none"}}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS=`
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:system-ui,sans-serif;background:#FAFAF8;color:#111917;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
  button:focus{outline:none;}
`;
