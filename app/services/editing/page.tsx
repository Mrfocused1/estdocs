"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AddonCardSkeleton } from "@/components/LoadingSkeleton";
import { useContent } from "@/contexts/ContentContext";

export default function Editing() {
  const { content } = useContent();

  // Use managed content from admin dashboard
  const videoUrl = content.editing.heroVideo;
  const addonImages = content.editing.addonImages;
  const isLoadingAddons = false; // No loading needed since content is from context

  const packages = content.editing.packages;
  const addOns = content.editing.addons;

  const oldPackages = [
    {
      title: "Standard Editing",
      subtitle: "Video",
      price: "£40",
      unit: "per hour recorded",
      turnaround: "72 hours",
      revisions: "None included",
      features: [
        "Color correction",
        "Pre-amble deletion",
        "Camera switching",
        "Quick turnaround polishing",
      ],
    },
    {
      title: "Advanced Editing",
      subtitle: "Video",
      price: "£80",
      unit: "per hour recorded",
      turnaround: "7 days per round",
      revisions: "Up to 2 included",
      features: [
        "Everything in Standard",
        "Graphics integration",
        "Media integration",
        "Unwanted content removal",
        "Collaborative workflow",
        "Detailed revision cycles",
      ],
      popular: true,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display italic uppercase text-white mb-6 flex items-center gap-4 flex-wrap justify-center leading-tight">
              <span>Professional Editing</span>
              <span className="inline-block h-[0.85em] w-[2.5em] border-2 border-primary-red rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-red/20 to-dark-navy">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-red/10 via-transparent to-dark-navy/50"></div>
                )}
              </span>
              <span className="text-primary-red">Services</span>
            </h1>
            <p className="text-xl text-white/80 font-body mb-8 leading-relaxed">
              {content.editing.heroDescription}
            </p>
            <Link href="/booking" className="btn-primary text-lg">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Editing Packages */}
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
              Editing <span className="text-primary-red">Packages</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`card relative ${
                  pkg.popular ? "border-primary-red shadow-2xl shadow-primary-red/20" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-red text-accent-black px-6 py-2 rounded-full font-display italic uppercase font-bold text-sm">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6 mt-4">
                  <h3 className="text-3xl font-display italic uppercase text-primary-red mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-white/60 font-display italic uppercase text-sm">{pkg.subtitle}</p>
                  <div className="mt-4">
                    <span className="text-5xl font-display italic uppercase text-white">{pkg.price}</span>
                    <span className="text-white/60 font-body text-sm ml-2">{pkg.unit}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between border-b border-primary-red/20 pb-3">
                    <span className="text-white/70 font-display italic uppercase text-sm">Turnaround</span>
                    <span className="text-primary-red font-display italic uppercase text-sm font-bold">{pkg.turnaround}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-primary-red/20 pb-3">
                    <span className="text-white/70 font-display italic uppercase text-sm">Revisions</span>
                    <span className="text-white font-display italic uppercase text-sm">{pkg.revisions}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-red mr-3 mt-1">✓</span>
                      <span className="text-white/70 font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/booking" className={pkg.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}>
                  Choose Package
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Process Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card hover:border-primary-red">
                <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                  Standard Editing
                </h3>
                <p className="text-white/70 font-body leading-relaxed">
                  Quick turnaround polishing post-recording. Perfect for creators who need fast, professional results with color correction, camera switching, and basic cleanup.
                </p>
              </div>

              <div className="card hover:border-primary-red">
                <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                  Advanced Editing
                </h3>
                <p className="text-white/70 font-body leading-relaxed">
                  Collaborative process using our platform for feedback integration directly into the editing workflow. Includes detailed revision cycles and advanced features.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="section-padding bg-gradient-to-b from-dark-navy to-accent-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Additional <span className="text-primary-red">Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {isLoadingAddons ? (
              <>
                {[0, 1].map((index) => (
                  <AddonCardSkeleton key={index} />
                ))}
              </>
            ) : (
              addOns.map((addon, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative cursor-pointer bg-dark-navy/80 rounded-card overflow-hidden border border-primary-red/20 hover:border-primary-red transition-all duration-300 hover:shadow-xl"
              >
                {addonImages[index] && (
                  <div className="relative w-full h-48 overflow-hidden rounded-t-card">
                    <img
                      src={addonImages[index]}
                      alt={addon.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-dark-navy/50 to-transparent"></div>
                  </div>
                )}

                <div className="px-10 pb-10 pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                      {addon.title}
                    </h3>
                    <div className="text-4xl font-display italic uppercase text-white mb-4">
                      {addon.price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between border-b border-primary-red/20 pb-3">
                      <span className="text-white/70 font-display italic uppercase text-sm">Turnaround</span>
                      <span className="text-primary-red font-display italic uppercase text-sm font-bold">{addon.turnaround}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-primary-red/20 pb-3">
                      <span className="text-white/70 font-display italic uppercase text-sm">Revisions</span>
                      <span className="text-white font-display italic uppercase text-sm">{addon.revisions}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-red mr-3">✓</span>
                        <span className="text-white/70 font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose <span className="text-primary-red">Our Editing</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="card text-center hover:border-primary-red"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                Skilled Editors
              </h3>
              <p className="text-white/70 font-body">
                Our team of experienced editors brings your vision to life with professional polish.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="card text-center hover:border-primary-red"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                Music Library
              </h3>
              <p className="text-white/70 font-body">
                Access to licensed music libraries to enhance your content with the perfect soundtrack.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="card text-center hover:border-primary-red"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                Collaborative
              </h3>
              <p className="text-white/70 font-body">
                Advanced editing includes a collaborative workflow with direct feedback integration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-dark-navy via-accent-black to-dark-navy">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Ready to <span className="text-primary-red">Polish Your Content?</span>
            </h2>
            <p className="text-xl text-white/80 font-body mb-8 max-w-2xl mx-auto">
              Let our skilled editors transform your raw footage into professional, engaging content.
            </p>
            <Link href="/booking" className="btn-primary text-lg">
              Book Editing Services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
