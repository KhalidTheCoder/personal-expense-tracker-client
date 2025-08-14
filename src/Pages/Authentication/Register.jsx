import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottie/reg.json";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#F5EFFF] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <Lottie animationData={registerAnimation} loop={true} />
          </div>

          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-[#A594F9] mb-6 text-center">
              Create Your Account
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full text-black px-4 py-2 border border-[#CDC1FF] rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[#A594F9]
                  placeholder-gray-500"
                />
              </div>

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
                className="w-full bg-[#A594F9] hover:bg-[#CDC1FF] hover:text-gray-800 text-white font-semibold py-2 rounded-md transition-all duration-200 ease-in-out hover:scale-105 shadow-md"
              >
                Register
              </button>
            </form>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#A594F9] hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
