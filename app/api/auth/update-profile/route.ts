// app/api/auth/update-profile/route.ts
import { NextResponse } from "next/server";
import argon2 from "argon2"; // alternative to bcrypt
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest } from "@/lib/server-utils";

type ResponseUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  notifications: Record<string, any>;
};

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, currentPassword, newPassword, notifications } = body;

    // Get user ID from JWT
    const token = getTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    const userId = payload.userId;

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        passwordHash: true,
        notifications: true,
      },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Prepare update object dynamically
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (notifications !== undefined) updateData.notifications = notifications;

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password required" }, { status: 400 });
      }

      const isValid = await argon2.verify(user.passwordHash, currentPassword);
      if (!isValid) {
        return NextResponse.json({ error: "Current password incorrect" }, { status: 400 });
      }

      const hashedPassword = await argon2.hash(newPassword);
      updateData.passwordHash = hashedPassword;
    }

    // Update user in DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        notifications: true,
      },
    });

    // Build TypeScript-safe response
    const responseUser: ResponseUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone ?? null,
      notifications: (updatedUser.notifications as Record<string, any>) ?? {},
    };

    return NextResponse.json({ updatedUser: responseUser });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Update failed" }, { status: 400 });
  }
}
