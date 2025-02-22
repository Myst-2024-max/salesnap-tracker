
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Link } from "react-router-dom";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <SidebarTrigger className="lg:hidden mb-4" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
