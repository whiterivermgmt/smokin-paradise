"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GalleryCarousel = () => {
  // Gallery images
  const gallery = Array.from({ length: 10 }).map((_, i) => `/gallery/gallery${i + 1}.webp`);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerSlide(1);
      else if (width < 1024) setItemsPerSlide(3);
      else setItemsPerSlide(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(gallery.length / itemsPerSlide);
  const startIndex = currentSlide * itemsPerSlide;
  const currentItems = gallery.slice(startIndex, startIndex + itemsPerSlide);

  // Slide navigation
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % gallery.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <section className="py-12 relative">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Gallery</h2>

      <div className="relative flex items-center justify-center">
        {/* Previous Slide */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow z-10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel Items */}
        <div className="flex gap-4 overflow-hidden w-full justify-center">
          {currentItems.map((src, i) => (
            <div
              key={i}
              className="w-48 sm:w-56 md:w-60 h-48 bg-gray-200 rounded-2xl overflow-hidden shrink-0 cursor-pointer"
              onClick={() => openLightbox(startIndex + i)}
            >
              <img src={src} alt={`Gallery ${startIndex + i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Next Slide */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition ${currentSlide === idx ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>

      {/* See More Link */}
      <div className="text-center mt-6">
        <Link
          href="/gallery"
          className="px-6 py-3 bg-orange-600 text-white rounded-full font-semibold shadow-lg hover:bg-orange-500 transition"
        >
          See More
        </Link>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-20"
            >
              <X size={28} />
            </button>

            {/* Prev / Next */}
            <button
              onClick={prevLightbox}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextLightbox}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            <motion.img
              src={gallery[lightboxIndex]}
              alt={`Gallery ${lightboxIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryCarousel;
