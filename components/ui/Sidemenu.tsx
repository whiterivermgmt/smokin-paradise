"use client";
import React, { FC, useRef, useEffect, useState } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Socialmedia from "./Socialmedia";

// Hook for detecting clicks outside the sidebar
function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback]);
  return ref;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Categories with images from /public/products
const categories = [
  { title: "All", slug: "all", image: "/products/monster-vape-watermelon-ice.png" },
  { title: "Brands", slug: "brands", image: "/products/fav.png" },
  { title: "Disposables", slug: "disposables", image: "/products/winter.png" },
  { title: "E-liquids", slug: "e-liquids", image: "/products/monster-vape-watermelon-ice.png" },
  { title: "Nic Pouches", slug: "nic-pouches", image: "/products/nic.png" },
  { title: "Vape Kits", slug: "vape-kits", image: "/products/cloudvape-oil-kit.png" },
  { title: "Hemp", slug: "hemp", image: "/products/gummies.png" },
  { title: "Vaporizers", slug: "vaporizers", image: "/products/vaporpro-dry-herb.png" },
  { title: "Glass", slug: "glass", image: "/products/trippyglass-pipe.png" },
  { title: "Accessories", slug: "accessories", image: "/products/delta8pro-charger.png" },
];

const Sidemenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCategoryClick = (slug: string) => {
    router.push(`/shop?category=${slug}`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-screen bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={sidebarRef}
        className={`w-full md:w-[95%] lg:max-w-4xl bg-black h-screen p-3 md:p-4 flex flex-col md:flex-row gap-3 md:gap-6 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar left (categories) */}
        <div className="flex flex-col md:flex-1 gap-2 md:gap-3">
          {/* Header: Logo + Close */}
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <Logo className="text-logo-orange text-[2rem] font-bold" />
            <button
              onClick={onClose}
              className="p-1 border-0 bg-transparent hover:text-orange-500 transition-colors duration-200 hover:rotate-180"
            >
              <X className="text-white w-8 h-8" />
            </button>
          </div>

          {/* Navigation Links with Images */}
          <nav className="flex flex-col gap-2 md:gap-3">
            {categories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => handleCategoryClick(cat.slug)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex items-center gap-2 md:gap-3 py-2 px-3 md:px-4 rounded-lg bg-white transition-all duration-200 hover:bg-orange-50 hover:scale-105"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <span className="text-black font-semibold text-sm md:text-base transition-colors duration-200 hover:text-orange-500">
                  {cat.title}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Social Media */}
          <div className="flex justify-center mt-3 md:mt-4">
            <Socialmedia />
          </div>
        </div>

        {/* Right-side category preview (only on md+) */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          {hoveredIndex !== null && (
            <div className="bg-white p-1 md:p-2 rounded-2xl shadow-lg w-full max-w-md">
              <img
                src={categories[hoveredIndex].image}
                alt={categories[hoveredIndex].title}
                className="rounded-2xl object-cover w-full h-52 md:h-64"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
