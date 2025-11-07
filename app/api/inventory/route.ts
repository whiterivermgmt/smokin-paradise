// app/api/inventory/route.ts
import { NextResponse } from "next/server";
import { covaFetch } from "@/lib/clients/cova";

interface Product {
  Id: string;
  Name: string;
  Sku?: string;
  Upc?: string;
  Price?: number;
  AvailableQuantity?: number;
  // Add more fields as needed based on Cova response
}

export async function GET() {
  try {
    const companyId = process.env.COMPANY_ID;
    const locationId = process.env.LOCATION_ID;

    if (!companyId) throw new Error("COMPANY_ID env variable is missing");
    if (!locationId) throw new Error("LOCATION_ID env variable is missing");

    const allProducts: Product[] = [];
    let skip = 0;
    const top = 500; // max per request

    const baseBody = {
      LocationId: locationId,
      IncludeProductSkusAndUpcs: false,
      IncludeProductSpecifications: true,
      IncludeClassifications: false,
      IncludeProductAssets: false,
      IncludeAvailability: true,
      IncludePackageDetails: false,
      IncludePricing: true,
      IncludeTaxes: false,
      IncludeAllLifecycles: false,
      InStockOnly: true,
      SellingRoomOnly: true,
    };

    let hasMore = true;

    while (hasMore) {
      const body = { ...baseBody, Skip: skip, Top: top };

      const response = await covaFetch(
        `/dataplatform/v1/Companies/${companyId}/DetailedProductData`,
        { method: "POST", body }
      );

      const products: Product[] = response.value || response.Items || [];

      if (!products.length) break; // stop if no products returned

      allProducts.push(...products);

      // Logging page info
      console.debug(`Fetched ${products.length} products (skip: ${skip})`);

      if (products.length < top) {
        hasMore = false;
      } else {
        skip += top;
      }
    }

    console.info(`Total products fetched: ${allProducts.length}`);

    return NextResponse.json({ success: true, inventory: allProducts });
  } catch (err: any) {
    console.error("Cova inventory fetch failed:", err);
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}
