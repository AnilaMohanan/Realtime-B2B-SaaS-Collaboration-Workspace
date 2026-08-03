import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      
      setLoading(true);

      const res = await loginUser(login);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

     // alert("Login Successful");

      navigate("/Dashboard");

    } catch (err: any) {

      alert(
        err.response?.data?.message ||
        "Invalid Email or Password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-blue-700 to-slate-900 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl w-[950px] overflow-hidden grid grid-cols-2">

        {/* Left */}

        <div className="bg-slate-900 text-white flex flex-col justify-center items-center p-12">

          <h1 className="text-5xl font-bold">
            TeamSync
          </h1>

          <p className="text-gray-300 mt-6 text-center leading-8">

            Welcome Back!

            <br />

            Continue collaborating with your team.

          </p>

          <img
            src="https://undraw.co/api/illustrations/undraw_login_re_4vu2.svg"
            className="w-80 mt-10"
            alt="Login"
          />

        </div>

        {/* Right */}

        <div className="p-12">

          <h2 className="text-4xl font-bold">

            Login

          </h2>

          <p className="text-gray-500 mt-2">

            Sign in to your account

          </p>

          <form
            className="space-y-6 mt-10"
            onSubmit={handleSubmit}
          >

            <div>

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={login.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="w-full border rounded-xl p-4 mt-2"
              />

            </div>

            <div>

              <label>Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="w-full border rounded-xl p-4 mt-2"
              />

            </div>

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                onChange={() =>
                  setShowPassword(!showPassword)
                }
              />

              Show Password

            </div>

            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 w-full text-white rounded-xl p-4 text-lg"
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

          </form>

          <p className="mt-8 text-center">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-bold ml-2"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

};

export default Login;