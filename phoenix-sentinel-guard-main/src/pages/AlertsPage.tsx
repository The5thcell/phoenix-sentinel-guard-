import React, { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AlertsList from '@/components/dashboard/AlertsList';
import { BellRing, AlertTriangle, ShieldAlert, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Updated mock alerts with a total of 30 items
const MOCK_ALERTS = [
  {
    id: 'alert-001',
    severity: 'critical' as const,
    title: 'Unauthorized Certificate Manipulation',
    description: 'Attempt to modify device certificate detected on Motor Controller',
    timestamp: '15 min ago',
    deviceId: 'dev-003',
    deviceName: 'Motor Controller',
    acknowledged: false,
  },
  {
    id: 'alert-002',
    severity: 'high' as const,
    title: 'Anomalous Authentication Pattern',
    description: 'Multiple failed authentication attempts from unknown source',
    timestamp: '32 min ago',
    deviceId: 'dev-002',
    deviceName: 'Pressure Monitor',
    acknowledged: false,
  },
  {
    id: 'alert-003',
    severity: 'medium' as const,
    title: 'Firmware Update Required',
    description: 'Critical security updates available for device firmware',
    timestamp: '1 hr ago',
    deviceId: 'dev-006',
    deviceName: 'HVAC Controller',
    acknowledged: true,
  },
  {
    id: 'alert-004',
    severity: 'low' as const,
    title: 'Unusual Data Transmission Pattern',
    description: 'Device sending data at unexpected intervals',
    timestamp: '3 hrs ago',
    deviceId: 'dev-001',
    deviceName: 'Temperature Sensor 1',
    acknowledged: true,
  },
  {
    id: 'alert-005',
    severity: 'critical' as const,
    title: 'Physical Tamper Detection',
    description: 'Possible physical tampering detected on gateway device',
    timestamp: '20 min ago',
    deviceId: 'dev-004',
    deviceName: 'Gateway Router',
    acknowledged: false,
  },
  {
    id: 'alert-006',
    severity: 'high' as const,
    title: 'Unexpected Firmware Change',
    description: 'Firmware hash mismatch detected on device',
    timestamp: '45 min ago',
    deviceId: 'dev-005',
    deviceName: 'Flow Sensor 3',
    acknowledged: false,
  },
  // Adding new alerts below
  {
    id: 'alert-007',
    severity: 'critical' as const,
    title: 'Physical Tamper Detection',
    description: 'Possible physical tampering detected on Robotic Arm Controller',
    timestamp: '12 min ago',
    deviceId: 'dev-009',
    deviceName: 'Robotic Arm Controller',
    acknowledged: false,
  },
  {
    id: 'alert-008',
    severity: 'high' as const,
    title: 'Unauthorized Firmware Modification',
    description: 'Hash mismatch detected on device firmware update',
    timestamp: '45 min ago',
    deviceId: 'dev-008',
    deviceName: 'Conveyor Belt Sensor',
    acknowledged: false,
  },
  {
    id: 'alert-009',
    severity: 'medium' as const,
    title: 'Connection Timeout',
    description: 'Device repeatedly failing to maintain secure connection',
    timestamp: '2 hrs ago',
    deviceId: 'dev-011',
    deviceName: 'Water Flow Regulator',
    acknowledged: true,
  },
  {
    id: 'alert-010',
    severity: 'low' as const,
    title: 'Configuration Change',
    description: 'Device configuration modified outside maintenance window',
    timestamp: '5 hrs ago',
    deviceId: 'dev-007',
    deviceName: 'Factory Floor Camera',
    acknowledged: false,
  },
  {
    id: 'alert-011',
    severity: 'high' as const,
    title: 'Data Encryption Failure',
    description: 'Communication encryption failing during data transmission',
    timestamp: '1 hr ago',
    deviceId: 'dev-010',
    deviceName: 'Backup Power Monitor',
    acknowledged: false,
  },
  {
    id: 'alert-012',
    severity: 'medium' as const,
    title: 'API Access Anomaly',
    description: 'Unusual pattern of API access detected from device',
    timestamp: '3 hrs ago',
    deviceId: 'dev-012',
    deviceName: 'Air Quality Sensor',
    acknowledged: true,
  },
  {
    id: 'alert-013',
    severity: 'critical' as const,
    title: 'Malicious Code Detected',
    description: 'Potential malicious code execution attempt identified',
    timestamp: '25 min ago',
    deviceId: 'dev-009',
    deviceName: 'Robotic Arm Controller',
    acknowledged: false,
  },
  {
    id: 'alert-014',
    severity: 'high' as const,
    title: 'Authentication Bypass Attempt',
    description: 'Multiple attempts to bypass authentication mechanism detected',
    timestamp: '50 min ago',
    deviceId: 'dev-007',
    deviceName: 'Factory Floor Camera',
    acknowledged: false,
  },
  {
    id: 'alert-015',
    severity: 'medium' as const,
    title: 'Abnormal Network Traffic',
    description: 'Unusual outbound connection patterns from device',
    timestamp: '4 hrs ago',
    deviceId: 'dev-010',
    deviceName: 'Backup Power Monitor',
    acknowledged: true,
  },
  {
    id: 'alert-016',
    severity: 'critical' as const,
    title: 'Malicious Code Detected',
    description: 'Potential malicious code execution attempt identified',
    timestamp: '25 min ago',
    deviceId: 'dev-009',
    deviceName: 'Robotic Arm Controller',
    acknowledged: false,
  },
  {
    id: 'alert-017',
    severity: 'high' as const,
    title: 'Authentication Bypass Attempt',
    description: 'Multiple attempts to bypass authentication mechanism detected',
    timestamp: '50 min ago',
    deviceId: 'dev-007',
    deviceName: 'Factory Floor Camera',
    acknowledged: false,
  },
  {
    id: 'alert-018',
    severity: 'medium' as const,
    title: 'Abnormal Network Traffic',
    description: 'Unusual outbound connection patterns from device',
    timestamp: '4 hrs ago',
    deviceId: 'dev-010',
    deviceName: 'Backup Power Monitor',
    acknowledged: true,
  },
  {
    id: 'alert-019',
    severity: 'low' as const,
    title: 'Anomalous Data Patterns',
    description: 'Unexpected data patterns detected in device transmissions',
    timestamp: '6 hrs ago',
    deviceId: 'dev-013',
    deviceName: 'Packaging Robot',
    acknowledged: true,
  },
  {
    id: 'alert-020',
    severity: 'critical' as const,
    title: 'Device Communication Hijack',
    description: 'Possible man-in-the-middle attack detected',
    timestamp: '18 min ago',
    deviceId: 'dev-016',
    deviceName: 'Assembly Line Sensor',
    acknowledged: false,
  },
  {
    id: 'alert-021',
    severity: 'high' as const,
    title: 'Malformed Protocol Request',
    description: 'Input validation bypass attempt detected',
    timestamp: '42 min ago',
    deviceId: 'dev-018',
    deviceName: 'Humidity Controller',
    acknowledged: false,
  },
  {
    id: 'alert-022',
    severity: 'medium' as const,
    title: 'Abnormal Device Access Pattern',
    description: 'Multiple access attempts outside normal operating hours',
    timestamp: '3 hrs ago',
    deviceId: 'dev-022',
    deviceName: 'Cooling System Monitor',
    acknowledged: true,
  },
  {
    id: 'alert-023',
    severity: 'low' as const,
    title: 'Unusual Command Sequence',
    description: 'Non-standard command sequence detected',
    timestamp: '8 hrs ago',
    deviceId: 'dev-025',
    deviceName: 'Warehouse Door Sensor',
    acknowledged: false,
  },
  {
    id: 'alert-024',
    severity: 'critical' as const,
    title: 'Remote Code Execution Attempt',
    description: 'Malicious exploit targeting firmware vulnerability',
    timestamp: '22 min ago',
    deviceId: 'dev-014',
    deviceName: 'Conveyor Speed Controller',
    acknowledged: false,
  },
  {
    id: 'alert-025',
    severity: 'high' as const,
    title: 'Denial of Service Attempt',
    description: 'Unusual traffic volume targeting device API',
    timestamp: '55 min ago',
    deviceId: 'dev-019',
    deviceName: 'Material Flow Sensor',
    acknowledged: false,
  },
  {
    id: 'alert-026',
    severity: 'medium' as const,
    title: 'API Token Misuse',
    description: 'Expired API token still being used for authentication',
    timestamp: '4 hrs ago',
    deviceId: 'dev-024',
    deviceName: 'Production Line Camera',
    acknowledged: true,
  },
  {
    id: 'alert-027',
    severity: 'low' as const,
    title: 'Unusual Time Synchronization',
    description: 'Device clock drifting from NTP server time',
    timestamp: '9 hrs ago',
    deviceId: 'dev-017',
    deviceName: 'Packaging Scale',
    acknowledged: true,
  },
  {
    id: 'alert-028',
    severity: 'critical' as const,
    title: 'Certificate Trust Chain Broken',
    description: 'Invalid certificate in the device trust chain',
    timestamp: '14 min ago',
    deviceId: 'dev-015',
    deviceName: 'Quality Control Scanner',
    acknowledged: false,
  },
  {
    id: 'alert-029',
    severity: 'high' as const,
    title: 'Configuration Manipulation',
    description: 'Unauthorized changes to device security configuration',
    timestamp: '47 min ago',
    deviceId: 'dev-021',
    deviceName: 'Storage Temperature Monitor',
    acknowledged: false,
  },
  {
    id: 'alert-030',
    severity: 'medium' as const,
    title: 'Protocol Downgrade Attempt',
    description: 'Attempt to force device to use less secure protocol version',
    timestamp: '5 hrs ago',
    deviceId: 'dev-023',
    deviceName: 'Shipping Area Scanner',
    acknowledged: true,
  },
];

const countAlertsBySeverity = (alerts) => {
  return {
    critical: alerts.filter(alert => alert.severity === 'critical').length,
    high: alerts.filter(alert => alert.severity === 'high').length,
    total: alerts.length
  };
};

const AlertsPage = () => {
  const [filteredAlerts, setFilteredAlerts] = useState(MOCK_ALERTS);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const alertCounts = countAlertsBySeverity(MOCK_ALERTS);
  
  const filterAlerts = (severity: string | null) => {
    setActiveFilter(severity);
    if (severity) {
      setFilteredAlerts(MOCK_ALERTS.filter(alert => alert.severity === severity));
    } else {
      setFilteredAlerts(MOCK_ALERTS);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
            <p className="text-muted-foreground">Monitor and respond to security alerts and notifications.</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {activeFilter ? `Filter: ${activeFilter}` : 'Filter Alerts'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => filterAlerts(null)}>
                    All Alerts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterAlerts('critical')}>
                    Critical Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterAlerts('high')}>
                    High Priority Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterAlerts('medium')}>
                    Medium Priority Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterAlerts('low')}>
                    Low Priority Only
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Badge className="px-3 py-1">
              <Bell className="h-3 w-3 mr-1" /> {filteredAlerts.length} {activeFilter ? `${activeFilter} alerts` : 'alerts'}
            </Badge>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertCounts.critical}</div>
              <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <ShieldAlert className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertCounts.high}</div>
              <p className="text-xs text-muted-foreground">Needs resolution soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <BellRing className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertCounts.total}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <div className="dashboard-section">
          <AlertsList alerts={filteredAlerts} />
        </div>
      </div>
    </Layout>
  );
};

export default AlertsPage;
