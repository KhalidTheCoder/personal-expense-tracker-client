import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-[#A594F9] shadow-md">
      <div className="navbar max-w-7xl mx-auto text-white px-4 py-2">
        <div className="navbar-start">
          <span className="text-2xl font-semibold tracking-wide">
            Expense Tracker
          </span>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className="btn border-none btn-ghost btn-sm text-base font-medium normal-case rounded-md transition-all duration-200 ease-in-out hover:bg-[#CDC1FF] hover:text-gray-800 hover:shadow-md hover:scale-105"
            >
              Sign In
            </NavLink>

            <NavLink
              to="/register"
              className="btn border-none btn-sm text-base font-semibold normal-case bg-[#CDC1FF] text-gray-800 rounded-md transition-all duration-200 ease-in-out hover:bg-[#E5D9F2] hover:shadow-lg hover:scale-105"
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
