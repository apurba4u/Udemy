'use client';

import { ImgHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    };

    const initials = fallback || getInitials(alt);

    if (!src) {
      return (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-primary-100 font-medium text-primary-700',
            sizes[size],
            className
          )}
        >
          {initials}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn('rounded-full object-cover', sizes[size], className)}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
