"use client";

import React from "react";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";

const heroImage = "/gallery/gallery2.webp";

const sections = [
  {
    title: "Our Mission",
    text: "We aim to deliver premium products that are lab-tested, ethically sourced, and carefully curated. Supporting our community and the environment is at the heart of everything we do, ensuring our customers enjoy the best experience possible.",
    img: "/gallery/gallery3.webp",
  },
  {
    title: "Our Values",
    text: "Integrity, transparency, and quality guide all our decisions. Smokin' Paradise strives to create meaningful connections with our customers, offering expert guidance and a welcoming environment to explore wellness and enjoyment.",
    img: "/gallery/gallery4.webp",
  },
  {
    title: "Premium Products",
    text: "Our curated selection includes vapes, disposables, CBD oils, edibles, and wellness items, all chosen for quality and effectiveness. Every product is tested to ensure safety, reliability, and satisfaction for our customers.",
    img: "/gallery/gallery5.webp",
  },
  {
    title: "Community & Education",
    text: "We believe in empowering our customers with knowledge. Smokin' Paradise hosts events, workshops, and consultations to help customers make informed choices. Our staff is always ready to provide personalized recommendations.",
    img: "/gallery/gallery1.webp",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-32">

      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <Container className="relative z-10 h-full flex flex-col justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-extrabold text-orange-500 mb-6"
          >
            About Smokin' Paradise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Smokin' Paradise is your premier destination in Bedford, IN for high-quality vape, CBD, and wellness products. Our mission is to provide a safe, enjoyable, and trusted experience, blending passion, care, and expertise in every product we offer.
          </motion.p>
        </Container>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => {
        const reverse = index % 2 === 1; // alternate sides on desktop
        return (
          <section key={index} className="py-32 bg-gray-50">
            <Container className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Text */}
              <div className={`flex-1 lg:${reverse ? "order-2" : "order-1"} mb-8 lg:mb-0`}>
                <motion.h2
                  initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl font-bold mb-6 text-gray-900"
                >
                  {section.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg leading-relaxed text-gray-700"
                >
                  {section.text}
                </motion.p>
              </div>

              {/* Image */}
              <div className={`flex-1 lg:${reverse ? "order-1" : "order-2"}`}>
                <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src={section.img}
                    alt={section.title}
                    width={700}
                    height={450}
                    className="rounded-xl object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </Container>
          </section>
        );
      })}

    </div>
  );
}
