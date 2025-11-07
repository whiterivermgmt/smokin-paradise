// lib/server-utils.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma"; // <- named import

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Extract token from Authorization header
export function getTokenFromRequest(req: Request | NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
}

// Get user from token
export async function getUserFromToken(token: string) {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    return user;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
