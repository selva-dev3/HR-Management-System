'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Pencil } from 'lucide-react';

const logs = Array.from({ length: 10 }).map((_, i) => ({
  id: `l${i}`,
  employee: ['John Doe', 'Sarah Smith', 'Alex Johnson'][i % 3],
  checkIn: '09:05 AM',
  checkOut: '06:10 PM',
  hours: 9.1,
  status: ['Present', 'Late', 'Present'][i % 3],
}));

export default function AttendanceLogPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Attendance Log" description="Daily punch records" />
      <Button variant="primary" size="sm">Add Manual Entry</Button>
      <DataTable
        columns={[
          { header: 'Employee', accessor: 'employee' },
          { header: 'Check In', accessor: 'checkIn' },
          { header: 'Check Out', accessor: 'checkOut' },
          { header: 'Hours', accessor: 'hours' },
          {
            header: 'Status',
            accessor: (row) => <Badge variant={row.status === 'Present' ? 'success' : 'warning'}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            accessor: () => (
              <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
            ),
          },
        ]}
        data={logs}
      />
    </div>
  );
}
