"use client";

import React from "react";
import Link from "next/link";
import { useFavorites } from "@/app/context/FavoriteContext";
import { products, Product } from "@/lib/products";
import { X } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteProducts: Product[] = products.filter((p) =>
    favorites.includes(p.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-black mb-8">Favorites</h1>

      {/* Empty State */}
      {favoriteProducts.length === 0 && (
        <div className="text-center py-16 border border-gray-200 rounded-xl">
          <p className="text-gray-500 text-lg mb-4">
            You haven’t added any favorites yet.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Browse Products
          </Link>
        </div>
      )}

      {/* Favorites Grid */}
      {favoriteProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition cursor-pointer"
            >
              <Link href={`/shop/${product.slug}`} className="flex-1 flex flex-col">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md mb-4 transition-transform hover:scale-105"
                />
                <h2 className="text-lg font-semibold text-black mb-1">
                  {product.title}
                </h2>
                <p className="text-orange-500 font-bold mb-2">${product.price}</p>
              </Link>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="text-gray-700 hover:text-red-500 transition flex items-center gap-1"
                >
                  <X className="w-5 h-5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
