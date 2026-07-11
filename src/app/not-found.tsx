'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-neutral-900 dark:text-neutral-100">
          404
        </h1>
        <p className="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
          Page not found
        </p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
