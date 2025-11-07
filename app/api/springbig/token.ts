// app/api/auth/springbig/token.ts
import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry: number = 0; // UNIX timestamp in milliseconds

export async function GET() {
  const now = Date.now();

  // Return cached token if still valid
  if (cachedToken && now < tokenExpiry) {
    return NextResponse.json({ access_token: cachedToken, cached: true });
  }

  const client_id = process.env.SB_CLIENT_ID;
  const client_secret = process.env.SB_CLIENT_SECRET;

  try {
    const response = await fetch("https://api.springbig.io/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();

    // Cache token and expiry
    cachedToken = data.access_token;
    // Subtract 60 seconds to refresh slightly before it expires
    tokenExpiry = now + (data.expires_in - 60) * 1000;

    return NextResponse.json({ access_token: cachedToken, cached: false });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
  }
}
