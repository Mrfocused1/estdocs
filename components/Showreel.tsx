"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useContent } from "@/contexts/ContentContext";

const Showreel = () => {
  const { content } = useContent();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="section-padding bg-gradient-to-b from-dark-navy to-accent-black">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-4">
            {content.homepage.showreelTitle.split(' ').slice(0, -1).join(' ')} <span className="primary-red">{content.homepage.showreelTitle.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-lg text-white/80 font-body max-w-2xl mx-auto">
            {content.homepage.showreelDescription}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-card overflow-hidden group"
        >
          <div className="relative aspect-video bg-gradient-to-br from-dark-navy to-accent-black">
            {content.homepage.showreelVideo && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={content.homepage.showreelVideo} type="video/mp4" />
              </video>
            )}

            {/* Border Glow */}
            <div className="absolute inset-0 border-2 border-primary-yellow/20 rounded-card group-hover:border-primary-yellow/50 transition-all duration-300"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showreel;
