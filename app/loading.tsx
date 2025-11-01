"use client";

import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-dark-navy z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <h1 className="text-5xl md:text-7xl font-display italic uppercase flex items-center">
            <span className="text-white">East</span>
            <span className="text-primary-red">D</span>
            <FaPlay className="text-primary-red text-3xl md:text-5xl mx-1" />
            <span className="text-primary-red">cks</span>
            <span className="text-white text-2xl md:text-4xl tracking-widest ml-2 font-thin">
              STUDIOS
            </span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
