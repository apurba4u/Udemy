'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import AuthGuard from '@/components/guards/AuthGuard';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center py-12"
        >
          <Card>
            <CardContent className="py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Payment Successful!
              </h1>
              <p className="mb-6 text-neutral-500 dark:text-neutral-400">
                Thank you for your purchase. You now have access to the course.
              </p>
              {sessionId && (
                <p className="mb-6 text-sm text-neutral-400">
                  Session ID: {sessionId}
                </p>
              )}
              <div className="flex flex-col gap-3">
                <Link href="/dashboard/student/my-learning">
                  <Button className="w-full">
                    Go to My Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="w-full">
                    Browse More Courses
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <AuthGuard requiredRole="student">
      <SuccessContent />
    </AuthGuard>
  );
}
