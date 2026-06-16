'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus } from 'lucide-react';

const wfh = [
  { id: 'w1', employee: 'John Doe', dates: 'Jun 10 - Jun 12', reason: 'Personal work', status: 'Approved' },
  { id: 'w2', employee: 'Sarah Smith', dates: 'Jun 15', reason: 'Maintenance', status: 'Pending' },
];

export default function WfhPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Work From Home" description="WFH requests and approvals">
        <Button leftIcon={<Plus className="h-4 w-4" />}>Apply WFH</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Requests</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Employee', accessor: 'employee' },
              { header: 'Dates', accessor: 'dates' },
              { header: 'Reason', accessor: 'reason' },
              {
                header: 'Status',
                accessor: (row) => <Badge variant={row.status === 'Approved' ? 'success' : 'default'}>{row.status}</Badge>,
              },
            ]}
            data={wfh}
          />
        </CardContent>
      </Card>
    </div>
  );
}
