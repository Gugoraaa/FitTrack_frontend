import { useState } from "react";
import api from "../../services/api";

export default function AddMeasurementForm({ onAdded }: { onAdded: () => void }) {
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [chest, setChest] = useState("");
  const [hips, setHips] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;

    if (!userId) return;

    await api.post("/measurements/addMeasurements", {
      userId,
      weight: parseFloat(weight),
      waist: parseFloat(waist),
      chest: parseFloat(chest),
      hips: parseFloat(hips),
      height: parseFloat(height)
    });

    setWeight("");
    setWaist("");
    setChest("");
    setHips("");
    setHeight("");    
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl p-6 rounded-xl w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-text">Add Measurement</h2>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight (kg)"
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="number"
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
        placeholder="Waist (cm)"
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="number"
        value={chest }
        onChange={(e) => setChest(e.target.value)}
        placeholder="chest  (cm)"
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="number"
        value={hips }
        onChange={(e) => setHips(e.target.value)}
        placeholder="hips  (cm)"
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="number"
        value={height }
        onChange={(e) => setHeight(e.target.value)}
        placeholder="height  (cm)"
        className="w-full mb-3 px-4 py-2 border rounded-lg"
        required
      />
      <button
        type="submit"
        className="w-full bg-teal-800 hover:bg-teal-950 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}
