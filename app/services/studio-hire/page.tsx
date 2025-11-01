"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FeatureCardSkeleton } from "@/components/LoadingSkeleton";
import { useContent } from "@/contexts/ContentContext";

export default function StudioHire() {
  const { content } = useContent();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Use managed content from admin dashboard
  const videoUrl = content.studioHire.heroVideo;
  const addonImages = content.studioHire.addonImages;
  const isLoadingAddons = false; // No loading needed since content is from context

  const studioFeatures = [
    {
      icon: "🎙️",
      title: "Professional Microphones",
      description: "Rode Podcaster & NT1-A microphones with pop filters and boom arms for crystal-clear audio capture.",
      specs: "4x Rode Microphones",
    },
    {
      icon: "🎥",
      title: "Multi-Camera Setup",
      description: "Up to 3 Blackmagic cameras with 4K capability for cinematic podcast video production.",
      specs: "3x Blackmagic Cameras",
    },
    {
      icon: "💡",
      title: "Professional Lighting",
      description: "Customizable RGB ambient lights and key lights to create the perfect atmosphere for your brand.",
      specs: "Full RGB Control",
    },
    {
      icon: "🔊",
      title: "Acoustic Treatment",
      description: "Professional soundproofing and acoustic panels ensure studio-quality audio recordings.",
      specs: "Premium Acoustics",
    },
    {
      icon: "🎛️",
      title: "Mixing Console",
      description: "Rodecaster Pro II for live mixing, effects, and real-time audio processing during recording.",
      specs: "Rodecaster Pro II",
    },
    {
      icon: "📺",
      title: "Live Monitoring",
      description: "Multiple displays for real-time monitoring of video feeds, audio levels, and recording status.",
      specs: "HD Monitoring",
    },
  ];

  // Use managed content from admin dashboard
  const packages = content.studioHire.packages;
  const addOns = content.studioHire.addons;

  const howItWorks = [
    {
      step: "01",
      title: "Book Your Session",
      description: "Choose your package and select your preferred time slot through our online booking system.",
    },
    {
      step: "02",
      title: "Arrive & Setup",
      description: "Arrive 15 minutes early for setup. Our engineer will configure everything to your specifications.",
    },
    {
      step: "03",
      title: "Record Your Content",
      description: "Focus on creating great content while we handle all the technical aspects of your recording.",
    },
    {
      step: "04",
      title: "Review & Download",
      description: "Review your recordings, and download files immediately or receive edited content within 7 days.",
    },
  ];

  const faqs = content.studioHire.faqs;

  const stats = [
    { number: "500+", label: "Podcasts Recorded" },
    { number: "50+", label: "Active Creators" },
    { number: "4.9", label: "Average Rating" },
    { number: "24hr", label: "File Delivery" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-yellow rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-yellow rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display italic uppercase text-white mb-6 leading-tight flex items-center gap-4 flex-wrap justify-center">
              <span className="flex items-center gap-4">
                <span>Create</span>
                <span>Exceptional</span>
              </span>
              <span className="flex items-center gap-4">
                <span className="inline-block h-[0.85em] w-[2.5em] border-2 border-primary-yellow rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-yellow/20 to-dark-navy">
                  {videoUrl ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-yellow/10 via-transparent to-dark-navy/50"></div>
                  )}
                </span>
                <span className="text-primary-yellow">Content</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 font-body mb-8 leading-relaxed max-w-3xl mx-auto">
              {content.studioHire.heroDescription}
            </p>

            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Link href="/booking" className="btn-primary text-lg px-8 py-4">
                Book Your Session
              </Link>
              <a href="#packages" className="btn-secondary text-lg px-8 py-4">
                View Packages
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  data-animate="true"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display italic uppercase text-primary-yellow mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/60 font-body text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Studio Features Grid */}
      <section className="section-padding bg-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Studio <span className="text-primary-yellow">Equipment</span>
            </h2>
            <p className="text-xl text-white/70 font-body max-w-3xl mx-auto">
              Every piece of equipment has been carefully selected to deliver broadcast-quality audio and cinematic video.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studioFeatures.map((feature, index) => (
              <motion.div
                key={index}
                data-animate="true"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="card hover:border-primary-yellow group"
              >
                <div className="inline-block mb-4 px-4 py-1 bg-primary-yellow/10 border border-primary-yellow/30 rounded-full">
                  <span className="text-primary-yellow font-display italic uppercase text-xs font-bold">
                    {feature.specs}
                  </span>
                </div>
                <h3 className="text-xl font-display italic uppercase text-primary-yellow mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section-padding bg-gradient-to-b from-accent-black to-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Choose Your <span className="text-primary-yellow">Package</span>
            </h2>
            <p className="text-xl text-white/70 font-body max-w-3xl mx-auto">
              From self-service to full production, we have a package that fits your needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                data-animate="true"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                onMouseEnter={() => setSelectedPackage(index)}
                onMouseLeave={() => setSelectedPackage(null)}
                className={`card relative transition-all duration-300 ${
                  pkg.popular
                    ? "border-primary-yellow shadow-2xl shadow-primary-yellow/20 lg:scale-105"
                    : selectedPackage === index
                    ? "border-primary-yellow"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-yellow text-accent-black px-6 py-2 rounded-full font-display italic uppercase font-bold text-sm shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6 mt-4">
                  <h3 className="text-3xl font-display italic uppercase text-primary-yellow mb-3">
                    {pkg.name}
                  </h3>

                  <p className="text-white/60 font-body text-sm mb-6 min-h-[60px]">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-5xl font-display italic uppercase text-white mb-1">
                      {pkg.price}
                    </div>
                    <div className="text-white/60 font-body text-sm">
                      {pkg.duration}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-white/40 font-display italic uppercase text-xs mb-3 tracking-wider">
                    What's Included
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-yellow mr-3 mt-1 flex-shrink-0">✓</span>
                        <span className="text-white/70 font-body text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  
                </div>

                <Link
                  href="/booking"
                  className={`block text-center w-full py-4 rounded-lg font-display font-bold text-base uppercase transition-all duration-300 ${
                    pkg.popular
                      ? "bg-primary-yellow text-accent-black hover:bg-yellow-400 shadow-lg shadow-primary-yellow/30"
                      : "bg-white/10 text-white border-2 border-primary-yellow/30 hover:bg-primary-yellow hover:text-accent-black hover:border-primary-yellow"
                  }`}
                >
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Minimum Booking Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-block px-6 py-3 bg-primary-yellow/10 border border-primary-yellow/30 rounded-lg">
              <span className="text-white/70 font-body text-sm">
                Minimum booking: <span className="text-primary-yellow font-bold">2 hours</span> • Discounts available for 4+ hour sessions
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-dark-navy mb-6">
              Enhance Your <span className="text-primary-yellow">Session</span>
            </h2>
            <p className="text-xl text-dark-navy/70 font-body max-w-3xl mx-auto">
              Take your production to the next level with our professional add-ons and extras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoadingAddons ? (
              <>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <FeatureCardSkeleton key={index} />
                ))}
              </>
            ) : (
              addOns.map((addon, index) => (
                <motion.div
                key={index}
                data-animate="true"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group relative cursor-pointer bg-gray-50 rounded-card overflow-hidden border border-gray-200 hover:border-primary-yellow transition-all duration-300 hover:shadow-xl"
                style={{ backgroundColor: '#fafafa' }}
              >
                {/* Image */}
                {addonImages[index] && (
                  <div className="relative w-full h-48 mb-6 overflow-hidden rounded-t-card">
                    <img
                      src={addonImages[index]}
                      alt={addon.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                {/* Content wrapper */}
                <div className="px-10 pb-10">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-display italic uppercase text-dark-navy mb-3 group-hover:text-primary-yellow transition-colors duration-300">
                      {addon.name}
                    </h3>
                    <span className="text-primary-yellow font-display italic font-bold text-3xl">
                      {addon.price}
                    </span>
                  </div>
                  <p className="font-body leading-relaxed opacity-70 text-dark-navy">
                    {addon.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="absolute inset-0 rounded-card blur-xl"
                    style={{
                      background: `radial-gradient(circle at center, #FFF10520, transparent 70%)`,
                    }}
                  ></div>
                </div>
              </motion.div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gradient-to-b from-accent-black to-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              How It <span className="text-primary-yellow">Works</span>
            </h2>
            <p className="text-xl text-white/70 font-body max-w-3xl mx-auto">
              From booking to final delivery, we've streamlined the entire process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                data-animate="true"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="relative"
              >
                <div className="card hover:border-primary-yellow text-center">
                  <div className="text-7xl font-display italic text-primary-yellow/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-display italic uppercase text-primary-yellow mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 font-body text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-yellow/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Frequently Asked <span className="text-primary-yellow">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                data-animate="true"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                className="card border-primary-yellow/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full text-left flex items-center justify-between group"
                >
                  <h3 className="text-lg md:text-xl font-display italic uppercase text-primary-yellow group-hover:text-white transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <svg
                      className="w-6 h-6 text-primary-yellow"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? "auto" : 0,
                    opacity: openFaqIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-white/70 font-body text-sm md:text-base leading-relaxed pt-4 border-t border-primary-yellow/20 mt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-dark-navy via-accent-black to-dark-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-yellow rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Ready to Start <span className="text-primary-yellow">Creating?</span>
            </h2>
            <p className="text-xl text-white/80 font-body mb-8 max-w-2xl mx-auto">
              Book your podcast studio session today and experience professional-quality recording in East London.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/booking" className="btn-primary text-lg px-8 py-4">
                Book Your Session
              </Link>
              <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                Schedule a Tour
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
