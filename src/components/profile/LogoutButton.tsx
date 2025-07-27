import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function LogoutButton() {
  const navigate = useNavigate();
  

  
  const handleLogout = () => {
    api.post("/auth/logout");
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow mt-4"
    >
      Logout
    </button>
  );
}
