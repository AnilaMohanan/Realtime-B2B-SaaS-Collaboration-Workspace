import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";
import type { User } from "../types/user";

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await registerUser(user);

      alert(res.data.message || "Registration Successful");

      navigate("/");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl w-[950px] overflow-hidden grid grid-cols-2">

        {/* Left */}

        <div className="flex flex-col justify-center items-center bg-slate-900 text-white p-12">

          <h1 className="text-5xl font-bold">
            TeamSync
          </h1>

          <p className="mt-6 text-lg text-center leading-8 text-gray-300">

            Collaborate with your team in real-time.

            <br />

            Manage Workspaces,

            Channels,

            Documents and Chats.

          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/10423/10423409.png"
            alt="Team"
            className="w-80 mt-10"
          />

        </div>

        {/* Right */}

        <div className="p-12">

          <h2 className="text-4xl font-bold">

            Create Account

          </h2>

          <p className="text-gray-500 mt-2">

            Welcome to TeamSync

          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="font-semibold">

                Full Name

              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full mt-2 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="font-semibold">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full mt-2 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="font-semibold">

                Password

              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full mt-2 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                onChange={() =>
                  setShowPassword(!showPassword)
                }
              />

              <span>

                Show Password

              </span>

            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-lg font-semibold transition"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

          <p className="mt-8 text-center">

            Already have an account?

            <Link
              to="/"
              className="text-blue-600 font-bold ml-2"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

};

export default Register;