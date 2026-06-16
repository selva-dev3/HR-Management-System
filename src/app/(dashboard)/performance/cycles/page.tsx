'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const cycles = [
  { id: 'c1', name: 'Annual 2025', period: 'Annual', start: '2025-01-01', end: '2025-12-31', status: 'Active' },
  { id: 'c2', name: 'Q1 2025', period: 'Quarterly', start: '2025-01-01', end: '2025-03-31', status: 'Closed' },
];

export default function PerformanceCyclesPage(): React.ReactElement {
  const [data, setData] = useState(cycles);

  const handleDelete = (id: string): void => {
    if (confirm('Delete cycle?')) setData((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Review Cycles" description="Performance review periods">
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Cycle</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Period', accessor: 'period' },
          { header: 'Start', accessor: (row) => formatDate(row.start) },
          { header: 'End', accessor: (row) => formatDate(row.end) },
          {
            header: 'Status',
            accessor: (row) => <Badge variant={row.status === 'Active' ? 'primary' : 'default'}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            accessor: (row) => (
              <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4 text-error" /></Button>
            ),
          },
        ]}
        data={data}
      />
    </div>
  );
}
