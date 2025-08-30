import { useEffect, useState } from "react";
import api from "../../services/api";
import CardioSessionCard from "@components/workouts/CardioSessionCard";
import StrengthWorkoutCard from "@components/workouts/StrengthWorkoutCard";
import GoalCard from "@components/goals/GoalCard";





type LatestSession = CardioWorkout | StrengthWorkout | null;

export default function Summary() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [lastSession, setLastSession] = useState<LatestSession>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<"cardio" | "strength" | null>(
    null
  );
  const [goal, setGoal] = useState();

  const fetchLastSession = async () => {
    try {
      setError(null);
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = u?.id;
      if (!userId) return;

      const res = await api.get(`/summary/getLastSession/${userId}`);

      setLastSession(res?.data?.latest ?? null);
      setSessionType(res?.data?.type ?? null);
    } catch (e) {
      console.error(e);
      setError("Could not load last session.");
      setLastSession(null);
      setSessionType(null);
    }
  };

  const fetchGetGoal = async () => {
    try {
      setError(null);
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = u?.id;
      if (!userId) return;

      const res = await api.get(`/summary/getLastGoal/${userId}`);
      setGoal(res.data);
    } catch (e) {
      console.error(e);
      setError("Could not load last session.");
      setLastSession(null);
      setSessionType(null);
    }
  };

  useEffect(() => {
    fetchLastSession();
    fetchGetGoal();
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-fit-dark">
          {user ? `Welcome back, ${user.username}` : "Welcome"}
        </h1>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {!error && lastSession === null && (
          <p className="mt-4 text-fit-dark/70">No sessions yet.</p>
        )}

        {!error && sessionType === "cardio" && lastSession && (
          <>
            <h2 className="mt-4 font-semibold">Last Session: Cardio</h2>
            {/* narrow to CardioSession for TS */}
            <CardioSessionCard workout={lastSession as CardioWorkout} />
          </>
        )}

        {!error && sessionType === "strength" && lastSession && (
          <>
            <h2 className="mt-4 font-semibold">Última sesión: Fuerza</h2>
            <StrengthWorkoutCard workout={lastSession as StrengthWorkout} />
          </>
        )}
      </div>

      {!error && goal != undefined && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <GoalCard goal={goal} />
        </div>
      )}
    </>
  );
}
