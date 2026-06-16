'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash2 } from 'lucide-react';

const shifts = [
  { id: 's1', name: 'Morning', time: '09:00 - 18:00', assigned: 85 },
  { id: 's2', name: 'Night', time: '22:00 - 07:00', assigned: 12 },
  { id: 's3', name: 'Flexible', time: 'Flexible', assigned: 30 },
];

export default function AttendanceShiftsPage(): React.ReactElement {
  const [data, setData] = useState(shifts);
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string): void => {
    if (confirm('Delete shift?')) setData((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Shift Templates" description="Manage work schedules">
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>New Shift</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Shift Name', accessor: 'name' },
          { header: 'Timings', accessor: 'time' },
          { header: 'Assigned', accessor: 'assigned' },
          {
            header: 'Actions',
            accessor: (row) => (
              <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4 text-error" /></Button>
            ),
          },
        ]}
        data={data}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="New Shift" footer={<Button variant="primary" onClick={() => setOpen(false)}>Save</Button>}>
        <div className="space-y-3">
          <div><Label>Shift Name</Label><Input /></div>
          <div><Label>Start Time</Label><Input type="time" /></div>
          <div><Label>End Time</Label><Input type="time" /></div>
        </div>
      </Modal>
    </div>
  );
}
