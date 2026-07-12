'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { PublicLayout } from '@/components/layout/PublicLayout';
import api from '@/lib/api';
import { Category } from '@/types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-6 text-4xl font-bold text-neutral-900 sm:text-5xl">
            Categories
          </h1>
          <p className="text-lg text-neutral-600">
            Explore our wide range of categories and find the perfect course for you.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function CategoriesGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data);
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Section padding="lg">
      <Container>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 p-6">
                <Skeleton className="mb-4 h-12 w-12 rounded-xl" />
                <Skeleton className="mb-2 h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/courses?category=${category._id}`}>
                  <Card hover className="group h-full">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 transition-colors group-hover:bg-primary-200">
                      <BookOpen className="h-7 w-7 text-primary-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-neutral-900 group-hover:text-primary-600">
                      {category.name}
                    </h3>
                    <p className="mb-4 text-neutral-600">
                      {category.description || 'Explore courses in this category'}
                    </p>
                    <p className="text-sm text-primary-600">
                      {category.courseCount} course{category.courseCount !== 1 ? 's' : ''} →
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-neutral-500">
            No categories available yet.
          </div>
        )}
      </Container>
    </Section>
  );
}

export default function CategoriesPage() {
  return (
    <PublicLayout>
      <HeroSection />
      <CategoriesGrid />
    </PublicLayout>
  );
}
