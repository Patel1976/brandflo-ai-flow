import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Upload,
  Palette,
  Target,
  Hash
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const socialPlatforms = [
  { name: "Instagram", icon: Instagram, connected: false },
  { name: "Facebook", icon: Facebook, connected: false },
  { name: "LinkedIn", icon: Linkedin, connected: false },
  { name: "Twitter", icon: Twitter, connected: false },
];

const brandTones = [
  "Professional", "Friendly", "Casual", "Authoritative", 
  "Playful", "Inspirational", "Educational", "Humorous"
];

const brandGoals = [
  "Increase Brand Awareness", "Drive Sales", "Build Community", 
  "Educate Audience", "Showcase Products", "Share Company News"
];

export default function GuidedSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handlePlatformConnect = (platform: string) => {
    setConnectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleToneToggle = (tone: string) => {
    setSelectedTones(prev => 
      prev.includes(tone) 
        ? prev.filter(t => t !== tone)
        : [...prev, tone]
    );
  };

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Welcome to BrandFlo! 🎉</h2>
              <p className="text-muted-foreground">Let's set up your brand in just a few steps</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Brand Name</label>
                <Input 
                  placeholder="Enter your brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Brand Description</label>
                <Textarea 
                  placeholder="Tell us about your brand..."
                  value={brandDescription}
                  onChange={(e) => setBrandDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Connect Your Social Accounts</h2>
              <p className="text-muted-foreground">Link your social media platforms to start posting</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {socialPlatforms.map((platform) => (
                <Card 
                  key={platform.name}
                  className={`cursor-pointer transition-colors ${
                    connectedPlatforms.includes(platform.name) 
                      ? 'border-primary bg-primary-soft' 
                      : 'border-card-border hover:border-primary/50'
                  }`}
                  onClick={() => handlePlatformConnect(platform.name)}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <platform.icon className="w-8 h-8 mx-auto" />
                    <div className="font-medium">{platform.name}</div>
                    {connectedPlatforms.includes(platform.name) && (
                      <Badge className="bg-success text-success-foreground">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Define Your Brand Tone</h2>
              <p className="text-muted-foreground">Select the tones that match your brand voice</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {brandTones.map((tone) => (
                <Button
                  key={tone}
                  variant={selectedTones.includes(tone) ? "default" : "outline"}
                  onClick={() => handleToneToggle(tone)}
                  className="h-auto p-4 text-center"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  {tone}
                </Button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Set Your Goals</h2>
              <p className="text-muted-foreground">What do you want to achieve with your content?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {brandGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={selectedGoals.includes(goal) ? "default" : "outline"}
                  onClick={() => handleGoalToggle(goal)}
                  className="h-auto p-4 text-left justify-start"
                >
                  <Target className="w-4 h-4 mr-2 flex-shrink-0" />
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Final Setup</h2>
              <p className="text-muted-foreground">Add hashtags and upload your logo</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Brand Hashtags
                </label>
                <Textarea 
                  placeholder="Enter your brand hashtags (comma separated)"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Brand Logo
                </label>
                <Card className="border-dashed border-2 border-card-border">
                  <CardContent className="p-8 text-center space-y-3">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Upload your logo</p>
                      <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                    <Button variant="outline">Choose File</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === totalSteps ? "Complete Setup" : "Next"}
              {currentStep !== totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}