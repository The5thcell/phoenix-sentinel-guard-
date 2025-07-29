
import React, { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DailyReport from '@/components/reports/DailyReport';
import MonthlyReport from '@/components/reports/MonthlyReport';
import { Calendar, ChartBar } from 'lucide-react';

const ReportsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports Dashboard</h1>
          <p className="text-muted-foreground">View daily and monthly device activity and performance reports.</p>
        </div>
        
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="daily" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Daily Report
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center">
              <ChartBar className="mr-2 h-4 w-4" /> Monthly Report
            </TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="pt-4">
            <DailyReport />
          </TabsContent>
          <TabsContent value="monthly" className="pt-4">
            <MonthlyReport />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ReportsPage;
