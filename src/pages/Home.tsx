import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogIn, Package, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import LogoutButton from "@/components/auth/LogOutButton";
import { useGetMyProfileQuery } from "@/redux/features/userAPi";
import { getDashboardPath } from "@/utils/routeUtils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-300 cursor-pointer dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
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
      <div className=" bg-gray-50 dark:bg-gray-950">
        <main className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-155px)]">
            <div className="text-center max-w-2xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {user && userInfo?.name
                    ? `Welcome, ${userInfo.name}!`
                    : "Welcome To Gadget Management System"}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Manage your gadgets efficiently with our comprehensive
                  management platform.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <NavLink to={getDashboardPath(userInfo?.role)}>
                  <Button
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-primary dark:hover:bg-primary/90 px-8 py-3 text-lg cursor-pointer"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2" />
                    Go to Dashboard
                  </Button>
                </NavLink>
                <NavLink to="/settings">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 px-8 py-3 text-lg cursor-pointer"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </Button>
                </NavLink>
              </div>

              {/* Simple Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Inventory
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Manage and track all your gadgets in one place
                  </p>
                </div>

                <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Users
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Control user access and permissions
                  </p>
                </div>

                <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Settings
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Configure system preferences and options
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 mt-auto ">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 Gadget Management System. All rights reserved.</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
