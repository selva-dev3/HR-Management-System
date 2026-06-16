'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { employeeService } from '@/features/employees/services/employeeService';
import { Employee } from '@/features/employees/types/employee.types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  department: z.string().min(1),
  designation: z.string().min(1),
  location: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function EditEmployeePage(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!id) return;
    employeeService.getById(id).then((data) => {
      if (data) {
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          department: data.department,
          designation: data.designation,
          location: data.location,
        });
        setEmployee(data);
      }
      setIsLoading(false);
    });
  }, [id, reset]);

  const onSubmit = async (values: FormValues): Promise<void> => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await employeeService.update(id, values);
      router.push(`/employees/${id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-12 text-center text-text-muted">Loading...</div>;
  }

  if (!employee) {
    return (
      <div className="py-12 text-center text-error">
        Employee not found.
        <Link href="/employees" className="mt-4 block text-primary hover:underline">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Edit Employee" description={`${employee.firstName} ${employee.lastName}`}>
        <Link href={`/employees/${id}`}>
          <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>Back</Button>
        </Link>
      </PageHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" isError={!!errors.firstName} {...register('firstName')} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" isError={!!errors.lastName} {...register('lastName')} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" isError={!!errors.email} {...register('email')} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" isError={!!errors.phone} {...register('phone')} />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" isError={!!errors.department} {...register('department')} />
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" isError={!!errors.designation} {...register('designation')} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" isError={!!errors.location} {...register('location')} />
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex items-center justify-end gap-3">
          <Link href={`/employees/${id}`}>
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
