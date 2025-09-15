import { SuperAdminSidebar } from "@/components/admin/SuperAdminSidebar";
import { MSPOnboardingWizard } from "@/components/admin/msp/MSPOnboardingWizard";

export default function MSPOnboarding() {
  return (
    <div className="flex h-screen bg-admin-surface">
      <SuperAdminSidebar />
      <div className="flex-1 overflow-auto">
        <MSPOnboardingWizard />
      </div>
    </div>
  );
}