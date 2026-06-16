'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

const payrollData = [
  { id: 'pr1', month: '2025-01', totalCost: 120000, basic: 60000, pf: 7200, tds: 12000, net: 100800 },
  { id: 'pr2', month: '2025-02', totalCost: 125000, basic: 62500, pf: 7500, tds: 12500, net: 105000 },
  { id: 'pr3', month: '2025-03', totalCost: 130000, basic: 65000, pf: 7800, tds: 13000, net: 109200 },
];

export default function PayrollSummaryReportPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Payroll Summary Report" description="Component breakdown by month">
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Monthly Summary</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Month', accessor: 'month' },
              { header: 'Total Cost', accessor: (row) => `$${row.totalCost.toLocaleString()}` },
              { header: 'Basic', accessor: (row) => `$${row.basic.toLocaleString()}` },
              { header: 'PF', accessor: (row) => `$${row.pf.toLocaleString()}` },
              { header: 'TDS', accessor: (row) => `$${row.tds.toLocaleString()}` },
              { header: 'Net', accessor: (row) => `$${row.net.toLocaleString()}` },
            ]}
            data={payrollData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
