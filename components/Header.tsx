"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/Header.module.scss";

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null); // Added type annotation

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // Close the navigation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen]);


  return (
    <motion.header
      className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/logo.png" alt="Landville Logo" />
          </Link>
        </div>

        <button className={styles.navToggle} onClick={toggleNav} aria-label="Toggle Navigation">
          <div className={`${styles.toggleLine} ${navOpen ? styles.open : ""}`}></div>
          <div className={`${styles.toggleLine} ${navOpen ? styles.open : ""}`}></div>
          <div className={`${styles.toggleLine} ${navOpen ? styles.open : ""}`}></div>
        </button>

        <motion.ul
          ref={navRef}
          className={`${styles.navLinks} ${navOpen ? styles.open : ""}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <li>
            <Link href="/" onClick={() => setNavOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setNavOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={() => setNavOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={() => setNavOpen(false)}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setNavOpen(false)}>
              Contact Us
            </Link>
          </li>
          <li className={styles.phoneItem}>
              <a href="tel:+256779602784" className={styles.phoneLink}>
                <svg className={styles.phoneIcon} viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                +256 779 602 784
              </a>
            </li>
        </motion.ul>
      </nav>
    </motion.header>
  );
};

export default Header;