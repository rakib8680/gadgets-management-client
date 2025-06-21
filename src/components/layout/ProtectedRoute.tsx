import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types/auth";
import verifyToken from "@/utils/verifyToken";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (!token || (role && role !== (user as TUser)?.role)) {
    toast.error("You are not Authorized", {
      position: "top-center",
      className: "!bg-pink-800 !text-white",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if(token){}

  return children;
};

export default ProtectedRoute;
