import React, { useContext, useState } from "react";
import Navbar from "../../Components/Navbar";
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
        navigate(location.state?.from?.pathname || "/", {
          replace: true,
        });
      })
      .catch((error) => {
        toast.dismiss(loadingToast);
        toast.error(error.message || "Login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-[#F5EFFF] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>

          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#A594F9] mb-6 text-center">
              Welcome Back
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border border-[#CDC1FF] rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#A594F9]
                  placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border border-[#CDC1FF] rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#A594F9]
                  placeholder-gray-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#A594F9] hover:bg-[#CDC1FF] hover:text-gray-800 
                text-white font-semibold py-2 rounded-md transition-all 
                duration-200 ease-in-out hover:scale-105 shadow-md"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" state={location.state} className="text-[#A594F9] hover:underline">
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
