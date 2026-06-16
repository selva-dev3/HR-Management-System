'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

const applicants = [
  { id: 'a1', name: 'Alice Johnson', stage: 'Interview' },
  { id: 'a2', name: 'Bob Smith', stage: 'Screening' },
  { id: 'a3', name: 'Charlie Davis', stage: 'Applied' },
];

export default function JobApplicantsPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Applicants" description={`Job ID: ${id}`} />
      <div className="flex gap-4 overflow-x-auto">
        {stages.map((stage) => (
          <div key={stage} className="min-w-[16rem] rounded-xl border border-border bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">{stage}</h3>
              <Badge variant="primary">{applicants.filter((a) => a.stage === stage).length}</Badge>
            </div>
            <div className="space-y-2">
              {applicants.filter((a) => a.stage === stage).map((a) => (
                <div key={a.id} className="rounded-lg border border-border bg-surface-raised p-3 text-sm text-text">{a.name}</div>
              ))}
              {applicants.filter((a) => a.stage === stage).length === 0 && (
                <div className="text-xs text-text-muted">No applicants</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
