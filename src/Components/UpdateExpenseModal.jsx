import React, { useState, forwardRef, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import expenseAnimation from "../assets/lottie/Investment.json";
import { AuthContext } from "../Providers/AuthContext";

const UpdateExpenseModal = ({ isOpen, onClose, expense, onUpdated }) => {
  const { user } = useContext(AuthContext);
  const token = user?.accessToken;
  const [expenseDate, setExpenseDate] = useState(new Date(expense.date));

  //Custom Button For DatePicker Input

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

    const updatedExpense = {
      title: e.target.title.value.trim(),
      amount: e.target.amount.value.trim(),
      category: e.target.category.value,
      date: expenseDate.toISOString(),
    };

    //Validation

    if (!updatedExpense.title || updatedExpense.title.length < 3)
      return toast.error("Title must be at least 3 characters long");
    if (!updatedExpense.amount || updatedExpense.amount <= 0)
      return toast.error("Amount must be a number greater than 0");
    if (!updatedExpense.category)
      return toast.error("Please select a category");
    if (!updatedExpense.date) return toast.error("Please select a date");

    // Sending PATCH Request To Update Expense

    try {
      await axios.patch(
        `https://personal-expense-tracker-server.vercel.app/expenses/${expense._id}`,
        updatedExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Expense updated successfully!");
      onUpdated(updatedExpense);
      onClose();
    } catch (err) {
      toast.error("Failed to update expense");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50"
      data-aos="fade-up"
    >
      <div className="bg-[#E5D9F2] p-6 rounded-2xl shadow-lg max-w-lg w-full">
        <div className="flex justify-center mb-4">
          <Lottie animationData={expenseAnimation} loop className="w-32 h-32" />
        </div>

        <h2 className="text-2xl font-bold text-[#4B3F72] mb-4 text-center">
          Update Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 mb-1 font-medium">Tittle</label>
          <input
            type="text"
            name="title"
            defaultValue={expense.title}
            placeholder="Expense Title"
            className="w-full py-2 px-3 rounded-lg border border-[#A594F9] bg-[#F5EFFF] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
          />
          <label className="block text-gray-700 mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            defaultValue={expense.amount}
            placeholder="Amount"
            className="w-full py-2 px-3 rounded-lg border border-[#A594F9] bg-[#F5EFFF] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
          />
          <label className="block text-gray-700 mb-1 font-medium">
            Category
          </label>
          <select
            name="category"
            defaultValue={expense.category}
            className="w-full py-2 px-3 rounded-lg border border-[#A594F9] bg-[#F5EFFF] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>

          <label className="block text-gray-700 mb-1 font-medium">Date</label>
          <DatePicker
            selected={expenseDate}
            onChange={(date) => setExpenseDate(date)}
            maxDate={new Date()}
            customInput={<CustomInput />}
          />
          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 rounded-lg bg-[#A594F9] text-white font-semibold hover:bg-[#8b7ae0] transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpenseModal;
