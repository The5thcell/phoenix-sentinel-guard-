
import React from 'react';
import Layout from '@/components/dashboard/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';

const AccessControlPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Access Control</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions for the Phoenix Shield platform.</p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Active platform users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <UserPlus className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Added this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Full system access</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locked Accounts</CardTitle>
              <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Due to policy violations</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 font-medium border-b pb-2">
                <div>Role Name</div>
                <div>Access Level</div>
                <div>Users Count</div>
                <div>Actions</div>
              </div>
              
              <div className="grid grid-cols-4 items-center">
                <div>Administrator</div>
                <div>Full Access</div>
                <div>5</div>
                <div>
                  <button className="text-xs text-blue-500 hover:underline">Edit</button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center">
                <div>Security Officer</div>
                <div>Security Module</div>
                <div>3</div>
                <div>
                  <button className="text-xs text-blue-500 hover:underline">Edit</button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center">
                <div>Device Manager</div>
                <div>Device Module</div>
                <div>8</div>
                <div>
                  <button className="text-xs text-blue-500 hover:underline">Edit</button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center">
                <div>Auditor</div>
                <div>Read-only</div>
                <div>8</div>
                <div>
                  <button className="text-xs text-blue-500 hover:underline">Edit</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AccessControlPage;
