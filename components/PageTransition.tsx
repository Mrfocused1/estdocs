"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scroll to top immediately when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Yellow wipe overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.6,
              ease: [0.6, 0.05, 0.01, 0.9],
            }}
            className="fixed inset-0 bg-primary-yellow z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
