import { useEffect, useState } from "react";
import AddGoalButton from "../../components/goals/AddGoalButon";
import GoalCard from "../../components/goals/GoalCard";
import api from "../../services/api";

type Goal = {
  id: number;
  name: string;
  end_date: string;
  created_at: string;
  status: string;
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.id;

      if (!userId) return;
      
      const res = await api.post("/goals/getUserGoals", { userId });
      const goalList = Array.isArray(res.data) ? res.data : res.data.goals;
      setGoals(goalList);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="min-h-screen bg-fit-pale p-6 text-fit-dark">
      <h1 className="text-3xl font-bold mb-6">Your Goals</h1>

      <div className="mb-4">
        <AddGoalButton onAdd={fetchGoals} />
      </div>

      {goals.length === 0 ? (
        <p className="text-fit-dark/70">You haven't added any goals yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onUpdate={fetchGoals} />
          ))}
        </div>
      )}
    </div>
  );
}
