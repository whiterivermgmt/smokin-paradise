"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, updateProfile } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

export default function EditProfileModal() {
  const router = useRouter();
  const { data: session, refresh } = useSession();
  const [animate, setAnimate] = useState(false);

  // --- Form state ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    orderConfirmation: true,
    orderStatusChanged: false,
    orderDelivery: true,
    emailUpdates: true,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Animate modal
  useEffect(() => setAnimate(true), []);

  // Sync form state when session changes
  useEffect(() => {
    if (!session) return;
    setName(session.name || "");
    setEmail(session.email || "");
    setPhone(session.phone || "");
    setNotifications(session.notifications || {
      orderConfirmation: true,
      orderStatusChanged: false,
      orderDelivery: true,
      emailUpdates: true,
    });
  }, [session]);

  if (!session) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (newPassword && newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    try {
      await updateProfile({
        name,
        email,
        phone,
        currentPassword,
        newPassword,
        notifications,
      });

      refresh(); // update session immediately
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => router.push("/profile"), 1500);
    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = async (key: string) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);

    try {
      await updateProfile({ notifications: updated });
      refresh(); // update session immediately
    } catch (err) {
      console.error("Failed to update notification:", err);
    }
  };

  const renderPasswordField = (
    label: string,
    value: string,
    setValue: (v: string) => void,
    show: boolean,
    toggleShow: () => void
  ) => (
    <div className="flex items-center space-x-3">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={label}
        className="flex-1 block w-full rounded-2xl bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm transition"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 dark:hover:text-white"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4">
      <div
        className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg p-8 space-y-6 transform opacity-0 translate-y-8 transition-all duration-500 ${
          animate ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Edit Profile
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Profile updated!</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name, Email, Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-2xl bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-2xl bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-200">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full rounded-2xl bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm transition"
            />
          </div>

          {/* Password fields */}
          {renderPasswordField("Current Password", currentPassword, setCurrentPassword, showCurrent, () => setShowCurrent(!showCurrent))}
          {renderPasswordField("New Password", newPassword, setNewPassword, showNew, () => setShowNew(!showNew))}
          {renderPasswordField("Confirm Password", confirmPassword, setConfirmPassword, showConfirm, () => setShowConfirm(!showConfirm))}

          {/* Notifications */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-gray-200">Notifications</h3>
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize text-gray-700 dark:text-gray-300">{key.replace(/([A-Z])/g, " $1")}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleNotificationToggle(key)}
                  className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl px-4 py-3 shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-2xl px-4 py-3 shadow-md hover:shadow-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
