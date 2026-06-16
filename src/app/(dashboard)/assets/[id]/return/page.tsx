'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ReturnAssetPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Return Asset" description={`Asset ID: ${id}`}>
        <Link href="/assets">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Return Details</CardTitle></CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="date">Return Date</Label>
            <input id="date" type="date" className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" />
          </div>
          <div className="mt-4">
            <Label htmlFor="condition">Condition at Return</Label>
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
        <Button onClick={() => router.push('/assets')}>Confirm Return</Button>
      </div>
    </div>
  );
}
