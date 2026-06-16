'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

const reports = [
  { id: 'pr1', name: 'Rating Distribution', type: 'Summary' },
  { id: 'pr2', name: 'High Performers', type: 'List' },
  { id: 'pr3', name: 'PIP Candidates', type: 'List' },
];

export default function PerformanceReportsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Performance Reports" description="Exportable review reports" />
      <Card>
        <CardHeader><CardTitle>Available Reports</CardTitle></CardHeader>
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
            data={reports}
          />
        </CardContent>
      </Card>
    </div>
  );
}
