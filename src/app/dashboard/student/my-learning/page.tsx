'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Play, BookOpen } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { Enrollment } from '@/types';
import { cn } from '@/lib/utils';

function MyLearningContent() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEnrollments();
  }, [currentPage]);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/enrollments/my-courses');
      setEnrollments(response.data.data || []);
      setTotalPages(1);
    } catch {
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) =>
    enrollment.course?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            My Learning
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Track your enrolled courses and progress
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-4 focus:border-primary-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700">
                <Skeleton className="mb-4 h-32 w-full rounded-lg" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
              <h3 className="mb-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                No courses found
              </h3>
              <p className="mb-4 text-neutral-500 dark:text-neutral-400">
                {search ? 'No courses match your search' : 'You haven\'t enrolled in any courses yet'}
              </p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEnrollments.map((enrollment, index) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card hover className="h-full">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img
                        src={enrollment.course?.thumbnail || ''}
                        alt={enrollment.course?.title || ''}
                        className="h-40 w-full object-cover"
                      />
                      {enrollment.completed && (
                        <Badge variant="success" className="absolute right-2 top-2">
                          Completed
                        </Badge>
                      )}
                    </div>

                    <h3 className="mb-2 line-clamp-2 font-semibold text-neutral-900 dark:text-neutral-100">
                      {enrollment.course?.title}
                    </h3>

                    <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                      {enrollment.course?.instructor?.fullName}
                    </p>

                    <div className="mb-4">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-neutral-500 dark:text-neutral-400">Progress</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                          {Math.round(enrollment.progress || 0)}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700">
                        <div
                          className="h-2 rounded-full bg-primary-600 transition-all"
                          style={{ width: `${enrollment.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    <Link href={`/courses/${enrollment.course?.slug}`}>
                      <Button className="w-full" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        {enrollment.completed ? 'Review Course' : 'Continue Learning'}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function MyLearningPage() {
  return (
    <AuthGuard requiredRole="student">
      <MyLearningContent />
    </AuthGuard>
  );
}
