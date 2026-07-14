'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, ExternalLink } from 'lucide-react';
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
  gateway: { _id: string; name: string };
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
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [rejectModal, setRejectModal] = useState<Payment | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [screenshotModal, setScreenshotModal] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, [activeTab]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders?status=${activeTab}`);
      setPayments(response.data.data || []);
    } catch {
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (paymentId: string) => {
    try {
      await api.put(`/orders/${paymentId}/approve`);
      toast.success('Payment approved successfully');
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to approve payment');
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    try {
      await api.put(`/orders/${rejectModal._id}/reject`, { reason: rejectReason });
      toast.success('Payment rejected');
      setRejectModal(null);
      setRejectReason('');
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reject payment');
    }
  };

  const tabs = [
    { key: 'pending' as const, label: 'Pending', count: payments.filter(p => p.status === 'Pending').length },
    { key: 'approved' as const, label: 'Approved', count: payments.filter(p => p.status === 'Approved').length },
    { key: 'rejected' as const, label: 'Rejected', count: payments.filter(p => p.status === 'Rejected').length },
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
            No {activeTab} payments
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-sm text-neutral-500">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Course</th>
                  <th className="pb-3 font-medium">Gateway</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Sender</th>
                  <th className="pb-3 font-medium">Transaction ID</th>
                  <th className="pb-3 font-medium">Screenshot</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-neutral-100">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-neutral-900">{payment.order?.student?.fullName}</p>
                        <p className="text-xs text-neutral-500">{payment.order?.student?.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-neutral-900">{payment.order?.course?.title}</td>
                    <td className="py-3">
                      <Badge variant="default">{payment.gateway?.name}</Badge>
                    </td>
                    <td className="py-3 font-medium text-neutral-900">${payment.amount}</td>
                    <td className="py-3 text-sm text-neutral-900">{payment.senderNumber}</td>
                    <td className="py-3 text-sm text-neutral-500">{payment.transactionId}</td>
                    <td className="py-3">
                      {payment.screenshot ? (
                        <button
                          onClick={() => setScreenshotModal(payment.screenshot!)}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-sm text-neutral-400">No screenshot</span>
                      )}
                    </td>
                    <td className="py-3 text-sm text-neutral-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      {activeTab === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(payment._id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setRejectModal(payment)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            placeholder="Enter rejection reason"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRejectModal(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Payment
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!screenshotModal} onClose={() => setScreenshotModal(null)} title="Payment Screenshot">
        {screenshotModal && (
          <img src={screenshotModal} alt="Payment screenshot" className="w-full rounded-lg" />
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
