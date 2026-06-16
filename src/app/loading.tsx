import React from 'react';
import { Spinner } from '@/components/ui/Spinner';

export default function Loading(): React.ReactElement {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
