import Link from "next/link";

export default function ExperienceChoices() {
  return <div className="experience-choices" aria-label="Tres formas de conocer AfincalIA">
    <article><span>01 · A tu ritmo</span><h3>Recorrido visual</h3><p>Capturas reales con datos de demostración y anotaciones. Puedes explorarlas, pero no operar la aplicación.</p><Link href="/demo">Ver capturas →</Link></article>
    <article><span>02 · Con el equipo</span><h3>Demostración guiada</h3><p>Una presentación con datos de ejemplo para entender el flujo, los permisos y la configuración necesaria.</p><Link href="/contacto">Cómo solicitar una demo →</Link></article>
    <article><span>03 · En un caso acordado</span><h3>Piloto de 30 días</h3><p>Una evaluación con alcance, responsables y puesta en marcha acordados. Se revisa el trabajo registrado antes de decidir.</p><Link href="/piloto">Ver condiciones vigentes →</Link></article>
  </div>;
}
