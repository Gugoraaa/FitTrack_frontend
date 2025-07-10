import { useEffect, useState } from "react";
import UserInfoCard from "../../components/profile/UserInfoCard";
import CalorieGoalEditor from "../../components/profile/CalorieGoalEditor";
import BMIDisplay from "../../components/profile/BMIDisplay";

export default function ProfileView() {
  const [user, setUser] = useState({ id: 0, username: "", created_at: "", calorieGoal: 2000 });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  const handleGoalUpdate = (newGoal: number) => {
    setUser((prev) => ({ ...prev, calorieGoal: newGoal }));
  };

  const handleUsernameUpdate = (newUsername: string) => {
    setUser((prev) => ({ ...prev, username: newUsername }));
    localStorage.setItem("user", JSON.stringify({ ...user, username: newUsername }));
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
      <UserInfoCard
        username={user.username}
        createdAt={user.created_at}
        userId={user.id}
        onUsernameChange={handleUsernameUpdate}
      />
      <CalorieGoalEditor calorieGoal={user.calorieGoal} onUpdate={handleGoalUpdate} />
      <BMIDisplay userId={user.id} />

    </div>
  );
}
