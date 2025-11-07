
import axios from "axios";

export async function fetchProductBySlug(slug: string) {
  try {
    const res = await axios.get(
      `${process.env.STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    const data = res.data.data[0];
    return data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}
