'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function NewAssetPage(): React.ReactElement {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    router.push('/assets');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="New Asset" description="Add a new company asset" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader><CardTitle>Asset Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Asset Name</Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" required />
            </div>
            <div>
              <Label htmlFor="serial">Serial Number</Label>
              <Input id="serial" required />
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push('/assets')}>Cancel</Button>
          <Button type="submit">Save Asset</Button>
        </div>
      </form>
    </div>
  );
}
