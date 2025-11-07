"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = Array.from({ length: 10 }, (_, i) => `/gallery/gallery${i + 1}.webp`);

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  const prevImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextImage = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % galleryItems.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <h1 className="text-5xl font-bold text-center mb-6">Gallery</h1>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {galleryItems.map((src, idx) => (
          <motion.div
            key={idx}
            layout
            className="break-inside-avoid relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            onClick={() => openLightbox(idx)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            {/* Optional overlay caption */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-lg font-semibold">
              Image {idx + 1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={galleryItems[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
                className="max-h-[90vh] w-auto rounded-2xl shadow-2xl"
              />

              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                onClick={closeLightbox}
              >
                <X size={28} />
              </button>

              {/* Previous */}
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft size={32} />
              </button>

              {/* Next */}
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black/50 p-3 rounded-full hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
