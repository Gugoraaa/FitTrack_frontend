import { useState } from "react";
import api from "../../services/api";

type Props = {
  workoutID: number;
  onDelete: () => void;
};

export default function DeleteCardioButton({ workoutID, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
  try {
    await api.delete(`/workouts/deleteCardioSession`, {
      data: { id: workoutID},
    });
    onDelete(); 
    setIsOpen(false);
  } catch (err) {
    console.error("Delete error:", err);
    setError("Failed to delete goal.");
  }
};


  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700 font-medium"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg border border-gray-300 text-left">
            <h2 className="text-lg font-semibold text-text mb-4">Confirm Deletion</h2>
            <p className="text-sm text-text/80 mb-4">
              Are you sure you want to delete this session? This action cannot be undone.
            </p>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
