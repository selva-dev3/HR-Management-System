'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Sidebar } from '@/components/shared/Sidebar';
import { TopBar } from '@/components/shared/TopBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname?.startsWith('/forgot-password') || pathname?.startsWith('/reset-password');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen text-text">
      <Sidebar />
      <div className="min-h-screen transition-all duration-300 lg:ml-64">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
