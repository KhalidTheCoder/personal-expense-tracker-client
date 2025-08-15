import React, { useState, forwardRef, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import expenseAnimation from "../../assets/lottie/Investment.json";
import { AuthContext } from "../../Providers/AuthContext";

const AddExpense = () => {
  const [expenseDate, setExpenseDate] = useState(null);
  const { user } = useContext(AuthContext);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="w-full py-2 px-3 rounded-lg border border-[#A594F9] bg-[#F5EFFF] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
    >
      {value || "Select event date"}
    </button>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const userEmail = user.email
    const title = e.target.title.value.trim();
    const amount = e.target.amount.value.trim();
    const category = e.target.category.value;
    const date = expenseDate;

    if (!title || title.length < 3)
      return toast.error("Title must be at least 3 characters long");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be a number greater than 0");
    if (!category) return toast.error("Please select a category");
    if (!date) return toast.error("Please select a date");

    axios
      .post("http://localhost:5000/expenses", {
        userEmail,
        title,
        amount: Number(amount),
        category,
        date,
      })
      .then(() => {
        toast.success("Expense added successfully!");
        e.target.reset();
        setExpenseDate(null);
      })
      .catch(() => {
        toast.error("Failed to add expense");
      });
  };

  return (
    <div>
      <h1
        className="text-5xl font-extrabold text-[#4B3F72] mt-10 mb-4 text-center"
        data-aos="fade-down"
      >
        Add New Expense
      </h1>
      <p
        className="text-lg font font-medium text-gray-600 text-center max-w-2xl mx-auto mb-8"
        data-aos="fade-up"
      >
        Keep track of your spending by adding each expense with accurate
        details. This helps you manage your budget, analyze trends, and stay in
        control of your finances.
      </p>
      <div
        className="min-h-[calc(100vh-3000px)] flex items-center justify-center bg-transparent"
        data-aos="zoom-in"
      >
        <div
          className="max-w-lg mx-auto bg-[#E5D9F2] p-6 rounded-2xl shadow-lg mt-10"
          data-aos="fade-up"
        >
          <div className="flex justify-center mb-4" data-aos="zoom-in">
            <Lottie
              animationData={expenseAnimation}
              loop={true}
              className="w-32 h-32"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-aos="fade-up"
          >
           
            <input
              type="text"
              name="title"
              placeholder="Expense Title"
              className="w-full py-2 px-3 rounded-lg border border-[#A594F9] bg-[#F5EFFF] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full py-2 px-3 rounded-lg border border-[#A594F9] bg-[#F5EFFF] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
            />

            <select
              name="category"
              className="w-full py-2 px-3 rounded-lg border border-[#A594F9] bg-[#F5EFFF] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>

            <DatePicker
              selected={expenseDate}
              onChange={(date) => setExpenseDate(date)}
              maxDate={new Date()}
              customInput={<CustomInput />}
            />

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#A594F9] text-white font-semibold hover:bg-[#8b7ae0] transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
