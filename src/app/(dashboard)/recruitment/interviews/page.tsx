'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const interviews = [
  { id: 'i1', applicant: 'Alice Johnson', interviewer: 'Sarah Smith', date: new Date().toISOString(), mode: 'Video' },
  { id: 'i2', applicant: 'Bob Green', interviewer: 'John Doe', date: new Date(Date.now() + 86400000).toISOString(), mode: 'In-person' },
];

export default function InterviewsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Interviews" description="Scheduled interviews calendar and list">
        <Button leftIcon={<Plus className="h-4 w-4" />}>Schedule Interview</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Applicant', accessor: 'applicant' },
          { header: 'Interviewer', accessor: 'interviewer' },
          { header: 'Date', accessor: (row) => formatDate(row.date, 'MMM d, yyyy h:mm a') },
          { header: 'Mode', accessor: (row) => <Badge variant="primary">{row.mode}</Badge> },
        ]}
        data={interviews}
      />
    </div>
  );
}
