import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps): React.ReactElement {
  return (
    <div className={cn('rounded-xl border border-border bg-surface shadow-card', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }): React.ReactElement {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }): React.ReactElement {
  return <h3 className={cn('text-lg font-semibold leading-none tracking-tight text-text', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }): React.ReactElement {
  return <p className={cn('text-sm text-text-muted', className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }): React.ReactElement {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }): React.ReactElement {
  return <div className={cn('flex items-center p-6 pt-0', className)}>{children}</div>;
}
