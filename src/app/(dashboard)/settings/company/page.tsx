'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function CompanySettingsPage(): React.ReactElement {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Company Settings" description="Organization profile and preferences" />
      <Card>
        <CardHeader><CardTitle>Company Info</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Company Name</label>
            <Input defaultValue="Acme Corp" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Address</label>
            <Input defaultValue="123 Main St" />
          </div>
          <div>
            <label className="text-sm font-medium">GST/TAN</label>
            <Input defaultValue="GST123456" />
          </div>
          <div>
            <label className="text-sm font-medium">PAN</label>
            <Input defaultValue="ABCDE1234F" />
          </div>
          <div>
            <label className="text-sm font-medium">Financial Year Start</label>
            <Input defaultValue="Apr" />
          </div>
          <div>
            <label className="text-sm font-medium">Time Zone</label>
            <Input defaultValue="Asia/Kolkata" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
