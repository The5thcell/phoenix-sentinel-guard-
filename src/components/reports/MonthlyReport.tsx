
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, DownloadCloud } from 'lucide-react';

// Monthly data
const monthlyData = [
  { date: '01 Apr', devices: 95, incidents: 3 },
  { date: '05 Apr', devices: 98, incidents: 2 },
  { date: '10 Apr', devices: 97, incidents: 4 },
  { date: '15 Apr', devices: 101, incidents: 1 },
  { date: '20 Apr', devices: 104, incidents: 3 },
  { date: '25 Apr', devices: 103, incidents: 2 },
  { date: '30 Apr', devices: 102, incidents: 2 },
];

// Device type distribution
const deviceTypes = [
  { name: 'Sensors', value: 45 },
  { name: 'Controllers', value: 30 },
  { name: 'Gateways', value: 15 },
  { name: 'Other', value: 10 },
];

// Alert severity distribution
const alertSeverity = [
  { name: 'Low', value: 65 },
  { name: 'Medium', value: 25 },
  { name: 'High', value: 8 },
  { name: 'Critical', value: 2 },
];

// Uptime data
const uptimeData = [
  { day: '1', uptime: 99.8 },
  { day: '5', uptime: 99.9 },
  { day: '10', uptime: 99.7 },
  { day: '15', uptime: 99.6 },
  { day: '20', uptime: 99.9 },
  { day: '25', uptime: 100 },
  { day: '30', uptime: 99.9 },
];

// Colors for charts
const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];

const MonthlyReport: React.FC = () => {
  const downloadReport = () => {
    // In a real app, this would generate and download a PDF or CSV
    alert('Report download functionality would be implemented here');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Monthly Report</h2>
        <button
          onClick={downloadReport}
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          <DownloadCloud className="mr-2 h-4 w-4" /> Download Report
        </button>
      </div>
      
      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">104</span>
              <Badge variant="outline" className="text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" /> +8
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">8.3% increase from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alert Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">42</span>
              <Badge variant="outline" className="text-green-500">
                <TrendingDown className="mr-1 h-3 w-3" /> -12%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">12% decrease from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Security Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">5</span>
              <Badge variant="outline" className="text-amber-500">
                <AlertTriangle className="mr-1 h-3 w-3" /> +1
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">25% increase from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">99.8%</span>
              <Badge variant="outline" className="text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" /> +0.1%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Improved from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Device growth chart */}
      <Card>
        <CardHeader>
          <CardTitle>Device Count & Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" />
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
                <Bar yAxisId="left" dataKey="devices" name="Active Devices" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="incidents" name="Security Incidents" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Charts row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Device Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={alertSeverity}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {alertSeverity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* System uptime chart */}
      <Card>
        <CardHeader>
          <CardTitle>System Uptime (April 2025)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }} />
                <YAxis domain={[99, 100.1]} label={{ value: 'Uptime %', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                  formatter={(value) => [`${value}%`, 'Uptime']}
                />
                <Line 
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyReport;
