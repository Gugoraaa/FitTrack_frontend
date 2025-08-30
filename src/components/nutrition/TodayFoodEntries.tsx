import { useEffect, useState } from "react";
import api from "../../services/api";


export default function TodayFoodEntries({ reloadTrigger = 0 }: { reloadTrigger?: number }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const user_id = user?.id;
        
        const res = await api.post("/nutrition/getFoodEntriesToday", { user_id });
        if (!user_id) return;
        setEntries(res.data.entries || []);
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };

    fetchEntries();
  }, [reloadTrigger]);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs border border-gray-200 overflow-y-auto max-h-[400px]">
      <h2 className="text-lg font-semibold text-text mb-4">Today's Food Entries</h2>
      <div className="flex flex-col gap-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex justify-between items-center border rounded-md p-2">
            <span className="text-sm text-gray-700">{entry.description}</span>
            <span className="text-sm font-bold text-teal-800">{entry.calories} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
}
