"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  { src: "/banner/banner1.webp", link: "/shop?product=1" },
  { src: "/banner/banner2.webp", link: "/shop?product=2" },
  { src: "/banner/banner3.webp", link: "/shop?product=3" },
  { src: "/banner/banner4.webp", link: "/shop?product=4" },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + banners.length) % banners.length);
  const nextSlide = () => setCurrent((current + 1) % banners.length);

  return (
    <section className="relative w-full">
      {/* Carousel */}
      <div className="relative w-full h-[45vh] sm:h-[60vh] overflow-hidden rounded-xl">
        <AnimatePresence>
          {banners.map((banner, index) =>
            index === current ? (
              <motion.a
                key={index}
                href={banner.link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={banner.src}
                  alt={`Banner ${index + 1}`}
                  className="
                    w-full h-full rounded-xl
                    object-cover sm:object-center object-left
                    scale-[1.05] sm:scale-[1.02]
                    transition-transform duration-700 ease-in-out
                  "
                />
              </motion.a>
            ) : null
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white shadow-md z-10"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white shadow-md z-10"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                current === idx ? "bg-white shadow-md scale-110" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
