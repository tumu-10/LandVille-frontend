import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";
import PropertyFilm from "@/components/PropertyFilm";
import styles from "./home.module.scss";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <HeroSection />

      <section className={styles.introduction} id="our-work">
        <div className={styles.sectionLabel}><span>01</span> A considered approach</div>
        <div className={styles.introContent}>
          <h2>Property is more than a place.<br /><em>It&apos;s where possibility takes shape.</em></h2>
          <div className={styles.introAside}>
            <p>
              LandVille Ventures is a Ugandan company working across real estate,
              development, and technology. We make the complex feel clear, and the
              important feel personal.
            </p>
            <Link href="/about" className={styles.textLink}>Our point of view <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <PropertyFilm
        src="/bg%201.mp4"
        poster="/The%20Hills%20Project%20-%20Nii%20Ofoe.jpg"
        posterAlt="The Hills Project"
        number="03"
        category="A closer look"
        title={<>Good places tell<br /><em>their own story.</em></>}
        description="Take a closer look at the spaces and possibilities shaping the property journey. A short film from the LandVille collection."
      />

      <section className={styles.showcase} aria-labelledby="showcase-title">
        <div className={styles.showcaseHeading}>
          <div>
            <div className={styles.sectionLabel}><span>02</span> One vision, many possibilities</div>
            <h2 id="showcase-title">Made for the<br /><em>way forward.</em></h2>
          </div>
          <p>Thoughtful spaces. Sound decisions. A more connected property journey.</p>
        </div>
        <div className={styles.imageComposition}>
          <Link className={styles.imageFeature} href="/services" aria-label="Explore residential real estate">
            <Image src="/The%20Hills%20Project%20-%20Nii%20Ofoe.jpg" alt="The Hills Project property" fill sizes="(max-width: 760px) 100vw, 56vw" />
            <span className={styles.imageLabel}><small>01 / REAL ESTATE</small><b>Room to live well</b><i aria-hidden="true">↗</i></span>
          </Link>
          <div className={styles.imageStack}>
            <Link className={styles.imageSecondary} href="/services">
              <Image src="/frontman%20studio%20ai%20film.jpg" alt="A contemporary property development" fill sizes="(max-width: 760px) 100vw, 32vw" />
              <span className={styles.imageLabel}><small>02 / DEVELOPMENT</small><b>Built for what&apos;s next</b><i aria-hidden="true">↗</i></span>
            </Link>
            <Link className={styles.imageSecondary} href="/services">
              <Image src="/download.jpg" alt="A LandVille property project" fill sizes="(max-width: 760px) 100vw, 32vw" />
              <span className={styles.imageLabel}><small>03 / INNOVATION</small><b>Ideas into action</b><i aria-hidden="true">↗</i></span>
            </Link>
          </div>
        </div>
        <div className={styles.showcaseFooter}>
          <span>Grounded in Uganda. Open to possibility.</span>
          <Link className={styles.textLink} href="/services">Explore our services <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.principles}>
        <div className={styles.principlesLead}>
          <div className={styles.sectionLabel}><span>03</span> What guides us</div>
          <h2>Good work starts<br /><em>with good questions.</em></h2>
          <p>We listen closely, look beyond the obvious, and keep our eye on what lasts.</p>
        </div>
        <div className={styles.principleList}>
          <article><span>01</span><div><h3>People before property</h3><p>Every project begins with understanding the people it serves.</p></div><i aria-hidden="true">↗</i></article>
          <article><span>02</span><div><h3>Clarity at every step</h3><p>We bring care and straight answers to decisions that matter.</p></div><i aria-hidden="true">↗</i></article>
          <article><span>03</span><div><h3>Built for the long view</h3><p>We value thoughtful choices that create enduring opportunity.</p></div><i aria-hidden="true">↗</i></article>
        </div>
      </section>

      <section className={styles.closing}>
        <Image src="/house1.jpg" alt="" fill sizes="100vw" />
        <div className={styles.closingShade} />
        <div className={styles.closingContent}>
          <div className={styles.sectionLabel}><span>04</span> Your next chapter</div>
          <h2>Let&apos;s find the<br /><em>right way forward.</em></h2>
          <p>Tell us what you&apos;re looking for. We&apos;ll start with a conversation.</p>
          <Link className={styles.primaryAction} href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
