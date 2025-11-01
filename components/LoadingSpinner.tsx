"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "red" | "white" | "black" | "yellow";
}

export const LoadingSpinner = ({
  size = "md",
  color = "red",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-3",
    lg: "w-8 h-8 border-4",
  };

  const colorClasses = {
    red: "border-primary-red border-t-transparent",
    white: "border-white border-t-transparent",
    black: "border-accent-black border-t-transparent",
    yellow: "border-yellow-400 border-t-transparent",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
    />
  );
};

export const LoadingDots = ({ color = "red" }: { color?: "red" | "white" }) => {
  const colorClasses = {
    red: "bg-primary-red",
    white: "bg-white",
  };

  return (
    <div className="flex justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
          className={`w-2 h-2 ${colorClasses[color]} rounded-full`}
        />
      ))}
    </div>
  );
};

export const PulseLoader = () => (
  <div className="flex items-center justify-center">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-16 h-16 border-4 border-primary-red rounded-full"
    />
  </div>
);
