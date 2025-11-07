"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@/lib/products";

// Each cart item stores product info + quantity + price
export type CartItem = Product & {
  quantity: number;
  price: number; // discounted price or regular
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem } // updated to CartItem
  | { type: "REMOVE_ITEM"; payload: string } // product id
  | { type: "INCREASE_QTY"; payload: string }
  | { type: "DECREASE_QTY"; payload: string }
  | { type: "CLEAR_CART" };

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        // Increase quantity if already in cart
        return {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity } // add quantity
              : item
          ),
        };
      }
      return { items: [...state.items, action.payload] }; // already includes quantity and price
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter(item => item.id !== action.payload) };
    case "INCREASE_QTY":
      return {
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QTY":
      return {
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0), // remove if quantity 0
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for easy access
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
