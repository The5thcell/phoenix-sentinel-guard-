
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MapboxTokenInputProps {
  onSubmit: (token: string) => void;
}

const MapboxTokenInput: React.FC<MapboxTokenInputProps> = ({ onSubmit }) => {
  const [tokenInput, setTokenInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput && tokenInput !== 'YOUR_MAPBOX_TOKEN') {
      onSubmit(tokenInput);
    }
  };
  
  return (
    <Card className="overflow-hidden max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-blue-900/30 z-0"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <CardTitle>Real-time Device Location Map</CardTitle>
        </div>
        <CardDescription>
          To view the interactive device map, you need to enter your Mapbox public token
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="rounded-lg overflow-hidden border border-border/50 mb-6">
          <img 
            src="https://docs.mapbox.com/assets/guides/add-points-pt-1-3-03f6f3ff7c9ed2627a12b7f3c06ed99b.webp" 
            alt="Map preview"
            className="w-full h-48 object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">What is a Mapbox token?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Mapbox requires an API token to display maps in applications. The token allows Mapbox to 
            track usage and ensure service quality.
          </p>
          
          <div className="bg-secondary/50 p-4 rounded-md mb-4">
            <h4 className="font-medium text-sm mb-2">How to get a Mapbox token:</h4>
            <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
              <li>Sign up for a free account at <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-primary underline hover:text-primary/80">mapbox.com</a></li>
              <li>After signing in, navigate to your Account page</li>
              <li>Find the "Access tokens" section</li>
              <li>Copy your default public token or create a new one</li>
              <li>Paste the token below to enable the interactive map</li>
            </ol>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="mapbox-token" className="text-sm font-medium">
              Mapbox Public Token
            </label>
            <Input
              id="mapbox-token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter your Mapbox public token (pk.eyJ1...)"
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Your token is only stored locally in your browser and is never sent to our servers.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              <MapPin className="h-4 w-4 mr-2" />
              Load Interactive Map
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MapboxTokenInput;
