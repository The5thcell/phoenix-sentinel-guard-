import React, { useState, useMemo } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Laptop, Smartphone, HardDrive, Shield, Fingerprint, UploadCloud, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import DeviceCard, { DeviceProps } from '@/components/dashboard/DeviceCard';
import DeviceFilters from '@/components/dashboard/DeviceFilters';
import DeviceDetailModal from '@/components/dashboard/DeviceDetailModal';
import MapView from '@/components/dashboard/MapView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Expanded mock devices with more variety
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
  {
    id: 'dev-007',
    name: 'Steam Valve Monitor',
    type: 'IIoT Sensor',
    location: 'Boiler Room',
    status: 'secure',
    lastSeen: '15 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '7 months',
    },
    firmware: {
      version: 'v1.3.1',
      status: 'current',
    },
  },
  {
    id: 'dev-008',
    name: 'Water Level Sensor',
    type: 'IIoT Sensor',
    location: 'Water Tank 2',
    status: 'secure',
    lastSeen: '4 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '9 months',
    },
    firmware: {
      version: 'v1.2.0',
      status: 'current',
    },
  },
  {
    id: 'dev-009',
    name: 'Emergency Generator',
    type: 'Power System',
    location: 'Building B, Basement',
    status: 'warning',
    lastSeen: '22 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '1 month',
    },
    firmware: {
      version: 'v2.0.1',
      status: 'update-available',
    },
  },
  {
    id: 'dev-010',
    name: 'Fire Suppression',
    type: 'Safety System',
    location: 'Server Room',
    status: 'secure',
    lastSeen: '12 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '12 months',
    },
    firmware: {
      version: 'v3.0.0',
      status: 'current',
    },
  },
  {
    id: 'dev-011',
    name: 'Air Quality Monitor',
    type: 'IIoT Sensor',
    location: 'Building C, Floor 2',
    status: 'secure',
    lastSeen: '3 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '10 months',
    },
    firmware: {
      version: 'v1.1.7',
      status: 'current',
    },
  },
  {
    id: 'dev-012',
    name: 'Backup Power Monitor',
    type: 'Power System',
    location: 'Utility Room',
    status: 'offline',
    lastSeen: '9 hrs ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '4 months',
    },
    firmware: {
      version: 'v1.0.5',
      status: 'critical-update',
    },
  },
];

// Add 15 more devices to meet the user's request
const ADDITIONAL_DEVICES: DeviceProps[] = [
  {
    id: 'dev-013',
    name: 'Power Line Monitor',
    type: 'Power System',
    location: 'Building A, Roof',
    status: 'secure',
    lastSeen: '10 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '8 months',
    },
    firmware: {
      version: 'v2.1.0',
      status: 'current',
    },
  },
  {
    id: 'dev-014',
    name: 'UPS Controller',
    type: 'Power System',
    location: 'Building B, Basement',
    status: 'secure',
    lastSeen: '5 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '7 months',
    },
    firmware: {
      version: 'v1.8.2',
      status: 'current',
    },
  },
  {
    id: 'dev-015',
    name: 'Security Camera',
    type: 'Safety System',
    location: 'Main Entrance',
    status: 'warning',
    lastSeen: '2 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '3 weeks',
    },
    firmware: {
      version: 'v1.5.0',
      status: 'update-available',
    },
  },
  {
    id: 'dev-016',
    name: 'Badge Reader',
    type: 'Safety System',
    location: 'Side Entrance',
    status: 'secure',
    lastSeen: '1 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '9 months',
    },
    firmware: {
      version: 'v2.0.1',
      status: 'current',
    },
  },
  {
    id: 'dev-017',
    name: 'Motion Sensor',
    type: 'Safety System',
    location: 'Hallway 1',
    status: 'offline',
    lastSeen: '2 days ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '5 months',
    },
    firmware: {
      version: 'v1.1.3',
      status: 'update-available',
    },
  },
  {
    id: 'dev-018',
    name: 'Vibration Sensor',
    type: 'IIoT Sensor',
    location: 'Machine Room',
    status: 'secure',
    lastSeen: '15 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '11 months',
    },
    firmware: {
      version: 'v1.3.0',
      status: 'current',
    },
  },
  {
    id: 'dev-019',
    name: 'Humidity Controller',
    type: 'IIoT Controller',
    location: 'Server Room',
    status: 'warning',
    lastSeen: '30 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '2 weeks',
    },
    firmware: {
      version: 'v1.4.5',
      status: 'update-available',
    },
  },
  {
    id: 'dev-020',
    name: 'Conveyor Belt Monitor',
    type: 'IIoT Sensor',
    location: 'Production Line 2',
    status: 'danger',
    lastSeen: '45 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '2 days',
    },
    firmware: {
      version: 'v1.0.9',
      status: 'critical-update',
    },
  },
  {
    id: 'dev-021',
    name: 'Network Switch',
    type: 'Network Device',
    location: 'IT Room',
    status: 'secure',
    lastSeen: '7 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '10 months',
    },
    firmware: {
      version: 'v2.5.0',
      status: 'current',
    },
  },
  {
    id: 'dev-022',
    name: 'Access Point',
    type: 'Network Device',
    location: 'Conference Room',
    status: 'secure',
    lastSeen: '8 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '9 months',
    },
    firmware: {
      version: 'v2.2.1',
      status: 'current',
    },
  },
  {
    id: 'dev-023',
    name: 'Firewall Appliance',
    type: 'Network Device',
    location: 'IT Room',
    status: 'secure',
    lastSeen: '1 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '12 months',
    },
    firmware: {
      version: 'v3.1.0',
      status: 'current',
    },
  },
  {
    id: 'dev-024',
    name: 'Voltage Monitor',
    type: 'Power System',
    location: 'Electrical Room',
    status: 'danger',
    lastSeen: '18 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '5 days',
    },
    firmware: {
      version: 'v1.1.2',
      status: 'critical-update',
    },
  },
  {
    id: 'dev-025',
    name: 'Pressure Valve',
    type: 'IIoT Actuator',
    location: 'Boiler Room',
    status: 'warning',
    lastSeen: '25 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '3 weeks',
    },
    firmware: {
      version: 'v1.2.8',
      status: 'update-available',
    },
  },
  {
    id: 'dev-026',
    name: 'Smoke Detector',
    type: 'Safety System',
    location: 'Kitchen',
    status: 'secure',
    lastSeen: '3 min ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '10 months',
    },
    firmware: {
      version: 'v2.0.3',
      status: 'current',
    },
  },
  {
    id: 'dev-027',
    name: 'Backup Router',
    type: 'Network Device',
    location: 'IT Room',
    status: 'offline',
    lastSeen: '3 days ago',
    certificates: {
      issuer: 'Phoenix CA',
      expiresIn: '6 months',
    },
    firmware: {
      version: 'v1.9.0',
      status: 'update-available',
    },
  },
];

// Combine the original devices with the additional ones
const ALL_DEVICES = [...MOCK_DEVICES, ...ADDITIONAL_DEVICES];

// Simulation of API calls to your Go backend
const simulateDeviceRegistration = (): Promise<{ success: boolean, message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() < 0.8;
      resolve({
        success,
        message: success 
          ? "Device registered successfully with cryptographic identity verified." 
          : "Failed to register device. Certificate validation error."
      });
    }, 1500);
  });
};

const DevicesPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState<DeviceProps | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const { toast } = useToast();

  const handleRegisterDevice = async () => {
    setIsRegistering(true);
    try {
      // This would be a real API call to your Go backend
      const result = await simulateDeviceRegistration();
      
      toast({
        title: result.success ? "Device Registered" : "Registration Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to the device registry service.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleLocationChange = (value: string) => {
    setLocationFilter(value);
  };

  const handleViewDeviceDetails = (device: DeviceProps) => {
    setSelectedDevice(device);
    setIsDetailModalOpen(true);
  };

  // Extract all unique locations from devices
  const locations = useMemo(() => {
    return ALL_DEVICES.map(device => device.location);
  }, []);

  const filteredDevices = useMemo(() => {
    return ALL_DEVICES.filter(device => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Type filter
      const matchesType = typeFilter === 'all' || device.type === typeFilter;
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
      
      // Location filter
      const matchesLocation = locationFilter === 'all' || device.location === locationFilter;
      
      return matchesSearch && matchesType && matchesStatus && matchesLocation;
    });
  }, [searchTerm, typeFilter, statusFilter, locationFilter]);

  // Calculate statistics based on filtered devices
  const deviceStats = useMemo(() => {
    const stats = {
      sensors: 0,
      controllers: 0,
      networkDevices: 0,
      secure: 0,
      warnings: 0,
      atRisk: 0,
      offline: 0
    };

    filteredDevices.forEach(device => {
      // Count by type
      if (device.type.includes('Sensor')) stats.sensors++;
      else if (device.type.includes('Controller')) stats.controllers++;
      else if (device.type.includes('Network')) stats.networkDevices++;

      // Count by status
      if (device.status === 'secure') stats.secure++;
      else if (device.status === 'warning') stats.warnings++;
      else if (device.status === 'danger') stats.atRisk++;
      else if (device.status === 'offline') stats.offline++;
    });

    return stats;
  }, [filteredDevices]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Devices</h1>
            <p className="text-muted-foreground">Manage and monitor all your registered IoT devices.</p>
          </div>
          <Button 
            onClick={handleRegisterDevice}
            disabled={isRegistering}
            className="flex items-center gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            {isRegistering ? 'Registering...' : 'Register Device'}
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IoT Sensors</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deviceStats.sensors}</div>
              <p className="text-xs text-muted-foreground">Temperature, Pressure, Flow sensors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Controllers</CardTitle>
              <Laptop className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deviceStats.controllers}</div>
              <p className="text-xs text-muted-foreground">HVAC, Motor, Process controllers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Devices</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deviceStats.networkDevices}</div>
              <p className="text-xs text-muted-foreground">Gateways, Routers, Switches</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Overview</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 text-sm">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                  <span>{deviceStats.secure}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                  <span>{deviceStats.warnings}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                  <span>{deviceStats.atRisk}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-400 mr-1"></div>
                  <span>{deviceStats.offline}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Secure, Warning, At Risk, Offline</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Security Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Cryptographic Identity</h3>
                  <p className="text-sm text-muted-foreground">Each device is provisioned with a unique X.509 certificate for secure authentication.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Fingerprint className="h-6 w-6 text-purple-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Zero Trust Architecture</h3>
                  <p className="text-sm text-muted-foreground">Devices must authenticate for every request with no implicit trust.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Registered Devices</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('grid')}
              className="flex items-center gap-2"
            >
              Grid View
            </Button>
            <Button
              variant={view === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('map')}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Map View
            </Button>
          </div>
        </div>
        
        <DeviceFilters 
          onSearchChange={handleSearchChange}
          onTypeChange={handleTypeChange}
          onStatusChange={handleStatusChange}
          onLocationChange={handleLocationChange}
          locations={locations}
        />
        
        {view === 'grid' ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <DeviceCard 
                  key={device.id} 
                  {...device} 
                  onViewDetails={handleViewDeviceDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No devices match your current filters.</p>
              </div>
            )}
          </div>
        ) : (
          <MapView 
            devices={filteredDevices} 
            onSelectDevice={handleViewDeviceDetails} 
          />
        )}
      </div>
      
      <DeviceDetailModal 
        device={selectedDevice}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </Layout>
  );
};

export default DevicesPage;
