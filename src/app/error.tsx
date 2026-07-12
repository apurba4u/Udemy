'use client';

import { Button } from '@/components/ui/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-neutral-900">
          500
        </h1>
        <p className="mb-8 text-xl text-neutral-600">
          Something went wrong
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
