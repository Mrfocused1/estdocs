"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 48, // Yellow hue for brand
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

const HeroSection = () => {
  const [videoUrl1, setVideoUrl1] = useState<string>("");
  const [videoUrl2, setVideoUrl2] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const MINIMUM_BEAMS = 20;

  useEffect(() => {
    // Fetch Pexels videos for hero section
    const fetchVideos = async () => {
      try {
        const response1 = await fetch(
          'https://api.pexels.com/videos/search?query=podcast recording studio&per_page=1&orientation=landscape',
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const data1 = await response1.json();
        if (data1.videos && data1.videos.length > 0) {
          const video = data1.videos[0].video_files.find((f: any) => f.quality === 'sd' || f.quality === 'hd');
          setVideoUrl1(video?.link || '');
        }

        const response2 = await fetch(
          'https://api.pexels.com/videos/search?query=microphone recording&per_page=1&orientation=landscape',
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const data2 = await response2.json();
        if (data2.videos && data2.videos.length > 0) {
          const video = data2.videos[0].video_files.find((f: any) => f.quality === 'sd' || f.quality === 'hd');
          setVideoUrl2(video?.link || '');
        }
      } catch (error) {
        console.error('Error fetching Pexels videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // Beams animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.5;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height)
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;

      const column = index % 3;
      const spacing = canvas.width / 3;

      beam.y = canvas.height + 100;
      beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 48; // Yellow hue
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue}, 100%, 65%, 0)`);
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 100%, 65%, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 100%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 100%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 100%, 65%, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 100%, 65%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-navy">
      {/* Animated Beams Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0"
        style={{ filter: "blur(15px)" }}
      />

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-dark-navy/10"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{
          backdropFilter: "blur(50px)",
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24 md:pt-40">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Line 1: The Creative Home [VIDEO] of London's */}
          <motion.h1
            variants={wordVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic uppercase text-white mb-3 leading-tight flex items-center gap-3 flex-wrap justify-center"
          >
            <span>The </span>
            <span className="text-primary-red">Creative</span>
            <span> Home</span>
            <span className="inline-block h-[0.85em] w-[2.5em] border-2 border-primary-red rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-red/20 to-dark-navy flex-shrink-0">
              {videoUrl1 ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={videoUrl1} type="video/mp4" />
                </video>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/10 via-transparent to-dark-navy/50"></div>
              )}
            </span>
            <span>of London's</span>
          </motion.h1>

          {/* Line 2: Boldest [VIDEO] Voices. */}
          <motion.h1
            variants={wordVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic uppercase text-white mb-3 leading-tight flex items-center gap-3 flex-wrap justify-center"
          >
            <span className="text-primary-red">Boldest</span>
            {/* Video Box 2 */}
            <span className="inline-block h-[0.85em] w-[2.5em] border-2 border-primary-red rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-red/20 to-dark-navy flex-shrink-0">
              {videoUrl2 ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={videoUrl2} type="video/mp4" />
                </video>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/10 via-transparent to-dark-navy/50"></div>
              )}
            </span>
            <span>Voices.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-2xl text-white/90 font-body mt-8 mb-12 max-w-3xl mx-auto"
          >
            London's premier podcast, video, and livestream studio. Where
            creators, influencers, and brands craft unforgettable content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link href="/booking" className="btn-primary w-full sm:w-auto">
              Book Your Session
            </Link>
            <Link href="/portfolio" className="btn-secondary w-full sm:w-auto">
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
