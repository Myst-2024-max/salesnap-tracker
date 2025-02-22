
import { Building2, ClipboardList, LayoutDashboard, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const { profile, signOut } = useAuth();
  const isAdmin = profile?.role === "admin";

  const items = [
    {
      title: isAdmin ? "Admin Dashboard" : "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    ...(isAdmin
      ? [
          {
            title: "Activity Logs",
            url: "/logs",
            icon: ClipboardList,
          },
        ]
      : [
          {
            title: "Check In/Out",
            url: "/checkin",
            icon: Building2,
          },
        ]),
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold text-gray-900">SalesTrack</h1>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  onClick={signOut}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
