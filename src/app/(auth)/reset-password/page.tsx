'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage(): React.ReactElement {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_values: FormValues): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-8 shadow-card">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-text">Reset Password</h1>
        <p className="mt-2 text-sm text-text-muted">Create a new password for your account.</p>
      </div>

      {!token && (
        <div className="text-center text-sm text-error">
          Invalid or expired token. <br />
          <Link href="/forgot-password" className="text-primary hover:underline">
            Request a new link
          </Link>
        </div>
      )}

      {submitted ? (
        <div className="text-center">
          <p className="text-sm text-success">Password updated successfully.</p>
          <Link href="/login" className="mt-4 inline-block text-sm text-primary hover:underline">
            Back to login
          </Link>
        </div>
      ) : (
        token && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="password" isRequired>
                New Password
              </Label>
              <Input id="password" type="password" isError={!!errors.password} {...register('password')} />
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword" isRequired>
                Confirm Password
              </Label>
              <Input id="confirmPassword" type="password" isError={!!errors.confirmPassword} {...register('confirmPassword')} />
              {errors.confirmPassword && <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        )
      )}
    </div>
  );
}
