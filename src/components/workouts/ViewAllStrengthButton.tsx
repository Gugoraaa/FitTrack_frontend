import { useState } from "react";
import api from "../../services/api";
import StrengthWorkoutCard from "./StrengthWorkoutCard";


export default function ViewAllStrengthButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [workouts, setWorkouts] = useState<StrengthWorkout[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllStrengthSessions = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.post("/workouts/getStrengthWorkout", {
        user_id: user.id,
      });
      setWorkouts(res.data);
    } catch (err) {
      console.error("Error fetching strength workouts:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    fetchAllStrengthSessions();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-teal-800 underline hover:text-teal-950 text-sm mb-4"
      >
        View All
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 border border-gray-200 relative">
            <h2 className="text-xl font-semibold mb-4 text-text">
              All Strength Sessions
            </h2>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            {loading ? (
              <p className="text-center text-text/60">Loading...</p>
            ) : workouts.length === 0 ? (
              <p className="text-text/70">No strength workouts found.</p>
            ) : (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <StrengthWorkoutCard
                    key={workout.id}
                    workout={workout}
                    onUpdate={fetchAllStrengthSessions}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
