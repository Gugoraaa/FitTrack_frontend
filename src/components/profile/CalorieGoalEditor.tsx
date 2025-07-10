import { useState } from "react";
import api from "../../services/api";

interface Props {
  calorieGoal: number;
  onUpdate: (goal: number) => void;
}

export default function CalorieGoalEditor({ calorieGoal, onUpdate }: Props) {
  const [goal, setGoal] = useState<string>(String(calorieGoal));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (goal === "") return; // prevent empty submission
    const parsedGoal = Number(goal);

    if (Number.isNaN(parsedGoal) || parsedGoal < 0) return;

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      await api.put("/profile/updateCalorieGoal", {
        userId: user.id,
        newGoal: parsedGoal,
      });

      onUpdate(parsedGoal);
    } catch (err) {
      console.error("Error updating goal:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 w-full md:w-1/2">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">Daily Calorie Goal</h2>
      <div className="flex items-center gap-4">
        <input
          type="text"
          inputMode="numeric"
          value={goal}
          onChange={(e) => {
            const val = e.target.value;

            
            if (val === "") {
              setGoal(val);
              return;
            }

            const number = Number(val);
            if (!Number.isNaN(number) && number >= 0) {
              setGoal(val);
            }
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-32"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-teal-800 hover:bg-teal-950 text-white px-4 py-2 rounded-lg shadow"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
