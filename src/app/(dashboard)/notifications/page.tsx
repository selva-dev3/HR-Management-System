'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useUIStore } from '@/store/uiStore';
import { formatDate } from '@/utils/formatDate';
import { Check, Trash2 } from 'lucide-react';

export default function NotificationsPage(): React.ReactElement {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useUIStore();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="All system and approval notifications">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="filter" className="text-text-muted">Show:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
              className="rounded-md border border-border bg-surface px-2 py-1.5 text-sm"
            >
              <option value="all">All</option>
              <option value="unread">Unread only</option>
            </select>
          </div>
        </div>
      </PageHeader>

      <DataTable
        columns={[
          {
            header: 'Status',
            accessor: (row) => (
              <Badge variant={row.isRead ? 'default' : 'primary'}>{row.isRead ? 'Read' : 'Unread'}</Badge>
            ),
          },
          { header: 'Title', accessor: 'title' },
          { header: 'Message', accessor: 'message' },
          { header: 'Time', accessor: (row) => formatDate(row.createdAt, 'MMM d, yyyy h:mm a') },
          {
            header: 'Actions',
            accessor: (row) => (
              <div className="flex gap-2">
                {!row.isRead && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(row.id)} aria-label="Mark as read">
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => removeNotification(row.id)} aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-error" />
                </Button>
              </div>
            ),
          },
        ]}
        data={filtered}
        emptyTitle="No notifications"
        emptyDescription="You have no notifications at the moment."
      />
    </div>
  );
}
