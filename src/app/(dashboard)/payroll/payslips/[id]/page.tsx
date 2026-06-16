'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

export default function PayslipDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Payslip" description={`ID: ${id}`}>
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Download PDF</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>June 2025 Payslip</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-text-muted">Employee</span> <span>John Doe</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Basic</span> <span>$4,000</span></div>
          <div className="flex justify-between"><span className="text-text-muted">HRA</span> <span>$1,600</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Allowances</span> <span>$1,200</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Deductions</span> <span className="text-error">-$1,200</span></div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold"><span>Net Pay</span> <span>$5,600</span></div>
        </CardContent>
      </Card>
    </div>
  );
}
