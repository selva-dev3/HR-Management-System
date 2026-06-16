'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function EmployeeDocumentsPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Documents" description="Employee documents and files">
        <Link href={`/employees/${id}`}>
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState title="No documents yet" description="Upload offer letters, ID proofs, and certificates here." actionLabel="Upload Document" onAction={() => alert('Upload modal would open')} />
        </CardContent>
      </Card>
    </div>
  );
}
