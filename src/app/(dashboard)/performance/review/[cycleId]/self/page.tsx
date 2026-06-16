'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SelfReviewPage(): React.ReactElement {
  const { cycleId } = useParams<{ cycleId: string }>();

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Self Appraisal" description={`Cycle: ${cycleId}`}>
        <Link href="/performance">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Self Review Form</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-text-muted">Rate your performance and submit for manager review.</p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium">Overall Rating</label>
              <input type="range" min={1} max={5} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium">Comments</label>
              <textarea className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" rows={4} />
            </div>
            <Button>Submit Self Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
