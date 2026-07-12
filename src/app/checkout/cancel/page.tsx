'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center py-12"
        >
          <Card>
            <CardContent className="py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-neutral-900">
                Payment Cancelled
              </h1>
              <p className="mb-6 text-neutral-500">
                Your payment was cancelled. No charges were made.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/courses">
                  <Button className="w-full">
                    Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Go to Homepage
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
