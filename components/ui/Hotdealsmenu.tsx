"use client";
import React, { FC } from "react";
import { X } from "lucide-react";
import { Product } from "@/lib/products";
import Link from "next/link";

interface HotDealsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  hotDeals: Product[];
}

const HotDealsMenu: FC<HotDealsMenuProps> = ({ isOpen, onClose, hotDeals }) => {
  const discount = 0.2; // 20% off

  return (
    <>
      {/* Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 h-full rounded-l-2xl shadow-2xl z-[999] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Hot Deals</h2>
          <button
            onClick={onClose}
            className="p-1 border-0 bg-transparent hover:text-shop_light_green transition-transform duration-300 hover:rotate-180"
          >
            <X className="w-8 h-8 text-darkColor dark:text-white" />
          </button>
        </div>

        <div className="p-4 h-[calc(100%-64px)] overflow-y-auto flex flex-col gap-4">
          {hotDeals.length === 0 && (
            <p className="text-gray-500 text-center mt-10">No hot deals available.</p>
          )}

          {hotDeals.map((product) => {
            const discountedPrice = (product.price * (1 - discount)).toFixed(2);
            return (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 flex flex-col">
                  <h3 className="text-sm font-medium">{product.title}</h3>
                  <div className="text-sm">
                    <span className="line-through text-gray-500 mr-2">${product.price.toFixed(2)}</span>
                    <span className="text-green-600 font-bold">${discountedPrice}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default HotDealsMenu;
