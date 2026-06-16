'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const assets = [
  { id: 'as1', assetId: 'A1001', name: 'MacBook Pro 16', category: 'Laptop', assignedTo: 'John Doe', status: 'Assigned' },
  { id: 'as2', assetId: 'A1002', name: 'Dell Monitor', category: 'Monitor', assignedTo: null, status: 'Available' },
];

export default function AssetsPage(): React.ReactElement {
  const [data, setData] = useState(assets);

  const handleDelete = (id: string): void => {
    if (confirm('Delete asset?')) setData((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Assets" description="IT and company asset inventory">
        <Link href="/assets/new">
          <Button leftIcon={<Plus className="h-4 w-4" />}>New Asset</Button>
        </Link>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Asset ID', accessor: 'assetId' },
          { header: 'Name', accessor: 'name' },
          { header: 'Category', accessor: 'category' },
          { header: 'Assigned To', accessor: (row) => row.assignedTo ?? '-' },
          {
            header: 'Status',
            accessor: (row) => <Badge variant={row.status === 'Available' ? 'success' : 'primary'}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            accessor: (row) => (
              <div className="flex gap-2">
                <Link href={`/assets/${row.id}/edit`}>
                  <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4 text-error" /></Button>
              </div>
            ),
          },
        ]}
        data={data}
      />
    </div>
  );
}
