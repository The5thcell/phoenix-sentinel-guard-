
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DeviceProps } from './DeviceCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PopoverContent, Popover, PopoverTrigger } from '@/components/ui/popover';
import { Compass, Layers, MapPin, RefreshCw, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MapboxTokenInput from './MapboxTokenInput';

// This is a temporary approach - in production, you should use environment variables
// or fetch this from your Go microservice API
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN';

interface MapViewProps {
  devices: DeviceProps[];
  onSelectDevice?: (device: DeviceProps) => void;
}

interface LocationData {
  [key: string]: {
    lat: number;
    lng: number;
  };
}

const MAP_STYLES = [
  { id: 'light', name: 'Light', url: 'mapbox://styles/mapbox/light-v11' },
  { id: 'dark', name: 'Dark', url: 'mapbox://styles/mapbox/dark-v11' },
  { id: 'streets', name: 'Streets', url: 'mapbox://styles/mapbox/streets-v12' },
  { id: 'satellite', name: 'Satellite', url: 'mapbox://styles/mapbox/satellite-streets-v12' },
];

const MapView: React.FC<MapViewProps> = ({ devices, onSelectDevice }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [mapboxTokenInput, setMapboxTokenInput] = useState(MAPBOX_TOKEN);
  const [usingTempToken, setUsingTempToken] = useState(MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN');
  const [currentMapStyle, setCurrentMapStyle] = useState(MAP_STYLES[0]);
  const { toast } = useToast();
  
  // This simulates location data that would come from your Go microservice
  // In a real implementation, you would fetch this data from your backend
  const mockLocationData: LocationData = {
    'Building A, Floor 1': { lat: 37.7749, lng: -122.4194 },
    'Building A, Floor 3': { lat: 37.7749, lng: -122.4190 },
    'Building A, Roof': { lat: 37.7749, lng: -122.4188 },
    'Building A, Basement': { lat: 37.7749, lng: -122.4192 },
    'Building B, Floor 1': { lat: 37.7742, lng: -122.4184 },
    'Building B, Floor 2': { lat: 37.7742, lng: -122.4180 },
    'Building B, Basement': { lat: 37.7742, lng: -122.4182 },
    'Building B, Production Area': { lat: 37.7742, lng: -122.4178 },
    'Building C, Floor 1': { lat: 37.7756, lng: -122.4174 },
    'Building C, Floor 2': { lat: 37.7756, lng: -122.4170 },
    'Building C, Assembly Line': { lat: 37.7756, lng: -122.4168 },
    'Data Center': { lat: 37.7761, lng: -122.4158 },
    'Server Room': { lat: 37.7761, lng: -122.4160 },
    'Water Tank 2': { lat: 37.7765, lng: -122.4155 },
    'Boiler Room': { lat: 37.7768, lng: -122.4150 },
    'Machine Room': { lat: 37.7770, lng: -122.4145 },
    'Production Line 2': { lat: 37.7772, lng: -122.4140 },
    'IT Room': { lat: 37.7763, lng: -122.4162 },
    'Conference Room': { lat: 37.7758, lng: -122.4166 },
    'Electrical Room': { lat: 37.7766, lng: -122.4152 },
    'Kitchen': { lat: 37.7759, lng: -122.4164 },
    'Utility Room': { lat: 37.7764, lng: -122.4156 },
    'Main Entrance': { lat: 37.7751, lng: -122.4186 },
    'Side Entrance': { lat: 37.7753, lng: -122.4184 },
    'Hallway 1': { lat: 37.7752, lng: -122.4182 },
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxTokenInput || mapboxTokenInput === 'YOUR_MAPBOX_TOKEN') return;
    
    try {
      // Remove existing map if there is one
      if (map.current) {
        map.current.remove();
      }
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      mapboxgl.accessToken = mapboxTokenInput;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: currentMapStyle.url,
        center: [-122.4194, 37.7749], // Center on San Francisco by default
        zoom: 14,
        attributionControl: false,
        pitch: 30, // Add a slight tilt for a more 3D look
      });
      
      map.current.on('load', () => {
        if (!map.current) return;
        
        // Add fog effect for depth perception
        map.current.setFog({
          color: 'rgb(220, 220, 230)', // Light blue-gray fog
          'high-color': 'rgb(245, 245, 255)', // Light blue-gray fog at high altitudes
          'horizon-blend': 0.1, // Lower horizon blend for more gradual transition
          'space-color': 'rgb(220, 220, 255)', // Light purple space
          'star-intensity': 0.15 // Stars brightness
        });
        
        setMapReady(true);
        addDeviceMarkers();
        
        toast({
          title: "Map loaded successfully",
          description: "Interactive device map is now ready.",
        });
      });
      
      // Add navigation and other controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      }), 'top-right');
      
      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      
      // Add compass
      map.current.addControl(new mapboxgl.AttributionControl({
        compact: true
      }), 'bottom-right');
      
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        variant: "destructive",
        title: "Map Initialization Failed",
        description: "Error loading the map. Please check your Mapbox token.",
      });
    }
  };
  
  const changeMapStyle = (style: typeof MAP_STYLES[0]) => {
    setCurrentMapStyle(style);
    if (map.current) {
      map.current.setStyle(style.url);
      // Re-add markers after style change since they get removed
      setTimeout(() => {
        addDeviceMarkers();
      }, 500);
    }
  };
  
  const addDeviceMarkers = () => {
    if (!map.current || !mapReady) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Count device locations for clustering
    const locationCounts: Record<string, number> = {};
    
    devices.forEach(device => {
      const location = device.location;
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });
    
    // Add markers for each device
    devices.forEach(device => {
      const location = mockLocationData[device.location];
      if (location) {
        // Create a DOM element for the marker
        const el = document.createElement('div');
        el.className = 'device-marker';
        
        // Base size on number of devices in this location
        const count = locationCounts[device.location];
        const size = count > 1 ? Math.min(20 + (count * 3), 40) : 20; // Scale up with device count
        
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        
        // Set marker color based on device status
        if (device.status === 'secure') {
          el.style.backgroundColor = '#10b981'; // green
        } else if (device.status === 'warning') {
          el.style.backgroundColor = '#f59e0b'; // amber
        } else if (device.status === 'danger') {
          el.style.backgroundColor = '#ef4444'; // red
        } else {
          el.style.backgroundColor = '#6b7280'; // gray for offline
        }
        
        // Add visual enhancements
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 3px 6px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.3s ease';
        
        // Add count indicator if multiple devices at location
        if (count > 1) {
          el.textContent = count.toString();
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.color = 'white';
          el.style.fontWeight = 'bold';
          el.style.fontSize = '12px';
          el.style.fontFamily = 'sans-serif';
        }
        
        // Hover effects using mouse events
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.2)';
          el.style.boxShadow = '0 5px 10px rgba(0,0,0,0.4)';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.boxShadow = '0 3px 6px rgba(0,0,0,0.3)';
        });
        
        // Create popup with enhanced device info
        const popup = new mapboxgl.Popup({
          offset: size / 2,
          closeButton: false,
          className: 'device-popup'
        }).setHTML(`
          <div class="bg-popover p-3 rounded-md shadow-lg max-w-xs">
            <h3 class="font-bold text-lg mb-1 text-popover-foreground">${device.name}</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="text-muted-foreground">Type:</div>
              <div class="font-medium">${device.type}</div>
              
              <div class="text-muted-foreground">Status:</div>
              <div class="font-medium ${
                device.status === 'secure' ? 'text-green-500' : 
                device.status === 'warning' ? 'text-amber-500' : 
                device.status === 'danger' ? 'text-red-500' : 'text-gray-500'
              }">${device.status.charAt(0).toUpperCase() + device.status.slice(1)}</div>
              
              <div class="text-muted-foreground">Last seen:</div>
              <div class="font-medium">${device.lastSeen}</div>
              
              ${device.certificates ? `
                <div class="text-muted-foreground">Certificate:</div>
                <div class="font-medium">${device.certificates.expiresIn}</div>
              ` : ''}
              
              ${device.firmware ? `
                <div class="text-muted-foreground">Firmware:</div>
                <div class="font-medium ${
                  device.firmware.status === 'current' ? 'text-green-500' : 
                  device.firmware.status === 'update-available' ? 'text-amber-500' : 'text-red-500'
                }">${device.firmware.version}</div>
              ` : ''}
            </div>
            <button class="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-md text-xs font-medium w-full">View Details</button>
          </div>
        `);
        
        // Create and add the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
          
        // Add click event to marker
        el.addEventListener('click', () => {
          if (onSelectDevice) {
            setTimeout(() => {
              onSelectDevice(device);
            }, 100); // Small delay to allow popup to show first
          }
        });
        
        markersRef.current.push(marker);
      }
    });
    
    // Fit map to markers if there are any
    if (markersRef.current.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      devices.forEach(device => {
        const location = mockLocationData[device.location];
        if (location) {
          bounds.extend([location.lng, location.lat]);
        }
      });
      
      map.current.fitBounds(bounds, {
        padding: 80,
        maxZoom: 15,
        duration: 1000 // Smooth animation
      });
    }
  };
  
  // Initialize map on component mount
  useEffect(() => {
    if (!usingTempToken) {
      initializeMap();
    }
    
    return () => {
      // Cleanup
      if (map.current) {
        map.current.remove();
      }
    };
  }, [usingTempToken, mapboxTokenInput, currentMapStyle]);
  
  // Update markers when devices change
  useEffect(() => {
    if (mapReady) {
      addDeviceMarkers();
    }
  }, [devices, mapReady]);
  
  const handleTokenSubmit = (token: string) => {
    if (token && token !== 'YOUR_MAPBOX_TOKEN') {
      setMapboxTokenInput(token);
      setUsingTempToken(false);
    }
  };
  
  // Add some global styles for the map popups
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-popup-content {
        padding: 0 !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
      }
      .mapboxgl-popup-close-button {
        display: none !important;
      }
      .mapboxgl-popup-tip {
        border-top-color: hsl(var(--popover)) !important;
        border-bottom-color: hsl(var(--popover)) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // If using temporary token, show input for Mapbox token
  if (usingTempToken) {
    return (
      <MapboxTokenInput onSubmit={handleTokenSubmit} />
    );
  }
  
  return (
    <Card className="overflow-hidden relative">
      <CardHeader className="flex flex-row items-center justify-between py-3 bg-gradient-to-r from-indigo-800/20 to-purple-800/20 backdrop-blur-sm border-b border-slate-800/20">
        <CardTitle className="text-lg font-semibold">Real-time Device Location Map</CardTitle>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="h-8 w-8 bg-card/50 backdrop-blur-sm"
              >
                <Layers className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Map Style</p>
                <div className="space-y-1">
                  {MAP_STYLES.map(style => (
                    <Button
                      key={style.id}
                      variant={currentMapStyle.id === style.id ? "default" : "ghost"}
                      className="w-full justify-start text-sm h-8"
                      onClick={() => changeMapStyle(style)}
                    >
                      {style.name}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => addDeviceMarkers()}
            title="Refresh map"
            className="h-8 w-8 bg-card/50 backdrop-blur-sm"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="absolute top-16 left-3 z-10 flex flex-col gap-1.5">
          <div className="bg-background/80 backdrop-blur-sm p-2 rounded-md shadow-md border border-border/50">
            <p className="text-xs font-medium mb-1">Device Status</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">Warning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">At Risk</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-xs">Offline</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border border-border/50"
            onClick={() => setUsingTempToken(true)}
          >
            <Settings className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs">Change Token</span>
          </Button>
        </div>
        <div 
          ref={mapContainer} 
          className="w-full h-[650px]"
        />
      </CardContent>
    </Card>
  );
};

export default MapView;
