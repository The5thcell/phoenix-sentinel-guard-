
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Shield, Lock, AlertTriangle, FileCheck, ServerCrash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// These would typically come from your Go API
const mockPolicyCategories = [
  { id: 'authentication', name: 'Authentication', icon: <Lock className="h-4 w-4 mr-2" /> },
  { id: 'encryption', name: 'Encryption', icon: <Shield className="h-4 w-4 mr-2" /> },
  { id: 'compliance', name: 'Compliance', icon: <FileCheck className="h-4 w-4 mr-2" /> },
  { id: 'incident', name: 'Incident Response', icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { id: 'failover', name: 'Failover', icon: <ServerCrash className="h-4 w-4 mr-2" /> },
];

// Mock policies that would be fetched from your Go backend
const mockPolicies = {
  authentication: [
    { id: 'auth-1', name: 'Mutual TLS Authentication', status: 'enabled', description: 'Enforce mutual TLS authentication for all device connections.' },
    { id: 'auth-2', name: 'Certificate Rotation', status: 'enabled', description: 'Automatically rotate device certificates every 90 days.' },
    { id: 'auth-3', name: 'JWT Token Lifespan', status: 'enabled', description: 'Limit JWT token lifespan to 1 hour with refresh capabilities.' },
  ],
  encryption: [
    { id: 'enc-1', name: 'Data-at-Rest Encryption', status: 'enabled', description: 'Encrypt all stored data using AES-256 with envelope encryption.' },
    { id: 'enc-2', name: 'End-to-End Telemetry Encryption', status: 'enabled', description: 'Encrypt all telemetry data from device to storage.' },
    { id: 'enc-3', name: 'TLS 1.3 Only', status: 'disabled', description: 'Only allow TLS 1.3 connections, disabling older protocols.' },
  ],
  compliance: [
    { id: 'comp-1', name: 'CIS Benchmarks', status: 'partial', description: 'Align with Center for Internet Security benchmarks for container security.' },
    { id: 'comp-2', name: 'GDPR Compliance', status: 'enabled', description: 'Ensure all data handling follows GDPR requirements including right to be forgotten.' },
    { id: 'comp-3', name: 'NIST Cybersecurity Framework', status: 'enabled', description: 'Follow NIST framework for IIoT security controls and implementation.' },
  ],
  incident: [
    { id: 'inc-1', name: 'Automated Threat Response', status: 'enabled', description: 'Automatically isolate devices showing signs of compromise.' },
    { id: 'inc-2', name: 'Real-time Alert Escalation', status: 'enabled', description: 'Escalate critical security alerts to response team within 5 minutes.' },
    { id: 'inc-3', name: 'Forensic Logging', status: 'enabled', description: 'Maintain detailed forensic logs for all security incidents.' },
  ],
  failover: [
    { id: 'fail-1', name: 'High Availability Mode', status: 'enabled', description: 'Ensure all critical security services operate in high-availability mode.' },
    { id: 'fail-2', name: 'Regional Redundancy', status: 'partial', description: 'Maintain security service redundancy across geographic regions.' },
    { id: 'fail-3', name: 'Disaster Recovery', status: 'enabled', description: 'Implement automated disaster recovery with RPO/RTO of 15 minutes.' },
  ],
};

// This would be the actual API call in a production app
const simulateBackendCall = (action: string, policyId: string): Promise<{ success: boolean, message: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log(`Backend call: ${action} for policy ${policyId}`);
      // Simulate 90% success rate
      const success = Math.random() < 0.9;
      resolve({
        success, 
        message: success 
          ? `Successfully ${action === 'enable' ? 'enabled' : 'disabled'} the policy.` 
          : `Error: Could not ${action} policy. Backend service unavailable.`
      });
    }, 800);
  });
};

interface PolicyItemProps {
  policy: {
    id: string;
    name: string;
    status: string;
    description: string;
  };
  onToggle: (id: string, currentStatus: string) => void;
}

const PolicyItem: React.FC<PolicyItemProps> = ({ policy, onToggle }) => {
  return (
    <div className="border border-border rounded-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{policy.name}</h3>
        <div className="flex items-center">
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
              policy.status === 'enabled' ? 'bg-green-100 text-green-800' : 
              policy.status === 'disabled' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'
            }`}
          >
            {policy.status}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggle(policy.id, policy.status)}
          >
            {policy.status === 'enabled' ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{policy.description}</p>
    </div>
  );
};

const SecurityPolicies: React.FC = () => {
  const [activeTab, setActiveTab] = useState('authentication');
  const [policies, setPolicies] = useState(mockPolicies);
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePolicyToggle = async (policyId: string, currentStatus: string) => {
    setLoading(policyId);
    const action = currentStatus === 'enabled' ? 'disable' : 'enable';
    
    try {
      // This would be a real API call to your Go backend
      const result = await simulateBackendCall(action, policyId);
      
      if (result.success) {
        // Update local state to reflect the change
        setPolicies(prev => {
          const category = activeTab as keyof typeof prev;
          return {
            ...prev,
            [category]: prev[category].map(policy => 
              policy.id === policyId 
                ? { ...policy, status: currentStatus === 'enabled' ? 'disabled' : 'enabled' } 
                : policy
            )
          };
        });
        
        toast({
          title: "Policy Updated",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to the security policy service.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Policies</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="authentication" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {mockPolicyCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center"
              >
                {category.icon}
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(policies).map(([category, categoryPolicies]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="space-y-2">
                {categoryPolicies.map(policy => (
                  <PolicyItem
                    key={policy.id}
                    policy={policy}
                    onToggle={handlePolicyToggle}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SecurityPolicies;
