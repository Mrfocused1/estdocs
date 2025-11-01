"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/contexts/ContentContext";

export default function LiveStreaming() {
  const { content } = useContent();

  // Use managed content from admin dashboard
  const videoUrl = content.liveStreaming.heroVideo;
  const packages = content.liveStreaming.packages;

  const platforms = [
    { name: "YouTube", icon: "📺" },
    { name: "Twitch", icon: "🎮" },
    { name: "Facebook", icon: "📘" },
    { name: "Instagram", icon: "📸" },
    { name: "Twitter/X", icon: "🐦" },
    { name: "Zoom", icon: "💼" },
  ];

  const features = [
    {
      icon: "🎥",
      title: "Multi-Platform Broadcasting",
      description: "Stream to YouTube, Twitch, Facebook, Instagram, Twitter/X, Zoom Webinars, and Google Meet simultaneously.",
    },
    {
      icon: "🎬",
      title: "Professional Production",
      description: "Dedicated producer for camera angle switching and graphics integration during your live broadcast.",
    },
    {
      icon: "💬",
      title: "Interactive Features",
      description: "Live chat integration, call-in features, and remote participant connections to engage your audience.",
    },
    {
      icon: "🎨",
      title: "Custom Branding",
      description: "Graphics and branding overlay integration to maintain your professional identity throughout the stream.",
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
              <span>Professional Live</span>
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
              <span className="text-primary-yellow">Streaming</span>
            </h1>
            <p className="text-xl text-white/80 font-body mb-8 leading-relaxed">
              {content.liveStreaming.heroDescription}
            </p>
            <Link href="/booking" className="btn-primary text-lg">
              Book Your Stream
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Streaming Packages */}
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
              Choose Your <span className="text-primary-yellow">Package</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`card relative ${
                  pkg.popular ? "border-primary-yellow shadow-2xl shadow-primary-yellow/20" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-yellow text-accent-black px-6 py-2 rounded-full font-display italic uppercase font-bold text-sm">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6 mt-4">
                  <h3 className="text-3xl font-display italic uppercase text-primary-yellow mb-4">
                    {pkg.title}
                  </h3>
                  <div>
                    <span className="text-5xl font-display italic uppercase text-white">{pkg.price}</span>
                    <span className="text-white/60 font-body text-sm ml-2">{pkg.unit}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-yellow mr-3 mt-1">✓</span>
                      <span className="text-white/70 font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/booking" className={pkg.popular ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}>
                  Book Now
                </Link>
              </motion.div>
            ))}
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
              Streaming <span className="text-primary-yellow">Features</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="card hover:border-primary-yellow"
              >
                <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-body leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Broadcast Formats */}
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
              Perfect For <span className="text-primary-yellow">Any Format</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="card text-center hover:border-primary-yellow"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-4">
                Interviews
              </h3>
              <p className="text-white/70 font-body">
                Host engaging interviews with multiple cameras and professional switching.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="card text-center hover:border-primary-yellow"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-4">
                Discussions
              </h3>
              <p className="text-white/70 font-body">
                Multi-person panels and roundtable discussions with seamless camera transitions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="card text-center hover:border-primary-yellow"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-4">
                Solo Broadcasts
              </h3>
              <p className="text-white/70 font-body">
                Professional solo streaming with graphics, branding, and audience interaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Service Note */}
      <section className="section-padding bg-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card border-primary-yellow/50">
              <div className="text-center">
                <h3 className="text-3xl font-display italic uppercase text-primary-yellow mb-6">
                  We're Here to Help
                </h3>
                <p className="text-white/80 font-body text-lg leading-relaxed mb-6">
                  We contact all clients post-booking to discuss the process and ensure that your stream runs smoothly. For specialized features like remote participants or call-in functionality, please let us know in advance.
                </p>
                <p className="text-white/60 font-body">
                  Our team will work with you every step of the way to make your live stream a success.
                </p>
              </div>
            </div>
          </motion.div>
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
              Ready to <span className="text-primary-yellow">Go Live?</span>
            </h2>
            <p className="text-xl text-white/80 font-body mb-8 max-w-2xl mx-auto">
              Book your live streaming session and broadcast to all your platforms with professional quality.
            </p>
            <Link href="/booking" className="btn-primary text-lg">
              Book Your Live Stream
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
