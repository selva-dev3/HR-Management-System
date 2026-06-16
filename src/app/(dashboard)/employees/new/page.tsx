'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { employeeService } from '@/features/employees/services/employeeService';

const personalSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email(),
  phone: z.string().min(1, 'Required'),
});

const jobSchema = z.object({
  department: z.string().min(1, 'Required'),
  designation: z.string().min(1, 'Required'),
  joinDate: z.string().min(1, 'Required'),
  location: z.string().min(1, 'Required'),
  managerId: z.string().optional(),
});

const bankSchema = z.object({
  bankAccount: z.string().min(1, 'Required'),
  bankIfsc: z.string().min(1, 'Required'),
  salaryStructureId: z.string().optional(),
});

const combinedSchema = z.intersection(z.intersection(personalSchema, jobSchema), bankSchema);

type FormValues = z.infer<typeof combinedSchema>;

const steps = ['Personal', 'Job', 'Bank'] as const;

export default function NewEmployeePage(): React.ReactElement {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({ resolver: zodResolver(combinedSchema) });

  const onSubmit = async (values: FormValues): Promise<void> => {
    setIsSubmitting(true);
    try {
      await employeeService.create({ ...values, status: 'Active' });
      router.push('/employees');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async (): Promise<void> => {
    const stepFields = [
      ['firstName', 'lastName', 'email', 'phone'],
      ['department', 'designation', 'joinDate', 'location'],
      ['bankAccount', 'bankIfsc'],
    ] as const;
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = (): void => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-3xl">
      <PageHeader title="New Employee" description="Add a new employee to the system" />

      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i <= step ? 'bg-primary text-white' : 'bg-surface-raised text-text-muted'
              }`}
            >
              {i + 1}
            </span>
            <span className={i <= step ? 'text-sm font-medium text-text' : 'text-sm text-text-muted'}>{s}</span>
            {i < steps.length - 1 && <div className="h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName" isRequired>First Name</Label>
                <Input id="firstName" isError={!!errors.firstName} {...register('firstName')} />
                {errors.firstName && <p className="mt-1 text-xs text-error">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName" isRequired>Last Name</Label>
                <Input id="lastName" isError={!!errors.lastName} {...register('lastName')} />
                {errors.lastName && <p className="mt-1 text-xs text-error">{errors.lastName.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email" isRequired>Email</Label>
                <Input id="email" type="email" isError={!!errors.email} {...register('email')} />
                {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone" isRequired>Phone</Label>
                <Input id="phone" isError={!!errors.phone} {...register('phone')} />
                {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone.message}</p>}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="department" isRequired>Department</Label>
                <Input id="department" isError={!!errors.department} {...register('department')} />
                {errors.department && <p className="mt-1 text-xs text-error">{errors.department.message}</p>}
              </div>
              <div>
                <Label htmlFor="designation" isRequired>Designation</Label>
                <Input id="designation" isError={!!errors.designation} {...register('designation')} />
                {errors.designation && <p className="mt-1 text-xs text-error">{errors.designation.message}</p>}
              </div>
              <div>
                <Label htmlFor="joinDate" isRequired>Join Date</Label>
                <Input id="joinDate" type="date" isError={!!errors.joinDate} {...register('joinDate')} />
                {errors.joinDate && <p className="mt-1 text-xs text-error">{errors.joinDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="location" isRequired>Location</Label>
                <Input id="location" isError={!!errors.location} {...register('location')} />
                {errors.location && <p className="mt-1 text-xs text-error">{errors.location.message}</p>}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Bank Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="bankAccount" isRequired>Account Number</Label>
                <Input id="bankAccount" isError={!!errors.bankAccount} {...register('bankAccount')} />
                {errors.bankAccount && <p className="mt-1 text-xs text-error">{errors.bankAccount.message}</p>}
              </div>
              <div>
                <Label htmlFor="bankIfsc" isRequired>IFSC Code</Label>
                <Input id="bankIfsc" isError={!!errors.bankIfsc} {...register('bankIfsc')} />
                {errors.bankIfsc && <p className="mt-1 text-xs text-error">{errors.bankIfsc.message}</p>}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          {step > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button type="button" variant="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Save Employee
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
