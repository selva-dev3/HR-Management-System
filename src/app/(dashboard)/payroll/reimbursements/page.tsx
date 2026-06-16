'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const reimbursements = [
  { id: 'r1', employee: 'John Doe', type: 'Travel', amount: 120, status: 'Pending', submitted: new Date().toISOString() },
  { id: 'r2', employee: 'Sarah Smith', type: 'Medical', amount: 80, status: 'Approved', submitted: new Date(Date.now() - 86400000).toISOString() },
];

export default function ReimbursementsPage(): React.ReactElement {
  const [data] = useState(reimbursements);

  return (
    <div className="space-y-6">
      <PageHeader title="Reimbursements" description="Claim requests and approvals">
        <Button leftIcon={<Plus className="h-4 w-4" />}>Submit Claim</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Employee', accessor: 'employee' },
          { header: 'Type', accessor: 'type' },
          { header: 'Amount', accessor: (row) => `$${row.amount}` },
          { header: 'Submitted', accessor: (row) => formatDate(row.submitted) },
          {
            header: 'Status',
            accessor: (row) => <Badge variant={row.status === 'Approved' ? 'success' : 'default'}>{row.status}</Badge>,
          },
        ]}
        data={data}
      />
    </div>
  );
}
