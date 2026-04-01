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

          <a href="#empezar" style={{display:"inline-block",padding:"16px 36px",borderRadius:"12px",background:"var(--accent)",color:"#fff",fontWeight:700,fontSize:"16px",textDecoration:"none"}}>
            Probar 14 días gratis →
          </a>
          <div style={{marginTop:"10px",fontSize:"12px",color:"var(--fg3)"}}>Sin tarjeta de crédito · Sin compromiso</div>
        </div>
      </section>

      {/* TRUST */}
      <div style={{padding:"16px 20px",borderBottom:"1px solid var(--border)",background:"var(--card)"}}>
        <div style={{maxWidth:"720px",margin:"0 auto",display:"flex",justifyContent:"center",gap:"16px",flexWrap:"wrap",fontSize:"11px",color:"var(--fg3)"}}>
          {["🔒 Cifrado SSL","🇪🇺 Datos en Europa","📋 RGPD","⚖️ Base legal LPH"].map((b,i)=><span key={i}>{b}</span>)}
        </div>
      </div>

      {/* DOLOR */}
      <S>
        <Tag>¿Te suena esto?</Tag>
        <H>El día a día que nadie aguanta</H>
        <div style={{marginTop:"24px",display:"flex",flexDirection:"column",gap:"12px"}}>
          {[
            {i:"😤",t:"Vecinos enfadados a todas horas",d:"7:30am lunes: \"¡El ascensor!\". 23:00 viernes: \"¡Mi vecino hace ruido!\". Tu teléfono no descansa."},
            {i:"📱",t:"40 grupos de WhatsApp caóticos",d:"Quejas, fotos, memes, urgencias. Todo mezclado. Imposible encontrar nada ni saber qué es urgente."},
            {i:"⏰",t:"2 horas al día solo en WhatsApp",d:"Leyendo, contestando, reenviando al fontanero... Tiempo que no facturas a nadie."},
            {i:"🤬",t:"Solo te buscan para quejarse",d:"Nadie llama para dar las gracias. Si tardas un día en contestar, ya eres el peor administrador del mundo."},
            {i:"😰",t:"Sensación de no llegar nunca",d:"Siempre hay algo pendiente. Un vecino sin contestar. Una fuga sin resolver. Un moroso sin reclamar."},
            {i:"📋",t:"Juntas sin datos, morosos sin control",d:"Llegas a la Junta sin informes claros. Los morosos se eternizan. Los vecinos no entienden por qué no actúas."},
          ].map((p,i)=>(
            <div key={i} style={{background:"var(--card)",borderRadius:"12px",padding:"16px",border:"1px solid var(--border)"}}>
              <div style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
                <span style={{fontSize:"24px",flexShrink:0}}>{p.i}</span>
                <div>
                  <div style={{fontSize:"14px",fontWeight:700,color:"var(--fg)",marginBottom:"2px"}}>{p.t}</div>
                  <div style={{fontSize:"13px",color:"var(--fg2)",lineHeight:1.5}}>{p.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"24px",padding:"20px",background:"var(--gbg)",borderRadius:"12px",border:"1px solid rgba(27,122,78,.1)"}}>
          <div style={{fontSize:"18px",fontWeight:800,color:"var(--green)"}}>Afincal<span style={{color:"var(--dot)"}}>IA</span> acaba con todo esto.</div>
          <div style={{fontSize:"14px",color:"var(--fg2)",marginTop:"4px"}}>Tu asistente profesional 24/7 que responde, clasifica y gestiona.</div>
        </div>
      </S>

      {/* CÓMO FUNCIONA */}
      <S bg="var(--card)" id="como">
        <Tag>Cómo funciona</Tag>
        <H>Tres pasos. Sin cambiar nada.</H>
        <div style={{marginTop:"28px"}}>
          {[
            {n:"1",t:"Añade AfincalIA a tus grupos",d:"Los grupos de WhatsApp que ya tienes con tus comunidades. Solo añades nuestro número. No creas nada nuevo. Cero cambios para los vecinos.",c:"var(--green)"},
            {n:"2",t:"La IA responde en 3 segundos",d:"Un vecino escribe \"el ascensor no funciona\". AfincalIA responde con confirmación, prioridad y próximos pasos. Contacta al gremio si hace falta. Tú solo recibes el aviso.",c:"var(--accent)"},
            {n:"3",t:"Tú gestionas lo importante",d:"En tu panel ves todo organizado: incidencias por prioridad, morosos, contratos que vencen. Respondes desde el panel y llega al vecino por WhatsApp. Informes automáticos para Juntas.",c:"#2563EB"},
          ].map((s,i)=>(
            <div key={i} style={{display:"flex",gap:"16px",marginBottom:"28px",alignItems:"flex-start"}}>
              <div style={{width:"44px",height:"44px",borderRadius:"12px",background:s.c+"12",border:`1.5px solid ${s.c}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:800,color:s.c,flexShrink:0,fontFamily:"var(--body)"}}>{s.n}</div>
              <div>
                <h3 style={{fontSize:"16px",fontWeight:700,marginBottom:"4px"}}>{s.t}</h3>
                <p style={{fontSize:"14px",color:"var(--fg2)",lineHeight:1.6}}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </S>

      {/* WHATSAPP EJEMPLO */}
      <S bg="var(--gbg)">
        <div style={{textAlign:"center",marginBottom:"20px"}}><Tag>Ejemplo real</Tag><H s="24px">Así lo ve el vecino</H></div>
        <div style={{background:"#ECE5DD",borderRadius:"16px",overflow:"hidden",maxWidth:"400px",margin:"0 auto"}}>
          <div style={{background:"#075E54",padding:"12px 16px",display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"12px",color:"#fff"}}>A</div>
            <div><div style={{color:"#fff",fontWeight:600,fontSize:"13px"}}>Res. Los Olivos</div><div style={{color:"rgba(255,255,255,.6)",fontSize:"10px"}}>AfincalIA activo</div></div>
          </div>
          <div style={{padding:"12px"}}>
            <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"8px"}}>
              <div style={{background:"#D9FDD3",padding:"8px 12px",borderRadius:"10px 0 10px 10px",maxWidth:"82%",fontSize:"13px",lineHeight:1.5,color:"#111"}}>El ascensor lleva parado desde esta mañana y hay personas mayores que no pueden bajar</div>
            </div>
            <div>
              <div style={{fontSize:"10px",fontWeight:700,color:"#075E54",marginBottom:"2px"}}>AfincalIA</div>
              <div style={{background:"#fff",padding:"10px 12px",borderRadius:"0 10px 10px 10px",maxWidth:"85%",fontSize:"12px",lineHeight:1.7,color:"#222"}}>
                ✅ Incidencia <strong>#AF-042</strong> registrada.<br/><br/>
                📋 <strong>Ascensor</strong> · Prioridad: <strong>Crítica</strong><br/><br/>
                Su administrador ha sido notificado. Servicio técnico contactado automáticamente.<br/><br/>
                <span style={{fontSize:"10px",color:"#777"}}>Tiempo estimado de respuesta: menos de 1 hora.</span>
              </div>
            </div>
          </div>
        </div>
      </S>

      {/* FUNCIONES */}
      <S id="funciones">
        <Tag>Qué hace por ti</Tag>
        <H>Tu despacho entero, automatizado</H>
        <div style={{marginTop:"24px",display:"flex",flexDirection:"column",gap:"10px"}}>
          {[
            {cat:"Comunicación",items:[
              {i:"💬",t:"WhatsApp 24/7",d:"Responde automáticamente en tus grupos existentes. Los vecinos no instalan nada."},
              {i:"📢",t:"Comunicados con confirmación de lectura",d:"Avisos, convocatorias, recordatorios. Sabes quién lo ha leído."},
              {i:"🗳️",t:"Votaciones por WhatsApp",d:"Conteo automático con quórum según LPH."},
            ]},
            {cat:"Gestión diaria",items:[
              {i:"📋",t:"Panel de gestión completo",d:"Todas las comunidades en un sitio. Filtra, responde, cierra."},
              {i:"🔧",t:"Contacto automático con gremios",d:"Incidencia de fontanería → contacta a tu fontanero automáticamente."},
              {i:"💰",t:"Protocolo de morosidad (Art. 21)",d:"Avisos → burofax → certificación → monitorio. Automático."},
              {i:"📧",t:"Lee y clasifica tus emails",d:"La IA lee correos de vecinos y proveedores. Sugiere respuesta. Tú apruebas."},
            ]},
            {cat:"Documentación",items:[
              {i:"📸",t:"Actas desde foto",d:"Foto al acta → pasa a limpio → resumen por puntos → acciones a seguir."},
              {i:"🗂️",t:"Archivo digital por comunidad",d:"Incidencias, actas, fotos, contratos. Todo organizado automáticamente."},
              {i:"📷",t:"Registro fotográfico",d:"Fotos de incidencias archivadas. Historial visual antes/después."},
              {i:"📄",t:"Generador de documentos",d:"Convocatorias, certificados de deuda, requerimientos. Automático."},
            ]},
            {cat:"Inteligencia",items:[
              {i:"⚖️",t:"Consultas legales rápidas",d:"Pregúntale sobre LPH. Responde con artículo y pasos a seguir."},
              {i:"📊",t:"Informes automáticos para Juntas",d:"Se genera cada mes. Listo para imprimir y presentar."},
              {i:"🔔",t:"Alertas de contratos y revisiones",d:"Avisa 30 días antes de vencimientos. ITE, ascensor, seguros."},
              {i:"🧮",t:"Calculador de derramas",d:"Introduce importe, calcula cuota por coeficiente."},
              {i:"🛡️",t:"Gestión de siniestros",d:"Clasifica si es seguro comunitario o del propietario. Prepara el parte."},
              {i:"📈",t:"Historial como prueba legal",d:"Todo documentado con fecha y hora. Válido para Juntas y tribunales."},
            ]},
          ].map((cat,ci)=>(
            <div key={ci}>
              <div style={{fontSize:"11px",fontWeight:700,color:"var(--accent)",textTransform:"uppercase",letterSpacing:".08em",marginTop:ci>0?"16px":"0",marginBottom:"8px"}}>{cat.cat}</div>
              {cat.items.map((f,fi)=>(
                <div key={fi} style={{background:"var(--card)",borderRadius:"10px",padding:"14px",border:"1px solid var(--border)",marginBottom:"6px"}}>
                  <div style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                    <span style={{fontSize:"20px",flexShrink:0}}>{f.i}</span>
                    <div><div style={{fontSize:"14px",fontWeight:700,marginBottom:"2px"}}>{f.t}</div><div style={{fontSize:"13px",color:"var(--fg2)",lineHeight:1.5}}>{f.d}</div></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </S>

      {/* PRECIOS */}
      <S bg="var(--card)" id="precios">
        <div style={{textAlign:"center",marginBottom:"24px"}}>
          <Tag>Precios</Tag>
          <H>Sin sorpresas. Todo incluido.</H>
          <p style={{color:"var(--fg2)",fontSize:"14px",marginTop:"6px"}}>Precio por despacho, no por comunidad. Usa con todas las que quieras.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {[
            {name:"Starter",price:"79",per:"/mes",desc:"Hasta 15 comunidades",features:["WhatsApp IA 24/7","Panel de gestión","Clasificación automática","Respuestas con base legal","Contacto con gremios","Archivo por comunidad"],hl:false},
            {name:"Profesional",price:"149",per:"/mes",desc:"Hasta 40 comunidades",features:["Todo lo de Starter","Protocolo morosidad automático","Generador de documentos","Lector de emails","Informes para Juntas","Actas desde foto","Gestión de siniestros"],hl:true},
            {name:"Enterprise",price:"249",per:"/mes",desc:"Comunidades ilimitadas",features:["Todo lo de Profesional","Votaciones por WhatsApp","Consultas legales IA","Alertas contratos/ITE","Portal del presidente","Soporte prioritario"],hl:false},
          ].map((p,i)=>(
            <div key={i} style={{background:p.hl?"var(--green)":"var(--bg)",borderRadius:"14px",padding:"24px",border:p.hl?"none":"1px solid var(--border)",color:p.hl?"#fff":"var(--fg)"}}>
              {p.hl&&<div style={{fontSize:"10px",fontWeight:700,background:"rgba(255,255,255,.2)",display:"inline-block",padding:"3px 10px",borderRadius:"100px",marginBottom:"8px"}}>MÁS POPULAR</div>}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"6px"}}>
                <div>
                  <div style={{fontSize:"18px",fontWeight:800}}>{p.name}</div>
                  <div style={{fontSize:"12px",opacity:.7}}>{p.desc}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <span style={{fontSize:"36px",fontWeight:900}}>{p.price}€</span>
                  <span style={{fontSize:"13px",opacity:.7}}>{p.per}</span>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"4px",marginTop:"12px"}}>
                {p.features.map((f,fi)=>(
                  <div key={fi} style={{fontSize:"13px",display:"flex",gap:"6px",opacity:.9}}>
                    <span style={{color:p.hl?"#A3D3BB":"var(--green)"}}>✓</span>{f}
                  </div>
                ))}
              </div>
              <a href="#empezar" style={{display:"block",textAlign:"center",marginTop:"16px",padding:"12px",borderRadius:"8px",background:p.hl?"rgba(255,255,255,.15)":"var(--accent)",color:"#fff",fontWeight:700,fontSize:"14px",textDecoration:"none",border:p.hl?"1px solid rgba(255,255,255,.3)":"none"}}>
                Probar 14 días gratis
              </a>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"16px",fontSize:"12px",color:"var(--fg3)"}}>
          <strong>Sin tarjeta de crédito.</strong> IVA no incluido. Sin permanencia. Pago con Stripe o PayPal.
        </div>
      </S>

      {/* COMPARATIVA */}
      <S>
        <Tag>Comparativa</Tag>
        <H s="24px">¿Por qué AfincalIA?</H>
        <div style={{marginTop:"20px",fontSize:"13px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:"360px"}}>
            <thead><tr style={{background:"var(--gbg)"}}>
              <th style={{padding:"10px",textAlign:"left",fontWeight:500,color:"var(--fg3)",borderBottom:"2px solid var(--border)"}}></th>
              <th style={{padding:"10px",textAlign:"center",fontWeight:700,color:"var(--green)",borderBottom:"2px solid var(--green)"}}>AfincalIA</th>
              <th style={{padding:"10px",textAlign:"center",fontWeight:500,color:"var(--fg3)",borderBottom:"2px solid var(--border)"}}>Finky</th>
              <th style={{padding:"10px",textAlign:"center",fontWeight:500,color:"var(--fg3)",borderBottom:"2px solid var(--border)"}}>Fynkus</th>
            </tr></thead>
            <tbody>{[
              ["WhatsApp IA 24/7","✅","✅","❌"],
              ["Usa grupos existentes","✅","✅","❌"],
              ["Gestión incidencias","✅","Básica","✅"],
              ["Protocolo morosidad","✅ Auto","❌","Manual"],
              ["Generador documentos","✅","❌","❌"],
              ["Actas desde foto","✅","❌","❌"],
              ["Lector de emails","✅","❌","❌"],
              ["Informes para Juntas","✅","❌","Básico"],
              ["Contacto gremios auto","✅","❌","❌"],
              ["Contabilidad","Fase 2","❌","✅"],
              ["Precio desde","79€/mes","120€/mes","~3€/com"],
            ].map((r,i)=><tr key={i} style={{borderBottom:"1px solid var(--border)"}}>{r.map((c,j)=><td key={j} style={{padding:"8px 10px",textAlign:j===0?"left":"center",fontWeight:j===0?500:400,color:c==="✅"?"var(--green)":c==="❌"?"#DC2626":"var(--fg2)",fontSize:"12px"}}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </S>

      {/* TESTIMONIOS */}
      <S bg="var(--card)">
        <div style={{textAlign:"center",marginBottom:"20px"}}><H s="24px">Lo que dicen los administradores</H></div>
        {[
          {q:"Antes perdía 2 horas al día solo en WhatsApp. Ahora la IA responde el 70% y yo solo intervengo en lo importante.",n:"Laura M.",r:"42 comunidades · Madrid"},
          {q:"Los vecinos reciben respuesta inmediata. Me felicitaron en Junta. En 15 años, nunca me había pasado.",n:"Carlos P.",r:"28 comunidades · Sevilla"},
          {q:"12.000€ recuperados en cuotas impagadas en 3 meses con el protocolo automático.",n:"Ana R.",r:"35 comunidades · Valencia"},
        ].map((t,i)=>(
          <div key={i} style={{background:"var(--bg)",borderRadius:"12px",padding:"18px",border:"1px solid var(--border)",marginBottom:"10px"}}>
            <div style={{fontFamily:"var(--head)",fontSize:"24px",color:"var(--accent)",lineHeight:1}}>"</div>
            <div style={{fontSize:"14px",color:"var(--fg2)",lineHeight:1.6,margin:"6px 0 12px"}}>{t.q}</div>
            <div style={{fontSize:"13px",fontWeight:700}}>{t.n}</div>
            <div style={{fontSize:"11px",color:"var(--fg3)"}}>{t.r}</div>
          </div>
        ))}
      </S>

      {/* FAQ */}
      <S>
        <div style={{textAlign:"center",marginBottom:"24px"}}><H s="24px">Preguntas frecuentes</H></div>
        {[
          {q:"¿Los vecinos tienen que instalar algo?",a:"No. Solo usan WhatsApp como siempre. Ni apps, ni registros, ni formación."},
          {q:"¿Puedo usar mis grupos de WhatsApp actuales?",a:"Sí. Solo añades el número de AfincalIA a tus grupos existentes y empieza a funcionar. No hay que crear nada nuevo."},
          {q:"¿Necesito tarjeta de crédito para la prueba?",a:"No. 14 días gratis sin tarjeta, sin compromiso, sin permanencia. Solo tu email y NIF."},
          {q:"¿Qué pasa si AfincalIA se equivoca?",a:"AfincalIA es un asistente: sugiere y clasifica. Tú siempre tienes el control final. La responsabilidad es del administrador."},
          {q:"¿Mis datos y los de los vecinos están seguros?",a:"Cumplimos RGPD y LOPDGDD. Datos cifrados en servidores de la Unión Europea. Nunca vendemos datos. Detalle completo en Política de Privacidad."},
          {q:"¿El precio es por comunidad o por despacho?",a:"Por despacho. Pagas una cuota fija según tu plan y gestionas todas las comunidades incluidas. Sin sorpresas."},
          {q:"¿Cómo pago?",a:"Stripe (tarjeta) o PayPal. Facturación mensual con IVA desglosado. Cancelas cuando quieras desde tu panel."},
          {q:"¿Necesito un número de WhatsApp nuevo?",a:"Recomendamos un número dedicado de WhatsApp Business (~5€/mes con SIM prepago). Así separas trabajo y vida personal."},
        ].map((item,i)=>(
          <div key={i} style={{borderBottom:"1px solid var(--border)"}}>
            <button onClick={()=>setFaq(faq===i?null:i)} style={{width:"100%",padding:"14px 0",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--body)",textAlign:"left"}}>
              <span style={{fontSize:"14px",fontWeight:600,color:"var(--fg)",flex:1,paddingRight:"12px"}}>{item.q}</span>
              <span style={{fontSize:"18px",color:"var(--fg3)",transition:"transform .2s",transform:faq===i?"rotate(45deg)":"none"}}>+</span>
            </button>
            {faq===i&&<div style={{padding:"0 0 14px",fontSize:"14px",color:"var(--fg2)",lineHeight:1.6}}>{item.a}</div>}
          </div>
        ))}
      </S>

      {/* CTA FINAL */}
      <section id="empezar" style={{padding:"56px 20px",textAlign:"center",background:"var(--green)",color:"#fff"}}>
        <div style={{maxWidth:"440px",margin:"0 auto"}}>
          <h2 style={{fontFamily:"var(--head)",fontSize:"clamp(22px,5vw,32px)",fontWeight:900,marginBottom:"8px"}}>Empieza hoy.</h2>
          <p style={{fontSize:"15px",opacity:.85,marginBottom:"24px"}}>14 días gratis · Sin tarjeta · Sin permanencia</p>
          <div style={{background:"rgba(255,255,255,.1)",borderRadius:"14px",padding:"20px",border:"1px solid rgba(255,255,255,.12)"}}>
            <input placeholder="Tu email profesional" style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:"15px",fontFamily:"var(--body)",outline:"none",marginBottom:"8px"}}/>
            <input placeholder="Tu nombre" style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:"15px",fontFamily:"var(--body)",outline:"none",marginBottom:"8px"}}/>
            <input placeholder="NIF" style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:"15px",fontFamily:"var(--body)",outline:"none",marginBottom:"8px"}}/>
            <input placeholder="Nº de comunidades que gestionas" style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid rgba(255,255,255,.2)",background:"rgba(255,255,255,.08)",color:"#fff",fontSize:"15px",fontFamily:"var(--body)",outline:"none",marginBottom:"12px"}}/>
            <button style={{width:"100%",padding:"16px",borderRadius:"10px",border:"none",background:"var(--accent)",color:"#fff",fontWeight:700,fontSize:"16px",cursor:"pointer",fontFamily:"var(--body)"}}>Solicitar acceso gratuito →</button>
          </div>
          <div style={{fontSize:"10px",opacity:.5,marginTop:"12px"}}>Al registrarte aceptas los Términos de Servicio y la Política de Privacidad. No compartimos tus datos.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"28px 20px",background:"var(--dark)",color:"rgba(255,255,255,.35)",textAlign:"center",fontSize:"10px",lineHeight:2.2}}>
        ©️ 2026 AfincalIA · Asistente Profesional para Administradores de Fincas<br/>
        Ley 49/1960 de Propiedad Horizontal · RGPD · LOPDGDD · LSSI-CE<br/>
        AfincalIA es herramienta de asistencia. No sustituye asesoramiento jurídico.<br/>
        <span style={{opacity:.5}}>Aviso legal · Privacidad · Cookies · Términos</span><br/>
        <span style={{opacity:.4}}>Pago seguro: Stripe + PayPal</span>
      </footer>
    </div>
  );
}
