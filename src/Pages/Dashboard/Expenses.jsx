import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTag, FaTrash, FaEdit } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthContext";
import { Link } from "react-router";
import ExpenseCard from "../../Components/ExpenseCard";
import UpdateExpenseModal from "../../Components/UpdateExpenseModal";
import { HiOutlinePlus } from "react-icons/hi";
import Swal from "sweetalert2";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useContext(AuthContext);
  const token = user?.accessToken;

  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Getting The Users Expenses Data

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get("http://localhost:5000/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const expenseList = Array.isArray(res.data) ? res.data : [];
        setExpenses(expenseList);
        let totalAmount = 0;
        expenseList.forEach((e) => {
          totalAmount += e.amount || 0;
        });
        setTotal(totalAmount);
      })
      .catch((err) => console.error(err));
  }, [user, token]);

  const categoryColors = {
    Food: "bg-green-100 text-green-800",
    Transport: "bg-blue-100 text-blue-800",
    Shopping: "bg-pink-100 text-pink-800",
    Others: "bg-gray-100 text-gray-800",
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  // Function to handle updated expense from modal

  const handleUpdatedExpense = (updatedData) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp._id === selectedExpense._id ? { ...exp, ...updatedData } : exp
      )
    );

    setTotal((prevTotal) => {
      const oldAmount = Number(selectedExpense.amount) || 0;
      const newAmount = Number(updatedData.amount) || 0;
      return prevTotal - oldAmount + newAmount;
    });

    setSelectedExpense(null);
  };

  // Function to handle delete
  const handleDelete = (expenseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This expense will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/expenses/${expenseId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setExpenses((prev) => prev.filter((exp) => exp._id !== expenseId));

            const deletedExpense = expenses.find(
              (exp) => exp._id === expenseId
            );
            if (deletedExpense) {
              setTotal(
                (prevTotal) => prevTotal - (Number(deletedExpense.amount) || 0)
              );
            }

            Swal.fire("Deleted!", "Your expense has been removed.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              "Error!",
              "Something went wrong while deleting.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h1
        className="text-4xl font-extrabold text-[#4B3F72] mb-2 text-center"
        data-aos="fade-down"
      >
        Expense List
      </h1>
      <p className="text-lg text-gray-600 text-center mb-6" data-aos="fade-up">
        Review and manage all your recorded expenses in one place.
      </p>

      <div
        className="bg-white rounded-xl shadow-sm p-5 mb-6 flex items-center justify-between"
        data-aos="fade-right"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#A594F9] to-[#8E7CFA] shadow-md">
            <Link to="/add-expense">
              <HiOutlinePlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </Link>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Total Expenses
            </p>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              ${total}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">All Records</p>
          <p className="text-lg font-semibold text-gray-800">
            {expenses.length} Records
          </p>
        </div>
      </div>

      {/* This Card component is for Mobile View*/}

      <div className="block md:hidden">
        {expenses.length > 0 ? (
          expenses.map((exp, idx) => (
            <ExpenseCard
              key={idx}
              expense={exp}
              categoryColors={categoryColors}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="bg-[#E5D9F2] rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-bold text-[#4B3F72] mb-2">
              No expenses recorded
            </h2>
            <p className="text-gray-600 mb-4">
              You haven’t added any expenses yet. Start tracking your spending
              now!
            </p>
            <Link
              to="/add-expense"
              className="px-6 py-2 rounded-lg bg-[#A594F9] text-white font-semibold hover:bg-[#8E7CFA] transition"
            >
              + Add Expense
            </Link>
          </div>
        )}
      </div>

      {/* Here is the Table for Desktop view */}

      <div
        className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md"
        data-aos="fade-left"
      >
        <table className="table w-full">
          <thead className="bg-[#CDC1FF] text-[#4B3F72]">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((exp, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="font-medium">{exp.title}</td>
                  <td>
                    <span
                      className={`badge border-none ${
                        categoryColors[exp.category] || categoryColors["Others"]
                      }`}
                    >
                      <FaTag className="mr-1" /> {exp.category}
                    </span>
                  </td>
                  <td className="text-[#4B3F72] font-semibold">
                    ${Number(exp.amount)}
                  </td>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="btn btn-xs border-none bg-[#A594F9] text-white hover:bg-[#8E7CFA]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="btn btn-xs border-none bg-red-500 text-white hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6">
                  <div className="bg-[#F5EFFF] rounded-xl shadow-md p-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold text-[#4B3F72] mb-2">
                      No expenses recorded
                    </h2>
                    <p className="text-gray-600 mb-4">
                      You haven’t added any expenses yet. Start tracking your
                      spending now!
                    </p>
                    <Link
                      to="/add-expense"
                      className="px-6 py-2 rounded-lg bg-[#A594F9] text-white font-semibold hover:bg-[#8E7CFA] transition"
                    >
                      + Add Expense
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Here is The Update Modal */}

      {selectedExpense && (
        <UpdateExpenseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          expense={selectedExpense}
          onUpdated={handleUpdatedExpense}
        />
      )}
    </div>
  );
};

export default Expenses;
