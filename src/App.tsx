import { Routes, Route,Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Register from "@pages/Register"; 
import DashboardLayout from "@pages/Dashboard";
import Summary from "@pages/dashboard/Summary"
import Goals from "@pages/dashboard/Goals"; 
import Workouts from "@pages/dashboard/Workouts"; 
import Nutrition from "@pages/dashboard/Nutrition"; 
import Measuremnts from "@pages/dashboard/MeasurementsView"; 
import Profile from "@pages/dashboard/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="summary" element={<Summary />} />
        <Route path="goals" element={<Goals />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="measurements" element={<Measuremnts />} />
        
      </Route>
    </Routes>
  );
}
