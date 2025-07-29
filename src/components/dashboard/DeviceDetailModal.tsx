
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { DeviceProps } from './DeviceCard';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  History, 
  ChevronDown, 
  Shield, 
  Lock, 
  Wifi, 
  Zap, 
  Info, 
  FileText, 
  Terminal 
} from 'lucide-react';
import { StatusPulse } from './StatusCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DeviceDetailModalProps {
  device: DeviceProps | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({
  device,
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [isLogExpanded, setIsLogExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!device) return null;
  
  const handleUpdateFirmware = () => {
    toast({
      title: "Firmware Update Initiated",
      description: `Update process started for ${device.name}. This may take several minutes.`,
    });
    
    onOpenChange(false);
  };
  
  const needsFirmwareUpdate = device.firmware?.status === 'update-available' || 
                              device.firmware?.status === 'critical-update';
  
  // Simulate device logs
  const deviceLogs = [
    { timestamp: new Date(Date.now() - 1000).toISOString(), level: 'info', message: 'Certificate validation successful' },
    { timestamp: new Date(Date.now() - 60000).toISOString(), level: 'info', message: 'Connected to server' },
    { timestamp: new Date(Date.now() - 120000).toISOString(), level: 'info', message: 'Sensor reading: 23.5°C' },
    { timestamp: new Date(Date.now() - 180000).toISOString(), level: 'warning', message: 'Battery at 15%' },
    { timestamp: new Date(Date.now() - 3600000).toISOString(), level: 'info', message: 'Data transmission complete' },
    { timestamp: new Date(Date.now() - 7200000).toISOString(), level: 'error', message: 'Connection timeout' },
    { timestamp: new Date(Date.now() - 86400000).toISOString(), level: 'info', message: 'Device startup' },
  ];
  
  // Simulate network diagnostics 
  const networkDiagnostics = {
    latency: '23ms',
    packetLoss: '0.2%',
    signalStrength: '87%',
    bandwidthUtilization: '42%',
    lastConnectionTest: new Date(Date.now() - 120000).toLocaleString(),
    protocol: 'MQTT over TLS 1.3',
    dataTransferred: '1.2GB',
    activeConnections: 3
  };
  
  // Simulate security assessment scores
  const securityScores = {
    overall: 78,
    encryption: 92,
    authentication: 85,
    vulnerabilities: 62,
    patchStatus: 75,
    dataProtection: 80
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{device.name}</span>
            <StatusPulse status={device.status} />
            <span className="text-sm font-normal text-muted-foreground">
              {device.status === 'secure' && 'Secure'}
              {device.status === 'warning' && 'Warning'}
              {device.status === 'danger' && 'At Risk'}
              {device.status === 'offline' && 'Offline'}
            </span>
          </DialogTitle>
          <DialogDescription>
            Device ID: <span className="font-mono text-xs">{device.id}</span>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-1">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-1">
              <Wifi className="h-4 w-4" />
              <span className="hidden sm:inline">Network</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1">
              <Terminal className="h-4 w-4" />
              <span className="hidden sm:inline">Logs</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    Device Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Type:</span>
                      <span className="text-xs font-medium">{device.type}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Location:</span>
                      <span className="text-xs font-medium">{device.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Last Seen:</span>
                      <span className="text-xs font-medium">{device.lastSeen}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Firmware:</span>
                      <span className={`text-xs font-medium ${
                        device.firmware?.status === 'current' ? 'text-green-500' : 
                        device.firmware?.status === 'update-available' ? 'text-amber-500' : 
                        'text-red-500'
                      }`}>
                        {device.firmware?.version || 'N/A'}
                        {device.firmware?.status === 'update-available' && ' (Update Available)'}
                        {device.firmware?.status === 'critical-update' && ' (Critical Update!)'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Certificate:</span>
                      <span className={`text-xs font-medium ${
                        device.certificates?.expiresIn.includes("month") ? "text-green-500" :
                        device.certificates?.expiresIn.includes("week") ? "text-amber-500" :
                        "text-red-500"
                      }`}>
                        {device.certificates?.expiresIn || 'N/A'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Issuer:</span>
                      <span className="text-xs font-medium">{device.certificates?.issuer || 'N/A'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Encryption:</span>
                      <span className="text-xs font-medium">AES-256</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Auth Method:</span>
                      <span className="text-xs font-medium">X.509 Certificate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {needsFirmwareUpdate && (
              <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-800 dark:text-amber-300">
                  {device.firmware?.status === 'critical-update' 
                    ? 'Critical security update available. Please update firmware immediately.'
                    : 'Firmware update available with security improvements.'}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="rounded-md border">
              <div className="p-3 font-medium text-sm flex items-center justify-between border-b">
                <span className="flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  Recent Activity
                </span>
                <Badge variant="outline" className="text-xs">Last 24 Hours</Badge>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Time</TableHead>
                    <TableHead className="w-[160px]">Event</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs">{new Date().toLocaleString()}</TableCell>
                    <TableCell>Connection check</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      {new Date(Date.now() - 3600000).toLocaleString()}
                    </TableCell>
                    <TableCell>Data transmission</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs">
                      {new Date(Date.now() - 86400000).toLocaleString()}
                    </TableCell>
                    <TableCell>Certificate verification</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Success</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Security Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Overall Score</span>
                      <span className="text-xs font-medium">{securityScores.overall}%</span>
                    </div>
                    <Progress value={securityScores.overall} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Encryption</span>
                        <span className="text-xs font-medium">{securityScores.encryption}%</span>
                      </div>
                      <Progress value={securityScores.encryption} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Authentication</span>
                        <span className="text-xs font-medium">{securityScores.authentication}%</span>
                      </div>
                      <Progress value={securityScores.authentication} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Vulnerabilities</span>
                        <span className="text-xs font-medium">{securityScores.vulnerabilities}%</span>
                      </div>
                      <Progress value={securityScores.vulnerabilities} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Patch Status</span>
                        <span className="text-xs font-medium">{securityScores.patchStatus}%</span>
                      </div>
                      <Progress value={securityScores.patchStatus} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="rounded-md border">
              <div className="p-3 font-medium text-sm border-b">
                Security Configuration
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Encryption Protocol</span>
                    <span className="text-sm font-medium">TLS 1.3</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Cipher Suite</span>
                    <span className="text-sm font-medium">ECDHE-RSA-AES256-GCM-SHA384</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Key Exchange</span>
                    <span className="text-sm font-medium">ECDHE (P-256)</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Certificate Type</span>
                    <span className="text-sm font-medium">X.509v3</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Key Length</span>
                    <span className="text-sm font-medium">2048 bits</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Signature Algorithm</span>
                    <span className="text-sm font-medium">SHA-256 with RSA</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="p-3 font-medium text-sm border-b">
                Vulnerability Report
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {needsFirmwareUpdate && (
                    <TableRow>
                      <TableCell>
                        <Badge variant="destructive" className="whitespace-nowrap">Critical</Badge>
                      </TableCell>
                      <TableCell className="text-xs">Outdated firmware with known CVE-2023-1234 vulnerability</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Open</Badge>
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 whitespace-nowrap">
                        Medium
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">Default password not changed from manufacturer</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 whitespace-nowrap">
                        Low
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">MQTT broker using anonymous connections</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Fixed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Network Tab */}
          <TabsContent value="network" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-primary" />
                    Network Diagnostics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Latency:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.latency}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Packet Loss:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.packetLoss}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Signal Strength:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.signalStrength}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Last Test:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.lastConnectionTest}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Connection Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Protocol:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.protocol}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Data Transferred:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.dataTransferred}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Bandwidth Usage:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.bandwidthUtilization}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="text-xs text-muted-foreground">Active Connections:</span>
                      <span className="text-xs font-medium">{networkDiagnostics.activeConnections}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="rounded-md border">
              <div className="p-3 font-medium text-sm border-b">
                Connection History (Last 24h)
              </div>
              <div className="p-4">
                <div className="h-40 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Network traffic data visualization would appear here</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="p-3 font-medium text-sm border-b">
                Network Configuration
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">IP Address</span>
                    <span className="text-sm font-medium">192.168.1.45</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">MAC Address</span>
                    <span className="text-sm font-medium">6C:88:14:E8:2B:D4</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Subnet Mask</span>
                    <span className="text-sm font-medium">255.255.255.0</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Gateway</span>
                    <span className="text-sm font-medium">192.168.1.1</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">DNS Servers</span>
                    <span className="text-sm font-medium">8.8.8.8, 8.8.4.4</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">Network Type</span>
                    <span className="text-sm font-medium">Ethernet (100 Mbps)</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Logs Tab */}
          <TabsContent value="logs" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    Device Logs
                  </span>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Download Logs
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-md border bg-muted/20 overflow-hidden">
                  <div className="max-h-[300px] overflow-y-auto font-mono text-xs p-1">
                    {deviceLogs.map((log, index) => (
                      <div 
                        key={index} 
                        className={`py-1 px-2 ${
                          index % 2 === 0 ? 'bg-background/60' : 'bg-muted/30'
                        } ${
                          log.level === 'error' ? 'text-red-500' : 
                          log.level === 'warning' ? 'text-amber-500' : 
                          'text-foreground'
                        }`}
                      >
                        <span className="mr-2 opacity-70">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="uppercase font-semibold mr-2">
                          [{log.level}]
                        </span>
                        <span>{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Collapsible 
                  open={isLogExpanded} 
                  onOpenChange={setIsLogExpanded}
                  className="mt-4"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1 text-xs">
                      <span>
                        {isLogExpanded ? 'Hide Advanced Options' : 'Show Advanced Options'}
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isLogExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Clear Logs
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Export as CSV
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Set Log Level
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Configure Alerts
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 gap-2">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-auto"
            >
              Close
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-auto"
            >
              Remote Debug
            </Button>
          </div>
          {needsFirmwareUpdate && (
            <Button 
              onClick={handleUpdateFirmware} 
              className="gap-2 w-full sm:w-auto"
            >
              <Activity className="h-4 w-4" />
              Update Firmware
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetailModal;
