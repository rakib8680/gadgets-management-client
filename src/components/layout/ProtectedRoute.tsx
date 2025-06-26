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
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!token || (role && role !== user?.role)) {
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
