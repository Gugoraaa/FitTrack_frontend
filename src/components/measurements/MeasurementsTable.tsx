import { useEffect, useState } from "react";
import api from "../../services/api";



const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

export default function MeasurementsTable({ reloadKey }: { reloadKey: number }) {
  const [entries, setEntries] = useState<MeasurementTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.id;
      const res = await api.get(`/measurements/getMeasurements?userId=${userId}` );
      setEntries(res.data);
    };

    fetchData();
  }, [reloadKey]);

  return (
    <div className="bg-white shadow-xl p-6 rounded-xl w-full max-w-3xl mt-6">
      <h2 className="text-lg font-semibold mb-4 text-text">Measurement History</h2>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Date</th>
            <th className="pb-2">Weight (kg)</th>
            <th className="pb-2">Waist (cm)</th>
            <th className="pb-2">Chest (cm)</th>
            <th className="pb-2">hips (cm)</th>
            <th className="pb-2">height (cm)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="py-1">{formatDate(entry.date)} </td>
              <td className="py-1"> {entry.weight}</td>
              <td className="py-1">{entry.waist}</td>
              <td className="py-1">{entry.chest}</td>
              <td className="py-1">{entry.hips}</td>
              <td className="py-1">{entry.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
