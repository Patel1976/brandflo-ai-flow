import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "admin" | "msp" | "default";
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  variant = "default",
  className 
}: KPICardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "admin":
        return "bg-gradient-admin-card border-admin-border shadow-glass hover:shadow-admin";
      case "msp":
        return "bg-gradient-msp-card border-msp-border shadow-glass hover:shadow-msp";
      default:
        return "bg-gradient-card border-card-border shadow-soft hover:shadow-medium";
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return variant === "admin" ? "text-admin-accent" : variant === "msp" ? "text-msp-accent" : "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "admin":
        return "text-admin-primary";
      case "msp":
        return "text-msp-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm",
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", getIconColor())} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={cn("text-xs font-medium", getChangeColor())}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}