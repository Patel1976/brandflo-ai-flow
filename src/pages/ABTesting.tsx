import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TestTube, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Plus,
  Play,
  Pause,
  Trophy,
  BarChart3
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const mockTests = [
  {
    id: 1,
    name: "Product Launch Announcement",
    status: "running",
    variants: [
      {
        id: "A",
        content: "🚀 Excited to announce our new product launch! Revolutionary features await.",
        metrics: { impressions: 12500, clicks: 325, engagement: 2.6, conversions: 15 }
      },
      {
        id: "B", 
        content: "✨ Introducing game-changing innovation! Our latest product is here to transform your experience.",
        metrics: { impressions: 12300, clicks: 412, engagement: 3.35, conversions: 22 }
      }
    ],
    duration: 7,
    daysRemaining: 3,
    winner: "B"
  },
  {
    id: 2,
    name: "Holiday Sale Campaign",
    status: "completed",
    variants: [
      {
        id: "A",
        content: "🎄 Holiday Sale: 50% off everything! Limited time offer.",
        metrics: { impressions: 25000, clicks: 1250, engagement: 5.0, conversions: 85 }
      },
      {
        id: "B",
        content: "🎁 Unwrap incredible savings! 50% off sitewide - don't miss out!",
        metrics: { impressions: 24800, clicks: 980, engagement: 3.95, conversions: 62 }
      }
    ],
    duration: 5,
    daysRemaining: 0,
    winner: "A"
  }
];

export default function ABTesting() {
  const [selectedTest, setSelectedTest] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-success text-success-foreground";
      case "completed": return "bg-primary text-primary-foreground";
      case "paused": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getWinnerVariant = (test: any) => {
    return test.variants.find((v: any) => v.id === test.winner);
  };

  const calculateImprovement = (variantA: any, variantB: any) => {
    const baseConversion = (variantA.metrics.conversions / variantA.metrics.clicks) * 100;
    const testConversion = (variantB.metrics.conversions / variantB.metrics.clicks) * 100;
    return ((testConversion - baseConversion) / baseConversion * 100).toFixed(1);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">A/B Testing</h1>
            <p className="text-muted-foreground">Optimize your content with data-driven insights</p>
          </div>
          
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create A/B Test
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-success">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Improvement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24.3%</div>
              <p className="text-xs text-success">
                Conversion rate lift
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Variants</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Tested this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-success">
                Tests show improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Test List */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Current Tests</h2>
            
            {mockTests.map(test => (
              <Card 
                key={test.id} 
                className={`border-card-border cursor-pointer transition-colors ${
                  selectedTest?.id === test.id ? 'border-primary bg-primary-soft' : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedTest(test)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                      {test.status === "running" && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {test.status === "running" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{test.duration - test.daysRemaining}/{test.duration} days</span>
                      </div>
                      <Progress 
                        value={((test.duration - test.daysRemaining) / test.duration) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {test.variants.map(variant => (
                      <div 
                        key={variant.id}
                        className={`p-3 rounded-lg border ${
                          test.winner === variant.id 
                            ? 'border-success bg-success-soft' 
                            : 'border-card-border bg-muted'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Variant {variant.id}</span>
                          {test.winner === variant.id && (
                            <Trophy className="w-4 h-4 text-success" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {variant.content}
                        </p>
                        <div className="text-xs space-y-1">
                          <div>CTR: {((variant.clicks / variant.impressions) * 100).toFixed(2)}%</div>
                          <div>Conversions: {variant.conversions}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {test.status === "completed" && (
                    <div className="text-center p-3 bg-success-soft rounded-lg">
                      <div className="font-medium text-success">
                        Winner: Variant {test.winner}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        +{calculateImprovement(
                          test.variants.find((v: any) => v.id === "A"),
                          test.variants.find((v: any) => v.id === test.winner)
                        )}% improvement in conversion rate
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed View */}
          <div className="space-y-6">
            {selectedTest ? (
              <>
                <h2 className="text-xl font-semibold">Test Details</h2>
                
                <Card className="border-card-border">
                  <CardHeader>
                    <CardTitle>{selectedTest.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedTest.variants.map((variant: any) => (
                      <div key={variant.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Variant {variant.id}</h3>
                          {selectedTest.winner === variant.id && (
                            <Badge className="bg-success text-success-foreground gap-1">
                              <Trophy className="w-3 h-3" />
                              Winner
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm">{variant.content}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Eye className="w-4 h-4" />
                              <span>Impressions</span>
                            </div>
                            <div className="text-2xl font-bold">{variant.metrics.impressions.toLocaleString()}</div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <TrendingUp className="w-4 h-4" />
                              <span>Clicks</span>
                            </div>
                            <div className="text-2xl font-bold">{variant.metrics.clicks}</div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Heart className="w-4 h-4" />
                              <span>Engagement</span>
                            </div>
                            <div className="text-2xl font-bold">{variant.metrics.engagement}%</div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Share2 className="w-4 h-4" />
                              <span>Conversions</span>
                            </div>
                            <div className="text-2xl font-bold">{variant.metrics.conversions}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-card-border">
                  <CardHeader>
                    <CardTitle>Statistical Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Confidence Level</span>
                        <Badge className="bg-success text-success-foreground">95%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sample Size</span>
                        <span className="font-medium">2,500+ per variant</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Statistical Power</span>
                        <Badge className="bg-success text-success-foreground">80%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-card-border">
                <CardContent className="p-12 text-center space-y-4">
                  <TestTube className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-semibold text-lg">Select a Test</h3>
                    <p className="text-muted-foreground">Click on a test to view detailed analytics</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}