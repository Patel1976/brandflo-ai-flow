import { MSPAnalyticsDashboard } from "@/components/admin/MSPAnalyticsDashboard";

export default function MSPAnalytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        <MSPAnalyticsDashboard />
      </div>
    </div>
  );
}