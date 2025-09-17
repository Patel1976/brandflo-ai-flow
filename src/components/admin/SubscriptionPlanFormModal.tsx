import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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

interface SubscriptionPlanFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: SubscriptionPlan | null;
}

export function SubscriptionPlanFormModal({ open, onOpenChange, plan }: SubscriptionPlanFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    billingCycle: "monthly" as "monthly" | "annually",
    trialPeriod: 14,
    features: [] as string[],
    status: "active" as "active" | "deprecated",
  });
  
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        price: plan.price,
        billingCycle: plan.billingCycle,
        trialPeriod: plan.trialPeriod,
        features: [...plan.features],
        status: plan.status,
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        billingCycle: "monthly",
        trialPeriod: 14,
        features: [],
        status: "active",
      });
    }
  }, [plan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(plan ? "Updating plan:" : "Creating plan:", formData);
    onOpenChange(false);
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {plan ? "Edit Subscription Plan" : "Create New Subscription Plan"}
          </DialogTitle>
          <DialogDescription>
            {plan ? "Update the subscription plan details" : "Create a new subscription plan for users"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Professional"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                placeholder="29.99"
                min={0}
                step={0.01}
                required
              />
            </div>
          </div>

          {/* Billing and Trial */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select 
                value={formData.billingCycle} 
                onValueChange={(value: "monthly" | "annually") => 
                  setFormData(prev => ({ ...prev, billingCycle: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trialPeriod">Trial Period (days)</Label>
              <Input
                id="trialPeriod"
                type="number"
                value={formData.trialPeriod}
                onChange={(e) => setFormData(prev => ({ ...prev, trialPeriod: parseInt(e.target.value) }))}
                min={0}
                max={90}
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <Label>Features</Label>
            
            {/* Add Feature Input */}
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a feature..."
                className="flex-1"
              />
              <Button type="button" onClick={addFeature} size="sm">
                Add
              </Button>
            </div>
            
            {/* Features List */}
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeFeature(feature)}
                  />
                </Badge>
              ))}
            </div>
            
            {formData.features.length === 0 && (
              <p className="text-sm text-muted-foreground">No features added yet</p>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status === "active"}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, status: checked ? "active" : "deprecated" }))
              }
            />
            <Label htmlFor="status">
              Plan is {formData.status === "active" ? "Active" : "Deprecated"}
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {plan ? "Update Plan" : "Create Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}