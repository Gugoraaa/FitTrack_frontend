import EditGoalButton from "./EditGoalButon";
import DeleteGoalButton from "./DeleteGoalButon";


type Props = {
  goal: Goal;
  onUpdate?: () => void;
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US"); 
}


export default function GoalCard({ goal, onUpdate }: Props) {
  return (
  
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-fit-dark mb-2">{goal.name}</h2>
        <p className="text-sm text-gray-600">End Date: {formatDate(goal.end_date)}</p>
        <p className="text-sm text-gray-600">Status: <span className="capitalize">{goal.status}</span></p>
      </div>

      <div className="mt-4 text-right space-x-2">
        <EditGoalButton goal={goal} onUpdate={onUpdate} />
        <DeleteGoalButton goalId={goal.id} onDelete={onUpdate} />
      </div>
      
    </div>
  );
}
