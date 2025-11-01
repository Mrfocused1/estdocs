"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name Field */}
          <div className="relative">
            <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
              Your Name *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=""
              className={`w-full bg-dark-navy/50 border-3 ${
                errors.name ? "border-red-500" : "border-primary-yellow/30"
              } rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1 ml-2"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
              Your Email *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=""
              className={`w-full bg-dark-navy/50 border-3 ${
                errors.email ? "border-red-500" : "border-primary-yellow/30"
              } rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1 ml-2"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Message Field */}
          <div className="relative">
            <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
              Your Message *
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder=""
              rows={6}
              className={`w-full bg-dark-navy/50 border-3 ${
                errors.message ? "border-red-500" : "border-primary-yellow/30"
              } rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 resize-none hover:border-primary-yellow/50`}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1 ml-2"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-3 border-accent-black border-t-transparent rounded-full mr-2"
                  />
                  Sending...
                </motion.span>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-center py-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <FaCheckCircle className="text-8xl text-primary-yellow mx-auto mb-6" />
          </motion.div>
          <h3 className="text-4xl font-display italic uppercase text-white mb-4">
            Message <span className="text-primary-yellow">Sent!</span>
          </h3>
          <p className="text-xl text-white/80 font-body">
            Thanks for reaching out. We'll get back to you soon!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
