"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useFavorites } from "@/app/context/FavoriteContext";
import { Trash2, Heart } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== Shipping Options =====
  const shippingOptions = [
    { label: "Standard", price: 11.99 },
    { label: "Express", price: 24.99 },
    { label: "Next-Day", price: 39.99 },
  ];
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  // ===== Calculations =====
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax + selectedShipping.price;

  // ===== Handlers =====
  const increaseQty = (id: string) => dispatch({ type: "INCREASE_QTY", payload: id });
  const decreaseQty = (id: string) => dispatch({ type: "DECREASE_QTY", payload: id });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });

  const handleProceedToCheckout = () => {
    if (state.items.length === 0) return;
    // Navigate to checkout page
    window.location.href = "/checkout";
  };

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8 border-b border-black pb-3">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ===== Cart Items ===== */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {state.items.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-600 mt-10"
                >
                  Your cart is empty.
                </motion.p>
              ) : (
                state.items.map((item) => {
                  const isFavorite = favorites.includes(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-between gap-4 p-4 border border-black/20 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      {/* Product Link */}
                      <Link
                        href={`/shop/${item.slug}`}
                        className="flex items-center gap-4 flex-1"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg border border-black/10"
                        />
                        <div>
                          <h3 className="text-black font-semibold">{item.title}</h3>
                          <p className="text-orange-500 font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border border-black/30 hover:bg-orange-50"
                        >
                          -
                        </button>
                        <motion.span
                          key={item.quantity}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.2 }}
                          className="w-8 text-center text-black"
                        >
                          {item.quantity}
                        </motion.span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-md border border-black/30 hover:bg-orange-50"
                        >
                          +
                        </button>
                      </div>

                      {/* Price + Actions */}
                      <div className="flex flex-col items-end gap-2">
                        <motion.p
                          key={item.quantity * item.price}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 0.2 }}
                          className="font-semibold text-black"
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </motion.p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className={`transition-colors ${
                              isFavorite
                                ? "text-orange-500"
                                : "text-gray-500 hover:text-black"
                            }`}
                            aria-label="Toggle Favorite"
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* ===== Order Summary ===== */}
          <div className="bg-white border border-black/20 rounded-xl p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold text-black border-b border-black/10 pb-2">
              Order Summary
            </h2>

            {error && <p className="text-red-600">{error}</p>}

            <div className="space-y-2">
              {/* Subtotal */}
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping Selector */}
              <div className="flex justify-between items-center text-gray-700">
                <span>Shipping</span>
                <select
                  value={selectedShipping.label}
                  onChange={(e) =>
                    setSelectedShipping(
                      shippingOptions.find(
                        (opt) => opt.label === e.target.value
                      ) || shippingOptions[0]
                    )
                  }
                  className="ml-2 border border-gray-300 rounded px-2 py-1 text-black"
                >
                  {shippingOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label} (${option.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tax */}
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between font-bold text-black border-t border-black/20 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={handleProceedToCheckout}
              disabled={state.items.length === 0 || loading}
              className={`w-full text-white font-semibold py-2.5 rounded-xl transition ${
                state.items.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-orange-500"
              }`}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>

            <Link
              href="/shop"
              className="block text-center text-orange-500 hover:text-black font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
