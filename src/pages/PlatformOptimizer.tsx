import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Video,
  Image as ImageIcon,
  FileText,
  TrendingUp,
  Users,
  Clock,
  Target,
  Sparkles,
  Play
} from "lucide-react";
const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    optimalFormats: ["Image", "Reel", "Story"],
    bestCTAs: ["Shop Now", "Learn More", "Swipe Up"],
    optimalLength: "125-150 characters",
    peakHours: "6-9 AM, 7-9 PM",
    engagement: 4.7,
    recommendations: [
      "Use high-quality visuals",
      "Include 3-5 relevant hashtags",
      "Post consistently daily",
      "Use Stories for behind-the-scenes content"
    ]
  },
  {
    name: "Facebook", 
    icon: Facebook,
    color: "bg-blue-600",
    optimalFormats: ["Image", "Video", "Link"],
    bestCTAs: ["Learn More", "Sign Up", "Contact Us"],
    optimalLength: "40-80 characters",
    peakHours: "9 AM-10 AM, 3-4 PM",
    engagement: 3.2,
    recommendations: [
      "Ask questions to drive engagement",
      "Share valuable content",
      "Use Facebook Live for real-time engagement",
      "Cross-post from Instagram selectively"
    ]
  },
  {
    name: "LinkedIn",
    icon: Linkedin, 
    color: "bg-blue-700",
    optimalFormats: ["Article", "Image", "Document"],
    bestCTAs: ["Read More", "Connect", "Apply Now"],
    optimalLength: "150-300 characters",
    peakHours: "8-9 AM, 12-1 PM, 5-6 PM",
    engagement: 5.1,
    recommendations: [
      "Focus on professional insights",
      "Share industry thought leadership",
      "Use native LinkedIn features",
      "Engage with comments professionally"
    ]
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "bg-blue-400", 
    optimalFormats: ["Text", "Image", "Video"],
    bestCTAs: ["Retweet", "Learn More", "Join Us"],
    optimalLength: "71-100 characters",
    peakHours: "8-9 AM, 7-9 PM",
    engagement: 2.8,
    recommendations: [
      "Keep it concise and punchy",
      "Use trending hashtags strategically",
      "Engage in real-time conversations",
      "Share quick updates and links"
    ]
  }
];

const contentTypes = [
  { name: "Image", icon: ImageIcon, platforms: ["Instagram", "Facebook", "LinkedIn", "Twitter"] },
  { name: "Video", icon: Video, platforms: ["Instagram", "Facebook", "LinkedIn", "Twitter"] },
  { name: "Reel", icon: Play, platforms: ["Instagram", "Facebook"] },
  { name: "Story", icon: Sparkles, platforms: ["Instagram", "Facebook"] },
  { name: "Article", icon: FileText, platforms: ["LinkedIn"] },
  { name: "Text", icon: FileText, platforms: ["Twitter", "LinkedIn", "Facebook"] }
];

const mockAnalytics = {
  Instagram: { reach: 12500, engagement: 4.7, clicks: 320, conversions: 15 },
  Facebook: { reach: 8900, engagement: 3.2, clicks: 185, conversions: 8 },
  LinkedIn: { reach: 5600, engagement: 5.1, clicks: 410, conversions: 25 },
  Twitter: { reach: 15200, engagement: 2.8, clicks: 280, conversions: 12 }
};

export default function PlatformOptimizer() {
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [selectedContentType, setSelectedContentType] = useState("Image");

  const currentPlatform = platforms.find(p => p.name === selectedPlatform);
  const platformAnalytics = mockAnalytics[selectedPlatform as keyof typeof mockAnalytics];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Platform Optimizer</h1>
            <p className="text-muted-foreground">Optimize content for each social media platform</p>
          </div>
          
          <Button className="gap-2">
            <Sparkles className="w-4 h-4" />
            Generate Optimized Content
          </Button>
        </div>

        {/* Platform Selection */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map(platform => {
            const Icon = platform.icon;
            const analytics = mockAnalytics[platform.name as keyof typeof mockAnalytics];
            const isSelected = selectedPlatform === platform.name;
            
            return (
              <Card 
                key={platform.name}
                className={`cursor-pointer transition-colors ${
                  isSelected ? 'border-primary bg-primary-soft' : 'border-card-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div className={`w-12 h-12 rounded-lg mx-auto flex items-center justify-center ${platform.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{analytics.engagement}% avg engagement</p>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{(analytics.reach / 1000).toFixed(1)}k reach</span>
                    <span>{analytics.conversions} conversions</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Platform Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {currentPlatform && <currentPlatform.icon className="w-5 h-5" />}
                  {selectedPlatform} Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Optimal Content Length</h4>
                    <p className="text-sm text-muted-foreground">{currentPlatform?.optimalLength}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Peak Posting Hours</h4>
                    <p className="text-sm text-muted-foreground">{currentPlatform?.peakHours}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Best Content Formats</h4>
                  <div className="flex gap-2">
                    {currentPlatform?.optimalFormats.map(format => (
                      <Badge key={format} variant="outline">{format}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recommended CTAs</h4>
                  <div className="flex gap-2">
                    {currentPlatform?.bestCTAs.map(cta => (
                      <Badge key={cta} variant="secondary">{cta}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Platform-Specific Tips</h4>
                  <ul className="space-y-2">
                    {currentPlatform?.recommendations.map((tip, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Content Type Optimizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {contentTypes
                    .filter(type => type.platforms.includes(selectedPlatform))
                    .map(type => {
                      const Icon = type.icon;
                      const isSelected = selectedContentType === type.name;
                      
                      return (
                        <Button
                          key={type.name}
                          variant={isSelected ? "default" : "outline"}
                          className="h-auto p-4 flex-col gap-2"
                          onClick={() => setSelectedContentType(type.name)}
                        >
                          <Icon className="w-5 h-5" />
                          {type.name}
                        </Button>
                      );
                    })}
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">{selectedContentType} on {selectedPlatform}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {selectedContentType === "Image" && selectedPlatform === "Instagram" && (
                      <>
                        <p>• Recommended size: 1080x1080px (1:1 ratio)</p>
                        <p>• Use high-contrast, eye-catching visuals</p>
                        <p>• Include text overlay for better engagement</p>
                        <p>• Optimal hashtags: 3-5 relevant tags</p>
                      </>
                    )}
                    {selectedContentType === "Video" && selectedPlatform === "LinkedIn" && (
                      <>
                        <p>• Recommended length: 30-90 seconds</p>
                        <p>• Include captions for accessibility</p>
                        <p>• Focus on professional, educational content</p>
                        <p>• Upload natively for better reach</p>
                      </>
                    )}
                    {selectedContentType === "Text" && selectedPlatform === "Twitter" && (
                      <>
                        <p>• Keep under 280 characters</p>
                        <p>• Use 1-2 relevant hashtags</p>
                        <p>• Include engaging questions or calls to action</p>
                        <p>• Time for peak engagement hours</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics & Performance */}
          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reach</span>
                    <span className="font-medium">{platformAnalytics?.reach.toLocaleString()}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Engagement Rate</span>
                    <span className="font-medium">{platformAnalytics?.engagement}%</span>
                  </div>
                  <Progress value={platformAnalytics?.engagement * 20} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Click Rate</span>
                    <span className="font-medium">{((platformAnalytics?.clicks / platformAnalytics?.reach) * 100).toFixed(2)}%</span>
                  </div>
                  <Progress value={((platformAnalytics?.clicks / platformAnalytics?.reach) * 100) * 5} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversions</span>
                    <span className="font-medium">{platformAnalytics?.conversions}</span>
                  </div>
                  <Progress value={platformAnalytics?.conversions * 4} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Optimization Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">87%</div>
                  <p className="text-sm text-muted-foreground">Overall optimization score</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Content Format</span>
                    <span className="text-success font-medium">95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Timing</span>
                    <span className="text-success font-medium">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hashtag Usage</span>
                    <span className="text-warning font-medium">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>CTA Effectiveness</span>
                    <span className="text-success font-medium">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary-soft">
              <CardHeader>
                <CardTitle className="text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Sparkles className="w-4 h-4" />
                  Auto-optimize Current Post
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Clock className="w-4 h-4" />
                  Schedule Optimal Time
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4" />
                  Analyze Audience
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}