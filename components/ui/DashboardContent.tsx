"use client";

import { useEffect, useState } from "react";

export default function DashboardContent() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch("/api/auth/springbig/customers");
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setCustomers(data);
        }
      } catch (err) {
        setError("Failed to fetch SpringBig data");
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading SpringBig data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>SpringBig Customers</h1>
      <ul>
        {customers.map((c: any) => (
          <li key={c.id}>
            {c.first_name} {c.last_name} — {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
