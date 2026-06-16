'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', total: 120, newHires: 4, exits: 1 },
  { month: 'Feb', total: 123, newHires: 5, exits: 2 },
  { month: 'Mar', total: 128, newHires: 6, exits: 1 },
  { month: 'Apr', total: 131, newHires: 4, exits: 1 },
  { month: 'May', total: 135, newHires: 5, exits: 1 },
  { month: 'Jun', total: 140, newHires: 6, exits: 1 },
];

export default function HeadcountReportPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Headcount Report" description="Monthly headcount trends">
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Trend</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#2563eb" fill="#bfdbfe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Month', accessor: 'month' },
              { header: 'Total Employees', accessor: 'total' },
              { header: 'New Hires', accessor: 'newHires' },
              { header: 'Exits', accessor: 'exits' },
            ]}
            data={data}
          />
        </CardContent>
      </Card>
    </div>
  );
}
