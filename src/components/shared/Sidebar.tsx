'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Clock,
  CalendarDays,
  CreditCard,
  Target,
  GraduationCap,
  Package,
  BarChart3,
  Settings,
  ShieldCheck,
  Bell,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Employees', href: '/employees', icon: <Users className="h-5 w-5" /> },
  { label: 'Recruitment', href: '/recruitment/jobs', icon: <FolderOpen className="h-5 w-5" /> },
  { label: 'Attendance', href: '/attendance', icon: <Clock className="h-5 w-5" /> },
  { label: 'Leave', href: '/leave', icon: <CalendarDays className="h-5 w-5" /> },
  { label: 'Payroll', href: '/payroll', icon: <CreditCard className="h-5 w-5" /> },
  { label: 'Performance', href: '/performance', icon: <Target className="h-5 w-5" /> },
  { label: 'Training', href: '/training/courses', icon: <GraduationCap className="h-5 w-5" /> },
  { label: 'Assets', href: '/assets', icon: <Package className="h-5 w-5" /> },
  { label: 'Reports', href: '/reports/headcount', icon: <BarChart3 className="h-5 w-5" /> },
  { label: 'Settings', href: '/settings/company', icon: <Settings className="h-5 w-5" /> },
];

export const Sidebar = memo(function Sidebar(): React.ReactElement {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const { user } = useAuthStore();

  const navItems = useMemo(() => mainNav, []);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-surface-raised transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      )}
      aria-label="Sidebar"
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {sidebarOpen ? (
          <Link href="/dashboard" className="text-lg font-bold text-primary">
            HRMS
          </Link>
        ) : (
          <Link href="/dashboard" className="text-lg font-bold text-primary">
            H
          </Link>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded p-1 text-text-muted hover:bg-surface hover:text-text"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                  : 'text-text-muted hover:bg-surface hover:text-text',
                !sidebarOpen && 'justify-center px-2'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/notifications"
          className={cn(
            'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface hover:text-text',
            !sidebarOpen && 'justify-center px-2'
          )}
        >
          <Bell className="h-5 w-5" />
          {sidebarOpen && <span className="ml-3">Notifications</span>}
        </Link>
        {user?.role === 'super_admin' && (
          <Link
            href="/roles-permissions"
            className={cn(
              'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface hover:text-text',
              !sidebarOpen && 'justify-center px-2'
            )}
          >
            <ShieldCheck className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Roles</span>}
          </Link>
        )}
      </div>
    </aside>
  );
});
