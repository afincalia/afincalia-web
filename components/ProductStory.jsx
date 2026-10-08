import { useEffect, useRef, useState } from "react";

// Crops use unchanged pixels from the existing pilot, excluding contact details
// and the operator name. They never redraw controls or invent application states.
export const productScreens = [
  {
    id: "comunidad", label: "1. Sitúa la comunidad", short: "Comunidad",
    title: "Empieza por el edificio al que pertenece el caso.",
    text: "La comunidad reúne su información y da acceso a su cronología. Ese contexto acompaña el trabajo del despacho.",
    image: "/demo/07-administration.jpg", crop: [298, 278, 1000, 605],
    alt: "Recorte de Administración: dos comunidades de demostración, su estado y el enlace Ver cronología.",
    points: [
      { x: 94, y: 41, title: "La comunidad, identificada", text: "Nombre, estado y etiqueta de datos simulados visibles en la ficha." },
      { x: 4, y: 54, title: "Un historial al que volver", text: "El enlace «Ver cronología» abre la actividad de esa comunidad." },
    ],
    decision: "El equipo comprueba el ámbito antes de utilizar información o registrar una actuación.",
  },
  {
    id: "conocimiento", label: "2. Consulta la fuente", short: "Información",
    title: "Consulta la información revisada de esa comunidad.",
    text: "Las fuentes y los datos verificados tienen un ámbito. El despacho decide qué contenido incorpora y revisa su vigencia.",
    image: "/demo/03-knowledge.jpg", crop: [298, 156, 1000, 701],
    alt: "Recorte de Conocimiento: fuentes, datos verificados, selector de comunidad y regla de información basada en una fuente.",
    points: [
      { x: 65, y: 22, title: "Fuentes y datos separados", text: "La vista distingue los documentos de la información revisada." },
      { x: 68, y: 44, title: "Ámbito visible", text: "El filtro mantiene a la vista la comunidad seleccionada." },
      { x: 96, y: 61, title: "Si falta base, se revisa", text: "La propia pantalla indica el límite: no dar por válida una respuesta factual sin fuente." },
    ],
    decision: "Una fuente registrada no sustituye la revisión de su contenido ni del caso concreto.",
  },
  {
    id: "incidencia", label: "3. Organiza la actuación", short: "Incidencia",
    title: "Distingue qué aviso necesita trabajo.",
    text: "Cuando hace falta actuar, la incidencia permite reunir descripción, prioridad, estado y comunidad. Los filtros ayudan a encontrar lo pendiente.",
    image: "/demo/04-incidents.jpg", crop: [298, 397, 1000, 475],
    alt: "Recorte de Incidencias: filtros por estado, prioridad, responsable y comunidad; una fuga de agua simulada figura abierta y urgente.",
    points: [
      { x: 67, y: 30, title: "Busca lo que necesitas revisar", text: "Estado, prioridad, responsable y comunidad son filtros reales de esta vista." },
      { x: 95, y: 65, title: "Pendiente no significa resuelto", text: "El caso simulado aparece en trabajo pendiente, con su estado y prioridad." },
    ],
    decision: "El equipo valora la actuación y registra el siguiente paso; el estado no prueba que una reparación esté realizada.",
  },
  {
    id: "tarea", label: "4. Revisa el trabajo", short: "Tarea",
    title: "La tarea conserva su vínculo con la incidencia.",
    text: "El trabajo puede tener responsable y fecha. Las tareas completadas siguen consultables, en lugar de desaparecer de la historia del caso.",
    image: "/demo/05-tasks.jpg", crop: [298, 141, 1000, 783],
    alt: "Recorte de Tareas: vínculo con incidencias, filtros por fecha y responsable, estado del trabajo y archivo de completadas.",
    points: [
      { x: 95, y: 8, title: "El contexto se mantiene", text: "La pantalla explica que la tarea nace dentro de una incidencia." },
      { x: 68, y: 43, title: "Responsable y fecha a la vista", text: "Puedes filtrar el trabajo sin reconstruir la conversación." },
      { x: 95, y: 88, title: "Lo completado sigue accesible", text: "El archivo de tareas completadas conserva el trabajo anterior." },
    ],
    decision: "La persona responsable comprueba el resultado y actualiza el estado conforme a sus permisos.",
  },
  {
    id: "conversacion", label: "Conversación y respuesta", short: "Conversación",
    title: "Cuando hace falta intervenir, el contexto está a mano.",
    text: "Esta captura muestra dónde el equipo puede revisar y preparar una respuesta manual. La indicación de intervención dice si el caso la necesita; aquí figura «No requerida». La captura no prueba un envío automático.",
    image: "/demo/02b-conversation-detail.jpg", crop: [298, 242, 1000, 541],
    alt: "Recorte de conversación sin nombre ni teléfono: intervención humana y formulario de respuesta manual con aviso de envío real.",
    points: [
      { x: 95, y: 9, title: "La intervención se hace visible", text: "La vista señala si el caso requiere revisión humana." },
      { x: 95, y: 39, title: "Enviar es una acción explícita", text: "La aplicación distingue preparar un mensaje de enviarlo. Aquí solo estás viendo una captura." },
    ],
    decision: "Este recorrido no envía mensajes ni conecta con un canal de clientes.",
  },
];

export function ProductCapture({ screen, pins = true, className = "" }) {
  return <figure className={`product-capture ${className}`}>
    <div className="capture-label"><span>Interfaz de AfincalIA</span><span>Datos de demostración</span></div>
    <div className="capture-window" style={{ aspectRatio: `${screen.crop[2]} / ${screen.crop[3]}` }}>
      <svg viewBox={screen.crop.join(" ")} role="img" aria-label={screen.alt}>
        <image href={screen.image} x="0" y="0" width="1348" height="926" />
      </svg>
      {pins && screen.points.map((point, i) => <span key={point.title} className="capture-pin" style={{ left: `${point.x}%`, top: `${point.y}%` }} aria-hidden="true">{i + 1}</span>)}
    </div>
    <figcaption>Pantalla real del piloto, con datos de demostración.</figcaption>
  </figure>;
}

export function ProductStory({ includeConversation = false, initial = 0, id = "recorrido" }) {
  const screens = includeConversation ? [productScreens[4], ...productScreens.slice(0, 4)] : productScreens.slice(0, 4);
  const [active, setActive] = useState(initial);
  const [zoom, setZoom] = useState(false);
  const dialog = useRef(null);
  const zoomButton = useRef(null);
  const screen = screens[active];
  useEffect(() => { if (zoom) dialog.current?.showModal(); else if (dialog.current?.open) dialog.current.close(); }, [zoom]);
  const select = (next, focus = false) => {
    setActive(next);
    if (focus) document.getElementById(`${id}-tab-${next}`)?.focus();
  };
  const keyDown = event => {
    let next = active;
    if (event.key === "ArrowRight") next = (active + 1) % screens.length;
    else if (event.key === "ArrowLeft") next = (active + screens.length - 1) % screens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screens.length - 1;
    else return;
    event.preventDefault(); select(next, true);
  };
  return <div className="product-story" id={id}>
    <div className="story-tabs" role="tablist" aria-label="Explorar las pantallas del producto" onKeyDown={keyDown}>
      {screens.map((item, i) => <button type="button" role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} key={item.id}>{includeConversation ? item.short : item.label}</button>)}
    </div>
    <div className="story-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
      <div className="story-visual">
        <ProductCapture screen={screen} />
        <button type="button" className="capture-enlarge" ref={zoomButton} onClick={() => setZoom(true)}>Ampliar esta captura <span aria-hidden="true">+</span></button>
      </div>
      <div className="story-explanation">
        <span className="review-kicker">Qué puedes observar</span>
        <h3>{screen.title}</h3><p>{screen.text}</p>
        <ol className="capture-points">{screen.points.map((point, i) => <li key={point.title}><span>{i + 1}</span><div><strong>{point.title}</strong><p>{point.text}</p></div></li>)}</ol>
        <div className="human-decision"><strong>La decisión del equipo</strong><p>{screen.decision}</p></div>
        <p className="story-position">Pantalla {active + 1} de {screens.length} · Vista guiada, sin operaciones</p>
      </div>
    </div>
    <dialog className="capture-dialog" ref={dialog} aria-label={`Captura ampliada: ${screen.short}`} onClose={() => { setZoom(false); zoomButton.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) setZoom(false); }}>
      <div className="capture-dialog-bar"><strong>{screen.short} · captura real</strong><button type="button" onClick={() => setZoom(false)} aria-label="Cerrar captura ampliada">Cerrar <span aria-hidden="true">×</span></button></div>
      <div className="capture-zoom-scroll"><ProductCapture screen={screen} pins={false} /></div>
      <p>En móvil puedes desplazar la captura dentro de este visor para leer el detalle. No es una pantalla operativa.</p>
    </dialog>
  </div>;
}
