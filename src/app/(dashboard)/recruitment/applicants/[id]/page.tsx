'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApplicantDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Applicant Profile" description={`ID: ${id}`}>
        <Link href="/recruitment/jobs">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Name</span> <span>Alice Johnson</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Email</span> <span>alice@example.com</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Status</span> <Badge variant="primary">Interview</Badge></div>
            <div className="flex justify-between"><span className="text-text-muted">Applied</span> <span>{formatDate(new Date().toISOString())}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Resume</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-text-muted">Preview would appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
