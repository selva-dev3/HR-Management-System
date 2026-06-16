'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { useUIStore } from '@/store/uiStore';

export default function LeaveApplyPage(): React.ReactElement {
  const router = useRouter();
  const { addNotification } = useUIStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    addNotification({ title: 'Leave Applied', message: 'Your leave request has been submitted.', type: 'success', isRead: false });
    router.push('/leave');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="Apply for Leave" description="Submit a new leave request" />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader><CardTitle>Leave Request</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="type" isRequired>Leave Type</Label>
              <Select
                id="type"
                options={[
                  { label: 'Annual Leave', value: 'annual' },
                  { label: 'Sick Leave', value: 'sick' },
                  { label: 'Casual Leave', value: 'casual' },
                  { label: 'Maternity Leave', value: 'maternity' },
                ]}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="startDate" isRequired>Start Date</Label>
                <Input id="startDate" type="date" required />
              </div>
              <div>
                <Label htmlFor="endDate" isRequired>End Date</Label>
                <Input id="endDate" type="date" required />
              </div>
            </div>
            <div>
              <Label htmlFor="reason" isRequired>Reason</Label>
              <textarea id="reason" className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm" rows={3} required />
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <input type="checkbox" id="halfDay" />
              <label htmlFor="halfDay">Half day</label>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push('/leave')}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>Submit Request</Button>
        </div>
      </form>
    </div>
  );
}
