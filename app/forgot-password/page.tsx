// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) return setError("Email is required");

    try {
      // TODO: call backend API for forgot password
      setMessage("If an account exists, a reset link has been sent to your email.");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-orange-500">
          Forgot Your Password?
        </h1>
        <p className="text-center text-black">
          Enter your email below and we’ll send you a password reset link.
        </p>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-black">
          Remembered your password?{" "}
          <button
            onClick={() => router.push("/signin")}
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
