import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Building } from "lucide-react";

const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: "$29",
    period: "/month",
    description: "Perfect for individual creators and small brands",
    features: [
      "5 social accounts",
      "50 AI-generated posts/month",
      "Basic analytics",
      "Standard scheduling",
      "Email support"
    ],
    highlighted: false,
    cta: "Start Free Trial"
  },
  {
    name: "Standard",
    icon: Crown,
    price: "$79",
    period: "/month",
    description: "Ideal for growing businesses and agencies",
    features: [
      "15 social accounts",
      "200 AI-generated posts/month",
      "Advanced analytics",
      "A/B testing",
      "Brand voice tuning",
      "Priority support",
      "Team collaboration"
    ],
    highlighted: true,
    cta: "Start Free Trial"
  },
  {
    name: "Premium",
    icon: Building,
    price: "$199",
    period: "/month",
    description: "For large teams and enterprise needs",
    features: [
      "Unlimited social accounts",
      "Unlimited AI posts",
      "White-label solutions",
      "Advanced A/B testing",
      "Regional targeting",
      "Custom integrations",
      "Dedicated success manager",
      "Custom analytics"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-soft text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Crown className="w-4 h-4" />
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Choose the 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> perfect plan</span> for your needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All plans include a 14-day free trial. No credit card required. 
            Scale up or down anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-card-border transition-smooth hover:shadow-large ${
                plan.highlighted 
                  ? 'border-primary shadow-glow scale-105' 
                  : 'hover:border-primary/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4 pb-8">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                  plan.highlighted ? 'bg-gradient-primary' : 'bg-gradient-soft'
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.highlighted ? 'text-white' : 'text-primary'
                  }`} />
                </div>
                
                <div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Billed monthly
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-success-soft rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.highlighted ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            All plans include SSL security, 99.9% uptime, and 24/7 support
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span>✓ 14-day free trial</span>
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}