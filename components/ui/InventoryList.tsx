// Example: app/components/InventoryList.tsx
"use client";
import { useEffect, useState } from "react";

export default function InventoryList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/cova/inventory")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.inventory || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading inventory...</p>;
  return (
    <ul>
      {items.map((item: any) => (
        <li key={item.id}>
          {item.name} — {item.quantity} in stock
        </li>
      ))}
    </ul>
  );
}
