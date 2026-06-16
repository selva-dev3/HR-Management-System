'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash2 } from 'lucide-react';

const structures = [
  { id: 'st1', name: 'Standard CTC', basic: 50, hra: 20, allowances: 15, pf: 12, esi: 0, pt: 200 },
  { id: 'st2', name: 'Senior CTC', basic: 45, hra: 25, allowances: 20, pf: 12, esi: 0, pt: 200 },
];

export default function SalaryStructuresPage(): React.ReactElement {
  const [data, setData] = useState(structures);
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string): void => {
    if (confirm('Delete structure?')) setData((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Salary Structures" description="CTC component templates">
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setOpen(true)}>New Structure</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Basic %', accessor: 'basic' },
          { header: 'HRA %', accessor: 'hra' },
          { header: 'Allowances %', accessor: 'allowances' },
          { header: 'PF %', accessor: 'pf' },
          {
            header: 'Actions',
            accessor: (row) => (
              <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4 text-error" /></Button>
            ),
          },
        ]}
        data={data}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="New Structure" footer={<Button variant="primary" onClick={() => setOpen(false)}>Save</Button>}>
        <div className="space-y-3">
          <div><label className="text-sm font-medium">Structure Name</label><Input /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium">Basic %</label><Input type="number" /></div>
            <div><label className="text-sm font-medium">HRA %</label><Input type="number" /></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
