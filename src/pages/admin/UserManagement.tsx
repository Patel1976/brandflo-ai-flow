import { UserManagementTable } from "@/components/admin/UserManagementTable";

export default function UserManagement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        <UserManagementTable />
      </div>
    </div>
  );
}