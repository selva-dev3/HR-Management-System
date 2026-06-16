'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { employeeService } from '@/features/employees/services/employeeService';
import { Employee } from '@/features/employees/types/employee.types';
import { formatDate } from '@/utils/formatDate';
import { Pencil, ArrowLeft } from 'lucide-react';

export default function EmployeeDetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    employeeService.getById(id).then((data) => {
      setEmployee(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <div className="py-12 text-center text-text-muted">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">Employee not found.</p>
        <Link href="/employees" className="mt-4 inline-block text-primary hover:underline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={`${employee.firstName} ${employee.lastName}`} description={`${employee.designation} — ${employee.department}`}>
        <div className="flex items-center gap-3">
          <Link href="/employees">
            <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
          </Link>
          <Link href={`/employees/${id}/edit`}>
            <Button leftIcon={<Pencil className="h-4 w-4" />}>Edit</Button>
          </Link>
        </div>
      </PageHeader>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-muted">Employee ID</span> <span>{employee.employeeId}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Email</span> <span>{employee.email}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Phone</span> <span>{employee.phone}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Location</span> <span>{employee.location}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Job Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-muted">Department</span> <span>{employee.department}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Designation</span> <span>{employee.designation}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Join Date</span> <span>{formatDate(employee.joinDate)}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Status</span> <Badge variant={employee.status === 'Active' ? 'success' : 'error'}>{employee.status}</Badge></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-muted">Account</span> <span>{employee.bankAccount}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">IFSC</span> <span>{employee.bankIfsc}</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">No documents uploaded yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Work History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">No history records yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">No assets assigned yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted">No payroll data yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
