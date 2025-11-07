"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
  "🌿 Premium Smokin' Paradise Products",
  "🧘 Friendly Staff Ready to Help",
  "📍 Visit Us in Bedford – 21+",
  "🔔 Latest Deals & Promotions",
  "☎️ Call or Stop By Today"
];

const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length);
  const next = () => setCurrent((prev) => (prev + 1) % announcements.length);

  return (
    <div className="w-full flex justify-center my-4 z-20">
      <div className="relative flex items-center justify-between max-w-[1400px] w-full bg-[#c2560e] text-white px-4 sm:px-6 py-2 rounded-md shadow-md overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="p-1 rounded-full bg-white/20 hover:bg-white/40 transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Rotating Text */}
        <div className="flex-1 text-center font-medium text-sm sm:text-base overflow-hidden relative h-6 sm:h-8">
          {announcements.map((item, idx) => (
            <span
              key={idx}
              className={`absolute left-0 w-full transition-all duration-500 ${
                current === idx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
              } whitespace-nowrap`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="p-1 rounded-full bg-white/20 hover:bg-white/40 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
