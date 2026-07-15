'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  BookOpen,
  Star,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminTableToolbar from '@/components/admin/AdminTableToolbar';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { Course } from '@/types';

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      const response = await api.get(`/courses/all?${params.toString()}`);
      setCourses(response.data.data || []);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (courseId: string, published: boolean) => {
    try {
      await api.put(`/courses/${courseId}/${published ? 'unpublish' : 'publish'}`);
      toast.success(`Course ${published ? 'unpublished' : 'published'}`);
      fetchCourses();
    } catch {
      toast.error('Failed to update course');
    }
    setShowActions(null);
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${courseId}`);
      toast.success('Course deleted');
      fetchCourses();
    } catch {
      toast.error('Failed to delete course');
    }
    setShowActions(null);
  };

  const handleDuplicate = async (courseId: string) => {
    try {
      await api.post(`/courses/${courseId}/duplicate`);
      toast.success('Course duplicated');
      fetchCourses();
    } catch {
      toast.error('Failed to duplicate course');
    }
    setShowActions(null);
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Course Management"
        subtitle="Manage all courses on the platform"
        backTo="/dashboard/admin"
        actions={
          <Link href="/dashboard/admin/courses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </Link>
        }
      />

      <AdminTableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search courses..."
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-neutral-200 p-4">
              <div className="mb-4 h-40 w-full animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
              <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-neutral-200" />
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-neutral-300" />
            <h3 className="mb-2 text-lg font-semibold text-neutral-900">No courses found</h3>
            <p className="mb-4 text-neutral-500">Get started by creating your first course</p>
            <Link href="/dashboard/admin/courses/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="h-full">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-40 w-full object-cover"
                  />
                  <Badge
                    variant={course.published ? 'success' : 'warning'}
                    className="absolute right-2 top-2"
                  >
                    {course.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>

                <h3 className="mb-2 line-clamp-2 font-semibold text-neutral-900">
                  {course.title}
                </h3>
                <p className="mb-2 text-sm text-neutral-500">
                  {course.instructor?.fullName || 'Unknown'}
                </p>

                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="outline">{course.category?.name || 'Uncategorized'}</Badge>
                  <Badge variant="default">{course.level}</Badge>
                </div>

                <div className="mb-4 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
                  <span className="text-sm font-medium">{course.rating?.toFixed(1) || '0.0'}</span>
                  <span className="text-sm text-neutral-400">({course.reviewCount || 0})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900">${course.price}</span>
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(showActions === course._id ? null : course._id)}
                      className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {showActions === course._id && (
                      <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          <Eye className="h-4 w-4" />
                          View Course
                        </Link>
                        <button
                          onClick={() => handlePublish(course._id, course.published)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          {course.published ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          {course.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleDuplicate(course._id)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          <Copy className="h-4 w-4" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default function CoursesPage() {
  return (
    <AuthGuard requiredRole="admin">
      <CoursesContent />
    </AuthGuard>
  );
}
