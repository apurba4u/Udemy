'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Bell, LogOut, BookOpen, LayoutDashboard, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from './Avatar';

interface ProfileDropdownProps {
  className?: string;
}

export default function ProfileDropdown({ className }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const studentLinks = [
    { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/student/my-learning', label: 'My Learning', icon: BookOpen },
    { href: '/dashboard/student/profile', label: 'Profile', icon: User },
    { href: '/dashboard/student/settings', label: 'Settings', icon: Settings },
    { href: '/notifications', label: 'Notifications', icon: Bell },
  ];

  const adminLinks = [
    { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/admin/users', label: 'Users', icon: Users },
    { href: '/dashboard/admin/payments', label: 'Payments', icon: Settings },
    { href: '/dashboard/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/dashboard/admin/analytics', label: 'Analytics', icon: Settings },
    { href: '/notifications', label: 'Notifications', icon: Bell },
  ];

  const links = user.role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-neutral-100"
      >
        <Avatar src={user.avatar} alt={user.fullName} size="sm" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg z-50"
          >
            <div className="border-b border-neutral-100 px-3 py-2 mb-1">
              <p className="font-medium text-neutral-900">{user.fullName}</p>
              <p className="text-sm text-neutral-500">{user.email}</p>
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
