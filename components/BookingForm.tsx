"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import CustomDatePicker from "./CustomDatePicker";

interface FormData {
  name: string;
  email: string;
  phone: string;
  package: string;
  date: string;
  duration: string;
  extras: string[];
  projectType: string;
  notes: string;
}

const BookingForm = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    package: "",
    date: "",
    duration: "2",
    extras: [],
    projectType: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const packages = [
    { value: "studio-engineer", label: "Studio + Engineer", price: 75 },
    { value: "standard-editing", label: "Studio + Standard Editing", price: 115 },
    { value: "advanced-editing", label: "Studio + Advanced Editing", price: 155 },
  ];

  const durations = [
    { value: "1", label: "1 Hour" },
    { value: "2", label: "2 Hours" },
    { value: "3", label: "3 Hours" },
    { value: "4", label: "4 Hours" },
    { value: "5", label: "5+ Hours" },
  ];

  const extras = [
    { value: "additional-camera", label: "Additional Camera", price: 30, perHour: true },
    { value: "4k-files", label: "4K Files", price: 15, perHour: true },
    { value: "social-snippets", label: "Social Media Snippets", price: 100, perHour: false },
    { value: "teleprompter", label: "Teleprompter", price: 30, perHour: false },
    { value: "remote-guest", label: "Remote Guest", price: 30, perHour: false },
  ];

  const projectTypes = [
    { value: "podcast", label: "Podcast" },
    { value: "youtube", label: "YouTube Video" },
    { value: "livestream", label: "Livestream" },
    { value: "interview", label: "Interview" },
    { value: "branded-content", label: "Branded Content" },
    { value: "other", label: "Other" },
  ];

  // Calculate total price
  const calculateTotal = (): number => {
    let total = 0;

    // Base package price
    const selectedPackage = packages.find(p => p.value === formData.package);
    if (selectedPackage) {
      const hours = parseInt(formData.duration) || 2;
      total += selectedPackage.price * hours;
    }

    // Add extras
    formData.extras.forEach(extraValue => {
      const extra = extras.find(e => e.value === extraValue);
      if (extra) {
        if (extra.perHour) {
          const hours = parseInt(formData.duration) || 2;
          total += extra.price * hours;
        } else {
          total += extra.price;
        }
      }
    });

    return total;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      if (!formData.date) newErrors.date = "Date is required";
    } else if (step === 2) {
      if (!formData.package) newErrors.package = "Please select a package";
    } else if (step === 3) {
      if (!formData.projectType) newErrors.projectType = "Project type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const totalAmount = calculateTotal();
      const selectedPackage = packages.find(p => p.value === formData.package);

      // Create Stripe checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          packageType: formData.package,
          packageLabel: selectedPackage?.label || formData.package,
          date: formData.date,
          duration: formData.duration,
          extras: formData.extras,
          projectType: formData.projectType,
          notes: formData.notes,
          amount: totalAmount,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert("Failed to process payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleExtrasChange = (extraValue: string) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraValue)
        ? prev.extras.filter((e) => e !== extraValue)
        : [...prev.extras, extraValue],
    }));
  };

  const stepTitles = [
    "Personal Information",
    "Select Package",
    "Project Details",
    "Review & Submit"
  ];

  return (
    <div id="booking-form" className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <div className="space-y-8">
            {/* Auth Status Banner */}
            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-yellow/20 border-2 border-primary-yellow rounded-lg p-4 mb-6"
              >
                <p className="text-primary-yellow font-body text-sm">
                  ✓ Signed in as <strong>{user.email}</strong>
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-navy/50 border-2 border-primary-yellow/30 rounded-lg p-6 mb-6"
              >
                <p className="text-white font-body text-sm mb-4">
                  Sign in to your account for faster booking, or continue as a guest.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/login" className="btn-primary text-sm py-2 px-6">
                    Login
                  </Link>
                  <Link href="/signup" className="btn-secondary text-sm py-2 px-6">
                    Sign Up
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Animated Progress Bar */}
            <div className="mb-12">
              <div className="w-full h-3 bg-dark-navy/50 rounded-full overflow-hidden border-2 border-primary-yellow/20">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(currentStep / totalSteps) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="h-full bg-primary-yellow relative"
                >
                  {/* Pulsing glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-primary-yellow shadow-lg shadow-primary-yellow/50"
                  />
                </motion.div>
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-sm font-display italic uppercase font-bold text-white/60">
                  Step {currentStep} of {totalSteps}
                </p>
                <p className="text-sm font-display italic uppercase font-bold text-primary-yellow">
                  {stepTitles[currentStep - 1]}
                </p>
              </div>
            </div>

            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-6">
                    Tell us about yourself
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="relative">
                <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
                  Full Name *
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
                  Email Address *
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

              {/* Phone Field */}
              <div className="relative">
                <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
                  Phone Number *
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=""
                  className={`w-full bg-dark-navy/50 border-3 ${
                    errors.phone ? "border-red-500" : "border-primary-yellow/30"
                  } rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50`}
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 ml-2"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Date Field */}
              <div className="relative">
                <label className="text-sm text-primary-yellow bg-transparent mb-2 block font-display italic uppercase font-bold">
                  Preferred Date *
                </label>
                <CustomDatePicker
                  value={formData.date}
                  onChange={(date) => {
                    setFormData((prev) => ({ ...prev, date }));
                    if (errors.date) {
                      setErrors((prev) => ({ ...prev, date: undefined }));
                    }
                  }}
                  minDate={new Date()}
                  error={errors.date}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Package Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-6">
              Choose your package
            </h3>
            <div>
              <h3 className="text-xl font-display italic uppercase text-primary-yellow mb-4">
                Select Package *
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <motion.label
                    key={pkg.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer p-6 rounded-lg border-3 transition-all duration-300 ${
                      formData.package === pkg.value
                        ? "border-primary-yellow bg-primary-yellow/20 shadow-lg shadow-primary-yellow/20"
                        : "border-primary-yellow/30 bg-dark-navy/50 hover:border-primary-yellow/60 hover:bg-primary-yellow/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="package"
                      value={pkg.value}
                      checked={formData.package === pkg.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="text-white font-display italic uppercase font-bold text-base block mb-2">
                      {pkg.label}
                    </span>
                    <span className="text-primary-yellow font-display italic font-bold text-lg">
                      £{pkg.price}/hr
                    </span>
                  </motion.label>
                ))}
              </div>
              {errors.package && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 ml-2"
                >
                  {errors.package}
                </motion.p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="text-primary-yellow font-display italic uppercase font-bold mb-3 block">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-dark-navy/50 border-3 border-primary-yellow/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50 cursor-pointer"
              >
                {durations.map((duration) => (
                  <option key={duration.value} value={duration.value} className="bg-dark-navy font-display italic uppercase font-bold">
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Project Type & Extras */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-6">
              Project details
            </h3>
            <div>
                <label className="text-primary-yellow font-display italic uppercase font-bold mb-3 block">Project Type *</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full bg-dark-navy/50 border-3 ${
                    errors.projectType ? "border-red-500" : "border-primary-yellow/30"
                  } rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-yellow focus:outline-none transition-all duration-300 hover:border-primary-yellow/50 cursor-pointer`}
                >
                  <option value="" className="bg-dark-navy font-display italic uppercase font-bold">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-dark-navy font-display italic uppercase font-bold">
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 ml-2"
                  >
                    {errors.projectType}
                  </motion.p>
                )}
              </div>

            {/* Extras */}
            <div>
              <h3 className="text-xl font-display italic uppercase text-primary-yellow mb-4">
                Additional Extras (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extras.map((extra) => (
                  <motion.label
                    key={extra.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer p-5 rounded-lg border-3 transition-all duration-300 flex items-center gap-4 ${
                      formData.extras.includes(extra.value)
                        ? "border-primary-yellow bg-primary-yellow/20 shadow-lg shadow-primary-yellow/20"
                        : "border-primary-yellow/30 bg-dark-navy/50 hover:border-primary-yellow/60 hover:bg-primary-yellow/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.extras.includes(extra.value)}
                      onChange={() => handleExtrasChange(extra.value)}
                      className="w-6 h-6 accent-primary-yellow rounded border-2 border-primary-yellow"
                    />
                    <span className="text-white font-display italic uppercase font-bold text-sm flex-1">
                      {extra.label}
                    </span>
                    <span className="text-primary-yellow font-display italic font-bold text-sm ml-auto">
                      +£{extra.price}{extra.perHour ? "/hr" : ""}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Notes & Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-display italic uppercase text-primary-yellow mb-6">
              Final details
            </h3>
            {/* Notes */}
            <div className="relative">
              <label className="text-primary-yellow font-display italic uppercase font-bold mb-3 block">Additional Notes</label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your project, special requirements, or any questions..."
                className="w-full bg-dark-navy/50 border-3 border-primary-yellow/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-base focus:border-primary-yellow focus:outline-none transition-all duration-300 resize-none hover:border-primary-yellow/50 placeholder:text-white/30 placeholder:font-display placeholder:italic placeholder:uppercase"
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-dark-navy/50 rounded-lg p-8 border-3 border-primary-yellow/40 shadow-xl shadow-primary-yellow/10">
              <h4 className="text-2xl font-display italic uppercase text-primary-yellow mb-6">
                Booking Summary
              </h4>
              <div className="space-y-4 text-white font-display italic uppercase">
                <div className="flex justify-between items-center pb-3 border-b border-primary-yellow/20">
                  <span className="text-primary-yellow/80 font-bold">Name:</span>
                  <span className="text-white font-bold text-lg">{formData.name || "-"}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-primary-yellow/20">
                  <span className="text-primary-yellow/80 font-bold">Email:</span>
                  <span className="text-white font-bold">{formData.email || "-"}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-primary-yellow/20">
                  <span className="text-primary-yellow/80 font-bold">Date:</span>
                  <span className="text-white font-bold">{formData.date || "-"}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-primary-yellow/20">
                  <span className="text-primary-yellow/80 font-bold">Package:</span>
                  <span className="text-white font-bold text-right">
                    {packages.find(p => p.value === formData.package)?.label || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-primary-yellow/20">
                  <span className="text-primary-yellow/80 font-bold">Duration:</span>
                  <span className="text-white font-bold">
                    {durations.find(d => d.value === formData.duration)?.label || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-primary-yellow/20">
                  <span className="text-primary-yellow/80 font-bold">Project Type:</span>
                  <span className="text-white font-bold">
                    {projectTypes.find(t => t.value === formData.projectType)?.label || "-"}
                  </span>
                </div>
                {formData.extras.length > 0 && (
                  <div className="flex justify-between items-center pb-3 border-b border-primary-yellow/20">
                    <span className="text-primary-yellow/80 font-bold">Extras:</span>
                    <span className="text-white font-bold text-right text-sm">
                      {formData.extras.map(e => extras.find(ex => ex.value === e)?.label).join(", ")}
                    </span>
                  </div>
                )}
                {/* Total Price */}
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-primary-yellow">
                  <span className="text-primary-yellow font-bold text-xl">Total:</span>
                  <span className="text-primary-yellow font-bold text-3xl">
                    £{calculateTotal()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
        {currentStep > 1 && (
          <motion.button
            onClick={prevStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-button font-display uppercase font-bold hover:bg-white/20 transition-all duration-300"
          >
            <FaArrowLeft />
            <span>Previous</span>
          </motion.button>
        )}

        <div className="flex-1" />

        {currentStep < totalSteps ? (
          <motion.button
            onClick={nextStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary-yellow text-accent-black px-8 py-3 rounded-button font-display uppercase font-bold hover:bg-yellow-400 transition-all duration-300 shadow-lg shadow-primary-yellow/30"
          >
            <span>Next</span>
            <FaArrowRight />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-yellow text-accent-black px-8 py-4 rounded-button font-display font-bold text-xl uppercase hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl shadow-primary-yellow/30"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-4 border-accent-black border-t-transparent rounded-full"
                />
                <span>Processing...</span>
              </>
            ) : (
              "Proceed to Payment"
            )}
          </motion.button>
        )}
      </div>
    </div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <FaCheckCircle className="text-8xl text-primary-yellow" />
            </motion.div>
            <h3 className="text-4xl font-display italic uppercase text-primary-yellow mb-4">
              Booking Submitted!
            </h3>
            <p className="text-xl text-white/80 font-body max-w-lg mx-auto">
              Thank you for your booking request. You'll receive a confirmation email shortly, and we'll get back to you within 24 hours to confirm your session.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingForm;
