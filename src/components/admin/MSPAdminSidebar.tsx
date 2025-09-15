import { 
  Users,
  Calendar,
  BarChart3,
  Settings,
  Search,
  Bell,
  LogOut,
  Building2,
  Sparkles
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
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mspAdminItems = [
  { title: "MSP Dashboard", url: "/msp", icon: BarChart3 },
  { title: "User Management", url: "/msp/users", icon: Users },
  { title: "Brand Management", url: "/msp/brands", icon: Building2 },
  { title: "Content Calendar", url: "/msp/calendar", icon: Calendar },
  { title: "Analytics", url: "/msp/analytics", icon: BarChart3 },
  { title: "Settings", url: "/msp/settings", icon: Settings },
];

export function MSPAdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex h-screen bg-msp-surface">
      <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="offcanvas">
        <SidebarHeader className="border-b border-msp-border bg-gradient-msp">
          <div className="flex items-center gap-2 px-4 py-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg text-white">MSP Portal</span>
            )}
          </div>
          <SidebarTrigger className="ml-auto text-white hover:bg-white/10" />
        </SidebarHeader>

        <SidebarContent className="bg-msp-surface">
          <SidebarGroup>
            <SidebarGroupLabel className="text-msp-primary font-semibold px-4 py-2">
              MSP Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2">
                {mspAdminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.url)}
                      className={`w-full rounded-lg transition-all duration-200 ${
                        isActive(item.url)
                          ? "bg-msp-primary text-white shadow-msp" 
                          : "text-msp-primary hover:bg-msp-secondary/50"
                      }`}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="w-4 h-4" />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="border-b border-msp-border bg-msp-surface sticky top-0 z-40 shadow-soft">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-msp rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-msp-primary">TechAgency Pro Portal</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Global Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users, brands..." 
                  className="pl-10 w-80 bg-msp-secondary/50 border-msp-border"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative text-msp-primary hover:bg-msp-secondary/50">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-msp-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">1</span>
                </span>
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="text-msp-primary hover:bg-msp-secondary/50">
                <Settings className="w-5 h-5" />
              </Button>

              {/* Profile */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-msp-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">TA</span>
                </div>
                <Button variant="ghost" size="icon" className="text-msp-primary hover:bg-msp-secondary/50">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-msp-secondary/20">
          {/* Content will be rendered here by the route */}
        </main>
      </div>
    </div>
  );
}