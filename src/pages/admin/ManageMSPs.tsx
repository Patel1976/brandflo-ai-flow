import { MSPManagementTable } from "@/components/admin/MSPManagementTable";

export default function ManageMSPs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        <MSPManagementTable />
      </div>
    </div>
  );
}