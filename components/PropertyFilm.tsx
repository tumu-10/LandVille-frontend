import type { ReactNode } from "react";
import Image from "next/image";
import styles from "@/styles/PropertyFilm.module.scss";

type PropertyFilmProps = {
  src: string;
  poster: string;
  posterAlt: string;
  number: string;
  category: string;
  title: ReactNode;
  description: string;
};

export default function PropertyFilm({
  src,
  poster,
  posterAlt,
  number,
  category,
  title,
  description,
}: PropertyFilmProps) {
  return (
    <section className={styles.filmSection}>
      <div className={styles.filmCopy} data-reveal="left">
        <p className={styles.eyebrow}><span>{number}</span> {category}</p>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <figure className={styles.filmFrame} data-reveal="right">
        <video autoPlay loop muted playsInline preload="metadata" poster={poster} aria-label={posterAlt}>
          <source src={src} type="video/mp4" />
          Your browser does not support embedded video.
        </video>
        <figcaption>
          <Image src={poster} alt={posterAlt} width={40} height={40} />
          <span>LandVille / Property in focus</span>
          <span className={styles.playHint} aria-hidden="true">PLAY FILM ↗</span>
        </figcaption>
      </figure>
    </section>
  );
}
