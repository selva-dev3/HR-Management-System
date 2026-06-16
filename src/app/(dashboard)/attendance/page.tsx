'use client';

import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/shared/DataTable';
import { UserCheck, UserX, Clock, Home } from 'lucide-react';

export default function AttendancePage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Today's attendance summary" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Present" value="132" icon={UserCheck} />
        <StatCard title="Absent" value="8" changeType="negative" icon={UserX} />
        <StatCard title="Late" value="5" changeType="warning" icon={Clock} />
        <StatCard title="WFH" value="12" icon={Home} />
      </div>
      <Card>
        <CardHeader><CardTitle>Department Breakdown</CardTitle></CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { header: 'Department', accessor: 'dept' },
              { header: 'Present', accessor: 'present' },
              { header: 'Absent', accessor: 'absent' },
              { header: 'Late', accessor: 'late' },
            ]}
            data={[
              { id: '1', dept: 'Engineering', present: 40, absent: 2, late: 1 },
              { id: '2', dept: 'Sales', present: 18, absent: 1, late: 2 },
              { id: '3', dept: 'HR', present: 8, absent: 0, late: 0 },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
