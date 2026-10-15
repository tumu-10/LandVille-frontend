"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/WordCycle.module.scss";

type WordCycleProps = {
  words: string[];
};

export default function WordCycle({ words }: WordCycleProps) {
  const wordsRef = useRef(words);
  wordsRef.current = words;

  const [wordIndex, setWordIndex] = useState(0);
  const [revealProgress, setRevealProgress] = useState(1);
  const [deleting, setDeleting] = useState(false);
  const revealProgressRef = useRef(revealProgress);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const currentWord = wordsRef.current[wordIndex] ?? "";
    const from = revealProgressRef.current;
    const target = deleting ? 0 : 1;

    if (Math.abs(from - target) < 0.01) {
      if (!deleting && target === 1) {
        const holdTimer = window.setTimeout(() => setDeleting(true), 1400);
        return () => window.clearTimeout(holdTimer);
      }

      if (deleting && target === 0) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % wordsRef.current.length);
      }

      return;
    }

    let animationFrame = 0;
    let holdTimerId = 0;
    const duration = deleting ? Math.max(420, currentWord.length * 90) : Math.max(650, currentWord.length * 130);
    const startValue = from;
    const startTime = performance.now();

    const tick = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const timeProgress = Math.min(elapsed / duration, 1);
      const eased = timeProgress * timeProgress * (3 - 2 * timeProgress);
      const nextProgress = startValue + (target - startValue) * eased;

      setRevealProgress(nextProgress);
      revealProgressRef.current = nextProgress;

      if (timeProgress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      setRevealProgress(target);
      revealProgressRef.current = target;

      if (!deleting && target === 1) {
        holdTimerId = window.setTimeout(() => setDeleting(true), 1400);
      } else if (deleting && target === 0) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % wordsRef.current.length);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(holdTimerId);
    };
  }, [deleting, wordIndex, words.length]);

  const currentWord = words[wordIndex] ?? "";

  return (
    <span
      className={styles.word}
      style={{ clipPath: `inset(0 ${(1 - revealProgress) * 100}% 0 0)` }}
      aria-live="off"
    >
      {currentWord}
    </span>
  );
}
