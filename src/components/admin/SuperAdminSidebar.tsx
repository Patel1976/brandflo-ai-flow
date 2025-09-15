import { 
  Shield,
  Crown,
  Users,
  Building,
  Database,
  Palette,
  Calendar,
  TestTube,
  BarChart3,
  Settings,
  Key,
  Lock,
  Search,
  Bell,
  LogOut,
  Plus,
  UserPlus,
  TrendingUp,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const superAdminItems = [
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
  { title: "MSP Onboarding", url: "/admin/msp/onboarding", icon: UserPlus },
  { title: "Manage MSPs", url: "/admin/msp/manage", icon: Building },
  { title: "MSP Analytics", url: "/admin/msp/analytics", icon: TrendingUp },
];

export function SuperAdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [mspGroupOpen, setMspGroupOpen] = useState(currentPath.startsWith("/admin/msp"));
  
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const isMspSectionActive = currentPath.startsWith("/admin/msp");

  return (
    <div className="flex h-screen bg-admin-surface">
      <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="offcanvas">
        <SidebarHeader className="border-b border-admin-border bg-gradient-admin">
          <div className="flex items-center gap-2 px-4 py-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Crown className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg text-white">Super Admin</span>
            )}
          </div>
          <SidebarTrigger className="ml-auto text-white hover:bg-white/10" />
        </SidebarHeader>

        <SidebarContent className="bg-admin-surface">
          <SidebarGroup>
            <SidebarGroupLabel className="text-admin-primary font-semibold px-4 py-2">
              Platform Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {superAdminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      className={`w-full rounded-lg transition-all duration-200 ${
                        isActive(item.url)
                          ? "bg-admin-primary text-white shadow-admin" 
                          : "text-admin-primary hover:bg-admin-secondary/50"
                      }`}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="w-4 h-4" />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                {/* MSP Management Collapsible Group */}
                <SidebarMenuItem>
                  <Collapsible open={mspGroupOpen} onOpenChange={setMspGroupOpen}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className={`w-full rounded-lg transition-all duration-200 ${
                          isMspSectionActive
                            ? "bg-admin-primary text-white shadow-admin" 
                            : "text-admin-primary hover:bg-admin-secondary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3 px-3 py-2 w-full">
                          <Building className="w-4 h-4" />
                          {!isCollapsed && (
                            <>
                              <span className="font-medium flex-1">MSP Management</span>
                              {mspGroupOpen ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-4 mt-1">
                          {mspManagementItems.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={isActive(item.url)}
                                className={`rounded-lg transition-all duration-200 ${
                                  isActive(item.url)
                                    ? "bg-admin-accent text-white" 
                                    : "text-admin-primary/80 hover:bg-admin-secondary/30"
                                }`}
                              >
                                <NavLink to={item.url} className="flex items-center gap-3 px-3 py-1.5">
                                  <item.icon className="w-3.5 h-3.5" />
                                  <span className="font-medium text-sm">{item.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="border-b border-admin-border bg-admin-surface sticky top-0 z-40 shadow-soft">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-admin rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-admin-primary">BrandFlo Super Admin</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Global Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users, MSPs..." 
                  className="pl-10 w-80 bg-admin-secondary/50 border-admin-border"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative text-admin-primary hover:bg-admin-secondary/50">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </span>
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="text-admin-primary hover:bg-admin-secondary/50">
                <Settings className="w-5 h-5" />
              </Button>

              {/* Profile */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-admin-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">SA</span>
                </div>
                <Button variant="ghost" size="icon" className="text-admin-primary hover:bg-admin-secondary/50">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-admin-secondary/20">
          {/* Content will be rendered here by the route */}
        </main>
      </div>
    </div>
  );
}