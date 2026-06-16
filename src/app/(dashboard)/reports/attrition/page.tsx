'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', voluntary: 1, involuntary: 0 },
  { month: 'Feb', voluntary: 1, involuntary: 1 },
  { month: 'Mar', voluntary: 0, involuntary: 1 },
  { month: 'Apr', voluntary: 1, involuntary: 0 },
  { month: 'May', voluntary: 0, involuntary: 1 },
  { month: 'Jun', voluntary: 1, involuntary: 0 },
];

export default function AttritionReportPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Attrition Report" description="Exit trends and rate analysis">
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Exits by Type</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="voluntary" fill="#3b82f6" />
                <Bar dataKey="involuntary" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
