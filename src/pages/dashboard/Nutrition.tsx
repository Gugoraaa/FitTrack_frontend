import { useState } from "react";
import CalorieProgressCard from "@components/nutrition/CalorieProgressCard";
import CalorieInputForm from "@components/nutrition/CalorieInputForm";
import TodayFoodEntries from "@components/nutrition/TodayFoodEntries";

export default function NutritionView() {
  const [progressKey, setProgressKey] = useState(0);
  const [entriesKey, setEntriesKey] = useState(0);

  const handleUpdate = () => {
    setProgressKey((k) => k + 1);
    setEntriesKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen flex flex-row items-start justify-center gap-6 px-4 py-10">
      <CalorieProgressCard reloadTrigger={progressKey} />
      <CalorieInputForm onUpdate={handleUpdate} />
      <TodayFoodEntries reloadTrigger={entriesKey} />
    </div>
  );
}
