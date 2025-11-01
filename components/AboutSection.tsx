"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    year: "2020",
    title: "Studio Launch",
    description: "EastDocs Studios opened its doors in East London with a vision to empower creators.",
  },
  {
    year: "2021",
    title: "100+ Creators",
    description: "Reached our first major milestone, hosting over 100 unique creators and projects.",
  },
  {
    year: "2022",
    title: "Award Recognition",
    description: "Recognized as London's Best Content Studio by the Creative Industry Awards.",
  },
  {
    year: "2023",
    title: "Studio Expansion",
    description: "Doubled our space, adding two more production rooms and state-of-the-art equipment.",
  },
  {
    year: "2024",
    title: "500+ Projects",
    description: "Celebrated completing our 500th project and hosting creators from around the world.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="section-padding bg-dark-navy">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
            Our <span className="text-primary-yellow">Journey</span>
          </h2>
          <p className="text-xl text-white/80 font-body max-w-3xl mx-auto">
            From a small studio to London's premier content creation hub,
            we've been on an incredible journey with amazing creators.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 top-0 w-1 bg-primary-yellow/30 transform -translate-x-1/2 hidden md:block"
          />

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  } text-center md:text-left`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="card inline-block w-full"
                  >
                    <div className="mb-2">
                      <span className="text-3xl font-display italic uppercase text-primary-yellow">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display italic uppercase text-white mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-white/70 font-body leading-relaxed">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Dot */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="w-6 h-6 bg-primary-yellow rounded-full border-4 border-dark-navy relative z-10"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 w-6 h-6 bg-primary-yellow rounded-full"
                  />
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
