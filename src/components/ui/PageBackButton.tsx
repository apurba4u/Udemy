'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PageBackButtonProps {
  fallback?: string;
  label?: string;
  className?: string;
}

export default function PageBackButton({ fallback = '/', label = 'Back', className }: PageBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={cn(
        'inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900',
        className
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
