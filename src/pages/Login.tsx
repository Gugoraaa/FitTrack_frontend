import { useForm } from "react-hook-form";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
  try {
    const response = await api.post("auth/login", data); // 
    localStorage.setItem("user", JSON.stringify(response.data.user));
    alert(response.data.message);

    navigate("/dashboard");
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-text">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text">username</label>
            <input
              type="username"
              {...register("username", { required: true })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.username && (
              <p className="text-error text-sm mt-1">username is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                Password must be at least 8 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-teal-950 bg-teal-900 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Register redirect */}
        <p className="mt-6 text-center text-sm text-text">
          New to FitTrack?{" "}
          <Link
            to="/register"
            className="text-secondary font-medium hover:underline transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
