'use client';

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { state } = useCart();

  const [ageVerified, setAgeVerified] = useState(false);
  const [birthDate, setBirthDate] = useState("");

  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "store">("delivery");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const allFieldsFilled =
    deliveryOption === "delivery"
      ? Object.values(shippingInfo).every((val) => val.trim() !== "")
      : shippingInfo.name.trim() !== "" && shippingInfo.email.trim() !== "";

  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shippingFee = deliveryOption === "store" ? 0 : 11.99;
  const total = subtotal + tax + shippingFee;

  const verifyAge = () => {
    if (!birthDate) return alert("Please enter your birthdate.");
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    if (age >= 21) setAgeVerified(true);
    else alert("You must be 21 or older to proceed.");
  };

  return (
    <>
      {!ageVerified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-xl p-8 max-w-lg mx-4 text-center shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold text-black mb-4">Age Verification Required</h2>
            <p className="text-gray-700 mb-6">
              You must be 21 years or older to complete this purchase.
            </p>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mb-4 w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={verifyAge}
                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
              >
                Verify Age
              </button>
            </div>
          </div>
        </div>
      )}

      {ageVerified && (
        <section className="max-w-7xl mx-auto px-6 py-12 bg-white">
          <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Delivery Details */}
            <div>
              <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-black">Delivery Details</h2>

                {/* Delivery Toggle */}
                <div className="flex gap-6">
                  {["delivery", "store"].map((option) => (
                    <label key={option} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value={option}
                        checked={deliveryOption === option}
                        onChange={() => setDeliveryOption(option as "delivery" | "store")}
                        className="peer hidden"
                      />
                      <div className="p-4 border rounded-lg peer-checked:border-orange-500 hover:border-orange-300 transition flex items-center justify-center gap-2">
                        <span className="text-black font-medium capitalize">
                          {option === "delivery" ? "Delivery" : "Store Pickup"}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Delivery Form */}
                {deliveryOption === "delivery" && (
                  <div className="grid gap-4 mt-4">
                    {["name", "email", "address", "city", "state", "zip"].map((field) => (
                      <input
                        key={field}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={shippingInfo[field as keyof typeof shippingInfo]}
                        onChange={handleChange}
                        className="checkout-input"
                      />
                    ))}
                  </div>
                )}

                {/* Store Pickup */}
                {deliveryOption === "store" && (
                  <div className="space-y-4 mt-4">
                    <p className="font-medium text-black">Pickup Location:</p>
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <p className="font-semibold">Smokin' Paradise</p>
                      <p>3078 John A Williams Blvd, Bedford IN</p>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={shippingInfo.name}
                      onChange={handleChange}
                      className="checkout-input"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={shippingInfo.email}
                      onChange={handleChange}
                      className="checkout-input"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white shadow-lg rounded-xl p-8 sticky top-24 space-y-6">
                <h2 className="text-2xl font-semibold text-black">Order Summary</h2>
                {state.items.length === 0 ? (
                  <p className="text-sm text-gray-500">Your cart is empty</p>
                ) : (
                  <div className="space-y-3 text-black">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.title} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3 mt-3">
                  <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>${shippingFee.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between pt-3 border-t font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>

                <button
                  className={`w-full mt-4 py-3 font-semibold rounded-xl transition ${
                    allFieldsFilled ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!allFieldsFilled}
                >
                  Proceed to Checkout
                </button>

                {!allFieldsFilled && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Please fill out all required fields to continue
                  </p>
                )}
              </div>
            </div>
          </div>

          <style jsx>{`
            .checkout-input {
              @apply block w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-black
                focus:ring-2 focus:ring-orange-500 focus:border-orange-500;
            }
          `}</style>
        </section>
      )}
    </>
  );
}
