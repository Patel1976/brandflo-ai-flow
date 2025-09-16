import { MSPOnboardingWizard } from "@/components/admin/MSPOnboardingWizard";

export default function MSPOnboarding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">MSP Onboarding</h1>
          <p className="text-muted-foreground">
            Set up a new Managed Service Provider with custom branding, features, and configuration
          </p>
        </div>
        
        <MSPOnboardingWizard />
      </div>
    </div>
  );
}