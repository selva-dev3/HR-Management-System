'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const departments = [
  { id: 'd1', name: 'Engineering', code: 'ENG', head: 'Alex Morgan' },
  { id: 'd2', name: 'Sales', code: 'SAL', head: 'Sarah Smith' },
  { id: 'd3', name: 'HR', code: 'HR', head: 'Emma Wilson' },
];

export default function DepartmentsSettingsPage(): React.ReactElement {
  const [data, setData] = useState(departments);

  const handleDelete = (id: string): void => {
    if (confirm('Delete department?')) setData((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Departments" description="Manage department structure">
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Department</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Code', accessor: 'code' },
          { header: 'Head', accessor: 'head' },
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
