import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Palette, 
  ToggleLeft, 
  FileText, 
  Key, 
  Database,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // General Info
  mspName: string;
  customDomain: string;
  billingPlan: string;
  email: string;
  contactPersonName: string;
  phoneNumber: string;
  adminName: string;
  adminEmail: string;
  
  // Branding
  logo: File | null;
  favicon: File | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // Features
  features: {
    posts: boolean;
    calendar: boolean;
    analytics: boolean;
    abTests: boolean;
    aiTools: boolean;
  };
  
  // Content
  onboardingContent: string;
  termsOfService: string;
  
  // API Configuration
  aiApiKey: string;
  stripeKey: string;
  zapierEnabled: boolean;
  
  // Database
  useOwnServer: boolean;
  dbHost: string;
  dbUsername: string;
  dbPassword: string;
  dbSchema: string;
}

const STEPS = [
  { id: 1, title: "General Info", icon: Building, description: "Basic MSP details" },
  { id: 2, title: "Branding", icon: Palette, description: "Visual identity" },
  { id: 3, title: "Features", icon: ToggleLeft, description: "Enable/disable modules" },
  { id: 4, title: "Content", icon: FileText, description: "Custom content" },
  { id: 5, title: "API Config", icon: Key, description: "Integration settings" },
  { id: 6, title: "Database", icon: Database, description: "Database configuration" },
  { id: 7, title: "Review", icon: CheckCircle, description: "Confirm & provision" }
];

export function MSPOnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    mspName: "",
    customDomain: "",
    billingPlan: "",
    email: "",
    contactPersonName: "",
    phoneNumber: "",
    adminName: "",
    adminEmail: "",
    logo: null,
    favicon: null,
    primaryColor: "#3B82F6",
    secondaryColor: "#6B7280",
    accentColor: "#8B5CF6",
    features: {
      posts: true,
      calendar: true,
      analytics: true,
      abTests: false,
      aiTools: true,
    },
    onboardingContent: "",
    termsOfService: "",
    aiApiKey: "",
    stripeKey: "",
    zapierEnabled: false,
    useOwnServer: false,
    dbHost: "",
    dbUsername: "",
    dbPassword: "",
    dbSchema: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "MSP Created Successfully!",
        description: `${formData.mspName} has been provisioned with domain ${formData.customDomain}`,
      });
      
      // Reset form or redirect
      setCurrentStep(7);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create MSP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mspName">MSP Name *</Label>
                <Input
                  id="mspName"
                  value={formData.mspName}
                  onChange={(e) => updateFormData({ mspName: e.target.value })}
                  placeholder="Enter MSP name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain *</Label>
                <Input
                  id="customDomain"
                  value={formData.customDomain}
                  onChange={(e) => updateFormData({ customDomain: e.target.value })}
                  placeholder="yourmsp.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billingPlan">Billing Plan *</Label>
                <Select value={formData.billingPlan} onValueChange={(value) => updateFormData({ billingPlan: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter - $29/month</SelectItem>
                    <SelectItem value="professional">Professional - $79/month</SelectItem>
                    <SelectItem value="enterprise">Enterprise - $199/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">MSP Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  placeholder="contact@yourmsp.com"
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPersonName">Contact Person *</Label>
                <Input
                  id="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={(e) => updateFormData({ contactPersonName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">Main Admin Name *</Label>
                <Input
                  id="adminName"
                  value={formData.adminName}
                  onChange={(e) => updateFormData({ adminName: e.target.value })}
                  placeholder="Admin User"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Main Admin Email *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => updateFormData({ adminEmail: e.target.value })}
                  placeholder="admin@yourmsp.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-muted-foreground">Click to upload logo (PNG, JPG)</p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Favicon Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                    <p className="text-xs text-muted-foreground">Upload favicon (.ico, 32x32)</p>
                    <input type="file" className="hidden" accept=".ico,image/*" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Theme Colors</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={formData.primaryColor}
                        onChange={(e) => updateFormData({ primaryColor: e.target.value })}
                        placeholder="#3B82F6"
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
                        onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={formData.secondaryColor}
                        onChange={(e) => updateFormData({ secondaryColor: e.target.value })}
                        placeholder="#6B7280"
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
                        onChange={(e) => updateFormData({ accentColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={formData.accentColor}
                        onChange={(e) => updateFormData({ accentColor: e.target.value })}
                        placeholder="#8B5CF6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Branding Preview</h4>
              <div className="bg-white dark:bg-gray-800 p-4 rounded border" style={{ borderColor: formData.primaryColor }}>
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    {formData.mspName.charAt(0) || 'M'}
                  </div>
                  <h5 className="font-semibold">{formData.mspName || 'MSP Name'}</h5>
                </div>
                <div className="flex gap-2">
                  <Badge style={{ backgroundColor: formData.primaryColor }}>Primary</Badge>
                  <Badge variant="outline" style={{ borderColor: formData.secondaryColor, color: formData.secondaryColor }}>
                    Secondary
                  </Badge>
                  <Badge style={{ backgroundColor: formData.accentColor }}>Accent</Badge>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Enable/Disable Features for this MSP</h3>
              <p className="text-sm text-muted-foreground">Control which modules are available for this MSP's users.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Post Creation</h4>
                    <p className="text-sm text-muted-foreground">Allow users to create and schedule posts</p>
                  </div>
                  <Switch
                    checked={formData.features.posts}
                    onCheckedChange={(checked) => 
                      updateFormData({ features: { ...formData.features, posts: checked } })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Content Calendar</h4>
                    <p className="text-sm text-muted-foreground">Calendar view for managing content</p>
                  </div>
                  <Switch
                    checked={formData.features.calendar}
                    onCheckedChange={(checked) => 
                      updateFormData({ features: { ...formData.features, calendar: checked } })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Analytics Dashboard</h4>
                    <p className="text-sm text-muted-foreground">Performance metrics and insights</p>
                  </div>
                  <Switch
                    checked={formData.features.analytics}
                    onCheckedChange={(checked) => 
                      updateFormData({ features: { ...formData.features, analytics: checked } })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">A/B Testing</h4>
                    <p className="text-sm text-muted-foreground">Test different content variations</p>
                  </div>
                  <Switch
                    checked={formData.features.abTests}
                    onCheckedChange={(checked) => 
                      updateFormData({ features: { ...formData.features, abTests: checked } })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">AI Tools</h4>
                    <p className="text-sm text-muted-foreground">Content generation and optimization</p>
                  </div>
                  <Switch
                    checked={formData.features.aiTools}
                    onCheckedChange={(checked) => 
                      updateFormData({ features: { ...formData.features, aiTools: checked } })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Custom Content & Templates</h3>
              <p className="text-sm text-muted-foreground">Customize the content shown to MSP users during onboarding and throughout the platform.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="onboardingContent">Onboarding Page Content</Label>
                <Textarea
                  id="onboardingContent"
                  value={formData.onboardingContent}
                  onChange={(e) => updateFormData({ onboardingContent: e.target.value })}
                  placeholder="Welcome to our platform! This content will be shown to new users..."
                  className="min-h-[120px]"
                />
                <p className="text-xs text-muted-foreground">This will be displayed on the user onboarding page</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="termsOfService">Terms of Service</Label>
                <Textarea
                  id="termsOfService"
                  value={formData.termsOfService}
                  onChange={(e) => updateFormData({ termsOfService: e.target.value })}
                  placeholder="Enter your terms of service content..."
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">Legal terms specific to this MSP</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">API & Integration Configuration</h3>
              <p className="text-sm text-muted-foreground">Configure third-party integrations and API keys for this MSP.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aiApiKey">AI API Key</Label>
                  <Input
                    id="aiApiKey"
                    type="password"
                    value={formData.aiApiKey}
                    onChange={(e) => updateFormData({ aiApiKey: e.target.value })}
                    placeholder="sk-..."
                  />
                  <p className="text-xs text-muted-foreground">OpenAI or other AI service API key</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripeKey">Stripe Secret Key</Label>
                  <Input
                    id="stripeKey"
                    type="password"
                    value={formData.stripeKey}
                    onChange={(e) => updateFormData({ stripeKey: e.target.value })}
                    placeholder="sk_live_..."
                  />
                  <p className="text-xs text-muted-foreground">For payment processing (optional)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Zapier Integration</h4>
                    <p className="text-sm text-muted-foreground">Enable webhook integrations</p>
                  </div>
                  <Switch
                    checked={formData.zapierEnabled}
                    onCheckedChange={(checked) => updateFormData({ zapierEnabled: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Database Configuration</h3>
              <p className="text-sm text-muted-foreground">Configure where this MSP's data will be stored.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Use MSP's Own Database Server</h4>
                  <p className="text-sm text-muted-foreground">Enable if MSP wants to host their own data</p>
                </div>
                <Switch
                  checked={formData.useOwnServer}
                  onCheckedChange={(checked) => updateFormData({ useOwnServer: checked })}
                />
              </div>

              {formData.useOwnServer && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dbHost">Database Host *</Label>
                    <Input
                      id="dbHost"
                      value={formData.dbHost}
                      onChange={(e) => updateFormData({ dbHost: e.target.value })}
                      placeholder="localhost:5432"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dbSchema">Database Schema *</Label>
                    <Input
                      id="dbSchema"
                      value={formData.dbSchema}
                      onChange={(e) => updateFormData({ dbSchema: e.target.value })}
                      placeholder="brandflo_msp"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dbUsername">Database Username *</Label>
                    <Input
                      id="dbUsername"
                      value={formData.dbUsername}
                      onChange={(e) => updateFormData({ dbUsername: e.target.value })}
                      placeholder="db_user"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dbPassword">Database Password *</Label>
                    <Input
                      id="dbPassword"
                      type="password"
                      value={formData.dbPassword}
                      onChange={(e) => updateFormData({ dbPassword: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {!formData.useOwnServer && (
                <div className="bg-primary-soft p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Using BrandFlo Servers</h4>
                  <p className="text-sm text-muted-foreground">
                    This MSP's data will be stored securely on BrandFlo's managed database infrastructure. 
                    No additional configuration required.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-green-600 mb-2">MSP Created Successfully!</h3>
              <p className="text-muted-foreground">
                {formData.mspName} has been provisioned and is ready to use.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-4">Generated Credentials</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">MSP Domain</Label>
                    <Input value={formData.customDomain} readOnly />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Admin Login</Label>
                    <Input value={formData.adminEmail} readOnly />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Temporary Password</Label>
                  <Input value="TempPass123!" readOnly />
                  <p className="text-xs text-muted-foreground mt-1">
                    This password should be changed on first login
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">
                Send Credentials via Email
              </Button>
              <Button variant="outline" className="flex-1">
                Download Setup Guide
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 7) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Step Progress */}
      <div className="flex items-center justify-between">
        {STEPS.slice(0, -1).map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              currentStep >= step.id 
                ? 'bg-primary border-primary text-white' 
                : 'border-gray-300 text-gray-400'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="ml-3">
              <p className="font-medium text-sm">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            {index < STEPS.length - 2 && (
              <div className={`w-12 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const IconComponent = STEPS[currentStep - 1].icon;
              return <IconComponent className="w-5 h-5" />;
            })()}
            {STEPS[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

          {currentStep < STEPS.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Creating MSP..." : "Create MSP"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}