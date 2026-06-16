'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface Node {
  name: string;
  role: string;
  children?: Node[];
}

const orgData: Node = {
  name: 'Alex Morgan',
  role: 'CEO',
  children: [
    {
      name: 'Sarah Smith',
      role: 'VP Engineering',
      children: [
        { name: 'John Doe', role: 'Engineering Manager', children: [{ name: 'Alice Brown', role: 'Senior Engineer' }, { name: 'Bob Green', role: 'Engineer' }] },
        { name: 'Emily White', role: 'Engineering Manager' },
      ],
    },
    {
      name: 'Michael Brown',
      role: 'VP Sales',
      children: [{ name: 'Jessica Black', role: 'Sales Manager' }, { name: 'David Gray', role: 'Sales Manager' }],
    },
    {
      name: 'Emma Wilson',
      role: 'VP HR',
      children: [{ name: 'Olivia Taylor', role: 'HR Manager' }],
    },
  ],
};

function OrgNode({ node, depth = 0 }: { node: Node; depth?: number }): React.ReactElement {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border border-border bg-surface px-4 py-2 text-center shadow-card">
        <p className="text-sm font-semibold text-text">{node.name}</p>
        <p className="text-xs text-text-muted">{node.role}</p>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="mt-4 flex gap-4">
          {node.children.map((child, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div className="h-4 w-px bg-border" />
              <OrgNode node={child} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChartPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Organization Chart" description="Company hierarchy and reporting structure" />
      <Card>
        <CardHeader>
          <CardTitle>Hierarchy</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto py-8">
          <OrgNode node={orgData} />
        </CardContent>
      </Card>
    </div>
  );
}
