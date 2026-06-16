'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AssignAssetPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Assign Asset" description={`Asset ID: ${id}`}>
        <Link href="/assets">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Assign to Employee</CardTitle></CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="employee">Employee</Label>
            <Input id="employee" placeholder="Search employee" />
          </div>
          <div className="mt-4">
            <Label htmlFor="date">Assignment Date</Label>
            <Input id="date" type="date" />
          </div>
          <div className="mt-4">
            <Label htmlFor="condition">Condition at Handover</Label>
            <select id="condition" className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
              <option>Good</option>
              <option>Fair</option>
              <option>Damaged</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.push('/assets')}>Cancel</Button>
        <Button onClick={() => router.push('/assets')}>Assign</Button>
      </div>
    </div>
  );
}
