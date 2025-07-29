
import React from 'react';
import Layout from '@/components/dashboard/Layout';
import StatusCard from '@/components/dashboard/StatusCard';
import DeviceCard, { DeviceProps } from '@/components/dashboard/DeviceCard';
import AlertsList, { AlertItem } from '@/components/dashboard/AlertsList';
import SecurityOverview from '@/components/dashboard/SecurityOverview';
import ThreatTimeline from '@/components/dashboard/ThreatTimeline';
import DeviceRegistration from '@/components/dashboard/DeviceRegistration';
import { Shield, ShieldAlert, ShieldCheck, ShieldX, Lock } from 'lucide-react';

const securityData = [
  { name: 'Secure', value: 85, color: '#10b981' },
  { name: 'Warning', value: 10, color: '#f59e0b' },
  { name: 'Critical', value: 3, color: '#ef4444' },
  { name: 'Offline', value: 2, color: '#6b7280' }
];

const threatTimelineData = [
  { time: '00:00', low: 5, medium: 2, high: 0, critical: 0 },
  { time: '04:00', low: 3, medium: 1, high: 1, critical: 0 },
  { time: '08:00', low: 7, medium: 3, high: 2, critical: 0 },
  { time: '12:00', low: 8, medium: 4, high: 3, critical: 1 },
  { time: '16:00', low: 12, medium: 6, high: 2, critical: 0 },
  { time: '20:00', low: 6, medium: 2, high: 1, critical: 0 },
];

const deviceRegistrationData = [
  { date: 'Apr 05', successful: 12, failed: 2, pending: 1 },
  { date: 'Apr 06', successful: 9, failed: 1, pending: 3 },
  { date: 'Apr 07', successful: 15, failed: 0, pending: 2 },
  { date: 'Apr 08', successful: 18, failed: 3, pending: 4 },
  { date: 'Apr 09', successful: 14, failed: 1, pending: 2 },
  { date: 'Apr 10', successful: 21, failed: 2, pending: 3 },
  { date: 'Apr 11', successful: 17, failed: 1, pending: 5 },
];

const MOCK_DEVICES: DeviceProps[] = [
  {
    id: 'dev-001',
    name: 'Temperature Sensor 1',
    type: 'IIoT Sensor',
    location: 'Building A, Floor 1',
    status: 'secure',
    lastSeen: '2 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '6 months',
    },
    firmware: {
      version: 'v1.2.0',
      status: 'current',
    },
  },
  {
    id: 'dev-002',
    name: 'Pressure Monitor',
    type: 'IIoT Controller',
    location: 'Building B, Floor 2',
    status: 'warning',
    lastSeen: '5 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '2 weeks',
    },
    firmware: {
      version: 'v1.1.5',
      status: 'update-available',
    },
  },
  {
    id: 'dev-003',
    name: 'Motor Controller',
    type: 'IIoT Actuator',
    location: 'Building A, Floor 3',
    status: 'danger',
    lastSeen: '1 hr ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '3 days',
    },
    firmware: {
      version: 'v1.0.8',
      status: 'critical-update',
    },
  },
  {
    id: 'dev-004',
    name: 'Gateway Router',
    type: 'Network Device',
    location: 'Data Center',
    status: 'secure',
    lastSeen: 'just now',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '11 months',
    },
    firmware: {
      version: 'v2.0.1',
      status: 'current',
    },
  },
  {
    id: 'dev-005',
    name: 'Flow Sensor 3',
    type: 'IIoT Sensor',
    location: 'Building C, Floor 1',
    status: 'secure',
    lastSeen: '7 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '8 months',
    },
    firmware: {
      version: 'v1.2.0',
      status: 'current',
    },
  },
  {
    id: 'dev-006',
    name: 'HVAC Controller',
    type: 'IIoT Controller',
    location: 'Building A, Roof',
    status: 'offline',
    lastSeen: '1 day ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '5 months',
    },
    firmware: {
      version: 'v1.1.8',
      status: 'update-available',
    },
  },
  // New devices added below
  {
    id: 'dev-007',
    name: 'Factory Floor Camera',
    type: 'Security Device',
    location: 'Building B, Production Area',
    status: 'secure',
    lastSeen: '4 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '9 months',
    },
    firmware: {
      version: 'v2.1.0',
      status: 'current',
    },
  },
  {
    id: 'dev-008',
    name: 'Conveyor Belt Sensor',
    type: 'IIoT Sensor',
    location: 'Building C, Assembly Line',
    status: 'warning',
    lastSeen: '15 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '1 month',
    },
    firmware: {
      version: 'v1.3.2',
      status: 'update-available',
    },
  },
  {
    id: 'dev-009',
    name: 'Robotic Arm Controller',
    type: 'IIoT Actuator',
    location: 'Building B, Floor 1',
    status: 'danger',
    lastSeen: '27 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '5 days',
    },
    firmware: {
      version: 'v1.0.7',
      status: 'critical-update',
    },
  },
  {
    id: 'dev-010',
    name: 'Backup Power Monitor',
    type: 'Power System',
    location: 'Utility Room',
    status: 'secure',
    lastSeen: '1 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '10 months',
    },
    firmware: {
      version: 'v2.2.0',
      status: 'current',
    },
  },
  {
    id: 'dev-011',
    name: 'Water Flow Regulator',
    type: 'IIoT Controller',
    location: 'Building A, Basement',
    status: 'offline',
    lastSeen: '2 days ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '4 months',
    },
    firmware: {
      version: 'v1.5.3',
      status: 'update-available',
    },
  },
  {
    id: 'dev-012',
    name: 'Air Quality Sensor',
    type: 'IIoT Sensor',
    location: 'Building C, Floor 2',
    status: 'secure',
    lastSeen: '8 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '7 months',
    },
    firmware: {
      version: 'v1.4.0',
      status: 'current',
    },
  },
];

const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'alert-001',
    severity: 'critical',
    title: 'Unauthorized Certificate Manipulation',
    description: 'Attempt to modify device certificate detected on Motor Controller',
    timestamp: '15 min ago',
    deviceId: 'dev-003',
    deviceName: 'Motor Controller',
    acknowledged: false,
  },
  {
    id: 'alert-002',
    severity: 'high',
    title: 'Anomalous Authentication Pattern',
    description: 'Multiple failed authentication attempts from unknown source',
    timestamp: '32 min ago',
    deviceId: 'dev-002',
    deviceName: 'Pressure Monitor',
    acknowledged: false,
  },
  {
    id: 'alert-003',
    severity: 'medium',
    title: 'Firmware Update Required',
    description: 'Critical security updates available for device firmware',
    timestamp: '1 hr ago',
    deviceId: 'dev-006',
    deviceName: 'HVAC Controller',
    acknowledged: true,
  },
  {
    id: 'alert-004',
    severity: 'low',
    title: 'Unusual Data Transmission Pattern',
    description: 'Device sending data at unexpected intervals',
    timestamp: '3 hrs ago',
    deviceId: 'dev-001',
    deviceName: 'Temperature Sensor 1',
    acknowledged: true,
  },
  // New alerts added below
  {
    id: 'alert-005',
    severity: 'critical',
    title: 'Physical Tamper Detection',
    description: 'Possible physical tampering detected on Robotic Arm Controller',
    timestamp: '12 min ago',
    deviceId: 'dev-009',
    deviceName: 'Robotic Arm Controller',
    acknowledged: false,
  },
  {
    id: 'alert-006',
    severity: 'high',
    title: 'Unauthorized Firmware Modification',
    description: 'Hash mismatch detected on device firmware update',
    timestamp: '45 min ago',
    deviceId: 'dev-008',
    deviceName: 'Conveyor Belt Sensor',
    acknowledged: false,
  },
  {
    id: 'alert-007',
    severity: 'medium',
    title: 'Connection Timeout',
    description: 'Device repeatedly failing to maintain secure connection',
    timestamp: '2 hrs ago',
    deviceId: 'dev-011',
    deviceName: 'Water Flow Regulator',
    acknowledged: true,
  },
  {
    id: 'alert-008',
    severity: 'low',
    title: 'Configuration Change',
    description: 'Device configuration modified outside maintenance window',
    timestamp: '5 hrs ago',
    deviceId: 'dev-007',
    deviceName: 'Factory Floor Camera',
    acknowledged: false,
  },
  {
    id: 'alert-009',
    severity: 'high',
    title: 'Data Encryption Failure',
    description: 'Communication encryption failing during data transmission',
    timestamp: '1 hr ago',
    deviceId: 'dev-010',
    deviceName: 'Backup Power Monitor',
    acknowledged: false,
  },
  {
    id: 'alert-010',
    severity: 'medium',
    title: 'API Access Anomaly',
    description: 'Unusual pattern of API access detected from device',
    timestamp: '3 hrs ago',
    deviceId: 'dev-012',
    deviceName: 'Air Quality Sensor',
    acknowledged: true,
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Security overview and device management for Phoenix Shield.</p>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Total Devices"
            value="128"
            description="12 devices added in the last 24h"
            icon={<Shield className="h-4 w-4 text-muted-foreground" />}
            trend="up"
            trendValue="+10.5%"
          />
          <StatusCard
            title="Secure Devices"
            value="109"
            description="85% of all devices"
            icon={<ShieldCheck className="h-4 w-4 text-green-500" />}
            trend="up"
            trendValue="+5.2%"
          />
          <StatusCard
            title="At-Risk Devices"
            value="17"
            description="Requiring security updates"
            icon={<ShieldAlert className="h-4 w-4 text-amber-500" />}
            trend="down"
            trendValue="-2.3%"
          />
          <StatusCard
            title="Security Incidents"
            value="3"
            description="Critical issues in the last 24h"
            icon={<ShieldX className="h-4 w-4 text-red-500" />}
            trend="up"
            trendValue="+1"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <SecurityOverview data={securityData} />
          <ThreatTimeline data={threatTimelineData} />
        </div>

        {/* Device Registration Chart */}
        <div className="dashboard-section">
          <DeviceRegistration data={deviceRegistrationData} />
        </div>

        {/* Devices Section */}
        <div className="dashboard-section">
          <h2 className="text-xl font-semibold mb-4">Registered Devices</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MOCK_DEVICES.slice(0, 8).map((device) => (
              <DeviceCard key={device.id} {...device} />
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="dashboard-section">
          <AlertsList alerts={MOCK_ALERTS.slice(0, 6)} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
