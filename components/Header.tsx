"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/Header.module.scss";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    let idleTimer: number | undefined;
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 12);

      if (menuOpen) {
        setHeaderVisible(true);
        previousScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 0 || currentScrollY < previousScrollY - 4) {
        setHeaderVisible(true);
      } else if (currentScrollY > previousScrollY + 4 && currentScrollY > 80) {
        setHeaderVisible(false);
      }

      previousScrollY = currentScrollY;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setHeaderVisible(true), 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(idleTimer);
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${headerVisible || menuOpen ? "" : styles.hidden} ${isScrolled ? styles.scrolled : ""}`}>
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
          {navigation.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
            return (
            <Link
              key={href}
              href={href}
              className={isActive ? styles.activeLink : ""}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
            );
          })}
          <a className={styles.navCta} href="tel:+256774413516">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
