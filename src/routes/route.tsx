import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import MainLayout from "@/layout/MainLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
]);

export default router;
