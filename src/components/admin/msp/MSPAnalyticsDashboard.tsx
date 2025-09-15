import { KPICard } from "../KPICard";
import { DashboardChart } from "../DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Sparkles,
  BarChart3,
  PieChart,
  Calendar
} from "lucide-react";

const kpiData = [
  {
    title: "Total Revenue",
    value: "$12,847",
    change: "+23% vs last month",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Total Users",
    value: "347",
    change: "+45 this month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "AI API Calls",
    value: "18.2K",
    change: "+8% vs last month",
    changeType: "positive" as const,
    icon: Sparkles,
  },
  {
    title: "Active MSPs",
    value: "8",
    change: "89% uptime rate",
    changeType: "positive" as const,
    icon: Building2,
  },
];

const mspPerformanceData = [
  { name: "TechAgency Pro", users: 45, revenue: 99, aiCalls: 1240, status: "active" },
  { name: "Creative Digital", users: 78, revenue: 199, aiCalls: 2890, status: "active" },
  { name: "Marketing Hub", users: 12, revenue: 49, aiCalls: 340, status: "suspended" },
  { name: "Digital Solutions", users: 56, revenue: 149, aiCalls: 1890, status: "active" },
  { name: "Brand Builders", users: 34, revenue: 99, aiCalls: 980, status: "active" },
];

const revenueGrowthData = [
  { month: "Jan", revenue: 8500 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 10800 },
  { month: "Apr", revenue: 12100 },
  { month: "May", revenue: 12847 },
];

export function MSPAnalyticsDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-500 text-white">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            variant="admin"
            {...kpi}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Revenue Growth Trend"
          description="Monthly revenue across all MSPs"
          variant="admin"
        />
        <DashboardChart
          title="User Distribution by MSP"
          description="Total users per MSP"
          variant="admin"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="AI Model Usage"
          description="Breakdown of AI API calls by model"
          variant="admin"
        />
        <DashboardChart
          title="Platform Activity"
          description="Posts created, campaigns launched"
          variant="admin"
        />
      </div>

      {/* MSP Performance Table */}
      <Card className="bg-admin-surface border-admin-border">
        <CardHeader>
          <CardTitle className="text-admin-primary flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            MSP Performance Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-admin-border">
                <TableHead className="text-admin-primary">Rank</TableHead>
                <TableHead className="text-admin-primary">MSP Name</TableHead>
                <TableHead className="text-admin-primary">Status</TableHead>
                <TableHead className="text-admin-primary">Users</TableHead>
                <TableHead className="text-admin-primary">Revenue</TableHead>
                <TableHead className="text-admin-primary">AI Calls</TableHead>
                <TableHead className="text-admin-primary">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mspPerformanceData
                .sort((a, b) => b.revenue - a.revenue)
                .map((msp, index) => (
                  <TableRow key={msp.name} className="border-admin-border hover:bg-admin-secondary/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-admin-primary">#{index + 1}</span>
                        {index === 0 && <span className="text-yellow-500">🏆</span>}
                        {index === 1 && <span className="text-gray-400">🥈</span>}
                        {index === 2 && <span className="text-amber-600">🥉</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-admin-primary rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-admin-primary">{msp.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(msp.status)}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{msp.users}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${msp.revenue}/mo</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{msp.aiCalls.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-admin-secondary/50 rounded-full h-2">
                          <div 
                            className="bg-admin-primary h-2 rounded-full" 
                            style={{ width: `${Math.min((msp.revenue / 200) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((msp.revenue / 200) * 100)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Usage Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-admin-surface border-admin-border">
          <CardHeader>
            <CardTitle className="text-admin-primary flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5" />
              Peak Usage Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">9:00 AM - 11:00 AM</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-admin-secondary/50 rounded-full h-2">
                    <div className="bg-admin-primary h-2 rounded-full" style={{ width: "85%" }} />
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-admin-secondary/50 rounded-full h-2">
                    <div className="bg-admin-primary h-2 rounded-full" style={{ width: "72%" }} />
                  </div>
                  <span className="text-sm font-medium">72%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">6:00 PM - 8:00 PM</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-admin-secondary/50 rounded-full h-2">
                    <div className="bg-admin-primary h-2 rounded-full" style={{ width: "58%" }} />
                  </div>
                  <span className="text-sm font-medium">58%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-admin-surface border-admin-border">
          <CardHeader>
            <CardTitle className="text-admin-primary flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monthly Growth</span>
                <span className="text-lg font-bold text-green-500">+23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">User Retention</span>
                <span className="text-lg font-bold text-admin-primary">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Churn Rate</span>
                <span className="text-lg font-bold text-red-500">6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-admin-surface border-admin-border">
          <CardHeader>
            <CardTitle className="text-admin-primary flex items-center gap-2 text-lg">
              <PieChart className="w-5 h-5" />
              Plan Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Enterprise</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">2 MSPs</span>
                  <Badge className="bg-admin-accent text-white">40%</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Professional</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">2 MSPs</span>
                  <Badge className="bg-admin-primary text-white">40%</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Starter</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">1 MSP</span>
                  <Badge variant="secondary">20%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}