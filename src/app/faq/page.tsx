'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Simply browse our courses, find one you like, and click the "Enroll Now" button. If the course is paid, you\'ll be redirected to the checkout page. Once enrolled, you can start learning immediately.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, we offer a 30-day money-back guarantee on all courses. If you\'re not satisfied with a course, you can request a refund within 30 days of purchase.',
  },
  {
    question: 'How do I access my courses?',
    answer: 'After enrolling in a course, you can access it from your dashboard. Simply log in and navigate to "My Courses" to see all your enrolled courses.',
  },
  {
    question: 'Are the courses self-paced?',
    answer: 'Yes, all our courses are self-paced. You can learn at your own speed, anytime, anywhere. There are no deadlines or time limits.',
  },
  {
    question: 'Do I get a certificate?',
    answer: 'Yes, you\'ll receive a certificate of completion after finishing all the lessons in a course. You can download it from your dashboard.',
  },
  {
    question: 'Can I download course materials?',
    answer: 'Some courses offer downloadable resources like PDFs, code files, and templates. This depends on the instructor\'s settings.',
  },
  {
    question: 'How do I become an instructor?',
    answer: 'Currently, instructor registration is by invitation only. If you\'re interested in teaching, please contact us through the contact page.',
  },
  {
    question: 'Is there a mobile app?',
    answer: 'Our platform is fully responsive and works great on mobile devices. You can access all features through your mobile browser.',
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
          <h1 className="mb-6 text-4xl font-bold text-neutral-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-600">
            Find answers to common questions about our platform.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-neutral-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="pr-4 text-lg font-medium text-neutral-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-neutral-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ContactCTA() {
  return (
    <Section padding="lg" className="bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-2xl font-bold text-neutral-900">
            Still have questions?
          </h2>
          <p className="mb-6 text-neutral-600">
            We&apos;re here to help. Contact our support team.
          </p>
          <a href="/contact">
            <button className="rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700">
              Contact Us
            </button>
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}

export default function FAQPage() {
  return (
    <PublicLayout>
      <HeroSection />
      <FAQAccordion />
      <ContactCTA />
    </PublicLayout>
  );
}
