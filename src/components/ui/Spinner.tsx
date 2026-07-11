'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Loader2
      className={cn('animate-spin text-primary-600', sizes[size], className)}
    />
  );
}

export function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          Loading...
        </p>
      </div>
    </div>
  );
}

export function InlineLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Spinner size="sm" />
      <span className="text-sm text-neutral-500 dark:text-neutral-400">{text}</span>
    </div>
  );
}
