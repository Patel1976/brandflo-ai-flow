import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { UserSidebar } from "./UserSidebar";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Routes that should show user sidebar
  const userSidebarRoutes = [
    "/dashboard",
    "/calendar", 
    "/create",
    "/ab-testing",
    "/brand-voice",
    "/regional",
    "/platform-optimizer",
    "/analytics",
    "/settings"
  ];

  // Routes that should show admin sidebar
  const adminSidebarRoutes = currentPath.startsWith("/admin");

  // Routes that should have no sidebar (landing, login, plan selection, etc.)
  const noSidebarRoutes = [
    "/",
    "/login", 
    "/plan-selection",
    "/guided-setup"
  ];

  const shouldShowUserSidebar = userSidebarRoutes.includes(currentPath);
  const shouldShowAdminSidebar = adminSidebarRoutes;
  const shouldShowNoSidebar = noSidebarRoutes.includes(currentPath) || currentPath === "/404";

  // No sidebar layout
  if (shouldShowNoSidebar) {
    return <>{children}</>;
  }

  // Admin sidebar layout
  if (shouldShowAdminSidebar) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminSidebar />
          <SidebarInset className="flex-1">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  // User sidebar layout (default for authenticated routes)
  if (shouldShowUserSidebar) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <UserSidebar />
          <SidebarInset className="flex-1">
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  // Fallback to no sidebar
  return <>{children}</>;
}