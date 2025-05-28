import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import MainLayout from "@/layout/MainLayout";
import ErrorPage from "@/pages/ErrorPage";
import SignUp from "@/pages/SignUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
