import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  CreditCard, 
  BarChart3,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  Calendar,
  AlertTriangle
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-card-border bg-background sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">BrandFlo Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <Button variant="ghost" size="icon">
              <div className="w-8 h-8 bg-destructive-soft rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-destructive">AD</span>
              </div>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Admin Overview */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform usage, manage users, and track system performance.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-success">
                +15.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active MSPs</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">284</div>
              <p className="text-xs text-success">
                +8.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$847K</div>
              <p className="text-xs text-success">
                +23.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Posts Generated</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4M</div>
              <p className="text-xs text-success">
                +18.7% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Platform Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Platform Usage Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-soft rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto" />
                    <p className="text-muted-foreground">Usage analytics chart will go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: "New MSP registered", detail: "TechAgency Pro", time: "2 hours ago", type: "success" },
                  { action: "User upgraded plan", detail: "BasicUser123 → Premium", time: "4 hours ago", type: "info" },
                  { action: "API rate limit reached", detail: "MSP: DigitalMarketing Inc.", time: "6 hours ago", type: "warning" },
                  { action: "Failed payment", detail: "User subscription renewal", time: "8 hours ago", type: "error" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-success' :
                      activity.type === 'info' ? 'bg-primary' :
                      activity.type === 'warning' ? 'bg-warning' : 'bg-destructive'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Admin Tools */}
          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Quick Admin Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Building className="w-4 h-4" />
                  MSP Management
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <CreditCard className="w-4 h-4" />
                  Billing Overview
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" />
                  System Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response Time</span>
                    <span className="text-sm font-medium text-success">142ms</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-success h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Load</span>
                    <span className="text-sm font-medium text-warning">67%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-warning h-2 rounded-full w-[67%]"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Storage Usage</span>
                    <span className="text-sm font-medium text-primary">45%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full w-[45%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive-soft">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="font-semibold text-destructive">System Alert</h3>
                </div>
                <p className="text-sm text-destructive">
                  3 MSPs are approaching their API rate limits. Consider reviewing their usage patterns.
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  Review Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}