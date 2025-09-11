import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-ai-social.jpg";

export function HeroSection() {
  return (
    <section className="pt-20 pb-24 bg-gradient-soft">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary-soft text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Social Media Management
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Create, Schedule & 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Optimize</span> Your Content
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your social media strategy with AI-powered content generation, 
                intelligent scheduling, and comprehensive analytics for all your brands.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-soft rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="font-semibold">AI Content</div>
                  <div className="text-sm text-muted-foreground">Generated in seconds</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-soft rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold">Smart Analytics</div>
                  <div className="text-sm text-muted-foreground">Track performance</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning-soft rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <div className="font-semibold">Multi-Brand</div>
                  <div className="text-sm text-muted-foreground">Manage everything</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="AI-powered social media management dashboard" 
                className="rounded-2xl shadow-large w-full"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-2xl rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}