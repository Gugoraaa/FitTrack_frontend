import { useState } from "react";
import api from "../../services/api";

type Props = {
  onAdd: () => void;
};

export default function AddCardioWorkoutButton({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [distance, setDistance] = useState(""); // <-- string
  const [time, setTime] = useState("");         // <-- string
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsedDistance = parseFloat(distance);
    const parsedTime = parseInt(time);

    if (!title || isNaN(parsedDistance) || parsedDistance <= 0 || isNaN(parsedTime) || parsedTime <= 0) {
      return setError("All fields must be filled and greater than 0.");
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const user_id = user?.id;
      if (!user_id) return setError("User not found.");

      await api.post("/workouts/addCardioSession", {
        user_id,
        title,
        kilometers: parsedDistance,
        minutes: parsedTime,
      });

      // Reset
      setTitle("");
      setDistance("");
      setTime("");
      setIsOpen(false);
      onAdd();
    } catch (err) {
      console.error("Add cardio workout error:", err);
      setError("Failed to add workout.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-950 transition"
      >
        + Add Cardio Session
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-text">New Cardio Session</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Distance (km)</label>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time (minutes)</label>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-800 text-white rounded-lg hover:bg-teal-950"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
