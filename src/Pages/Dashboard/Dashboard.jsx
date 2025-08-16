import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Providers/AuthContext";
import { Link } from "react-router";
import {
  FaPlusCircle,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaChartPie,
  FaCalendarDay,
  FaReceipt,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    totalSpent: 0,
    largestCategory: "N/A",
    avgDaily: 0,
    transactions: 0,
  });

  const CATEGORY_COLORS = {
    Food: "#A594F9",
    Transport: "#4B3F72",
    Shopping: "#CDC1FF",
    Others: "#FFD580",
  };

  // Fetch Expense Data
  useEffect(() => {
    if (!user?.accessToken) return;

    axios
      .get("https://personal-expense-tracker-server.vercel.app/expenses", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        const expenses = res.data || [];

        // Group Expenses By Category
        const grouped = {};
        let totalSpent = 0;
        expenses.forEach((item) => {
          const category = item.category || "Others";
          const amount = Number(item.amount) || 0;
          grouped[category] = (grouped[category] || 0) + amount;
          totalSpent += amount;
        });

        // Convert Grouped Data Into Array Format For Recharts
        const data = Object.entries(grouped).map(([name, value]) => ({
          name,
          value,
        }));

        // Find Largest Category
        let largestCategory = "N/A";
        if (data.length > 0) {
          largestCategory = data.reduce((prev, current) =>
            current.value > prev.value ? current : prev
          ).name;
        }

        // Calculate Average Daily Spending
        const currentMonth = new Date().getMonth();
        const daysInMonth = new Date(
          new Date().getFullYear(),
          currentMonth + 1,
          0
        ).getDate();
        const avgDaily = totalSpent / daysInMonth;

        setChartData(data);
        setStats({
          totalSpent,
          largestCategory,
          avgDaily,
          transactions: expenses.length,
        });
      })
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F5EFFF] p-6">
      <div className="bg-[#EDE7FF] p-6 rounded-2xl shadow-lg mb-8 text-center">
        <h1
          className="text-5xl font-extrabold text-[#4B3F72] mb-2"
          data-aos="fade-down"
        >
          Welcome, {user?.displayName || "User"}
        </h1>
        <p
          className="text-lg font-medium text-gray-700 max-w-2xl py-4 mx-auto leading-relaxed"
          data-aos="fade-up"
        >
          <span className="text-[#4B3F72] font-semibold">
            <Typewriter
              words={[
                "Track, Understand, And Master Your Spending.",
                "Every Number Tells A Story.",
                "Make Yours One Of Growth, Clarity, And Smart Financial Choices.",
                "Turn Every Expense Into An Opportunity.",
                "Your Money, Your Future, Your Rules.",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <div className="p-3 bg-[#A594F9] text-white rounded-full shadow-md">
            <FaMoneyBillWave size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Spent</p>
            <h3 className="text-2xl font-bold text-[#4B3F72]">
              ${stats.totalSpent.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <div className="p-3 bg-[#CDC1FF] text-[#4B3F72] rounded-full shadow-md">
            <FaChartPie size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Largest Category</p>
            <h3 className="text-2xl font-bold text-[#4B3F72]">
              {stats.largestCategory}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <div className="p-3 bg-[#FFD580] text-[#4B3F72] rounded-full shadow-md">
            <FaCalendarDay size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Daily Spend</p>
            <h3 className="text-2xl font-bold text-[#4B3F72]">
              ${stats.avgDaily.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex items-center gap-4">
          <div className="p-3 bg-[#4B3F72] text-white rounded-full shadow-md">
            <FaReceipt size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Transactions</p>
            <h3 className="text-2xl font-bold text-[#4B3F72]">
              {stats.transactions}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
        <h2
          className="text-3xl font-bold text-center text-[#4B3F72] mb-2"
          data-aos="fade-down"
        >
          Where Your Money Goes
        </h2>
        <p
          className="text-lg font-medium text-gray-600 text-center max-w-2xl mx-auto mb-8"
          data-aos="fade-up"
        >
          A quick look at how your spending is distributed across different
          categories.
        </p>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      CATEGORY_COLORS[entry.name] || CATEGORY_COLORS["Others"]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
            <FaExclamationCircle className="text-5xl text-[#A594F9] mb-4" />
            <p className="text-lg mb-6">
              No expense data available yet. Start tracking your spending today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/add-expense"
                className="flex items-center gap-2 px-5 py-3 bg-[#A594F9] text-white rounded-lg shadow-md hover:bg-[#8b7ae0] transition"
              >
                <FaPlusCircle /> Add Expenses
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
