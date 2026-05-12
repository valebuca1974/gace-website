import { MessageCircle } from "lucide-react";
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const msg = "Hola, necesito información sobre sus productos industriales";

  return (
    <a
      href={`https://wa.me/525586763800?text=${encodeURIComponent(msg)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
