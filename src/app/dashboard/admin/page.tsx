'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Star,
  Plus,
  BarChart3,
  Tag,
  CreditCard,
  FileText,
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
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminStatsCard from '@/components/admin/AdminStatsCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';

const chartData = [
  { name: 'Jan', revenue: 4000, enrollments: 240 },
  { name: 'Feb', revenue: 3000, enrollments: 139 },
  { name: 'Mar', revenue: 5000, enrollments: 980 },
  { name: 'Apr', revenue: 4500, enrollments: 390 },
  { name: 'May', revenue: 6000, enrollments: 480 },
  { name: 'Jun', revenue: 5500, enrollments: 380 },
];

function AdminDashboardContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setStats(response.data.data.stats);
    } catch {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <AdminPageHeader title="Dashboard" subtitle="Welcome back! Here's what's happening." />

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            trend="+12% from last month"
            trendUp={true}
            onClick={() => window.location.href = '/dashboard/admin/users'}
          />
          <AdminStatsCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={BookOpen}
            trend="+8% from last month"
            trendUp={true}
            onClick={() => window.location.href = '/dashboard/admin/courses'}
          />
          <AdminStatsCard
            title="Enrollments"
            value={stats.totalEnrollments}
            icon={TrendingUp}
            trend="+15% from last month"
            trendUp={true}
            onClick={() => window.location.href = '/dashboard/admin/analytics'}
          />
          <AdminStatsCard
            title="Pending Payments"
            value={stats.pendingPayments}
            icon={DollarSign}
            onClick={() => window.location.href = '/dashboard/admin/payments'}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#3a4ee8" strokeWidth={2} />
                    <Line type="monotone" dataKey="enrollments" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/admin/courses">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Course
                </Button>
              </Link>
              <Link href="/dashboard/admin/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/dashboard/admin/payments">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Payments
                </Button>
              </Link>
              <Link href="/dashboard/admin/analytics">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
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
