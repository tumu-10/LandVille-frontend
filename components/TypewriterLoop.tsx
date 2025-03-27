"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "@/styles/hero.module.scss";

interface TypewriterLoopProps {
  word1: string[];
  word2: string[];
}

const letterTransition = {
  duration: 1, // Adjust duration for smoothness
  ease: "easeOut",
};

const TypewriterLoop: React.FC<TypewriterLoopProps> = ({ word1, word2 }) => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    // Concatenate all words in the array into a single string
    setText1(word1.join(" "));
    setText2(word2.join(" "));
  }, [word1, word2]);

  const renderAnimatedText = (text: string) => (
    <AnimatePresence>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{
            opacity: 0,
            letterSpacing: "-0.1em", // Initial tight spacing
          }}
          animate={{
            opacity: 1,
            letterSpacing: "0.1em", // Gradual spread of letters
          }}
          exit={{
            opacity: 0,
            letterSpacing: "-0.1em", // Shrink back letter spacing on exit
          }}
          transition={{
            ...letterTransition,
            delay: index * 0.05, // Delay for staggered animation
          }}
        >
          {char}
        </motion.span>
      ))}
    </AnimatePresence>
  );

  return (
    <div>
      <span className={`${styles.titleLine} ${styles.typewriter}`}>
        {renderAnimatedText(text1)}
      </span>
      <span className={`${styles.gradientText} ${styles.typewriter}`}>
        {renderAnimatedText(text2)}
      </span>
    </div>
  );
};

export default TypewriterLoop;
