import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Bot,
  BarChart3,
  Globe
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Mock data for analytics
const usersByMSP = [
  { name: "Digital Marketing Pro", users: 45, revenue: 3550 },
  { name: "Creative Solutions Hub", users: 128, revenue: 9950 },
  { name: "Local Business Network", users: 12, revenue: 290 },
  { name: "Enterprise Marketing Suite", users: 256, revenue: 19900 },
  { name: "StartupFlo", users: 34, revenue: 2180 },
  { name: "Agency Network", users: 89, revenue: 6450 }
];

const monthlyRevenue = [
  { month: "Jan", revenue: 28500, msps: 12 },
  { month: "Feb", revenue: 32100, msps: 14 },
  { month: "Mar", revenue: 35800, msps: 15 },
  { month: "Apr", revenue: 38200, msps: 16 },
  { month: "May", revenue: 41900, msps: 18 },
  { month: "Jun", revenue: 45300, msps: 19 }
];

const aiUsageData = [
  { name: "Content Generation", value: 45, color: "#3B82F6" },
  { name: "Image Creation", value: 25, color: "#8B5CF6" },
  { name: "Caption Optimization", value: 20, color: "#10B981" },
  { name: "Hashtag Suggestions", value: 10, color: "#F59E0B" }
];

const topMSPs = [
  { 
    name: "Enterprise Marketing Suite", 
    users: 256, 
    revenue: 19900, 
    plan: "Enterprise",
    growth: "+12%",
    status: "active"
  },
  { 
    name: "Creative Solutions Hub", 
    users: 128, 
    revenue: 9950, 
    plan: "Enterprise",
    growth: "+8%",
    status: "active"
  },
  { 
    name: "Agency Network", 
    users: 89, 
    revenue: 6450, 
    plan: "Professional",
    growth: "+15%",
    status: "active"
  },
  { 
    name: "Digital Marketing Pro", 
    users: 45, 
    revenue: 3550, 
    plan: "Professional",
    growth: "+5%",
    status: "active"
  },
  { 
    name: "StartupFlo", 
    users: 34, 
    revenue: 2180, 
    plan: "Starter",
    growth: "+22%",
    status: "active"
  }
];

export function MSPAnalyticsDashboard() {
  const totalUsers = usersByMSP.reduce((sum, msp) => sum + msp.users, 0);
  const totalRevenue = usersByMSP.reduce((sum, msp) => sum + msp.revenue, 0);
  const totalMSPs = usersByMSP.length;
  const avgRevenuePerMSP = totalRevenue / totalMSPs;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">MSP Analytics</h1>
          <p className="text-muted-foreground">Overview of all MSP performance and usage metrics</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-soft rounded-xl">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total MSPs</p>
                <p className="text-2xl font-bold">{totalMSPs}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +16% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent-soft rounded-xl">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +24% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success-soft rounded-xl">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning-soft rounded-xl">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Revenue/MSP</p>
                <p className="text-2xl font-bold">${Math.round(avgRevenuePerMSP).toLocaleString()}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users by MSP Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Users by MSP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersByMSP}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Usage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Model Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={aiUsageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {aiUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing MSPs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Top Performing MSPs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMSPs.map((msp, index) => (
                <div key={msp.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-lg font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{msp.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {msp.users} users
                        <Badge variant="outline" className="ml-2">{msp.plan}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${msp.revenue.toLocaleString()}</p>
                    <p className="text-sm text-success">{msp.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}