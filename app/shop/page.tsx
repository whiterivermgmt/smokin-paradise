"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product, products as allProducts } from "@/data/products";
import { useCart } from "@/app/context/CartContext";
import { useFavorites } from "@/app/context/FavoriteContext";

// --- Product Card ---
const ProductCard = ({
  product,
  toggleFavorite,
  favorites,
  addToCart,
}: {
  product: Product;
  toggleFavorite: (id: string) => void;
  favorites: string[];
  addToCart: (p: Product) => void;
}) => {
  const isFavorited = favorites.includes(product.id);
  const discount = 0.2;
  const discountedPrice = product.hotDeal
    ? (product.price * (1 - discount)).toFixed(2)
    : null;

  const rating = product.rating ?? 0; // fallback if undefined

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300 group">
      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className={`absolute top-3 right-3 z-10 transition-colors ${
          isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-500"
        }`}
      >
        <Heart className="w-6 h-6" />
      </button>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {product.bestSeller && (
          <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded font-semibold">
            Best Seller
          </span>
        )}
        {product.hotDeal && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-semibold">
            Hot Deal
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="cursor-pointer flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <Link href={`/shop/${product.slug}`}>
          <h2 className="text-lg font-semibold truncate hover:text-orange-500 transition">
            {product.title}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          {product.reviews && (
            <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
          )}
        </div>

        {/* Price */}
        <div className="mt-2">
          {product.hotDeal ? (
            <div className="flex items-center gap-2">
              <p className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</p>
              <p className="text-green-600 font-bold">${discountedPrice}</p>
            </div>
          ) : (
            <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-3 bg-orange-500 text-white py-1.5 rounded-lg w-full hover:bg-orange-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// --- Shop Page ---
export default function ShopPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const { favorites, toggleFavorite } = useFavorites();
  const { dispatch } = useCart();

  const categories = [
    "disposables",
    "e-liquids",
    "nic-pouches",
    "vape-kits",
    "hemp",
    "vaporizers",
    "glass",
    "accessories",
  ];

  // Sync category from query param
  useEffect(() => {
    const categoryFromQuery = searchParams.get("category")?.toLowerCase();
    if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategories([categoryFromQuery]);
    }
  }, [searchParams]);

  const toggleCategoryCheckbox = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const addToCart = (product: Product) => {
    const price = product.hotDeal ? product.price * 0.8 : product.price;
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, price, quantity: 1 },
    });
  };

  const filteredProducts = allProducts.filter((p) => {
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(p.category.toLowerCase())
      : true;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0">
        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Price Slider */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="font-semibold mb-2">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </p>
          <Slider
            range
            min={0}
            max={500}
            value={priceRange}
            onChange={(val) => setPriceRange(val as [number, number])}
            trackStyle={[{ backgroundColor: "#f97316" }]}
            handleStyle={[{ borderColor: "#f97316" }, { borderColor: "#f97316" }]}
          />
        </div>

        {/* Categories Accordion */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-2">
          {categories.map((cat) => (
            <div key={cat}>
              <button
                className="w-full px-4 py-2 rounded hover:bg-gray-200 font-semibold flex justify-between items-center"
                onClick={() =>
                  setOpenAccordion(openAccordion === cat ? null : cat)
                }
              >
                {cat.replace("-", " ")}
                <span>{openAccordion === cat ? "-" : "+"}</span>
              </button>
              {openAccordion === cat && (
                <div className="pl-4 mt-2 flex flex-col gap-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategoryCheckbox(cat)}
                      className="accent-orange-500"
                    />
                    <span className="text-sm">{cat.replace("-", " ")}</span>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
