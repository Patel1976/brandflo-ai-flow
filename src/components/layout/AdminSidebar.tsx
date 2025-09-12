import { 
  Shield,
  Crown,
  Users,
  Database,
  Palette,
  Calendar,
  TestTube,
  BarChart3,
  Settings,
  Key,
  Lock,
  Building
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminItems = [
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "MSP Management", url: "/admin/msp", icon: Building },
  { title: "User & Brand Management", url: "/admin/users", icon: Users },
  { title: "Content Calendar", url: "/admin/calendar", icon: Calendar },
  { title: "A/B Test Manager", url: "/admin/ab-tests", icon: TestTube },
  { title: "Subscription Plans", url: "/admin/plans", icon: Database },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "API Integration", url: "/admin/api", icon: Key },
  { title: "Security & RBAC", url: "/admin/security", icon: Lock },
  { title: "Theme Customization", url: "/admin/themes", icon: Palette },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-sidebar-foreground">Admin Portal</span>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-amber-50/30 to-orange-50/30 dark:from-amber-950/10 dark:to-orange-950/10">
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-600 dark:text-amber-400">Admin Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="w-full hover:bg-amber-100 dark:hover:bg-amber-900/20"
                  >
                    <NavLink to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}