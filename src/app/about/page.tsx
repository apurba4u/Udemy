'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, BookOpen, Award } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { PublicLayout } from '@/components/layout/PublicLayout';

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
            About Us
          </h1>
          <p className="text-lg text-neutral-600">
            Empowering learners worldwide with quality education
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <Section padding="lg">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div {...fadeInUp}>
            <Card className="h-full">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                <Target className="h-7 w-7 text-primary-600" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                Our Mission
              </h2>
              <p className="text-neutral-600">
                We believe that everyone should have access to quality education. Our platform
                connects learners with expert instructors from around the world, making learning
                accessible, affordable, and engaging.
              </p>
            </Card>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <Card className="h-full">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                <Eye className="h-7 w-7 text-primary-600" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                Our Vision
              </h2>
              <p className="text-neutral-600">
                To become the world&apos;s leading learning platform, empowering millions of
                learners to transform their lives through education.
              </p>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Learning',
      description: 'We are passionate about education and its power to transform lives.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive community of learners and educators.',
    },
    {
      icon: BookOpen,
      title: 'Quality Content',
      description: 'Ensuring every course meets our high standards of quality.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for excellence in everything we do.',
    },
  ];

  return (
    <Section padding="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-neutral-900">
            Our Values
          </h2>
          <p className="text-neutral-600">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                  <value.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-500">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function StatsSection() {
  const stats = [
    { label: 'Active Students', value: '50,000+' },
    { label: 'Expert Instructors', value: '500+' },
    { label: 'Courses Available', value: '10,000+' },
    { label: 'Countries Reached', value: '100+' },
  ];

  return (
    <Section padding="lg">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2 text-4xl font-bold text-primary-600">
                {stat.value}
              </div>
              <div className="text-neutral-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <PublicLayout>
      <HeroSection />
      <MissionVisionSection />
      <ValuesSection />
      <StatsSection />
    </PublicLayout>
  );
}
