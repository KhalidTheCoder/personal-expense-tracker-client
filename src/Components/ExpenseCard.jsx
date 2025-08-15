import React from "react";
import { FaTag, FaTrash, FaEdit } from "react-icons/fa";

const ExpenseCard = ({ expense, categoryColors, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold text-[#4B3F72]">{expense.title}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span
          className={`badge border-none ${
            categoryColors[expense.category] || categoryColors["Others"]
          }`}
        >
          <FaTag className="mr-1" /> {expense.category}
        </span>
      </div>
      <p className="text-[#4B3F72] font-bold mt-2">
        ${Number(expense.amount)}
      </p>
      <p className="text-gray-500 text-sm">
        {new Date(expense.date).toLocaleDateString()}
      </p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(expense)}
          className="btn btn-xs border-none bg-[#A594F9] text-white hover:bg-[#8E7CFA]"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(expense._id)}
          className="btn btn-xs border-none bg-red-500 text-white hover:bg-red-600"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
