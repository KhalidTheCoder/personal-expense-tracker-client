import DashboardLayout from "../Layout/DashboardLayout";
import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddExpense from "../Pages/Dashboard/AddExpense";
import Expenses from "../Pages/Dashboard/Expenses";
import PrivateRoute from "./PrivateRoute";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "add-expense",
        element: (
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        ),
      },
      {
        path: "all-expenses",
        element: (
          <PrivateRoute>
            <Expenses></Expenses>
          </PrivateRoute>
        ),
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
