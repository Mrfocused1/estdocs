"use client";

import { motion } from "framer-motion";
import BookingForm from "@/components/BookingForm";
import { useState, useEffect } from "react";

export default function Booking() {
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          'https://api.pexels.com/videos/search?query=calendar booking appointment&per_page=1&orientation=landscape',
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const data = await response.json();
        if (data.videos && data.videos.length > 0) {
          const video = data.videos[0].video_files.find((f: any) => f.quality === 'sd' || f.quality === 'hd');
          setVideoUrl(video?.link || '');
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-display italic uppercase text-white mb-6 flex items-center gap-4 flex-wrap justify-center leading-tight">
              <span>Book Your Studio</span>
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
              <span className="text-primary-red">Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-body">
              Ready to create something amazing? Fill out the form below and
              we'll get back to you within 24 hours to confirm your booking.
            </p>
          </motion.div>

          <BookingForm />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-dark-navy mb-4">
              Our <span className="text-primary-red">Pricing</span>
            </h2>
            <p className="text-xl text-dark-navy/70 font-body max-w-2xl mx-auto">
              Choose the package that fits your needs
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Package 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-card p-8 border-2 border-gray-200 hover:border-primary-red transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-2xl font-display italic uppercase text-dark-navy mb-4">
                Studio + Engineer
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-display font-bold text-primary-red">£75</span>
                <span className="text-dark-navy/60 font-body">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Up to 4 microphones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">On-site engineer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">24-hour file transfer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Optional editing available</span>
                </li>
              </ul>
              <a
                href="#booking-form"
                className="block w-full text-center bg-dark-navy text-primary-red px-6 py-3 rounded-lg font-display uppercase font-bold hover:bg-primary-red hover:text-dark-navy transition-all duration-300"
              >
                Book Now
              </a>
            </motion.div>

            {/* Package 2 - Popular */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-primary-red rounded-card p-8 border-2 border-primary-red relative hover:shadow-2xl transition-all duration-300 transform md:scale-105"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-dark-navy text-primary-red px-4 py-1 rounded-full text-sm font-display uppercase font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-display italic uppercase text-dark-navy mb-4">
                Studio + Standard Editing
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-display font-bold text-dark-navy">£115</span>
                <span className="text-dark-navy/60 font-body">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-dark-navy mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Everything in Studio + Engineer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dark-navy mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Pre-amble deletion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dark-navy mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Color grading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dark-navy mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Camera switching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dark-navy mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Audio cleanup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-dark-navy mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">72-hour delivery</span>
                </li>
              </ul>
              <a
                href="#booking-form"
                className="block w-full text-center bg-dark-navy text-primary-red px-6 py-3 rounded-lg font-display uppercase font-bold hover:bg-accent-black transition-all duration-300"
              >
                Book Now
              </a>
            </motion.div>

            {/* Package 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-card p-8 border-2 border-gray-200 hover:border-primary-red transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="text-2xl font-display italic uppercase text-dark-navy mb-4">
                Studio + Advanced Editing
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-display font-bold text-primary-red">£155</span>
                <span className="text-dark-navy/60 font-body">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Everything in Standard Editing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Up to 2 revisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">7-day turnaround</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Graphics & overlays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Social handles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-red mt-1">✓</span>
                  <span className="text-dark-navy/80 font-body">Name tags</span>
                </li>
              </ul>
              <a
                href="#booking-form"
                className="block w-full text-center bg-dark-navy text-primary-red px-6 py-3 rounded-lg font-display uppercase font-bold hover:bg-primary-red hover:text-dark-navy transition-all duration-300"
              >
                Book Now
              </a>
            </motion.div>
          </div>

          {/* Additional Extras */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-navy rounded-card p-8"
          >
            <h3 className="text-3xl font-display italic uppercase text-primary-red mb-6 text-center">
              Additional Extras
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white font-display italic uppercase font-bold">Additional Camera</span>
                <span className="text-primary-red font-display italic uppercase font-bold">£30/hour</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white font-display italic uppercase font-bold">4K Files</span>
                <span className="text-primary-red font-display italic uppercase font-bold">£15/hour</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white font-display italic uppercase font-bold">Social Media Snippets</span>
                <span className="text-primary-red font-display italic uppercase font-bold">£100</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white font-display italic uppercase font-bold">Teleprompter</span>
                <span className="text-primary-red font-display italic uppercase font-bold">£30</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white font-display italic uppercase font-bold">Remote Guest</span>
                <span className="text-primary-red font-display italic uppercase font-bold">£30</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section-padding bg-dark-navy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 card"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                Flexible Hours
              </h3>
              <p className="text-white/70 font-body">
                Book sessions from 9am to 11pm, seven days a week. We work
                around your schedule.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 card"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                All Equipment Included
              </h3>
              <p className="text-white/70 font-body">
                Professional cameras, microphones, lighting, and editing suites.
                Everything you need in one place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 card"
            >
              <h3 className="text-2xl font-display italic uppercase text-primary-red mb-4">
                Expert Support
              </h3>
              <p className="text-white/70 font-body">
                Our experienced team is here to help with setup, shooting, and
                post-production if needed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
