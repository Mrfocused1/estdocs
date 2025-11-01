"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

interface Stat {
  number: number;
  suffix: string;
  label: string;
}

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 80,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { content } = useContent();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="section-padding bg-dark-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-red rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-4">
            {content.homepage.statsTitle.split(' ').slice(0, -1).join(' ')} <span className="text-primary-red">{content.homepage.statsTitle.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-lg text-white/80 font-body max-w-2xl mx-auto">
            {content.homepage.statsSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {content.homepage.stats.map((stat: Stat, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="text-center p-8 rounded-card bg-white/5 border border-white/10 hover:border-primary-red/50 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display italic uppercase text-primary-red mb-4 font-bold"
              >
                <AnimatedCounter value={stat.number} suffix={stat.suffix} />
              </motion.div>
              <p className="text-lg md:text-xl text-white/80 font-body group-hover:text-white transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
