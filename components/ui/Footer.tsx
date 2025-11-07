"use client";

import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import { SubText, SubTitle } from "./text";
import { quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Input } from "./input";
import { Button } from "./button";
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from "@radix-ui/react-tooltip";
import { Facebook, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// --- Shop categories for footer ---
export const categoriesData = [
  { title: "All", slug: "all" },
  { title: "Brands", slug: "brands" },
  { title: "Disposables", slug: "disposables" },
  { title: "E-liquids", slug: "e-liquids" },
  { title: "Nic Pouches", slug: "nic-pouches" },
  { title: "Vape Kits", slug: "vape-kits" },
  { title: "Hemp", slug: "hemp" },
  { title: "Vaporizers", slug: "vaporizers" },
  { title: "Glass", slug: "glass" },
  { title: "Accessories", slug: "accessories" },
];

const socialLinks = [
  { title: "Facebook", href: "https://www.facebook.com/profile.php?id=61568147739220", icon: <Facebook className="w-5 h-5" /> },
  { title: "Google Reviews", href: "https://www.google.com/search?q=Escos+Green", icon: <Star className="w-5 h-5" /> },
  { title: "Yelp", href: "https://yelp.com/biz/escos-green-bedford", icon: <Heart className="w-5 h-5" /> },
];

const Footer = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    if (slug === "all") router.push("/shop");
    else if (slug === "brands") router.push("/shop?filter=brands");
    else router.push(`/shop?category=${slug}`);
  };

  const categoryQuery = searchParams.get("category")?.toLowerCase();
  const filterQuery = searchParams.get("filter")?.toLowerCase();

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Image & Bright Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/logo/footer.png"
          alt="Footer Overlay"
          className="w-full h-full object-cover opacity-30 mix-blend-screen brightness-125"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-black/80" />
      </div>

      <Container className="relative z-10">
        <FooterTop />

        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Description + Social */}
          <div className="space-y-6">
            <Logo />
            <SubText className="text-gray-300 leading-relaxed mt-2">
              Explore premium CBD and wellness products at Smokin' Paradise, crafted to enhance your health, relaxation, and everyday well-being.
            </SubText>

            <TooltipProvider delayDuration={100}>
              <div className="flex items-center gap-4">
                {socialLinks.map((item) => (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => window.open(item.href, "_blank")}
                        className={cn(
                          "p-2 border rounded-full border-white text-white hover:scale-110 transition-all duration-300 hover:text-orange-500 hover:border-orange-500"
                        )}
                      >
                        {item.icon}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white border border-orange-500 text-black text-xs font-medium px-2.5 py-1 rounded-md shadow-md scale-95">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <SubTitle className="text-white uppercase tracking-wider">Quick Links</SubTitle>
            <ul className="space-y-2 mt-4">
              {quickLinksData?.map((item) => {
                const hrefPath = item.href.startsWith("/") ? item.href : undefined;
                const isActive = pathname === hrefPath;

                return (
                  <li key={item.title}>
                    <Link
                      href={item.href.startsWith("http") ? item.href : `/${item.href.replace(/^\/+/, "")}`}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "transition-colors font-medium",
                        isActive ? "text-orange-500" : "hover:text-orange-500 text-white"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Shop Categories */}
          <div>
            <SubTitle className="text-white uppercase tracking-wider">Shop Categories</SubTitle>
            <ul className="space-y-2 mt-4">
              {categoriesData.map((cat) => {
                let isActive = false;
                if (cat.slug === "brands") isActive = filterQuery === "brands";
                else if (cat.slug === "all") isActive = pathname === "/shop" && !categoryQuery && !filterQuery;
                else isActive = categoryQuery === cat.slug;

                return (
                  <li key={cat.slug}>
                    <button
                      onClick={() => handleCategoryClick(cat.slug)}
                      className={cn(
                        "transition-colors font-medium",
                        isActive ? "text-orange-500" : "hover:text-orange-500 text-white"
                      )}
                    >
                      {cat.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <SubTitle className="text-white uppercase tracking-wider">Newsletter</SubTitle>
            <SubText className="text-gray-300">
              Subscribe to our newsletter for updates and exclusive offers!
            </SubText>
            <form className="space-y-3">
              <Input
                placeholder="Enter your email"
                type="email"
                required
                className="bg-white text-black placeholder-gray-500 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 shadow-sm"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-400 text-white rounded-md hover:scale-105 transition-transform shadow-md">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <p className="flex flex-col md:flex-row justify-between items-center w-full text-sm border-t border-gray-700 pt-4 mt-8 text-gray-400">
          <span className="mb-2 md:mb-0">
            © {new Date().getFullYear()}{" "}
            <span className="font-black tracking-wider uppercase font-sans">
              <span className="text-orange-500">Smokin'</span> <span className="text-white">Paradise</span>
            </span>
            . All Rights Reserved.
          </span>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.whiterivermedia.com"
            className="hover:text-orange-500 transition-colors"
          >
            Designed by White River Media
          </Link>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
