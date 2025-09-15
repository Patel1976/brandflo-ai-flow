import { KPICard } from "@/components/admin/KPICard";
import { DashboardChart } from "@/components/admin/DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building, 
  CreditCard, 
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Activity,
  Plus,
  MoreHorizontal
} from "lucide-react";

export default function SuperAdminDashboard() {
  const kpiData = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+15.2% from last month",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Active MSPs",
      value: "284",
      change: "+8.1% from last month", 
      changeType: "positive" as const,
      icon: Building
    },
    {
      title: "Monthly Revenue",
      value: "$847K",
      change: "+23.5% from last month",
      changeType: "positive" as const,
      icon: CreditCard
    },
    {
      title: "AI Posts Generated",
      value: "2.4M",
      change: "+18.7% from last month",
      changeType: "positive" as const,
      icon: Sparkles
    }
  ];

  const recentActivity = [
    {
      action: "New MSP registered",
      detail: "TechAgency Pro completed onboarding",
      time: "2 hours ago",
      type: "success",
      severity: "low"
    },
    {
      action: "User upgraded plan",
      detail: "BasicUser123 → Premium Plan",
      time: "4 hours ago", 
      type: "info",
      severity: "low"
    },
    {
      action: "API rate limit reached",
      detail: "DigitalMarketing Inc. (95% of limit)",
      time: "6 hours ago",
      type: "warning",
      severity: "medium"
    },
    {
      action: "Failed payment",
      detail: "User subscription renewal failed",
      time: "8 hours ago",
      type: "error",
      severity: "high"
    }
  ];

  const systemMetrics = [
    { label: "API Response Time", value: "142ms", percentage: 85, status: "good" },
    { label: "Database Load", value: "67%", percentage: 67, status: "warning" },
    { label: "Storage Usage", value: "45%", percentage: 45, status: "good" },
    { label: "Active Sessions", value: "2,847", percentage: 72, status: "good" }
  ];

  return (
    <div className="p-6 space-y-8 bg-admin-secondary/10 min-h-screen">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-admin-primary">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor platform performance, manage MSPs, and oversee system operations.
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
            variant="admin"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardChart
            title="Platform Growth Analytics"
            description="User acquisition, revenue trends, and platform usage over time"
            variant="admin"
          />

          {/* Recent Activity */}
          <Card className="bg-gradient-admin-card border-admin-border shadow-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-admin-primary">
                <Activity className="w-5 h-5" />
                Recent System Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-admin-border/30">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-admin-accent' :
                    activity.type === 'info' ? 'bg-admin-primary' :
                    activity.type === 'warning' ? 'bg-warning' : 'bg-destructive'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-admin-primary">{activity.action}</h4>
                      {activity.severity === 'high' && (
                        <Badge variant="destructive" className="text-xs">Critical</Badge>
                      )}
                      {activity.severity === 'medium' && (
                        <Badge variant="secondary" className="text-xs">Warning</Badge>
                      )}
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
          <Card className="bg-gradient-admin-card border-admin-border shadow-glass">
            <CardHeader>
              <CardTitle className="text-admin-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2 border-admin-border hover:bg-admin-secondary/30">
                <Plus className="w-4 h-4" />
                Add New MSP
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-admin-border hover:bg-admin-secondary/30">
                <Users className="w-4 h-4" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-admin-border hover:bg-admin-secondary/30">
                <CreditCard className="w-4 h-4" />
                Billing Overview
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-admin-border hover:bg-admin-secondary/30">
                <Building className="w-4 h-4" />
                MSP Analytics
              </Button>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="bg-gradient-admin-card border-admin-border shadow-glass">
            <CardHeader>
              <CardTitle className="text-admin-primary">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className={`text-sm font-medium ${
                      metric.status === 'good' ? 'text-admin-accent' :
                      metric.status === 'warning' ? 'text-warning' : 'text-destructive'
                    }`}>
                      {metric.value}
                    </span>
                  </div>
                  <div className="w-full bg-admin-secondary/30 h-2 rounded-full">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.status === 'good' ? 'bg-admin-accent' :
                        metric.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${metric.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="border-destructive/20 bg-destructive-soft shadow-glass">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-semibold text-destructive">Critical Alerts</h3>
              </div>
              <p className="text-sm text-destructive">
                3 MSPs are approaching their API rate limits. Immediate attention required.
              </p>
              <Button variant="destructive" size="sm" className="w-full">
                Review Critical Issues
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}