"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message || "Failed to create account");
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  if (success) {
    return (
      <div className="pt-20 min-h-screen">
        <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="text-8xl mb-6">✅</div>
              <h2 className="text-4xl font-display italic uppercase text-primary-yellow mb-4">
                Account Created!
              </h2>
              <p className="text-xl text-white/80 font-body mb-6">
                Check your email to verify your account. Redirecting to login...
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

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
              <span className="text-primary-yellow">Sign Up</span>
            </h1>
            <p className="text-lg text-white/70 font-body mb-8 text-center">
              Create an account to book faster next time
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
              {/* Full Name */}
              <div>
                <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-dark-navy/50 border-3 border-primary-yellow/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50"
                />
              </div>

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
                  minLength={6}
                  className="w-full bg-dark-navy/50 border-3 border-primary-yellow/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-dark-navy/50 border-3 border-primary-yellow/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-yellow text-accent-black px-8 py-4 rounded-button font-display font-bold text-xl uppercase hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Links */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-white/70 font-body">
                Already have an account?{" "}
                <Link href="/login" className="text-primary-yellow hover:underline font-bold">
                  Login
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
