import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { FaTachometerAlt, FaPlus, FaList, FaSignOutAlt } from "react-icons/fa";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: <FaTachometerAlt />, text: "Dashboard", path: "/" },
    { icon: <FaPlus />, text: "Add Expense", path: "/add-expense" },
    { icon: <FaList />, text: "All Expenses", path: "/expenses" },
  ];

  return (
    <div className="flex h-screen bg-[#F5EFFF] text-gray-800 font-medium">
      {/* This Is The  Mobile Navbar To Open And Close The Sidebar */}

      <div className="md:hidden fixed top-0 left-0 w-full bg-[#A594F9] text-white flex items-center justify-between px-4 py-3 shadow-md z-20">
        <h1 className="text-lg font-semibold">Expense Tracker</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xl"
        >
          ☰
        </button>
      </div>

      {/* This Is The Sidebar Part*/}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-60 bg-[#A594F9] text-white shadow-lg transform transition-transform duration-300 z-30
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="hidden md:flex items-center px-5 py-5 border-b border-[#CDC1FF] text-lg font-semibold">
          Expense Tracker
        </div>

        <ul className="mt-4 space-y-1">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition 
                ${
                  location.pathname === item.path
                    ? "bg-[#CDC1FF] text-gray-800"
                    : "hover:bg-[#CDC1FF] hover:text-gray-800"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-4 w-full px-4">
          <Link
            to="/logout"
            className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition hover:bg-red-500 text-red-100"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-lg">
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Here Is The Main Content Part That Will Change Dynamically */}
      
      <main className="flex-1 overflow-y-auto p-6 mt-12 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
