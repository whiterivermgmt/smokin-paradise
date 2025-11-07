interface AccountPanelProps {
  name: string;
  email: string;
  onEdit: () => void;
}

export default function AccountPanel({ name, email, onEdit }: AccountPanelProps) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Info</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Name
          </label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{name}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>
          <p className="mt-1 text-gray-900 dark:text-gray-100">{email}</p>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
      >
        Edit Profile
      </button>
    </section>
  );
}
