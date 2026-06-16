'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LeaveRequestDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Request Detail" description={`ID: ${id}`}>
        <Link href="/leave/requests">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Request Info</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-text-muted">Requester</span> <span>John Doe</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Type</span> <span>Annual</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Dates</span> <span>Jun 20 - Jun 22</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Days</span> <span>3</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Status</span> <Badge variant="default">Pending</Badge></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Approval Chain</CardTitle></CardHeader>
          <CardContent className="text-sm text-text-muted">
            <p>Manager review pending.</p>
            <div className="mt-4 flex gap-3">
              <Button variant="primary" size="sm">Approve</Button>
              <Button variant="outline" size="sm">Reject</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
