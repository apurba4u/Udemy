'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Shield } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/20">
            <Shield className="h-10 w-10 text-error-500" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-bold text-neutral-900">
          401
        </h1>
        <p className="mb-2 text-xl font-semibold text-neutral-900">
          Unauthorized Access
        </p>
        <p className="mb-8 text-neutral-600">
          You need to be logged in to access this page.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/auth/login">
            <Button>Log in</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
