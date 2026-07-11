'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Star, ChevronDown, ChevronUp } from 'lucide-react';
import api from '@/lib/api';
import { Course, Category } from '@/types';

const levels = ['beginner', 'intermediate', 'advanced'];
const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: '-rating', label: 'Highest Rated' },
  { value: '-enrolledStudents', label: 'Most Popular' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSort, setSelectedSort] = useState('-createdAt');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [selectedCategory, selectedLevel, selectedSort, minPrice, maxPrice, currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
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
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      params.append('page', currentPage.toString());
      params.append('limit', '12');

      const response = await api.get(`/courses?${params.toString()}`);
      setCourses(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
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
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-purple-600">Udemy Clone</a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/courses" className="text-gray-900 font-medium">Courses</a>
              <a href="/categories" className="text-gray-700 hover:text-gray-900">Categories</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-gray-700 hover:text-gray-900">Log in</a>
            <a href="/auth/register" className="bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
              Sign up
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Courses</h1>

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full border border-gray-300 py-3 pl-10 pr-4 focus:border-purple-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
            >
              Search
            </button>
          </form>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-3 hover:bg-gray-50 lg:hidden"
          >
            <Filter size={20} />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="flex gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} w-full lg:block lg:w-64`}>
            <div className="sticky top-4 space-y-6">
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Category</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 px-3 py-2 focus:border-purple-600 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={selectedLevel === level}
                        onChange={(e) => {
                          setSelectedLevel(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="mr-2"
                      />
                      <span className="capitalize text-gray-700">{level}</span>
                    </label>
                  ))}
                  {selectedLevel && (
                    <button
                      onClick={() => {
                        setSelectedLevel('');
                        setCurrentPage(1);
                      }}
                      className="text-sm text-purple-600 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Price</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 border border-gray-300 px-3 py-2 focus:border-purple-600 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 border border-gray-300 px-3 py-2 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full border border-gray-300 py-2 text-gray-700 hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {courses.length} course{courses.length !== 1 ? 's' : ''} found
              </p>
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 px-3 py-2 focus:border-purple-600 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200" />
                    <div className="space-y-3 p-4">
                      <div className="h-4 w-3/4 bg-gray-200" />
                      <div className="h-4 w-1/2 bg-gray-200" />
                      <div className="h-4 w-1/4 bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-600">No courses found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-purple-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <a
                      key={course._id}
                      href={`/courses/${course.slug}`}
                      className="group border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="aspect-video overflow-hidden bg-gray-200">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 group-hover:text-purple-600">
                          {course.title}
                        </h3>
                        <p className="mb-2 text-sm text-gray-600">
                          {course.instructor?.name || 'Unknown Instructor'}
                        </p>
                        <div className="mb-2 flex items-center gap-1">
                          <span className="font-semibold text-yellow-500">
                            {course.rating.toFixed(1)}
                          </span>
                          <Star size={14} className="fill-yellow-500 text-yellow-500" />
                          <span className="text-sm text-gray-500">
                            ({course.reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-gray-900">
                            ${course.discountPrice || course.price}
                          </p>
                          {course.discountPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ${course.price}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`border px-4 py-2 ${
                          currentPage === page
                            ? 'border-purple-600 bg-purple-600 text-white'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p>&copy; 2024 Udemy Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
