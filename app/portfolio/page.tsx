"use client";

import { motion } from "framer-motion";
import PortfolioGrid from "@/components/PortfolioGrid";
import { useState, useEffect } from "react";

export default function Portfolio() {
  // Use a default Pexels video URL as fallback
  const [videoUrl, setVideoUrl] = useState<string>("https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4");

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
          if (video?.link) {
            setVideoUrl(video.link);
          }
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
            <h1 className="text-3xl md:text-7xl font-display italic uppercase text-white mb-6 flex items-center gap-3 md:gap-4 flex-wrap justify-center leading-tight">
              <span>Our</span>
              <span className="inline-block h-[60px] md:h-[0.85em] w-[4em] md:w-[2.5em] border-2 border-primary-red rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-red/20 to-dark-navy flex-shrink-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  key={videoUrl}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </span>
              <span className="text-primary-red">Portfolio</span>
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
