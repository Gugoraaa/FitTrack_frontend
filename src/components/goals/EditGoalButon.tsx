import { useState } from "react";
import api from "../../services/api";
import {type Goal} from "../../types/goals"

type Props = {
  goal: Goal;
  onUpdate?: () => void;
};

export default function EditGoalButton({ goal, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(goal.name);
  const [endDate, setEndDate] = useState(goal.end_date);
  const [status, setStatus] = useState(goal.status);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!name || !endDate || !status) {
    return setError("All fields are required.");
  }

  const today = new Date().toISOString().split("T")[0];
  if (endDate < today) {
    return setError("End date cannot be in the past.");
  }

  try {
    await api.post("/goals/update", {
      id: goal.id,
      name,
      end_date: endDate,
      status,
    });

    setIsOpen(false);
    onUpdate?.(); 
  } catch (err: any) {
    console.error("Edit error:", err);
    setError("Failed to update goal.");
  }
};


  return (
    <>
      <button
            onClick={() => setIsOpen(true)}
            className="bg-teal-800 text-white px-3 py-1 text-xs rounded-md hover:bg-teal-950 font-medium "
            >
            Edit
        </button>



      {isOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-text ">Edit Goal</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Goal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
