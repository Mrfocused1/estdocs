"use client";

import { motion } from "framer-motion";

export const CardSkeleton = () => (
  <div className="card overflow-hidden">
    <motion.div
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
      className="w-full h-48 rounded-lg mb-6"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,241,5,0.1) 50%, rgba(255,255,255,0.05) 100%)",
        backgroundSize: "200% 100%",
      }}
    />
    <div className="space-y-4">
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="h-8 rounded"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,241,5,0.1) 50%, rgba(255,255,255,0.05) 100%)",
          backgroundSize: "200% 100%",
        }}
      />
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          delay: 0.2,
        }}
        className="h-4 rounded w-3/4"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,241,5,0.1) 50%, rgba(255,255,255,0.05) 100%)",
          backgroundSize: "200% 100%",
        }}
      />
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          delay: 0.4,
        }}
        className="h-4 rounded w-1/2"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,241,5,0.1) 50%, rgba(255,255,255,0.05) 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  </div>
);

export const ImageSkeleton = ({ className = "" }: { className?: string }) => (
  <motion.div
    animate={{
      backgroundPosition: ["0% 0%", "100% 0%"],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    }}
    className={`rounded-lg ${className}`}
    style={{
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,241,5,0.1) 50%, rgba(255,255,255,0.05) 100%)",
      backgroundSize: "200% 100%",
    }}
  />
);

export const TextSkeleton = ({ className = "" }: { className?: string }) => (
  <motion.div
    animate={{
      backgroundPosition: ["0% 0%", "100% 0%"],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    }}
    className={`rounded ${className}`}
    style={{
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,241,5,0.1) 50%, rgba(255,255,255,0.05) 100%)",
      backgroundSize: "200% 100%",
    }}
  />
);

export const FeatureCardSkeleton = () => (
  <div className="group relative cursor-pointer bg-gray-50 rounded-card overflow-hidden border border-gray-200">
    <ImageSkeleton className="w-full h-48 rounded-t-card" />
    <div className="px-10 pb-10 pt-6">
      <TextSkeleton className="h-8 mb-4" />
      <TextSkeleton className="h-4 mb-2" />
      <TextSkeleton className="h-4 w-3/4 mb-6" />
      <TextSkeleton className="h-10 w-32 rounded-lg" />
    </div>
  </div>
);

export const PackageCardSkeleton = () => (
  <div className="card">
    <div className="text-center mb-6 mt-4">
      <TextSkeleton className="h-8 mb-2 w-3/4 mx-auto" />
      <TextSkeleton className="h-4 w-1/2 mx-auto mb-4" />
      <TextSkeleton className="h-12 w-24 mx-auto" />
    </div>
    <div className="space-y-4 mb-6">
      <TextSkeleton className="h-12" />
      <TextSkeleton className="h-12" />
    </div>
    <div className="space-y-3 mb-8">
      <TextSkeleton className="h-4" />
      <TextSkeleton className="h-4" />
      <TextSkeleton className="h-4" />
    </div>
    <TextSkeleton className="h-12 rounded-lg" />
  </div>
);

export const AddonCardSkeleton = () => (
  <div className="group relative cursor-pointer bg-dark-navy/80 rounded-card overflow-hidden border border-primary-red/20">
    <ImageSkeleton className="w-full h-48 rounded-t-card" />
    <div className="px-10 pb-10 pt-6">
      <div className="text-center mb-6">
        <TextSkeleton className="h-6 mb-4 w-2/3 mx-auto" />
        <TextSkeleton className="h-10 w-24 mx-auto mb-4" />
      </div>
      <div className="space-y-3 mb-6">
        <TextSkeleton className="h-10" />
        <TextSkeleton className="h-10" />
      </div>
      <div className="space-y-3">
        <TextSkeleton className="h-4" />
        <TextSkeleton className="h-4" />
        <TextSkeleton className="h-4" />
      </div>
    </div>
  </div>
);
