'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Trash2 } from 'lucide-react';

const goals = [
  { id: 'g1', employee: 'John Doe', title: 'Ship v2.0', metric: 'Features delivered', target: 10, current: 7, status: 'In progress' },
  { id: 'g2', employee: 'Sarah Smith', title: 'Close $500k pipeline', metric: 'Revenue', target: 500000, current: 420000, status: 'At risk' },
];

export default function PerformanceGoalsPage(): React.ReactElement {
  const [data, setData] = useState(goals);

  const handleDelete = (id: string): void => {
    if (confirm('Delete goal?')) setData((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Goals" description="OKRs and goal tracking">
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Goal</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Employee', accessor: 'employee' },
          { header: 'Goal', accessor: 'title' },
          { header: 'Metric', accessor: 'metric' },
          { header: 'Progress', accessor: (row) => `${row.current} / ${row.target}` },
          {
            header: 'Status',
            accessor: (row) => {
              const map: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
                'Not started': 'default',
                'In progress': 'primary',
                'At risk': 'warning',
                Completed: 'success',
              };
              return <Badge variant={map[row.status]}>{row.status}</Badge>;
            },
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
