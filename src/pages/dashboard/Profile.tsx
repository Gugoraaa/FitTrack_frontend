import { useEffect, useState } from "react";
import UserInfoCard from "@components/profile/UserInfoCard";
import CalorieGoalEditor from "@components/profile/CalorieGoalEditor";
import BMIDisplay from "@components/profile/BMIDisplay";
import LogoutButton from "@components/profile/LogoutButton";
import api from "../../services/api"

type User = {
  userID: number;
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
        
        if (!storedUser?.id) return;
        const response = await api.post("/profile/getUserData", { userID: storedUser.id }, {
          withCredentials: true,
        });
        console.log(response.data)
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
    console.log(user)
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
          userId={user.userID}
          onUsernameChange={handleUsernameUpdate}
        />
        <LogoutButton />
      </div>

      <CalorieGoalEditor calorieGoal={user.daily_calorie_goal} onUpdate={handleGoalUpdate} />
      <BMIDisplay userId={user.userID} />
    </div>
  );
}
