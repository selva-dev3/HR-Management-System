'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/Badge';
import { CalendarDays, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const leaveRequests = [
  { id: 'lr1', requester: 'John Doe', type: 'Annual', dates: 'Jun 20 - Jun 22', days: 3, status: 'Pending' },
  { id: 'lr2', requester: 'Sarah Smith', type: 'Sick', dates: 'Jun 18', days: 1, status: 'Approved' },
];

export default function LeaveDashboardPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Leave" description="Leave dashboard and team calendar">
        <Link href="/leave/apply">
          <Badge variant="primary">Apply for Leave</Badge>
        </Link>
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Today's Leaves" value="4" icon={CalendarDays} />
        <StatCard title="Pending Approvals" value="6" changeType="warning" icon={Clock} />
        <StatCard title="Leave Utilization" value="72%" icon={AlertCircle} />
      </div>
      <Card>
        <CardHeader><CardTitle>Pending Requests</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Requester', accessor: 'requester' },
              { header: 'Type', accessor: 'type' },
              { header: 'Dates', accessor: 'dates' },
              { header: 'Days', accessor: 'days' },
              {
                header: 'Status',
                accessor: (row) => <Badge variant={row.status === 'Approved' ? 'success' : 'default'}>{row.status}</Badge>,
              },
            ]}
            data={leaveRequests}
          />
        </CardContent>
      </Card>
    </div>
  );
}
