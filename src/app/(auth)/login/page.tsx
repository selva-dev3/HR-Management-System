'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof schema>;

const DEMO_CREDENTIALS = [
  { label: 'Super Admin (Alex Morgan)', value: 'admin@company.com:123456' },
  { label: 'HR Admin (Sarah Smith)', value: 'hr@company.com:123456' },
  { label: 'Manager (John Doe)', value: 'manager@company.com:123456' },
  { label: 'Employee (Daniel Davis)', value: 'employee@company.com:123456' },
  { label: 'Auditor (Sophia Rodriguez)', value: 'auditor@company.com:123456' },
];

export default function LoginPage(): React.ReactElement {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    const success = await login(values.email, values.password);
    if (success) {
      router.push('/dashboard');
    }
  };

  const handleCredentialSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const val = e.target.value;
    if (val) {
      const [email, password] = val.split(':');
      setValue('email', email, { shouldValidate: true });
      setValue('password', password, { shouldValidate: true });
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-8 shadow-card">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-text">HR Management System</h1>
        <p className="mt-2 text-sm text-text-muted">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <Label htmlFor="demo-role">Demo Account Shortcut</Label>
          <Select
            id="demo-role"
            placeholder="Choose a role to autofill..."
            options={DEMO_CREDENTIALS}
            onChange={handleCredentialSelect}
          />
        </div>

        <div>
          <Label htmlFor="email" isRequired>
            Email
          </Label>
          <Input id="email" type="email" placeholder="you@company.com" isError={!!errors.email} {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password" isRequired>
            Password
          </Label>
          <Input id="password" type="password" placeholder="••••••••" isError={!!errors.password} {...register('password')} />
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
        </div>
        <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot password?
        </Link>
        <span className="text-text-muted">Max 5 attempts</span>
      </div>
    </div>
  );
}
