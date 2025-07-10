// src/pages/Summary.tsx

export default function Summary() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-fit-dark">
        {user ? `Welcome back, ${user.username}` : "Welcome"}
      </h1>
    </div>
  );
}
