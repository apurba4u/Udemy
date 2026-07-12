'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { Enrollment } from '@/types';

function ContinueLearningContent() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await api.get('/enrollments/my-courses');
        const data = response.data.data || [];
        setEnrollments(data.filter((e: Enrollment) => e.completed === false));
      } catch {
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const mostRecent = enrollments[0];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Continue Learning
          </h1>
          <p className="text-neutral-500">
            Pick up where you left off
          </p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-64" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </div>
        ) : enrollments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Play className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
              <h3 className="mb-2 text-lg font-medium text-neutral-900">
                No courses in progress
              </h3>
              <p className="mb-4 text-neutral-500">
                Start learning by enrolling in a course
              </p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {mostRecent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardContent>
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="relative w-full md:w-80">
                        <img
                          src={mostRecent.course?.thumbnail || ''}
                          alt={mostRecent.course?.title || ''}
                          className="h-48 w-full rounded-xl object-cover md:h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                            <Play className="h-8 w-8 text-primary-600 ml-1" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <Badge variant="primary" className="mb-2">
                          Most Recent
                        </Badge>
                        <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                          {mostRecent.course?.title}
                        </h2>
                        <p className="mb-4 text-neutral-500">
                          {mostRecent.course?.instructor?.fullName}
                        </p>

                        <div className="mb-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm text-neutral-500">
                              Progress
                            </span>
                            <span className="text-sm font-medium text-neutral-900">
                              {Math.round(mostRecent.progress || 0)}%
                            </span>
                          </div>
                          <div className="h-3 w-full rounded-full bg-neutral-200">
                            <div
                              className="h-3 rounded-full bg-primary-600 transition-all"
                              style={{ width: `${mostRecent.progress || 0}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Last accessed: Recently</span>
                          </div>
                        </div>

                        <Link href={`/courses/${mostRecent.course?.slug}`} className="mt-4 inline-block">
                          <Button>
                            Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {enrollments.length > 1 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-neutral-900">
                  Other Courses in Progress
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {enrollments.slice(1).map((enrollment, index) => (
                    <motion.div
                      key={enrollment._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card hover>
                        <div className="flex gap-4">
                          <img
                            src={enrollment.course?.thumbnail || ''}
                            alt={enrollment.course?.title || ''}
                            className="h-20 w-24 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="truncate font-medium text-neutral-900">
                              {enrollment.course?.title}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {enrollment.course?.instructor?.fullName}
                            </p>
                            <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-200">
                              <div
                                className="h-1.5 rounded-full bg-primary-600"
                                style={{ width: `${enrollment.progress || 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function ContinueLearningPage() {
  return (
    <AuthGuard requiredRole="student">
      <ContinueLearningContent />
    </AuthGuard>
  );
}
