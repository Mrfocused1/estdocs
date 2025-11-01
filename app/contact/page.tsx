"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Contact() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [mapImageUrl, setMapImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Fetch video
        const videoResponse = await fetch(
          'https://api.pexels.com/videos/search?query=business office&per_page=1&orientation=landscape',
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const videoData = await videoResponse.json();
        if (videoData.videos && videoData.videos.length > 0) {
          const video = videoData.videos[0].video_files.find((f: any) => f.quality === 'sd' || f.quality === 'hd');
          if (video && video.link) {
            setVideoUrl(video.link);
          }
        }

        // Fetch map image
        const imageResponse = await fetch(
          'https://api.pexels.com/v1/search?query=city map aerial view&per_page=1&orientation=landscape',
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const imageData = await imageResponse.json();
        if (imageData.photos && imageData.photos.length > 0) {
          setMapImageUrl(imageData.photos[0].src.large);
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy relative overflow-hidden">
        {/* Animated Background Waves */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "linear-gradient(45deg, #FFF105 0%, transparent 50%, #FFF105 100%)",
            backgroundSize: "200% 200%",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-display italic uppercase text-white mb-6 flex items-center gap-4 flex-wrap justify-center leading-tight">
              <span>Get</span>
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
              <span>In</span>
              <span className="text-primary-red">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-body">
              Have questions? Want to book a tour? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
                  Studio Information
                </h2>
                <p className="text-lg text-white/70 font-body mb-8">
                  Visit us at our East London location or reach out through any
                  of the channels below. We're here to help bring your creative
                  vision to life.
                </p>
              </div>

              {/* Address */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-2xl text-accent-black" />
                </div>
                <div>
                  <h3 className="text-xl font-display italic uppercase text-white mb-2">
                    Address
                  </h3>
                  <p className="text-white/70 font-body">
                    123 Studio Lane
                    <br />
                    East London, E1 7AB
                    <br />
                    United Kingdom
                  </p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-2xl text-accent-black" />
                </div>
                <div>
                  <h3 className="text-xl font-display italic uppercase text-white mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@eastdocs.studio"
                    className="text-white/70 font-body hover:text-primary-red transition-colors duration-300"
                  >
                    hello@eastdocs.studio
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-2xl text-accent-black" />
                </div>
                <div>
                  <h3 className="text-xl font-display italic uppercase text-white mb-2">
                    Phone
                  </h3>
                  <a
                    href="tel:+442012345678"
                    className="text-white/70 font-body hover:text-primary-red transition-colors duration-300"
                  >
                    +44 20 1234 5678
                  </a>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="aspect-video rounded-card overflow-hidden bg-gradient-to-br from-primary-red/20 to-dark-navy border-2 border-white/10 mt-8 relative"
              >
                {mapImageUrl ? (
                  <img
                    src={mapImageUrl}
                    alt="Studio Location Map"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-red/20 to-dark-navy" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-dark-navy/60">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-6xl text-primary-red mb-4 mx-auto" />
                    <p className="text-white font-display italic uppercase text-lg">
                      Studio Location Map
                    </p>
                    <p className="text-white/70 font-body text-sm mt-2">
                      East London, E1 7AB
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="card">
                <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6 text-center">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
