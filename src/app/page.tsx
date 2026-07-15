'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Search,
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight,
  Mail,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Course, Category } from '@/types';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-24 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/70" />
      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-6">
              Over 10,000+ courses available
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
          >
            Learning that gets you{' '}
            <span className="text-primary-600">results</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-lg text-neutral-600"
          >
            Skills for your present and your future. Get started with us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-8 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-white py-4 pl-12 pr-4 text-neutral-900 shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success-500" />
              <span>Expert instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success-500" />
              <span>Certificate of completion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success-500" />
              <span>Lifetime access</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { label: 'Active Students', value: '50,000+', icon: Users },
    { label: 'Total Courses', value: '10,000+', icon: BookOpen },
    { label: 'Expert Instructors', value: '500+', icon: Award },
    { label: 'Course Hours', value: '100,000+', icon: Clock },
  ];

  return (
    <Section padding="lg" className="bg-white">
      <Container>
        <AnimatedSection>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                  <stat.icon className="h-7 w-7 text-primary-600" />
                </div>
                <div className="mb-1 text-3xl font-bold text-neutral-900">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}

function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data.slice(0, 8));
      } catch {
        setCategories([
          { _id: '1', name: 'Development', slug: 'development', courseCount: 1250, featured: false, active: true, createdAt: '' },
          { _id: '2', name: 'Business', slug: 'business', courseCount: 890, featured: false, active: true, createdAt: '' },
          { _id: '3', name: 'Design', slug: 'design', courseCount: 650, featured: false, active: true, createdAt: '' },
          { _id: '4', name: 'Marketing', slug: 'marketing', courseCount: 420, featured: false, active: true, createdAt: '' },
        ]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Section padding="lg" className="bg-neutral-50">
      <Container>
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Top Categories
            </h2>
            <p className="text-neutral-600">
              Explore our most popular learning categories
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {categories.map((category, index) => (
            <motion.div key={category._id} variants={fadeInUp}>
              <Link href={`/courses?category=${category.slug}`}>
                <Card hover className="group text-center cursor-pointer">
                  <div className={cn(
                    "mb-4 flex h-16 w-16 items-center justify-center rounded-xl mx-auto transition-transform group-hover:scale-110",
                    index % 2 === 0 ? "bg-primary-100" : "bg-emerald-100"
                  )}>
                    <BookOpen className={cn(
                      "h-8 w-8",
                      index % 2 === 0 ? "text-primary-600" : "text-emerald-600"
                    )} />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    {category.courseCount} courses
                  </p>
                  <ChevronRight className="mx-auto mt-3 h-4 w-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

function FeaturedCoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses?limit=8&sort=-rating');
        setCourses(response.data.data);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Section padding="lg" className="bg-white">
      <Container>
        <AnimatedSection>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">
                Featured Courses
              </h2>
              <p className="text-neutral-600">
                Handpicked courses to accelerate your career
              </p>
            </div>
            <Link href="/courses" className="hidden md:block">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 p-4">
                <Skeleton className="mb-4 h-40 w-full rounded-lg" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {courses.map((course) => (
              <motion.div key={course._id} variants={fadeInUp}>
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
                    </div>
                    <h3 className="mb-2 line-clamp-2 font-semibold text-neutral-900 group-hover:text-primary-600">
                      {course.title}
                    </h3>
                    <p className="mb-2 text-sm text-neutral-500">
                      {course.instructor?.fullName || 'Unknown Instructor'}
                    </p>
                    <div className="mb-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning-500 text-warning-500" />
                      <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                      <span className="text-sm text-neutral-400">({course.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-neutral-900">
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
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-12 text-center text-neutral-500">
            No courses available yet.
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/courses">
            <Button variant="outline">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

function WhyLearnSection() {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with real-world experience.',
    },
    {
      icon: Clock,
      title: 'Learn at Your Pace',
      description: 'Access courses anytime, anywhere. Learn on your own schedule.',
    },
    {
      icon: Award,
      title: 'Earn Certificates',
      description: 'Get certified and showcase your skills to employers.',
    },
    {
      icon: Users,
      title: 'Join Community',
      description: 'Connect with fellow learners and grow together.',
    },
  ];

  return (
    <Section padding="lg" className="bg-neutral-50">
      <Container>
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Why Learn With Us
            </h2>
            <p className="text-neutral-600">
              Everything you need to advance your career
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card hover className="h-full text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                  <feature.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      content: 'This platform transformed my career. The courses are comprehensive and the instructors are amazing.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      content: 'I learned more here than in my entire college education. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      content: 'The quality of courses here is unmatched. Every course is worth the investment.',
      rating: 5,
    },
  ];

  return (
    <Section padding="lg" className="bg-white">
      <Container>
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              What Our Students Say
            </h2>
            <p className="text-neutral-600">
              Join thousands of satisfied learners
            </p>
          </div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} variants={fadeInUp}>
              <Card hover className="h-full">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning-500 text-warning-500" />
                  ))}
                </div>
                <p className="mb-6 text-neutral-600">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                    <span className="text-sm font-medium text-primary-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

function CTASection() {
  return (
    <Section padding="lg" className="bg-primary-600">
      <Container>
        <AnimatedSection>
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Start Learning?
            </h2>
            <p className="mb-8 text-lg text-primary-100">
              Join over 50,000 students and start your learning journey today.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/courses">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                  Explore Courses
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-700">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <Section padding="lg" className="bg-neutral-50">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Stay Updated
            </h2>
            <p className="mb-8 text-neutral-600">
              Subscribe to our newsletter for the latest courses and learning tips.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" loading={isSubmitting}>
                Subscribe
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <WhyLearnSection />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </PublicLayout>
  );
}
