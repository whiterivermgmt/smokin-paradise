"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Facebook, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Footer background image
const footerImage = "/logo/footer.png";

// Dynamically import the Leaflet map (client-side only)
const MapWithNoSSR = dynamic(() => import("./LeafletMap"), { ssr: false });

const socialLinks = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/Smokinparadise1/",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Google Reviews",
    href: "https://www.google.com/search?q=smokin+paradise",
    icon: <Star className="w-5 h-5" />,
  },
  {
    title: "Yelp",
    href: "https://www.yelp.com/biz/smokin-paradise-bedford",
    icon: <Heart className="w-5 h-5" />,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${footerImage})` }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-linear-to-tr from-transparent via-white/20 to-transparent"></div>
        </div>

        <Container className="relative max-w-6xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-6 text-white">
              <h2 className="text-5xl font-extrabold text-orange-500">
                Get in Touch
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                Questions about our vape products, personalized recommendations, or order support? We’re here to help.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="font-bold text-orange-500">📍 Location:</span>
                  <span>3078 John A Williams Blvd, Bedford, IN 47421</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold text-orange-500">⏰ Hours:</span>
                  <span>Mon-Sat: 10am - 9pm | Sun: 11am - 7pm</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold text-orange-500">📞 Phone:</span>
                  <span>(412) 551-6026</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold text-orange-500">✉️ Email:</span>
                  <span>smokinparadise1@gmail.com</span>
                </li>
              </ul>

              <div className="flex gap-4 mt-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative p-3 border rounded-full border-white text-white hover:scale-110 transition-all duration-300 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center group"
                    )}
                    aria-label={item.title}
                  >
                    {item.icon}
                    <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {item.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-12">
              <form className="space-y-6">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 placeholder-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 placeholder-gray-400"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-all w-full shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-32 bg-white">
        <Container className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-black text-center mb-12">
            Visit Us / Contact Info
          </h2>

          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6 text-gray-800 text-lg">
              <p>📍 3078 John A Williams Blvd, Bedford, IN 47421</p>
              <p>⏰ Mon-Sat: 10am - 9pm | Sun: 11am - 7pm</p>
              <p>📞 (412) 551-6026</p>
              <p>✉️ smokinparadise1@gmail.com</p>

              <div className="flex gap-4 mt-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative p-3 border rounded-full border-black text-black hover:scale-110 transition-all duration-300 hover:text-orange-500 hover:border-orange-500 flex items-center justify-center group"
                    )}
                    aria-label={item.title}
                  >
                    {item.icon}
                    <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {item.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Leaflet Map */}
            <MapWithNoSSR />
          </div>
        </Container>
      </section>
    </div>
  );
}
