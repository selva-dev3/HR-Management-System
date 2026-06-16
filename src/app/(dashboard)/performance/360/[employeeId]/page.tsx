'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function PeerFeedbackPage(): React.ReactElement {
  const { employeeId } = useParams<{ employeeId: string }>();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="360° Feedback" description={`Employee ID: ${employeeId}`} />
      <Card>
        <CardHeader><CardTitle>Peer Feedback Form</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Peers</label>
              <Input placeholder="Search employees" />
            </div>
            <div>
              <label className="text-sm font-medium">Question 1: Communication</label>
              <input type="range" min={1} max={5} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium">Question 2: Collaboration</label>
              <input type="range" min={1} max={5} className="w-full" />
            </div>
            <div>
              <label className="text-sm font-medium">Comments</label>
              <textarea className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" rows={3} />
            </div>
            <Button>Submit Feedback</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
