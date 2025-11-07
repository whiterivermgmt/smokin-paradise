"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { User } from "lucide-react";

export default function HeaderAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => router.push("/signin");
  const handleProfileClick = () => {
    router.push("/profile");
    setDropdownOpen(false);
  };
  const handleLogoutClick = () => {
    signOut();
    setDropdownOpen(false);
  };

  const hoverColor = "hover:text-orange-500"; // exact social icon hover

  // If not signed in
  if (!session) {
    return (
      <button
        onClick={handleLoginClick}
        className={`p-2 rounded-full text-white ${hoverColor} transition-colors duration-200`}
        aria-label="Login"
      >
        <User className="w-5 h-5" />
      </button>
    );
  }

  // If signed in
  const userInitial = session.name ? session.name[0].toUpperCase() : "U";

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold ${hoverColor} transition-colors duration-200`}
      >
        {userInitial}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 flex flex-col">
          <button
            onClick={handleProfileClick}
            className="text-sm text-gray-800 px-4 py-2 hover:bg-gray-100 text-left"
          >
            Profile
          </button>
          <button
            onClick={handleLogoutClick}
            className="text-sm text-gray-800 px-4 py-2 hover:bg-gray-100 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
