"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCard";
import ProjectCard from "@/components/ProjectCard";
import AppCard from "@/components/AppCard";
import CombinedCard from "@/components/CombinedCard";
import HeroSection from "@/components/HeroSection";
import styles from "@/styles/Home.module.scss";
import { FaArrowDown } from "react-icons/fa";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section with Background Video */}
      <section className={styles.heroSection}>
       <HeroSection/>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialSection}>
        <TestimonialCard/>
      </section>

      {/* Projects Section */}
      <section className={styles.projectsSection}>
        < ProjectCard/>
      </section>

      {/* App */}
      <section className={styles.appSection}>
        <AppCard/>
      </section>

      {/* combinedcard */}
      <section className={styles.combinedSection}>
        <CombinedCard/>
      </section>

    </div>
  );
}
