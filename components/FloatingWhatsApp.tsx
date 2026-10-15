import { FaWhatsapp } from "react-icons/fa";
import styles from "@/styles/FloatingWhatsApp.module.scss";

export default function FloatingWhatsApp() {
  return (
    <a
      className={styles.whatsapp}
      href="https://wa.me/256777530797"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with LandVille Ventures on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
      <span>Let&apos;s chat</span>
    </a>
  );
}
