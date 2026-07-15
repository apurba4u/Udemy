'use client';

import { ReactNode } from 'react';
import PageBackButton from '@/components/ui/PageBackButton';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
}

export default function AdminPageHeader({ title, subtitle, backTo, backLabel, actions }: AdminPageHeaderProps) {
  return (
    <div className="mb-6">
      {backTo && (
        <div className="mb-4">
          <PageBackButton fallback={backTo} label={backLabel || 'Back'} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
          {subtitle && <p className="text-neutral-500">{subtitle}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
}
