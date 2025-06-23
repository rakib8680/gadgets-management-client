import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Package, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Gadget Management System
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gray-200 text-gray-700">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center max-w-2xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome To Gadget Management System
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Manage your gadgets efficiently with our comprehensive
                management platform.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <NavLink to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg cursor-pointer"
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </NavLink>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg"
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
            </div>

            {/* Simple Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Inventory
                </h3>
                <p className="text-gray-600 text-sm">
                  Manage and track all your gadgets in one place
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Users
                </h3>
                <p className="text-gray-600 text-sm">
                  Control user access and permissions
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Settings
                </h3>
                <p className="text-gray-600 text-sm">
                  Configure system preferences and options
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>© 2024 Gadget Management System. All rights reserved.</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
