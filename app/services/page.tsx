"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from "framer-motion";
import Link from "next/link";
import '@/styles/services.scss';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  services_title: string;
  services_desc: string;
  sub_services: string[];
  services_img_url?: string;
  services_video_url?: string;
}

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [service]);

  return (
    <div className="service-card" ref={cardRef}>
      {service.services_img_url && <img src={service.services_img_url} alt={service.services_title} />}
      {service.services_video_url && (
        <video controls loop muted>
          <source src={service.services_video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <h3>{service.services_title}</h3>
      <p>{service.services_desc}</p>
      <ul>
        {service.sub_services.map((subService, index) => (
          <li key={index}>{subService}</li>
        ))}
      </ul>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        // Assuming the API returns an array of services
        setServices(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="services-page">
      {/* Add floating background elements */}
      <div className="floating-background-elements">
        <div className="floating-house">🏠</div>
        <div className="floating-coin">💰</div>
        <div className="floating-graph">🌍</div>
        <div className="floating-key">🔑</div>
        <div className="floating-document">📄</div>
      </div>

      <header className="services-header">
        <h1>
          <span className="gradient-stroke">Our Expertise, </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="gradient-text"
          >
            Your success.
          </motion.span>
        </h1>

        <p>Discover a wide range of real estate services tailored to meet your needs.</p>
      </header>

      <section className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>

      <section className="interactive-map">
        {/* TODO: Implement interactive map here (e.g., Leaflet, Google Maps) */}
        <h2>Our Location</h2>
        <Link className="p" href="https://www.google.com/maps/place/Kyanja+Mall">
          Explore our properties and services in key locations.
        </Link>
        <div className="map-container">
          {/* Placeholder for the map */}
          <img src="map.png" alt="Interactive Map" />
        </div>
      </section>

      <section className="call-to-action">
        <h2>Ready to get started?</h2>
        <p>Contact us today to discuss your real estate goals.</p>
        <Link href="/contact">
          <button>Get in Touch</button>
        </Link>
      </section>

      <div className="react-three-fiber-background">
        {/* Placeholder for React-Three-Fiber component */}
        <p>Placeholder for 3D background</p>
      </div>
    </div>
  );
};

export default ServicesPage;
