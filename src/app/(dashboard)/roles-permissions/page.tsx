'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface RolePermission {
  role: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

const initial: RolePermission[] = [
  { role: 'hr_admin', view: true, create: true, edit: true, delete: false, export: true },
  { role: 'manager', view: true, create: false, edit: true, delete: false, export: false },
  { role: 'employee', view: true, create: false, edit: false, delete: false, export: false },
  { role: 'auditor', view: true, create: false, edit: false, delete: false, export: true },
];

export default function RolesPermissionsPage(): React.ReactElement {
  const [permissions, setPermissions] = useState<RolePermission[]>(initial);

  const toggle = (index: number, key: keyof RolePermission): void => {
    setPermissions((prev) => prev.map((p, i) => (i === index ? { ...p, [key]: !p[key] } : p)));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Roles & Permissions" description="Granular access control" />
      <Card>
        <CardHeader><CardTitle>Module: Employees</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Role', accessor: 'role' },
              {
                header: 'View',
                accessor: (row, i) => (
                  <input type="checkbox" checked={row.view} onChange={() => toggle(i, 'view')} />
                ),
              },
              {
                header: 'Create',
                accessor: (row, i) => (
                  <input type="checkbox" checked={row.create} onChange={() => toggle(i, 'create')} />
                ),
              },
              {
                header: 'Edit',
                accessor: (row, i) => (
                  <input type="checkbox" checked={row.edit} onChange={() => toggle(i, 'edit')} />
                ),
              },
              {
                header: 'Delete',
                accessor: (row, i) => (
                  <input type="checkbox" checked={row.delete} onChange={() => toggle(i, 'delete')} />
                ),
              },
              {
                header: 'Export',
                accessor: (row, i) => (
                  <input type="checkbox" checked={row.export} onChange={() => toggle(i, 'export')} />
                ),
              },
            ]}
            data={permissions}
          />
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Permissions</Button>
      </div>
    </div>
  );
}
