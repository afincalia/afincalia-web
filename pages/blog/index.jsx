import { useState } from "react";
import Link from "next/link";

const V={verde:"#1A6B42",osc:"#0C3521",pale:"#EBF4EE",borde:"#C8DFCF",rojo:"#C4362C",tx:"#111917",sub:"#3D4D44",mut:"#9CA3AF",bg:"#FAFAF8",alt:"#F2F5F2",w:"#fff",azul:"#1E4FA3",amarillo:"#D97706"};
const WA="https://wa.me/34614557419?text=Hola%2C%20me%20interesa%20AfincalIA";

function Logo(){return(<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{display:"flex",flexDirection:"column",gap:2}}><div style={{display:"flex",gap:2}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div><div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:V.rojo}}/>)}</div></div><span style={{fontFamily:"Georgia,serif",fontSize:20,color:V.tx}}>Afincal<span style={{color:V.verde}}>IA</span></span></div>);}

const ARTS=[
  {
    cat:"Novedades Legales",min:"5 min",dest:true,
    tit:"Reforma LPH 2025: cómo frenar los pisos turísticos en tu edificio",
    desc:"La LO 1/2025 cambia las reglas: ya no hace falta unanimidad. Basta con 3 de cada 5 propietarios para limitar los pisos turísticos en tu comunidad.",
    fecha:"8 ene 2026",
    body:[
      {h:"¿Qué cambia con la LO 1/2025?",p:"Hasta 2025, prohibir o limitar el uso turístico de viviendas requería unanimidad en junta, lo que en la práctica hacía imposible el acuerdo. La nueva ley baja el umbral a tres quintas partes de propietarios y cuotas de participación, abriendo la puerta a que las comunidades recuperen el control de sus edificios."},
      {h:"Cómo aplicarlo paso a paso",p:"El primer paso es incluir el punto en el orden del día de la próxima junta ordinaria o extraordinaria. Tras la votación, el acuerdo debe inscribirse en el Registro de la Propiedad para ser oponible a terceros. Sin inscripción, el acuerdo no afecta a quienes no fueron parte de la junta."},
      {h:"Qué comunidades pueden actuar ya",p:"Cualquier comunidad que no tenga ya prohibido el uso turístico en sus estatutos puede votarlo en junta. Si los estatutos ya lo prohíben, no hay nada que hacer. Si los permiten o no dicen nada, es el momento de actuar antes de que proliferen más licencias."},
      {h:"Importante: efectos limitados a nuevos usos",p:"El acuerdo no afecta a licencias turísticas concedidas antes de que se adoptara el acuerdo e inscribiera en el Registro. Solo aplica a nuevos usos posteriores. Consulta con un abogado para casos concretos donde ya haya licencias vigentes."},
      {h:"Cómo te ayuda AfincalIA",p:"El asistente conoce esta normativa actualizada y puede responder a los vecinos que pregunten sobre pisos turísticos citando el artículo exacto. Cuando llega la junta, genera automáticamente el acta con los acuerdos y votaciones correctamente registrados, lista para enviar e inscribir."},
    ]
  },
  {
    cat:"Actas IA",min:"4 min",
    tit:"Cómo generar el acta de una junta en 5 minutos desde el móvil",
    desc:"Foto o audio del borrador. AfincalIA hace el resto. Acuerdos numerados, votaciones registradas y tareas asignadas en minutos.",
    fecha:"15 ene 2026",
    body:[
      {h:"El problema de las actas",p:"El acta de una junta de propietarios es obligatoria por ley (Art. 19 LPH) y debe reflejar todos los acuerdos adoptados, las votaciones y los asistentes. En la práctica, muchos administradores la redactan de memoria días después de la reunión, con el riesgo de olvidar detalles o cometer errores que pueden tener consecuencias legales."},
      {h:"El nuevo flujo con AfincalIA",p:"Al terminar la junta, el administrador hace una foto al borrador que tomó durante la reunión — aunque sea manuscrito y con tachones — o graba un audio de 2 o 3 minutos dictando los puntos clave mientras conduce de vuelta al despacho. AfincalIA procesa la imagen o el audio y genera un acta estructurada con todos los elementos legalmente requeridos."},
      {h:"Qué incluye el acta generada",p:"El sistema extrae y organiza automáticamente: número de orden del día, asistentes y representados, acuerdos adoptados con el resultado de cada votación, tareas pendientes con el responsable y el plazo, y fecha de la próxima convocatoria si se acordó. Todo numerado y formateado correctamente."},
      {h:"El historial por comunidad",p:"Cada acta queda archivada bajo la comunidad correspondiente. El administrador puede acceder a cualquier acta anterior, buscar por fecha o por acuerdo concreto, y compartirla directamente con el presidente o los propietarios por WhatsApp o email desde el mismo panel. Nada se pierde, nada queda en papel sin digitalizar."},
      {h:"¿Es válida legalmente el acta generada por IA?",p:"El acta generada por AfincalIA tiene el mismo valor legal que cualquier acta redactada por el administrador, siempre que sea firmada por el presidente y el secretario conforme al Art. 19 LPH. AfincalIA genera el documento; la validación legal la aportan las firmas. El sistema no sustituye ese paso."},
    ]
  },
  {
    cat:"Morosidad",min:"7 min",
    tit:"Vecino moroso: los 4 pasos legales que debe seguir el administrador",
    desc:"El Art. 21 LPH es la herramienta del administrador. Para deudas menores de 2.000€ no hace falta abogado. Guía paso a paso.",
    fecha:"14 feb 2026",
    body:[
      {h:"Paso 1 — Certifica la deuda en junta",p:"La junta de propietarios debe aprobar la liquidación de la deuda concreta. El acuerdo, firmado por administrador y presidente, es el título ejecutivo que necesitarás en el juzgado. Sin este paso, el procedimiento monitorio no puede comenzar. Este punto puede incluirse en cualquier junta ordinaria o extraordinaria."},
      {h:"Paso 2 — Requerimiento fehaciente",p:"Envía un burofax con acuse de recibo al propietario moroso con el importe exacto de la deuda y el plazo para pagarla. Este paso no es estrictamente obligatorio por ley pero refuerza enormemente el expediente y en muchos casos provoca el pago voluntario evitando el juzgado. También inicia el cómputo de los intereses de demora."},
      {h:"Paso 3 — Procedimiento monitorio",p:"Para deudas inferiores a 2.000€ puedes presentar tú mismo el escrito de solicitud de proceso monitorio en el juzgado de primera instancia del municipio donde está el inmueble. El juzgado notifica al deudor y le da 20 días para pagar u oponerse formalmente. No necesitas abogado ni procurador para este paso."},
      {h:"Paso 4 — Ejecución o juicio declarativo",p:"Si el deudor no paga ni se opone en 20 días, el juzgado dicta auto de ejecución que permite embargar la vivienda o las rentas del alquiler. Si hay oposición, el procedimiento se convierte en juicio declarativo y necesitarás abogado y procurador. Para deudas superiores a 2.000€ necesitas ambos desde el inicio."},
      {h:"AfincalIA gestiona este protocolo automáticamente",p:"El asistente detecta cuando un vecino menciona impagos en el grupo, aplica el protocolo del Art. 21 y registra cada comunicación en el expediente de morosidad de esa comunidad. El administrador recibe un resumen actualizado del estado de cada deuda y los plazos pendientes."},
    ]
  },
  {
    cat:"RGPD y Legal",min:"6 min",
    tit:"WhatsApp en comunidades y RGPD: la AEPD ya ha multado más de 200 veces",
    desc:"Los riesgos son reales y las multas llegan a 20.000€. Cómo proteger tu despacho con un guardián que vigila por ti.",
    fecha:"5 mar 2026",
    body:[
      {h:"El riesgo que muchos administradores ignoran",p:"Desde 2020 la AEPD ha sancionado a más de 200 comunidades de propietarios. El motivo más frecuente no es una brecha de seguridad compleja — es algo tan cotidiano como que el presidente comparte el número de cuenta de un moroso en el grupo de WhatsApp, o que alguien publica un parte médico de un vecino."},
      {h:"Qué tipos de datos son problemáticos en el grupo",p:"Son datos problemáticos: números de cuenta bancaria e IBAN, DNI o NIE, datos de salud o justificantes médicos, información sobre procedimientos judiciales en curso, fotografías de personas sin su consentimiento explícito, y cualquier dato que identifique a una persona en un contexto que no requiere compartirlo con todos los propietarios."},
      {h:"La responsabilidad recae sobre el administrador",p:"Como encargado del tratamiento de datos, el administrador de fincas tiene obligaciones activas bajo el RGPD. No es suficiente con no ser quien comparte los datos. Debes tener medidas técnicas y organizativas activas para evitar que ocurra. La pasividad no es una defensa válida ante la AEPD."},
      {h:"Qué detecta y hace AfincalIA en tiempo real",p:"El guardián RGPD analiza los mensajes del grupo de forma continua. Cuando detecta un posible dato sensible — un IBAN, un DNI, datos de salud — envía automáticamente un aviso visible en el grupo, notifica al administrador con el detalle del incidente, y registra todo el evento con marca de tiempo. Esta documentación demuestra diligencia activa ante cualquier inspección."},
      {h:"El contrato DPA que te protege",p:"AfincalIA incluye desde el primer día un contrato de encargado del tratamiento (DPA) conforme al Art. 28 del RGPD y la LOPDGDD. Los datos se almacenan en servidores en Alemania (UE), cumpliendo los Arts. 44-49 sobre transferencias internacionales. Esto es exactamente lo que necesitas para demostrar cumplimiento proactivo ante la AEPD."},
    ]
  },
  {
    cat:"RGPD y Legal",min:"5 min",
    tit:"Contrato DPA: qué es, por qué es obligatorio y cómo conseguirlo",
    desc:"Muchos administradores no tienen el contrato de encargado del tratamiento. Sin él, la AEPD puede sancionar aunque no haya habido ninguna brecha.",
    fecha:"20 feb 2026",
    body:[
      {h:"Qué es exactamente un contrato DPA",p:"El Data Processing Agreement, o contrato de encargado del tratamiento, es el documento que regula cómo una empresa trata datos personales en nombre de otra. El Art. 28 del RGPD lo exige de forma expresa cuando un tercero trata datos personales por cuenta del responsable del tratamiento."},
      {h:"Por qué el administrador de fincas lo necesita",p:"El administrador trata datos personales de los propietarios en nombre de la comunidad: nombres completos, DNI, IBAN, números de teléfono, correos electrónicos, datos sobre deudas y situaciones legales. Si para gestionar esos datos utiliza software de terceros, aplicaciones en la nube o servicios de comunicación, necesita un DPA con cada proveedor."},
      {h:"Qué pasa si no tienes DPA",p:"La ausencia de DPA cuando es legalmente obligatorio puede ser sancionada por la AEPD como infracción grave del Art. 83.4 del RGPD. Las multas pueden llegar hasta 10 millones de euros o el 2% de la facturación global, aunque en la práctica las sanciones a administradores de fincas en España han estado entre 1.000€ y 15.000€."},
      {h:"Qué debe incluir el DPA para ser válido",p:"El contrato debe especificar el objeto y duración del tratamiento, la naturaleza y finalidad del tratamiento, el tipo de datos personales y las categorías de interesados, las obligaciones y derechos del responsable, y las medidas de seguridad técnicas y organizativas aplicadas por el encargado."},
      {h:"Cómo lo resuelve AfincalIA",p:"AfincalIA incluye un contrato DPA completo desde el primer día de suscripción, disponible para descarga en el panel de administración. Cubre todos los datos tratados a través del asistente, con servidores en Alemania (UE). No requiere gestión adicional por parte del administrador — el contrato está listo para firmar desde el momento de la activación."},
    ]
  },
  {
    cat:"Comparativas",min:"8 min",
    tit:"Software para administradores de fincas: comparativa completa 2026",
    desc:"Fynkus, Gesfincas, Fincora, Finky y AfincalIA. Qué ofrece cada uno, qué cuesta y para quién es mejor.",
    fecha:"1 abr 2026",
    body:[
      {h:"El mercado en 2026",p:"El software de gestión para administradores de fincas ha madurado notablemente. Gesfincas y Fynkus dominan el mercado tradicional de gestión contable y documental. En el segmento de automatización e IA han aparecido Fincora, Finky y AfincalIA con propuestas muy distintas entre sí."},
      {h:"Gesfincas y Fynkus — gestión clásica",p:"Son programas de gestión completos: contabilidad de comunidades, generación de recibos y remesas, convocatorias de junta, control de incidencias y proveedores. Fynkus ha crecido rápido y tiene buena integración bancaria. Precio orientativo: desde 80€/mes según módulos. Ninguno ofrece atención automática por WhatsApp ni guardián RGPD."},
      {h:"Finky y Fincora — chatbots simples",p:"Son asistentes de chat que responden preguntas frecuentes de vecinos. Útiles para descargar el volumen de mensajes más repetitivos. Sin embargo, no tienen LPH verificada en tiempo real, no gestionan actas, no tienen protocolo de morosidad integrado y no incluyen vigilancia RGPD activa del grupo."},
      {h:"AfincalIA — automatización completa",p:"AfincalIA es el único que combina en un solo producto: atención WhatsApp 24h con LPH verificada, guardián RGPD activo que vigila el grupo, generación de actas desde foto o audio, protocolo completo de morosidad Art. 21 y expediente digital por comunidad. El plan Despacho incluye integración directa con Gesfincas y Fynkus."},
      {h:"¿Con cuál me quedo según mi situación?",p:"Si ya usas Gesfincas o Fynkus y quieres añadir automatización: AfincalIA los complementa sin sustituirlos. Si empiezas desde cero y tu prioridad es la automatización, la atención al vecino y el cumplimiento RGPD: AfincalIA cubre todos los frentes desde 69€/mes. Si gestionas más de 150 comunidades con varios administradores: el plan Enterprise incluye todo."},
    ]
  },
  {
    cat:"Gestión Práctica",min:"4 min",
    tit:"Las 5 consultas que reciben todos los administradores de fincas cada semana",
    desc:"El 80% de los mensajes de WhatsApp son siempre los mismos. Aquí están las respuestas legales correctas y cómo automatizarlas.",
    fecha:"10 abr 2026",
    body:[
      {h:"Por qué los vecinos siempre preguntan lo mismo",p:"La Ley de Propiedad Horizontal lleva décadas vigente pero la mayoría de propietarios no la conoce ni tiene interés en leerla. El administrador se convierte en el punto de referencia para cualquier duda, por pequeña que sea. Con 20 comunidades de 30 vecinos cada una, son potencialmente 600 personas enviando el mismo tipo de mensaje."},
      {h:"1. El ascensor no funciona — Art. 10.1 LPH",p:"Es la consulta más urgente y la que más estrés genera. La ley obliga a la comunidad a mantener los servicios comunes en buen estado de funcionamiento. El administrador debe contactar con la empresa de mantenimiento de forma inmediata. AfincalIA lo clasifica como urgente, avisa al administrador y registra la incidencia con marca de tiempo."},
      {h:"2. Ruido del vecino — Art. 7.2 LPH",p:"Las actividades molestas, insalubres, nocivas, peligrosas o ilícitas están expresamente prohibidas. El proceso: el afectado lo comunica por escrito al administrador, que debe requerir al infractor que cese. Si continúa, la comunidad puede ejercer la acción de cesación ante el juzgado. AfincalIA registra la queja y explica el procedimiento paso a paso."},
      {h:"3. Gotera en el portal — Art. 10.1 LPH",p:"Las reparaciones necesarias para mantener el inmueble en condiciones de habitabilidad son obligación de la comunidad, con cargo al fondo de reserva. Si no hay fondos suficientes, se convoca junta para aprobar una derrama. AfincalIA registra la incidencia, recuerda los plazos de seguimiento y genera el expediente de la reparación."},
      {h:"4. Piso turístico — Art. 17.12 LPH",p:"Desde la LO 1/2025 basta con tres quintas partes de propietarios para limitar o prohibir el uso turístico. AfincalIA explica la normativa actualizada al vecino y puede ayudar al administrador a preparar el punto del orden del día para la próxima junta con el texto correcto del acuerdo propuesto."},
      {h:"5. Vecino que no paga — Art. 21 LPH",p:"El procedimiento monitorio es la herramienta legal para reclamar sin abogado para deudas menores de 2.000€. AfincalIA aplica el protocolo completo desde el primer mensaje: registra la deuda, informa al propietario de las consecuencias legales, y genera el expediente de morosidad con toda la documentación ordenada para cuando haga falta."},
    ]
  },
  {
    cat:"Productividad",min:"5 min",
    tit:"Cómo recuperar 3 horas diarias como administrador de fincas",
    desc:"Un administrador medio dedica entre 2 y 4 horas al día a responder mensajes de WhatsApp. Así es cómo se pueden recuperar sin perder calidad de servicio.",
    fecha:"3 mar 2026",
    body:[
      {h:"El tiempo que se va sin que te des cuenta",p:"Un mensaje de WhatsApp parece cosa de un minuto. Pero entre leerlo, pensar la respuesta correcta, redactarla, enviarla y esperar confirmación, suelen pasar entre 3 y 8 minutos reales. Con 30 mensajes al día — una cifra conservadora para un despacho con 20 comunidades — estamos hablando de entre 90 y 240 minutos diarios solo en mensajes."},
      {h:"El problema no es el tiempo, es la interrupción",p:"Más que el tiempo total, el problema es que WhatsApp interrumpe continuamente el trabajo de concentración. Cada notificación rompe el hilo de lo que se estaba haciendo — revisar cuentas, preparar una junta, negociar con un proveedor. El coste real no es solo el tiempo de respuesta sino el tiempo de recuperación cognitiva después de cada interrupción."},
      {h:"El 80% de esos mensajes no requieren criterio",p:"Ascensores averiados, goteras en el portal, ruido de vecinos, preguntas sobre juntas y plazos. Preguntas que tienen una respuesta conocida y correcta, que están en la LPH, y que no requieren el criterio ni la experiencia del administrador — solo conocimiento de la normativa y un registro adecuado. Eso es exactamente lo que hace la automatización."},
      {h:"Qué ocurre cuando automatizas esas respuestas",p:"El asistente responde en segundos con la información correcta y el artículo de ley correspondiente. Registra la incidencia. Avisa al administrador solo cuando hay algo que requiere realmente su intervención. Las 2-3 horas diarias se recuperan. Los vecinos reciben mejor servicio porque la respuesta es inmediata. Y el administrador puede dedicar su tiempo a lo que realmente genera valor."},
      {h:"Cómo usar bien el tiempo recuperado",p:"Los administradores que más crecen no trabajan más horas — trabajan en cosas diferentes. Visitar comunidades, negociar contratos de mantenimiento, captar nuevos despachos, mejorar los procesos internos. La automatización no reemplaza al administrador; libera su tiempo para el trabajo que solo él puede hacer."},
    ]
  },
  {
    cat:"Novedades Legales",min:"4 min",
    tit:"Real Decreto 1312/2024: qué cambia para las comunidades de propietarios",
    desc:"El decreto complementa la reforma LPH y actualiza los procedimientos de accesibilidad, eficiencia energética y responsabilidad del administrador.",
    fecha:"15 ene 2026",
    body:[
      {h:"Contexto: reforma continua de la LPH",p:"El Real Decreto 1312/2024 se aprobó como desarrollo reglamentario de la reforma de la Ley de Propiedad Horizontal que entró en vigor a principios de 2025. Complementa la LO 1/2025 sobre pisos turísticos y añade obligaciones específicas en materia de accesibilidad, eficiencia energética y comunicación entre la comunidad y las administraciones públicas."},
      {h:"Accesibilidad: nuevas obligaciones",p:"El decreto refuerza las obligaciones de accesibilidad en edificios con más de 10 años de antigüedad. Las comunidades deben realizar una inspección periódica de las instalaciones de accesibilidad y el administrador es responsable de comunicar las deficiencias detectadas a los propietarios en un plazo máximo de 30 días desde la inspección."},
      {h:"Eficiencia energética: mayoría simple suficiente",p:"Una de las novedades más relevantes es que ciertas obras de mejora de eficiencia energética — instalación de paneles solares, sistemas de climatización eficiente, mejora del aislamiento térmico — pueden aprobarse ahora con mayoría simple en lugar de la mayoría cualificada anterior. Esto facilita notablemente la aprobación de estas mejoras en junta."},
      {h:"Responsabilidad del administrador amplificada",p:"El decreto aclara que el administrador tiene la obligación de informar proactivamente a la junta sobre los plazos legales de cumplimiento de las normativas de accesibilidad y eficiencia. No es suficiente esperar a que los propietarios pregunten — hay que comunicar activamente."},
      {h:"AfincalIA está actualizado con esta normativa",p:"La base de conocimiento de AfincalIA incluye este decreto y todas las modificaciones normativas de 2025 y 2026. Cuando un vecino o el administrador consulta sobre obras de mejora energética o accesibilidad, el asistente cita la normativa vigente actualizada, no la anterior. El sistema se actualiza con cada cambio legislativo relevante."},
    ]
  },
  {
    cat:"Gestión Práctica",min:"6 min",
    tit:"Cómo convocar correctamente una junta de propietarios: guía completa",
    desc:"Plazos, contenido del orden del día, quórum y notificaciones. Todo lo que el administrador necesita saber para que la junta sea válida.",
    fecha:"22 mar 2026",
    body:[
      {h:"Tipos de junta y cuándo convocarlas",p:"La Ley de Propiedad Horizontal distingue entre junta ordinaria y juntas extraordinarias. La junta ordinaria debe celebrarse al menos una vez al año, dentro del primer trimestre del ejercicio, para aprobar cuentas y presupuestos. Las juntas extraordinarias pueden convocarse cuando lo solicite el presidente, el administrador, o la cuarta parte de los propietarios que representen al menos el 25% de las cuotas."},
      {h:"Plazos de convocatoria — Art. 16 LPH",p:"La convocatoria debe enviarse a todos los propietarios con al menos 6 días de antelación para las juntas ordinarias. No hay plazo mínimo establecido legalmente para las extraordinarias, pero la doctrina recomienda un plazo razonable de al menos 3 días para que los propietarios puedan organizarse. La convocatoria debe enviarse al domicilio del propietario o al designado por este a efectos de notificaciones."},
      {h:"Qué debe contener el orden del día",p:"El orden del día es vinculante: solo pueden adoptarse acuerdos sobre los puntos expresamente incluidos. Debe incluir el lugar, fecha y hora de la reunión, los asuntos a tratar con suficiente detalle para que los propietarios puedan prepararse, y la indicación de si se celebra en primera o segunda convocatoria. Los acuerdos sobre puntos no incluidos son nulos."},
      {h:"Quórum y mayorías según el tipo de acuerdo",p:"La LPH establece mayorías distintas según la trascendencia del acuerdo. Mayoría simple para asuntos ordinarios de gestión. Tres quintas partes para instalar ascensores, suprimir barreras o limitar pisos turísticos. Unanimidad para modificar el título constitutivo o los estatutos. Conocer estas mayorías es crítico para evitar que los acuerdos sean impugnables."},
      {h:"AfincalIA automatiza las notificaciones y el acta",p:"El asistente puede recordar automáticamente a los propietarios la fecha y hora de la junta, gestionar confirmaciones de asistencia, y una vez celebrada, generar el acta desde el borrador o el audio del administrador. Todo queda archivado en el expediente de la comunidad con acceso inmediato cuando se necesite."},
    ]
  },
  {
    cat:"Productividad",min:"5 min",
    tit:"Expediente digital por comunidad: por qué cambia todo para el administrador",
    desc:"Un historial completo de cada comunidad — actas, incidencias, morosos, proveedores — accesible en segundos desde el móvil.",
    fecha:"28 mar 2026",
    body:[
      {h:"El problema del archivo disperso",p:"La mayoría de los administradores de fincas gestionan su información en tres o cuatro sitios distintos: el software de gestión para las cuentas, el email para las comunicaciones con propietarios, el WhatsApp para el día a día, y carpetas físicas o digitales para los documentos. Encontrar cualquier cosa — un acta de hace dos años, la última comunicación con un moroso, el presupuesto del fontanero — requiere buscar en varios lugares."},
      {h:"Qué es el expediente digital por comunidad",p:"AfincalIA crea y mantiene automáticamente un expediente digital para cada comunidad. Cada vez que se registra una incidencia, se genera un acta, se aplica el protocolo de morosidad o se recibe una comunicación relevante, queda archivado en el expediente de esa comunidad con su fecha y contexto. Sin intervención manual del administrador."},
      {h:"Lo que hay en cada expediente",p:"El expediente de cada comunidad contiene: todas las actas de junta desde el inicio, el historial completo de incidencias con su estado de resolución, el registro de morosos con cada paso del protocolo aplicado, las comunicaciones con proveedores, los avisos RGPD emitidos, y los plazos y vencimientos pendientes. Todo con búsqueda instantánea."},
      {h:"Por qué esto cambia la relación con los clientes",p:"Cuando un propietario llama preguntando qué se acordó en la junta de octubre de 2024, el administrador tiene la respuesta en tres segundos. Cuando la AEPD requiere documentar el tratamiento de datos, el expediente tiene todo registrado con marca de tiempo. Cuando hay que renovar un contrato con un proveedor, el historial de incidencias muestra exactamente cómo ha respondido."},
      {h:"El expediente como argumento de venta",p:"Un administrador que puede mostrar a un nuevo cliente un expediente digital organizado, con historial completo y acceso instantáneo, transmite profesionalidad y confianza que los competidores sin esta herramienta no pueden igualar. El expediente no es solo una herramienta de gestión — es también una ventaja competitiva visible."},
    ]
  },
  {
    cat:"Gestión Práctica",min:"3 min",
    tit:"Fondo de reserva en comunidades: cuánto debe tener y para qué sirve",
    desc:"La LPH obliga a mantener un fondo de reserva del 10% del presupuesto ordinario. Muchas comunidades lo ignoran. Consecuencias y cómo gestionarlo.",
    fecha:"5 abr 2026",
    body:[
      {h:"Qué es el fondo de reserva y quién lo regula",p:"El Art. 9.1.f de la LPH obliga a todas las comunidades de propietarios a constituir y mantener un fondo de reserva cuya titularidad corresponde a la comunidad. Este fondo está destinado a atender obras de conservación y reparación de la finca, así como a la contratación de seguro contra daños y de un servicio de mantenimiento del ascensor cuando exista."},
      {h:"¿Cuánto debe tener la comunidad en el fondo?",p:"La cantidad mínima del fondo de reserva debe ser al menos el 10% del último presupuesto ordinario aprobado. Si el presupuesto anual es de 50.000€, el fondo debe ser de al menos 5.000€. Este importe debe revisarse cada año al aprobar el nuevo presupuesto. Muchas comunidades no llegan a este mínimo y no son conscientes de las implicaciones."},
      {h:"Consecuencias de no tener el fondo mínimo",p:"La falta de fondo de reserva suficiente no está directamente sancionada por la LPH, pero tiene consecuencias prácticas importantes. Cuando surge una reparación urgente — el ascensor, una gotera grave, la fachada — la comunidad no tiene fondos y debe aprobar una derrama de urgencia. Esto genera conflictos, retrasos y a veces situaciones de riesgo para los propietarios."},
      {h:"Cómo gestionar el fondo correctamente",p:"El administrador debe informar en cada junta ordinaria del estado del fondo de reserva, compararlo con el mínimo legal, y proponer en su caso una dotación adicional para alcanzarlo. AfincalIA puede recordar automáticamente estos vencimientos al administrador y explicar a los vecinos que pregunten para qué sirve el fondo y por qué es obligatorio."},
    ]
  },
];

export default function Blog(){
  const [art,setArt]=useState(null);
  const [cat,setCat]=useState("Todos");
  const cats=["Todos",...[...new Set(ARTS.map(a=>a.cat))]];
  const lista=cat==="Todos"?ARTS:ARTS.filter(a=>a.cat===cat);

  if(art!==null){
    const a=ARTS[art];
    const catColor=a.cat==="RGPD y Legal"?V.azul:a.cat==="Morosidad"?V.amarillo:a.cat==="Actas IA"?V.verde:V.verde;
    return(
      <div style={{fontFamily:"system-ui,sans-serif",background:V.bg,minHeight:"100vh"}}>
        <style>{CSS}</style>
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${V.borde}`}}>
          <div style={{maxWidth:900,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Link href="/"><Logo/></Link></a>
            <button onClick={()=>setArt(null)} style={{background:V.pale,border:"none",borderRadius:100,padding:"8px 20px",cursor:"pointer",fontWeight:700,fontSize:13,color:V.verde,fontFamily:"system-ui"}}>← Volver al blog</button>
          </div>
        </nav>
        <div style={{background:V.osc,padding:"52px 20px 60px"}}>
          <div style={{maxWidth:720,margin:"0 auto"}}>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:20,flexWrap:"wrap"}}>
              <span style={{display:"inline-block",background:"rgba(255,255,255,.12)",color:"rgba(255,255,255,.85)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>{a.cat}</span>
              <span style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>⏱ {a.min} de lectura · 📅 {a.fecha}</span>
            </div>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(26px,5vw,44px)",lineHeight:1.08,color:V.w,marginBottom:16}}>{a.tit}</h1>
            <p style={{fontSize:16,color:"rgba(255,255,255,.55)",lineHeight:1.75}}>{a.desc}</p>
          </div>
        </div>
        <article style={{maxWidth:720,margin:"0 auto",padding:"52px 20px 96px"}}>
          {a.body.map((s,i)=>(
            <div key={i} style={{marginBottom:44}}>
              <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(18px,3vw,26px)",color:V.tx,marginBottom:14,lineHeight:1.2}}>{s.h}</h2>
              <p style={{fontSize:16,lineHeight:1.95,color:V.sub}}>{s.p}</p>
            </div>
          ))}
          <div style={{background:V.pale,borderRadius:20,padding:"32px 28px",border:`1px solid ${V.borde}`,marginTop:12}}>
            <div style={{fontSize:28,marginBottom:14}}>🤖</div>
            <p style={{fontWeight:700,fontSize:18,marginBottom:10,color:V.verde,fontFamily:"Georgia,serif"}}>AfincalIA lo gestiona automáticamente</p>
            <p style={{fontSize:15,color:V.sub,marginBottom:24,lineHeight:1.7}}>14 días gratis con el plan Profesional completo. Sin tarjeta. Operativo en menos de una hora.</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Link href="/precios" style={{display:"inline-block",background:V.verde,color:V.w,borderRadius:100,padding:"12px 28px",fontWeight:700,fontSize:15,textDecoration:"none"}}>Empezar gratis →</Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:7,background:"#25D366",color:V.w,borderRadius:100,padding:"12px 20px",fontWeight:700,fontSize:14,textDecoration:"none"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
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
          <Link href="/"><Logo/></Link></a>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Link href="/" style={{fontSize:14,color:V.sub,textDecoration:"none"}}>← Web</Link>
            <Link href="/precios" style={{background:V.verde,color:V.w,borderRadius:100,padding:"10px 22px",fontSize:14,fontWeight:700,textDecoration:"none"}}>14 días gratis</a>
          </div>
        </div>
      </nav>

      <div style={{background:V.osc,padding:"56px 20px 64px"}}>
        <div style={{maxWidth:720,margin:"0 auto",textAlign:"center"}}>
          <p style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".12em",marginBottom:16}}>Blog AfincalIA</p>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(30px,5vw,52px)",color:V.w,lineHeight:1.08,marginBottom:16}}>Actualidad en Propiedad Horizontal</h1>
          <p style={{fontSize:16,color:"rgba(255,255,255,.5)",lineHeight:1.75,maxWidth:480,margin:"0 auto"}}>LPH, RGPD, actas digitales y gestión de comunidades. Para administradores de fincas en España.</p>
        </div>
      </div>

      <div style={{background:V.alt,borderBottom:`1px solid ${V.borde}`,padding:"14px 20px",overflowX:"auto"}}>
        <div style={{maxWidth:980,margin:"0 auto",display:"flex",gap:8,whiteSpace:"nowrap"}}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)}
              style={{background:cat===c?V.verde:V.w,color:cat===c?V.w:V.sub,border:`1px solid ${cat===c?V.verde:V.borde}`,borderRadius:100,padding:"7px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"system-ui",transition:"all .2s",flexShrink:0}}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:980,margin:"0 auto",padding:"48px 20px 96px"}}>
        {cat==="Todos"&&(
          <div onClick={()=>setArt(0)} style={{border:`1px solid ${V.borde}`,borderRadius:20,overflow:"hidden",cursor:"pointer",marginBottom:32,transition:"box-shadow .2s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.12)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{background:`linear-gradient(135deg,${V.osc},${V.verde})`,padding:"44px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:240}}>
                <span style={{display:"inline-block",background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.9)",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:18}}>{ARTS[0].cat} · Destacado</span>
                <h2 style={{fontFamily:"Georgia,serif",fontSize:"clamp(22px,3vw,34px)",color:V.w,lineHeight:1.12,marginBottom:14}}>{ARTS[0].tit}</h2>
                <p style={{fontSize:15,color:"rgba(255,255,255,.6)",lineHeight:1.65,marginBottom:16}}>{ARTS[0].desc}</p>
                <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>📅 {ARTS[0].fecha} · ⏱ {ARTS[0].min}</div>
              </div>
              <div style={{background:"rgba(255,255,255,.12)",borderRadius:100,padding:"14px 28px",color:V.w,fontWeight:700,fontSize:15,whiteSpace:"nowrap",border:"1px solid rgba(255,255,255,.2)",flexShrink:0}}>Leer →</div>
            </div>
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:22}}>
          {(cat==="Todos"?lista.slice(1):lista).map((a)=>{
            const idx=ARTS.indexOf(a);
            const bc=a.cat==="RGPD y Legal"?"#EEF2FF":a.cat==="Morosidad"?"#FEF3C7":a.cat==="Actas IA"?"#DCFCE7":V.pale;
            const tc=a.cat==="RGPD y Legal"?V.azul:a.cat==="Morosidad"?V.amarillo:V.verde;
            return(
              <div key={idx} onClick={()=>setArt(idx)}
                style={{border:`1px solid ${V.borde}`,borderRadius:18,overflow:"hidden",cursor:"pointer",background:V.w,transition:"box-shadow .2s"}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.09)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
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
          <p style={{fontSize:16,color:"rgba(255,255,255,.55)",marginBottom:32,lineHeight:1.75}}>14 días gratis con el plan Profesional completo. Sin tarjeta. Operativo en menos de una hora.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/precios" style={{background:V.verde,color:V.w,borderRadius:100,padding:"15px 36px",fontSize:16,fontWeight:700,textDecoration:"none"}}>Empezar gratis →</a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:8,background:"transparent",color:V.w,border:"2px solid rgba(255,255,255,.3)",borderRadius:100,padding:"14px 28px",fontSize:15,fontWeight:700,textDecoration:"none"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
  body{overflow-x:hidden;-webkit-font-smoothing:antialiased;}
  button:focus{outline:none;}
`;
