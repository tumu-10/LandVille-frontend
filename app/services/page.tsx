import Image from "next/image";
import Link from "next/link";
import styles from "./services.module.scss";
import WordCycle from "@/components/WordCycle";
import ServiceOrbit from "@/components/ServiceOrbit";
import PropertyFilm from "@/components/PropertyFilm";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata(
  "Property Services in Uganda",
  "Explore LandVille Ventures' real estate, land sales, property development, construction, surveying, property management, and consultancy services in Uganda.",
  "/services",
);

const services = [
  {
    number: "01",
    category: "Sales & purchase",
    title: "Find the right place.",
    description: "Guidance for buying and selling land, homes, and investment property with clarity at every step.",
    image: "/house.jpeg",
    alt: "A spacious contemporary home in a tropical setting",
  },
  {
    number: "02",
    category: "Construction & development",
    title: "Build what comes next.",
    description: "From early planning to construction, we help turn promising land and ideas into lasting places.",
    image: "/d1.jpg",
    alt: "A builder inspecting a home during construction",
  },
  {
    number: "03",
    category: "Land surveying",
    title: "Know your ground.",
    description: "Practical surveying support to help you understand boundaries, site conditions, and land potential.",
    image: "/meeting.jpg",
    alt: "A team reviewing development plans and survey documents",
  },
  {
    number: "04",
    category: "Property management",
    title: "Care for your investment.",
    description: "Reliable oversight that helps owners protect, maintain, and get more from their property.",
    image: "/apartment.jpg",
    alt: "A bright, well-kept apartment dining room",
  },
  {
    number: "05",
    category: "Real estate consultancy",
    title: "Make your next move clear.",
    description: "Thoughtful property advice to help you assess opportunities and make informed decisions.",
    image: "/meeting.jpg",
    alt: "Property professionals discussing a real estate opportunity",
  },
  {
    number: "06",
    category: "Technology & innovation",
    title: "Make the journey clearer.",
    description: "Exploring useful digital tools that bring people and property closer together.",
    image: "/download.jpg",
    alt: "A conceptual property technology app interface",
  },
  {
    number: "07",
    category: "Equipment importation",
    title: "Move good ideas forward.",
    description: "Helping clients navigate equipment sourcing and import needs with a thoughtful, service-led approach.",
    image: "/meeting.jpg",
    alt: "Professionals collaborating over development plans",
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.services}>
      <section className={styles.hero}>
        <Image src="/h2.jpg" alt="Modern architecture designed to bring light and space together" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><span /> What we do</p>
          <h1>One partner.<br /><em>Room to <WordCycle words={["move.", "build.", "grow."]} /></em></h1>
          <p>From the first question to the next big step, we bring care and clarity to every part of the property journey.</p>
          <a href="#services-list" className={styles.heroLink}>Explore our services <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <ServiceOrbit services={services} />

      <PropertyFilm
        src="/bg%203.mp4"
        poster="/download.jpg"
        posterAlt="A LandVille property opportunity"
        number="02"
        category="Spaces with potential"
        title={<>From the ground<br /><em>up and onward.</em></>}
        description="Explore the spaces and decisions behind a property journey—from understanding the land to shaping a place people can call home."
      />

      <section className={styles.servicesList} id="services-list">
        <div className={styles.listIntro}>
          <div className={styles.sectionLabel}>Our areas of focus</div>
          <h2>Expertise, connected<br /><em>by one point of view.</em></h2>
        </div>
        <div className={styles.serviceRows}>
          {services.map((service) => (
            <Link className={styles.serviceRow} href="/contact" key={service.number} aria-label={`Ask us about ${service.category}`}>
              <div className={styles.serviceNumber}>{service.number}</div>
              <div className={styles.serviceCopy}>
                <span>{service.category}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className={styles.serviceAction}>Explore this service <i aria-hidden="true">↗</i></span>
              </div>
              <div className={styles.serviceImage}>
                <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 28vw" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.serviceCta}>
        <div className={styles.sectionLabel}>Every journey starts somewhere</div>
        <h2>Tell us what you have<br /><em>in mind.</em></h2>
        <p>We&apos;ll take the time to understand, then help you find the right next step.</p>
        <a className={styles.ctaLink} href="tel:+256774413516">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
