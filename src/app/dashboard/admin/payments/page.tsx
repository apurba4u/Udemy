'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';

interface OrderData {
  _id: string;
  student: { _id: string; fullName: string; email: string };
  course: { _id: string; title: string; thumbnail?: string };
  payment?: { _id: string; gateway: { name: string }; amount: number; transactionId: string; senderNumber: string; screenshot?: string; status: string; createdAt: string } | null;
  originalPrice: number;
  finalPrice: number;
  status: string;
  createdAt: string;
}

function PaymentsContent() {
  const [payments, setPayments] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [rejectModal, setRejectModal] = useState<OrderData | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [screenshotModal, setScreenshotModal] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => { fetchPayments(); }, [activeTab]);

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
    setActionLoading(paymentId);
    try {
      await api.put(`/orders/${paymentId}/approve`);
      toast.success('Payment approved!');
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to approve');
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
      await api.put(`/orders/${rejectModal.payment!._id}/reject`, { reason: rejectReason });
      toast.success('Payment rejected');
      setRejectModal(null);
      setRejectReason('');
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reject');
    } finally {
      setActionLoading(null);
    }
  };

  const tabs = [
    { key: 'pending' as const, label: 'Pending' },
    { key: 'approved' as const, label: 'Approved' },
    { key: 'rejected' as const, label: 'Rejected' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminPageHeader title="Payment Management" subtitle="Manage all payments" backTo="/dashboard/admin" />

        <div className="flex gap-2 border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-12 text-center text-neutral-500">Loading...</div>
        ) : payments.length === 0 ? (
          <div className="py-12 text-center text-neutral-500">No {activeTab} payments</div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <Card key={payment._id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p className="text-xs text-neutral-500">Student</p>
                        <p className="font-medium text-neutral-900">{payment.student?.fullName}</p>
                        <p className="text-sm text-neutral-500">{payment.student?.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Course</p>
                        <p className="font-medium text-neutral-900">{payment.course?.title}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Gateway</p>
                        <Badge variant="default">{payment.payment?.gateway?.name || 'N/A'}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Amount</p>
                        <p className="font-bold text-neutral-900">${payment.payment?.amount || payment.finalPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Sender</p>
                        <p className="font-mono text-neutral-900">{payment.payment?.senderNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Transaction ID</p>
                        <p className="font-mono text-sm text-neutral-900">{payment.payment?.transactionId || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Status</p>
                        <Badge variant={payment.status === 'completed' ? 'success' : payment.status === 'cancelled' ? 'error' : 'warning'}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>

                    {activeTab === 'pending' && payment.status === 'pending' && payment.payment && (
                      <div className="flex gap-2 lg:flex-col">
                        <Button size="sm" onClick={() => handleApprove(payment.payment!._id)} disabled={actionLoading === payment._id} className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setRejectModal(payment)} disabled={actionLoading === payment._id} className="text-red-600 border-red-200 hover:bg-red-50">
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
          <p className="text-sm text-neutral-600">Please provide a reason for rejecting this payment.</p>
          <Input label="Rejection Reason" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="e.g., Wrong transaction ID" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRejectModal(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim() || !!actionLoading}>Reject Payment</Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default function PaymentsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <PaymentsContent />
    </AuthGuard>
  );
}
