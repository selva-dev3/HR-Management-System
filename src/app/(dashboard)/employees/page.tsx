'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { employeeService } from '@/features/employees/services/employeeService';
import { Employee } from '@/features/employees/types/employee.types';
import { formatDate } from '@/utils/formatDate';
import { Download, Search, Plus, Pencil, Trash2 } from 'lucide-react';

export default function EmployeesPage(): React.ReactElement {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    employeeService.getAll().then((data) => {
      setEmployees(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesSearch = `${e.firstName} ${e.lastName} ${e.email}`.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter ? e.department === deptFilter : true;
      const matchesStatus = statusFilter ? e.status === statusFilter : true;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, search, deptFilter, statusFilter]);

  const departments = useMemo(() => Array.from(new Set(employees.map((e) => e.department))), [employees]);

  const handleDelete = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await employeeService.delete(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Employees" description="Manage your workforce">
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Link href="/employees/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>New Employee</Button>
          </Link>
        </div>
      </PageHeader>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            className="pl-9"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          placeholder="Department"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          options={departments.map((d) => ({ label: d, value: d }))}
          className="md:w-48"
        />
        <Select
          placeholder="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' },
          ]}
          className="md:w-40"
        />
      </div>

      <DataTable
        isLoading={isLoading}
        columns={[
          { header: 'Employee ID', accessor: 'employeeId' },
          {
            header: 'Name',
            accessor: (row) => (
              <Link href={`/employees/${row.id}`} className="font-medium text-primary hover:underline">
                {row.firstName} {row.lastName}
              </Link>
            ),
          },
          { header: 'Department', accessor: 'department' },
          { header: 'Designation', accessor: 'designation' },
          {
            header: 'Status',
            accessor: (row) => (
              <Badge variant={row.status === 'Active' ? 'success' : 'error'}>{row.status}</Badge>
            ),
          },
          { header: 'Join Date', accessor: (row) => formatDate(row.joinDate) },
          {
            header: 'Actions',
            accessor: (row) => (
              <div className="flex items-center gap-2">
                <Link href={`/employees/${row.id}/edit`}>
                  <Button variant="ghost" size="sm" aria-label="Edit">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)} aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-error" />
                </Button>
              </div>
            ),
          },
        ]}
        data={filtered}
      />
    </div>
  );
}
