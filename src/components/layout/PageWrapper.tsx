'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-neutral-950', className)}>
      {children}
    </div>
  );
}
