'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { Category } from '@/types';

const courseSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.string().min(1, 'Language is required'),
  price: z.number().min(0, 'Price must be positive'),
  discountPrice: z.number().optional(),
  estimatedDuration: z.number().min(0),
  tags: z.string().optional(),
  learningOutcomes: z.string().optional(),
  requirements: z.string().optional(),
  thumbnail: z.string().min(1, 'Thumbnail URL is required'),
});

type CourseFormData = z.infer<typeof courseSchema>;

function NewCourseContent() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      level: 'beginner',
      language: 'English',
      price: 0,
      estimatedDuration: 0,
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch {
      setCategories([]);
    }
  };

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        thumbnail: data.thumbnail || 'https://placehold.co/800x450/e2e8f0/64748b?text=Course+Thumbnail',
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
        learningOutcomes: data.learningOutcomes ? data.learningOutcomes.split('\n').filter((l) => l.trim()) : [],
        requirements: data.requirements ? data.requirements.split('\n').filter((r) => r.trim()) : [],
      };
      await api.post('/courses', payload);
      toast.success('Course created successfully');
      router.push('/dashboard/admin/courses');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = categories.map((c) => ({ value: c._id, label: c.name }));

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Create New Course"
        subtitle="Add a new course to the platform"
        backTo="/dashboard/admin/courses"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Course Title" {...register('title')} error={errors.title?.message} />
            <Input label="Subtitle" {...register('subtitle')} placeholder="Optional subtitle" />
            <Textarea label="Description" {...register('description')} error={errors.description?.message} rows={4} placeholder="Describe what students will learn..." />
            <Input label="Thumbnail URL" {...register('thumbnail')} placeholder="https://example.com/image.jpg" error={errors.thumbnail?.message} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select label="Category" options={categoryOptions} {...register('category')} error={errors.category?.message} placeholder="Select category" />
              <Select label="Difficulty" {...register('level')} options={[
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
              ]} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input label="Language" {...register('language')} placeholder="English" />
              <Input label="Original Price ($)" type="number" {...register('price', { valueAsNumber: true })} />
              <Input label="Discount Price ($)" type="number" {...register('discountPrice', { valueAsNumber: true })} placeholder="Optional" />
            </div>
            <Input label="Duration (minutes)" type="number" {...register('estimatedDuration', { valueAsNumber: true })} placeholder="Total course duration in minutes" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea label="What students will learn" {...register('learningOutcomes')} rows={4} placeholder="Enter each outcome on a new line..." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea label="Prerequisites" {...register('requirements')} rows={3} placeholder="Enter each requirement on a new line..." />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <Input label="Tags" {...register('tags')} placeholder="react, javascript, frontend (comma separated)" />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/admin/courses">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" loading={loading}>
            Create Course
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}

export default function NewCoursePage() {
  return (
    <AuthGuard requiredRole="admin">
      <NewCourseContent />
    </AuthGuard>
  );
}
