import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ABTest {
  id: string;
  postTitle: string;
  brand: string;
  user: string;
  status: "active" | "completed" | "paused";
  ctr: number;
  engagementRate: number;
  conversionRate: number;
  createdAt: string;
  duration: number;
}

interface ABTestAnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  test: ABTest | null;
}

const mockVariantData = [
  { variant: "Variant A", ctr: 2.3, engagement: 5.7, conversion: 1.2, impressions: 10000, clicks: 230 },
  { variant: "Variant B", ctr: 3.1, engagement: 7.2, conversion: 2.1, impressions: 10000, clicks: 310 },
];

const mockPlatformData = [
  { name: "Facebook", value: 40, color: "#1877F2" },
  { name: "Instagram", value: 35, color: "#E4405F" },
  { name: "Twitter", value: 15, color: "#1DA1F2" },
  { name: "LinkedIn", value: 10, color: "#0A66C2" },
];

export function ABTestAnalyticsModal({ open, onOpenChange, test }: ABTestAnalyticsModalProps) {
  if (!test) return null;

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      completed: "secondary",
      paused: "outline",
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>A/B Test Analytics: {test.postTitle}</DialogTitle>
          <DialogDescription>
            Detailed performance analysis for {test.brand} • {getStatusBadge(test.status)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall CTR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{test.ctr}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{test.engagementRate}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{test.conversionRate}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Test Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{test.duration}d</div>
              </CardContent>
            </Card>
          </div>

          {/* Variant Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Variant Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockVariantData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="variant" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ctr" fill="hsl(var(--primary))" name="CTR %" />
                  <Bar dataKey="engagement" fill="hsl(var(--secondary))" name="Engagement %" />
                  <Bar dataKey="conversion" fill="hsl(var(--accent))" name="Conversion %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Platform Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mockPlatformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {mockPlatformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVariantData.map((variant, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{variant.variant}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Impressions: <span className="font-medium">{variant.impressions.toLocaleString()}</span></div>
                        <div>Clicks: <span className="font-medium">{variant.clicks.toLocaleString()}</span></div>
                        <div>CTR: <span className="font-medium">{variant.ctr}%</span></div>
                        <div>Engagement: <span className="font-medium">{variant.engagement}%</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Information */}
          <Card>
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Brand:</span>
                  <div className="font-medium">{test.brand}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">User:</span>
                  <div className="font-medium">{test.user}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <div className="font-medium">{test.createdAt}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}