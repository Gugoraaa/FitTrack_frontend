import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
