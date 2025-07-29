
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusPulse } from './StatusCard';
import { Cpu, Clock, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface DeviceProps {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'secure' | 'warning' | 'danger' | 'offline';
  lastSeen: string;
  certificates?: {
    issuer: string;
    expiresIn: string;
  };
  firmware?: {
    version: string;
    status: 'current' | 'update-available' | 'critical-update';
  };
}

interface DeviceCardProps extends DeviceProps {
  onViewDetails?: (device: DeviceProps) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  name,
  type,
  location,
  status,
  lastSeen,
  certificates,
  firmware,
  onViewDetails,
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails({
        id,
        name,
        type,
        location,
        status,
        lastSeen,
        certificates,
        firmware,
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <div className="flex items-center space-x-1">
          <StatusPulse status={status} />
          <span className="text-xs font-medium ml-2">
            {status === 'secure' && 'Secure'}
            {status === 'warning' && 'Warning'}
            {status === 'danger' && 'At Risk'}
            {status === 'offline' && 'Offline'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <Cpu className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Type:</span>
          </div>
          <div className="font-medium">{type}</div>
          
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Last Seen:</span>
          </div>
          <div className="font-medium">{lastSeen}</div>
          
          <div className="flex items-center">
            <Lock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Cert:</span>
          </div>
          <div className={cn("font-medium", {
            "text-green-500": certificates?.expiresIn.includes("month"),
            "text-amber-500": certificates?.expiresIn.includes("week"),
            "text-red-500": certificates?.expiresIn.includes("day"),
          })}>
            {certificates ? certificates.expiresIn : "N/A"}
          </div>
          
          <div className="flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Firmware:</span>
          </div>
          <div className={cn("font-medium", {
            "text-green-500": firmware?.status === "current",
            "text-amber-500": firmware?.status === "update-available",
            "text-red-500": firmware?.status === "critical-update",
          })}>
            {firmware ? firmware.version : "N/A"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;
