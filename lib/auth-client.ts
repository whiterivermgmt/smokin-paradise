"use client";

import { useState, useEffect } from "react";

export interface JWTPayload {
  userId: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  notifications?: Record<string, boolean>;
  createdAt?: string;
}

// ---- Global session state ----
let sessionData: JWTPayload | null = null;
let subscribers: ((data: JWTPayload | null) => void)[] = [];

function notify() {
  subscribers.forEach((callback) => callback(sessionData));
}

// ---- Hook to use session ----
export function useSession() {
  const [data, setData] = useState<JWTPayload | null>(sessionData);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload: JWTPayload = JSON.parse(atob(token.split(".")[1]));
        sessionData = payload;
      } catch {
        sessionData = null;
      }
    }

    setData(sessionData);
    setIsPending(false);

    const callback = (newData: JWTPayload | null) => setData(newData);
    subscribers.push(callback);

    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  }, []);

  // Allows components to manually refresh session data
  const refresh = () => setData(sessionData);

  return { data, isPending, refresh };
}

// ---- Sign out ----
export function signOut() {
  localStorage.removeItem("token");
  sessionData = null;
  notify();
  window.location.href = "/signin";
}

// ---- Sign in ----
export async function signIn(email: string, password: string) {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");

  localStorage.setItem("token", data.token);

  try {
    const payload: JWTPayload = JSON.parse(atob(data.token.split(".")[1]));
    sessionData = payload;
    notify();
  } catch {
    sessionData = null;
  }

  return data;
}

// ---- Sign up ----
export async function signUp(name: string, email: string, password: string) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Sign-Up failed");

  localStorage.setItem("token", data.token);

  try {
    const payload: JWTPayload = JSON.parse(atob(data.token.split(".")[1]));
    sessionData = payload;
    notify();
  } catch {
    sessionData = null;
  }

  return data;
}

// ---- Update Profile ----
export async function updateProfile(params: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  currentPassword?: string;
  newPassword?: string;
  notifications?: Record<string, boolean>;
}) {
  if (!sessionData) throw new Error("No active session");

  const res = await fetch("/api/auth/update-profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(params),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!res.ok) throw new Error(data.error || "Profile update failed");

  // Merge updated user data into session and notify subscribers
  sessionData = { ...sessionData, ...data.updatedUser };
  notify();

  return data;
}
