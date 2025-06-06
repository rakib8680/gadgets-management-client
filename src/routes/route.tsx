import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import MainLayout from "@/layout/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
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
