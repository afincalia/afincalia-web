import SearchLanding from "../components/SearchLanding";

export default function ActasIA(){return <SearchLanding
  metaTitle="Actas con IA para administradores de fincas"
  description="Convierte fotografías de apuntes o notas de una junta en un borrador revisable, acuerdos, tareas y un PDF aprobado."
  path="/actas-ia-administradores-fincas"
  eyebrow="Actas con IA para administradores de fincas"
  title="De los apuntes de la junta a un borrador que puedes revisar."
  intro="AfincalIA estructura la información aportada por el administrador, separa acuerdos y tareas y prepara un documento para revisión y aprobación profesional."
  pains={[
    {title:"Redacción aplazada",text:"Los apuntes pierden contexto cuando el acta se deja para varios días después."},
    {title:"Acuerdos dispersos",text:"Votaciones, responsables y próximos pasos pueden quedar repartidos entre notas distintas."},
    {title:"Tareas desconectadas",text:"Una decisión de junta no siempre llega de forma clara al trabajo operativo posterior."},
  ]}
  steps={["Aporta fotografías legibles de los apuntes o notas.","Revisa la estructura propuesta y corrige cualquier dato.","Valida acuerdos, votaciones y tareas extraídas.","Aprueba el documento final antes de compartirlo.","Conserva las tareas vinculadas para su seguimiento."]}
  fit={{title:"La IA prepara; el profesional aprueba",text:"El objetivo no es automatizar la responsabilidad del secretario-administrador, sino reducir el trabajo mecánico y mantener la revisión humana antes del PDF final."}}
  related={[["Ver el módulo de Actas","/actas"],["Cómo funciona AfincalIA","/como-funciona"],["Solicitar piloto","/piloto"]]}
/>}
