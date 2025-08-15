import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottie/login.json";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Providers/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Signing you in...");

    signInUser(email, password)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Signed in successfully! 🎉");
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) => {
        toast.dismiss(loadingToast);
        toast.error(error.message || "Login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-[#F5EFFF] flex items-center justify-center px-4">
      <div
        className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 bg-white rounded-2xl shadow-2xl overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <div className="flex-1 p-8 md:p-12 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex flex-col justify-center items-center text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-[#4B3F72] leading-tight"
            data-aos="fade-down"
          >
            Your Smart Financial Companion
          </h1>
          <p
            className="mt-4 text-gray-600 text-lg max-w-md"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Track expenses, stay on top of your budget, and achieve your goals.
            All in one place.
          </p>
          <div
            className="w-full max-w-sm mt-8"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <Lottie animationData={loginAnimation} loop />
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12">
          <div
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h2
              className="text-2xl font-semibold text-[#4B3F72] mb-6 text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div data-aos="fade-up" data-aos-delay="400">
                <label className="block text-gray-700 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#A594F9] placeholder-gray-400"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="500">
                <label className="block text-gray-700 mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#A594F9] placeholder-gray-400"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="600">
                <button
                  type="submit"
                  className="w-full bg-[#A594F9] hover:bg-[#CDC1FF] hover:text-gray-800 
                  text-white font-semibold py-2 rounded-md transition-all 
                  duration-200 ease-in-out hover:scale-105 shadow-md"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p
              className="text-sm text-center mt-5 text-gray-600"
              data-aos="fade-in"
              data-aos-delay="700"
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                state={location.state}
                className="text-[#A594F9] hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
