'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  onClick?: () => void;
}

export default function AdminStatsCard({ title, value, icon: Icon, trend, trendUp, onClick }: AdminStatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">{value}</p>
          {trend && (
            <p className={`mt-1 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
          <Icon className="h-6 w-6 text-primary-600" />
        </div>
      </div>
    </div>
  );
}
