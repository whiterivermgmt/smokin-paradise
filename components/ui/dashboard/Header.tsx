"use client";

import { signOut } from "@/lib/auth-client";

export default function Header({ name, email }: { name: string; email: string }) {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Welcome back, {name}
      </h2>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 dark:text-gray-300">{email}</span>
        <button
          onClick={signOut}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
