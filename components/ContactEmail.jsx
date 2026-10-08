import { useRef, useState } from "react";

const EMAIL = "hola@afincalia.es";

export default function ContactEmail({ light = false }) {
  const address = useRef(null);
  const [message, setMessage] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setMessage("Correo copiado.");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(address.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      setMessage("Seleccionado. Puedes copiarlo desde tu navegador.");
    }
  }

  return <div className={light ? "contact-email contact-email-light" : "contact-email"}>
    <span ref={address} className="contact-email-address">{EMAIL}</span>
    <button type="button" className="copy-email" onClick={copyEmail}>Copiar correo</button>
    <span className="copy-email-status" role="status" aria-live="polite">{message}</span>
  </div>;
}
