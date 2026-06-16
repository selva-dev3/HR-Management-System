'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const ot = [
  { id: 'o1', employee: 'John Doe', date: new Date().toISOString(), hours: 3, reason: 'Project deadline', status: 'Pending' },
  { id: 'o2', employee: 'Sarah Smith', date: new Date(Date.now() - 86400000).toISOString(), hours: 2, reason: 'Client call', status: 'Approved' },
];

export default function OvertimePage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Overtime" description="Overtime logs and approvals">
        <Button leftIcon={<Plus className="h-4 w-4" />}>Log Overtime</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Employee', accessor: 'employee' },
          { header: 'Date', accessor: (row) => formatDate(row.date) },
          { header: 'Hours', accessor: 'hours' },
          { header: 'Reason', accessor: 'reason' },
          {
            header: 'Status',
            accessor: (row) => <Badge variant={row.status === 'Approved' ? 'success' : 'default'}>{row.status}</Badge>,
          },
        ]}
        data={ot}
      />
    </div>
  );
}
