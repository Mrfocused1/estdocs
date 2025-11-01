"use client";

import { useState } from "react";
import { useContent } from "@/contexts/ContentContext";
import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { FileUpload } from "@/components/FileUpload";

export default function AdminDashboard() {
  const { content, updateContent, updateNestedContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState("company");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const tabs = [
    { id: "company", label: "Company Info" },
    { id: "contact", label: "Contact & Social" },
    { id: "hero", label: "Hero Section" },
    { id: "homepage", label: "Homepage" },
    { id: "studio-hire", label: "Studio Hire" },
    { id: "editing", label: "Editing Services" },
    { id: "live-streaming", label: "Live Streaming" },
    { id: "membership", label: "Membership" },
    { id: "about", label: "About Page" },
    { id: "portfolio", label: "Portfolio" },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaveMessage("Changes saved successfully!");
    setIsSaving(false);

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all content to defaults?")) {
      resetContent();
      setSaveMessage("Content reset to defaults");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-navy pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display italic uppercase text-white mb-4">
            Admin <span className="text-primary-red">Dashboard</span>
          </h1>
          <p className="text-white/70 font-body text-lg">
            Manage all content across your website. Changes are auto-saved to your browser.
          </p>
        </motion.div>

        {/* Save Message */}
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-primary-red/20 border border-primary-red rounded-lg"
          >
            <p className="text-primary-red font-display italic uppercase font-bold">
              {saveMessage}
            </p>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-display italic uppercase font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary-red text-accent-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="card mb-8 max-h-[600px] overflow-y-auto">
          {activeTab === "company" && <CompanyInfoTab content={content} updateContent={updateContent} />}
          {activeTab === "contact" && <ContactSocialTab content={content} updateContent={updateContent} />}
          {activeTab === "hero" && <HeroTab content={content} updateContent={updateContent} />}
          {activeTab === "homepage" && <HomepageTab content={content} updateNestedContent={updateNestedContent} />}
          {activeTab === "studio-hire" && <StudioHireTab content={content} updateNestedContent={updateNestedContent} />}
          {activeTab === "editing" && <EditingTab content={content} updateNestedContent={updateNestedContent} />}
          {activeTab === "live-streaming" && <LiveStreamingTab content={content} updateNestedContent={updateNestedContent} />}
          {activeTab === "membership" && <MembershipTab content={content} updateNestedContent={updateNestedContent} />}
          {activeTab === "about" && <AboutTab content={content} updateContent={updateContent} />}
          {activeTab === "portfolio" && <PortfolioTab content={content} updateNestedContent={updateNestedContent} />}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-end">
          <button
            onClick={handleReset}
            className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 rounded-button border-2 border-primary-red/30 bg-white/10 text-white hover:bg-primary-red hover:text-accent-black hover:border-primary-red font-display italic uppercase font-bold text-sm md:text-base transition-all duration-300"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto px-6 py-3 md:px-8 md:py-4 rounded-button bg-primary-red text-accent-black hover:bg-primary-red/90 font-display italic uppercase font-bold text-sm md:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <LoadingSpinner size="sm" color="black" />
                Saving...
              </>
            ) : (
              "Save All Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Input component for consistent styling
const Input = ({ label, value, onChange, placeholder = "", type = "text" }: any) => (
  <div>
    <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-dark-navy/50 border-3 border-primary-red/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-red focus:outline-none"
    />
  </div>
);

const Textarea = ({ label, value, onChange, rows = 3 }: any) => (
  <div>
    <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-dark-navy/50 border-3 border-primary-red/30 rounded-lg px-6 py-4 text-white font-display italic uppercase font-bold text-lg focus:border-primary-red focus:outline-none resize-none"
    />
  </div>
);

// Company Info Tab
const CompanyInfoTab = ({ content, updateContent }: any) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      Company Information
    </h2>
    <Input
      label="Company Name"
      value={content.companyName}
      onChange={(val: string) => updateContent({ companyName: val })}
    />
    <Input
      label="Tagline"
      value={content.tagline}
      onChange={(val: string) => updateContent({ tagline: val })}
    />
    <Textarea
      label="Description"
      value={content.description}
      onChange={(val: string) => updateContent({ description: val })}
    />
  </div>
);

// Contact & Social Tab
const ContactSocialTab = ({ content, updateContent }: any) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
        Contact Information
      </h2>
      <div className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={content.email}
          onChange={(val: string) => updateContent({ email: val })}
        />
        <Input
          label="Phone"
          type="tel"
          value={content.phone}
          onChange={(val: string) => updateContent({ phone: val })}
        />
        <Input
          label="Address Line 1"
          value={content.address.line1}
          onChange={(val: string) => updateContent({ address: { ...content.address, line1: val } })}
        />
        <Input
          label="City"
          value={content.address.city}
          onChange={(val: string) => updateContent({ address: { ...content.address, city: val } })}
        />
      </div>
    </div>

    <div>
      <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
        Social Media Links
      </h2>
      <div className="space-y-6">
        <Input
          label="Instagram URL"
          type="url"
          value={content.socialMedia.instagram}
          onChange={(val: string) => updateContent({ socialMedia: { ...content.socialMedia, instagram: val } })}
        />
        <Input
          label="Twitter URL"
          type="url"
          value={content.socialMedia.twitter}
          onChange={(val: string) => updateContent({ socialMedia: { ...content.socialMedia, twitter: val } })}
        />
        <Input
          label="YouTube URL"
          type="url"
          value={content.socialMedia.youtube}
          onChange={(val: string) => updateContent({ socialMedia: { ...content.socialMedia, youtube: val } })}
        />
        <Input
          label="LinkedIn URL"
          type="url"
          value={content.socialMedia.linkedin}
          onChange={(val: string) => updateContent({ socialMedia: { ...content.socialMedia, linkedin: val } })}
        />
        <Input
          label="TikTok URL"
          type="url"
          value={content.socialMedia.tiktok}
          onChange={(val: string) => updateContent({ socialMedia: { ...content.socialMedia, tiktok: val } })}
        />
      </div>
    </div>
  </div>
);

// Hero Tab
const HeroTab = ({ content, updateContent }: any) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      Hero Section
    </h2>
    <Input
      label="Main Title"
      value={content.hero.title}
      onChange={(val: string) => updateContent({ hero: { ...content.hero, title: val } })}
    />
    <Input
      label="Subtitle"
      value={content.hero.subtitle}
      onChange={(val: string) => updateContent({ hero: { ...content.hero, subtitle: val } })}
    />
    <Input
      label="CTA Button Text"
      value={content.hero.ctaText}
      onChange={(val: string) => updateContent({ hero: { ...content.hero, ctaText: val } })}
    />
  </div>
);

// Studio Hire Tab
const StudioHireTab = ({ content, updateNestedContent }: any) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      Studio Hire Page Content
    </h2>

    <div className="space-y-6">
      <Input
        label="Hero Title"
        value={content.studioHire.heroTitle}
        onChange={(val: string) => updateNestedContent(['studioHire', 'heroTitle'], val)}
      />
      <Input
        label="Hero Subtitle"
        value={content.studioHire.heroSubtitle}
        onChange={(val: string) => updateNestedContent(['studioHire', 'heroSubtitle'], val)}
      />
      <Textarea
        label="Hero Description"
        value={content.studioHire.heroDescription}
        onChange={(val: string) => updateNestedContent(['studioHire', 'heroDescription'], val)}
        rows={4}
      />
      <FileUpload
        label="Hero Video"
        accept="video/*"
        type="video"
        currentUrl={content.studioHire.heroVideo}
        onUploadComplete={(url: string) => updateNestedContent(['studioHire', 'heroVideo'], url)}
      />
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Add-on Images
      </h3>
      <div className="space-y-6 mb-6">
        {content.studioHire.addonImages.map((img: string, index: number) => (
          <FileUpload
            key={index}
            label={`Add-on Image ${index + 1}`}
            accept="image/*"
            type="image"
            currentUrl={img}
            onUploadComplete={(url: string) => {
              const newImages = [...content.studioHire.addonImages];
              newImages[index] = url;
              updateNestedContent(['studioHire', 'addonImages'], newImages);
            }}
          />
        ))}
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Packages
      </h3>
      <div className="space-y-6">
        {content.studioHire.packages.map((pkg: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-display italic uppercase text-primary-red">Package {index + 1}</h4>
              <button
                onClick={() => {
                  const newPackages = content.studioHire.packages.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['studioHire', 'packages'], newPackages);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <Input
              label="Name"
              value={pkg.name}
              onChange={(val: string) => {
                const newPackages = [...content.studioHire.packages];
                newPackages[index] = { ...pkg, name: val };
                updateNestedContent(['studioHire', 'packages'], newPackages);
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                value={pkg.price}
                onChange={(val: string) => {
                  const newPackages = [...content.studioHire.packages];
                  newPackages[index] = { ...pkg, price: val };
                  updateNestedContent(['studioHire', 'packages'], newPackages);
                }}
              />
              <Input
                label="Duration"
                value={pkg.duration}
                onChange={(val: string) => {
                  const newPackages = [...content.studioHire.packages];
                  newPackages[index] = { ...pkg, duration: val };
                  updateNestedContent(['studioHire', 'packages'], newPackages);
                }}
              />
            </div>
            <Textarea
              label="Description"
              value={pkg.description}
              onChange={(val: string) => {
                const newPackages = [...content.studioHire.packages];
                newPackages[index] = { ...pkg, description: val };
                updateNestedContent(['studioHire', 'packages'], newPackages);
              }}
              rows={2}
            />
            <div>
              <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
                Features (one per line)
              </label>
              <textarea
                value={pkg.features.join('\n')}
                onChange={(e) => {
                  const newPackages = [...content.studioHire.packages];
                  newPackages[index] = { ...pkg, features: e.target.value.split('\n') };
                  updateNestedContent(['studioHire', 'packages'], newPackages);
                }}
                rows={6}
                className="w-full bg-dark-navy/50 border-3 border-primary-red/30 rounded-lg px-6 py-4 text-white font-body text-sm focus:border-primary-red focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pkg.popular || false}
                onChange={(e) => {
                  const newPackages = [...content.studioHire.packages];
                  newPackages[index] = { ...pkg, popular: e.target.checked };
                  updateNestedContent(['studioHire', 'packages'], newPackages);
                }}
                className="w-4 h-4"
              />
              <label className="text-white font-body text-sm">Mark as popular</label>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newPackage = {
              name: "New Package",
              price: "£50",
              duration: "per hour",
              description: "Package description",
              features: ["Feature 1", "Feature 2"],
              popular: false,
            };
            updateNestedContent(['studioHire', 'packages'], [...content.studioHire.packages, newPackage]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add Package
        </button>
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Add-ons
      </h3>
      <div className="space-y-6">
        {content.studioHire.addons.map((addon: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-display italic uppercase text-primary-red">Add-on {index + 1}</h4>
              <button
                onClick={() => {
                  const newAddons = content.studioHire.addons.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['studioHire', 'addons'], newAddons);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <Input
              label="Name"
              value={addon.name}
              onChange={(val: string) => {
                const newAddons = [...content.studioHire.addons];
                newAddons[index] = { ...addon, name: val };
                updateNestedContent(['studioHire', 'addons'], newAddons);
              }}
            />
            <Input
              label="Price"
              value={addon.price}
              onChange={(val: string) => {
                const newAddons = [...content.studioHire.addons];
                newAddons[index] = { ...addon, price: val };
                updateNestedContent(['studioHire', 'addons'], newAddons);
              }}
            />
            <Textarea
              label="Description"
              value={addon.description}
              onChange={(val: string) => {
                const newAddons = [...content.studioHire.addons];
                newAddons[index] = { ...addon, description: val };
                updateNestedContent(['studioHire', 'addons'], newAddons);
              }}
              rows={2}
            />
          </div>
        ))}
        <button
          onClick={() => {
            const newAddon = {
              name: "New Add-on",
              price: "£20",
              description: "Add-on description",
            };
            updateNestedContent(['studioHire', 'addons'], [...content.studioHire.addons, newAddon]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add Add-on
        </button>
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        FAQs
      </h3>
      <div className="space-y-6">
        {content.studioHire.faqs.map((faq: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-display italic uppercase text-primary-red">FAQ {index + 1}</h4>
              <button
                onClick={() => {
                  const newFaqs = content.studioHire.faqs.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['studioHire', 'faqs'], newFaqs);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <Input
              label="Question"
              value={faq.question}
              onChange={(val: string) => {
                const newFaqs = [...content.studioHire.faqs];
                newFaqs[index] = { ...faq, question: val };
                updateNestedContent(['studioHire', 'faqs'], newFaqs);
              }}
            />
            <Textarea
              label="Answer"
              value={faq.answer}
              onChange={(val: string) => {
                const newFaqs = [...content.studioHire.faqs];
                newFaqs[index] = { ...faq, answer: val };
                updateNestedContent(['studioHire', 'faqs'], newFaqs);
              }}
              rows={3}
            />
          </div>
        ))}
        <button
          onClick={() => {
            const newFaq = {
              question: "New Question?",
              answer: "Answer to the question.",
            };
            updateNestedContent(['studioHire', 'faqs'], [...content.studioHire.faqs, newFaq]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add FAQ
        </button>
      </div>
    </div>
  </div>
);

// Editing Tab
const EditingTab = ({ content, updateNestedContent }: any) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      Editing Services Page Content
    </h2>

    <div className="space-y-6">
      <Input
        label="Hero Title"
        value={content.editing.heroTitle}
        onChange={(val: string) => updateNestedContent(['editing', 'heroTitle'], val)}
      />
      <Input
        label="Hero Subtitle"
        value={content.editing.heroSubtitle}
        onChange={(val: string) => updateNestedContent(['editing', 'heroSubtitle'], val)}
      />
      <Textarea
        label="Hero Description"
        value={content.editing.heroDescription}
        onChange={(val: string) => updateNestedContent(['editing', 'heroDescription'], val)}
        rows={4}
      />
      <FileUpload
        label="Hero Video"
        accept="video/*"
        type="video"
        currentUrl={content.editing.heroVideo}
        onUploadComplete={(url: string) => updateNestedContent(['editing', 'heroVideo'], url)}
      />
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Add-on Images
      </h3>
      <div className="space-y-6 mb-6">
        {content.editing.addonImages.map((img: string, index: number) => (
          <FileUpload
            key={index}
            label={`Add-on Image ${index + 1}`}
            accept="image/*"
            type="image"
            currentUrl={img}
            onUploadComplete={(url: string) => {
              const newImages = [...content.editing.addonImages];
              newImages[index] = url;
              updateNestedContent(['editing', 'addonImages'], newImages);
            }}
          />
        ))}
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Packages
      </h3>
      <div className="space-y-6">
        {content.editing.packages.map((pkg: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-display italic uppercase text-primary-red">Package {index + 1}</h4>
              <button
                onClick={() => {
                  const newPackages = content.editing.packages.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Title"
                value={pkg.title}
                onChange={(val: string) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, title: val };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
              />
              <Input
                label="Subtitle"
                value={pkg.subtitle}
                onChange={(val: string) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, subtitle: val };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                value={pkg.price}
                onChange={(val: string) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, price: val };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
              />
              <Input
                label="Unit"
                value={pkg.unit}
                onChange={(val: string) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, unit: val };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Turnaround"
                value={pkg.turnaround}
                onChange={(val: string) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, turnaround: val };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
              />
              <Input
                label="Revisions"
                value={pkg.revisions}
                onChange={(val: string) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, revisions: val };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
              />
            </div>
            <div>
              <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
                Features (one per line)
              </label>
              <textarea
                value={pkg.features.join('\n')}
                onChange={(e) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, features: e.target.value.split('\n') };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
                rows={6}
                className="w-full bg-dark-navy/50 border-3 border-primary-red/30 rounded-lg px-6 py-4 text-white font-body text-sm focus:border-primary-red focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pkg.popular || false}
                onChange={(e) => {
                  const newPackages = [...content.editing.packages];
                  newPackages[index] = { ...pkg, popular: e.target.checked };
                  updateNestedContent(['editing', 'packages'], newPackages);
                }}
                className="w-4 h-4"
              />
              <label className="text-white font-body text-sm">Mark as popular</label>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newPackage = {
              title: "New Package",
              subtitle: "Video",
              price: "£40",
              unit: "per hour recorded",
              turnaround: "72 hours",
              revisions: "None included",
              features: ["Feature 1", "Feature 2"],
              popular: false,
            };
            updateNestedContent(['editing', 'packages'], [...content.editing.packages, newPackage]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add Package
        </button>
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Add-ons
      </h3>
      <div className="space-y-6">
        {content.editing.addons.map((addon: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-display italic uppercase text-primary-red">Add-on {index + 1}</h4>
              <button
                onClick={() => {
                  const newAddons = content.editing.addons.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['editing', 'addons'], newAddons);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <Input
              label="Title"
              value={addon.title}
              onChange={(val: string) => {
                const newAddons = [...content.editing.addons];
                newAddons[index] = { ...addon, title: val };
                updateNestedContent(['editing', 'addons'], newAddons);
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                value={addon.price}
                onChange={(val: string) => {
                  const newAddons = [...content.editing.addons];
                  newAddons[index] = { ...addon, price: val };
                  updateNestedContent(['editing', 'addons'], newAddons);
                }}
              />
              <Input
                label="Turnaround"
                value={addon.turnaround}
                onChange={(val: string) => {
                  const newAddons = [...content.editing.addons];
                  newAddons[index] = { ...addon, turnaround: val };
                  updateNestedContent(['editing', 'addons'], newAddons);
                }}
              />
            </div>
            <Input
              label="Revisions"
              value={addon.revisions}
              onChange={(val: string) => {
                const newAddons = [...content.editing.addons];
                newAddons[index] = { ...addon, revisions: val };
                updateNestedContent(['editing', 'addons'], newAddons);
              }}
            />
            <div>
              <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
                Features (one per line)
              </label>
              <textarea
                value={addon.features.join('\n')}
                onChange={(e) => {
                  const newAddons = [...content.editing.addons];
                  newAddons[index] = { ...addon, features: e.target.value.split('\n') };
                  updateNestedContent(['editing', 'addons'], newAddons);
                }}
                rows={4}
                className="w-full bg-dark-navy/50 border-3 border-primary-red/30 rounded-lg px-6 py-4 text-white font-body text-sm focus:border-primary-red focus:outline-none resize-none"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newAddon = {
              title: "New Add-on",
              price: "£20",
              turnaround: "24 hours",
              revisions: "1 included",
              features: ["Feature 1", "Feature 2"],
            };
            updateNestedContent(['editing', 'addons'], [...content.editing.addons, newAddon]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add Add-on
        </button>
      </div>
    </div>
  </div>
);

// Live Streaming Tab
const LiveStreamingTab = ({ content, updateNestedContent }: any) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      Live Streaming Page Content
    </h2>

    <div className="space-y-6">
      <Input
        label="Hero Title"
        value={content.liveStreaming.heroTitle}
        onChange={(val: string) => updateNestedContent(['liveStreaming', 'heroTitle'], val)}
      />
      <Input
        label="Hero Subtitle"
        value={content.liveStreaming.heroSubtitle}
        onChange={(val: string) => updateNestedContent(['liveStreaming', 'heroSubtitle'], val)}
      />
      <Textarea
        label="Hero Description"
        value={content.liveStreaming.heroDescription}
        onChange={(val: string) => updateNestedContent(['liveStreaming', 'heroDescription'], val)}
        rows={4}
      />
      <FileUpload
        label="Hero Video"
        accept="video/*"
        type="video"
        currentUrl={content.liveStreaming.heroVideo}
        onUploadComplete={(url: string) => updateNestedContent(['liveStreaming', 'heroVideo'], url)}
      />
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Packages
      </h3>
      <div className="space-y-6">
        {content.liveStreaming.packages.map((pkg: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-display italic uppercase text-primary-red">Package {index + 1}</h4>
              <button
                onClick={() => {
                  const newPackages = content.liveStreaming.packages.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['liveStreaming', 'packages'], newPackages);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <Input
              label="Title"
              value={pkg.title}
              onChange={(val: string) => {
                const newPackages = [...content.liveStreaming.packages];
                newPackages[index] = { ...pkg, title: val };
                updateNestedContent(['liveStreaming', 'packages'], newPackages);
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                value={pkg.price}
                onChange={(val: string) => {
                  const newPackages = [...content.liveStreaming.packages];
                  newPackages[index] = { ...pkg, price: val };
                  updateNestedContent(['liveStreaming', 'packages'], newPackages);
                }}
              />
              <Input
                label="Duration"
                value={pkg.duration}
                onChange={(val: string) => {
                  const newPackages = [...content.liveStreaming.packages];
                  newPackages[index] = { ...pkg, duration: val };
                  updateNestedContent(['liveStreaming', 'packages'], newPackages);
                }}
              />
            </div>
            <div>
              <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
                Features (one per line)
              </label>
              <textarea
                value={pkg.features.join('\n')}
                onChange={(e) => {
                  const newPackages = [...content.liveStreaming.packages];
                  newPackages[index] = { ...pkg, features: e.target.value.split('\n') };
                  updateNestedContent(['liveStreaming', 'packages'], newPackages);
                }}
                rows={6}
                className="w-full bg-dark-navy/50 border-3 border-primary-red/30 rounded-lg px-6 py-4 text-white font-body text-sm focus:border-primary-red focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pkg.popular || false}
                onChange={(e) => {
                  const newPackages = [...content.liveStreaming.packages];
                  newPackages[index] = { ...pkg, popular: e.target.checked };
                  updateNestedContent(['liveStreaming', 'packages'], newPackages);
                }}
                className="w-4 h-4"
              />
              <label className="text-white font-body text-sm">Mark as popular</label>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newPackage = {
              title: "New Stream Package",
              price: "£100",
              duration: "per hour",
              features: ["Feature 1", "Feature 2"],
              popular: false,
            };
            updateNestedContent(['liveStreaming', 'packages'], [...content.liveStreaming.packages, newPackage]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add Package
        </button>
      </div>
    </div>
  </div>
);

// Membership Tab
const MembershipTab = ({ content, updateNestedContent }: any) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      Membership Page Content
    </h2>

    <div className="space-y-6">
      <Input
        label="Hero Title"
        value={content.membership.heroTitle}
        onChange={(val: string) => updateNestedContent(['membership', 'heroTitle'], val)}
      />
      <Input
        label="Hero Subtitle"
        value={content.membership.heroSubtitle}
        onChange={(val: string) => updateNestedContent(['membership', 'heroSubtitle'], val)}
      />
      <Textarea
        label="Hero Description"
        value={content.membership.heroDescription}
        onChange={(val: string) => updateNestedContent(['membership', 'heroDescription'], val)}
        rows={4}
      />
      <FileUpload
        label="Hero Video"
        accept="video/*"
        type="video"
        currentUrl={content.membership.heroVideo}
        onUploadComplete={(url: string) => updateNestedContent(['membership', 'heroVideo'], url)}
      />
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Membership Tiers
      </h3>
      <div className="space-y-6">
        {content.membership.tiers.map((tier: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-display italic uppercase text-primary-red">Tier {index + 1}</h4>
              <button
                onClick={() => {
                  const newTiers = content.membership.tiers.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['membership', 'tiers'], newTiers);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <Input
              label="Name"
              value={tier.name}
              onChange={(val: string) => {
                const newTiers = [...content.membership.tiers];
                newTiers[index] = { ...tier, name: val };
                updateNestedContent(['membership', 'tiers'], newTiers);
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                value={tier.price}
                onChange={(val: string) => {
                  const newTiers = [...content.membership.tiers];
                  newTiers[index] = { ...tier, price: val };
                  updateNestedContent(['membership', 'tiers'], newTiers);
                }}
              />
              <Input
                label="Period"
                value={tier.period}
                onChange={(val: string) => {
                  const newTiers = [...content.membership.tiers];
                  newTiers[index] = { ...tier, period: val };
                  updateNestedContent(['membership', 'tiers'], newTiers);
                }}
              />
            </div>
            <div>
              <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
                Features (one per line)
              </label>
              <textarea
                value={tier.features.join('\n')}
                onChange={(e) => {
                  const newTiers = [...content.membership.tiers];
                  newTiers[index] = { ...tier, features: e.target.value.split('\n') };
                  updateNestedContent(['membership', 'tiers'], newTiers);
                }}
                rows={6}
                className="w-full bg-dark-navy/50 border-3 border-primary-red/30 rounded-lg px-6 py-4 text-white font-body text-sm focus:border-primary-red focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={tier.popular || false}
                onChange={(e) => {
                  const newTiers = [...content.membership.tiers];
                  newTiers[index] = { ...tier, popular: e.target.checked };
                  updateNestedContent(['membership', 'tiers'], newTiers);
                }}
                className="w-4 h-4"
              />
              <label className="text-white font-body text-sm">Mark as popular</label>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newTier = {
              name: "New Tier",
              price: "£99",
              period: "per month",
              features: ["Feature 1", "Feature 2"],
              popular: false,
            };
            updateNestedContent(['membership', 'tiers'], [...content.membership.tiers, newTier]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add Tier
        </button>
      </div>
    </div>
  </div>
);

// Homepage Tab
const HomepageTab = ({ content, updateNestedContent }: any) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      Homepage Content
    </h2>

    <div className="space-y-6">
      <FileUpload
        label="Hero Video 1"
        accept="video/*"
        type="video"
        currentUrl={content.homepage.heroVideo1}
        onUploadComplete={(url: string) => updateNestedContent(['homepage', 'heroVideo1'], url)}
      />
      <FileUpload
        label="Hero Video 2"
        accept="video/*"
        type="video"
        currentUrl={content.homepage.heroVideo2}
        onUploadComplete={(url: string) => updateNestedContent(['homepage', 'heroVideo2'], url)}
      />
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Features Section
      </h3>
      <div className="space-y-6 mb-6">
        <Input
          label="Features Title"
          value={content.homepage.featuresTitle}
          onChange={(val: string) => updateNestedContent(['homepage', 'featuresTitle'], val)}
        />
        <Textarea
          label="Features Subtitle"
          value={content.homepage.featuresSubtitle}
          onChange={(val: string) => updateNestedContent(['homepage', 'featuresSubtitle'], val)}
          rows={2}
        />
      </div>

      <h4 className="text-lg font-display italic uppercase text-primary-red mb-4">
        Feature Cards
      </h4>
      <div className="space-y-6">
        {content.homepage.features.map((feature: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <h5 className="text-md font-display italic uppercase text-primary-red">Feature {index + 1}</h5>
            <Input
              label="Title"
              value={feature.title}
              onChange={(val: string) => {
                const newFeatures = [...content.homepage.features];
                newFeatures[index] = { ...feature, title: val };
                updateNestedContent(['homepage', 'features'], newFeatures);
              }}
            />
            <Textarea
              label="Description"
              value={feature.description}
              onChange={(val: string) => {
                const newFeatures = [...content.homepage.features];
                newFeatures[index] = { ...feature, description: val };
                updateNestedContent(['homepage', 'features'], newFeatures);
              }}
              rows={3}
            />
            <FileUpload
              label={`${feature.title} Image`}
              accept="image/*"
              type="image"
              currentUrl={content.homepage.featureImages[index]}
              onUploadComplete={(url: string) => {
                const newImages = [...content.homepage.featureImages];
                newImages[index] = url;
                updateNestedContent(['homepage', 'featureImages'], newImages);
              }}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Showreel Section
      </h3>
      <div className="space-y-6">
        <Input
          label="Showreel Title"
          value={content.homepage.showreelTitle}
          onChange={(val: string) => updateNestedContent(['homepage', 'showreelTitle'], val)}
        />
        <Textarea
          label="Showreel Description"
          value={content.homepage.showreelDescription}
          onChange={(val: string) => updateNestedContent(['homepage', 'showreelDescription'], val)}
          rows={2}
        />
        <FileUpload
          label="Showreel Video"
          accept="video/*"
          type="video"
          currentUrl={content.homepage.showreelVideo}
          onUploadComplete={(url: string) => updateNestedContent(['homepage', 'showreelVideo'], url)}
        />
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        Stats Section
      </h3>
      <div className="space-y-6 mb-6">
        <Input
          label="Stats Title"
          value={content.homepage.statsTitle}
          onChange={(val: string) => updateNestedContent(['homepage', 'statsTitle'], val)}
        />
        <Textarea
          label="Stats Subtitle"
          value={content.homepage.statsSubtitle}
          onChange={(val: string) => updateNestedContent(['homepage', 'statsSubtitle'], val)}
          rows={2}
        />
      </div>

      <h4 className="text-lg font-display italic uppercase text-primary-red mb-4">
        Statistics
      </h4>
      <div className="space-y-6">
        {content.homepage.stats.map((stat: any, index: number) => (
          <div key={index} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-md font-display italic uppercase text-primary-red">Stat {index + 1}</h5>
              <button
                onClick={() => {
                  const newStats = content.homepage.stats.filter((_: any, i: number) => i !== index);
                  updateNestedContent(['homepage', 'stats'], newStats);
                }}
                className="text-red-400 hover:text-red-300 text-sm font-body"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Number"
                type="number"
                value={stat.number}
                onChange={(val: string) => {
                  const newStats = [...content.homepage.stats];
                  newStats[index] = { ...stat, number: parseInt(val) || 0 };
                  updateNestedContent(['homepage', 'stats'], newStats);
                }}
              />
              <Input
                label="Suffix"
                value={stat.suffix}
                onChange={(val: string) => {
                  const newStats = [...content.homepage.stats];
                  newStats[index] = { ...stat, suffix: val };
                  updateNestedContent(['homepage', 'stats'], newStats);
                }}
              />
              <Input
                label="Label"
                value={stat.label}
                onChange={(val: string) => {
                  const newStats = [...content.homepage.stats];
                  newStats[index] = { ...stat, label: val };
                  updateNestedContent(['homepage', 'stats'], newStats);
                }}
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newStat = { number: 100, suffix: "+", label: "New Stat" };
            updateNestedContent(['homepage', 'stats'], [...content.homepage.stats, newStat]);
          }}
          className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
        >
          Add Stat
        </button>
      </div>
    </div>

    <div className="border-t border-primary-red/20 pt-6">
      <h3 className="text-2xl font-display italic uppercase text-white mb-4">
        CTA Section
      </h3>
      <div className="space-y-6">
        <Input
          label="CTA Title"
          value={content.homepage.ctaTitle}
          onChange={(val: string) => updateNestedContent(['homepage', 'ctaTitle'], val)}
        />
        <Textarea
          label="CTA Description"
          value={content.homepage.ctaDescription}
          onChange={(val: string) => updateNestedContent(['homepage', 'ctaDescription'], val)}
          rows={2}
        />
        <Input
          label="CTA Button Text"
          value={content.homepage.ctaButtonText}
          onChange={(val: string) => updateNestedContent(['homepage', 'ctaButtonText'], val)}
        />
      </div>
    </div>
  </div>
);

// About Tab
const AboutTab = ({ content, updateContent }: any) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-display italic uppercase text-primary-red mb-6">
      About Page
    </h2>
    <Input
      label="Page Title"
      value={content.about.title}
      onChange={(val: string) => updateContent({ about: { ...content.about, title: val } })}
    />
    <Textarea
      label="Description"
      value={content.about.description}
      onChange={(val: string) => updateContent({ about: { ...content.about, description: val } })}
      rows={4}
    />
    <Textarea
      label="Mission Statement"
      value={content.about.mission}
      onChange={(val: string) => updateContent({ about: { ...content.about, mission: val } })}
      rows={3}
    />
    <Textarea
      label="Vision Statement"
      value={content.about.vision}
      onChange={(val: string) => updateContent({ about: { ...content.about, vision: val } })}
      rows={3}
    />
  </div>
);

// Portfolio Tab
const PortfolioTab = ({ content, updateNestedContent }: any) => (
  <div className="space-y-8">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-3xl font-display italic uppercase text-primary-red mb-2">
          Portfolio Management
        </h2>
        <p className="text-white/60 font-body text-sm">
          Click on any field below to edit. Changes are saved automatically.
        </p>
      </div>
    </div>

    {content.portfolio.length === 0 ? (
      <div className="text-center py-12 border-2 border-dashed border-primary-red/30 rounded-lg">
        <p className="text-white/60 font-body text-lg mb-4">No portfolio items yet</p>
        <p className="text-white/40 font-body text-sm">Click the button below to add your first portfolio item</p>
      </div>
    ) : (
      <div className="space-y-6">
        {content.portfolio.map((item: any, index: number) => (
        <div key={item.id} className="bg-dark-navy/30 border border-primary-red/20 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-display italic uppercase text-primary-red">
              Portfolio Item {index + 1}
            </h4>
            <button
              onClick={() => {
                const newPortfolio = content.portfolio.filter((p: any) => p.id !== item.id);
                updateNestedContent(['portfolio'], newPortfolio);
              }}
              className="text-red-400 hover:text-red-300 text-sm font-body"
            >
              Remove
            </button>
          </div>

          <Input
            label="Title"
            value={item.title}
            onChange={(val: string) => {
              const newPortfolio = [...content.portfolio];
              newPortfolio[index] = { ...item, title: val };
              updateNestedContent(['portfolio'], newPortfolio);
            }}
          />

          <Textarea
            label="Description"
            value={item.description}
            onChange={(val: string) => {
              const newPortfolio = [...content.portfolio];
              newPortfolio[index] = { ...item, description: val };
              updateNestedContent(['portfolio'], newPortfolio);
            }}
            rows={3}
          />

          <Input
            label="Video URL (YouTube Embed)"
            value={item.videoUrl}
            onChange={(val: string) => {
              const newPortfolio = [...content.portfolio];
              newPortfolio[index] = { ...item, videoUrl: val };
              updateNestedContent(['portfolio'], newPortfolio);
            }}
            placeholder="e.g., https://www.youtube.com/embed/your-video-id"
          />

          {item.videoUrl && (
            <div className="mt-4">
              <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
                Preview
              </label>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-dark-navy/50">
                <iframe
                  src={item.videoUrl}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
    )}

    <button
      onClick={() => {
        const newItem = {
          id: Date.now().toString(),
          title: "New Portfolio Item",
          description: "Add a description for this portfolio item",
          videoUrl: "",
        };
        updateNestedContent(['portfolio'], [...content.portfolio, newItem]);
      }}
      className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300"
    >
      Add Portfolio Item
    </button>
  </div>
);
