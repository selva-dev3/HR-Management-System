'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/shared/DataTable';
import { Badge } from '@/components/ui/Badge';

const myTrainings = [
  { id: 'mt1', title: 'React Advanced Patterns', status: 'In progress', progress: 60 },
  { id: 'mt2', title: 'Leadership 101', status: 'Completed', progress: 100 },
];

export default function MyTrainingsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="My Trainings" description="Enrolled and completed courses" />
      <Card>
        <CardHeader><CardTitle>Enrolled</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Course', accessor: 'title' },
              {
                header: 'Progress',
                accessor: (row) => (
                  <div className="w-24 rounded-full bg-border">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${row.progress}%` }} />
                  </div>
                ),
              },
              {
                header: 'Status',
                accessor: (row) => <Badge variant={row.status === 'Completed' ? 'success' : 'primary'}>{row.status}</Badge>,
              },
            ]}
            data={myTrainings}
          />
        </CardContent>
      </Card>
    </div>
  );
}
