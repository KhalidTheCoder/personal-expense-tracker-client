import DashboardLayout from "../Layout/DashboardLayout";
import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddExpense from "../Pages/Dashboard/AddExpense";
import Expenses from "../Pages/Dashboard/Expenses";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-expense",
        element: <AddExpense />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "*",
    element: <Error />,
  },
]);

export default Routes;
