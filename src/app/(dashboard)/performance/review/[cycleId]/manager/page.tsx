'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ManagerReviewPage(): React.ReactElement {
  const { cycleId } = useParams<{ cycleId: string }>();

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Manager Review" description={`Cycle: ${cycleId}`}>
        <Link href="/performance">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Manager Assessment</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Manager Rating</label>
              <input type="range" min={1} max={5} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium">Private Notes</label>
              <textarea className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Final Rating</label>
              <Input type="number" min={1} max={5} />
            </div>
            <Button>Submit Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
