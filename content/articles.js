export const articles = [
  {
    slug:"whatsapp-incidencias-administracion-fincas", category:"WhatsApp", readingTime:"6 min",
    title:"Cómo convertir un WhatsApp de un vecino en una incidencia trazable",
    description:"Un flujo práctico para que un mensaje no se quede en una respuesta aislada y llegue a responsable, tarea y resolución.",
    intro:"El problema no es recibir mensajes por WhatsApp. El problema aparece cuando la conversación, la incidencia y el trabajo del equipo viven en lugares distintos.",
    sections:[
      {title:"1. Identificar antes de responder",paragraphs:["El primer paso es relacionar el contacto con su comunidad y comprobar el contexto disponible. Sin esa identificación, una respuesta rápida puede ser irrelevante o mezclar información que no corresponde.","Si la identidad o la comunidad no están claras, el caso debe pasar a revisión. La velocidad no compensa una asociación incorrecta."]},
      {title:"2. Distinguir consulta de incidencia",paragraphs:["Una pregunta informativa puede resolverse con una respuesta basada en una fuente validada. Un aviso que exige una actuación debe convertirse en incidencia, aunque también se responda al vecino.","La regla útil es sencilla: si alguien debe hacer algo después del mensaje, debe existir un objeto de trabajo con estado y responsable."]},
      {title:"3. Asignar el siguiente paso",paragraphs:["La incidencia necesita prioridad, responsable y una acción concreta. «Revisar fuga» es más accionable que guardar una captura del chat. La persona asignada debe ver el mensaje original y el contexto sin reconstruirlos."]},
      {title:"4. Cerrar el bucle",paragraphs:["Cada cambio de estado debe alimentar una cronología compartida. Así, cuando el vecino vuelve a preguntar, el equipo puede explicar qué se ha hecho y qué falta sin empezar de cero.","AfincalIA reúne estas etapas en un solo flujo y mantiene la revisión humana donde el despacho la necesita."]},
    ],
  },
  {
    slug:"preguntas-evaluar-ia-administracion-fincas", category:"Evaluación de IA", readingTime:"7 min",
    title:"12 preguntas antes de incorporar IA a un despacho de administración de fincas",
    description:"Una lista para separar una demo llamativa de una herramienta que pueda trabajar con seguridad y aportar valor operativo.",
    intro:"Una buena evaluación no empieza por preguntar qué modelo de IA utiliza el proveedor. Empieza por el problema del despacho, el control de los datos y el resultado que se podrá medir.",
    sections:[
      {title:"Problema y resultado",paragraphs:["1. ¿Qué tarea concreta reducirá primero? 2. ¿Cómo se medirá el tiempo o los errores antes y después? 3. ¿La herramienta solo responde o también conecta el mensaje con el trabajo posterior?"]},
      {title:"Contexto y calidad",paragraphs:["4. ¿Cómo identifica al contacto y la comunidad? 5. ¿Qué fuentes puede utilizar para responder? 6. ¿Qué ocurre cuando la información es ambigua o insuficiente?"]},
      {title:"Control y seguridad",paragraphs:["7. ¿Qué acciones requieren aprobación humana? 8. ¿Cómo se separan los datos de comunidades y despachos? 9. ¿Qué queda registrado para poder revisar una decisión?"]},
      {title:"Implantación",paragraphs:["10. ¿Puede empezar sin migrar todo el despacho? 11. ¿Quién acompaña al equipo durante el piloto? 12. ¿Qué criterio objetivo permitirá continuar o parar al terminar la prueba?","Un piloto serio debe responder estas preguntas con un flujo real, datos controlados y métricas acordadas antes de comenzar."]},
    ],
  },
  {
    slug:"chatbot-erp-capa-operativa-administradores-fincas", category:"Producto", readingTime:"5 min",
    title:"Chatbot, software contable o capa operativa: qué resuelve cada uno",
    description:"Tres categorías distintas que conviene no confundir al modernizar un despacho de administración de fincas.",
    intro:"No todo software con inteligencia artificial sustituye lo mismo. Entender la categoría evita comprar una herramienta correcta para un problema distinto.",
    sections:[
      {title:"El software contable y de gestión",paragraphs:["Es el sistema central para contabilidad, recibos, liquidaciones y procesos administrativos estructurados. La capa operativa no debe prometer reemplazarlo si no cubre esas funciones."]},
      {title:"El chatbot",paragraphs:["Su fortaleza es atender preguntas en un canal. Puede aliviar consultas repetidas, pero el valor se limita si una avería respondida no crea trabajo, responsable ni seguimiento."]},
      {title:"La capa operativa",paragraphs:["Conecta conversación, conocimiento validado y ejecución. Su unidad de valor no es el mensaje contestado, sino el caso que avanza desde la entrada hasta la resolución con una historia visible."]},
      {title:"Cómo decidir",paragraphs:["Si el problema principal es contable, empieza por el ERP. Si solo quieres ampliar horario de atención, evalúa un chatbot. Si el cuello de botella está entre los mensajes y el trabajo del equipo, evalúa una capa operativa como AfincalIA."]},
    ],
  },
  {
    slug:"piloto-ia-administracion-fincas-30-dias", category:"Piloto", readingTime:"6 min",
    title:"Cómo diseñar un piloto de IA de 30 días que produzca una decisión",
    description:"Alcance, métricas y reglas para probar IA sin migrar todo el despacho ni confundir actividad con resultado.",
    intro:"Un piloto útil no intenta automatizarlo todo. Elige un problema frecuente, fija una línea base y termina con una decisión basada en evidencia.",
    sections:[
      {title:"Semana 1: elegir el flujo",paragraphs:["Selecciona un caso repetible: consultas de WhatsApp, incidencias o preparación de actas. Registra cuántos casos entran, cuánto tardan en gestionarse y dónde se producen esperas o retrabajo."]},
      {title:"Semana 2: configurar controles",paragraphs:["Define usuarios, permisos, fuentes de información, reglas de revisión y datos que se pueden utilizar. Empieza con una muestra controlada antes de ampliar el alcance."]},
      {title:"Semana 3: medir trabajo real",paragraphs:["No midas solo respuestas generadas. Mide casos correctamente identificados, incidencias asignadas, tiempos de primera actuación, revisiones necesarias y asuntos cerrados."]},
      {title:"Semana 4: decidir",paragraphs:["Compara con la línea base, reúne al equipo y documenta objeciones. Continuar tiene sentido cuando el ahorro y la mejora de seguimiento compensan el esfuerzo de revisión y adopción.","El piloto fundador de AfincalIA sigue esta lógica: un flujo prioritario, acompañamiento y decisión al final de 30 días."]},
    ],
  },
];

export function getArticle(slug){return articles.find((article)=>article.slug===slug)}
