import { 
  Calendar, 
  BarChart3, 
  Plus, 
  TestTube, 
  Mic, 
  Target, 
  Settings, 
  Sparkles,
  Home,
  Zap
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

const userItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Content Calendar", url: "/calendar", icon: Calendar },
  { title: "Create Post", url: "/create", icon: Plus },
  { title: "A/B Testing", url: "/ab-testing", icon: TestTube },
  { title: "Brand Voice", url: "/brand-voice", icon: Mic },
  { title: "Regional Targeting", url: "/regional", icon: Target },
  { title: "Platform Optimizer", url: "/platform-optimizer", icon: Zap },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function UserSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath.startsWith(path);

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl text-sidebar-foreground">BrandFlo</span>
          )}
          {/* <SidebarTrigger className="ml-auto" /> */}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="w-full"
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