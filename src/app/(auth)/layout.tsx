import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-raised px-4 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
