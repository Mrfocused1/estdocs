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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="md:hidden fixed inset-0 top-20 z-40"
            style={{ backgroundColor: '#152331' }}
          >
            <div className="h-full flex flex-col items-center justify-center px-8 space-y-6">
              {/* Home Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="w-full text-center"
              >
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white hover:text-primary-red transition-colors duration-300 text-2xl py-3 font-display italic uppercase font-bold"
                >
                  Home
                </Link>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="h-0.5 bg-primary-red/20 mt-2 origin-center"
                />
              </motion.div>

              {/* Services Expandable Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full text-center"
              >
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="block text-white hover:text-primary-red transition-colors duration-300 text-2xl py-3 font-display italic uppercase font-bold w-full"
                >
                  Services
                </button>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="h-0.5 bg-primary-red/20 mt-2 origin-center"
                />

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-3"
                    >
                      {servicesLinks.map((service, idx) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-white/80 hover:text-primary-red transition-colors duration-300 text-lg py-2 font-display italic uppercase font-bold"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remaining Links */}
              {navLinks.slice(1).map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-white hover:text-primary-red transition-colors duration-300 text-2xl py-3 font-display italic uppercase font-bold"
                  >
                    {link.name}
                  </Link>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    className="h-0.5 bg-primary-red/20 mt-2 origin-center"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1, duration: 0.5 }}
                className="pt-8 w-full"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-center block text-xl"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
