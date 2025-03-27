"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/combinedCard.module.scss";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Define the type for a testimonial
interface Testimonial {
  name: string;
  desc: string;
  avatar_url: string;
}

const CombinedSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Fetch testimonials from the API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/testimonials");
        const data: Testimonial[] = await response.json();
        setTestimonials(data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className={styles.combinedSection}>
      {/* Introduction */}
      <motion.div className={styles.intro} initial="hidden" animate="visible" variants={fadeIn}>
        <h4>Our <span>Community</span> Speaks</h4>
        <p>Discover inspiring testimonials from those who are part of our journey.</p>
      </motion.div>

      <div className={styles.contentWrapper}>
        {/* Testimonials */}
        <div className={styles.testimonials}>
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <motion.div key={index} className={styles.testimonialCard} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className={styles.imageWrapper}>
                  <img src={testimonial.avatar_url} alt={testimonial.name} />
                </div>
                <h4>{testimonial.name}</h4>
                <p>{testimonial.desc}</p>
              </motion.div>
            ))
          ) : (
            <p>Loading testimonials...</p>
          )}
        </div>

        {/* Call-to-Action */}
        <motion.div className={styles.cta} initial="hidden" animate="visible" variants={fadeIn}>
          <div className={styles.ctaContent}>
            <h5>JOIN OUR COMMUNITY</h5>
            <h2>Be Part of <span>the Next Big Movement</span> </h2>
            <p>Get exclusive insights and stay ahead in innovation.</p>
            <a href="/about">
              <motion.button whileHover={{ scale: 1.1 }} className={styles.ctaButton}>
                Learn More
              </motion.button>
            </a>
          </div>
          <div className={styles.ctaBackground} />
        </motion.div>
      </div>
    </section>
  );
};

export default CombinedSection;
