import { Button } from "@/components/ui/button";
import { getDashboardPath } from "@/utils/routeUtils";
import { TUserInfo } from "@/types/auth";
import { LayoutDashboard, Package, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";

type THeroSectionProps = {
  user: TUserInfo | undefined;
};

const HeroSection = ({ user }: THeroSectionProps) => {
  return (
    <div className=" bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-155px)]">
          <div className="text-center max-w-2xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {user?.name
                  ? `Welcome, ${user.name}!`
                  : "Welcome To Gadget Management System"}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Manage your gadgets efficiently with our comprehensive
                management platform.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <NavLink to={getDashboardPath(user?.role)}>
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-primary dark:hover:bg-primary/90 px-8 py-3 text-lg cursor-pointer w-full sm:w-auto"
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </NavLink>
              <NavLink to="/settings">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg cursor-pointer w-full sm:w-auto"
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
  );
};

export default HeroSection;
