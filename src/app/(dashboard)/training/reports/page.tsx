'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

const trainingReports = [
  { id: 'tr1', name: 'Training Hours per Employee', type: 'Summary' },
  { id: 'tr2', name: 'Completion Rate by Course', type: 'Chart' },
];

export default function TrainingReportsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Training Reports" description="Insights and completion data" />
      <Card>
        <CardHeader><CardTitle>Reports</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Report', accessor: 'name' },
              { header: 'Type', accessor: 'type' },
              {
                header: 'Actions',
                accessor: () => (
                  <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
                ),
              },
            ]}
            data={trainingReports}
          />
        </CardContent>
      </Card>
    </div>
  );
}
