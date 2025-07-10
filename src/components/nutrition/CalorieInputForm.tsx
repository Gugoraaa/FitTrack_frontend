import { useState } from "react";
import api from "../../services/api";

type Props = {
  onUpdate: () => void; // función para recargar calorías en el componente padre
};

export default function CalorieInputForm({ onUpdate }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const user_id = user?.id;
    if (!user_id || query.trim() === "") {
      setError("Please enter what you ate.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/nutrition/logCalories", {
        user_id,
        query,
      });

      setQuery("");
      onUpdate(); // actualiza el componente del conteo
    } catch (err) {
      console.error("Error updating calories:", err);
      setError("Could not process your food entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border border-gray-200 mt-6">
      <h2 className="text-lg font-semibold text-text mb-4">
        What did you eat today?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="e.g. 2 eggs and toast"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-950 transition w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
