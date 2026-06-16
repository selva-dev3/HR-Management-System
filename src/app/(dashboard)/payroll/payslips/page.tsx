'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Download } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const payslips = [
  { id: 'ps1', employee: 'John Doe', month: '2025-06', net: 6800, status: 'Viewed' },
  { id: 'ps2', employee: 'Sarah Smith', month: '2025-06', net: 6400, status: 'Sent' },
];

export default function PayslipsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Payslips" description="Generated payslips">
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Bulk Download</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Employee', accessor: 'employee' },
          { header: 'Month', accessor: (row) => formatDate(row.month + '-01', 'MMM yyyy') },
          { header: 'Net Pay', accessor: (row) => `$${row.net.toLocaleString()}` },
          {
            header: 'Status',
            accessor: (row) => <Badge variant={row.status === 'Viewed' ? 'success' : 'primary'}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            accessor: (row) => (
              <Link href={`/payroll/payslips/${row.id}`}>
                <Button variant="ghost" size="sm">View</Button>
              </Link>
            ),
          },
        ]}
        data={payslips}
      />
    </div>
  );
}
