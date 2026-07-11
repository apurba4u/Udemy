'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
      primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
      success: 'bg-success-50 text-success-600 dark:bg-success-500/20 dark:text-success-500',
      warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/20 dark:text-warning-500',
      error: 'bg-error-50 text-error-600 dark:bg-error-500/20 dark:text-error-500',
      outline: 'border border-neutral-300 text-neutral-700 dark:border-neutral-600 dark:text-neutral-300',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
