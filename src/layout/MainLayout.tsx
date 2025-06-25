import LogoutButton from "@/components/auth/LogOutButton";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <SidebarProvider>
      {/*LogOut Button Component  */}
      <div className="absolute right-10 top-8">
        <LogoutButton />
      </div>

      {/* Main Layout with Sidebar and Outlet for nested routes */}
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <SidebarTrigger className="m-2" />
          <main className="flex-1 p-4">
            {/* children here  */}
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
