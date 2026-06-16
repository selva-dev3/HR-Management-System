'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function NewJobPage(): React.ReactElement {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push('/recruitment/jobs');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="New Job Posting" description="Create a new job opening" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" required />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" required />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea id="description" className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" rows={5} required />
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push('/recruitment/jobs')}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>Publish Job</Button>
        </div>
      </form>
    </div>
  );
}
