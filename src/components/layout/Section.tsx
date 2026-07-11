'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Section({ children, className, padding = 'lg' }: SectionProps) {
  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  };

  return (
    <section className={cn(paddings[padding], className)}>
      {children}
    </section>
  );
}
