import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";

type TLogoutButtonProps = {
  variant?:
    | "outline"
    | "default"
    | "link"
    | "destructive"
    | "secondary"
    | "ghost";

  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
};

const LogoutButton = ({
  variant = "outline",
  size = "default",
  className = " border-gray-300 hover:bg-red-100 hover:text-red-700 transition-all duration-300 cursor-pointer",
  showIcon = true,
  children = "Logout",
}: TLogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/", { replace: true });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
    >
      {showIcon && <LogOut className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
};

export default LogoutButton;
