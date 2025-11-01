"use client";

import { motion } from "framer-motion";
import { FaMicrophone, FaVideo, FaBroadcastTower } from "react-icons/fa";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { FeatureCardSkeleton } from "./LoadingSkeleton";
import { useContent } from "@/contexts/ContentContext";

const featureIcons = [FaMicrophone, FaVideo, FaBroadcastTower];
const featureColor = "#FFF105";

const FeatureCards = () => {
  const { content } = useContent();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Use managed content from admin dashboard
  const featureImages = content.homepage.featureImages;
  const features = content.homepage.features;
  const isLoading = false; // No loading needed since content is from context

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display italic uppercase text-dark-navy mb-4">
            {content.homepage.featuresTitle.split(' ').slice(0, -1).join(' ')} <span className="text-primary-red">{content.homepage.featuresTitle.split(' ').slice(-1)}</span>
          </h2>
          <p className="text-lg font-body max-w-2xl mx-auto text-dark-navy">
            {content.homepage.featuresSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              {[0, 1, 2].map((index) => (
                <FeatureCardSkeleton key={index} />
              ))}
            </>
          ) : (
            features.map((feature: any, index: number) => {
              const Icon = featureIcons[index];
              return (
              <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group relative cursor-pointer bg-gray-50 rounded-card overflow-hidden border border-gray-200 hover:border-primary-red transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: '#fafafa',
              }}
            >
              {/* Image */}
              {featureImages[index] && (
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-t-card">
                  <img
                    src={featureImages[index]}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              {/* Content wrapper */}
              <div className="px-10 pb-10">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-display italic uppercase text-dark-navy mb-4 group-hover:text-primary-red transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-body leading-relaxed mb-6 opacity-70">
                  {feature.description}
                </p>

                {/* Book Now Button */}
                <Link
                  href="/booking"
                  className="inline-block bg-primary-red text-accent-black px-6 py-3 rounded-lg font-display uppercase font-bold text-sm hover:bg-primary-red/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary-red/50"
                >
                  Book Now
                </Link>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div
                  className="absolute inset-0 rounded-card blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, ${featureColor}20, transparent 70%)`,
                  }}
                ></div>
              </div>
            </motion.div>
          );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
