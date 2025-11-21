import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import MainLayout from "@/layout/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AllGadgets from "@/pages/AllGadgets";
import AddGadget from "@/pages/AddGadget";
import MyGadgets from "@/pages/MyGadgets";
import SalesHistory from "@/pages/SalesHistory";
import PublicRoute from "@/components/layout/PublicRoute";
import Analytics from "@/pages/Analytics";
import GadgetDetail from "@/pages/GadgetDetail";
import Settings from "@/pages/Settings";
import User from "@/pages/User";
import UserDetail from "@/pages/UserDetail";
import ChangePassword from "@/pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role={undefined}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "analytics",
        element: (
          <ProtectedRoute role="admin">
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "gadgets",
        element: <AllGadgets />,
      },
      {
        path: "gadgets/add",
        element: <AddGadget />,
      },
      {
        path: "gadgets/:id",
        element: <GadgetDetail />,
      },
      {
        path: "my-gadgets",
        element: (
          <ProtectedRoute role="seller">
            <MyGadgets />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <ProtectedRoute role={"admin"}>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-users/:id",
        element: (
          <ProtectedRoute role={"admin"}>
            <UserDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "sales-history",
        element: (
          <ProtectedRoute role={["admin", "seller"]}>
            <SalesHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute role={["admin", "seller"]}>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
      <ProtectedRoute role={["admin", "seller"]}>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
]);

export default router;
