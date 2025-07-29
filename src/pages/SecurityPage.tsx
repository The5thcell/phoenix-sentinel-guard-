import React, { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecurityOverview from '@/components/dashboard/SecurityOverview';
import SecurityPolicies from '@/components/dashboard/SecurityPolicies';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DeviceMetrics from '@/components/dashboard/DeviceMetrics';

// Security overview data with the required structure
const securityOverviewData = [
  { name: 'Secure', value: 85, color: '#10b981' },
  { name: 'Warning', value: 10, color: '#f59e0b' },
  { name: 'Critical', value: 3, color: '#ef4444' },
  { name: 'Offline', value: 2, color: '#6b7280' }
];

// Sample device metrics data
const sampleDeviceMetrics = {
  deviceId: 'dev-001',
  deviceName: 'Temperature Sensor 1',
  lastUpdated: '2 minutes ago',
  cpu: {
    usage: 42,
    temperature: 52,
    cores: 2
  },
  memory: {
    total: 4,
    used: 1.7,
    free: 2.3
  },
  storage: {
    total: 32,
    used: 12.5,
    health: 96,
    readSpeed: 120,
    writeSpeed: 90
  },
  network: {
    upload: 120,
    download: 450,
    latency: 15,
    packetLoss: 0.2
  }
};

// Security assessment data
const securityAssessments = [
  {
    id: 'sa-001',
    title: 'Certificate Management',
    status: 'passed',
    description: 'All device certificates are valid and not expiring soon.',
    lastCheck: '15 minutes ago',
  },
  {
    id: 'sa-002',
    title: 'Firmware Compliance',
    status: 'warning',
    description: '5 devices are running outdated firmware versions.',
    lastCheck: '30 minutes ago',
  },
  {
    id: 'sa-003',
    title: 'Authentication Security',
    status: 'passed',
    description: 'All devices are using strong authentication methods.',
    lastCheck: '1 hour ago',
  },
  {
    id: 'sa-004',
    title: 'Communication Encryption',
    status: 'passed',
    description: 'All device communications are properly encrypted.',
    lastCheck: '45 minutes ago',
  },
  {
    id: 'sa-005',
    title: 'Anomaly Detection',
    status: 'critical',
    description: 'Unusual traffic patterns detected from 2 devices.',
    lastCheck: '5 minutes ago',
  },
];

const SecurityPage = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState('dev-001');

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Security</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage your security settings, policies, and device health metrics.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Shield className="h-4 w-4" />
            Run Security Scan
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="w-full md:w-auto flex flex-wrap md:flex-nowrap">
            <TabsTrigger value="overview" className="flex-1 md:flex-none">Overview</TabsTrigger>
            <TabsTrigger value="metrics" className="flex-1 md:flex-none">Device Metrics</TabsTrigger>
            <TabsTrigger value="assessments" className="flex-1 md:flex-none">Assessments</TabsTrigger>
            <TabsTrigger value="policies" className="flex-1 md:flex-none">Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <SecurityOverview data={securityOverviewData} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Security Status</CardTitle>
                <CardDescription>Overview of your security posture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Secure</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">109 devices are secure and up-to-date.</p>
                  </div>
                  
                  <div className="space-y-2 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <h3 className="font-semibold">Warnings</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">15 devices have security warnings.</p>
                  </div>
                  
                  <div className="space-y-2 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h3 className="font-semibold">Critical</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">4 devices have critical security issues.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <DeviceMetrics deviceId={sampleDeviceMetrics.deviceId} />
          </TabsContent>
          
          <TabsContent value="assessments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Assessments</CardTitle>
                <CardDescription>
                  Regular security checks and compliance verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAssessments.map((assessment) => (
                    <div 
                      key={assessment.id}
                      className="p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      <div className="sm:flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {assessment.status === 'passed' && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                          {assessment.status === 'warning' && (
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          )}
                          {assessment.status === 'critical' && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <h3 className="font-semibold">{assessment.title}</h3>
                          
                          <Badge
                            variant={
                              assessment.status === 'passed' ? 'outline' : 
                              assessment.status === 'warning' ? 'secondary' : 'destructive'
                            }
                            className="ml-auto sm:ml-2"
                          >
                            {assessment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{assessment.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Clock className="h-3 w-3 mr-1" />
                          Last checked: {assessment.lastCheck}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="sm:self-center whitespace-nowrap">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="policies" className="space-y-4">
            <SecurityPolicies />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SecurityPage;
