import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// ----------------------
// Register a new user
// ----------------------
export async function registerUser(email: string, password: string, name?: string) {
  // Check if user exists
  const existing: User | null = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user in DB
  const user: User = await prisma.user.create({
    data: { email, passwordHash, ...(name ? { name } : {}) },
  });

  // Create JWT including name
  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name || null },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}

// ----------------------
// Login existing user
// ----------------------
export async function loginUser(email: string, password: string) {
  const user: User | null = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name || null },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
}

// ----------------------
// Optional: verify JWT
// ----------------------
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; name: string | null };
  } catch (err) {
    return null;
  }
}
