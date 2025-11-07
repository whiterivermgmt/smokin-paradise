"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface HomeProductsProps {
  title: string;
  items: Product[];
}

const HomeProducts: React.FC<HomeProductsProps> = ({ title, items }) => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1); // mobile
      else if (width < 1024) setItemsPerPage(3); // tablet
      else setItemsPerPage(5); // desktop
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(items.length - itemsPerPage, 0);

  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  // Calculate translateX for smooth centering
  const itemWidth = 288 + 24; // card width + gap
  const translateX = -(currentIndex * itemWidth);

  return (
    <section className="py-12 relative">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">{title}</h2>

      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Products */}
        <div className="overflow-hidden w-full">
          <motion.div
            ref={containerRef}
            className="flex gap-6"
            animate={{ x: translateX }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {items.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`}>
                <motion.div
                  className="shrink-0 w-72 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover rounded-t-2xl"
                      sizes="(max-width: 1024px) 100vw, 288px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-orange-500 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={currentIndex === maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow z-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition ${currentIndex === idx ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeProducts;
