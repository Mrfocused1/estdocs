"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes } from "react-icons/fa";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
}

const categories = ["All", "Podcasts", "YouTube", "Livestreams", "BTS"];

const PortfolioGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchPortfolioImages = async () => {
      try {
        const queries = [
          'podcast recording',
          'youtube filming',
          'live streaming',
          'video production behind the scenes',
          'microphone podcast',
          'camera filming',
          'streaming setup',
          'studio production',
          'content creator workspace'
        ];

        const promises = queries.map(async (query, index) => {
          const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
            {
              headers: {
                Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
              },
            }
          );
          const data = await response.json();
          return data.photos && data.photos.length > 0 ? data.photos[0].src.large : '';
        });

        const thumbnails = await Promise.all(promises);

        const items: PortfolioItem[] = [
          { id: 1, title: "Tech Talk Podcast", category: "Podcasts", thumbnail: thumbnails[0] },
          { id: 2, title: "Influencer Interview", category: "YouTube", thumbnail: thumbnails[1] },
          { id: 3, title: "Live Gaming Stream", category: "Livestreams", thumbnail: thumbnails[2] },
          { id: 4, title: "Behind The Scenes", category: "BTS", thumbnail: thumbnails[3] },
          { id: 5, title: "Business Podcast", category: "Podcasts", thumbnail: thumbnails[4] },
          { id: 6, title: "Product Review", category: "YouTube", thumbnail: thumbnails[5] },
          { id: 7, title: "Music Performance", category: "Livestreams", thumbnail: thumbnails[6] },
          { id: 8, title: "Studio Setup", category: "BTS", thumbnail: thumbnails[7] },
          { id: 9, title: "Interview Series", category: "Podcasts", thumbnail: thumbnails[8] },
        ];

        setPortfolioItems(items);
      } catch (error) {
        console.error('Error fetching Pexels images:', error);
      }
    };

    fetchPortfolioImages();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="section-padding bg-dark-navy">
      <div className="container mx-auto px-6">
        {/* Category Filters */}
        <div className="flex overflow-x-auto w-full gap-4 mb-12 px-4 py-2 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 px-6 py-3 rounded-button font-display italic uppercase font-bold transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary-red text-accent-black shadow-lg shadow-primary-red/50"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative aspect-video rounded-card overflow-hidden cursor-pointer bg-gradient-to-br from-dark-navy to-accent-black"
                onClick={() => setSelectedItem(item)}
              >
                {/* Portfolio Image */}
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-accent-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary-red text-accent-black px-3 py-1 rounded text-sm font-display uppercase font-bold">
                  {item.category}
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center shadow-2xl shadow-primary-red/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaPlay className="text-2xl text-accent-black ml-1" />
                  </motion.div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent-black to-transparent p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-display italic uppercase text-white">
                    {item.title}
                  </h3>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 border-2 border-primary-red/0 group-hover:border-primary-red/50 rounded-card transition-all duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full bg-dark-navy rounded-card overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-primary-red text-accent-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <FaTimes className="text-2xl" />
              </button>

              {/* Video Content */}
              <div className="aspect-video bg-gradient-to-br from-dark-navy to-accent-black flex items-center justify-center">
                <div className="text-center">
                  <FaPlay className="text-6xl text-primary-red mb-4 mx-auto" />
                  <h3 className="text-2xl font-display italic uppercase text-white mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-white/70 font-body">
                    Video player would be embedded here
                  </p>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 bg-dark-navy border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-display italic uppercase text-white mb-2">
                      {selectedItem.title}
                    </h4>
                    <span className="inline-block bg-primary-red text-accent-black px-3 py-1 rounded text-sm font-display uppercase font-bold">
                      {selectedItem.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioGrid;
