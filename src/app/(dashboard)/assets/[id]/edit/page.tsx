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

export default function EditAssetPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Edit Asset" description={`Asset ID: ${id}`}>
        <Link href="/assets">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Asset Details</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input id="name" defaultValue="MacBook Pro 16" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" defaultValue="Laptop" />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input id="status" defaultValue="Assigned" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.push('/assets')}>Cancel</Button>
        <Button onClick={() => router.push('/assets')}>Save Changes</Button>
      </div>
    </div>
  );
}
