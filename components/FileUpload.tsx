"use client";

import { useState, useRef } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface FileUploadProps {
  label: string;
  accept: string; // e.g., "image/*" or "video/*"
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  type?: "image" | "video";
}

export const FileUpload = ({ label, accept, currentUrl, onUploadComplete, type = "image" }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [preview, setPreview] = useState<string>(currentUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload file
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // Update the content with the new URL
      onUploadComplete(data.url);
      setPreview(data.url);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(currentUrl || "");
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm text-primary-red bg-transparent mb-2 block font-display italic uppercase font-bold">
        {label}
      </label>

      <div className="flex items-start gap-4">
        {/* Preview */}
        {preview && (
          <div className="flex-shrink-0 w-32 h-32 bg-dark-navy/50 border-2 border-primary-red/30 rounded-lg overflow-hidden">
            {type === "image" ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={preview}
                className="w-full h-full object-cover"
                muted
                loop
                autoPlay
              />
            )}
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleButtonClick}
            disabled={uploading}
            className="w-full bg-primary-red/10 hover:bg-primary-red/20 border-2 border-primary-red/30 hover:border-primary-red rounded-lg px-6 py-3 text-white font-display italic uppercase font-bold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <LoadingSpinner size="sm" color="yellow" />
                Uploading...
              </>
            ) : (
              <>
                {preview ? "Change" : "Upload"} {type === "image" ? "Image" : "Video"}
              </>
            )}
          </button>

          {error && (
            <p className="text-red-400 text-sm mt-2 font-body">{error}</p>
          )}

          <div className="mt-2 space-y-1">
            <p className="text-white/40 text-xs font-body">
              {type === "image"
                ? "Supported: JPG, PNG, GIF, WebP (Max 50MB)"
                : "Supported: MP4, WebM, MOV, AVI (Max 50MB)"}
            </p>
            {type === "image" && (
              <p className="text-primary-red/60 text-xs font-body italic">
                Recommended: 1920x1080px or higher, high quality (90%+), optimized for web
              </p>
            )}
            {type === "video" && (
              <p className="text-primary-red/60 text-xs font-body italic">
                Recommended: 1920x1080px (Full HD) or 3840x2160px (4K), H.264 codec, 30fps
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
