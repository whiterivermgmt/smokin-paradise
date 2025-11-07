// app/api/springbig/customers/route.ts
import { NextResponse } from "next/server";
import { sbFetch } from "@/lib/clients/springbig";

/**
 * GET /api/springbig/customers
 * Fetches a list of customers from SpringBig.
 *
 * Returns a structured JSON response with status, ok flag, and data.
 */
export async function GET(req: Request) {
  try {
    // Example: you can add query params from the request if needed
    // const urlParams = new URL(req.url).searchParams;
    // const page = urlParams.get("page") || "1";

    const response = await sbFetch("/v1/customers"); // Fetch from SpringBig
    if (!response.ok) {
      console.error("🚨 SpringBig returned an error:", response);
      return NextResponse.json(
        { error: "Failed to fetch customers from SpringBig", details: response.data },
        { status: response.status }
      );
    }

    // Success
    return NextResponse.json({
      status: response.status,
      ok: true,
      customers: response.data,
    });
  } catch (err: any) {
    // Catch network or unexpected errors
    console.error("❌ Error fetching SpringBig customers:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error fetching customers" },
      { status: 500 }
    );
  }
}
