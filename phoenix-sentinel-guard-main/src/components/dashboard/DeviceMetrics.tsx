
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, HardDrive, Database } from 'lucide-react';

interface DeviceMetricsProps {
  deviceId: string;
}

const DeviceMetrics: React.FC<DeviceMetricsProps> = ({ deviceId }) => {
  // In a real application, this data would be fetched from an API
  const metrics = {
    cpu: {
      usage: 45,
      cores: 4,
      temperature: 52,
      lastUpdated: new Date().toLocaleTimeString(),
    },
    memory: {
      total: 16, // GB
      used: 5.8,
      swapUsage: 0.2,
    },
    storage: {
      total: 512, // GB
      used: 210,
      health: 98, // percentage
      readSpeed: 420, // MB/s
      writeSpeed: 380, // MB/s
    },
    network: {
      upload: 1.2, // Mbps
      download: 5.8, // Mbps
      latency: 28, // ms
      packetLoss: 0.1, // percentage
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          <Cpu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.cpu.usage}%</div>
          <Progress 
            value={metrics.cpu.usage} 
            className="h-2 mt-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {metrics.cpu.cores} Cores | {metrics.cpu.temperature}°C
          </p>
          <p className="text-xs text-muted-foreground">
            Last updated: {metrics.cpu.lastUpdated}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(metrics.memory.used / metrics.memory.total * 100).toFixed(1)}%</div>
          <Progress 
            value={(metrics.memory.used / metrics.memory.total) * 100} 
            className="h-2 mt-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {metrics.memory.used}GB / {metrics.memory.total}GB
          </p>
          <p className="text-xs text-muted-foreground">
            Swap: {metrics.memory.swapUsage}GB
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Health</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.storage.health}%</div>
          <Progress 
            value={metrics.storage.health} 
            className="h-2 mt-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {metrics.storage.used}GB / {metrics.storage.total}GB
          </p>
          <p className="text-xs text-muted-foreground">
            R: {metrics.storage.readSpeed} MB/s | W: {metrics.storage.writeSpeed} MB/s
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceMetrics;
