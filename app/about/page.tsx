"use client";

import { motion } from "framer-motion";
import AboutSection from "@/components/AboutSection";
import { useEffect, useState } from "react";

export default function About() {
  const [videoUrl, setVideoUrl] = useState("");
  const [titleVideoUrl, setTitleVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch video for the main section
        const response = await fetch(
          'https://api.pexels.com/videos/search?query=behind the scenes production&per_page=1&orientation=square',
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

        // Fetch video for the title
        const response2 = await fetch(
          'https://api.pexels.com/videos/search?query=team working together&per_page=1&orientation=landscape',
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const data2 = await response2.json();
        if (data2.videos && data2.videos.length > 0) {
          const video = data2.videos[0].video_files.find((f: any) => f.quality === 'sd' || f.quality === 'hd');
          setTitleVideoUrl(video?.link || '');
        }
      } catch (error) {
        console.error('Error fetching Pexels video:', error);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image/Video */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-card overflow-hidden order-2 lg:order-1"
            >
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/30 to-dark-navy flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-8 border-primary-red border-t-transparent rounded-full mx-auto mb-6"
                    />
                    <p className="text-white/70 font-body text-lg">
                      Loading...
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 border-2 border-primary-red/30 rounded-card"></div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-display italic uppercase text-white mb-6 flex items-center gap-4 flex-wrap leading-tight justify-center lg:justify-start">
                <span>We're</span>
                <span className="inline-block h-[0.85em] w-[2.5em] border-2 border-primary-red rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-red/20 to-dark-navy">
                  {titleVideoUrl ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={titleVideoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-red/10 via-transparent to-dark-navy/50"></div>
                  )}
                </span>
                <span className="text-primary-red">EastDocs</span>
              </h1>
              <p className="text-xl text-white/80 font-body mb-6 leading-relaxed">
                Where content creators, artists, and brands bring stories to
                life.
              </p>
              <p className="text-lg text-white/70 font-body mb-6 leading-relaxed">
                Founded in the heart of East London, EastDocs Studios was born
                from a simple idea: every creator deserves access to
                world-class facilities without the world-class price tag.
              </p>
              <p className="text-lg text-white/70 font-body leading-relaxed">
                Today, we're proud to be London's most dynamic content studio,
                hosting podcasters, YouTubers, livestreamers, and brands who
                are pushing creative boundaries. Our state-of-the-art
                facilities combined with our passion for storytelling make us
                the perfect partner for your next project.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <AboutSection />
    </div>
  );
}
