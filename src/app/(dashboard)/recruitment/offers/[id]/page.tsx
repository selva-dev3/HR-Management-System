'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function OfferPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Offer Letter" description={`Offer ID: ${id}`}>
        <Link href="/recruitment/jobs">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Offer Details</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><span className="text-text-muted">Candidate:</span> Alice Johnson</p>
          <p><span className="text-text-muted">Role:</span> Senior React Developer</p>
          <p><span className="text-text-muted">CTC:</span> $120,000</p>
          <p><span className="text-text-muted">Status:</span> Pending Acceptance</p>
          <div className="mt-4 flex gap-2">
            <Button variant="primary">Generate PDF</Button>
            <Button variant="outline">Send Email</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
