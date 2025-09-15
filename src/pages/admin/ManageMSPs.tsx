import { SuperAdminSidebar } from "@/components/admin/SuperAdminSidebar";
import { MSPManagementTable } from "@/components/admin/msp/MSPManagementTable";

export default function ManageMSPs() {
  return (
    <div className="flex h-screen bg-admin-surface">
      <SuperAdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-admin-primary mb-2">Manage MSPs</h1>
            <p className="text-muted-foreground">
              Monitor and manage all Managed Service Providers in your platform
            </p>
          </div>
          <MSPManagementTable />
        </div>
      </div>
    </div>
  );
}