'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function UnauthorizedPage(): React.ReactElement {
  const { user } = useAuthStore();
  const homeLink = '/dashboard';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-extrabold text-error">403</h1>
      <h2 className="mt-4 text-2xl font-bold text-text">Access Denied</h2>
      <p className="mt-2 text-text-muted">You do not have permission to view this page.</p>
      <div className="mt-6 flex gap-3">
        <Link href={homeLink}>
          <Button variant="primary">Go to Dashboard</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Switch Account</Button>
        </Link>
      </div>
    </div>
  );
}
