'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const CartIcon = () => {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalQty = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = state.items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center focus:outline-none hover:text-orange-500 transition-colors"
      >
        <ShoppingBag className="w-6 h-6 text-white hover:text-orange-500 transition-colors" />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-black h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
            {totalQty}
          </span>
        )}
      </button>

      {/* Mini Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 origin-top animate-scale-in text-black">
          <h3 className="font-semibold mb-3 text-lg">Your Cart</h3>

          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600 text-sm">Your cart is empty.</p>
              <Link
                href="/shop"
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition cursor-pointer"
                    onClick={() => router.push(`/shop/${item.slug}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-black text-sm font-medium">{item.title}</p>
                      <p className="text-orange-500 text-sm">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="text-orange-500 hover:text-orange-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-sm font-medium text-black">Subtotal: ${subtotal}</p>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/cart"
                  className="text-white bg-black hover:bg-gray-800 py-2 rounded-lg text-center font-semibold transition"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-center font-semibold transition"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.15s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CartIcon;
