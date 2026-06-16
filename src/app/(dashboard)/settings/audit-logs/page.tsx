'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const logs = [
  { id: 'l1', user: 'Alex Morgan', action: 'Updated employee', module: 'Employees', recordId: 'E1001', ip: '192.168.1.1', timestamp: new Date().toISOString() },
  { id: 'l2', user: 'Sarah Smith', action: 'Approved leave', module: 'Leave', recordId: 'LR1', ip: '192.168.1.2', timestamp: new Date(Date.now() - 3600000).toISOString() },
];

export default function AuditLogsPage(): React.ReactElement {
  const [data] = useState(logs);

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" description="System activity trail">
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'User', accessor: 'user' },
          { header: 'Action', accessor: 'action' },
          { header: 'Module', accessor: 'module' },
          { header: 'Record', accessor: 'recordId' },
          { header: 'IP', accessor: 'ip' },
          { header: 'Timestamp', accessor: (row) => formatDate(row.timestamp, 'MMM d, yyyy h:mm a') },
        ]}
        data={data}
      />
    </div>
  );
}
