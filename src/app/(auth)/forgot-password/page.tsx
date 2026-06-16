'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage(): React.ReactElement {
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
        <h1 className="text-2xl font-bold text-text">Forgot Password</h1>
        <p className="mt-2 text-sm text-text-muted">We will send you a reset link.</p>
      </div>

      {submitted ? (
        <div className="text-center">
          <p className="text-sm text-success">If this email exists, you will receive reset instructions.</p>
          <Link href="/login" className="mt-4 inline-block text-sm text-primary hover:underline">
            Back to login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <Label htmlFor="email" isRequired>
              Email
            </Label>
            <Input id="email" type="email" placeholder="you@company.com" isError={!!errors.email} {...register('email')} />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
          </div>
          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Send reset link
          </Button>
        </form>
      )}

      <div className="mt-6 text-center text-sm">
        <Link href="/login" className="text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
