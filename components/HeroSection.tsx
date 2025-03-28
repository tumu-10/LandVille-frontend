"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";
import styles from "@/styles/hero.module.scss";
import { FaArrowDown } from "react-icons/fa";

interface TypewriterLoopProps {
    word1: string[];
    word2: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseTime?: number;
  }
  
  const TypewriterLoop: React.FC<TypewriterLoopProps> = ({
    word1,
    word2,
    typingSpeed = 120,
    deletingSpeed = 80,
    pauseTime = 1000,
  }) => {
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const controls1 = useAnimationControls();
    const controls2 = useAnimationControls();
  
    const currentWord1 = word1[index] || "";
    const currentWord2 = word2[index] || "";
  
    useEffect(() => {
      const animate = async () => {
        if (!word1.length || !word2.length) return;
  
        if (!isDeleting) {
          // Animate word1: Reveal fully using clipPath (centered)
          await controls1.start({
            clipPath: "inset(0 0% 0 0%)",
            transition: {
              duration: (currentWord1.length * typingSpeed) / 1000,
              ease: "linear",
            },
          });
  
          // Animate word2: Typewriter effect (width from 0% to 100%)
          await controls2.start({
            width: "100%",
            transition: {
              duration: (currentWord2.length * typingSpeed) / 1000,
              ease: "linear",
            },
          });
  
          await new Promise((resolve) => setTimeout(resolve, pauseTime));
          setIsDeleting(true);
        } else {
          // Animate word2 deletion: Shrink width to 0% so it completely disappears
          await controls2.start({
            width: "0%",
            transition: {
              duration: (currentWord2.length * deletingSpeed) / 1000,
              ease: "linear",
            },
          });
  
          // Animate word1 deletion: Retract using clipPath at a slower pace
          await controls1.start({
            clipPath: "inset(0 100% 0 0%)",
            transition: {
              duration: (currentWord1.length * (deletingSpeed * 1.5)) / 1000,
              ease: "linear",
            },
          });
  
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % word1.length);
        }
      };
  
      animate();
    }, [
      isDeleting,
      index,
      word1,
      word2,
      controls1,
      controls2,
      currentWord1,
      currentWord2,
      typingSpeed,
      deletingSpeed,
      pauseTime,
    ]);
  
    return (
      <div className={styles.container}>
        {/* Word1: Centered, using clipPath */}
        <motion.div
          className={styles.topLine}
          initial={{ clipPath: "inset(0 100% 0 0%)" }}
          animate={controls1}
          style={{
            position: "relative",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "fit-content",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {currentWord1}
        </motion.div>
  
        {/* Word2: Typewriter effect with width animation */}
        <motion.div
          className={styles.gradientText}
          initial={{ width: "0%" }}
          animate={controls2}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            marginTop: "0.5rem",
            textAlign: "center",
          }}
        >
          {currentWord2}
        </motion.div>
      </div>
    );
  };


export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    // State to store dynamic words from the API
    const [word1, setWord1] = useState<string[]>([]);
    const [word2, setWord2] = useState<string[]>([]);

    // State to store the video URL
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    // Fetch the video URL and title words from the API
    useEffect(() => {
        const fetchVideoAndTitles = async () => {
            try {
                // Fetch video URL
                const videoResponse = await fetch("http://127.0.0.1:8000/api/video");
                if (videoResponse.ok) {
                    const videoData = await videoResponse.json();
                    setVideoUrl(videoData.video_path_url);
                } else {
                    console.error("Failed to fetch video");
                }

                // Fetch title words (word1 and word2)
                const titleResponse = await fetch("http://127.0.0.1:8000/api/title");
                if (titleResponse.ok) {
                    const titleData = await titleResponse.json();

                    // Extract word1 and word2 dynamically from the response
                    const words1 = titleData.map((item: { word1: string }) => item.word1);
                    const words2 = titleData.map((item: { word2: string }) => item.word2);

                    setWord1(words1); // Set the dynamic word1 array
                    setWord2(words2); // Set the dynamic word2 array
                } else {
                    console.error("Failed to fetch title data");
                }
            } catch (error) {
                console.error("Error fetching video and titles:", error);
            }
        };

        fetchVideoAndTitles();
    }, []);

    return (
        <section ref={containerRef} className={styles.heroSection}>
            {/* Background Video */}
            <motion.video autoPlay muted loop className={styles.backgroundVideo} style={{ scale }}>
                {videoUrl ? (
                    <source src={videoUrl} type="video/mp4" />
                ) : (
                    <p>Loading video...</p> // Optional fallback text or content while the video is loading
                )}
            </motion.video>

            {/* Particles Overlay */}
            
            {/* Three.js Interactive Canvas */}
           
            {/* Centered Content Container */}
            <div className={styles.contentContainer}>
                <motion.div className={styles.textContent} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                    <h1 className={styles.mainTitle}>
                        <TypewriterLoop word1={word1} word2={word2} />
                    </h1>
                    <motion.p className={styles.subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        Transforming landscapes through
                        <span className={styles.highlight}> smart technology</span> and
                        <span className={styles.highlight}> sustainable design</span>
                    </motion.p>
                    <motion.div className={styles.ctaWrapper} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }}>
                        <motion.button
                            className={styles.ctaButton}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: "smooth" })}
                        >
                            Explore Developments
                            <FaArrowDown className={styles.ctaIcon} />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <motion.div className={styles.scrollLine} animate={{ y: [0, 20], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            </div>
        </section>
    );
}
