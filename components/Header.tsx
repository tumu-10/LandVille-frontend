"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Header.module.scss";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Main navigation">
        <Link className={styles.logo} href="/" onClick={() => setMenuOpen(false)} aria-label="LandVille Ventures home">
          <Image src="/logo.png" alt="" width={220} height={90} priority />
        </Link>
        <button
          className={`${styles.navToggle} ${menuOpen ? styles.toggleOpen : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <div id="primary-navigation" className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <a className={styles.navCta} href="tel:+256774413516">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
