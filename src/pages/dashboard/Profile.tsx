import { useEffect, useState } from "react";
import UserInfoCard from "@components/profile/UserInfoCard";
import CalorieGoalEditor from "@components/profile/CalorieGoalEditor";
import BMIDisplay from "@components/profile/BMIDisplay";
import LogoutButton from "@components/profile/LogoutButton";
import api from "../../services/api"

type User = {
  id: number;
  username: string;
  created_at: string;
  daily_calorie_goal: number;
};

export default function ProfileView() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        
        const response = await api.post("/getUserData", { userID: storedUser.id }, {
          withCredentials: true,
        });
        if (!storedUser?.id) return;

        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleGoalUpdate = (newGoal: number) => {
    setUser((prev) => prev ? { ...prev, daily_calorie_goal: newGoal } : prev);
  };

  const handleUsernameUpdate = (newUsername: string) => {
    if (!user) return;
    const updatedUser = { ...user, username: newUsername };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <UserInfoCard
          username={user.username}
          createdAt={user.created_at}
          userId={user.id}
          onUsernameChange={handleUsernameUpdate}
        />
        <LogoutButton />
      </div>

      <CalorieGoalEditor calorieGoal={user.daily_calorie_goal} onUpdate={handleGoalUpdate} />
      <BMIDisplay userId={user.id} />
    </div>
  );
}
