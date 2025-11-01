"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";

export default function Membership() {
  const { content } = useContent();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Use managed content from admin dashboard
  const videoUrl = content.membership.heroVideo;
  const membershipTiers = content.membership.tiers;

  const benefits = [
    {
      icon: "💰",
      title: "Save Up to 40%",
      description: "Members save significantly compared to pay-per-use rates with guaranteed monthly hours.",
    },
    {
      icon: "⚡",
      title: "Priority Booking",
      description: "Get first access to booking slots and never worry about availability during peak times.",
    },
    {
      icon: "🎯",
      title: "Dedicated Support",
      description: "Professional tier and above includes a dedicated account manager for personalized service.",
    },
    {
      icon: "📈",
      title: "Grow Your Content",
      description: "Focus on creating while we handle the technical details. Scale your production effortlessly.",
    },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my membership?",
      answer: "Yes! You can change your membership tier at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "What happens to unused hours?",
      answer: "Unused studio hours roll over for up to 2 months, giving you flexibility when you need it most.",
    },
    {
      question: "Is there a contract period?",
      answer: "No long-term contracts required. All memberships are month-to-month and you can cancel anytime with 30 days notice.",
    },
    {
      question: "Do you offer team memberships?",
      answer: "Yes! Studio tier includes multi-user access. Contact us for custom team packages with 5+ users.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-navy via-accent-black to-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display italic uppercase text-white mb-6 flex items-center gap-4 flex-wrap justify-center leading-tight">
              <span>Studio</span>
              <span className="inline-block h-[0.85em] w-[2.5em] border-2 border-primary-yellow rounded-xl overflow-hidden relative bg-gradient-to-br from-primary-yellow/20 to-dark-navy">
                {videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-yellow/10 via-transparent to-dark-navy/50"></div>
                )}
              </span>
              <span className="text-primary-yellow">Membership</span>
            </h1>
            <p className="text-xl text-white/80 font-body mb-8 leading-relaxed">
              {content.membership.heroDescription}
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-dark-navy/50 border-2 border-primary-yellow/30 rounded-full p-2 mb-8">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-3 rounded-full font-display italic uppercase font-bold text-sm transition-all duration-300 ${
                  billingCycle === "monthly"
                    ? "bg-primary-yellow text-accent-black"
                    : "text-white hover:text-primary-yellow"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-3 rounded-full font-display italic uppercase font-bold text-sm transition-all duration-300 ${
                  billingCycle === "annual"
                    ? "bg-primary-yellow text-accent-black"
                    : "text-white hover:text-primary-yellow"
                }`}
              >
                Annual
                <span className="ml-2 text-xs">(Save 20%)</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section-padding bg-dark-navy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`card relative ${
                  tier.popular
                    ? "border-primary-yellow shadow-2xl shadow-primary-yellow/20 transform md:scale-105"
                    : "border-primary-yellow/30"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-yellow text-accent-black px-6 py-2 rounded-full font-display italic uppercase font-bold text-sm">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6 mt-4">
                  <h3 className="text-3xl font-display italic uppercase text-primary-yellow mb-3">
                    {tier.name}
                  </h3>

                  <div className="mb-6">
                    <div className="text-5xl font-display italic uppercase text-white mb-2">
                      {tier.price}
                    </div>
                    <div className="text-white/60 font-body text-sm">
                      {tier.period}
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-yellow mr-3 mt-1 flex-shrink-0">✓</span>
                      <span className="text-white/70 font-body text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/booking"
                  className={`block text-center w-full py-4 rounded-button font-display font-bold text-lg uppercase transition-all duration-300 ${
                    tier.popular
                      ? "bg-primary-yellow text-accent-black hover:bg-yellow-400"
                      : "bg-white/10 text-white border-2 border-primary-yellow/30 hover:bg-primary-yellow hover:text-accent-black hover:border-primary-yellow"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gradient-to-b from-dark-navy to-accent-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Why Choose <span className="text-primary-yellow">Membership?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="card text-center hover:border-primary-yellow"
              >
                <h3 className="text-xl font-display italic uppercase text-primary-yellow mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-dark-navy">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Compare <span className="text-primary-yellow">Plans</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div className="card">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary-yellow/20">
                    <th className="text-left py-4 px-6 font-display italic uppercase text-primary-yellow">Feature</th>
                    <th className="text-center py-4 px-6 font-display italic uppercase text-white">Creator</th>
                    <th className="text-center py-4 px-6 font-display italic uppercase text-primary-yellow bg-primary-yellow/10">Professional</th>
                    <th className="text-center py-4 px-6 font-display italic uppercase text-white">Studio</th>
                  </tr>
                </thead>
                <tbody className="font-body">
                  <tr className="border-b border-primary-yellow/10">
                    <td className="py-4 px-6 text-white/70">Studio Hours/Month</td>
                    <td className="text-center py-4 px-6 text-white">8 hours</td>
                    <td className="text-center py-4 px-6 text-white bg-primary-yellow/5">20 hours</td>
                    <td className="text-center py-4 px-6 text-white">Unlimited</td>
                  </tr>
                  <tr className="border-b border-primary-yellow/10">
                    <td className="py-4 px-6 text-white/70">Editing Hours</td>
                    <td className="text-center py-4 px-6 text-white">2 hours</td>
                    <td className="text-center py-4 px-6 text-white bg-primary-yellow/5">5 hours</td>
                    <td className="text-center py-4 px-6 text-white">15 hours</td>
                  </tr>
                  <tr className="border-b border-primary-yellow/10">
                    <td className="py-4 px-6 text-white/70">Livestreaming</td>
                    <td className="text-center py-4 px-6 text-white/40">—</td>
                    <td className="text-center py-4 px-6 text-primary-yellow bg-primary-yellow/5">1/month</td>
                    <td className="text-center py-4 px-6 text-primary-yellow">4/month</td>
                  </tr>
                  <tr className="border-b border-primary-yellow/10">
                    <td className="py-4 px-6 text-white/70">Priority Booking</td>
                    <td className="text-center py-4 px-6 text-primary-yellow">✓</td>
                    <td className="text-center py-4 px-6 text-primary-yellow bg-primary-yellow/5">✓</td>
                    <td className="text-center py-4 px-6 text-primary-yellow">✓</td>
                  </tr>
                  <tr className="border-b border-primary-yellow/10">
                    <td className="py-4 px-6 text-white/70">Account Manager</td>
                    <td className="text-center py-4 px-6 text-white/40">—</td>
                    <td className="text-center py-4 px-6 text-primary-yellow bg-primary-yellow/5">✓</td>
                    <td className="text-center py-4 px-6 text-primary-yellow">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-white/70">Equipment Rental</td>
                    <td className="text-center py-4 px-6 text-white/40">Extra</td>
                    <td className="text-center py-4 px-6 text-primary-yellow bg-primary-yellow/5">✓</td>
                    <td className="text-center py-4 px-6 text-primary-yellow">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-b from-dark-navy to-accent-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Frequently Asked <span className="text-primary-yellow">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                className="card hover:border-primary-yellow"
              >
                <h3 className="text-xl font-display italic uppercase text-primary-yellow mb-3">
                  {faq.question}
                </h3>
                <p className="text-white/70 font-body leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-dark-navy via-accent-black to-dark-navy">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display italic uppercase text-white mb-6">
              Ready to <span className="text-primary-yellow">Join?</span>
            </h2>
            <p className="text-xl text-white/80 font-body mb-8 max-w-2xl mx-auto">
              Start creating more, worrying less. Choose your plan and unlock exclusive member benefits today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/booking" className="btn-primary text-lg">
                Get Started
              </Link>
              <Link href="/contact" className="btn-secondary text-lg">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
