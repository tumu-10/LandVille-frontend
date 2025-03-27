"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/app.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const useTypewriterEffect = (text: string, delay: number) => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing" && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 120);
    } else if (phase === "typing") {
      timeout = setTimeout(() => setPhase("pausing"), 2000);
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 1500);
    } else if (phase === "deleting" && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length - 1));
      }, 60);
    } else if (phase === "deleting") {
      timeout = setTimeout(() => setPhase("typing"), 1000);
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, text]);

  return { displayText, phase };
};

const BrowseApp = () => {
  const heading1 = useTypewriterEffect("Browse Propatiz", 0);
  const heading2 = useTypewriterEffect("From Your Smartphone", 2500);
  const [imageUrl, setImageUrl] = useState<string>("/pro1.png"); // Default fallback image

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/property");
        if (response.ok) {
          const data = await response.json();
          if (data && data.img_url) {
            setImageUrl(data.img_url); // Set the dynamic image URL
          } else {
            console.error("Invalid data structure:", data);
          }
        } else {
          console.error("Failed to fetch image from API");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <section className={styles.browseApp}>
      <motion.div
        className={styles.textSection}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h5
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          GET OUR APP
        </motion.h5>

        <h1>
          <AnimatePresence mode="wait">
            {heading1.displayText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
          <span
            className={`${styles.cursor} ${
              heading1.phase === "deleting" ? styles.deleting : ""
            }`}
          ></span>
        </h1>

        <h2>
          <AnimatePresence mode="wait">
            {heading2.displayText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                {index >= "From Your ".length ? (
                  <span className={styles.accentText}>{char}</span>
                ) : (
                  char
                )}
              </motion.span>
            ))}
          </AnimatePresence>
          <span
            className={`${styles.cursor} ${
              heading2.phase === "deleting" ? styles.deleting : ""
            }`}
          ></span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Use our mobile app today to find the best <br />
          property deals available.
        </motion.p>

        <div className={styles.downloadButtons}>
          <motion.a
            href="/blog"
            className={styles.downloadButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/apple-14.svg" alt="iOS" />
            <span>Download for iOS</span>
          </motion.a>
          <motion.a
            href="/blog"
            className={styles.downloadButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/icons/android-logo-2.svg" alt="Android" />
            <span>Download for Android</span>
          </motion.a>
        </div>
      </motion.div>

      <motion.img
        src={imageUrl}
        alt="Phone Mockup"
        className={styles.phoneMockup}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{
          rotate: [0, -3, 3, -3, 0],
          transition: { duration: 0.8 },
        }}
      />
    </section>
  );
};

export default BrowseApp;
