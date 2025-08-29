import { useEffect, useState } from "react";
import AddCardioWorkoutButton from "@components/workouts/AddCardioSessionButton";
import CardioWorkoutCard from "@components/workouts/CardioSessionCard";
import AddStrengthWorkoutButton from "@components/workouts/AddStrengthWorkoutButton";
import ViewAllCardioButton from "@components/workouts/ViewAllCardioButton";
import ViewAllStrengthButton from "@components/workouts/ViewAllStrengthButton";
import StrengthWorkoutCard from "@components/workouts/StrengthWorkoutCard";
import api from "../../services/api";
import { type CardioWorkout, type StrengthWorkout } from "src/types/workout";

export default function Workouts() {
  const [selectedTab, setSelectedTab] = useState<"cardio" | "strength">("cardio");
  const [cardioWorkouts, setCardioWorkouts] = useState<CardioWorkout[]>([]);
  const [strengthWorkouts, setStrengthWorkouts] = useState<StrengthWorkout[]>([]);

  const fetchCardioWorkouts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.post("/workouts/getLastCardioSessions", { user_id: user.id });
      setCardioWorkouts(res.data);
    } catch (err) {
      console.error("Error fetching cardio workouts:", err);
    }
  };

  const fetchStrengthWorkouts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.post("/workouts/getLastStrengtSessions", { user_id: user.id });
      setStrengthWorkouts(res.data);
    } catch (err) {
      console.error("Error fetching strength workouts:", err);
    }
  };

  useEffect(() => {
    if (selectedTab === "cardio") {
      fetchCardioWorkouts();
    } else {
      fetchStrengthWorkouts();
    }
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-fit-pale p-6 text-fit-dark">
      <h1 className="text-3xl font-bold mb-6">Workout Sessions</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedTab === "cardio" ? "bg-teal-800 text-white" : "bg-gray-100 text-text"
          }`}
          onClick={() => setSelectedTab("cardio")}
        >
          Cardio
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            selectedTab === "strength" ? "bg-teal-800 text-white" : "bg-gray-100 text-text"
          }`}
          onClick={() => setSelectedTab("strength")}
        >
          Strength
        </button>
      </div>

      {/* Cardio Content */}
      {selectedTab === "cardio" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Last Cardio Sessions</h2>
          {cardioWorkouts.length === 0 ? (
            <p className="text-text/70 mb-4">You haven't logged any cardio sessions yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {cardioWorkouts.map((workout) => (
                <CardioWorkoutCard key={workout.id} workout={workout} onUpdate={fetchCardioWorkouts} />
              ))}
            </div>
          )}
          <ViewAllCardioButton />
          <br />
          <AddCardioWorkoutButton onAdd={fetchCardioWorkouts} />
        </div>
      )}

      {/* Strength Content */}
      {selectedTab === "strength" && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Last Strength Sessions</h2>
          {strengthWorkouts.length === 0 ? (
            <p className="text-text/70 mb-4">You haven't logged any strength workouts yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {strengthWorkouts.map((workout) => (
                <StrengthWorkoutCard key={workout.id} workout={workout} onUpdate={fetchStrengthWorkouts}/>
              ))}
            </div>
          )}
          <ViewAllStrengthButton />
          <br />
          <AddStrengthWorkoutButton onAdd={fetchStrengthWorkouts} />
        </div>
      )}
    </div>
  );
}
