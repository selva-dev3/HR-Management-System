'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

const mockJobs = Array.from({ length: 8 }).map((_, i) => ({
  id: `job-${i}`,
  title: ['Senior React Developer', 'HR Executive', 'Sales Manager', 'DevOps Engineer', 'Product Designer', 'Marketing Lead', 'QA Engineer', 'Backend Developer'][i],
  department: ['Engineering', 'HR', 'Sales', 'Engineering', 'Design', 'Marketing', 'Engineering', 'Engineering'][i],
  status: ['Open', 'Open', 'Closed', 'On Hold', 'Open', 'Draft', 'Closed', 'Open'][i],
  applicants: [12, 5, 0, 8, 3, 2, 6, 10][i],
  postedDate: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 3).toISOString(),
}));

export default function RecruitmentJobsPage(): React.ReactElement {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(mockJobs);

  const filtered = data.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string): void => {
    if (window.confirm('Delete this job?')) setData((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Job Postings" description="Manage open and closed positions">
        <Link href="/recruitment/jobs/new">
          <Button leftIcon={<Plus className="h-4 w-4" />}>New Job</Button>
        </Link>
      </PageHeader>
      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input className="pl-9" placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <DataTable
        columns={[
          { header: 'Title', accessor: (row) => <Link href={`/recruitment/jobs/${row.id}/edit`} className="text-primary hover:underline font-medium">{row.title}</Link> },
          { header: 'Department', accessor: 'department' },
          {
            header: 'Status',
            accessor: (row) => {
              const map: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
                Draft: 'default',
                Open: 'success',
                'On Hold': 'warning',
                Closed: 'error',
              };
              return <Badge variant={map[row.status] || 'default'}>{row.status}</Badge>;
            },
          },
          { header: 'Applicants', accessor: (row) => <Link href={`/recruitment/jobs/${row.id}/applicants`} className="text-primary hover:underline">{row.applicants}</Link> },
          { header: 'Posted', accessor: (row) => formatDate(row.postedDate) },
          {
            header: 'Actions',
            accessor: (row) => (
              <div className="flex items-center gap-2">
                <Link href={`/recruitment/jobs/${row.id}/edit`}>
                  <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(row.id)}><Trash2 className="h-4 w-4 text-error" /></Button>
              </div>
            ),
          },
        ]}
        data={filtered}
      />
    </div>
  );
}
