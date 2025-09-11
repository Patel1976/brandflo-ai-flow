import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    icon: Sparkles,
    price: 29,
    description: "Perfect for getting started",
    features: [
      "10 AI-generated posts per month",
      "Basic analytics",
      "1 brand account",
      "Email support",
      "Basic templates"
    ],
    popular: false
  },
  {
    name: "Standard",
    icon: Zap,
    price: 79,
    description: "Most popular for growing businesses",
    features: [
      "50 AI-generated posts per month",
      "Advanced analytics & A/B testing",
      "5 brand accounts",
      "Priority support",
      "Custom brand voice training",
      "Regional targeting",
      "Platform optimization"
    ],
    popular: true
  },
  {
    name: "Premium",
    icon: Crown,
    price: 199,
    description: "For agencies and large teams",
    features: [
      "Unlimited AI-generated posts",
      "Full analytics suite",
      "Unlimited brand accounts",
      "24/7 dedicated support",
      "Advanced brand voice tuning",
      "White-label options",
      "API access",
      "Team collaboration tools"
    ],
    popular: false
  }
];

export default function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSelectPlan = async (planName: string) => {
    setSelectedPlan(planName);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/guided-setup");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your social media management needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-glow' : 'border-card-border'}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold">${plan.price}</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => handleSelectPlan(plan.name)}
                  disabled={isProcessing}
                >
                  {isProcessing && selectedPlan === plan.name ? "Processing..." : `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Have a coupon code?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button variant="outline" className="w-full">
              Apply Coupon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}