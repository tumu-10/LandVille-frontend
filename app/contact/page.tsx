"use client";

import { useRef, useState, useEffect } from "react";
import styles from "@/styles/contact.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isMounted, setIsMounted] = useState(false);

  // Typewriter effect state with a newline for the second line.
  const textToType = "Let's Work\nTogether 🤝";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Pause before deleting when text is fully typed
    if (!isDeleting && typedText === textToType) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    }
    // Pause before typing again when text is fully deleted
    else if (isDeleting && typedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 1000);
    }
    // Continue typing or deleting
    else {
      timeout = setTimeout(() => {
        setTypedText((prev) => {
          if (isDeleting) {
            return textToType.substring(0, prev.length - 1);
          } else {
            return textToType.substring(0, prev.length + 1);
          }
        });
      }, isDeleting ? 100 : 150);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textToType]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    if (formRef.current) {
      emailjs
        .sendForm(
          "service_94y20xo",
          "template_v10u2oh",
          formRef.current,
          "pX_2hasGmGcuvjXIW"
        )
        .then(
          () => setStatus("success"),
          () => setStatus("error")
        );
    }
  };

  return (
    <div className={styles.container}>
      {/* Animated Real Estate Objects */}
      {isMounted && (
        <>
          <motion.div
            className={styles.houseIcon}
            initial={{ x: -100, y: -50, opacity: 0 }}
            animate={{ x: "20vw", y: "10vh", opacity: 0.6 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            🌍
          </motion.div>

          <motion.div
            className={styles.keyIcon}
            initial={{ x: 50, y: 100, opacity: 0 }}
            animate={{ x: "70vw", y: "60vh", opacity: 0.7 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🔑
          </motion.div>

          <motion.div
            className={styles.mailIcon}
            initial={{ x: 100, y: 200, opacity: 0 }}
            animate={{ x: "5vw", y: "80vh", opacity: 0.5 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 2,
            }}
          >
            ✉️
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <div className={styles.content}>
        {/* Contact Information Section */}
        <motion.div className={styles.contactInfo}>
          <h1 className={styles.typewriter}>
            {typedText && typedText.split("\n").map((line, index, arr) => (
              <span key={index}>
                {line}
                {index < arr.length - 1 && <br />}
              </span>
            ))}
            <span className={styles.cursor}>|</span>
          </h1>
          <p>
            We’d love to hear from you!
            <span> Reach out through the form or use the links below.</span>
          </p>

          <div className={styles.links}>
            <a href="mailto:Landvilleventures@gmail.com">
              <FiMail className={styles.icon} /> LandVilleventures@gmail.com
            </a>
            <a
              href="https://www.google.com/maps/place/Kyanja+Mall/@0.3957122,32.5951815,15.04z/data=!4m6!3m5!1s0x177db12d98a508d3:0xe23ffa68c188c230!8m2!3d0.3953297!4d32.5933825!16s%2Fg%2F11l1_rvjwq?entry=ttu&g_ep=EgoyMDI1MDIyNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMapPin className={styles.icon} /> Kyanja
            </a>
            <a href="tel:+256779602784">
              <FiPhone className={styles.icon} /> +256 779 602784
            </a>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          className={styles.form}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.inputGroup}>
            <input id="name" name="name" type="text" required />
            <label htmlFor="name">Your Name</label>
          </div>

          <div className={styles.inputGroup}>
            <input id="email" name="email" type="email" required />
            <label htmlFor="email">Your Email</label>
          </div>

          <div className={styles.inputGroup}>
            <textarea id="message" name="message" required />
            <label htmlFor="message">Your Message</label>
          </div>

          <button type="submit">Send Message</button>

          <AnimatePresence>
            {status !== "idle" && (
              <motion.div
                className={`${styles.status} ${
                  status === "success" ? styles.success : styles.error
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {status === "success"
                  ? "Message sent successfully!"
                  : "Error sending message. Please try again."}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactPage;
