
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DeviceFiltersProps {
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLocationChange?: (value: string) => void;
  locations?: string[];
}

const DeviceFilters: React.FC<DeviceFiltersProps> = ({
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onLocationChange,
  locations = []
}) => {
  // Create a unique list of locations from the provided locations array
  const uniqueLocations = React.useMemo(() => {
    return Array.from(new Set(locations)).sort();
  }, [locations]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search devices..."
          className="pl-8"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Select onValueChange={onTypeChange} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="IIoT Sensor">IoT Sensors</SelectItem>
          <SelectItem value="IIoT Controller">Controllers</SelectItem>
          <SelectItem value="IIoT Actuator">Actuators</SelectItem>
          <SelectItem value="Network Device">Network Devices</SelectItem>
          <SelectItem value="Power System">Power Systems</SelectItem>
          <SelectItem value="Safety System">Safety Systems</SelectItem>
        </SelectContent>
      </Select>
      
      <Select onValueChange={onStatusChange} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="secure">Secure</SelectItem>
          <SelectItem value="warning">Warning</SelectItem>
          <SelectItem value="danger">At Risk</SelectItem>
          <SelectItem value="offline">Offline</SelectItem>
        </SelectContent>
      </Select>

      {onLocationChange && uniqueLocations.length > 0 && (
        <Select onValueChange={onLocationChange} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default DeviceFilters;
