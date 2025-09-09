import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
type TProtectedRoute = {
  children: ReactNode;
  role?: string | string[] | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  // Check if user has access based on role requirements
  const hasAccess = () => {
    if (!token) return false;
    if (!role) return true; // No role requirement, just need to be authenticated

    // If role is a string, check for exact match
    if (typeof role === "string") {
      return role === user?.role;
    }

    // If role is an array, check if user's role is in the array
    if (Array.isArray(role)) {
      return role.includes(user?.role || "");
    }

    return false;
  };

  if (!hasAccess()) {
    toast.error("You are not Authorized to access this route", {
      position: "top-center",
      className: "!bg-pink-800 !text-white",
      duration: 2000,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
