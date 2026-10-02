import { Meta } from "../components/PageParts";
import { Layout } from "../components/SiteChrome";
import { CommercialCTA, SectionHeading } from "../components/CommercialSections";

export default function Seguridad() {
  return <Layout><div className="commercial-v2">
    <Meta title="Control humano, permisos y seguridad" description="Qué decide el administrador, qué puede hacer un empleado y cómo se revisan los pendientes y resultados inciertos en AfincalIA."/>
    <section className="review-page-hero page-shell"><span className="review-kicker">El control del despacho</span><h1>Permisos claros.<br/><em>Decisiones con responsable.</em></h1><p>AfincalIA hace visible el contexto y el estado del trabajo. Las acciones disponibles dependen del usuario, de su despacho y del caso que está revisando.</p></section>
    <section className="permissions-matrix page-shell" aria-label="Ejemplos de permisos por perfil">
      <article><span className="review-kicker">Administrador</span><h2>Define y revisa el alcance.</h2><ul><li>Revisa las fuentes que se incorporan como conocimiento.</li><li>Gestiona los borradores de actas y su aprobación.</li><li>Puede asumir excepciones o detener peticiones cuando el estado lo permite.</li><li>Consulta la cronología completa de las comunidades de su despacho.</li></ul></article>
      <article><span className="review-kicker">Empleado</span><h2>Trabaja dentro de sus permisos.</h2><ul><li>Consulta el contexto disponible en su ámbito.</li><li>Puede actualizar el estado de las tareas que tiene asignadas.</li><li>Las actuaciones reservadas al administrador no se habilitan por tener acceso a una pantalla.</li><li>La información de otro despacho queda fuera de su ámbito.</li></ul></article>
    </section>
    <section className="review-section page-shell"><SectionHeading label="Cuando no está resuelto" title="El estado explica qué falta por hacer." text="Un resultado pendiente o incierto debe poder revisarse. No se presenta como una actuación completada."/><div className="control-states">
      <article><h3>Falta información</h3><p>La conversación conserva su contexto y la necesidad de intervención. El equipo comprueba la fuente o solicita una aclaración, según corresponda.</p></article>
      <article><h3>No se confirma una entrega</h3><p>El resultado queda señalado para revisión. No se debe repetir la comunicación dando por hecho que el primer intento falló.</p></article>
      <article><h3>Ha llegado una respuesta</h3><p>La respuesta se vincula a su petición. Confirmar un dato no demuestra que una reparación haya terminado: esa comprobación sigue siendo del equipo.</p></article>
    </div></section>
    <section className="minutes-feature page-shell"><div><span className="review-kicker">Canales y automatismos</span><h2>El alcance se configura.<br/>No se presupone.</h2><p>Un envío requiere canal, permisos y autorización válidos. Los transportes automáticos de seguimiento permanecen desactivados por defecto; disponer de una pantalla de tareas no significa que se estén enviando recordatorios.</p></div><ol><li><span>01</span><div><strong>Ámbito definido</strong><p>Usuario, despacho, comunidad y petición.</p></div></li><li><span>02</span><div><strong>Acción disponible</strong><p>Según los permisos y el estado real del caso.</p></div></li><li><span>03</span><div><strong>Resultado revisable</strong><p>Conservar lo ocurrido, lo pendiente y las excepciones.</p></div></li></ol></section>
    <section className="privacy-review page-shell"><span className="review-kicker">Antes de incorporar datos reales</span><h2>Primero se valida el producto. Después se acuerda el tratamiento de datos.</h2><p>La demostración y la primera configuración se realizan sin información real del despacho. La incorporación de datos reales solo debe comenzar cuando estén documentadas las responsabilidades, finalidades, accesos, conservación y proveedores implicados.</p><div className="legal-note"><strong>Un compromiso honesto:</strong> esta página explica el enfoque previsto de Afincalia; no sustituye la revisión jurídica ni afirma un cumplimiento automático. Antes de utilizar información real se concretarán las medidas técnicas y organizativas, los contratos necesarios y las condiciones de cada integración.</div></section>
    <CommercialCTA/>
  </div></Layout>;
}
