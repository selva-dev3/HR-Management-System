'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const holidays = [
  { id: 'h1', name: 'New Year', date: '2025-01-01', type: 'National' },
  { id: 'h2', name: 'Independence Day', date: '2025-08-15', type: 'National' },
  { id: 'h3', name: 'Diwali', date: '2025-11-12', type: 'Regional' },
];

export default function HolidaysPage(): React.ReactElement {
  const [data, setData] = useState(holidays);
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string): void => {
    if (confirm('Delete holiday?')) setData((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Holidays" description="Annual holiday calendar">
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>Add Holiday</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Holiday', accessor: 'name' },
          { header: 'Date', accessor: (row) => formatDate(row.date) },
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
      <Modal open={open} onClose={() => setOpen(false)} title="Add Holiday" footer={<Button variant="primary" onClick={() => setOpen(false)}>Save</Button>}>
        <div className="space-y-3">
          <div><label className="text-sm font-medium">Holiday Name</label><Input /></div>
          <div><label className="text-sm font-medium">Date</label><Input type="date" /></div>
          <div><label className="text-sm font-medium">Type</label><Input /></div>
        </div>
      </Modal>
    </div>
  );
}
