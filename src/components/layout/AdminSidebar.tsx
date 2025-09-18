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
  Building,
  ChevronDown
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const adminItems = [
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "User & Brand Management", url: "/admin/users", icon: Users },
  { title: "Content Calendar", url: "/admin/calendar", icon: Calendar },
  { title: "A/B Test Manager", url: "/admin/ab-tests", icon: TestTube },
  { title: "Subscription Plans", url: "/admin/plans", icon: Database },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "API Integration", url: "/admin/api", icon: Key },
  { title: "Security & RBAC", url: "/admin/security", icon: Lock },
  { title: "Theme Customization", url: "/admin/themes", icon: Palette },
];

const mspManagementItems = [
  { title: "MSP Onboarding", url: "/admin/msp/onboarding", icon: Building },
  { title: "Manage MSPs", url: "/admin/msp/manage", icon: Users },
  { title: "MSP Analytics", url: "/admin/msp/analytics", icon: BarChart3 },
];

const platformManagementItems = [
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Brand Management", url: "/admin/brands", icon: Building },
  { title: "Content Calendar", url: "/admin/content-calendar", icon: Calendar },
  { title: "A/B Test Manager", url: "/admin/ab-tests", icon: TestTube },
  { title: "Subscription Plans", url: "/admin/subscription-plans", icon: Database },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMSPOpen, setIsMSPOpen] = useState(currentPath.startsWith("/admin/msp"));
  
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const isMSPActive = currentPath.startsWith("/admin/msp");

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

      <SidebarContent className="bg-gradient-to-b from-primary-soft/30 to-accent-soft/30 dark:from-primary/10 dark:to-accent/10">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary dark:text-primary">Admin Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="w-full hover:bg-primary-soft dark:hover:bg-primary/20"
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

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary dark:text-primary">MSP Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Collapsible open={isMSPOpen} onOpenChange={setIsMSPOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      className={`w-full hover:bg-primary-soft dark:hover:bg-primary/20 ${isMSPActive ? 'bg-primary-soft text-primary dark:bg-primary/20' : ''}`}
                    >
                      <Building className="w-4 h-4" />
                      {!isCollapsed && (
                        <>
                          <span>MSP Management</span>
                          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isMSPOpen ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!isCollapsed && (
                    <CollapsibleContent className="pl-4">
                      <SidebarMenu>
                        {mspManagementItems.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton 
                              asChild 
                              isActive={isActive(item.url)}
                              className="w-full hover:bg-primary-soft dark:hover:bg-primary/20 text-sm"
                            >
                              <NavLink to={item.url} className="flex items-center gap-2">
                                <item.icon className="w-3 h-3" />
                                <span>{item.title}</span>
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary dark:text-primary">Platform Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="w-full hover:bg-primary-soft dark:hover:bg-primary/20"
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