import { useState } from "react";
import api from "../../services/api";

interface Props {
  username: string;
  createdAt: string;
  userId: number;
  onUsernameChange: (newUsername: string) => void;
}

export default function UserInfoCard({ username, createdAt, userId, onUsernameChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [loading, setLoading] = useState(false);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleUpdate = async () => {
    if (!newUsername.trim()) return;
    try {
      setLoading(true);
      await api.put("/profile/updateUsername", {
        userId,
        newUsername,
      });
      onUsernameChange(newUsername);
      setEditing(false);
    } catch (err) {
      console.error("Error updating username:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewUsername(username);
    setEditing(false);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-2/3 lg:w-1/2 max-w-xl mx-auto text-center">
      <img
        src="/panda.png"
        alt="User Avatar"
        className="w-28 h-28 rounded-full mx-auto mb-6"
      />

      {editing ? (
        <div className="flex flex-col items-center gap-4">
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-900"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">{username}</h2>
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-teal-700 underline mb-4"
          >
            Edit username
          </button>
        </>
      )}

      <p className="text-sm text-gray-500">Joined: {formattedDate}</p>
    </div>
  );
}
