'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function AdminEmptyState({ icon: Icon, title, description, action }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <Icon className="h-8 w-8 text-neutral-400" />
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-neutral-900">{title}</h3>
      {description && <p className="mb-4 text-neutral-500">{description}</p>}
      {action}
    </div>
  );
}
