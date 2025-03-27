"use client";
import { motion } from "framer-motion";
import styles from "@/styles/ProjectCard.module.scss";
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FloatingShapeData {
    left: string;
    top: string;
    scale: number;
    animationDelay: string;
}

const RealEstatePartner = () => {
    const [floatingShapesData, setFloatingShapesData] = useState<FloatingShapeData[]>([]);

    useEffect(() => {
        const newFloatingShapesData = [...Array(5)].map(() => ({
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            scale: Math.random() * 0.8 + 0.2,
            animationDelay: `${Math.random()}s`,
        }));
        setFloatingShapesData(newFloatingShapesData);
    }, []);


    return (
        <section className={styles.partnerSection}>
            <motion.div
                className={styles.topLogos}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <img src="/icons/bridgewater-50947.svg" alt="Bridgewater Associates Logo" />
                <img src="/icons/eddie-g-2.svg" alt="Eddie G Corporation Logo" />
                <img src="/icons/cubilock-enterprise-mobility-management.svg" alt="Cubilock Enterprise Logo" />
                <img src="/icons/avocode-inc-1.svg" alt="Avocode Inc Logo" />
            </motion.div>

            <div className={styles.contentWrapper}>
                <motion.div
                    className={styles.imageContainer}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Image
                        src="/house.jpeg"
                        alt="Luxury modern house with a pool in Beverly Hills"
                        className={styles.realEstateImage}
                        width={600}
                        height={400}
                        style={{ objectFit: 'cover' }}
                       
                      />
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.textContent}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <h2>
                        Your Premier <br />
                        <span>Real Estate</span> Partner
                    </h2>
                    <p>
                        Finding the perfect property is more than location; it’s about
                        finding a place to call home, grow your business, or an investment
                        opportunity.
                    </p>
                    <motion.button
                        className={styles.ctaButton}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            document.getElementById('nextSection')?.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }}
                    >
                        Explore Propatiz
                    </motion.button>

                </motion.div>
            </div>
            <motion.div
                className={styles.floatingShapes}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, staggerChildren: 0.2 }}
            >
                {floatingShapesData.map((shape, i) => (
                    <motion.div
                        key={i}
                        className={styles.floatingShape}
                        style={{
                            left: shape.left,
                            top: shape.top,
                            scale: shape.scale,
                            animationDelay: shape.animationDelay,
                        }}
                        variants={{
                            initial: { y: 0, rotate: Math.random() * 360 - 180 },
                            animate: { y: 100, rotate: Math.random() * 360 },
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 6 + Math.random() * 4,
                            ease: "linear",
                        }}
                    />
                ))}
            </motion.div>
            <section id="nextSection">
                {/* Content of the next section goes here */}
                
            </section>
        </section>
    );
};

export default RealEstatePartner;