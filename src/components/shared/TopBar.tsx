'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';
import { Search, Sun, Moon, LogOut } from 'lucide-react';

export const TopBar = memo(function TopBar(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useUIStore();

  const handleLogout = (): void => {
    logout();
    router.push('/login');
  };

  const breadcrumb = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <nav aria-label="Breadcrumb" className="hidden text-sm text-text-muted md:block">
          <ol className="flex items-center gap-2">
            {breadcrumb.map((segment, idx) => {
              const isLast = idx === breadcrumb.length - 1;
              const href = '/' + breadcrumb.slice(0, idx + 1).join('/');
              return (
                <li key={idx} className="flex items-center gap-2 capitalize">
                  {idx > 0 && <span>/</span>}
                  {isLast ? (
                    <span className="text-text">{segment.replace(/-/g, ' ')}</span>
                  ) : (
                    <Link href={href} className="hover:text-text hover:underline">
                      {segment.replace(/-/g, ' ')}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search employees, jobs, assets..."
            className="h-9 w-64 rounded-md border border-border bg-surface-raised pl-9 pr-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <div className="flex items-center gap-3 border-l border-border pl-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-text">{user?.name}</p>
            <p className="text-xs text-text-muted capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} aria-label="Logout">
            <LogOut className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
});
