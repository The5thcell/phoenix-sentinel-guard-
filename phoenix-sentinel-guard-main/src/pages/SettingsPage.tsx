
import React from 'react';
import Layout from '@/components/dashboard/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Bell, Shield, Server, Key } from 'lucide-react';

const SettingsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Configure your Phoenix Shield platform settings.</p>
        </div>

        <div className="grid gap-6 grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <Shield className="h-5 w-5 text-phoenix-400" />
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="min-password-length">Minimum Password Length</Label>
                  <Input id="min-password-length" defaultValue="12" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input id="password-expiry" defaultValue="90" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mfa">Multi-Factor Authentication</Label>
                  <select id="mfa" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="required">Required for all users</option>
                    <option value="optional">Optional</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <Bell className="h-5 w-5 text-phoenix-400" />
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="critical-alerts">Critical Alert Notifications</Label>
                  <select id="critical-alerts" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="email-sms">Email and SMS</option>
                    <option value="email">Email only</option>
                    <option value="sms">SMS only</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="weekly-reports">Weekly Security Reports</Label>
                  <select id="weekly-reports" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <Server className="h-5 w-5 text-phoenix-400" />
              <CardTitle>Device Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="auto-updates">Automatic Firmware Updates</Label>
                  <select id="auto-updates" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="enabled">Enabled</option>
                    <option value="approval">Require Approval</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cert-expiry">Certificate Expiry Threshold (days)</Label>
                  <Input id="cert-expiry" defaultValue="30" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <Settings className="h-5 w-5 text-phoenix-400" />
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="system-logging">System Logging Level</Label>
                  <select id="system-logging" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="debug">Debug</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" type="password" value="********************" readOnly />
                    <button className="px-3 py-2 rounded-md bg-phoenix-400 text-white text-sm whitespace-nowrap">
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
