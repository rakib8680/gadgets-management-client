import {
  Home,
  ChartNoAxesCombined,
  Boxes,
  PlusCircle,
  Package,
  History,
  Settings,
  UsersIcon,
} from "lucide-react";
import { useLocation, NavLink } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Menu items.
const items = [
  {
    title: "Analytics",
    url: "analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "All Gadgets",
    url: "gadgets",
    icon: Boxes,
  },
  {
    title: "Add Gadget",
    url: "gadgets/add",
    icon: PlusCircle,
  },
  {
    title: "My Gadgets",
    url: "my-gadgets",
    icon: Package,
  },
  {
    title: "Sales History",
    url: "sales-history",
    icon: History,
  },
  {
    title: "All Users",
    url: "all-users",
    icon: UsersIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;
  const email = user?.email;

  // Filter menu items based on role
  const filteredItems =
    role === "seller"
      ? items.filter(
          (item) => item.title !== "Analytics" && item.title !== "All Users"
        )
      : items.filter((item) => item.title !== "My Gadgets"); //for admin, removed My Gadgets

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-5 mb-7">
            <div className="flex items-center space-x-3 my-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  Gadget Management
                </h4>
                {/* Display role and email */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h5
                      className={
                        role === "admin"
                          ? "border border-red-200 hover:bg-red-400 hover:text-white transition-all  duration-300 w-fit px-3 rounded-full text-red-600"
                          : " border border-blue-200 hover:bg-blue-200 hover:text-black transition-all  duration-300 w-fit px-3 rounded-full text-blue-600"
                      }
                    >
                      {role === "admin" ? "Admin" : "Seller"}
                    </h5>
                  </TooltipTrigger>
                  <TooltipContent className="ms-2">
                    <div className="text-sm ">
                      {role === "admin"
                        ? "You have full access to manage inventory."
                        : "You can add and manage your own gadgets."}
                      <br />
                      <span className="font-semibold">Email:</span> {email}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === `/dashboard/${item.url}`}
                    className="text-base"
                  >
                    <NavLink to={item.url} style={{ textDecoration: "none" }}>
                      <item.icon className="!w-5 !h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Home button at the bottom */}
        <div className="ms-2 mt-2 ">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/">
                  <Home className="!w-5 !h-5" />
                  <span className="text-base">Home</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
