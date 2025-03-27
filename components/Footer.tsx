"use client";

import styles from "@/styles/Footer.module.scss";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

const NewFooter = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.logoSection}>
      <Link href="/" className={styles.logoContainer}>
          <Image 
            src="/logo.png" 
            alt="LandVille Ventures" 
            width={140}
            height={30}
            className={styles.logo}
          />
        </Link>
      </div>

      <div className={styles.linksSection}>
        <div className={styles.linksGroup}>
          <h4 className={styles.linksHeading}>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/blog">Insights</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4 className={styles.linksHeading}>Resources</h4>
          <ul>
            <li><a href="/contact">Support</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/privacy">Privacy</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.socialSection}>
        <div className={styles.socialContent}>
          <h4 className={styles.socialHeading}>Connect With Us</h4>
          <div className={styles.socialIcons}>
            <motion.a
              href="https://www.facebook.com/LandvilleVentures/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaFacebook size={24} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/landvilleventures/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaInstagram size={24} />
            </motion.a>
            <motion.a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaTiktok size={24} />
            </motion.a>
            <motion.a
              href="https://x.com/landvillev"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaTwitter size={24} />
            </motion.a>
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaYoutube size={24} />
            </motion.a>
            <motion.a
              href="landvilleventures@gmail.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <SiGmail size={24} />
            </motion.a>
          </div>
        </div>
      </div>
    </div>

    <div className={styles.copyright}>
      <p>© {new Date().getFullYear()} Landville Ventures. All Rights Reserved.</p>
    </div>
  </footer>
);

export default NewFooter;