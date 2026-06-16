'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Trash2 } from 'lucide-react';

const courses = [
  { id: 'c1', title: 'Soft Skills', category: 'Soft skills', duration: '4h', mandatory: false },
  { id: 'c2', title: 'Compliance Basics', category: 'Compliance', duration: '2h', mandatory: true },
];

export default function TrainingCoursesPage(): React.ReactElement {
  const [data, setData] = useState(courses);

  const handleDelete = (id: string): void => {
    if (confirm('Delete course?')) setData((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Course Library" description="Internal and external courses">
        <Button leftIcon={<Plus className="h-4 w-4" />}>New Course</Button>
      </PageHeader>
      <DataTable
        columns={[
          { header: 'Course', accessor: 'title' },
          { header: 'Category', accessor: 'category' },
          { header: 'Duration', accessor: 'duration' },
          { header: 'Mandatory', accessor: (row) => <Badge variant={row.mandatory ? 'error' : 'default'}>{row.mandatory ? 'Yes' : 'No'}</Badge> },
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
