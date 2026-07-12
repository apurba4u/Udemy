'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  CheckCircle,
  XCircle,
  Star,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, Column } from '@/components/ui/DataTable';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { Course } from '@/types';

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [currentPage, sortField, sortOrder]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      if (search) params.append('search', search);
      params.append('sort', sortOrder === 'desc' ? `-${sortField}` : sortField);

      const response = await api.get(`/courses/all?${params.toString()}`);
      setCourses(response.data.data);
      setTotalPages(response.data.pagination?.pages || 1);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (courseId: string, published: boolean) => {
    try {
      await api.put(`/courses/${courseId}/${published ? 'unpublish' : 'publish'}`);
      toast.success(`Course ${published ? 'unpublished' : 'published'} successfully`);
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
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch {
      toast.error('Failed to delete course');
    }
    setShowActions(null);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses();
  };

  const columns: Column<Course>[] = [
    {
      key: 'title',
      label: 'Course',
      render: (course) => (
        <div className="flex items-center gap-3">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-12 w-16 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-neutral-900">
              {course.title}
            </p>
            <p className="text-sm text-neutral-500">
              {course.instructor?.fullName || 'Unknown'}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (course) => (
        <Badge variant="outline">{course.category?.name || 'N/A'}</Badge>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (course) => (
        <span className="font-medium text-neutral-900">
          ${course.price}
        </span>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (course) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
          <span>{course.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      key: 'enrolledStudents',
      label: 'Students',
      sortable: true,
      render: (course) => (
        <span>{course.enrolledStudents}</span>
      ),
    },
    {
      key: 'published',
      label: 'Status',
      render: (course) => (
        <Badge variant={course.published ? 'success' : 'warning'}>
          {course.published ? 'Published' : 'Draft'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (course) => (
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(showActions === course._id ? null : course._id);
            }}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showActions === course._id && (
            <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
              <Link
                href={`/courses/${course.slug}`}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                <Eye className="h-4 w-4" />
                View Course
              </Link>
              <button
                onClick={() => handleTogglePublish(course._id, course.published)}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                {course.published ? (
                  <>
                    <XCircle className="h-4 w-4" />
                    Unpublish
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Publish
                  </>
                )}
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Course Management
          </h1>
          <p className="text-neutral-500">
            Manage all courses on the platform
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-4 focus:border-primary-500 focus:outline-none dark:border-neutral-600 sm:w-64"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        <DataTable
          columns={columns}
          data={courses}
          loading={loading}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          emptyMessage="No courses found"
          emptyIcon={<BookOpen className="h-12 w-12 text-neutral-300" />}
        />
      </div>
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
