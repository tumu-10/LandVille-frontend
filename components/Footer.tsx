import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import styles from "@/styles/Footer.module.scss";

const navigation = [
  { href: "/about", label: "About LandVille" },
  { href: "/services", label: "Our services" },
  { href: "/contact", label: "Get in touch" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.brand}>
          <Link href="/" aria-label="LandVille Ventures home">
            <Image src="/logo.png" alt="LandVille Ventures" width={220} height={90} />
          </Link>
          <p>Good places. Thoughtfully made.</p>
        </div>
        <div className={styles.footerNav}>
          <span className={styles.label}>Explore</span>
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </div>
        <div className={styles.footerContact}>
          <span className={styles.label}>Start a conversation</span>
          <Link href="/contact">Use our contact form</Link>
          <a href="tel:+256774413516">+256 774 413 516</a>
          <span>Kyanja, Kampala, Uganda</span>
        </div>
        <div className={styles.social}>
          <span className={styles.label}>Follow along</span>
          <div>
            <a href="https://facebook.com/LandvilleVentures" aria-label="LandVille Ventures on Facebook" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com/LandvilleVentures" aria-label="LandVille Ventures on Instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} LandVille Ventures</span>
        <span>Built around places and possibility.</span>
        <button className={styles.cookiePreferences} type="button" data-open-meta-preferences>
          Cookie preferences
        </button>
      </div>
    </footer>
  );
}
