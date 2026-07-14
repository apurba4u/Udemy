'use client';

import { motion } from 'framer-motion';
import { Check, Trash2, Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';

interface NotificationDropdownProps {
  notifications: any[];
  loading: boolean;
  onMarkAsRead: (id: string) => void;
  onMarkAllRead: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function NotificationDropdown({
  notifications,
  loading,
  onMarkAsRead,
  onMarkAllRead,
  onDelete,
  onClose,
}: NotificationDropdownProps) {
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-neutral-200 bg-white shadow-lg z-50"
    >
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <h3 className="font-semibold text-neutral-900">Notifications</h3>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-neutral-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-neutral-300" />
            <p className="mt-2 text-sm text-neutral-500">No notifications</p>
          </div>
        ) : (
          notifications.map((notification: any) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onDelete={onDelete}
              onClose={onClose}
            />
          ))
        )}
      </div>

      <div className="border-t border-neutral-200 px-4 py-2">
        <a
          href="/dashboard/student/notifications"
          className="block text-center text-sm text-primary-600 hover:text-primary-700"
          onClick={onClose}
        >
          View all notifications
        </a>
      </div>
    </motion.div>
  );
}
