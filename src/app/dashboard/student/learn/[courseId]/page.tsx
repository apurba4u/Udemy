'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

interface Lesson {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration: number;
  order: number;
}

interface Section {
  _id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  _id: string;
  title: string;
  slug: string;
}

interface ProgressData {
  completedLessons: string[];
  progressPercentage: number;
}

function CoursePlayerContent() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchData();
  }, [params.courseId]);

  const fetchData = async () => {
    try {
      const [courseRes, sectionsRes, progressRes] = await Promise.all([
        api.get(`/courses/${params.courseId}`),
        api.get(`/learning/sections/${params.courseId}`),
        api.get(`/learning/progress/${params.courseId}`),
      ]);

      setCourse(courseRes.data.data);
      setSections(sectionsRes.data.data.sections || []);
      setProgress(progressRes.data.data);

      const completedLessons = progressRes.data.data.completedLessons || [];
      const allLessons = (sectionsRes.data.data.sections || []).flatMap((s: Section) => s.lessons);
      const firstUncompleted = allLessons.find((l: Lesson) => !completedLessons.includes(l._id));
      if (firstUncompleted) {
        setCurrentLesson(firstUncompleted);
      } else if (allLessons.length > 0) {
        setCurrentLesson(allLessons[0]);
      }
    } catch {
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!currentLesson) return;
    try {
      await api.put(`/learning/progress/${params.courseId}/lesson/${currentLesson._id}`);
      toast.success('Lesson marked as complete');

      const progressRes = await api.get(`/learning/progress/${params.courseId}`);
      setProgress(progressRes.data.data);

      const allLessons = sections.flatMap((s) => s.lessons);
      const currentIndex = allLessons.findIndex((l) => l._id === currentLesson._id);
      if (currentIndex < allLessons.length - 1) {
        setCurrentLesson(allLessons[currentIndex + 1]);
      }
    } catch {
      toast.error('Failed to mark lesson complete');
    }
  };

  const allLessons = sections.flatMap((s) => s.lessons);
  const currentIndex = currentLesson ? allLessons.findIndex((l) => l._id === currentLesson._id) : -1;

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentLesson(allLessons[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < allLessons.length - 1) setCurrentLesson(allLessons[currentIndex + 1]);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-12 text-center text-neutral-500">Loading course...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex gap-6">
        <aside className={cn("w-80 shrink-0", sidebarOpen ? "block" : "hidden lg:block")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Course Content</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[60vh] overflow-y-auto p-0">
              {sections.map((section) => (
                <div key={section._id} className="border-b border-neutral-200 last:border-0">
                  <div className="px-4 py-3 bg-neutral-50">
                    <p className="text-sm font-medium text-neutral-900">{section.title}</p>
                  </div>
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson._id}
                      onClick={() => setCurrentLesson(lesson)}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 hover:bg-neutral-50",
                        currentLesson?._id === lesson._id && "bg-primary-50 text-primary-700"
                      )}
                    >
                      <Play className="h-4 w-4 shrink-0" />
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1 space-y-6">
          {currentLesson ? (
            <>
              <Card>
                <div className="aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
                  {currentLesson.videoUrl ? (
                    <video
                      key={currentLesson._id}
                      controls
                      className="w-full h-full rounded-lg"
                      src={currentLesson.videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-center text-neutral-400">
                      <Play className="mx-auto h-12 w-12 mb-2" />
                      <p>Video preview not available</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900">{currentLesson.title}</h2>
                      <p className="text-sm text-neutral-500">{currentLesson.duration} minutes</p>
                    </div>
                    <Button onClick={handleMarkComplete}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handlePrev} disabled={currentIndex <= 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNext} disabled={currentIndex >= allLessons.length - 1}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-neutral-500">
                Select a lesson to begin
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}

export default function LearnPage() {
  return (
    <AuthGuard requiredRole="student">
      <CoursePlayerContent />
    </AuthGuard>
  );
}
