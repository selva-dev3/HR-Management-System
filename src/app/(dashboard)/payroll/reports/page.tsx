'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

const reports = [
  { id: 'pr1', name: 'Bank Transfer Report', month: '2025-06' },
  { id: 'pr2', name: 'PF Challan Report', month: '2025-06' },
  { id: 'pr3', name: 'PT Deduction Report', month: '2025-06' },
];

export default function PayrollReportsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Payroll Reports" description="Monthly statutory and bank reports" />
      <Card>
        <CardHeader><CardTitle>Available Reports</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Report', accessor: 'name' },
              { header: 'Month', accessor: 'month' },
              {
                header: 'Actions',
                accessor: () => (
                  <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Download</Button>
                ),
              },
            ]}
            data={reports}
          />
        </CardContent>
      </Card>
    </div>
  );
}
