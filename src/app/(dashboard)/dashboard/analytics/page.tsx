'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Download } from 'lucide-react';

const attritionData = [
  { month: 'Jan', rate: 2.1 },
  { month: 'Feb', rate: 1.8 },
  { month: 'Mar', rate: 3.2 },
  { month: 'Apr', rate: 2.5 },
  { month: 'May', rate: 1.9 },
  { month: 'Jun', rate: 2.3 },
];

const costData = [
  { month: 'Jan', cost: 120000 },
  { month: 'Feb', cost: 125000 },
  { month: 'Mar', cost: 130000 },
  { month: 'Apr', cost: 128000 },
  { month: 'May', cost: 135000 },
  { month: 'Jun', cost: 140000 },
];

export default function DashboardAnalyticsPage(): React.ReactElement {
  const [range, setRange] = useState('6months');

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Advanced HR insights">
        <div className="flex items-center gap-3">
          <Select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            options={[
              { label: 'Last 6 Months', value: '6months' },
              { label: 'Last 1 Year', value: '1year' },
            ]}
          />
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attrition Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attritionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="rate" stroke="#ef4444" fill="#fee2e2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost per Hire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
