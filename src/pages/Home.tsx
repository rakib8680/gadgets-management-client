import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, Package } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import LogoutButton from "@/components/auth/LogOutButton";
import { useGetMyProfileQuery } from "@/redux/features/userAPi";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AppFooter from "@/components/layout/AppFooter";
import HeroSection from "./HeroSection";

const Home = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetMyProfileQuery({});
  const userInfo = data?.data;

  return (
    <div className="min-h-screen dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white dark:text-gray-900" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Gadget Management System
              </h1>
            </div>
            {/*User Profile, Theme Toggle and Logout Button */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <>
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 mr-5  border-gray-300 border-t-gray-400 rounded-full animate-spin" />
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="w-8 h-8 cursor-pointer">
                            <AvatarImage src={userInfo?.image} />
                            <AvatarFallback className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                              {userInfo?.name?.slice(0, 2)?.toUpperCase() ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{userInfo?.email}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <LogoutButton /> {/* Logout Button Component */}
                </>
              ) : (
                <NavLink to="/login">
                  <Button variant="outline" className="cursor-pointer">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <HeroSection user={userInfo} />

      {/* Footer */}
      <AppFooter />
    </div>
  );
};

export default Home;
