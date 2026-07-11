'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Lock } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning-50 dark:bg-warning-500/20">
            <Lock className="h-10 w-10 text-warning-500" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-bold text-neutral-900 dark:text-neutral-100">
          403
        </h1>
        <p className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Access Forbidden
        </p>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          You don&apos;t have permission to access this page.
        </p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
