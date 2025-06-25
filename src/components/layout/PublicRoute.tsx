import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type TPublicRoute = {
  children: ReactNode;
};

const PublicRoute = ({ children }: TPublicRoute) => {
  const token = useSelector(selectCurrentToken);

  // If user is authenticated, redirect them away from public routes
  if (token) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default PublicRoute;
