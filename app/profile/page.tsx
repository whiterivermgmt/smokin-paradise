"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut, updateProfile } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

// EditAddressModal stays the same
function EditAddressModal({
  currentAddress,
  currentPhone,
  onClose,
  onSave,
}: {
  currentAddress: string;
  currentPhone: string;
  onClose: () => void;
  onSave: (newAddress: string, newPhone: string) => void;
}) {
  const [address, setAddress] = useState(currentAddress);
  const [phone, setPhone] = useState(currentPhone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateProfile({ address, phone });
      onSave(address, phone);
      onClose();
    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Edit Profile
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, State"
          className="block w-full rounded-2xl bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm transition"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="555-123-4567"
          className="block w-full rounded-2xl bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm transition"
        />
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl px-4 py-3 shadow-md hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-2xl px-4 py-3 shadow-md hover:shadow-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editAddressOpen, setEditAddressOpen] = useState(false);

  // SpringBig loyalty info
  const [loyaltyPoints, setLoyaltyPoints] = useState<number | null>(null);
  const [rewards, setRewards] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [springBigName, setSpringBigName] = useState<string | null>(null);
  const [sbLoading, setSbLoading] = useState(true);
  const [sbError, setSbError] = useState<string | null>(null);
  const [sbRegistered, setSbRegistered] = useState(false);

  // Initialize profile info from session
  useEffect(() => {
    if (session) {
      setAddress(session.address || "");
      setPhone(session.phone || "");
      setName(session.name || "");
      setEmail(session.email || "");
    }
  }, [session]);

  // Redirect if not signed in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  // Fetch SpringBig data for current email
  async function fetchSpringBigData(emailToFetch?: string) {
    setSbLoading(true);
    setSbError(null);
    try {
      const targetEmail = emailToFetch || (session as any)?.email;
      if (!targetEmail) {
        setSbRegistered(false);
        return;
      }
      const res = await fetch(`/api/springbig/customers?email=${encodeURIComponent(targetEmail)}`);
      const json = await res.json();

      if (res.status === 404 || json?.found === false) {
        setSbRegistered(false);
        setSpringBigName(null);
        setLoyaltyPoints(null);
        setRewards([]);
        setPromos([]);
      } else if (json?.error) {
        setSbError(json.error);
        setSbRegistered(false);
      } else {
        setSpringBigName(json.name || (json.customer && json.customer.name) || null);
        setLoyaltyPoints(json.points ?? null);
        setRewards(json.rewards ?? []);
        setPromos(json.promos ?? []);
        setSbRegistered(true);
      }
    } catch (err: any) {
      setSbError(err.message || "Failed to fetch SpringBig data");
      setSbRegistered(false);
    } finally {
      setSbLoading(false);
    }
  }

  // Initial load + re-fetch when session email changes
  useEffect(() => {
    if ((session as any)?.email) {
      fetchSpringBigData((session as any).email);
    } else {
      setSbLoading(false);
    }
  }, [session]);

  // Join SpringBig rewards
  async function joinRewards() {
    setSbLoading(true);
    setSbError(null);
    try {
      const payload = { name, email, phone, address };
      const res = await fetch("/api/springbig/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok && !json.error) {
        await fetchSpringBigData(email);
      } else {
        throw new Error(json.error || "Failed to join rewards");
      }
    } catch (err: any) {
      setSbError(err.message || "Failed to join rewards");
    } finally {
      setSbLoading(false);
    }
  }

  if (isPending || !session)
    return <p className="text-center mt-8 text-gray-700 dark:text-gray-200">Loading...</p>;

  const createdAt = (session as any).createdAt;
  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : "N/A";

  const bubbleClass = "bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700";

  return (
    <main className="flex-1 p-4 sm:p-8 space-y-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Welcome */}
      <div className={`${bubbleClass} text-center`}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {name || "User"}!</h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">Manage your account, orders, and rewards from here.</p>
      </div>

      {/* Account Info */}
      <div className={bubbleClass}>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wide">Full Name</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{name || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <EnvelopeIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wide">Email</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{email || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wide">Phone</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{phone || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <CalendarIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wide">Member Since</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{memberSince}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button onClick={() => router.push("/profile/edit")} className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition">
            Edit Profile
          </button>
          <button onClick={signOut} className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition">
            Sign Out
          </button>
        </div>
      </div>

      {/* Address */}
      <div className={bubbleClass}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wide">Address</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{address || "Not set"}</p>
          </div>
          <button onClick={() => setEditAddressOpen(true)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
            Edit
          </button>
        </div>
      </div>

      {editAddressOpen && (
        <EditAddressModal
          currentAddress={address}
          currentPhone={phone}
          onClose={() => setEditAddressOpen(false)}
          onSave={(newAddress, newPhone) => {
            setAddress(newAddress);
            setPhone(newPhone);
            if (email) fetchSpringBigData(email);
          }}
        />
      )}

      {/* Recent Orders */}
      <div className={bubbleClass}>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        <p className="text-gray-500 dark:text-gray-400">You have no recent orders.</p>
      </div>

      {/* Loyalty & Rewards */}
      <div className={bubbleClass}>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <GiftIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          <span>Loyalty & Rewards</span>
        </h2>

        {sbLoading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}

        {!sbLoading && sbError && (
          <div className="text-center space-y-3">
            <p className="text-red-500">{sbError}</p>
            <button
              onClick={joinRewards}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition"
            >
              Join Rewards Now
            </button>
          </div>
        )}

        {!sbLoading && !sbError && (
          <>
            <p className="text-gray-500 dark:text-gray-400">
              You currently have <span className="font-semibold">{loyaltyPoints ?? 0}</span> points.
            </p>

            {rewards.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {rewards.map((r: any) => (
                  <li key={r.id} className="text-gray-700 dark:text-gray-300">
                    {r.name} - {r.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 mt-1">No active rewards.</p>
            )}

            {promos.length > 0 && (
              <div className="mt-3">
                <p className="text-gray-500 dark:text-gray-400 font-semibold">Available Promotions:</p>
                <ul className="space-y-1">
                  {promos.map((p: any) => (
                    <li key={p.id} className="text-gray-700 dark:text-gray-300">
                      {p.name} - {p.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
