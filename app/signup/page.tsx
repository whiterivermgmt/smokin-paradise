"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirm-password")?.toString() || "";

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password, name);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-black">
          Create an account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mt-6 text-black hover:text-orange-500"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirm ? "text" : "password"}
                required
                minLength={8}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="mt-6 text-black hover:text-orange-500"
            >
              {showConfirm ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-md bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Create Account
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-center text-sm text-black">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/signin")}
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
