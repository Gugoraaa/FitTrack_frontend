// App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // make sure this exists
import DashboardLayout from "./pages/Dashboard";
import Summary from "./pages/dashboard/Summary"; // make sure this exists
import Goals from "./pages/dashboard/Goals"; // make sure this exists
import Workouts from "./pages/dashboard/Workouts"; // make sure this exists
import Nutrition from "./pages/dashboard/Nutrition"; // make sure this exists
import Measuremnts from "./pages/dashboard/MeasurementsView"; // make sure this exists  

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="summary" element={<Summary />} />
        <Route path="goals" element={<Goals />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="measurements" element={<Measuremnts />} />
        {/* Add other dashboard routes here */}
      </Route>
    </Routes>
  );
}
