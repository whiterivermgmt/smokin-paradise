import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const { user, token } = await loginUser(email, password);
    return NextResponse.json({ user, token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
