import { useEffect, useState } from "react";
import api from "../../services/api";

interface BMIDisplayProps {
  userId: number;
}

export default function BMIDisplay({ userId }: BMIDisplayProps) {
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!userId || userId <= 0) return;

  const fetchLatestMeasurement = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/measurements/getLatestMeasurements?userId=${userId}`);
      const latest = res.data;

      if (!latest || latest.weight == null || latest.height == null) {
        throw new Error("Incomplete data");
      }

      setWeight(latest.weight);
      setHeight(latest.height);
    } catch (err) {
      console.error("Failed to fetch BMI data:", err);
      setError("Could not load BMI data.");
    } finally {
      setLoading(false);
    }
  };

  fetchLatestMeasurement();
}, [userId]);


  const getBMI = (): number | null => {
    if (weight && height && height > 0) {
      const heightInMeters = height / 100;
      return weight / (heightInMeters * heightInMeters);
    }
    return null;
  };

  const getCategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obesity";
  };

  const bmi = getBMI();

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 w-full md:w-1/2 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">BMI (Body Mass Index)</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bmi ? (
        <>
          <p className="text-2xl font-bold text-teal-800">{bmi.toFixed(1)}</p>
          <p className="text-gray-600">{getCategory(bmi)}</p>
        </>
      ) : (
        <p className="text-gray-500">Not enough data</p>
      )}
    </div>
  );
}
