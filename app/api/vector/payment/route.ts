import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: "No items in cart" }, { status: 400 });
    }

    // Example: Build your payload for Vector API
    const vectorPayload = {
      order: {
        items: items.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        currency: "USD",
        total: items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0),
      },
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    };

    // Call Vector API
    const vectorRes = await fetch("https://api.vector.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VECTOR_API_KEY}`,
      },
      body: JSON.stringify(vectorPayload),
    });

    const vectorData = await vectorRes.json();

    if (!vectorRes.ok) {
      return NextResponse.json(
        { message: vectorData.message || "Vector payment failed" },
        { status: vectorRes.status }
      );
    }

    // Return the redirect URL from Vector
    return NextResponse.json({ redirectUrl: vectorData.checkoutUrl });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}
