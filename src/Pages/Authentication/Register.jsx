import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottie/reg.json";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Providers/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating your account...");

    createUser(email, password)
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Account created successfully! 🎉");
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) => {
        toast.dismiss(loadingToast);
        toast.error(error.message || "Registration failed. Please try again.");
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
            Join Your Smart Financial Journey
          </h1>
          <p
            className="mt-4 text-gray-600 text-lg max-w-md"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Create your account today and start tracking your expenses with
            ease.
          </p>
          <div
            className="w-full max-w-sm mt-8"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <Lottie animationData={registerAnimation} loop />
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
              Create Your Account
            </h2>

            <form onSubmit={handleRegister} className="space-y-5">
              <div data-aos="fade-up" data-aos-delay="400">
                <label className="block text-gray-700 mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#A594F9] placeholder-gray-400"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="500">
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

              <div data-aos="fade-up" data-aos-delay="600">
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

              <div data-aos="fade-up" data-aos-delay="700">
                <button
                  type="submit"
                  className="w-full bg-[#A594F9] hover:bg-[#CDC1FF] hover:text-gray-800 
                  text-white font-semibold py-2 rounded-md transition-all 
                  duration-200 ease-in-out hover:scale-105 shadow-md"
                >
                  Register
                </button>
              </div>
            </form>

            <p
              className="text-sm text-center mt-5 text-gray-600"
              data-aos="fade-in"
              data-aos-delay="800"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                state={location.state}
                className="text-[#A594F9] hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
