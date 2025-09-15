import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardChartProps {
  title: string;
  description?: string;
  variant?: "admin" | "msp" | "default";
  className?: string;
  loading?: boolean;
}

export function DashboardChart({ 
  title, 
  description, 
  variant = "default", 
  className,
  loading = false 
}: DashboardChartProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "admin":
        return "bg-gradient-admin-card border-admin-border shadow-glass";
      case "msp":
        return "bg-gradient-msp-card border-msp-border shadow-glass";
      default:
        return "bg-gradient-card border-card-border shadow-soft";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "admin":
        return "text-admin-primary";
      case "msp":
        return "text-msp-primary";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={cn(
      "backdrop-blur-sm",
      getVariantStyles(),
      className
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className={cn("w-5 h-5", getIconColor())} />
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <div className="h-64 bg-gradient-to-br from-background/50 to-muted/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <div className="text-center space-y-2">
              <TrendingUp className={cn("w-12 h-12 mx-auto", getIconColor())} />
              <p className="text-muted-foreground">Chart visualization will be integrated here</p>
              <p className="text-xs text-muted-foreground/60">Connect with your preferred charting library</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}