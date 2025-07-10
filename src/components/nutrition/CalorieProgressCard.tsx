import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CalorieProgressCard({ reloadTrigger = 0 }: { reloadTrigger?: number }) {
  const [consumed, setConsumed] = useState(0);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const user_id = user?.id;
        if (!user_id) return;

        const response = await api.post("/nutrition/getCaloriesGoal", { user_id });
        setTarget(response.data.daily_calorie_goal);

        const res = await api.post("/nutrition/getTodayCalories", { user_id });
        setConsumed(res.data?.calories || 0);
      } catch (err) {
        console.error("Error fetching calories:", err);
      }
    };

    fetchCalories();
  }, [reloadTrigger]); // <--- solo recarga cuando cambia reloadTrigger

  const percentage = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
  const remaining = Math.max(target - consumed, 0);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200">
      <h2 className="text-lg font-semibold text-text mb-4">
        Daily Calorie Goal
      </h2>

      <div className="mb-2 text-sm text-gray-600">Consumed</div>
      <div className="text-2xl font-bold text-teal-800 mb-1">
        {consumed} kcal
      </div>
      <div className="text-sm text-gray-500 mb-4">Goal: {target} kcal</div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
        <div
          className="bg-teal-800 h-4 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{percentage.toFixed(1)}%</span>
        <span>{remaining} kcal remaining</span>
      </div>
    </div>
  );
}

