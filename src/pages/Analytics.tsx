import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageCircle,
  Share,
  Users,
  TestTube,
  Calendar,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";

const mockEngagementData = [
  { week: "Week 1", engagement: 4.2, reach: 12500, followers: 1234 },
  { week: "Week 2", engagement: 5.8, reach: 15200, followers: 1267 },
  { week: "Week 3", engagement: 3.9, reach: 11800, followers: 1245 },
  { week: "Week 4", engagement: 6.7, reach: 18900, followers: 1289 },
];

const mockABTests = [
  { 
    name: "Holiday Campaign", 
    winner: "Variant B", 
    improvement: "+23%",
    status: "completed",
    metric: "CTR"
  },
  { 
    name: "Product Launch", 
    winner: "Variant A", 
    improvement: "+15%",
    status: "completed",
    metric: "Engagement"
  },
  { 
    name: "Spring Sale", 
    winner: "TBD", 
    improvement: "",
    status: "running",
    metric: "Conversions"
  },
];

const mockBrands = [
  { name: "TechStartup Co", engagement: 5.2, reach: 15400, posts: 24 },
  { name: "Fashion Brand", engagement: 7.8, reach: 28900, posts: 31 },
  { name: "Food Delivery", engagement: 4.1, reach: 12100, posts: 19 },
];

export default function Analytics() {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-card-border bg-background sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground">Track performance across all your social media campaigns</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="tech">TechStartup Co</SelectItem>
                <SelectItem value="fashion">Fashion Brand</SelectItem>
                <SelectItem value="food">Food Delivery</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58.4K</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.9%</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Follower Growth</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+187</div>
              <div className="flex items-center text-xs text-destructive">
                <TrendingDown className="w-3 h-3 mr-1" />
                -3.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Published</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">74</div>
              <div className="flex items-center text-xs text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.7% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full lg:w-[600px] grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="ab-tests">A/B Tests</TabsTrigger>
            <TabsTrigger value="brands">Brand Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Engagement Chart */}
              <Card className="lg:col-span-2 border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Engagement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-soft rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <TrendingUp className="w-12 h-12 text-primary mx-auto" />
                      <div>
                        <p className="font-medium">Interactive Chart</p>
                        <p className="text-sm text-muted-foreground">Engagement rate over time visualization</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Posts */}
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Top Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { content: "Summer sale announcement", engagement: "8.2%", reach: "15.4K" },
                    { content: "Behind the scenes video", engagement: "7.9%", reach: "12.1K" },
                    { content: "Customer testimonial", engagement: "6.8%", reach: "9.8K" }
                  ].map((post, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg space-y-2">
                      <p className="text-sm font-medium line-clamp-2">{post.content}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Engagement: {post.engagement}</span>
                        <span>Reach: {post.reach}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Engagement Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Likes", count: "24.5K", icon: Heart, color: "text-pink-500" },
                      { type: "Comments", count: "3.2K", icon: MessageCircle, color: "text-blue-500" },
                      { type: "Shares", count: "1.8K", icon: Share, color: "text-green-500" },
                      { type: "Saves", count: "892", icon: Target, color: "text-purple-500" }
                    ].map((metric) => (
                      <div key={metric.type} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                          <span className="font-medium">{metric.type}</span>
                        </div>
                        <span className="font-bold">{metric.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-soft rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <PieChart className="w-12 h-12 text-primary mx-auto" />
                      <p className="text-muted-foreground">Platform breakdown chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ab-tests" className="space-y-6">
            <Card className="border-card-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  A/B Test Performance
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All Tests
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockABTests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-muted-foreground">Testing {test.metric}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={test.status === "completed" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {test.status}
                        </Badge>
                        {test.winner !== "TBD" && (
                          <div className="text-right">
                            <p className="text-sm font-medium">{test.winner} won</p>
                            <p className="text-xs text-success">{test.improvement}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brands" className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Brand Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBrands.map((brand, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{brand.name}</h4>
                        <span className="text-sm text-muted-foreground">{brand.posts} posts</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Engagement Rate</span>
                          <p className="font-medium">{brand.engagement}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Reach</span>
                          <p className="font-medium">{brand.reach.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}