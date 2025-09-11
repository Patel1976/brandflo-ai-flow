import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Calendar, 
  BarChart3, 
  Target, 
  Globe, 
  TestTube,
  Palette,
  Settings
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Generate engaging posts, captions, and hashtags with AI that understands your brand voice.",
    highlight: "Save 10+ hours weekly"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Auto-schedule content at optimal times across all platforms with drag-and-drop calendar.",
    highlight: "Cross-platform sync"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track engagement, reach, and ROI with detailed insights and performance reports.",
    highlight: "Real-time metrics"
  },
  {
    icon: TestTube,
    title: "A/B Testing",
    description: "Test multiple content variants and optimize for maximum engagement automatically.",
    highlight: "Auto-optimization"
  },
  {
    icon: Palette,
    title: "Brand Voice Tuning",
    description: "Train AI to match your unique brand voice and tone across all content.",
    highlight: "Consistent messaging"
  },
  {
    icon: Globe,
    title: "Regional Targeting",
    description: "Create location-specific content variants that resonate with local audiences.",
    highlight: "Global reach, local feel"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-soft text-accent px-4 py-2 rounded-full text-sm font-medium">
            <Target className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need to 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> dominate</span> social media
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From AI-powered content creation to advanced analytics, BrandFlo provides all the tools 
            you need to build a winning social media strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-card-border hover:shadow-medium transition-smooth group">
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 bg-gradient-soft rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <div className="inline-flex items-center gap-2 bg-success-soft text-success px-3 py-1 rounded-full text-xs font-medium">
                    {feature.highlight}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="hero" size="lg">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}