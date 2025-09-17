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
  { title: "AI Feedback", url: "/ai-feedback", icon: Sparkles },
];

export function UserSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath.startsWith(path);

  return (
    <Sidebar
      collapsible="icon"
      className={`h-screen border-r border-sidebar-border bg-sidebar-background transition-all duration-300
        ${isCollapsed ? "w-24" : "w-64"}`}
    >
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4 flex items-center gap-2">
        <div className="w-9 h-9 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-lg tracking-tight text-sidebar-foreground">
            BrandFlo
          </span>
        )}
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="mt-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                      transition-colors
                      ${isActive(item.url)
                        ? "bg-gradient-primary text-white"
                        : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-accent"
                      }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
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