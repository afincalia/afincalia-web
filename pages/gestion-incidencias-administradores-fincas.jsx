import SearchLanding from "../components/SearchLanding";

export default function GestionIncidencias(){return <SearchLanding
  metaTitle="Gestión de incidencias para administradores de fincas"
  description="Convierte consultas y avisos en incidencias con prioridad, responsable, tarea, seguimiento y cronología para cada comunidad."
  path="/gestion-incidencias-administradores-fincas"
  eyebrow="Gestión de incidencias para administradores de fincas"
  title="Cada incidencia con contexto, responsable y siguiente paso."
  intro="AfincalIA conecta el aviso del vecino con la comunidad, la información necesaria, la tarea del equipo y una cronología que permite explicar qué se hizo y qué queda pendiente."
  pains={[
    {title:"El aviso no se convierte en trabajo",text:"Responder al mensaje no garantiza que alguien haya asumido la incidencia."},
    {title:"Responsabilidad difusa",text:"Sin responsable y vencimiento visibles, el seguimiento depende de la memoria del equipo."},
    {title:"El vecino vuelve a empezar",text:"Cuando pregunta por el estado, hay que reconstruir llamadas, mensajes y gestiones dispersas."},
  ]}
  steps={["Recibe o registra el aviso con su comunidad.","Clasifica prioridad y conserva el contexto original.","Crea o vincula la tarea y asigna responsable.","Actualiza el estado sin perder la conversación.","Cierra la incidencia con toda la historia disponible."]}
  fit={{title:"Para equipos que gestionan por varias vías",text:"Si las incidencias entran por WhatsApp, llamadas y notas, el piloto permite medir cuántos casos quedan correctamente asignados y cuánto tiempo ahorra el seguimiento compartido."}}
  related={[["WhatsApp para despachos","/whatsapp-administradores-fincas"],["Trazabilidad y control","/producto/trazabilidad"],["Solicitar piloto","/piloto"]]}
/>}
