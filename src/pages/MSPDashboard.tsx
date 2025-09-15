import { KPICard } from "@/components/admin/KPICard";
import { DashboardChart } from "@/components/admin/DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  Calendar, 
  Sparkles,
  TrendingUp,
  Activity,
  Plus,
  MoreHorizontal,
  Target
} from "lucide-react";

export default function MSPDashboard() {
  const kpiData = [
    {
      title: "Active Users",
      value: "127",
      change: "+12.3% from last month",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Managed Brands",
      value: "24",
      change: "+3 new this month", 
      changeType: "positive" as const,
      icon: Building2
    },
    {
      title: "Posts Scheduled",
      value: "1,847",
      change: "+28.5% from last month",
      changeType: "positive" as const,
      icon: Calendar
    },
    {
      title: "AI Generations",
      value: "12.4K",
      change: "+22.1% from last month",
      changeType: "positive" as const,
      icon: Sparkles
    }
  ];

  const recentActivity = [
    {
      action: "New user added",
      detail: "Sarah Johnson joined TechCorp brand",
      time: "1 hour ago",
      type: "success",
      brand: "TechCorp"
    },
    {
      action: "Campaign scheduled",
      detail: "Q4 Product Launch - 15 posts",
      time: "3 hours ago", 
      type: "info",
      brand: "RetailPlus"
    },
    {
      action: "A/B test completed",
      detail: "Engagement improved by 23%",
      time: "5 hours ago",
      type: "success",
      brand: "FitnessPro"
    },
    {
      action: "User plan upgraded",
      detail: "TechCorp upgraded to Premium",
      time: "1 day ago",
      type: "info",
      brand: "TechCorp"
    }
  ];

  const topBrands = [
    { name: "TechCorp", users: 24, posts: 156, engagement: "+15.2%" },
    { name: "RetailPlus", users: 18, posts: 89, engagement: "+8.7%" },
    { name: "FitnessPro", users: 12, posts: 67, engagement: "+23.1%" },
    { name: "FoodieDelight", users: 8, posts: 45, engagement: "+12.4%" }
  ];

  return (
    <div className="p-6 space-y-8 bg-msp-secondary/10 min-h-screen">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-msp-primary">MSP Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your clients, track performance, and oversee brand campaigns.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            variant="msp"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardChart
            title="Client Performance Analytics"
            description="User engagement, content performance, and brand growth metrics"
            variant="msp"
          />

          {/* Recent Activity */}
          <Card className="bg-gradient-msp-card border-msp-border shadow-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-msp-primary">
                <Activity className="w-5 h-5" />
                Recent Client Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-msp-border/30">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-msp-accent' :
                    activity.type === 'info' ? 'bg-msp-primary' : 'bg-warning'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-msp-primary">{activity.action}</h4>
                      <Badge variant="outline" className="text-xs border-msp-border">
                        {activity.brand}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions & Metrics */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gradient-msp-card border-msp-border shadow-glass">
            <CardHeader>
              <CardTitle className="text-msp-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2 border-msp-border hover:bg-msp-secondary/30">
                <Plus className="w-4 h-4" />
                Add New Brand
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-msp-border hover:bg-msp-secondary/30">
                <Users className="w-4 h-4" />
                Invite Users
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-msp-border hover:bg-msp-secondary/30">
                <Calendar className="w-4 h-4" />
                Schedule Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-msp-border hover:bg-msp-secondary/30">
                <Target className="w-4 h-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Top Performing Brands */}
          <Card className="bg-gradient-msp-card border-msp-border shadow-glass">
            <CardHeader>
              <CardTitle className="text-msp-primary">Top Performing Brands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topBrands.map((brand, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-msp-border/20">
                  <div>
                    <h4 className="font-medium text-msp-primary">{brand.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {brand.users} users • {brand.posts} posts
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-msp-accent">{brand.engagement}</p>
                    <p className="text-xs text-muted-foreground">engagement</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="bg-gradient-msp-card border-msp-border shadow-glass">
            <CardHeader>
              <CardTitle className="text-msp-primary">This Month Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Content Created</span>
                <span className="font-medium text-msp-primary">387 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Engagement</span>
                <span className="font-medium text-msp-accent">+18.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">A/B Tests Run</span>
                <span className="font-medium text-msp-primary">12 tests</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Client Satisfaction</span>
                <span className="font-medium text-msp-accent">94%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}