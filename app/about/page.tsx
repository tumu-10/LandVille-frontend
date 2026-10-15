import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.scss";
import WordCycle from "@/components/WordCycle";
import PropertyFilm from "@/components/PropertyFilm";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata(
  "About",
  "Meet LandVille Ventures, a Kampala-based Ugandan company bringing real estate, property development, and technology together.",
  "/about",
);

const values = [
  {
    number: "01",
    title: "Excellence",
    accent: "Craft + standards",
    description: "We raise the bar in every detail, from the first discussion to the final handover.",
  },
  {
    number: "02",
    title: "Customer care",
    accent: "People first",
    description: "We listen carefully, communicate clearly, and stay close to your journey at every step.",
  },
  {
    number: "03",
    title: "Trust & integrity",
    accent: "Honest guidance",
    description: "Every recommendation is grounded in transparency, sound judgment, and long-term value.",
  },
  {
    number: "04",
    title: "Progress with purpose",
    accent: "Meaningful growth",
    description: "We create spaces and opportunities that help people move forward with confidence.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <Image src="/office.jpg" alt="A calm, light-filled workspace" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><span /> About LandVille</p>
          <h1>We believe in<br /><em>the promise of <WordCycle words={["place.", "trust.", "growth."]} /></em></h1>
          <p className={styles.heroText}>Building tomorrow&apos;s communities, today. Your gateway to innovation and excellence across real estate, technology, and beyond.</p>
        </div>
        <span className={styles.heroNumber}>OUR STORY&nbsp; / &nbsp;01</span>
      </section>

      <section className={styles.story}>
        <div className={styles.sectionLabel}>A little about us</div>
        <div className={styles.storyGrid}>
          <h2>Thoughtful by nature.<br /><em>Ambitious by design.</em></h2>
          <div>
            <p>LandVille Ventures works at the meeting point of property and possibility. We help people navigate real estate with care, connect opportunity with thoughtful development, and explore technology that makes the journey more useful.</p>
            <p>Our roots are in Kampala. Our outlook is practical, curious, and always focused on creating lasting value for the people and places around us.</p>
            <Link className={styles.textLink} href="/services">What we do <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <PropertyFilm
        src="/bg%207.mp4"
        poster="/frontman%20studio%20ai%20film.jpg"
        posterAlt="A contemporary building project"
        number="02"
        category="From plans to places"
        title={<>A vision made<br /><em>real, together.</em></>}
        description="We bring people, property, and practical ideas together to create more confident steps from a first conversation to a finished place."
      />

      <section className={styles.values}>
        <div className={styles.valuesIntro}>
          <div className={styles.sectionLabel}>Our values</div>
          <h2>What we stand<br /><em>for, every day.</em></h2>
          <p>Every decision we make is guided by quality, clarity, and genuine care for the people we serve.</p>
        </div>
        <div className={styles.valueCards}>
          {values.map(({ number, title, accent, description }) => (
            <article key={title} className={styles.valueCard}>
              <span className={styles.valueNumber}>{number} / PRINCIPLE</span>
              <div className={styles.valueMark} aria-hidden="true"><span /></div>
              <h3>{title}</h3>
              <span className={styles.valueAccent}>{accent}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.aboutCta}>
        <p className={styles.eyebrow}><span /> Let&apos;s build something meaningful</p>
        <h2>Good work begins<br /><em>with a conversation.</em></h2>
        <Link className={styles.ctaLink} href="/contact">Talk to our team <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
