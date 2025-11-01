"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export interface SiteContent {
  // Company Info
  companyName: string;
  tagline: string;
  description: string;

  // Contact Info
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
  };

  // Social Media
  socialMedia: {
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
    tiktok: string;
  };

  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };

  // Studio Hire Page
  studioHire: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroVideo: string;
    addonImages: string[];
    packages: Array<{
      name: string;
      price: string;
      duration: string;
      description: string;
      features: string[];
      popular?: boolean;
    }>;
    addons: Array<{
      name: string;
      price: string;
      description: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };

  // Editing Services Page
  editing: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroVideo: string;
    addonImages: string[];
    packages: Array<{
      title: string;
      subtitle: string;
      price: string;
      unit: string;
      turnaround: string;
      revisions: string;
      features: string[];
      popular?: boolean;
    }>;
    addons: Array<{
      title: string;
      price: string;
      turnaround: string;
      revisions: string;
      features: string[];
    }>;
  };

  // Live Streaming Page
  liveStreaming: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroVideo: string;
    packages: Array<{
      title: string;
      price: string;
      duration: string;
      features: string[];
      popular?: boolean;
    }>;
  };

  // Membership Page
  membership: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroVideo: string;
    tiers: Array<{
      name: string;
      price: string;
      period: string;
      features: string[];
      popular?: boolean;
    }>;
  };

  // Homepage
  homepage: {
    heroVideo1: string;
    heroVideo2: string;
    showreelVideo: string;
    featureImages: string[];
    featuresTitle: string;
    featuresSubtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    showreelTitle: string;
    showreelDescription: string;
    statsTitle: string;
    statsSubtitle: string;
    stats: Array<{
      number: number;
      suffix: string;
      label: string;
    }>;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
  };

  // About Page
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };

  // Portfolio
  portfolio: PortfolioItem[];
}

const defaultContent: SiteContent = {
  companyName: "EastDocs",
  tagline: "London's premier podcast, video, and livestream studio",
  description: "Where creators bring their boldest ideas to life",

  email: "hello@eastdocs.studio",
  phone: "+44 20 1234 5678",
  address: {
    line1: "30 Seagull Lane",
    line2: "",
    city: "London",
    postcode: "",
  },

  socialMedia: {
    instagram: "https://www.instagram.com/eastdockstudios/?igsh=bGY4bm9yM3lhZWEw",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
    tiktok: "https://tiktok.com",
  },

  hero: {
    title: "Where London's Boldest Voices Speak",
    subtitle: "Professional Podcast & Video Studios",
    ctaText: "Book Your Session",
  },

  studioHire: {
    heroTitle: "Create Exceptional Content",
    heroSubtitle: "Professional Podcast Studio Hire in East London",
    heroDescription: "State-of-the-art podcast and video studio with multi-camera setups, professional lighting, and premium audio equipment. Book by the hour or choose our all-inclusive production packages.",
    heroVideo: "",
    addonImages: [
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Camera+Equipment",
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Lighting+Setup",
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Audio+Equipment",
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Green+Screen",
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Control+Room",
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Studio+Space",
    ],
    packages: [
      {
        name: "Studio Only",
        price: "£50",
        duration: "per hour",
        description: "Self-service studio access with all equipment",
        features: [
          "Up to 3 cameras",
          "4x professional microphones",
          "Professional lighting setup",
          "Soundproof recording space",
          "Comfortable seating for 4",
          "Free Wi-Fi & beverages",
        ],
      },
      {
        name: "Studio + Engineer",
        price: "£80",
        duration: "per hour",
        description: "Full technical support throughout your session",
        features: [
          "Everything in Studio Only",
          "Dedicated audio/video engineer",
          "Live camera switching",
          "Multi-track audio recording",
          "Real-time monitoring",
          "Technical consultation",
        ],
        popular: true,
      },
      {
        name: "Full Production",
        price: "£150",
        duration: "per hour",
        description: "Complete production service from recording to final edit",
        features: [
          "Everything in Studio + Engineer",
          "Professional video editing",
          "Color correction & grading",
          "Audio mixing & mastering",
          "Custom graphics & titles",
          "Delivery in 7 days",
        ],
      },
    ],
    addons: [
      {
        name: "Additional Camera",
        price: "£25/session",
        description: "Extra camera angle for dynamic shots",
      },
      {
        name: "Remote Guest Connection",
        price: "£35/session",
        description: "Professional remote guest integration via Zoom/StreamYard",
      },
      {
        name: "Teleprompter",
        price: "£20/session",
        description: "Professional teleprompter with operator",
      },
      {
        name: "Green Screen",
        price: "£40/session",
        description: "Chroma key green screen with professional lighting",
      },
      {
        name: "Extended Session",
        price: "£60/hr",
        description: "Discounted rate for bookings over 4 hours",
      },
      {
        name: "Weekend/Evening",
        price: "+£15/hr",
        description: "Premium rate for off-peak hours",
      },
    ],
    faqs: [
      {
        question: "What's included in the studio hire?",
        answer: "All packages include access to our fully equipped podcast studio with up to 3 cameras, 4 microphones, professional lighting, acoustic treatment, and comfortable seating for up to 4 people.",
      },
      {
        question: "How long can I book the studio for?",
        answer: "Minimum booking is 2 hours. You can book in 1-hour increments after that. We offer discounted rates for sessions over 4 hours.",
      },
      {
        question: "Can I bring remote guests?",
        answer: "Yes! We support remote guest connections via Zoom, StreamYard, or any platform of your choice. Add our Remote Guest Connection service for professional audio/video integration.",
      },
      {
        question: "Do you provide editing services?",
        answer: "Yes! Our Full Production package includes professional editing. Alternatively, you can book editing separately after your recording session.",
      },
      {
        question: "What if I need to cancel or reschedule?",
        answer: "Free cancellation up to 48 hours before your session. Cancellations within 48 hours are subject to a 50% fee. Reschedule anytime with 24 hours notice.",
      },
      {
        question: "Can I see the studio before booking?",
        answer: "Absolutely! Contact us to schedule a free studio tour. We're happy to show you around and answer any questions.",
      },
    ],
  },

  editing: {
    heroTitle: "Professional Editing Services",
    heroSubtitle: "Expert editors ready to transform your raw footage",
    heroDescription: "Skilled editors ready to transform your raw footage into polished, professional content. We edit all podcasts, including those recorded elsewhere.",
    heroVideo: "",
    addonImages: [
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Video+Editing",
      "https://placehold.co/600x400/1a1a2e/FFF105?text=Audio+Editing",
    ],
    packages: [
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
    ],
    addons: [
      {
        title: "Episode/Season Trailer",
        price: "£100",
        turnaround: "5 days (first draft)",
        revisions: "2 included",
        features: [
          "Licensed music",
          "Potential animations",
          "Professional polish",
        ],
      },
      {
        title: "Intro/Outro Creation",
        price: "£100",
        turnaround: "5 days (first draft)",
        revisions: "2 included",
        features: [
          "Licensed music",
          "Animation options",
          "Brand integration",
        ],
      },
    ],
  },

  liveStreaming: {
    heroTitle: "Professional Live Streaming",
    heroSubtitle: "Broadcast to multiple platforms simultaneously",
    heroDescription: "Stream your content live to YouTube, Twitch, Facebook, and more with professional multi-camera production.",
    heroVideo: "",
    packages: [
      {
        title: "Basic Stream",
        price: "£100",
        duration: "per hour",
        features: [
          "Single camera setup",
          "Stream to 1 platform",
          "Basic graphics package",
          "Audio mixing",
        ],
      },
      {
        title: "Pro Stream",
        price: "£200",
        duration: "per hour",
        features: [
          "Multi-camera switching",
          "Stream to 3 platforms",
          "Custom graphics & overlays",
          "Professional audio mixing",
          "Chat integration",
        ],
        popular: true,
      },
      {
        title: "Premium Stream",
        price: "£350",
        duration: "per hour",
        features: [
          "Full production team",
          "Unlimited platforms",
          "Advanced graphics & animations",
          "Remote guest integration",
          "Instant replays",
          "Recording included",
        ],
      },
    ],
  },

  membership: {
    heroTitle: "Studio Membership",
    heroSubtitle: "Exclusive access for regular creators",
    heroDescription: "Save money with our membership plans designed for podcasters and content creators who record regularly.",
    heroVideo: "",
    tiers: [
      {
        name: "Creator",
        price: "£150",
        period: "per month",
        features: [
          "4 hours studio time",
          "10% off additional hours",
          "Priority booking",
          "Free equipment upgrades",
          "Member community access",
        ],
      },
      {
        name: "Professional",
        price: "£400",
        period: "per month",
        features: [
          "12 hours studio time",
          "20% off additional hours",
          "Dedicated engineer included",
          "Free editing (2 hours)",
          "Priority 24/7 booking",
          "Storage locker",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "£800",
        period: "per month",
        features: [
          "30 hours studio time",
          "30% off additional hours",
          "Full production support",
          "Unlimited editing",
          "Dedicated account manager",
          "Custom packages available",
        ],
      },
    ],
  },

  homepage: {
    heroVideo1: "",
    heroVideo2: "",
    showreelVideo: "",
    featureImages: [
      "https://placehold.co/800x600/1a1a2e/FFF105?text=Podcasting",
      "https://placehold.co/800x600/1a1a2e/FFF105?text=Filming",
      "https://placehold.co/800x600/1a1a2e/FFF105?text=Streaming",
    ],
    featuresTitle: "What We Do",
    featuresSubtitle: "From concept to creation, we provide everything you need to bring your vision to life.",
    features: [
      {
        title: "Podcasting",
        description: "State-of-the-art audio recording with professional-grade microphones, soundproofing, and editing suites. Perfect for interviews, series, and solo shows.",
      },
      {
        title: "Filming",
        description: "Multi-camera setups, professional lighting, and 4K recording capabilities. Ideal for YouTube content, interviews, branded videos, and influencer shoots.",
      },
      {
        title: "Streaming",
        description: "Live broadcast capabilities with real-time switching, overlays, and multi-platform streaming. Engage your audience with professional live productions.",
      },
    ],
    showreelTitle: "See It In Action",
    showreelDescription: "Experience the EastDocs difference. Watch our studio come to life.",
    statsTitle: "Trusted By Creators",
    statsSubtitle: "Numbers that speak to our commitment to excellence.",
    stats: [
      { number: 1000, suffix: "+", label: "Hours Recorded" },
      { number: 50, suffix: "+", label: "Creators Hosted" },
      { number: 100, suffix: "%", label: "Stories Captured Perfectly" },
    ],
    ctaTitle: "Ready to Record?",
    ctaDescription: "Book your studio time today and bring your creative vision to life.",
    ctaButtonText: "Book Your Session",
  },

  about: {
    title: "About EastDocs Studios",
    description: "We are London's premier podcast and video studio, dedicated to empowering creators with professional tools and spaces to bring their visions to life.",
    mission: "To empower creators with professional tools, spaces, and support to bring their boldest ideas to life.",
    vision: "To be the leading creative hub in London where every voice has the opportunity to be heard with broadcast-quality production.",
  },

  portfolio: [],
};

export interface ContentContextType {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  updateContent: (newContent: Partial<SiteContent>) => void;
  updateNestedContent: (path: string[], value: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("siteContent");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);

        // Clean up invalid video URLs (placehold.co image URLs)
        const cleanVideoUrl = (url: string) => {
          if (!url || url.includes('placehold.co')) return '';
          return url;
        };

        // Clean saved content
        if (parsed.studioHire?.heroVideo) {
          parsed.studioHire.heroVideo = cleanVideoUrl(parsed.studioHire.heroVideo);
        }
        if (parsed.editing?.heroVideo) {
          parsed.editing.heroVideo = cleanVideoUrl(parsed.editing.heroVideo);
        }
        if (parsed.liveStreaming?.heroVideo) {
          parsed.liveStreaming.heroVideo = cleanVideoUrl(parsed.liveStreaming.heroVideo);
        }
        if (parsed.membership?.heroVideo) {
          parsed.membership.heroVideo = cleanVideoUrl(parsed.membership.heroVideo);
        }
        if (parsed.homepage?.heroVideo1) {
          parsed.homepage.heroVideo1 = cleanVideoUrl(parsed.homepage.heroVideo1);
        }
        if (parsed.homepage?.heroVideo2) {
          parsed.homepage.heroVideo2 = cleanVideoUrl(parsed.homepage.heroVideo2);
        }
        if (parsed.homepage?.showreelVideo) {
          parsed.homepage.showreelVideo = cleanVideoUrl(parsed.homepage.showreelVideo);
        }

        // Merge saved content with default content to ensure all properties exist
        setContent({
          ...defaultContent,
          ...parsed,
          studioHire: { ...defaultContent.studioHire, ...parsed.studioHire },
          editing: { ...defaultContent.editing, ...parsed.editing },
          liveStreaming: { ...defaultContent.liveStreaming, ...parsed.liveStreaming },
          membership: { ...defaultContent.membership, ...parsed.membership },
          homepage: { ...defaultContent.homepage, ...parsed.homepage },
          about: { ...defaultContent.about, ...parsed.about },
          address: { ...defaultContent.address, ...parsed.address },
          socialMedia: { ...defaultContent.socialMedia, ...parsed.socialMedia },
          hero: { ...defaultContent.hero, ...parsed.hero },
        });
      } catch (error) {
        console.error("Error loading saved content:", error);
      }
    }
  }, []);

  // Fetch placeholder videos and images from Pexels API
  useEffect(() => {
    const fetchPexelsVideo = async (query: string) => {
      try {
        const response = await fetch(
          `https://api.pexels.com/videos/search?query=${query}&per_page=1&orientation=landscape`,
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const data = await response.json();
        if (data.videos && data.videos.length > 0) {
          const video = data.videos[0].video_files.find((f: any) => f.quality === 'hd' || f.quality === 'sd');
          return video?.link || '';
        }
        return '';
      } catch (error) {
        console.error('Error fetching Pexels video:', error);
        return '';
      }
    };

    const fetchPexelsImage = async (query: string) => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
          {
            headers: {
              Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp',
            },
          }
        );
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          return data.photos[0].src.large;
        }
        return '';
      } catch (error) {
        console.error('Error fetching Pexels image:', error);
        return '';
      }
    };

    const loadPlaceholders = async () => {
      const updates: Partial<SiteContent> = {};

      // Fetch videos
      if (!content.studioHire.heroVideo) {
        const videoUrl = await fetchPexelsVideo('podcast studio recording');
        if (videoUrl) {
          updates.studioHire = { ...content.studioHire, heroVideo: videoUrl };
        }
      }

      if (!content.editing.heroVideo) {
        const videoUrl = await fetchPexelsVideo('video production editing');
        if (videoUrl) {
          updates.editing = { ...content.editing, heroVideo: videoUrl };
        }
      }

      if (!content.liveStreaming.heroVideo) {
        const videoUrl = await fetchPexelsVideo('live streaming broadcast');
        if (videoUrl) {
          updates.liveStreaming = { ...content.liveStreaming, heroVideo: videoUrl };
        }
      }

      if (!content.membership.heroVideo) {
        const videoUrl = await fetchPexelsVideo('studio membership community');
        if (videoUrl) {
          updates.membership = { ...content.membership, heroVideo: videoUrl };
        }
      }

      if (!content.homepage.heroVideo1) {
        const videoUrl = await fetchPexelsVideo('content creator studio');
        if (videoUrl) {
          updates.homepage = { ...content.homepage, heroVideo1: videoUrl };
        }
      }

      if (!content.homepage.heroVideo2 && updates.homepage) {
        const videoUrl = await fetchPexelsVideo('podcast recording microphone');
        if (videoUrl) {
          updates.homepage = { ...updates.homepage, heroVideo2: videoUrl };
        }
      } else if (!content.homepage.heroVideo2) {
        const videoUrl = await fetchPexelsVideo('podcast recording microphone');
        if (videoUrl) {
          updates.homepage = { ...content.homepage, heroVideo2: videoUrl };
        }
      }

      if (!content.homepage.showreelVideo) {
        const videoUrl = await fetchPexelsVideo('video production studio');
        if (videoUrl && updates.homepage) {
          updates.homepage = { ...updates.homepage, showreelVideo: videoUrl };
        } else if (videoUrl) {
          updates.homepage = { ...content.homepage, showreelVideo: videoUrl };
        }
      }

      // Fetch images - Homepage features
      const needsHomepageImages = content.homepage.featureImages.some(img => img.includes('placehold.co'));
      if (needsHomepageImages) {
        const featureQueries = ['podcast recording studio', 'video filming production', 'live streaming broadcast'];
        const featureImages = await Promise.all(
          featureQueries.map(query => fetchPexelsImage(query))
        );
        if (updates.homepage) {
          updates.homepage = { ...updates.homepage, featureImages: featureImages.filter(img => img) };
        } else {
          updates.homepage = { ...content.homepage, featureImages: featureImages.filter(img => img) };
        }
      }

      // Fetch images - Studio hire addons
      const needsStudioImages = content.studioHire.addonImages.some(img => img.includes('placehold.co'));
      if (needsStudioImages) {
        const studioQueries = [
          'professional camera equipment',
          'studio lighting setup',
          'audio recording equipment',
          'green screen studio',
          'video control room',
          'podcast studio space'
        ];
        const addonImages = await Promise.all(
          studioQueries.map(query => fetchPexelsImage(query))
        );
        if (updates.studioHire) {
          updates.studioHire = { ...updates.studioHire, addonImages: addonImages.filter(img => img) };
        } else {
          updates.studioHire = { ...content.studioHire, addonImages: addonImages.filter(img => img) };
        }
      }

      // Fetch images - Editing addons
      const needsEditingImages = content.editing.addonImages.some(img => img.includes('placehold.co'));
      if (needsEditingImages) {
        const editingQueries = ['video editing workstation', 'audio editing studio'];
        const editingAddonImages = await Promise.all(
          editingQueries.map(query => fetchPexelsImage(query))
        );
        if (updates.editing) {
          updates.editing = { ...updates.editing, addonImages: editingAddonImages.filter(img => img) };
        } else {
          updates.editing = { ...content.editing, addonImages: editingAddonImages.filter(img => img) };
        }
      }

      // Update content if we fetched any videos or images
      if (Object.keys(updates).length > 0) {
        setContent(prev => ({ ...prev, ...updates }));
      }
    };

    // Check if we need to load placeholders
    // Force reload if any video/image URL is still invalid (contains placehold.co or is empty)
    const needsRefresh =
      !content.studioHire.heroVideo || content.studioHire.heroVideo.includes('placehold.co') ||
      !content.editing.heroVideo || content.editing.heroVideo.includes('placehold.co') ||
      !content.liveStreaming.heroVideo || content.liveStreaming.heroVideo.includes('placehold.co') ||
      !content.membership.heroVideo || content.membership.heroVideo.includes('placehold.co') ||
      !content.homepage.heroVideo1 || content.homepage.heroVideo1.includes('placehold.co') ||
      !content.homepage.heroVideo2 || content.homepage.heroVideo2.includes('placehold.co') ||
      !content.homepage.showreelVideo || content.homepage.showreelVideo.includes('placehold.co') ||
      content.homepage.featureImages.some(img => img.includes('placehold.co')) ||
      content.studioHire.addonImages.some(img => img.includes('placehold.co')) ||
      content.editing.addonImages.some(img => img.includes('placehold.co'));

    const hasLoadedPlaceholders = sessionStorage.getItem('placeholdersLoaded');

    if (needsRefresh || !hasLoadedPlaceholders) {
      loadPlaceholders();
      sessionStorage.setItem('placeholdersLoaded', 'true');
    }
  }, [content.studioHire.heroVideo, content.editing.heroVideo, content.liveStreaming.heroVideo, content.membership.heroVideo, content.homepage.heroVideo1, content.homepage.heroVideo2, content.homepage.showreelVideo, content.homepage.featureImages, content.studioHire.addonImages, content.editing.addonImages]);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("siteContent", JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => ({
      ...prev,
      ...newContent,
    }));
  };

  const updateNestedContent = (path: string[], value: any) => {
    setContent((prev) => {
      const newContent = { ...prev };
      let current: any = newContent;

      for (let i = 0; i < path.length - 1; i++) {
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;
      return newContent;
    });
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem("siteContent");
  };

  return (
    <ContentContext.Provider value={{ content, setContent, updateContent, updateNestedContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
