import { NextResponse } from "next/server";
import { sbFetch } from "@/lib/springbig"; // your existing helper

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    // Split name into first/last
    const [first_name, ...rest] = name?.split(" ") || [""];
    const last_name = rest.join(" ") || "";

    const body = {
      first_name,
      last_name,
      email,
      phone: phone || "",
    };

    const res = await sbFetch("/customers", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("SpringBig create error:", data);
      return NextResponse.json(
        { error: data.error || "Failed to create SpringBig customer" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Customer created successfully",
      data,
    });
  } catch (error: any) {
    console.error("Create SpringBig Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
