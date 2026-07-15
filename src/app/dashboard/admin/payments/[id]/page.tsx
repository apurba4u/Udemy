'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import AuthGuard from '@/components/guards/AuthGuard';
import PageBackButton from '@/components/ui/PageBackButton';
import api from '@/lib/api';

interface PaymentData {
  _id: string;
  student: { _id: string; fullName: string; email: string };
  course: { _id: string; title: string; thumbnail: string; price: number };
  payment: {
    _id: string;
    gateway: { name: string };
    amount: number;
    transactionId: string;
    senderNumber: string;
    screenshot?: string;
    status: string;
    createdAt: string;
  } | null;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  status: string;
  createdAt: string;
}

function PaymentDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    if (params.id) fetchPayment();
  }, [params.id]);

  const fetchPayment = async () => {
    try {
      const response = await api.get(`/orders/${params.id}`);
      setPayment(response.data.data);
    } catch {
      toast.error('Payment not found');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!payment?.payment?._id) {
      toast.error('No payment found for this order');
      return;
    }
    setActionLoading(true);
    try {
      await api.put(`/orders/${payment.payment._id}/approve`);
      toast.success('Payment approved! Enrollment created.');
      router.push('/dashboard/admin/payments');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to approve');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    if (!payment?.payment?._id) {
      toast.error('No payment found for this order');
      return;
    }
    setActionLoading(true);
    try {
      await api.put(`/orders/${payment.payment._id}/reject`, { reason: rejectReason });
      toast.success('Payment rejected');
      router.push('/dashboard/admin/payments');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reject');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-neutral-500">Loading...</div>
      </AdminLayout>
    );
  }

  if (!payment) {
    return (
      <AdminLayout>
        <div className="py-12 text-center text-neutral-500">Payment not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageBackButton fallback="/dashboard/admin/payments" label="Back to Payments" />

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">Payment Details</h1>
          <Badge variant={
            payment.status === 'approved' ? 'success' :
            payment.status === 'rejected' ? 'error' : 'warning'
          }>
            {payment.status}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-neutral-500">Name</p>
                <p className="font-medium text-neutral-900">{payment.student?.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="text-neutral-900">{payment.student?.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-4">
                {payment.course?.thumbnail && (
                  <img
                    src={payment.course.thumbnail}
                    alt={payment.course.title}
                    className="h-20 w-32 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-neutral-900">{payment.course?.title}</p>
                  <p className="text-sm text-neutral-500">Original Price: ${payment.originalPrice}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-sm text-neutral-500">Gateway</p>
                <p className="font-medium text-neutral-900">{payment.payment?.gateway?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Amount</p>
                <p className="font-bold text-lg text-neutral-900">${payment.payment?.amount || payment.finalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Sender Number</p>
                <p className="font-mono text-neutral-900">{payment.payment?.senderNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Transaction ID</p>
                <p className="font-mono text-sm text-neutral-900">{payment.payment?.transactionId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Submitted</p>
                <p className="text-neutral-900">{payment.payment?.createdAt ? new Date(payment.payment.createdAt).toLocaleString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Discount</p>
                <p className="text-neutral-900">${payment.discount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {payment.payment?.screenshot && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Screenshot</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={payment.payment.screenshot}
                alt="Payment screenshot"
                className="max-w-full rounded-lg border"
              />
              <a
                href={payment.payment.screenshot}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                <ExternalLink className="h-4 w-4" />
                Open in new tab
              </a>
            </CardContent>
          </Card>
        )}

        {payment.status === 'pending' && (
          <Card>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {actionLoading ? 'Processing...' : 'Approve Payment'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setRejectModal(true)}
                  disabled={actionLoading}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Reject Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Modal isOpen={rejectModal} onClose={() => setRejectModal(false)} title="Reject Payment">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Please provide a reason for rejecting this payment.
          </p>
          <Input
            label="Rejection Reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g., Wrong transaction ID"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRejectModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim() || actionLoading}
            >
              Reject Payment
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default function PaymentDetailsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <PaymentDetailsContent />
    </AuthGuard>
  );
}
