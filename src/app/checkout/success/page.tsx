'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId && orderId) {
      verifyPayment();
    } else {
      setVerifying(false);
    }
  }, [sessionId, orderId]);

  const verifyPayment = async () => {
    try {
      await api.post('/checkout/verify-stripe', {
        sessionId,
        orderId,
      });
      setVerified(true);
      toast.success('Payment verified! Enrollment activated.');
    } catch {
      toast.error('Payment verification failed');
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-600" />
          <p className="mt-4 text-neutral-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

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
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-neutral-900">
                {verified ? 'Payment Successful!' : 'Payment Received'}
              </h1>
              <p className="mb-6 text-neutral-500">
                {verified
                  ? 'Your enrollment has been activated. You can now access the course.'
                  : 'Thank you for your purchase. Your payment is being processed.'}
              </p>
              {sessionId && (
                <p className="mb-6 text-sm text-neutral-400">
                  Session: {sessionId.substring(0, 30)}...
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
