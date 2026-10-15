"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/WordCycle.module.scss";

type WordCycleProps = {
  words: string[];
};

export default function WordCycle({ words }: WordCycleProps) {
  const wordsRef = useRef(words);
  wordsRef.current = words;
  const wordCount = words.length;
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(words[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (wordCount < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wordSequence = wordsRef.current;
    const currentWord = wordSequence[wordIndex] ?? "";
    const finishedTyping = visibleLength === currentWord.length;
    const delay = finishedTyping && !deleting ? 2200 : deleting ? 65 : 110;
    const timer = window.setTimeout(() => {
      if (!deleting && finishedTyping) {
        setDeleting(true);
      } else if (deleting && visibleLength === 0) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % wordSequence.length);
      } else {
        setVisibleLength((length) => length + (deleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, visibleLength, wordIndex, wordCount]);

  return (
    <span className={styles.word} aria-live="off">
      {words[wordIndex]?.slice(0, visibleLength)}
    </span>
  );
}
