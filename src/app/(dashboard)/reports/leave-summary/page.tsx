'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

const leaveReport = [
  { id: 'lr1', employee: 'John Doe', annual: 15, used: 3, pending: 1, remaining: 11 },
  { id: 'lr2', employee: 'Sarah Smith', annual: 15, used: 5, pending: 0, remaining: 10 },
];

export default function LeaveSummaryReportPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Leave Summary Report" description="Utilization and absenteeism">
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Leave Utilization</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Employee', accessor: 'employee' },
              { header: 'Allocated', accessor: 'annual' },
              { header: 'Used', accessor: 'used' },
              { header: 'Pending', accessor: 'pending' },
              { header: 'Remaining', accessor: 'remaining' },
            ]}
            data={leaveReport}
          />
        </CardContent>
      </Card>
    </div>
  );
}
