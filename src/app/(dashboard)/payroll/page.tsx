'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DollarSign, CreditCard, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PayrollPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Payroll" description="Payroll overview and actions">
        <div className="flex gap-3">
          <Link href="/payroll/run">
            <Button>Run Payroll</Button>
          </Link>
          <Link href="/payroll/reports">
            <Button variant="outline">Reports</Button>
          </Link>
        </div>
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Payroll Cost" value="$142,500" icon={DollarSign} />
        <StatCard title="Processed" value="145" icon={CreditCard} />
        <StatCard title="Pending" value="3" changeType="warning" icon={FileText} />
      </div>
      <Card>
        <CardHeader><CardTitle>Payslip Status</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Generated: 145</Badge>
            <Badge variant="primary">Sent: 140</Badge>
            <Badge variant="default">Viewed: 132</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
