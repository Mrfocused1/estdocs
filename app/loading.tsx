"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-dark-navy z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="text-5xl md:text-7xl font-display italic uppercase text-primary-yellow mb-8"
        >
          EastDocs
        </motion.h1>

        {/* Loading Spinner */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-primary-yellow rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
