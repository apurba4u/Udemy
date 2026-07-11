'use client';

import { motion } from 'framer-motion';
import { Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PublicLayout } from '@/components/layout/PublicLayout';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const blogPosts = [
  {
    id: 1,
    title: 'How to Start Learning Programming in 2024',
    excerpt: 'A comprehensive guide for beginners who want to start their programming journey.',
    date: 'January 15, 2024',
    readTime: '5 min read',
    category: 'Programming',
    image: '/blog-1.jpg',
  },
  {
    id: 2,
    title: 'Top 10 Skills to Learn for Career Growth',
    excerpt: 'Discover the most in-demand skills that can help you advance in your career.',
    date: 'January 12, 2024',
    readTime: '7 min read',
    category: 'Career',
    image: '/blog-2.jpg',
  },
  {
    id: 3,
    title: 'The Future of Online Learning',
    excerpt: 'Explore how online education is evolving and what it means for learners.',
    date: 'January 10, 2024',
    readTime: '4 min read',
    category: 'Education',
    image: '/blog-3.jpg',
  },
  {
    id: 4,
    title: 'Mastering Web Development: A Complete Guide',
    excerpt: 'Everything you need to know about becoming a web developer in 2024.',
    date: 'January 8, 2024',
    readTime: '10 min read',
    category: 'Web Development',
    image: '/blog-4.jpg',
  },
  {
    id: 5,
    title: 'Effective Study Tips for Online Learners',
    excerpt: 'Proven strategies to stay focused and motivated while learning online.',
    date: 'January 5, 2024',
    readTime: '6 min read',
    category: 'Learning Tips',
    image: '/blog-5.jpg',
  },
  {
    id: 6,
    title: 'Building a Portfolio That Gets You Hired',
    excerpt: 'Learn how to create an impressive portfolio that showcases your skills.',
    date: 'January 3, 2024',
    readTime: '8 min read',
    category: 'Career',
    image: '/blog-6.jpg',
  },
];

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20 dark:from-primary-950/20 dark:to-neutral-950">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="mb-6 text-4xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            Our Blog
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Stay updated with the latest trends and tips in online learning.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function BlogGrid() {
  return (
    <Section padding="lg">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="group h-full">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <div className="h-48 bg-neutral-200 dark:bg-neutral-700" />
                  <Badge variant="primary" className="absolute left-2 top-2">
                    {post.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <span>{post.date}</span>
                </div>

                <h3 className="mb-2 mt-4 line-clamp-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-neutral-600 dark:text-neutral-400">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function BlogPage() {
  return (
    <PublicLayout>
      <HeroSection />
      <BlogGrid />
    </PublicLayout>
  );
}
