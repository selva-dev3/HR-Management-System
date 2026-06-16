'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const checklist = [
  { name: 'Document verification', status: 'Completed', assignee: 'HR' },
  { name: 'Laptop allocation', status: 'Pending', assignee: 'IT' },
  { name: 'Access provisioning', status: 'Pending', assignee: 'IT' },
  { name: 'Welcome kit', status: 'Pending', assignee: 'HR' },
];

export default function OnboardingPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <PageHeader title="Onboarding" description={`Employee ID: ${id}`}>
        <Link href="/recruitment/jobs">
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>
      <Card>
        <CardHeader><CardTitle>Pre-boarding Checklist</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={item.status === 'Completed'} readOnly className="h-4 w-4" />
                  <span className={item.status === 'Completed' ? 'line-through text-text-muted' : 'text-text'}>{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-muted">{item.assignee}</span>
                  <Badge variant={item.status === 'Completed' ? 'success' : 'default'}>{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
