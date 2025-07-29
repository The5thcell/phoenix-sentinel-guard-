
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, ShieldAlert, ShieldX } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlertItem {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  deviceId: string;
  deviceName: string;
  acknowledged: boolean;
}

interface AlertsListProps {
  alerts: AlertItem[];
}

const getSeverityIcon = (severity: AlertItem['severity']) => {
  switch (severity) {
    case 'low':
      return <Shield className="h-4 w-4 text-alert-low" />;
    case 'medium':
      return <Shield className="h-4 w-4 text-alert-medium" />;
    case 'high':
      return <ShieldAlert className="h-4 w-4 text-alert-high" />;
    case 'critical':
      return <ShieldX className="h-4 w-4 text-alert-critical" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getSeverityText = (severity: AlertItem['severity']) => {
  switch (severity) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Medium';
    case 'high':
      return 'High';
    case 'critical':
      return 'Critical';
    default:
      return 'Unknown';
  }
};

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No alerts detected</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={cn(
                  "flex items-start p-3 rounded-md border", 
                  alert.acknowledged ? "opacity-60" : "",
                  {
                    "border-alert-low bg-alert-low/10": alert.severity === 'low',
                    "border-alert-medium bg-alert-medium/10": alert.severity === 'medium',
                    "border-alert-high bg-alert-high/10": alert.severity === 'high',
                    "border-alert-critical bg-alert-critical/10": alert.severity === 'critical',
                  }
                )}
              >
                <div className="mr-3 mt-0.5">{getSeverityIcon(alert.severity)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <span 
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full font-medium",
                        {
                          "bg-alert-low/20 text-alert-low": alert.severity === 'low',
                          "bg-alert-medium/20 text-alert-medium": alert.severity === 'medium',
                          "bg-alert-high/20 text-alert-high": alert.severity === 'high',
                          "bg-alert-critical/20 text-alert-critical": alert.severity === 'critical',
                        }
                      )}
                    >
                      {getSeverityText(alert.severity)}
                    </span>
                  </div>
                  <p className="text-xs my-1">{alert.description}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                    <span>{alert.deviceName}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsList;
