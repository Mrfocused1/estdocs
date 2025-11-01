"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { content } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Booking", href: "/booking" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const desktopNavLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Booking", href: "/booking" },
    { name: "Contact", href: "/contact" },
  ];

  const desktopNavLinksBeforeServices = [
    { name: "Home", href: "/" },
  ];

  const desktopNavLinksAfterServices = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Booking", href: "/booking" },
    { name: "Contact", href: "/contact" },
  ];

  const servicesLinks = [
    { name: "Podcast Studio Hire", href: "/services/studio-hire" },
    { name: "Editing", href: "/services/editing" },
    { name: "Live Streaming", href: "/services/live-streaming" },
    { name: "Membership", href: "/services/membership" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-dark-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            {desktopNavLinksBeforeServices.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className="text-white hover:text-primary-red transition-colors duration-300 font-display italic uppercase font-bold relative inline-block py-1 cursor-pointer"
                >
                  {link.name}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-primary-red w-0 group-hover:w-full transition-all duration-300 ease-out pointer-events-none" />
                </Link>
              </motion.div>
            ))}

            {/* Services Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: desktopNavLinksBeforeServices.length * 0.1 }}
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="text-white hover:text-primary-red transition-colors duration-300 font-display italic uppercase font-bold relative text-base py-1 cursor-pointer">
                Services
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-red transition-all duration-300 ease-out pointer-events-none ${isServicesOpen ? 'w-full' : 'w-0'}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-dark-navy border-2 border-primary-red/30 rounded-lg shadow-2xl overflow-hidden z-50"
                  >
                    {servicesLinks.map((service, index) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-6 py-3 text-white hover:bg-primary-red hover:text-accent-black transition-colors duration-300 font-display italic uppercase font-bold text-sm border-b border-primary-red/10 last:border-b-0 cursor-pointer"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Remaining Links */}
            {desktopNavLinksAfterServices.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (desktopNavLinksBeforeServices.length + 1 + index) * 0.1 }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className="text-white hover:text-primary-red transition-colors duration-300 font-display italic uppercase font-bold relative inline-block py-1 cursor-pointer"
                >
                  {link.name}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-primary-red w-0 group-hover:w-full transition-all duration-300 ease-out pointer-events-none" />
                </Link>
              </motion.div>
            ))}

            {/* Book Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/booking"
                className="px-6 py-3 bg-primary-red text-accent-black rounded-lg font-display italic uppercase font-bold text-sm hover:bg-primary-red/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary-red/50"
              >
                Book
              </Link>
            </motion.div>

            {/* User Icon / User Menu */}
            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button className="text-white hover:text-primary-red transition-colors duration-300 relative text-xl flex items-center gap-2">
                  <span className="w-10 h-10 bg-primary-red text-accent-black rounded-full flex items-center justify-center font-bold">
                    {user.email?.[0].toUpperCase()}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-dark-navy border-2 border-primary-red/30 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                      <button
                        onClick={signOut}
                        className="w-full text-left px-6 py-3 text-white hover:bg-primary-red hover:text-accent-black transition-colors duration-300 font-display italic uppercase font-bold text-sm cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button className="text-white hover:text-primary-red transition-colors duration-300 relative text-2xl">
                  <FaUser />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-dark-navy border-2 border-primary-red/30 rounded-lg shadow-2xl overflow-hidden z-50"
                    >
                      <Link
                        href="/login"
                        className="block px-6 py-3 text-white hover:bg-primary-red hover:text-accent-black transition-colors duration-300 font-display italic uppercase font-bold text-sm border-b border-primary-red/10 cursor-pointer"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-6 py-3 text-white hover:bg-primary-red hover:text-accent-black transition-colors duration-300 font-display italic uppercase font-bold text-sm cursor-pointer"
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white text-3xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed inset-0 top-20 bg-dark-navy z-[9999]"
          >
            <div className="h-full overflow-y-auto px-6 py-6 bg-dark-navy">
              <div className="space-y-3">
                {/* Home Link */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 bg-primary-red/10 hover:bg-primary-red text-white hover:text-accent-black rounded-lg transition-all font-display italic uppercase font-bold text-lg"
                >
                  Home
                </Link>

                {/* Services */}
                <div className="bg-primary-red/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 text-white font-display italic uppercase font-bold text-lg hover:bg-primary-red hover:text-accent-black transition-all"
                  >
                    Services
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isMobileServicesOpen && (
                    <div className="bg-white/5 px-4 py-2">
                      {servicesLinks.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-3 text-white/90 hover:text-primary-red hover:bg-white/5 rounded font-display italic uppercase font-bold text-base transition-all"
                        >
                          • {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Portfolio */}
                <Link
                  href="/portfolio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 bg-primary-red/10 hover:bg-primary-red text-white hover:text-accent-black rounded-lg transition-all font-display italic uppercase font-bold text-lg"
                >
                  Portfolio
                </Link>

                {/* Booking */}
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 bg-primary-red/10 hover:bg-primary-red text-white hover:text-accent-black rounded-lg transition-all font-display italic uppercase font-bold text-lg"
                >
                  Booking
                </Link>

                {/* About */}
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 bg-primary-red/10 hover:bg-primary-red text-white hover:text-accent-black rounded-lg transition-all font-display italic uppercase font-bold text-lg"
                >
                  About
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 bg-primary-red/10 hover:bg-primary-red text-white hover:text-accent-black rounded-lg transition-all font-display italic uppercase font-bold text-lg"
                >
                  Contact
                </Link>

                {/* CTA Button */}
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-8 py-5 bg-primary-red text-accent-black rounded-lg font-display italic uppercase font-bold text-xl text-center shadow-lg mt-6"
                >
                  Book Now
                </Link>

                {/* User Section */}
                {user ? (
                  <div className="pt-6 mt-6 border-t border-white/20">
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <div className="w-10 h-10 bg-primary-red text-accent-black rounded-full flex items-center justify-center font-bold">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-body text-sm">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-display italic uppercase font-bold"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-6 mt-6 border-t border-white/20 space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-6 py-3 bg-white/10 hover:bg-primary-red text-white hover:text-accent-black rounded-lg font-display italic uppercase font-bold text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-6 py-3 bg-white/10 hover:bg-primary-red text-white hover:text-accent-black rounded-lg font-display italic uppercase font-bold text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
