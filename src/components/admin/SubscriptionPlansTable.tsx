import { useState } from "react";
import { Search, Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SubscriptionPlanFormModal } from "./SubscriptionPlanFormModal";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "annually";
  trialPeriod: number;
  features: string[];
  activeUsers: number;
  status: "active" | "deprecated";
}

const mockPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Starter",
    price: 29,
    billingCycle: "monthly",
    trialPeriod: 14,
    features: ["5 Social Accounts", "50 Posts/Month", "Basic Analytics", "Email Support"],
    activeUsers: 127,
    status: "active",
  },
  {
    id: "2",
    name: "Professional",
    price: 79,
    billingCycle: "monthly",
    trialPeriod: 14,
    features: ["15 Social Accounts", "200 Posts/Month", "Advanced Analytics", "A/B Testing", "Priority Support"],
    activeUsers: 89,
    status: "active",
  },
  {
    id: "3",
    name: "Enterprise",
    price: 199,
    billingCycle: "monthly",
    trialPeriod: 30,
    features: ["Unlimited Accounts", "Unlimited Posts", "Custom Analytics", "White Label", "Dedicated Support"],
    activeUsers: 34,
    status: "active",
  },
];

export function SubscriptionPlansTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);

  const filteredPlans = mockPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowFormModal(true);
  };

  const handleDeleteClick = (plan: SubscriptionPlan) => {
    setPlanToDelete(plan);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (planToDelete) {
      console.log("Deleting plan:", planToDelete.id);
      // Handle delete logic here
      setShowDeleteDialog(false);
      setPlanToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setShowFormModal(false);
    setSelectedPlan(null);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      deprecated: "secondary",
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const totalRevenue = mockPlans.reduce((sum, plan) => sum + (plan.price * plan.activeUsers), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Subscription Plans</h2>
          <p className="text-muted-foreground mt-2">
            Manage subscription tiers and pricing for the platform
          </p>
        </div>
        <Button onClick={() => setShowFormModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Plan
        </Button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPlans.filter(p => p.status === "active").length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPlans.reduce((sum, plan) => sum + plan.activeUsers, 0)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Revenue Per User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(totalRevenue / mockPlans.reduce((sum, plan) => sum + plan.activeUsers, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans ({filteredPlans.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Trial Period</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>${plan.price}/{plan.billingCycle === "monthly" ? "mo" : "yr"}</TableCell>
                  <TableCell className="capitalize">{plan.billingCycle}</TableCell>
                  <TableCell>{plan.trialPeriod} days</TableCell>
                  <TableCell>{plan.activeUsers}</TableCell>
                  <TableCell>{getStatusBadge(plan.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(plan)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Plan
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeleteClick(plan)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Plan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Modal */}
      <SubscriptionPlanFormModal
        open={showFormModal}
        onOpenChange={handleCloseModal}
        plan={selectedPlan}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscription Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{planToDelete?.name}"? This action cannot be undone.
              {planToDelete?.activeUsers && planToDelete.activeUsers > 0 && (
                <div className="mt-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <strong>Warning:</strong> This plan has {planToDelete.activeUsers} active subscribers. 
                  Deleting it will affect their access to the platform.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}