import { useState } from "react";
import api from "../../services/api";

type Props = {
  onAdd: () => void;
};

export default function AddGoalButton({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!goalName || !endDate) {
      return setError("Please fill out all fields.");
    }

    const today = new Date().toISOString().split("T")[0];
    if (endDate < today) {
      return setError("End date cannot be in the past.");
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const user_id = user?.id;

      if (!user_id) {
        return setError("User not found.");
      }

      await api.post("/goals/add", {
        user_id,
        name: goalName,
        end_date: endDate,
      });

      
      onAdd();

      setIsOpen(false);
      setGoalName("");
      setEndDate("");
    } catch (err: any) {
      console.error("Error adding goal:", err);
      setError("Failed to add goal.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-6 py-2 rounded-lg bg-teal-800 hover:bg-teal-950 transition"
      >
        + Add Goal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-text">New Goal</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Goal Name</label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Run 5km in under 30 min"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

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
                  className="px-4 py-2 bg-primary text-white rounded-lg bg-teal-800 hover:bg-teal-950"
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
