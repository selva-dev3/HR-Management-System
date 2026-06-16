'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AssetHistoryPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  const history = [
    { id: 'ah1', employee: 'John Doe', assigned: '2024-01-10', returned: '2024-06-10', condition: 'Good' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Asset History" description={`Asset ID: ${id}`}>
        <Link href="/assets">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Assignment History</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Employee', accessor: 'employee' },
              { header: 'Assigned', accessor: 'assigned' },
              { header: 'Returned', accessor: 'returned' },
              { header: 'Condition', accessor: 'condition' },
            ]}
            data={history}
          />
        </CardContent>
      </Card>
    </div>
  );
}
