'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  ArrowRight,
  Play,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { Enrollment } from '@/types';

function WelcomeCard() {
  const { user } = useAuth();

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Welcome back, {user?.fullName?.split(' ')[0]}! 👋
            </h1>
            <p className="mt-1 text-neutral-500">
              Continue your learning journey
            </p>
          </div>
          <Link href="/courses">
            <Button>
              Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCards() {
  const [stats, setStats] = useState({
    enrolled: 0,
    inProgress: 0,
    completed: 0,
    hours: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/enrollments/my-courses');
        const enrollments = response.data.data || [];

        setStats({
          enrolled: enrollments.length,
          inProgress: enrollments.filter((e: Enrollment) => e.completed === false).length,
          completed: enrollments.filter((e: Enrollment) => e.completed === true).length,
          hours: 0,
        });
      } catch {
        // Use default values
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Enrolled Courses', value: stats.enrolled, icon: BookOpen, color: 'primary' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'warning' },
    { label: 'Completed', value: stats.completed, icon: Award, color: 'success' },
    { label: 'Learning Hours', value: stats.hours, icon: TrendingUp, color: 'primary' },
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
          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function ContinueLearning() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.get('/enrollments/my-courses');
        setEnrollments((response.data.data || []).slice(0, 3));
      } catch {
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (enrollments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-neutral-500">
            <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No courses yet. Start learning today!</p>
            <Link href="/courses" className="mt-4 inline-block">
              <Button variant="outline" size="sm">
                Browse Courses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Continue Learning</CardTitle>
        <Link href="/dashboard/student/my-learning" className="text-sm text-primary-600 hover:text-primary-700">
          View All
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment._id}
            className="flex items-center gap-4 rounded-lg border border-neutral-200 p-3"
          >
            <img
              src={enrollment.course?.thumbnail || ''}
              alt={enrollment.course?.title || ''}
              className="h-16 w-24 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="truncate font-medium text-neutral-900">
                {enrollment.course?.title}
              </h4>
              <p className="text-sm text-neutral-500">
                {enrollment.course?.instructor?.fullName}
              </p>
              <div className="mt-2 h-2 w-full rounded-full bg-neutral-200">
                <div
                  className="h-2 rounded-full bg-primary-600"
                  style={{ width: `${enrollment.progress || 0}%` }}
                />
              </div>
            </div>
            <Link href={`/dashboard/student/continue-learning?course=${enrollment.course?._id}`}>
              <Button size="sm">
                <Play className="mr-1 h-4 w-4" />
                Continue
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-50">
              <Award className="h-4 w-4 text-success-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Account created
              </p>
              <p className="text-xs text-neutral-500">
                Welcome to Udemy Clone!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StudentDashboardContent() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard />
        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <ContinueLearning />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function StudentDashboardPage() {
  return (
    <AuthGuard requiredRole="student">
      <StudentDashboardContent />
    </AuthGuard>
  );
}
