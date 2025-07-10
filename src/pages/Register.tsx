import { useForm } from "react-hook-form";
import api from "../services/api";
import { Link } from "react-router-dom";

type RegisterFormInputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const { username, password } = data;
      const response = await api.post("auth/register", {
        username,
        password,
      });
      console.log("Registration response:", response.data);
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
    }
  };

  // Watch password to validate confirmation
  const passwordValue = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-text">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text">Username</label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.username && (
              <p className="text-error text-sm mt-1">Username is required</p>
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

          <div>
            <label className="block text-sm font-medium text-text">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.confirmPassword && (
              <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-teal-950 bg-teal-900 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-secondary font-medium hover:underline transition"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
