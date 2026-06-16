'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Trash2 } from 'lucide-react';

const integrations = [
  { id: 'in1', name: 'Slack', type: 'Notification', status: 'Connected' },
  { id: 'in2', name: 'Google Calendar', type: 'Calendar', status: 'Disconnected' },
  { id: 'in3', name: 'Biometric Device', type: 'Attendance', status: 'Connected' },
];

export default function IntegrationsPage(): React.ReactElement {
  const [data, setData] = useState(integrations);

  const handleDelete = (id: string): void => {
    if (confirm('Delete integration?')) setData((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Integrations" description="Third-party integrations and webhooks">
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Integration</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Integration', accessor: 'name' },
          { header: 'Type', accessor: 'type' },
          {
            header: 'Status',
            accessor: (row) => <Badge variant={row.status === 'Connected' ? 'success' : 'default'}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            accessor: (row) => (
              <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4 text-error" /></Button>
            ),
          },
        ]}
        data={data}
      />
    </div>
  );
}
