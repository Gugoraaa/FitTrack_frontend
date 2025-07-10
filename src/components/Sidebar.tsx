import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#2F5249] text-white flex flex-col py-8 px-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-10 text-center">FitTrack</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard/summary" className="hover:bg-green-700 px-4 py-2 rounded">Summary</Link>
        <Link to="/dashboard/goals" className="hover:bg-green-700 px-4 py-2 rounded">Goals</Link>
        <Link to="/dashboard/workouts" className="hover:bg-green-700 px-4 py-2 rounded">Workouts</Link>
        <Link to="/dashboard/nutrition" className="hover:bg-green-700 px-4 py-2 rounded">Nutrition</Link>
        <Link to="/dashboard/measurements" className="hover:bg-green-700 px-4 py-2 rounded">Measurements</Link>

        {/* 
        <Link to="/dashboard/workouts" className="hover:bg-green-700 px-4 py-2 rounded">Entrenamientos</Link>
        <Link to="/dashboard/progress" className="hover:bg-green-700 px-4 py-2 rounded">Progreso</Link>
        <Link to="/dashboard/profile" className="hover:bg-green-700 px-4 py-2 rounded">Perfil</Link> */}
      </nav>
    </aside>
  );
}
