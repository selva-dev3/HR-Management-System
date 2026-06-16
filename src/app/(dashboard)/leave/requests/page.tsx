'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, X } from 'lucide-react';

const requests = Array.from({ length: 12 }).map((_, i) => ({
  id: `lr${i}`,
  requester: ['John Doe', 'Sarah Smith', 'Alex Johnson', 'Emily White'][i % 4],
  type: ['Annual', 'Sick', 'Casual', 'Annual'][i % 4],
  dates: i % 2 === 0 ? 'Jun 20 - Jun 22' : 'Jun 25',
  days: i % 2 === 0 ? 3 : 1,
  status: ['Pending', 'Approved', 'Rejected', 'Pending'][i % 4],
  appliedOn: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

export default function LeaveRequestsPage(): React.ReactElement {
  const [data, setData] = useState(requests);
  const [filter, setFilter] = useState('');

  const filtered = data.filter((r) => (filter ? r.status === filter : true));

  const handleAction = (id: string, action: 'Approved' | 'Rejected'): void => {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Requests" description="Review and approve leave requests">
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Requester', accessor: 'requester' },
          { header: 'Type', accessor: 'type' },
          { header: 'Dates', accessor: 'dates' },
          { header: 'Days', accessor: 'days' },
          {
            header: 'Status',
            accessor: (row) => {
              const v: Record<string, 'success' | 'error' | 'default'> = { Approved: 'success', Rejected: 'error', Pending: 'default' };
              return <Badge variant={v[row.status]}>{row.status}</Badge>;
            },
          },
          {
            header: 'Actions',
            accessor: (row) =>
              row.status === 'Pending' ? (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleAction(row.id, 'Approved')}>
                    <Check className="h-4 w-4 text-success" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleAction(row.id, 'Rejected')}>
                    <X className="h-4 w-4 text-error" />
                  </Button>
                </div>
              ) : null,
          },
        ]}
        data={filtered}
      />
    </div>
  );
}
