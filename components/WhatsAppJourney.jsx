import Link from "next/link";

const cases = [
  {
    message: "¿A qué hora abre la piscina?", kind: "Una consulta cotidiana",
    title: "Una respuesta con una fuente detrás.",
    action: "Con el contacto y la comunidad identificados, AfincalIA puede responder automáticamente si encuentra un dato verificado y el canal lo permite.",
    result: "El vecino recibe la información y su fuente. Si falta una base suficiente, la consulta queda para revisión.",
    href: "/producto/conocimiento", link: "Cómo se revisa la información",
  },
  {
    message: "Hay una gotera.", kind: "Un aviso incompleto",
    title: "Primero, saber dónde ocurre.",
    action: "En los casos admitidos, puede pedir la ubicación que falta y registrar una incidencia cuando hay datos suficientes. El envío necesita autorización.",
    result: "El aviso puede pasar a una incidencia abierta. El despacho organiza la actuación y vincula las tareas necesarias.",
    href: "/producto/incidencias-tareas", link: "De la incidencia a la tarea",
  },
  {
    message: "No estoy de acuerdo con esta derrama.", kind: "Un asunto para el despacho",
    title: "El criterio profesional entra en juego.",
    action: "AfincalIA señala el asunto económico para intervención humana y conserva la conversación. No decide sobre el cobro ni envía una interpretación automática.",
    result: "El equipo revisa los antecedentes y prepara la respuesta. También interviene ante conflictos, dudas jurídicas o información sensible.",
    href: "/seguridad", link: "Qué decisiones conserva el equipo",
  },
];

export function WhatsAppExample() {
  return <figure className="wa-example" aria-label="Ejemplo explicado de un aviso recibido por WhatsApp">
    <div className="wa-example-heading"><span>WhatsApp · mensaje del vecino</span><span>Ejemplo explicado</span></div>
    <blockquote>«Hay una gotera.»</blockquote>
    <ol className="wa-example-steps">
      <li><span>01</span><div><strong>Situar el aviso</strong><p>Recupera el contexto del contacto y su comunidad. Si no están identificados, interviene el equipo.</p></div></li>
      <li><span>02</span><div><strong>Pedir el dato que falta</strong><p>«¿En qué zona, portal o planta ocurre?»</p></div></li>
      <li><span>03</span><div><strong>Preparar la actuación</strong><p>Con los datos necesarios, puede registrar la incidencia. El despacho organiza las tareas y supervisa la actuación.</p></div></li>
    </ol>
    <div className="wa-example-result"><strong>Del mensaje al seguimiento.</strong><p>El equipo comprueba el resultado antes de cerrar la incidencia.</p></div>
    <figcaption>Ejemplo ilustrativo con información, canal y permisos preparados; no corresponde a una conversación real.</figcaption>
  </figure>;
}

export function WhatsAppCases() {
  return <div className="wa-cases">{cases.map((item, i) => <article key={item.message}>
    <div className="wa-case-label"><span>0{i + 1}</span><span>{item.kind}</span></div>
    <blockquote>«{item.message}»</blockquote>
    <h3>{item.title}</h3><p>{item.action}</p>
    <div className="wa-case-result"><strong>Cómo continúa</strong><p>{item.result}</p></div>
    <Link href={item.href} className="review-text-link">{item.link}</Link>
  </article>)}</div>;
}
