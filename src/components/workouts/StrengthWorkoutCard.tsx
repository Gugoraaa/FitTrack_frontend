// src/components/workouts/StrengthWorkoutCard.tsx
import DeleteStrengthButton from "./DeleteStrengthButton";

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US"); // MM/DD/YYYY
}

type Exercise = {
  id: number;
  name: string;
  sets: number;
  max_weight: number;
  reps: number;
};

type StrengthWorkout = {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  exercises: Exercise[];
};

type Props = {
  workout: StrengthWorkout;
  onUpdate?: () => void;
};

export default function StrengthWorkoutCard({ workout, onUpdate }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-4 space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-fit-dark">{workout.title}</h3>
        <p className="text-sm text-gray-500">
          {formatDate(workout.created_at)}
        </p>
      </div>

      {/* Exercise list */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
        {workout.exercises.map((ex) => (
          <div
            key={ex.id}
            className="bg-fit-light px-4 py-2 rounded-md flex flex-col border border-gray-100"
          >
            <p className="font-medium text-fit-dark">{ex.name}</p>
            <div className="text-sm text-gray-700 flex gap-4">
              <span>Sets: {ex.sets}</span>
              <span>Reps: {ex.reps}</span>
              <span>Max Weight: {ex.max_weight} kg</span>
            </div>
          </div>
        ))}
      </div>

      
      <div className="text-right">
        <DeleteStrengthButton workoutID={workout.id} onDelete={onUpdate} />
      </div>
    </div>
  );
}
