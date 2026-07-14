'use client';

import { useRouter } from 'next/navigation';
import { Check, Trash2, CreditCard, Gift, Star, Bell } from 'lucide-react';

interface NotificationItemProps {
  notification: any;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const typeIcons: Record<string, any> = {
  payment: CreditCard,
  coupon: Gift,
  review: Star,
  system: Bell,
};

const typeColors: Record<string, string> = {
  payment: 'text-blue-500 bg-blue-50',
  coupon: 'text-green-500 bg-green-50',
  review: 'text-yellow-500 bg-yellow-50',
  system: 'text-purple-500 bg-purple-50',
};

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onClose,
}: NotificationItemProps) {
  const router = useRouter();
  const Icon = typeIcons[notification.type] || Bell;
  const colorClass = typeColors[notification.type] || 'text-gray-500 bg-gray-50';

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification._id);
    }
    if (notification.link) {
      router.push(notification.link);
    }
    onClose();
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 cursor-pointer',
        !notification.read && 'bg-primary-50'
      )}
      onClick={handleClick}
    >
      <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full', colorClass)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm', notification.read ? 'text-neutral-600' : 'font-medium text-neutral-900')}>
          {notification.title}
        </p>
        <p className="text-xs text-neutral-500 line-clamp-2">{notification.message}</p>
        <p className="mt-1 text-xs text-neutral-400">{getRelativeTime(notification.createdAt)}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notification._id);
        }}
        className="shrink-0 rounded p-1 text-neutral-400 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
