import {
  Home,
  ChartNoAxesCombined,
  Boxes,
  PlusCircle,
  Package,
  History,
} from "lucide-react";
import { useLocation, NavLink } from "react-router-dom";

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
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === `/dashboard/${item.url}`}
                  >
                    <NavLink to={item.url} style={{ textDecoration: "none" }}>
                      <item.icon />
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
                  <Home />
                  <span>Home</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
