'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EmployeeWorkHistoryPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Work History" description="Previous employment and internal transfers">
        <Link href={`/employees/${id}`}>
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Employment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState title="No records" description="Previous employment and internal transfers will appear here." />
        </CardContent>
      </Card>
    </div>
  );
}
