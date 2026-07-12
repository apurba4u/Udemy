'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  UserCheck,
  TrendingUp,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const chartData = [
  { name: 'Jan', users: 400, courses: 240 },
  { name: 'Feb', users: 300, courses: 139 },
  { name: 'Mar', users: 200, courses: 980 },
  { name: 'Apr', users: 278, courses: 390 },
  { name: 'May', users: 189, courses: 480 },
  { name: 'Jun', users: 239, courses: 380 },
];

function StatsCards() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    publishedCourses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data.data.stats);
      } catch {
        // Use default values
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, href: '/dashboard/admin/users', color: 'primary' },
    { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, href: '/dashboard/admin/courses', color: 'success' },
    { label: 'Published Courses', value: stats.publishedCourses, icon: UserCheck, href: '/dashboard/admin/courses', color: 'warning' },
    { label: 'Total Enrollments', value: stats.totalEnrollments, icon: TrendingUp, href: '/dashboard/admin/analytics', color: 'primary' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={stat.href}>
            <Card hover className="cursor-pointer">
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                    <stat.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-400" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function ChartSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#9333ea"
                strokeWidth={2}
                dot={{ fill: '#9333ea' }}
                name="Users"
              />
              <Line
                type="monotone"
                dataKey="courses"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
                name="Courses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  const activities = [
    { id: 1, type: 'user', message: 'New user registered: John Doe', time: '5 min ago' },
    { id: 2, type: 'course', message: 'Course published: React Mastery', time: '1 hour ago' },
    { id: 3, type: 'enrollment', message: 'New enrollment: Jane Smith enrolled in Node.js', time: '2 hours ago' },
    { id: 4, type: 'user', message: 'User role updated: Mike Johnson to Instructor', time: '3 hours ago' },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Link href="/dashboard/admin/analytics" className="text-sm text-primary-600 hover:text-primary-700">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100">
                <Clock className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-900">
                  {activity.message}
                </p>
                <p className="text-xs text-neutral-500">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  const actions = [
    { label: 'Add User', href: '/dashboard/admin/users', icon: Users },
    { label: 'Add Course', href: '/dashboard/admin/courses', icon: BookOpen },
    { label: 'View Analytics', href: '/dashboard/admin/analytics', icon: TrendingUp },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
            >
              <action.icon className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-neutral-900">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AdminDashboardContent() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Admin Dashboard
          </h1>
          <p className="text-neutral-500">
            Welcome back! Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>

        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartSection />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>

        <QuickActions />
      </div>
    </AdminLayout>
  );
}

export default function AdminDashboardPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminDashboardContent />
    </AuthGuard>
  );
}
