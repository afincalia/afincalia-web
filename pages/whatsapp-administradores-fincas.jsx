import SearchLanding from "../components/SearchLanding";

export default function WhatsAppAdministradores(){return <SearchLanding
  metaTitle="WhatsApp para administradores de fincas"
  description="Organiza las consultas de WhatsApp de tu despacho: identifica comunidad, prepara respuestas verificadas y convierte mensajes en incidencias y tareas."
  path="/whatsapp-administradores-fincas"
  eyebrow="WhatsApp para administradores de fincas"
  title="Atiende a tus comunidades desde el primer WhatsApp."
  intro="El vecino escribe; AfincalIA ayuda a atender y organizar; el despacho conserva el control. Con contexto identificado, fuentes verificadas y configuración autorizada, puede responder consultas sencillas, pedir datos y registrar avisos admitidos."
  pains={[
    {title:"Mensajes sin contexto",text:"El equipo tiene que averiguar quién escribe, de qué comunidad habla y qué ocurrió antes."},
    {title:"Incidencias invisibles",text:"Una avería puede quedar enterrada entre consultas, audios y respuestas pendientes."},
    {title:"Seguimiento manual",text:"El vecino pregunta de nuevo y nadie ve de inmediato quién asumió el caso ni su estado."},
  ]}
  steps={["Utiliza el contacto y la comunidad vinculados; si no constan, pide revisión.","Busca información verificada por el despacho.","Responde una consulta sencilla o pide datos, si el canal y los permisos lo permiten; deriva los asuntos sensibles al equipo.","Registra los avisos admitidos como incidencias; el despacho organiza y vincula las tareas.","Conserva estados e historial. Los recordatorios requieren habilitación específica y el cierre exige comprobar el resultado."]}
  fit={{title:"Para despachos que ya atienden por WhatsApp",text:"El mejor piloto empieza donde ya existe volumen: consultas repetidas, incidencias y seguimientos que interrumpen al equipo. AfincalIA se añade a ese flujo sin exigir cambiar el programa contable."}}
  related={[["Gestión de incidencias","/gestion-incidencias-administradores-fincas"],["IA para administradores","/ia-administradores-fincas"],["Cómo funciona","/como-funciona"]]}
/>}
