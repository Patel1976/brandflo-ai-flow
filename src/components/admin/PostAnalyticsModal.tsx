import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download, TrendingUp, Users, Eye, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  snippet: string;
  publishDate: string;
  platform: string;
  engagementRate: number;
  reach: number;
  ctr: number;
  brand: string;
  user: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
}

interface PostAnalyticsModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const mockTrendData = [
  { date: "Jan 1", engagement: 4.2, reach: 8500 },
  { date: "Jan 2", engagement: 5.8, reach: 9200 },
  { date: "Jan 3", engagement: 7.1, reach: 11400 },
  { date: "Jan 4", engagement: 8.5, reach: 15420 },
];

const mockDemographics = [
  { name: "18-24", value: 30, color: "hsl(var(--primary))" },
  { name: "25-34", value: 40, color: "hsl(var(--primary-soft))" },
  { name: "35-44", value: 20, color: "hsl(var(--accent))" },
  { name: "45+", value: 10, color: "hsl(var(--accent-soft))" },
];

export function PostAnalyticsModal({ post, isOpen, onClose }: PostAnalyticsModalProps) {
  if (!post) return null;

  const engagementData = [
    { metric: "Likes", value: post.likes, color: "hsl(var(--primary))" },
    { metric: "Comments", value: post.comments, color: "hsl(var(--primary-soft))" },
    { metric: "Shares", value: post.shares, color: "hsl(var(--accent))" },
    { metric: "Saves", value: post.saves, color: "hsl(var(--accent-soft))" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">Post Analytics Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Post Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Post Overview</span>
                <Badge variant="outline">{post.platform}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground">Content:</h4>
                  <p className="text-muted-foreground">{post.snippet}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{post.engagementRate}%</div>
                    <div className="text-sm text-muted-foreground">Engagement Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{post.reach.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{post.ctr}%</div>
                    <div className="text-sm text-muted-foreground">CTR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{post.clicks}</div>
                    <div className="text-sm text-muted-foreground">Total Clicks</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Engagement Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Age Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={mockDemographics}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {mockDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export as CSV
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export as PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}