"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message || "Failed to sign in");
      setLoading(false);
    } else {
      router.push("/booking");
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display italic uppercase text-white mb-6 text-center">
              <span className="text-primary-yellow">Login</span>
            </h1>
            <p className="text-lg text-white/70 font-body mb-8 text-center">
              Sign in to your account to book faster
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 mb-6"
              >
                <p className="text-red-500 font-body text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-dark-navy/50 border-3 border-primary-yellow/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
                  Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-dark-navy/50 border-3 border-primary-yellow/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-yellow text-accent-black px-8 py-4 rounded-button font-display font-bold text-xl uppercase hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Links */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-white/70 font-body">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary-yellow hover:underline font-bold">
                  Sign Up
                </Link>
              </p>
              <p className="text-white/70 font-body">
                Or{" "}
                <Link href="/booking" className="text-primary-yellow hover:underline font-bold">
                  Continue as Guest
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
