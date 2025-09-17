import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  TrendingUp,
  Calendar,
  Plus,
  ChevronDown,
  Sparkles,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Settings
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const totalTokens = 200;
  const usedTokens = 156;
  const usagePercent = (usedTokens / totalTokens) * 100;
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4 sm:space-y-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Good morning, Sarah! 👋</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your social media today.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex items-center gap-2" onClick={() => navigate("/create")}>
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2" onClick={() => navigate("/calendar")}>
              <Calendar className="w-4 h-4" />
              Calendar
            </Button>
          </div>
        </div>

        {/* ✅ Plan Usage Reminder Section */}
        <Card className="border-card-border">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Plan Usage</h3>
                <p className="text-sm text-muted-foreground">
                  {usedTokens} of {totalTokens} AI credits used this month
                </p>
              </div>
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </div>

            {/* Progress Bar */}
            <Progress value={usagePercent} className="h-2" />

            <p className="text-xs text-muted-foreground text-right">
              {Math.round(usagePercent)}% used
            </p>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4M</div>
              <p className="text-xs text-success">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8%</div>
              <p className="text-xs text-success">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Credits Used</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                of 200 this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Campaigns */}
          <Card className="lg:col-span-2 border border-gray-200 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-700" />
                <CardTitle className="text-lg font-semibold">Recent Campaigns</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Stay updated on your latest marketing campaigns
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "Spring Collection Teasers",
                  posts: 15,
                  engagement: "6.8%",
                  platforms: ["Instagram", "TikTok"],
                  status: "Active",
                  statusColor: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
                },
                {
                  name: "Product Feedback Poll",
                  posts: 5,
                  engagement: "4.3%",
                  platforms: ["Twitter", "Facebook"],
                  status: "Scheduled",
                  statusColor: "bg-gray-100 text-gray-800",
                },
                {
                  name: "Valentine's Day Sale",
                  posts: 10,
                  engagement: "8.1%",
                  platforms: ["Instagram", "Pinterest"],
                  status: "Draft",
                  statusColor: "bg-gray-100 text-gray-800",
                },
              ].map((campaign, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border border-gray-100 p-4 rounded-xl hover:shadow-sm transition"
                >
                  <div>
                    <h4 className="font-medium">{campaign.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {campaign.posts} posts • Engagement: {campaign.engagement}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {campaign.platforms.map((p, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${campaign.statusColor}`}
                  >
                    {campaign.status}
                  </span>
                </div>
              ))}
              <button className="w-full py-2 mt-2 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-sm">
                View All Campaigns
              </button>
            </CardContent>
          </Card>

          {/* Upcoming Posts */}
          <Card className="border border-gray-200 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-700" />
                <CardTitle className="text-lg font-semibold">Upcoming Posts</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Your scheduled social media posts
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  platform: "Instagram",
                  text: "New reel dropping: Behind the scenes of our Spring Collection 🌸",
                  time: "Today, 5:00 PM",
                  status: "scheduled",
                },
                {
                  platform: "Facebook",
                  text: "Vote now! Which product color should we launch next? 🎨",
                  time: "Tomorrow, 1:00 PM",
                  status: "scheduled",
                },
                {
                  platform: "LinkedIn",
                  text: "Sharing insights: How we scaled our business in 2025 🚀",
                  time: "Mar 20, 11:00 AM",
                  status: "draft",
                },
              ].map((post, i) => (
                <div
                  key={i}
                  className="border border-gray-100 p-4 rounded-xl hover:shadow-sm transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-700">
                      {post.platform}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${post.status === "scheduled"
                          ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{post.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{post.time}</p>
                </div>
              ))}
              <button className="w-full py-2 mt-2 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-sm" onClick={() => navigate("/calendar")}>
                View Full Calendar
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section (Bottom of Dashboard) */}
        <Card className="border-card-border mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Streamline your workflow with these shortcuts
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/create")}>
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/calendar")}>
              <Calendar className="w-4 h-4" />
              Schedule Content
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/analytics")}>
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/settings")}>
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}