'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const PUBLIC_PATHS = ['/login', '/forgot-password', '/reset-password', '/unauthorized'];

export function AuthGuard({ children }: { children: React.ReactNode }): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !PUBLIC_PATHS.some((p) => pathname?.startsWith(p))) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-text-muted">Checking session...</div>
      </div>
    );
  }

  if (!isAuthenticated && !PUBLIC_PATHS.some((p) => pathname?.startsWith(p))) {
    return <></>;
  }

  return <>{children}</>;
}
