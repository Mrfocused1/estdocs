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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-20 z-40 bg-dark-navy"
          >
            <div className="h-full overflow-y-auto px-6 py-8">
              <div className="space-y-2 max-w-md mx-auto">
                {/* Home Link */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-primary-red/20 rounded-xl transition-all duration-300 group"
                  >
                    <span className="text-white text-xl font-display italic uppercase font-bold group-hover:text-primary-red transition-colors">
                      Home
                    </span>
                    <svg className="w-5 h-5 text-primary-red/50 group-hover:text-primary-red group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Services Expandable Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="overflow-hidden rounded-xl bg-white/5"
                >
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex items-center justify-between w-full px-6 py-4 hover:bg-primary-red/20 transition-all duration-300 group"
                  >
                    <span className="text-white text-xl font-display italic uppercase font-bold group-hover:text-primary-red transition-colors">
                      Services
                    </span>
                    <svg
                      className={`w-5 h-5 text-primary-red transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10"
                      >
                        <div className="px-4 py-2 space-y-1">
                          {servicesLinks.map((service, idx) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center px-4 py-3 text-white/80 hover:text-primary-red hover:bg-white/5 rounded-lg transition-all duration-200 font-display italic uppercase font-bold text-base group"
                            >
                              <span className="w-2 h-2 rounded-full bg-primary-red/50 mr-3 group-hover:bg-primary-red transition-colors"></span>
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Remaining Links */}
                {navLinks.slice(1).map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-primary-red/20 rounded-xl transition-all duration-300 group"
                    >
                      <span className="text-white text-xl font-display italic uppercase font-bold group-hover:text-primary-red transition-colors">
                        {link.name}
                      </span>
                      <svg className="w-5 h-5 text-primary-red/50 group-hover:text-primary-red group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6"
                >
                  <Link
                    href="/booking"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center px-8 py-5 bg-primary-red text-accent-black rounded-xl font-display italic uppercase font-bold text-xl shadow-lg shadow-primary-red/30 hover:shadow-primary-red/50 hover:scale-105 transition-all duration-300"
                  >
                    Book Your Session
                  </Link>
                </motion.div>

                {/* User Links */}
                {user ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-white/10 mt-6"
                  >
                    <div className="flex items-center gap-3 mb-4 px-2">
                      <div className="w-12 h-12 bg-primary-red text-accent-black rounded-full flex items-center justify-center font-bold text-lg">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-display italic uppercase font-bold text-sm">Signed in as</p>
                        <p className="text-white/60 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 rounded-xl transition-all duration-300 font-display italic uppercase font-bold"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t border-white/10 mt-6 space-y-2"
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-6 py-3 bg-white/5 hover:bg-primary-red/20 text-white hover:text-primary-red rounded-xl transition-all duration-300 font-display italic uppercase font-bold text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-6 py-3 bg-white/5 hover:bg-primary-red/20 text-white hover:text-primary-red rounded-xl transition-all duration-300 font-display italic uppercase font-bold text-center"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
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
