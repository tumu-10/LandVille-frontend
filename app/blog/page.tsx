// src/pages/Home.tsx
"use client";
import React, { useRef, useEffect } from 'react';
import { Typed } from 'react-typed';


import '@/styles/blog.scss';

const BlogPage: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    } else {
                        entry.target.classList.remove('show');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

   

    return (
        <div className="home">
           

            {/* Exclusive Services Section with 3D Cards */}
            <section className="exclusive-services fade-in-section">
                <h2>Coming Soon......</h2>
                
            </section>

           
          

        
           
        </div>
    );
};

export default BlogPage;