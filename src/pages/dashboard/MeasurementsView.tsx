import { useState } from "react";
import MeasurementInputForm from "@components/measurements/AddMeasurementForm";
import MeasurementsTable from "@components/measurements/MeasurementsTable";
import MeasurementsChart from "@components/measurements/MeasurementsChart";

export default function MeasurementsView() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleUpdate = () => setReloadKey((k) => k + 1);

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-start gap-10">
        {/* Formulario */}
        <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md">
          <h2 className="text-xl font-semibold mb-6 text-text">
            Add Measurement
          </h2>
          <MeasurementInputForm onAdded={handleUpdate} />
        </div>

        {/* Chart y Table en columna */}
        <div className="flex flex-col gap-6 w-full">
          {/* Gráfico de progreso */}
          <MeasurementsChart reloadKey={reloadKey} />

          {/* Tabla de historial */}
          <div className="bg-white shadow-xl p-6 rounded-xl w-full">
            <h2 className="text-lg font-semibold mb-4 text-text">
              Measurement History
            </h2>
            <MeasurementsTable reloadKey={reloadKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
