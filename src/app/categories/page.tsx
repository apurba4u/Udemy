'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import api from '@/lib/api';
import { Category } from '@/types';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultCategories: Category[] = [
    { _id: '1', name: 'Development', slug: 'development', description: 'Learn to code and build applications', courseCount: 0, createdAt: '' },
    { _id: '2', name: 'Business', slug: 'business', description: 'Business skills for career growth', courseCount: 0, createdAt: '' },
    { _id: '3', name: 'IT & Software', slug: 'it-software', description: 'IT certifications and skills', courseCount: 0, createdAt: '' },
    { _id: '4', name: 'Design', slug: 'design', description: 'Graphic design and UX/UI', courseCount: 0, createdAt: '' },
    { _id: '5', name: 'Marketing', slug: 'marketing', description: 'Digital marketing strategies', courseCount: 0, createdAt: '' },
    { _id: '6', name: 'Photography', slug: 'photography', description: 'Photography and video skills', courseCount: 0, createdAt: '' },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-purple-600">Udemy Clone</a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/courses" className="text-gray-700 hover:text-gray-900">Courses</a>
              <a href="/categories" className="text-gray-900 font-medium">Categories</a>
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

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Categories</h1>
        <p className="mb-8 text-gray-600">
          Explore our wide range of categories and find the perfect course for you.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse border border-gray-200 p-6">
                <div className="mb-4 h-12 w-12 bg-gray-200" />
                <div className="h-4 w-1/2 bg-gray-200" />
                <div className="mt-2 h-4 w-3/4 bg-gray-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayCategories.map((category) => (
              <a
                key={category._id || category.name}
                href={`/courses?category=${category._id || category.name.toLowerCase()}`}
                className="group border border-gray-200 p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-purple-100">
                  <BookOpen size={24} className="text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-purple-600">
                  {category.name}
                </h3>
                <p className="mb-4 text-gray-600">
                  {category.description || 'Explore courses in this category'}
                </p>
                <p className="text-sm text-gray-500">
                  {category.courseCount} course{category.courseCount !== 1 ? 's' : ''}
                </p>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p>&copy; 2024 Udemy Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
