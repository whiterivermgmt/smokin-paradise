"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import AnnouncementBar from "@/components/ui/Annoucementbar";
import { products, Product, brands } from "@/lib/products";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import HomeProducts from "@/components/ui/homeproducts";

// ================= Age Gate =================
function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("ageVerified")) setVisible(true);
  }, []);

  const handleYes = () => {
    localStorage.setItem("ageVerified", "true");
    setVisible(false);
  };

  const handleNo = () => (window.location.href = "https://www.google.com");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="age-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-orange-200 rounded-3xl shadow-2xl p-10 w-11/12 max-w-md text-center"
          >
            <h2 className="text-4xl font-extrabold text-orange-600 mb-4">
              Welcome to Smokin’ Paradise
            </h2>
            <p className="text-black text-lg mb-8">
              You must be <span className="font-bold">21 or older</span> to enter this website.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleYes}
                className="px-8 py-3 bg-orange-600 text-white rounded-full font-semibold shadow-lg hover:bg-orange-500 transition"
              >
                Yes, I’m 21+
              </button>
              <button
                onClick={handleNo}
                className="px-8 py-3 bg-black text-white rounded-full font-semibold shadow-lg hover:bg-gray-800 transition"
              >
                No
              </button>
            </div>
            <p className="mt-6 text-gray-700 text-sm opacity-80">
              By entering, you agree to our terms and privacy policy.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ================= Hero =================
function HomeHero() {
  const banners = [
    "/banner/banner1.webp",
    "/banner/banner2.webp",
    "/banner/banner3.webp",
    "/banner/banner4.webp",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] overflow-hidden rounded-2xl mb-12">
      {banners.map((src, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: current === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <img
            src={src}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />

      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${i === current ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ================= CTA Boxes =================
interface CTABoxProps {
  image: string;
  href: string;
}

function CTABoxes({ boxes }: { boxes: CTABoxProps[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12">
      {boxes.map((box, idx) => (
        <Link key={idx} href={box.href}>
          <div className="w-full h-56 bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center hover:scale-105 transition-transform">
            <img src={box.image} alt="" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </Link>
      ))}
    </div>
  );
}

// ================= Home =================
export default function Home() {
  const trendingProducts = products.slice(0, 10);
  const newArrivals = products.slice(-10);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 10);

  const heroCTAs: CTABoxProps[] = [
    { image: "/cta/img1.jpg", href: "/shop?category=disposables" },
    { image: "/cta/img2.png", href: "/shop?category=e-liquids" },
  ];

  const postArrivalCTAs: CTABoxProps[] = [
    { image: "/cta/img3.png", href: "/shop?category=vape-kits" },
    { image: "/cta/img4.webp", href: "/shop?category=accessories" },
  ];

  return (
    <div className="bg-white text-black relative">
      <AgeGate />
      <AnnouncementBar />
      <Container className="py-8">
        <HomeHero />
        <CTABoxes boxes={heroCTAs} />

        {/* Product Sliders with full interaction */}
        <HomeProducts title="Trending Products" items={trendingProducts} />
        <CTABoxes boxes={postArrivalCTAs} />
        <HomeProducts title="New Arrivals" items={newArrivals} />
        <HomeProducts title="Best Sellers" items={bestSellers} />

        {/* Featured Brands */}
        <section className="py-12 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Featured Brands</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/shop?brand=${brand.name}`}
                className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              >
                <img src={brand.image} alt={brand.name} className="w-28 h-28 object-contain" />
                <span className="mt-2 font-semibold text-black">{brand.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="py-12">
          <GalleryCarousel />
        </section>
      </Container>
    </div>
  );
}
