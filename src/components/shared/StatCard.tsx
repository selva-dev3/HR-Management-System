import React from 'react';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon: Icon, className }: StatCardProps): React.ReactElement {
  const changeColor = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-text-muted',
  };

  return (
    <div className={cn('rounded-xl border border-border bg-surface p-5 shadow-card', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="mt-2 text-3xl font-bold text-text">{value}</p>
          {change && <p className={cn('mt-1 text-xs font-medium', changeColor[changeType])}>{change}</p>}
        </div>
        <div className="rounded-lg bg-primary-50 p-3 text-primary dark:bg-primary-900/40 dark:text-primary-300">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
