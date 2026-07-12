'use client';

import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function ServerErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/20">
            <AlertTriangle className="h-10 w-10 text-error-500" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-bold text-neutral-900">
          500
        </h1>
        <p className="mb-2 text-xl font-semibold text-neutral-900">
          Server Error
        </p>
        <p className="mb-8 text-neutral-600">
          Something went wrong on our end. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
