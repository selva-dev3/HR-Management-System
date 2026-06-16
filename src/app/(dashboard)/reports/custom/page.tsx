'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CustomReportPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Custom Reports" description="Build your own report">
        <Button>Save Template</Button>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Report Builder</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Report Name</label>
              <Input placeholder="My custom report" />
            </div>
            <div>
              <label className="text-sm font-medium">Fields</label>
              <select className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
                <option>Employee Name</option>
                <option>Department</option>
                <option>Salary</option>
                <option>Leave Balance</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Group By</label>
              <select className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
                <option>Department</option>
                <option>Designation</option>
                <option>Location</option>
              </select>
            </div>
            <Button>Generate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
