'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/Badge';

export default function RunPayrollPage(): React.ReactElement {
  const router = useRouter();
  const [month, setMonth] = useState('2025-06');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async (): Promise<void> => {
    setIsRunning(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsRunning(false);
    router.push('/payroll/payslips');
  };

  const preview = [
    { id: 'e1', name: 'John Doe', gross: 8000, deductions: 1200, net: 6800 },
    { id: 'e2', name: 'Sarah Smith', gross: 7500, deductions: 1100, net: 6400 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Run Payroll" description="Compute and finalize payroll">
        <div className="flex items-center gap-3">
          <input type="month" className="rounded-md border border-border bg-surface px-3 py-2 text-sm" value={month} onChange={(e) => setMonth(e.target.value)} />
          <Button isLoading={isRunning} onClick={handleRun}>Finalize Payroll</Button>
        </div>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Employee', accessor: 'name' },
              { header: 'Gross Pay', accessor: (row) => `$${row.gross.toLocaleString()}` },
              { header: 'Deductions', accessor: (row) => `$${row.deductions.toLocaleString()}` },
              { header: 'Net Pay', accessor: (row) => `$${row.net.toLocaleString()}` },
            ]}
            data={preview}
          />
        </CardContent>
      </Card>
    </div>
  );
}
