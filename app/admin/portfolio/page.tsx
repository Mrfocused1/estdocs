"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export default function AdminPortfolio() {
  const { content, setContent } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);

  const openModal = (item: PortfolioItem | null = null) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSave = (item: PortfolioItem) => {
    if (currentItem) {
      // Edit existing item
      const updatedPortfolio = content.portfolio.map((p) =>
        p.id === item.id ? item : p
      );
      setContent({ ...content, portfolio: updatedPortfolio });
    } else {
      // Add new item
      const newItem = { ...item, id: Date.now().toString() };
      setContent({ ...content, portfolio: [...content.portfolio, newItem] });
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedPortfolio = content.portfolio.filter((p) => p.id !== id);
      setContent({ ...content, portfolio: updatedPortfolio });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Portfolio</h1>
        <button onClick={() => openModal()} className="btn-primary">
          Add New Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.portfolio.map((item) => (
          <div key={item.id} className="card">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={item.videoUrl}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <div className="flex gap-4">
              <button onClick={() => openModal(item)} className="btn-secondary">
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <PortfolioModal
          item={currentItem}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onSave: (item: PortfolioItem) => void;
  onClose: () => void;
}

function PortfolioModal({ item, onSave, onClose }: PortfolioModalProps) {
  const [formData, setFormData] = useState<PortfolioItem>(
    item || { id: "", title: "", description: "", videoUrl: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-dark-navy p-8 rounded-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6">
          {item ? "Edit Portfolio Item" : "Add New Portfolio Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="label">Video URL (YouTube Embed)</label>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="input"
              placeholder="e.g., https://www.youtube.com/embed/your-video-id"
              required
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
