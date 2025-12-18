import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  secondaryValue?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function StatsCard({
  title,
  value,
  secondaryValue,
  tooltip,
  icon,
  loading = false,
  className,
}: StatsCardProps) {
  if (loading) {
    return (
      <Card className={cn("gradient-card border-border/50", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 bg-muted" />
            <Skeleton className="h-4 w-4 rounded-full bg-muted" />
          </div>
          <Skeleton className="mt-4 h-8 w-32 bg-muted" />
          <Skeleton className="mt-2 h-4 w-20 bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("gradient-card border-border/50 transition-all duration-300 hover:border-primary/30 hover:glow-primary", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            {tooltip && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground/50 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="mt-3">
            <span className="text-3xl font-bold tracking-tight" style={{ color: "#f44d1f" }}>
            {value}
            </span>
        </div>
        {secondaryValue && (
          <p className="mt-1 text-sm text-muted-foreground">{secondaryValue}</p>
        )}
      </CardContent>
    </Card>
  );
}
