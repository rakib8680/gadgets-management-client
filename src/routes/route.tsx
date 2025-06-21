import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import MainLayout from "@/layout/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import AllGadgets from "@/pages/AllGadgets";
import AddGadget from "@/pages/AddGadget";
import MyGadgets from "@/pages/MyGadgets";
import SalesHistory from "@/pages/SalesHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute role="admin">
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/gadgets",
        element: <AllGadgets />,
      },
      {
        path: "/gadgets/add",
        element: <AddGadget />,
      },
      {
        path: "/my-gadgets",
        element: <MyGadgets />,
      },
      {
        path: "/sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
