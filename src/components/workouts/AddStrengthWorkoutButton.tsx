import { useState } from "react";
import api from "../../services/api";




type Props = {
  onAdd: () => void;
};

export default function AddStrengthWorkoutButton({ onAdd }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState<NoTypeExercise[]>([
    { name: "", sets: "", maxWeight: "", reps: "" },
  ]);
  const [error, setError] = useState("");

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: "", maxWeight: "", reps: "" }]);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleChange = <K extends keyof NoTypeExercise>(
    index: number,
    field: K,
    value: NoTypeExercise[K]
  ) => {
    const updated = [...exercises];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setExercises(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const user_id = user?.id;
    if (!user_id) return setError("User not found.");

    // Validación final
    for (const ex of exercises) {
      if (
        ex.name.trim() === "" ||
        ex.sets === "" ||
        ex.maxWeight === "" ||
        ex.reps === "" ||
        ex.sets <= 0 ||
        ex.maxWeight <= 0 ||
        ex.reps <= 0
      ) {
        return setError("All numeric fields must be greater than 0.");
      }
    }

    try {
      await api.post("/workouts/addStrengthWorkout", {
        user_id,
        title,
        exercises,
      });

      setTitle("");
      setExercises([{ name: "", sets: "", maxWeight: "", reps: "" }]);
      setIsOpen(false);
      onAdd();
    } catch (err) {
      console.error("Add strength workout error:", err);
      setError("Failed to save strength workout.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-950 transition"
      >
        + Add Strength Session
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-text">
              New Strength Workout
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label className="text-sm mb-1">Workout Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full"
                  placeholder="e.g., Upper Body Day"
                  required
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
                {exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 items-end"
                  >
                    <div className="flex flex-col">
                      <label className="text-sm mb-1">Exercise Name</label>
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                        className="border rounded-lg px-4 py-2 w-full"
                        required
                      />
                    </div>

                    {(["sets", "maxWeight", "reps"] as (keyof NoTypeExercise)[]).map((field) => (
                      <div className="flex flex-col" key={field}>
                        <label className="text-sm mb-1">
                          {field === "sets"
                            ? "Sets"
                            : field === "maxWeight"
                            ? "Max Weight (kg)"
                            : "Reps"}
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={exercises[index][field] === "" ? "" : Number(exercises[index][field])}
                          onChange={(e) =>
                            handleChange(
                              index,
                              field,
                              e.target.value === "" ? "" : Math.max(0, Number(e.target.value))
                            )
                          }
                          className="border rounded-lg px-4 py-2 w-full"
                          required
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleRemoveExercise(index)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddExercise}
                className="text-teal-800 hover:underline text-sm"
              >
                + Add Exercise
              </button>

              {error && <p className="text-red-600 text-sm">{error}</p>}

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
                  className="px-4 py-2 bg-teal-800 text-white rounded-lg hover:bg-teal-950"
                >
                  Save Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
