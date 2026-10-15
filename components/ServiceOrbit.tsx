"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ServiceOrbit.module.scss";

export type ServiceOrbitItem = {
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export default function ServiceOrbit({ services }: { services: ServiceOrbitItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const activeService = services[activeIndex];

  useEffect(() => {
    if (services.length < 2 || orbitPaused) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % services.length);
    }, 5200);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, orbitPaused, services.length]);

  if (!activeService) return null;

  return (
    <section className={styles.orbitSection} aria-labelledby="orbit-title">
      <div className={styles.orbitIntro}>
        <span className={styles.eyebrow}><i /> THE LANDVILLE PROPERTY ORBIT</span>
        <h2 id="orbit-title">Every move,<br /><em>connected.</em></h2>
        <p>From a plot of land to the keys in your hand, explore the people, places, and expertise that make a property journey whole.</p>
        <span className={styles.orbitIndex}>0{activeIndex + 1}<i> / 0{services.length}</i></span>
      </div>

      <div
        className={styles.orbitExperience}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setOrbitPaused(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") setOrbitPaused(false);
        }}
        onFocusCapture={() => setOrbitPaused(true)}
        onBlurCapture={(event) => {
          if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
            setOrbitPaused(false);
          }
        }}
      >
        <div className={styles.orbitGraphic} aria-label="Choose a property service">
          <div className={styles.outerOrbit} />
          <div className={styles.innerOrbit} />
          <div className={styles.orbitCore}>
            <Image src="/logo 1.png" alt="" width={70} height={70} />
            <span>LANDVILLE</span>
          </div>
          <div className={`${styles.orbitingNodes} ${orbitPaused ? styles.orbitPaused : ""}`}>
            {services.map((service, index) => {
              const angle = (360 / services.length) * index - 90;
              return (
                <button
                  key={service.category}
                  className={`${styles.orbitNode} ${index === activeIndex ? styles.orbitNodeActive : ""}`}
                  style={{
                    "--angle": `${angle}deg`,
                    "--counter-angle": `${-angle}deg`,
                  } as CSSProperties}
                  type="button"
                  aria-label={`Show ${service.category}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{`0${index + 1}`}</span>
                </button>
              );
            })}
          </div>
        </div>

        <article className={styles.orbitFeature} key={activeService.category} aria-live="polite">
          <div className={styles.featureImage}>
            <Image src={activeService.image} alt={activeService.alt} fill sizes="(max-width: 760px) 90vw, 34vw" />
            <span className={styles.featureCategory}>{activeService.category}</span>
          </div>
          <div className={styles.featureCopy}>
            <span className={styles.featureNumber}>0{activeIndex + 1} / PROPERTY SERVICES</span>
            <h3>{activeService.title}</h3>
            <p>{activeService.description}</p>
            <Link href="/contact">Explore this service <span aria-hidden="true">↗</span></Link>
          </div>
        </article>
        <div className={styles.orbitKey} aria-label="All services">
          {services.map((service, index) => (
            <button
              key={service.category}
              className={index === activeIndex ? styles.keyActive : ""}
              type="button"
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <span>{`0${index + 1}`}</span>{service.category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
