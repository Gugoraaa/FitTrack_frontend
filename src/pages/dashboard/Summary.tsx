import { useEffect, useState } from "react";
import api from "../../services/api";
import CardioSessionCard from "@components/workouts/CardioSessionCard";
import StrengthWorkoutCard from "@components/workouts/StrengthWorkoutCard";

type CardioSession = {
  id: number;
  user_id: number;
  title: string;
  kilometers: number;
  minutes: number;
  created_at: string; // ISO
};

type Exercise = {
  id: number;
  name: string;
  sets: number;
  max_weight: number;
  reps: number;
};

type StrengthSession = {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  exercises: Exercise[];
};

type LatestSession = CardioSession | StrengthSession | null;

export default function Summary() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [lastSession, setLastSession] = useState<LatestSession>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<"cardio" | "strength" | null>(null);

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

  useEffect(() => {
    fetchLastSession();
  }, []);

  return (
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
          <CardioSessionCard workout={lastSession as CardioSession} />
        </>
      )}

      
      {!error && sessionType === "strength" && lastSession && (
        <>
          <h2 className="mt-4 font-semibold">Última sesión: Fuerza</h2>
          <StrengthWorkoutCard workout={lastSession as StrengthSession} />
        </>
      )}
    </div>
  );
}
