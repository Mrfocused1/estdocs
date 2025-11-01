"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function BookingSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the payment confirmation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy pt-32 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {loading ? (
            <div className="py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary-yellow border-t-transparent rounded-full mx-auto mb-6"
              />
              <p className="text-white font-body text-xl">
                Confirming your payment...
              </p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-8"
              >
                <FaCheckCircle className="text-9xl text-primary-yellow" />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-display italic uppercase text-white mb-6">
                Payment <span className="text-primary-yellow">Successful!</span>
              </h1>

              <div className="bg-dark-navy/50 border-2 border-primary-yellow/30 rounded-lg p-8 mb-8">
                <p className="text-xl text-white/90 font-body mb-6 leading-relaxed">
                  Thank you for your booking! Your payment has been processed successfully.
                </p>

                <p className="text-white/70 font-body mb-4">
                  We've sent a confirmation email with all the details of your booking. Our team will reach out to you within 24 hours to confirm the final details of your session.
                </p>

                {sessionId && (
                  <div className="bg-primary-yellow/10 border border-primary-yellow/30 rounded-lg p-4 mt-6">
                    <p className="text-primary-yellow font-display italic uppercase font-bold text-sm mb-2">
                      Payment Reference
                    </p>
                    <p className="text-white/60 font-body text-xs break-all">
                      {sessionId}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/"
                  className="btn-primary text-lg"
                >
                  Back to Home
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
