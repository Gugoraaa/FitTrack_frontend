import { useEffect, useState } from "react";
import UserInfoCard from "@components/profile/UserInfoCard";
import CalorieGoalEditor from "@components/profile/CalorieGoalEditor";
import BMIDisplay from "@components/profile/BMIDisplay";
import LogoutButton from "@components/profile/LogoutButton";

export default function ProfileView() {
  const [user, setUser] = useState({
    id: 0,
    username: "",
    created_at: "",
    daily_calorie_goal: 0,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Stored user:", storedUser);
    setUser(storedUser);
    console.log(user.id);
  }, []);

  
  const handleGoalUpdate = (newGoal: number) => {
    setUser((prev) => ({ ...prev, daily_calorie_goal: newGoal }));
  };

  const handleUsernameUpdate = (newUsername: string) => {
    const updatedUser = { ...user, username: newUsername };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

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
