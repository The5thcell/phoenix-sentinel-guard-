
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChevronUp, ChevronDown, ArrowUpRight, Clock, Activity, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const weekData = [
  { day: 'Mon', devices: 92, alerts: 4, issues: 1 },
  { day: 'Tue', devices: 95, alerts: 3, issues: 0 },
  { day: 'Wed', devices: 94, alerts: 5, issues: 2 },
  { day: 'Thu', devices: 97, alerts: 2, issues: 0 },
  { day: 'Fri', devices: 96, alerts: 6, issues: 1 },
  { day: 'Sat', devices: 94, alerts: 3, issues: 0 },
  { day: 'Sun', devices: 93, alerts: 2, issues: 0 },
];

const hourlyData = [
  { hour: '00:00', connections: 84, bandwidth: 45 },
  { hour: '03:00', connections: 78, bandwidth: 39 },
  { hour: '06:00', connections: 81, bandwidth: 42 },
  { hour: '09:00', connections: 89, bandwidth: 55 },
  { hour: '12:00', connections: 95, bandwidth: 61 },
  { hour: '15:00', connections: 92, bandwidth: 58 },
  { hour: '18:00', connections: 87, bandwidth: 51 },
  { hour: '21:00', connections: 85, bandwidth: 47 },
];

const recentAlerts = [
  { id: 1, device: 'Temperature Sensor 1', type: 'High CPU Usage', time: '10:45 AM', status: 'active' },
  { id: 2, device: 'Gateway Router', type: 'Connection Dropped', time: '09:32 AM', status: 'resolved' },
  { id: 3, device: 'Motor Controller', type: 'Certificate Expiring', time: '08:17 AM', status: 'active' },
  { id: 4, device: 'Pressure Monitor', type: 'Anomalous Data', time: 'Yesterday', status: 'resolved' },
  { id: 5, device: 'Flow Sensor 3', type: 'Memory Leak', time: 'Yesterday', status: 'active' },
];

const DailyReport: React.FC = () => {
  const { toast } = useToast();
  
  const refreshData = () => {
    toast({
      title: "Report Updated",
      description: "The report data has been refreshed.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Daily Report</h2>
        <button 
          onClick={refreshData}
          className="flex items-center text-sm text-primary hover:underline"
        >
          <Clock className="mr-1 h-4 w-4" /> Refresh Data
        </button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Online Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">93</div>
              <div className="text-sm text-green-500 flex items-center">
                <ChevronUp className="h-4 w-4 mr-1" /> 1.2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">93 of 104 devices online</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm text-red-500 flex items-center">
                <ChevronUp className="h-4 w-4 mr-1" /> 40%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 unresolved alerts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">Good</div>
              <div className="text-sm text-green-500 flex items-center">
                <Shield className="h-4 w-4 mr-1" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">No critical issues</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">42ms</div>
              <div className="text-sm text-green-500 flex items-center">
                <ChevronDown className="h-4 w-4 mr-1" /> 3.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Faster than yesterday</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Hourly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Device Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="connections" 
                  name="Connected Devices" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="bandwidth" 
                  name="Bandwidth (MB/s)" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Alert Type</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.device}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${alert.status === 'active' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                      {alert.status === 'active' ? 'Active' : 'Resolved'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyReport;
