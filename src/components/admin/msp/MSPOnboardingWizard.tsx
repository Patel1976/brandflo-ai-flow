import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Upload, 
  Eye, 
  EyeOff,
  TestTube,
  Calendar,
  Sparkles,
  BarChart3,
  Users,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
}

const steps: OnboardingStep[] = [
  { id: 1, title: "General Info", description: "Basic MSP information and contact details" },
  { id: 2, title: "Branding", description: "Logo, colors, and visual identity" },
  { id: 3, title: "Features", description: "Enable modules and capabilities" },
  { id: 4, title: "Content", description: "Templates and onboarding materials" },
  { id: 5, title: "Configuration", description: "API keys and database setup" },
  { id: 6, title: "Review", description: "Final confirmation and provisioning" },
];

const features = [
  { id: "ab-testing", name: "A/B Testing", description: "Test multiple content variations", icon: TestTube },
  { id: "content-calendar", name: "Content Calendar", description: "Schedule and manage posts", icon: Calendar },
  { id: "ai-generation", name: "AI Content Generation", description: "Generate posts with AI", icon: Sparkles },
  { id: "analytics", name: "Advanced Analytics", description: "Detailed performance insights", icon: BarChart3 },
  { id: "team-management", name: "Team Management", description: "Collaborate with team members", icon: Users },
  { id: "white-label", name: "White Label Branding", description: "Custom branding options", icon: Building2 },
];

export function MSPOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPasswords, setShowPasswords] = useState({
    dbPassword: false,
    apiKeys: false,
  });
  const [formData, setFormData] = useState({
    // General Info
    mspName: "",
    customDomain: "",
    billingPlan: "",
    email: "",
    contactPerson: "",
    phone: "",
    adminName: "",
    adminEmail: "",
    // Branding
    logo: null as File | null,
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    accentColor: "#EF4444",
    favicon: null as File | null,
    // Features
    enabledFeatures: [] as string[],
    // Content
    onboardingCopy: "",
    termsOfService: "",
    helpText: "",
    // Configuration
    aiApiKey: "",
    paymentGatewayKey: "",
    zapierEnabled: false,
    dbConnectionString: "",
    dbUsername: "",
    dbPassword: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      enabledFeatures: prev.enabledFeatures.includes(featureId)
        ? prev.enabledFeatures.filter(id => id !== featureId)
        : [...prev.enabledFeatures, featureId]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mspName">MSP Name *</Label>
                <Input
                  id="mspName"
                  value={formData.mspName}
                  onChange={(e) => updateFormData("mspName", e.target.value)}
                  placeholder="TechAgency Pro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  value={formData.customDomain}
                  onChange={(e) => updateFormData("customDomain", e.target.value)}
                  placeholder="techagency.brandflo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingPlan">Billing Plan *</Label>
                <Select value={formData.billingPlan} onValueChange={(value) => updateFormData("billingPlan", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter ($49/month)</SelectItem>
                    <SelectItem value="professional">Professional ($99/month)</SelectItem>
                    <SelectItem value="enterprise">Enterprise ($199/month)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">MSP Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="admin@techagency.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => updateFormData("contactPerson", e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminName">Main Admin Name *</Label>
                <Input
                  id="adminName"
                  value={formData.adminName}
                  onChange={(e) => updateFormData("adminName", e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Main Admin Email *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => updateFormData("adminEmail", e.target.value)}
                  placeholder="john@techagency.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Logo Upload</Label>
                    <div className="border-2 border-dashed border-admin-border rounded-lg p-6 text-center hover:border-admin-primary/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={formData.primaryColor}
                          onChange={(e) => updateFormData("primaryColor", e.target.value)}
                          className="w-12 h-10 p-1 rounded"
                        />
                        <Input
                          value={formData.primaryColor}
                          onChange={(e) => updateFormData("primaryColor", e.target.value)}
                          placeholder="#3B82F6"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={formData.secondaryColor}
                          onChange={(e) => updateFormData("secondaryColor", e.target.value)}
                          className="w-12 h-10 p-1 rounded"
                        />
                        <Input
                          value={formData.secondaryColor}
                          onChange={(e) => updateFormData("secondaryColor", e.target.value)}
                          placeholder="#1E40AF"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="accentColor"
                          type="color"
                          value={formData.accentColor}
                          onChange={(e) => updateFormData("accentColor", e.target.value)}
                          className="w-12 h-10 p-1 rounded"
                        />
                        <Input
                          value={formData.accentColor}
                          onChange={(e) => updateFormData("accentColor", e.target.value)}
                          placeholder="#EF4444"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Favicon Upload</Label>
                    <div className="border-2 border-dashed border-admin-border rounded-lg p-4 text-center hover:border-admin-primary/50 transition-colors">
                      <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">ICO, PNG 32x32px</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-admin-primary">Live Preview</h3>
                <div className="bg-admin-surface border border-admin-border rounded-lg p-6">
                  <div 
                    className="h-12 rounded-t-lg flex items-center px-4 mb-4" 
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">{formData.mspName || "MSP Name"}</span>
                  </div>
                  <div className="space-y-3">
                    <div 
                      className="h-8 rounded" 
                      style={{ backgroundColor: formData.secondaryColor, opacity: 0.8 }}
                    />
                    <div 
                      className="h-6 rounded w-2/3" 
                      style={{ backgroundColor: formData.accentColor, opacity: 0.6 }}
                    />
                    <div className="flex gap-2">
                      <div 
                        className="h-4 rounded flex-1" 
                        style={{ backgroundColor: formData.primaryColor, opacity: 0.3 }}
                      />
                      <div 
                        className="h-4 rounded flex-1" 
                        style={{ backgroundColor: formData.secondaryColor, opacity: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => {
                const isEnabled = formData.enabledFeatures.includes(feature.id);
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={feature.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-admin",
                      isEnabled 
                        ? "bg-gradient-admin-card border-admin-primary shadow-admin" 
                        : "bg-admin-surface border-admin-border hover:border-admin-primary/50"
                    )}
                    onClick={() => toggleFeature(feature.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          isEnabled 
                            ? "bg-admin-primary text-white" 
                            : "bg-admin-secondary text-admin-primary"
                        )}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-admin-primary">{feature.name}</h3>
                            <Switch
                              checked={isEnabled}
                              onCheckedChange={() => toggleFeature(feature.id)}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="onboardingCopy">Onboarding Page Copy</Label>
                <Textarea
                  id="onboardingCopy"
                  value={formData.onboardingCopy}
                  onChange={(e) => updateFormData("onboardingCopy", e.target.value)}
                  placeholder="Welcome to your branded social media management platform..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="termsOfService">Terms of Service</Label>
                <Textarea
                  id="termsOfService"
                  value={formData.termsOfService}
                  onChange={(e) => updateFormData("termsOfService", e.target.value)}
                  placeholder="Terms and conditions for using your platform..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="helpText">Help Documentation</Label>
                <Textarea
                  id="helpText"
                  value={formData.helpText}
                  onChange={(e) => updateFormData("helpText", e.target.value)}
                  placeholder="Getting started guide and help documentation..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="aiApiKey">AI API Key</Label>
                  <div className="relative">
                    <Input
                      id="aiApiKey"
                      type={showPasswords.apiKeys ? "text" : "password"}
                      value={formData.aiApiKey}
                      onChange={(e) => updateFormData("aiApiKey", e.target.value)}
                      placeholder="sk-..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setShowPasswords(prev => ({ ...prev, apiKeys: !prev.apiKeys }))}
                    >
                      {showPasswords.apiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentGatewayKey">Payment Gateway Key</Label>
                  <div className="relative">
                    <Input
                      id="paymentGatewayKey"
                      type={showPasswords.apiKeys ? "text" : "password"}
                      value={formData.paymentGatewayKey}
                      onChange={(e) => updateFormData("paymentGatewayKey", e.target.value)}
                      placeholder="pk_..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setShowPasswords(prev => ({ ...prev, apiKeys: !prev.apiKeys }))}
                    >
                      {showPasswords.apiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="zapier"
                  checked={formData.zapierEnabled}
                  onCheckedChange={(checked) => updateFormData("zapierEnabled", checked)}
                />
                <Label htmlFor="zapier">Enable Zapier Integration</Label>
              </div>

              <div className="space-y-4 border-t border-admin-border pt-6">
                <h3 className="text-lg font-semibold text-admin-primary">Database Configuration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dbConnectionString">Connection String</Label>
                    <Input
                      id="dbConnectionString"
                      value={formData.dbConnectionString}
                      onChange={(e) => updateFormData("dbConnectionString", e.target.value)}
                      placeholder="postgresql://user:password@host:port/database"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dbUsername">Database Username</Label>
                      <Input
                        id="dbUsername"
                        value={formData.dbUsername}
                        onChange={(e) => updateFormData("dbUsername", e.target.value)}
                        placeholder="db_user"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dbPassword">Database Password</Label>
                      <div className="relative">
                        <Input
                          id="dbPassword"
                          type={showPasswords.dbPassword ? "text" : "password"}
                          value={formData.dbPassword}
                          onChange={(e) => updateFormData("dbPassword", e.target.value)}
                          placeholder="••••••••"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-8 w-8"
                          onClick={() => setShowPasswords(prev => ({ ...prev, dbPassword: !prev.dbPassword }))}
                        >
                          {showPasswords.dbPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-fit">
                    Test Connection
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-admin-surface border border-admin-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-admin-primary mb-6">Review Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-admin-primary mb-2">General Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">MSP Name:</span> {formData.mspName}</div>
                    <div><span className="text-muted-foreground">Domain:</span> {formData.customDomain}</div>
                    <div><span className="text-muted-foreground">Plan:</span> {formData.billingPlan}</div>
                    <div><span className="text-muted-foreground">Admin:</span> {formData.adminName}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-admin-primary mb-2">Enabled Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.enabledFeatures.map(featureId => {
                      const feature = features.find(f => f.id === featureId);
                      return feature ? (
                        <Badge key={featureId} variant="secondary" className="bg-admin-primary text-white">
                          {feature.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-admin-primary mb-2">Configuration Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Branding configured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.aiApiKey ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 border border-yellow-500 rounded-full" />
                      )}
                      <span className="text-sm">AI API key {formData.aiApiKey ? 'configured' : 'not configured'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {formData.dbConnectionString ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 border border-yellow-500 rounded-full" />
                      )}
                      <span className="text-sm">Database {formData.dbConnectionString ? 'configured' : 'not configured'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-admin-accent/10 border border-admin-accent/30 rounded-lg p-4">
              <p className="text-sm text-admin-primary">
                <strong>Ready to provision:</strong> Once you confirm, we'll create the MSP instance with all configured settings. 
                This process may take a few minutes to complete.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-admin-secondary/20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-admin-primary mb-2">MSP Onboarding</h1>
          <p className="text-muted-foreground">Set up a new Managed Service Provider</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                    currentStep === step.id
                      ? "bg-admin-primary text-white"
                      : currentStep > step.id
                      ? "bg-green-500 text-white"
                      : "bg-admin-secondary text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-1 mx-2",
                      currentStep > step.id ? "bg-green-500" : "bg-admin-secondary"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-admin-primary">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-muted-foreground text-sm">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8 bg-admin-surface border-admin-border">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-admin-border hover:bg-admin-secondary/50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === steps.length ? (
            <Button 
              className="bg-admin-primary hover:bg-admin-primary/90 text-white"
              onClick={() => {
                // Handle final submission
                console.log("Provisioning MSP...", formData);
              }}
            >
              Provision MSP
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-admin-primary hover:bg-admin-primary/90 text-white"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}