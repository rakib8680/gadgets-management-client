import LogoutButton from "@/components/auth/LogOutButton";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <SidebarProvider>
      {/*LogOut Button Component and Theme Toggle */}
      <div className="absolute right-14 top-8 flex items-center gap-3">
        <ThemeToggle />
        <LogoutButton />
      </div>

      {/* Main Layout with Sidebar and Outlet for nested routes */}
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="m-2" />
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
