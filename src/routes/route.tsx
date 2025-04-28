import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Main from "@/layout/Main";
import Login from "@/pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
