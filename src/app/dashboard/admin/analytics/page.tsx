'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { AdminLayout } from '@/components/layout/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';

const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 450 },
  { name: 'May', users: 600 },
  { name: 'Jun', users: 550 },
];

const courseGrowthData = [
  { name: 'Jan', courses: 20 },
  { name: 'Feb', courses: 35 },
  { name: 'Mar', courses: 45 },
  { name: 'Apr', courses: 55 },
  { name: 'May', courses: 70 },
  { name: 'Jun', courses: 85 },
];

const enrollmentData = [
  { name: 'Jan', enrollments: 120 },
  { name: 'Feb', enrollments: 180 },
  { name: 'Mar', enrollments: 250 },
  { name: 'Apr', enrollments: 310 },
  { name: 'May', enrollments: 400 },
  { name: 'Jun', enrollments: 480 },
];

const categoryDistribution = [
  { name: 'Development', value: 35 },
  { name: 'Business', value: 25 },
  { name: 'Design', value: 20 },
  { name: 'Marketing', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#9333ea', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];

function AnalyticsContent() {
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader
          title="Analytics"
          subtitle="Platform performance and insights"
          backTo="/dashboard/admin"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, change: '+12%' },
            { label: 'Total Courses', value: stats.totalCourses, icon: BookOpen, change: '+8%' },
            { label: 'Published Courses', value: stats.publishedCourses, icon: TrendingUp, change: '+5%' },
            { label: 'Total Enrollments', value: stats.totalEnrollments, icon: Clock, change: '+15%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-500">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-neutral-900">
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                      <stat.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-success-600">{stat.change} from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
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
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="courses" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="enrollments"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} (${((percent || 0) * 100).toFixed(0)}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AnalyticsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AnalyticsContent />
    </AuthGuard>
  );
}
