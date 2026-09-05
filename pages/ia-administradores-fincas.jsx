import SearchLanding from "../components/SearchLanding";

export default function IAAdministradores(){return <SearchLanding
  metaTitle="Inteligencia artificial para administradores de fincas"
  description="IA aplicada al trabajo operativo de un despacho: WhatsApp, conocimiento verificado, incidencias, tareas, actas y trazabilidad."
  path="/ia-administradores-fincas"
  eyebrow="Inteligencia artificial para administradores de fincas"
  title="IA conectada al trabajo real del despacho."
  intro="AfincalIA no es un chat genérico. Es una capa operativa que utiliza el contexto autorizado de cada comunidad para ayudar a responder, organizar y ejecutar con control humano."
  pains={[
    {title:"IA sin contexto",text:"Un asistente genérico redacta, pero no conoce la comunidad, el caso ni las fuentes aprobadas."},
    {title:"Herramientas aisladas",text:"Un chatbot que solo contesta no crea responsables, tareas ni seguimiento operativo."},
    {title:"Automatización sin control",text:"El despacho necesita saber qué fuente se usó y qué acciones requieren revisión humana."},
  ]}
  steps={["Trabaja con el contexto separado de cada comunidad.","Prioriza información verificada por el despacho.","Prepara respuestas y borradores revisables.","Conecta la conversación con incidencias, tareas y actas.","Mantiene una cronología de decisiones y cambios."]}
  fit={{title:"Una capa complementaria, no otro ERP",text:"AfincalIA está pensada para convivir con el programa contable y cubrir el espacio entre la conversación, el conocimiento del despacho y la ejecución diaria."}}
  related={[["Conocimiento verificado","/producto/conocimiento"],["WhatsApp para despachos","/whatsapp-administradores-fincas"],["Privacidad y seguridad","/seguridad"]]}
/>}
