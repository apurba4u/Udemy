'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  CheckCircle,
  Globe,
  Award,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { PublicLayout } from '@/components/layout/PublicLayout';
import api from '@/lib/api';
import { Course } from '@/types';
import { cn } from '@/lib/utils';

function CourseHero({ course }: { course: Course }) {
  return (
    <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 py-12 text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="primary">{course.category?.name || 'Course'}</Badge>
                <Badge variant="default">{course.level}</Badge>
              </div>

              <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
                {course.title}
              </h1>

              {course.subtitle && (
                <p className="mb-4 text-lg text-neutral-300">
                  {course.subtitle}
                </p>
              )}

              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
                  <span className="font-medium">{course.rating.toFixed(1)}</span>
                  <span className="text-neutral-400">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolledStudents} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{Math.round(course.estimatedDuration / 60)} hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{course.language}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={course.instructor?.avatar || ''}
                  alt={course.instructor?.fullName || ''}
                  className="h-10 w-10 rounded-full bg-neutral-600"
                />
                <div>
                  <p className="font-medium">{course.instructor?.fullName}</p>
                  <p className="text-sm text-neutral-400">Instructor</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white text-neutral-900">
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full object-cover"
                />
                {course.promoVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                      <Play className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    ${course.discountPrice || course.price}
                  </span>
                  {course.discountPrice && (
                    <span className="text-lg text-neutral-400 line-through">
                      ${course.price}
                    </span>
                  )}
                </div>
                {course.discountPrice && (
                  <Badge variant="error">
                    {Math.round((1 - course.discountPrice / course.price) * 100)}% off
                  </Badge>
                )}
              </div>

              <Link href={`/checkout?courseId=${course._id}`}>
                <Button className="mb-4 w-full" size="lg">
                  Enroll Now
                </Button>
              </Link>

              <p className="mb-4 text-center text-sm text-neutral-500">
                30-day money-back guarantee
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neutral-500" />
                  <span>{Math.round(course.estimatedDuration / 60)} hours of content</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-neutral-500" />
                  <span>{course.requirements?.length || 0} requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-neutral-500" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function CourseContent({ course }: { course: Course }) {
  return (
    <Section padding="lg">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                About This Course
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                {course.description}
              </p>
            </motion.div>

            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  What You&apos;ll Learn
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
                      <span className="text-neutral-600 dark:text-neutral-400">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {course.requirements && course.requirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                      <span className="text-neutral-600 dark:text-neutral-400">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Instructor
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor?.avatar || ''}
                  alt={course.instructor?.fullName || ''}
                  className="h-16 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700"
                />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {course.instructor?.fullName}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Instructor
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CourseSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="bg-neutral-900 py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </Container>
      </div>
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function CourseDetailsPage() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/slug/${params.slug}`);
        setCourse(response.data.data);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchCourse();
    }
  }, [params.slug]);

  if (loading) {
    return <CourseSkeleton />;
  }

  if (!course) {
    return (
      <PublicLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Course not found
            </h1>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <CourseHero course={course} />
      <CourseContent course={course} />
    </PublicLayout>
  );
}
