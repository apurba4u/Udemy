'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { PublicLayout } from '@/components/layout/PublicLayout';
import api from '@/lib/api';
import { Course, Category } from '@/types';
import { cn } from '@/lib/utils';

const levels = ['beginner', 'intermediate', 'advanced'];
const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: '-rating', label: 'Highest Rated' },
  { value: '-enrolledStudents', label: 'Most Popular' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
];

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-12 dark:from-primary-950/20 dark:to-neutral-950">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Explore Courses
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Discover courses to advance your career
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card hover className="group h-full">
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-40 w-full object-cover transition-transform group-hover:scale-105"
          />
          {course.discountPrice && (
            <Badge variant="error" className="absolute left-2 top-2">
              Sale
            </Badge>
          )}
          <Badge variant="default" className="absolute right-2 top-2">
            {course.level}
          </Badge>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline">{course.category?.name || 'Uncategorized'}</Badge>
        </div>

        <h3 className="mb-2 line-clamp-2 font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600">
          {course.title}
        </h3>

        <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
          {course.instructor?.fullName || 'Unknown Instructor'}
        </p>

        <div className="mb-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
          <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
          <span className="text-sm text-neutral-400">({course.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            ${course.discountPrice || course.price}
          </span>
          {course.discountPrice && (
            <span className="text-sm text-neutral-400 line-through">
              ${course.price}
            </span>
          )}
        </div>
      </Card>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700">
      <Skeleton className="mb-4 h-40 w-full rounded-lg" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-2 h-4 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSort, setSelectedSort] = useState('-createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedLevel, selectedSort, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch {
      setCategories([]);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedLevel) params.append('level', selectedLevel);
      if (selectedSort) params.append('sort', selectedSort);
      params.append('page', currentPage.toString());
      params.append('limit', '12');

      const response = await api.get(`/courses?${params.toString()}`);
      setCourses(response.data.data);
      setTotalPages(response.data.pagination?.pages || 1);
    } catch {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses();
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedSort('-createdAt');
    setCurrentPage(1);
  };

  const hasActiveFilters = search || selectedCategory || selectedLevel;

  return (
    <PublicLayout>
      <HeroSection />

      <Section padding="lg">
        <Container>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-4 focus:border-primary-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Active filters:</span>
              {search && (
                <Badge variant="primary" className="gap-1">
                  Search: {search}
                  <button onClick={() => setSearch('')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="primary" className="gap-1">
                  Category: {categories.find(c => c._id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedLevel && (
                <Badge variant="primary" className="gap-1">
                  Level: {selectedLevel}
                  <button onClick={() => setSelectedLevel('')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-8">
            <aside className={cn(
              'w-full shrink-0 lg:block lg:w-64',
              showFilters ? 'block' : 'hidden'
            )}>
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setCurrentPage(1);
                      }}
                      className={cn(
                        'block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        !selectedCategory
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                      )}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => {
                          setSelectedCategory(category._id);
                          setCurrentPage(1);
                        }}
                        className={cn(
                          'block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                          selectedCategory === category._id
                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                        )}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
                    Level
                  </h3>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setSelectedLevel(level === selectedLevel ? '' : level);
                          setCurrentPage(1);
                        }}
                        className={cn(
                          'block w-full rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors',
                          selectedLevel === level
                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : courses.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="mb-4 text-lg text-neutral-600 dark:text-neutral-400">
                    No courses found
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                      <CourseCard key={course._id} course={course} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'primary' : 'outline'}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </PublicLayout>
  );
}
