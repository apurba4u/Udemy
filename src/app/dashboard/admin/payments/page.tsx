'use client';

import { useState, useEffect } from 'react';
import { Check, X, Eye, ExternalLink, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';

interface Payment {
  _id: string;
  order: {
    _id: string;
    student: { _id: string; fullName: string; email: string };
    course: { _id: string; title: string };
    finalPrice: number;
  };
  gateway: { _id: string; name: string; configuration?: { accountNumber?: string } };
  amount: number;
  transactionId: string;
  senderNumber: string;
  screenshot?: string;
  status: string;
  createdAt: string;
}

function PaymentsContent() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [rejectModal, setRejectModal] = useState<Payment | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [screenshotModal, setScreenshotModal] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, [activeTab]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders?status=${activeTab.toLowerCase()}`);
      setPayments(response.data.data || []);
    } catch {
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (paymentId: string) => {
    setActionLoading(paymentId);
    try {
      await api.put(`/orders/${paymentId}/approve`);
      toast.success('Payment approved! Enrollment created.');
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to approve payment');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal || !rejectReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    setActionLoading(rejectModal._id);
    try {
      await api.put(`/orders/${rejectModal._id}/reject`, { reason: rejectReason });
      toast.success('Payment rejected');
      setRejectModal(null);
      setRejectReason('');
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reject payment');
    } finally {
      setActionLoading(null);
    }
  };

  const tabs = [
    { key: 'Pending' as const, label: 'Pending' },
    { key: 'Approved' as const, label: 'Approved' },
    { key: 'Rejected' as const, label: 'Rejected' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-neutral-900">Payment Management</h1>

        <div className="flex gap-2 border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.key
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-12 text-center text-neutral-500">Loading...</div>
        ) : payments.length === 0 ? (
          <div className="py-12 text-center text-neutral-500">
            No {activeTab.toLowerCase()} payments
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment._id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p className="text-xs text-neutral-500">Student</p>
                        <p className="font-medium text-neutral-900">{payment.order?.student?.fullName}</p>
                        <p className="text-sm text-neutral-500">{payment.order?.student?.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Course</p>
                        <p className="font-medium text-neutral-900">{payment.order?.course?.title}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Gateway</p>
                        <Badge variant="default">{payment.gateway?.name}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Amount</p>
                        <p className="font-bold text-neutral-900">${payment.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Sender Number</p>
                        <p className="font-mono text-neutral-900">{payment.senderNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Transaction ID</p>
                        <p className="font-mono text-sm text-neutral-900">{payment.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Screenshot</p>
                        {payment.screenshot ? (
                          <button
                            onClick={() => setScreenshotModal(payment.screenshot!)}
                            className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                        ) : (
                          <span className="text-sm text-neutral-400">No screenshot</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Submitted</p>
                        <p className="text-sm text-neutral-900">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Status</p>
                        <Badge
                          variant={
                            payment.status === 'approved'
                              ? 'success'
                              : payment.status === 'rejected'
                              ? 'error'
                              : 'warning'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>

                      {activeTab === 'Pending' && payment.status === 'pending' && (
                      <div className="flex gap-2 lg:flex-col">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(payment._id)}
                          disabled={actionLoading === payment._id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {actionLoading === payment._id ? (
                            <span className="animate-spin">...</span>
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setRejectModal(payment)}
                          disabled={actionLoading === payment._id}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!rejectModal} onClose={() => setRejectModal(null)} title="Reject Payment">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Please provide a reason for rejecting this payment.
          </p>
          <Input
            label="Rejection Reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g., Wrong transaction ID, Invalid screenshot"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRejectModal(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              Reject Payment
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!screenshotModal} onClose={() => setScreenshotModal(null)} title="Payment Screenshot">
        {screenshotModal && (
          <div className="space-y-4">
            <img
              src={screenshotModal}
              alt="Payment screenshot"
              className="w-full rounded-lg border"
            />
            <a
              href={screenshotModal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
            >
              <Download className="h-4 w-4" />
              Open in new tab
            </a>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PaymentsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <PaymentsContent />
    </AuthGuard>
  );
}
