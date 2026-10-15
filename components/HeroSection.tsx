"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/hero.module.scss";
import WordCycle from "./WordCycle";

const slides = [
  {
    image: "/house1.jpg",
    alt: "A contemporary home glowing warmly at dusk",
    type: "RESIDENTIAL",
    title: "A home with room to grow",
    place: "Kampala, Uganda",
  },
  {
    image: "/apartment.jpg",
    alt: "A contemporary apartment building with glass balconies",
    type: "APARTMENTS",
    title: "A better way to live",
    place: "Made for modern life",
  },
  {
    image: "/c.jpg",
    alt: "A contemporary glass-fronted commercial building",
    type: "DEVELOPMENT",
    title: "Built for what comes next",
    place: "A brighter future",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGallery} aria-live="off">
        {slides.map((item, index) => (
          <Image
            key={item.image}
            className={`${styles.heroImage} ${index === activeSlide ? styles.heroImageActive : ""}`}
            src={item.image}
            alt={index === activeSlide ? item.alt : ""}
            fill
            priority={index === 0}
            sizes="100vw"
          />
        ))}
      </div>
      <div className={styles.imageShade} />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> LandVille Ventures <span className={styles.eyebrowDivider}>/</span> Kampala, Uganda</p>
          <h1 id="hero-title">A place to<br />begin <em><WordCycle words={["what's next.", "a new chapter.", "your next move."]} /></em></h1>
          <p className={styles.subtitle}>
            We bring people, property and possibility together to shape places with a future.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="/services">
              Discover what we do <span aria-hidden="true">↗</span>
            </Link>
            <Link className={styles.secondaryAction} href="/about">Get to know us</Link>
          </div>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureType}><i /> {slide.type}</span>
          <strong>{slide.title}</strong>
          <span className={styles.featurePlace}>{slide.place}</span>
          <span className={styles.featureDivider} />
          <div className={styles.slideControls} aria-label="Featured property slides">
            {slides.map((item, index) => (
              <button
                className={index === activeSlide ? styles.slideButtonActive : ""}
                key={item.image}
                type="button"
                aria-label={`Show slide ${index + 1}: ${item.title}`}
                aria-pressed={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              >
                <span>{`0${index + 1}`}</span>
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>
      <a className={styles.scrollCue} href="#our-work" aria-label="Scroll to explore LandVille">
        <span>Scroll to explore</span><i />
      </a>
      <div className={styles.heroStamp} aria-hidden="true">L<span>V</span></div>
    </section>
  );
}
