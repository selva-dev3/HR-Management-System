'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash2 } from 'lucide-react';

const policies = [
  { id: 'p1', name: 'Annual Leave', days: 15, carryForward: 5, accrual: 'Monthly' },
  { id: 'p2', name: 'Sick Leave', days: 10, carryForward: 0, accrual: 'Upfront' },
  { id: 'p3', name: 'Casual Leave', days: 8, carryForward: 0, accrual: 'Upfront' },
];

export default function LeavePoliciesPage(): React.ReactElement {
  const [data, setData] = useState(policies);
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string): void => {
    if (confirm('Delete policy?')) setData((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Policies" description="Configure leave rules">
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>New Policy</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Policy', accessor: 'name' },
          { header: 'Days/Year', accessor: 'days' },
          { header: 'Carry Forward', accessor: 'carryForward' },
          { header: 'Accrual', accessor: 'accrual' },
          {
            header: 'Actions',
            accessor: (row) => (
              <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4 text-error" /></Button>
            ),
          },
        ]}
        data={data}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="New Leave Policy" footer={<Button variant="primary" onClick={() => setOpen(false)}>Save</Button>}>
        <div className="space-y-3">
          <div><label className="text-sm font-medium">Policy Name</label><Input /></div>
          <div><label className="text-sm font-medium">Days/Year</label><Input type="number" /></div>
          <div><label className="text-sm font-medium">Carry Forward Limit</label><Input type="number" /></div>
        </div>
      </Modal>
    </div>
  );
}
