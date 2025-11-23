import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "primary" | "secondary" | "success";
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
}: StatCardProps) {
  const variantClasses = {
    default: "border-border",
    primary: "border-primary/20 bg-primary-light",
    secondary: "border-secondary/20 bg-secondary-light",
    success: "border-success/20 bg-success/5",
  };

  const iconVariantClasses = {
    default: "bg-muted text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
  };

  const changeTypeClasses = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className={cn("border-2 hover-glow transition-all duration-300", variantClasses[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {change && (
              <p className={cn("text-sm font-medium", changeTypeClasses[changeType])}>
                {change}
              </p>
            )}
          </div>
          <div
            className={cn(
              "rounded-xl p-3 shadow-md",
              iconVariantClasses[variant]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
