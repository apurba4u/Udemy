'use client';

import { ReactNode } from 'react';
import { FileX, Search, BookOpen, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
        {icon || <FileX className="h-8 w-8 text-neutral-400" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-neutral-900">
        {title}
      </h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-neutral-500">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

export function NoCoursesEmptyState() {
  return (
    <EmptyState
      icon={<BookOpen className="h-8 w-8 text-neutral-400" />}
      title="No courses found"
      description="There are no courses available at the moment. Check back later!"
    />
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8 text-neutral-400" />}
      title="No results found"
      description={`No results found for "${query}". Try different keywords.`}
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<Bell className="h-8 w-8 text-neutral-400" />}
      title="No notifications"
      description="You're all caught up! No new notifications."
    />
  );
}
