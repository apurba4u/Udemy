'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Eye,
  Shield,
  ShieldOff,
  UserX,
  Users,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { DataTable, Column } from '@/components/ui/DataTable';
import AuthGuard from '@/components/guards/AuthGuard';
import api from '@/lib/api';
import { User } from '@/types';
import { cn } from '@/lib/utils';

function UsersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, roleFilter, sortField, sortOrder]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      if (roleFilter) params.append('role', roleFilter);
      if (search) params.append('search', search);
      params.append('sort', sortOrder === 'desc' ? `-${sortField}` : sortField);

      const response = await api.get(`/admin/users?${params.toString()}`);
      setUsers(response.data.data);
      setTotalPages(response.data.pagination?.pages || 1);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId: string, isBlocked: boolean) => {
    try {
      await api.put(`/admin/users/${userId}/role`, {
        isBlocked: !isBlocked,
      });
      toast.success(`User ${isBlocked ? 'unblocked' : 'blocked'} successfully`);
      fetchUsers();
    } catch {
      toast.error('Failed to update user');
    }
    setShowActions(null);
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      toast.success('Role updated successfully');
      fetchUsers();
    } catch {
      toast.error('Failed to update role');
    }
    setShowActions(null);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const columns: Column<User>[] = [
    {
      key: 'fullName',
      label: 'User',
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} alt={user.fullName} size="sm" />
          <div>
            <p className="font-medium text-neutral-900">
              {user.fullName}
            </p>
            <p className="text-sm text-neutral-500">
              {user.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (user) => (
        <Badge variant={user.role === 'admin' ? 'primary' : 'default'}>
          {user.role}
        </Badge>
      ),
    },
    {
      key: 'isBlocked',
      label: 'Status',
      render: (user) => (
        <Badge variant={user.isBlocked ? 'error' : 'success'}>
          {user.isBlocked ? 'Blocked' : 'Active'}
        </Badge>
      ),
    },
    {
      key: 'isVerified',
      label: 'Verified',
      render: (user) => (
        <Badge variant={user.isVerified ? 'success' : 'warning'}>
          {user.isVerified ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (user) => (
        <span className="text-sm text-neutral-500">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user) => (
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(showActions === user._id ? null : user._id);
            }}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showActions === user._id && (
            <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => handleBlockUser(user._id, user.isBlocked)}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                {user.isBlocked ? (
                  <>
                    <ShieldOff className="h-4 w-4" />
                    Unblock User
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Block User
                  </>
                )}
              </button>
              <button
                onClick={() => handleChangeRole(user._id, user.role === 'admin' ? 'student' : 'admin')}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
              >
                <UserX className="h-4 w-4" />
                Change Role
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            User Management
          </h1>
          <p className="text-neutral-500">
            Manage all users on the platform
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-4 focus:border-primary-500 focus:outline-none dark:border-neutral-600 sm:w-64"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-neutral-300 px-3 py-2.5 focus:border-primary-500 focus:outline-none dark:border-neutral-600"
            >
              <option value="">All Roles</option>
              <option value="student">Students</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          emptyMessage="No users found"
          emptyIcon={<Users className="h-12 w-12 text-neutral-300" />}
        />
      </div>
    </AdminLayout>
  );
}

export default function UsersPage() {
  return (
    <AuthGuard requiredRole="admin">
      <UsersContent />
    </AuthGuard>
  );
}
