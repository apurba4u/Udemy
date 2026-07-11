'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <a href="/" className="text-2xl font-bold text-purple-600">Udemy Clone</a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/courses" className="text-gray-700 hover:text-gray-900">Courses</a>
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

      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="mb-8 text-gray-600">
          Find answers to common questions about our platform.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="border-t border-gray-200 px-4 py-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
          >
            Contact Us
          </a>
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
