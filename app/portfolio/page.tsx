"use client";

import { motion } from "framer-motion";
import PortfolioGrid from "@/components/PortfolioGrid";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          'https://api.pexels.com/videos/search?query=video portfolio showcase&per_page=1&orientation=landscape',
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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display italic uppercase text-white mb-6 flex items-center gap-4 flex-wrap justify-center leading-tight">
              <span>Our</span>
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
              <span className="text-primary-yellow">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-body">
              Discover the amazing content created at EastDocs Studios. From
              podcasts to livestreams, we've helped creators bring their visions
              to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <PortfolioGrid />
    </div>
  );
}
