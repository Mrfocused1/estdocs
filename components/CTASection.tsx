"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useContent } from "@/contexts/ContentContext";

const CTASection = () => {
  const { content } = useContent();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #FFF10520 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #FFF10520 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #FFF10520 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-primary-red to-[#8F1A1B] p-12 md:p-16 rounded-card relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)",
                }}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display italic uppercase text-accent-black mb-6 relative z-10"
            >
              {content.homepage.ctaTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-accent-black/80 font-body mb-8 relative z-10"
            >
              {content.homepage.ctaDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="relative z-10"
            >
              <Link
                href="/booking"
                className="inline-block bg-accent-black text-primary-red px-12 py-4 rounded-button font-display font-bold text-xl uppercase hover:bg-dark-navy hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                {content.homepage.ctaButtonText}
              </Link>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 w-16 h-16 bg-accent-black/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-4 left-4 w-20 h-20 bg-accent-black/20 rounded-full blur-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
