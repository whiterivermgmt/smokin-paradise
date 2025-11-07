"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Context type
interface FavoriteContextType {
  favorites: string[];                // list of favorite product IDs
  toggleFavorite: (productId: string) => void;
}

// Create context with default empty values
const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

// Provider component
export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

// Custom hook for consuming the context
export const useFavorites = () => useContext(FavoriteContext);
