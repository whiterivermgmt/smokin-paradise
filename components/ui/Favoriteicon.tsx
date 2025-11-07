"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/app/context/FavoriteContext";

const FavoriteIcon = () => {
  const { favorites } = useFavorites();

  return (
    <Link href="/favorites" className="group relative">
      <Heart
        className="w-5 h-5 text-white hover:text-orange-500 transition-colors duration-300"
      />
      {favorites.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-paradise-orange text-black h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
          {favorites.length}
        </span>
      )}
    </Link>
  );
};

export default FavoriteIcon;
