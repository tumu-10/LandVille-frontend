import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.scss";
import WordCycle from "@/components/WordCycle";
import PropertyFilm from "@/components/PropertyFilm";

export const metadata: Metadata = {
  title: "About",
  description: "Meet LandVille Ventures: a Ugandan company bringing real estate, development, and technology together.",
};

const leadership = [
  {
    number: "01",
    name: "Barigye Moses",
    title: "Chief Executive Officer",
    shortTitle: "CEO",
    image: "/CEO.jpg",
    focus: "Vision & direction",
    description: "Setting the vision and guiding LandVille's long-term direction.",
  },
  {
    number: "02",
    name: "Tumusiime Samuel Robin",
    title: "Managing Director",
    shortTitle: "MD",
    image: "/MD.jpg",
    focus: "Operations & growth",
    description: "Turning strategy into thoughtful work, strong partnerships, and progress.",
  },
  {
    number: "03",
    name: "Aquino Amaya",
    title: "Chief Administrator",
    shortTitle: "CA",
    image: "/Admin.jpg",
    focus: "People & practice",
    description: "Creating the structure and care that keep every detail moving.",
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
          <p className={styles.heroText}>A grounded, forward-looking company bringing real estate, development, and new ideas together in Uganda.</p>
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
          <div className={styles.sectionLabel}>How we show up</div>
          <h2>Good things are<br /><em>built on trust.</em></h2>
        </div>
        <div className={styles.valueList}>
          <article><span>01</span><div><h3>Care in the details</h3><p>We treat every brief, space, and relationship with the attention it deserves.</p></div></article>
          <article><span>02</span><div><h3>Progress with purpose</h3><p>We pursue new ideas when they make a real difference to people and place.</p></div></article>
          <article><span>03</span><div><h3>Partnership that lasts</h3><p>We believe the strongest outcomes are built through openness and shared ambition.</p></div></article>
        </div>
      </section>

      <section className={styles.leadership}>
        <div className={styles.leadershipHeader}>
          <div>
            <div className={styles.sectionLabel}>The people behind the work</div>
            <h2>Clear vision.<br /><em>Considered leadership.</em></h2>
          </div>
          <p>Three distinct responsibilities, one shared commitment to moving LandVille forward.</p>
        </div>
        <div className={styles.leaderList}>
          {leadership.map((leader) => (
            <article className={styles.leader} key={leader.number} tabIndex={0}>
              <div className={styles.leaderImage}>
                <Image
                  className={styles.leaderPortrait}
                  src={leader.image}
                  alt={`${leader.name}, ${leader.title}`}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
                <span className={styles.leaderNumber}>{leader.number}</span>
                <span className={styles.leaderShort}>{leader.shortTitle}</span>
              </div>
              <div className={styles.leaderDetails}>
                <span>{leader.focus}</span>
                <h3>{leader.name}</h3>
                <p><strong>{leader.title}</strong></p>
                <p className={styles.leaderDescription}>{leader.description}</p>
              </div>
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
