import { SuperAdminSidebar } from "@/components/admin/SuperAdminSidebar";
import { MSPAnalyticsDashboard } from "@/components/admin/msp/MSPAnalyticsDashboard";

export default function MSPAnalytics() {
  return (
    <div className="flex h-screen bg-admin-surface">
      <SuperAdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-admin-primary mb-2">MSP Analytics</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and performance insights across all MSPs
            </p>
          </div>
          <MSPAnalyticsDashboard />
        </div>
      </div>
    </div>
  );
}