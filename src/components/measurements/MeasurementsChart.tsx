import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../../services/api";


const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

export default function MeasurementsChart({ reloadKey }: { reloadKey: number }) {
  const [data, setData] = useState<MeasurementsChart[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.id;
      const res = await api.get(`/measurements/getMeasurements?userId=${userId}`);
      
      const formattedData = res.data.map((entry: MeasurementsChart) => ({
        ...entry,
        date: formatDate(entry.date),
      }));

      setData(formattedData);
    };

    fetchData();
  }, [reloadKey]);

  return (
    <div className="bg-white shadow-xl p-6 rounded-xl w-full max-w-3xl mt-6">
      <h2 className="text-lg font-semibold mb-4 text-text">Weight Progress Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis
            domain={['dataMin - 2', 'dataMax + 2']}
            tickFormatter={(value) => `${value} kg`}
          />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#0f766e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
