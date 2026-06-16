'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
const events = [
  { id: 't1', title: 'React Advanced Patterns', trainer: 'Alex Morgan', date: 'Jun 25', mode: 'Online', seats: 20 },
  { id: 't2', title: 'Leadership 101', trainer: 'Sarah Smith', date: 'Jun 28', mode: 'Offline', seats: 15 },
];

export default function TrainingCalendarPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Training Calendar" description="Upcoming sessions" />
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((ev) => (
          <Card key={ev.id}>
            <CardHeader>
              <CardTitle>{ev.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-muted">Trainer</span> <span>{ev.trainer}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Date</span> <span>{ev.date}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Mode</span> <Badge variant="primary">{ev.mode}</Badge></div>
              <div className="flex justify-between"><span className="text-text-muted">Seats</span> <span>{ev.seats}</span></div>
              <div className="mt-3 flex gap-2">
                <Button variant="primary" size="sm">Register</Button>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
