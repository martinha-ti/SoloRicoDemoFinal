import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5517981863298"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
