'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Smartphone,
  CheckCircle,
  ArrowLeft,
  Tag,
  Clock,
  Users,
  Award,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import AuthGuard from '@/components/guards/AuthGuard';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Course, PaymentGateway } from '@/types';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = searchParams.get('courseId');

  const [course, setCourse] = useState<Course | null>(null);
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string>('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');

  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchData();
    }
  }, [courseId]);

  const fetchData = async () => {
    try {
      const [courseRes, gatewaysRes] = await Promise.all([
        api.get(`/courses/${courseId}`),
        api.get('/payment-gateways'),
      ]);
      setCourse(courseRes.data.data);
      setFinalPrice(courseRes.data.data.discountPrice || courseRes.data.data.price);
      const enabledGateways = gatewaysRes.data.data.filter((g: PaymentGateway) => g.enabled);
      setGateways(enabledGateways);
      if (enabledGateways.length > 0) {
        setSelectedGateway(enabledGateways[0]._id);
      }
    } catch {
      toast.error('Failed to load checkout data');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const response = await api.post('/checkout/validate-coupon', {
        code: couponCode,
        courseId,
      });
      setAppliedCoupon(response.data.data.coupon);
      setDiscount(response.data.data.discount);
      setFinalPrice(response.data.data.finalPrice);
      toast.success('Coupon applied successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid coupon');
    }
  };

  const handleCheckout = async () => {
    if (!selectedGateway) {
      toast.error('Please select a payment method');
      return;
    }

    setSubmitting(true);
    try {
      const orderResponse = await api.post('/checkout/create-order', {
        courseId,
        couponCode: appliedCoupon?.code || undefined,
        gatewayId: selectedGateway,
      });

      const order = orderResponse.data.data.order;
      const gateway = orderResponse.data.data.gateway;
      const stripeUrl = orderResponse.data.data.stripeUrl;

      if (gateway?.type === 'stripe' && stripeUrl) {
        window.location.href = stripeUrl;
      } else {
        setStep('payment');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

  const handleManualPayment = async () => {
    if (!senderNumber || !transactionId) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/checkout/submit-payment', {
        orderId: courseId,
        senderNumber,
        transactionId,
        screenshot,
      });

      setStep('success');
      toast.success('Payment submitted successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit payment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-48 bg-neutral-200 rounded" />
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 h-96 bg-neutral-200 rounded-xl" />
                <div className="h-96 bg-neutral-200 rounded-xl" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <Container>
          <div className="text-center py-12">
            <p className="text-neutral-500">Course not found</p>
            <Link href="/courses">
              <Button className="mt-4">Browse Courses</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const selectedGatewayData = gateways.find(g => g._id === selectedGateway);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <Container>
        <div className="mb-6">
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900">
            <ArrowLeft className="h-4 w-4" />
            Back to course
          </Link>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-neutral-900">
          Checkout
        </h1>

        {step === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md text-center py-12"
          >
            <Card>
              <CardContent className="py-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-50 dark:bg-success-500/20">
                  <CheckCircle className="h-8 w-8 text-success-500" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                  Payment Submitted!
                </h2>
                <p className="mb-6 text-neutral-500">
                  Your payment is being verified. You will get access once approved.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/dashboard/student/my-learning">
                    <Button>Go to My Learning</Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline">Browse More Courses</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-24 w-32 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {course.title}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {course.instructor?.fullName}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm text-neutral-500">{Math.round(course.estimatedDuration / 60)} hours</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {step === 'payment' && selectedGatewayData?.type !== 'stripe' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Manual Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg bg-blue-50 p-4">
                        <p className="text-sm font-medium text-blue-800 mb-2">
                          {selectedGatewayData?.name === 'bKash' ? 'bKash Payment' : 'Nagad Payment'}
                        </p>
                        <p className="text-sm text-blue-800">
                          {selectedGatewayData?.instructions || 'Send money to the number below and upload the screenshot as payment proof.'}
                        </p>
                        <div className="mt-3 rounded-lg bg-white p-3 border border-blue-200">
                          <p className="text-xs text-blue-600 mb-1">Send Money To:</p>
                          <p className="font-mono text-xl font-bold text-blue-900">
                            {selectedGatewayData?.name === 'bKash' ? '01711-111111' : '01822-222222'}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            Account Holder: {selectedGatewayData?.name === 'bKash' ? 'LearnHub Learning' : 'LearnHub Learning'}
                          </p>
                        </div>
                      </div>

                      <Input
                        label="Sender Phone Number"
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        placeholder="01XXXXXXXXX"
                      />

                      <Input
                        label="Transaction ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Enter transaction ID"
                      />

                      <Button
                        onClick={handleManualPayment}
                        loading={submitting}
                        className="w-full"
                      >
                        Submit Payment
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-neutral-900">Price Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Original Price</span>
                        <span>${course.price}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-success-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${finalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                      Have a coupon?
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                      />
                      <Button variant="outline" onClick={handleApplyCoupon}>
                        Apply
                      </Button>
                    </div>
                    {appliedCoupon && (
                      <p className="mt-1 text-sm text-success-600">
                        Coupon {appliedCoupon.code} applied!
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="mb-3 font-semibold text-neutral-900">Payment Method</h3>
                    <div className="space-y-2">
                      {gateways.map((gateway) => (
                        <label
                          key={gateway._id}
                          className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                            selectedGateway === gateway._id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="gateway"
                            value={gateway._id}
                            checked={selectedGateway === gateway._id}
                            onChange={(e) => setSelectedGateway(e.target.value)}
                            className="text-primary-600"
                          />
                          <div>
                            <p className="font-medium text-neutral-900">{gateway.name}</p>
                            <p className="text-xs text-neutral-500">{gateway.instructions?.substring(0, 50)}...</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    loading={submitting}
                    className="w-full"
                    size="lg"
                  >
                    {step === 'payment' ? 'Complete Payment' : 'Proceed to Payment'}
                  </Button>

                  <div className="space-y-2 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard requiredRole="student">
      <CheckoutContent />
    </AuthGuard>
  );
}
