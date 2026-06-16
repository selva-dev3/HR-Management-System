'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const balances = [
  { id: 'b1', employee: 'John Doe', annual: 15, used: 3, pending: 1, remaining: 11 },
  { id: 'b2', employee: 'Sarah Smith', annual: 15, used: 5, pending: 0, remaining: 10 },
];

export default function LeaveBalancesPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Leave Balances" description="Employee-wise leave utilization" />
      <Card>
        <CardHeader><CardTitle>Balances</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Employee', accessor: 'employee' },
              { header: 'Allocated', accessor: 'annual' },
              { header: 'Used', accessor: 'used' },
              { header: 'Pending', accessor: 'pending' },
              { header: 'Remaining', accessor: 'remaining' },
            ]}
            data={balances}
          />
        </CardContent>
      </Card>
    </div>
  );
}
