"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  category?: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await fetch("/api/cova/inventory");
        if (!res.ok) throw new Error("Failed to fetch inventory");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);

  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="inventory-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>SKU: {product.sku}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Quantity: {product.quantity}</p>
          {product.category && <p>Category: {product.category}</p>}
        </div>
      ))}
    </div>
  );
}
