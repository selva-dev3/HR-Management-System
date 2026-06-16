'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const templates = [
  { id: 'et1', name: 'Offer Letter', type: 'Offer' },
  { id: 'et2', name: 'Leave Approved', type: 'Leave' },
  { id: 'et3', name: 'Payslip', type: 'Payroll' },
];

export default function EmailTemplatesPage(): React.ReactElement {
  const [data, setData] = useState(templates);

  const handleDelete = (id: string): void => {
    if (confirm('Delete template?')) setData((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Email Templates" description="Manage notification templates">
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Template</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Template', accessor: 'name' },
          { header: 'Type', accessor: 'type' },
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
