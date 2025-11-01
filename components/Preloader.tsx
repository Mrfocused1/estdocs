"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{
            duration: 1,
            ease: [0.6, 0.05, 0.01, 0.9]
          }}
          className="fixed inset-0 bg-black"
          style={{ zIndex: 200000 }}
        >
          {/* Torn paper edge at bottom */}
          <svg
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{ transform: "translateY(100%)" }}
            height="50"
            viewBox="0 0 1200 50"
            preserveAspectRatio="none"
          >
            <path
              d="M0,25 Q30,5 60,25 T120,25 Q150,15 180,25 T240,25 Q270,10 300,25 T360,25 Q390,15 420,25 T480,25 Q510,5 540,25 T600,25 Q630,10 660,25 T720,25 Q750,15 780,25 T840,25 Q870,5 900,25 T960,25 Q990,15 1020,25 T1080,25 Q1110,10 1140,25 L1200,25 L1200,0 L0,0 Z"
              fill="#000000"
            />
          </svg>

          {/* Content */}
          <div className="fixed inset-0 flex items-center justify-center overflow-visible">
          <div className="flex flex-col items-center justify-center gap-4 overflow-visible px-8">
            {/* EASTDOCS Container */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, 0, -15, 0] }}
              transition={{
                delay: 1.2,
                duration: 0.6,
                times: [0, 0.5, 0.7, 1],
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              className="flex items-center justify-center overflow-visible"
            >
              {/* EAST - slides from left */}
              <motion.h1
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.6, 0.05, 0.01, 0.9],
                }}
                className="text-6xl md:text-8xl lg:text-9xl font-display italic uppercase text-primary-red font-bold leading-none whitespace-nowrap"
              >
                EAST
              </motion.h1>

              {/* DOCS - slides from right */}
              <motion.h1
                initial={{ x: "100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.6, 0.05, 0.01, 0.9],
                }}
                className="text-6xl md:text-8xl lg:text-9xl font-display italic uppercase text-white font-bold leading-none whitespace-nowrap"
              >
                DOCS
              </motion.h1>
            </motion.div>

            {/* STUDIOS - bounces in from bottom */}
            <motion.h1
              initial={{ y: 150, opacity: 0 }}
              animate={{
                y: [150, -5, 0],
                opacity: [0, 1, 1]
              }}
              transition={{
                duration: 0.6,
                delay: 1.2,
                times: [0, 0.7, 1],
                ease: [0.6, 0.05, 0.01, 0.9],
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-display italic uppercase text-white/70 font-bold leading-none"
            >
              STUDIOS
            </motion.h1>
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
