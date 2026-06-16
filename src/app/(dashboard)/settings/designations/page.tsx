'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const designations = [
  { id: 'des1', name: 'Senior Engineer', level: 'L5', department: 'Engineering' },
  { id: 'des2', name: 'HR Executive', level: 'L3', department: 'HR' },
];

export default function DesignationsSettingsPage(): React.ReactElement {
  const [data, setData] = useState(designations);

  const handleDelete = (id: string): void => {
    if (confirm('Delete designation?')) setData((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Designations" description="Manage roles and levels">
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Designation</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Level', accessor: 'level' },
          { header: 'Department', accessor: 'department' },
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
