"use client";

import React, { useState, useEffect, useRef } from "react";
import { Product, products } from "@/lib/products";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  iconColor?: string;
}

const categories = [
  "All",
  "Brands",
  "Disposables",
  "E-Liquids",
  "Nic Pouches",
  "Vape Kits",
  "Hemp",
  "Vaporizers",
  "Glass",
  "Accessories",
];

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-orange-500/30 px-1 rounded">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};

const SearchModal: React.FC<SearchModalProps> = ({ iconColor = "text-black" }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter products based on category and search term
  const filteredProducts = products.filter((p) => {
    // Category filtering
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Brands") return !!p.brand;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  }).filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 focus:outline-none"
        aria-label="Search"
      >
        <Search className={`w-6 h-6 transition-colors duration-200 ${iconColor} hover:text-orange-500`} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:items-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          <div
            ref={modalRef}
            className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 border border-black"
          >
            {/* Input + Close */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-5 py-3 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 text-black"
                autoFocus
              />
              <button
                onClick={() => setOpen(false)}
                className="text-black hover:text-orange-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-sm font-medium border transition ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white border-black"
                      : "bg-white text-black border-black hover:border-orange-500 hover:text-orange-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product list */}
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto mt-2">
              {filteredProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No results found.</p>
              ) : (
                filteredProducts.map((product) => {
                  const discountedPrice = product.hotDeal ? product.price * 0.8 : product.price;
                  return (
                    <Link
                      key={product.id}
                      href={`/shop/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition shadow-sm"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-black font-medium text-sm">
                          {highlightText(product.title, query)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-black/10 text-black text-xs border border-black">
                            {product.category}
                          </Badge>
                          {product.hotDeal && (
                            <Badge className="bg-orange-500 text-white text-xs">
                              Hot Deal!
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-black">
                        {product.hotDeal ? (
                          <>
                            <span className="text-gray-400 line-through text-sm">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-orange-500 font-semibold ml-1">
                              ${discountedPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-orange-500 font-semibold">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
