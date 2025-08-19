import DeleteCardioButton from "./DeleteCardioButton";

type CardioWorkout = {
  id: number;
  user_id: number;
  title: string;
  kilometers: number;
  minutes: number;
  created_at: string;
};

type Props = {
  workout: CardioWorkout;
  onUpdate?: () => void;
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US"); // MM/DD/YYYY
}

export default function CardioSessionCard({ workout,onUpdate }: Props) {
  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-2 text-text">{workout.title}</h3>
      <p className="text-sm text-text/80 mb-1">
        Distance: <span className="font-medium">{workout.kilometers} km</span>
      </p>
      <p className="text-sm text-text/80 mb-1">
        Time: <span className="font-medium">{workout.minutes} min</span>
      </p>
      <p className="text-sm text-text/80">
        Date: <span className="font-medium">{formatDate(workout.created_at)}</span>
      </p>
    <div className="mt-4 text-right space-x-2">
            <DeleteCardioButton workoutID={workout.id} onDelete={onUpdate} />
    </div>
    </div>
    </>
  );
}
