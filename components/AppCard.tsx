"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/app.module.scss";
import { motion, AnimatePresence } from "framer-motion";

// --- Custom Hook for Typewriter Effect ---
const useTypewriterEffect = (text: string, startDelay: number = 0) => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "pausing" | "deleting">("idle");

  useEffect(() => {
    let initialTimeout: NodeJS.Timeout;
    // Start the effect after the initial delay
    if (phase === "idle") {
      initialTimeout = setTimeout(() => setPhase("typing"), startDelay);
    }

    return () => clearTimeout(initialTimeout);
  }, [startDelay, phase]);


  useEffect(() => {
    if (phase === 'idle') return; // Don't run timeouts if idle

    let timeout: NodeJS.Timeout;

    switch (phase) {
      case "typing":
        if (displayText.length < text.length) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, displayText.length + 1));
          }, 80); // Slightly faster typing
        } else {
          // Finished typing, move to pausing
          timeout = setTimeout(() => setPhase("pausing"), 2000); // Pause duration after typing
        }
        break;

      case "pausing":
        // Just wait, then move to deleting
        timeout = setTimeout(() => setPhase("deleting"), 1500); // Pause duration before deleting
        break;

      case "deleting":
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, displayText.length - 1));
          }, 50); // Slightly faster deleting
        } else {
          // Finished deleting, cycle back to typing
          timeout = setTimeout(() => setPhase("typing"), 500); // Pause duration after deleting
        }
        break;
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, text]); // Rerun effect when these change

  return displayText; // Only return the text, phase is internal now
};


// --- Component ---
const BrowseApp = () => {
  // Use the hook for both headings, potentially staggering the start
  const heading1Text = useTypewriterEffect("Browse Propatiz", 500); // Start after 500ms
  const heading2Text = useTypewriterEffect("From Your Smartphone", 2500); // Start later
  const [imageUrl, setImageUrl] = useState<string>("/pro1.png"); // Default fallback image

  // Character animation variants
  const characterVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ // Pass custom index 'i' for staggered delay
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.04, // Stagger delay based on character index
            duration: 0.3,   // Duration of single character animation
        },
    }),
    exit: {
        opacity: 0,
        y: -5, // Optional: slight up movement on exit
        transition: {
            duration: 0.1, // Faster exit
        }
    }
  };


  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Ensure you replace localhost with your actual API domain if deploying
        const response = await fetch("http://localhost:8000/api/property");
        if (response.ok) {
          const data = await response.json();
          if (data && data.img_url) {
            setImageUrl(data.img_url);
          } else {
            console.error("Invalid data structure from API:", data);
          }
        } else {
          console.error("Failed to fetch image from API, Status:", response.status);
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
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h5
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Slight delay after section appears
        >
          GET OUR APP
        </motion.h5>

        {/* Heading 1 with smooth character animation */}
        <h1>
          <AnimatePresence mode="popLayout"> {/* Use popLayout for smoother reflows */}
            {heading1Text.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`} // More robust key
                custom={index} // Pass index to variants
                variants={characterVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: 'inline-block' }} // Prevents layout jumps
              >
                {char === " " ? "\u00A0" : char} {/* Render non-breaking space for spaces */}
              </motion.span>
            ))}
          </AnimatePresence>
           {/* No Cursor Span */}
        </h1>

        {/* Heading 2 with smooth character animation and accent */}
        <h2>
          <AnimatePresence mode="popLayout">
            {heading2Text.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                custom={index}
                variants={characterVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: 'inline-block' }}
                className={index >= "From Your ".length ? styles.accentText : ""} // Apply accent style
              >
                 {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </AnimatePresence>
           {/* No Cursor Span */}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.6 }} // Delay until after second heading likely appears
        >
          Use our mobile app today to find the best <br />
          property deals available.
        </motion.p>

        <div className={styles.downloadButtons}>
          <motion.a
            href="/blog" // Consider updating href if it's not a blog link
            className={styles.downloadButton}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.4 }}
          >
            <img src="/icons/apple-14.svg" alt="iOS App Store" />
            <span>Download for iOS</span>
          </motion.a>
          <motion.a
            href="/blog" // Consider updating href
            className={styles.downloadButton}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0, duration: 0.4 }}
          >
            <img src="/icons/android-logo-2.svg" alt="Android Google Play" />
            <span>Download for Android</span>
          </motion.a>
        </div>
      </motion.div>

      <motion.img
        src={imageUrl}
        alt="Propatiz App Phone Mockup"
        className={styles.phoneMockup}
        initial={{ opacity: 0, scale: 0.8, x: 50 }} // Start slightly from the right
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} // Delay slightly
        whileHover={{
          rotate: [0, -2, 2, -2, 0], // Subtle rotation
          scale: 1.02,             // Slight scale up
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      />
    </section>
  );
};

export default BrowseApp;