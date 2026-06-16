'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const slabs = [
  { id: 't1', min: 0, max: 10000, rate: 10 },
  { id: 't2', min: 10001, max: 50000, rate: 20 },
  { id: 't3', min: 50001, max: null, rate: 30 },
];

export default function TaxesPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Tax Configuration" description="TDS slabs and settings" />
      <Card>
        <CardHeader><CardTitle>TDS Slabs</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Min Income', accessor: (row) => `$${row.min.toLocaleString()}` },
              { header: 'Max Income', accessor: (row) => (row.max ? `$${row.max.toLocaleString()}` : 'Unlimited') },
              { header: 'Rate', accessor: (row) => `${row.rate}%` },
            ]}
            data={slabs}
          />
        </CardContent>
      </Card>
    </div>
  );
}
