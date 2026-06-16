'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function EditJobPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Edit Job Posting" description={`Job ID: ${id}`} />
      <Card>
        <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" defaultValue="Senior React Developer" />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" defaultValue="Engineering" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input id="status" defaultValue="Open" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.push('/recruitment/jobs')}>Cancel</Button>
        <Button onClick={() => router.push('/recruitment/jobs')}>Save Changes</Button>
      </div>
    </div>
  );
}
