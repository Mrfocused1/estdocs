"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { useContent } from "@/contexts/ContentContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useContent();

  const socialLinks = [
    { icon: FaInstagram, href: content.socialMedia.instagram, label: "Instagram" },
    { icon: FaTwitter, href: content.socialMedia.twitter, label: "Twitter" },
    { icon: FaYoutube, href: content.socialMedia.youtube, label: "YouTube" },
    { icon: FaLinkedin, href: content.socialMedia.linkedin, label: "LinkedIn" },
    { icon: FaTiktok, href: content.socialMedia.tiktok, label: "TikTok" },
  ];

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Podcast Studio Hire", href: "/services/studio-hire" },
    { name: "Editing", href: "/services/editing" },
    { name: "Live Streaming", href: "/services/live-streaming" },
    { name: "Membership", href: "/services/membership" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Booking", href: "/booking" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-dark-navy border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-display italic uppercase text-primary-yellow mb-4"
            >
              {content.companyName}
            </motion.h3>
            <p className="text-white/70 font-body mb-6 leading-relaxed">
              {content.tagline}. {content.description}.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-yellow hover:text-accent-black transition-all duration-300"
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-display italic uppercase text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary-yellow transition-colors duration-300 font-display italic uppercase font-bold"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-display italic uppercase text-white mb-6">
              Get In Touch
            </h4>
            <div className="space-y-3 text-white/70 font-body">
              <p>
                <span className="text-primary-yellow">Address:</span>
                <br />
                {content.address.line1}
                <br />
                {content.address.city}, {content.address.postcode}
              </p>
              <p>
                <span className="text-primary-yellow">Email:</span>
                <br />
                <a
                  href={`mailto:${content.email}`}
                  className="hover:text-primary-yellow transition-colors duration-300"
                >
                  {content.email}
                </a>
              </p>
              <p>
                <span className="text-primary-yellow">Phone:</span>
                <br />
                <a
                  href={`tel:${content.phone.replace(/\s/g, '')}`}
                  className="hover:text-primary-yellow transition-colors duration-300"
                >
                  {content.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 font-body text-sm">
              © {currentYear} EastDocs Studios. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-primary-yellow transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-primary-yellow transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
