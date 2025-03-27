"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import "@/styles/about.scss";

// Type definitions
interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  bgType?: 'parallax' | 'wave';
}

interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

interface PillarItem {
  icon: string;
  title: string;
  description?: string;
}

interface OrbitItem {
  items: Array<{
    icon: string;
    label: string;
  }>;
}
// Data Structures
const coreValues = [
  {
    icon: "💎",
    title: "Excellence",
    description: "Perfection is our baseline standard"
  },
  {
    icon: "🎯",
    title: "Determination",
    description: "Relentless pursuit of ambitious goals"
  },
  {
    icon: "🏆",
    title: "Quality",
    description: "Uncompromising standards in every detail"
  }
];



const advantages = [

  {
    icon: "💎",
    title: "Unmatched Expertise",
    description: "Decades of combined industry experience"
  },
  {
    icon: "🚀",
    title: "Innovative Solutions",
    description: "Pioneering cutting-edge industry solutions"
  },
  {
    icon: "🤝",
    title: "Client-Centric",
    description: "24/7 white-glove service commitment"
  },
  {
    icon: "🌍",
    title: "Global Reach",
    description: "International network across 25+ countries"
  },
  {
    icon: "💡",
    title: "Tech Leadership",
    description: "PropTech pioneers since 2022"
  }
];

const missionPillars = [
  { icon: "🏗️", title: "Real Estate Mastery" },
  { icon: "🤖", title: "Tech Innovation" },
  { icon: "🌐", title: "Global Impact" }
];

const cultureOrbits = [
  {
    items: [
      { icon: "👥", label: "Teamwork" },
      { icon: "📚", label: "Learning" }
    ]
  },
  {
    items: [
      { icon: "💪", label: "Perseverance" },
      { icon: "🔄", label: "Adaptation" }
    ]
  },
  
];

const culturePillars = [
  {
    icon: "📈",
    title: "Continuous Growth",
    description: "Daily learning and skill development programs"
  },
  {
    icon: "🤝",
    title: "Collaborative Spirit",
    description: "Cross-functional team synergy sessions"
  },
  {
    icon: "🛡️",
    title: "Resilience",
    description: "Adaptive problem-solving frameworks"
  }
];

const careerPerks = [
  { icon: "💰", label: "Competitive Salary" },
  { icon: "🌴", label: "Flexible Vacation" },
  { icon: "📚", label: "Learning Budget" },
  { icon: "🏥", label: "Premium Healthcare" }
];

// Section Wrapper Component

const SectionWrapper = ({ children, id, bgType }: SectionWrapperProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className={`section-wrapper ${bgType ?? ""}`} id={id}>
      {bgType === 'parallax' && (
        <motion.div 
          className="parallax-overlay"
          style={{ y }}
        />
      )}
      {bgType === 'wave' && (
        <div className="section-wave">
          <svg viewBox="0 0 1440 120">
            <path d="M0,64L120,80C240,96,480,128,720,128C960,128,1200,96,1320,80L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
          </svg>
        </div>
      )}
      <div className="section-content">{children}</div>
    </section>
  );
};

const AboutPage = () => {
  const [galleryImageUrl, setGalleryImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch image data from API
    const fetchImage = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/collage");
        const data = await response.json();
        setGalleryImageUrl(data.image_url); // Assuming `image_url` is the field in the API response
      } catch (error) {
        console.error("Failed to fetch image data:", error);
      }
    };

    fetchImage();
  }, []);


   // Scrolling handler with proper type safety
   const handleScroll = () => {
    const sections = document.querySelectorAll<HTMLElement>('section');
    const currentScroll = window.scrollY + (window.innerHeight * 0.5);
    
    for (const section of sections) {
      if (section.offsetTop > currentScroll) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
        break;
      }
    }
  };
  return (
    <div className="about-container">
      {/* Hero Section (keep existing hero markup) */}
      <section className="hero-section">
        <div className="hero-particles">
          {[...Array(50)].map((_, i) => (
            <div key={`particle-${i}`} className="particle" />
          ))}
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 320">
            <path
              fill="rgba(255,204,0,0.1)"
              d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,165.3C672,160,768,192,864,192C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <h1>
            <span className="gradient-stroke">Building Tomorrow's</span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="gradient-text"
            >
              Legacy Today
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="hero-subtitle"
          >
            Innovating real estate, technology, and import solutions with excellence.
          </motion.p>
        </motion.div>
        <div className="scrolling-indicator">
  <div 
    className="scroll-arrow"
    onClick={() => {
      const sections = document.querySelectorAll('section');
      const currentScroll = window.scrollY + (window.innerHeight * 0.5);
      
      // Find first section below middle of viewport
      for (const section of sections) {
        if (section.offsetTop > currentScroll) {
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          });
          break;
        }
      }
    }}
  />
</div>
      </section>
      {/* Who We Are Section */}
      <SectionWrapper id="who-we-are">
        <div className="content-grid">
          <motion.div 
            className="content-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <h2>Who We Are</h2>
            <p>
              At LandVille Ventures, we provide cutting-edge solutions in real estate, 
              equipment importation, and software development. Our commitment to innovation 
              ensures we deliver exceptional value to our clients.
            </p>
            <div className="core-values">
              {coreValues.map((value, index) => (
                <motion.div
                  key={`value-${index}`}
                  className="value"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="content-image"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="image-container"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -2, 2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
             {galleryImageUrl ? (
                <Image 
                  src={galleryImageUrl} 
                  width={600} 
                  height={600} 
                  alt="Who We Are" 
                  priority 
                />
              ) : (
                <div>Loading...</div>
              )}
            </motion.div>
            <div className="animated-backdrop" />
          </motion.div>
        </div>
      </SectionWrapper>


      {/* Why Choose Us Section */}
      <SectionWrapper id="why-us" bgType="parallax">
        <h2 className="section-title">Why LandVille Ventures?</h2>
        <div className="advantage-cards">
          {advantages.map((advantage, index) => (
            <motion.div
              key={`advantage-${index}`}
              className="advantage-card"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ margin: "0px 0px -100px 0px" }}
            >
              <div className="card-glow" />
              <div className="card-icon">{advantage.icon}</div>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Mission Section */}
      <SectionWrapper id="mission">
        <div className="mission-grid">
          <motion.div 
            className="mission-content"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
           
          >
            <h2>Our Mission</h2>
            <p className="mission-statement">
              To revolutionize global real estate standards through innovative solutions,
              ethical practices, and technological leadership.
            </p>
            <div className="mission-pillars">
              {missionPillars.map((pillar, index) => (
                <motion.div
                  key={`pillar-${index}`}
                  className="pillar"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="pillar-icon">{pillar.icon}</div>
                  <h5>{pillar.title}</h5>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="mission-visual"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            
          >
            <div className="globe-animation" />
            <div className="data-points">
              <motion.div className="data-point" whileHover={{ scale: 1.1 }}>25+ Countries</motion.div>
              <motion.div className="data-point" whileHover={{ scale: 1.1 }}>$10B+ Assets</motion.div>
              <motion.div className="data-point" whileHover={{ scale: 1.1 }}>98% Satisfaction</motion.div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Culture Section */}
      <SectionWrapper id="culture" bgType="wave">
        <div className="culture-container">
          <motion.div
            className="culture-visual"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="orbital-system">
              {cultureOrbits.map((orbit, index) => (
                <div key={`orbit-${index}`} className={`orbit orbit-${index + 1}`}>
                  {orbit.items.map((item, itemIndex) => (
                    <motion.div 
                      key={`orbit-item-${itemIndex}`}
                      className="orbital-item"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
          <div className="culture-content">
            <h2 className="section-title">Cultural Ecosystem</h2>
            <p className="culture-statement">
              We thrive through perpetual growth, collaborative synergy, and resilient adaptation.
            </p>
            <div className="culture-pillars">
              {culturePillars.map((pillar, index) => (
                <motion.div
                  key={`culture-pillar-${index}`}
                  className="pillar"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="pillar-icon">{pillar.icon}</div>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Join CTA Section */}
      <section className="join-section">
              <div className="join-gradient" />
              <motion.div 
                className="join-content"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <h2>Shape the Future With Us</h2>
                <p>
                  Join our team of visionaries and industry leaders redefining global real estate.
                  Bring your expertise to our innovative ecosystem.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-button"
                >
                  Explore Careers →
                </motion.button>
                <div className="perks-grid">
                  {careerPerks.map((perk, index) => (
                    <div key={index} className="perk">
                      <div className="perk-icon">{perk.icon}</div>
                      <span>{perk.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;