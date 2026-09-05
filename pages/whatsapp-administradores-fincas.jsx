import SearchLanding from "../components/SearchLanding";

export default function WhatsAppAdministradores(){return <SearchLanding
  metaTitle="WhatsApp para administradores de fincas"
  description="Organiza las consultas de WhatsApp de tu despacho: identifica comunidad, prepara respuestas verificadas y convierte mensajes en incidencias y tareas."
  path="/whatsapp-administradores-fincas"
  eyebrow="WhatsApp para administradores de fincas"
  title="WhatsApp deja de ser una bandeja de entrada sin dueño."
  intro="AfincalIA relaciona cada conversación con la comunidad correcta, recupera contexto validado y ayuda al equipo a responder, asignar y seguir el caso sin reconstruirlo desde cero."
  pains={[
    {title:"Mensajes sin contexto",text:"El equipo tiene que averiguar quién escribe, de qué comunidad habla y qué ocurrió antes."},
    {title:"Incidencias invisibles",text:"Una avería puede quedar enterrada entre consultas, audios y respuestas pendientes."},
    {title:"Seguimiento manual",text:"El vecino pregunta de nuevo y nadie ve de inmediato quién asumió el caso ni su estado."},
  ]}
  steps={["Identifica el contacto y la comunidad vinculada.","Busca información validada por el despacho.","Prepara una respuesta para revisión o derivación.","Convierte el mensaje en incidencia y tarea cuando corresponde.","Registra responsable, cambios y resolución en una cronología."]}
  fit={{title:"Para despachos que ya atienden por WhatsApp",text:"El mejor piloto empieza donde ya existe volumen: consultas repetidas, incidencias y seguimientos que interrumpen al equipo. AfincalIA se añade a ese flujo sin exigir cambiar el programa contable."}}
  related={[["Gestión de incidencias","/gestion-incidencias-administradores-fincas"],["IA para administradores","/ia-administradores-fincas"],["Cómo funciona","/como-funciona"]]}
/>}
