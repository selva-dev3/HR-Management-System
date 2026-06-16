'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const cycles = [
  { id: 'c1', name: 'Q1 2025 Review', period: 'Jan - Mar', status: 'Closed' },
  { id: 'c2', name: 'Q2 2025 Review', period: 'Apr - Jun', status: 'Active' },
];

export default function PerformancePage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Performance" description="Review cycles and metrics">
        <Link href="/performance/cycles">
          <Button variant="outline">Manage Cycles</Button>
        </Link>
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Active Cycles" value="1" icon={Target} />
        <StatCard title="Avg Rating" value="3.8 / 5" icon={TrendingUp} />
        <StatCard title="Goals at Risk" value="4" changeType="warning" icon={AlertCircle} />
      </div>
      <Card>
        <CardHeader><CardTitle>Review Cycles</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Period', accessor: 'period' },
              {
                header: 'Status',
                accessor: (row) => <Badge variant={row.status === 'Active' ? 'primary' : 'default'}>{row.status}</Badge>,
              },
            ]}
            data={cycles}
          />
        </CardContent>
      </Card>
    </div>
  );
}
