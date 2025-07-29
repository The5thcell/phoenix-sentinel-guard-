
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatusPulseProps {
  status: 'secure' | 'warning' | 'danger' | 'offline';
}

export const StatusPulse: React.FC<StatusPulseProps> = ({ status }) => {
  return (
    <div className="status-pulse">
      <span className={cn("status-pulse-dot", {
        "status-secure": status === 'secure',
        "status-warning": status === 'warning',
        "status-danger": status === 'danger',
        "status-offline": status === 'offline',
      })} />
      <span className={cn("status-pulse-ring", {
        "status-secure": status === 'secure',
        "status-warning": status === 'warning',
        "status-danger": status === 'danger',
        "status-offline": status === 'offline',
      })} />
    </div>
  );
};

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <div
              className={cn("text-xs font-medium mr-1", {
                "text-green-500": trend === "up",
                "text-red-500": trend === "down",
                "text-gray-500": trend === "neutral",
              })}
            >
              {trendValue}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
