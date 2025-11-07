"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { state } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (state.items.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/vector/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: state.items }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Payment failed");

      // Success! Redirect to success page or show confirmation
      window.location.href = data.redirectUrl; // Vector might return a payment URL
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        onClick={handlePayment}
        disabled={state.items.length === 0 || loading}
        className={`w-full py-3 text-white font-semibold rounded-xl transition ${
          state.items.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        title={state.items.length === 0 ? "Add items to cart to proceed" : ""}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}
