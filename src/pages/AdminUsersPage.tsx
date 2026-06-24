import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Lock, RefreshCw } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  role: string;
  user_metadata: Record<string, unknown>;
  app_metadata: Record<string, unknown>;
  email_confirmed_at: string | null;
  confirmed_at: string | null;
  email_confirmed: boolean;
  password: string;
}

const AdminUsersPage: React.FC = () => {
  const { currentUser, initializing } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [confirmToggleUser, setConfirmToggleUser] = useState<AdminUser | null>(
    null
  );

  const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-user-management`;

  const isAdmin =
    currentUser?.app_metadata?.role === 'admin' ||
    currentUser?.user_metadata?.role === 'admin';

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: 'Unauthorized',
          description: 'Please sign in as admin',
          variant: 'destructive',
        });
        return;
      }

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ action: 'list' }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to load users');
      }

      setUsers(result.users);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initializing && currentUser && isAdmin) {
      fetchUsers();
    }
  }, [initializing, currentUser, isAdmin]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !newPassword) return;

    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          action: 'update_password',
          userId: selectedUser.id,
          newPassword,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to update password');
      }

      toast({
        title: 'Password updated',
        description: `Password for ${selectedUser.email || selectedUser.id} has been updated.`,
      });
      setPasswordDialogOpen(false);
      setNewPassword('');
      setSelectedUser(null);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to update password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEmailConfirmation = async (user: AdminUser) => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          action: 'update_email_confirmation',
          userId: user.id,
          emailConfirmed: !user.email_confirmed,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to update confirmation status');
      }

      toast({
        title: 'Email confirmation updated',
        description: `Email confirmation for ${user.email || user.id} has been updated.`,
      });

      setUsers(prev =>
        prev.map(u =>
          u.id === user.id ? { ...u, email_confirmed: !u.email_confirmed } : u
        )
      );
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to update confirmation status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setConfirmToggleUser(null);
    }
  };

  if (initializing) {
    return (
      <PageLayout>
        <div className='container mx-auto py-6 px-4'>
          <div className='flex justify-center items-center h-64'>
            <Loader2 className='h-8 w-8 animate-spin text-werewolf-purple' />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!currentUser || !isAdmin) {
    return (
      <PageLayout>
        <div className='container mx-auto py-6 px-4'>
          <div className='max-w-md mx-auto bg-werewolf-dark/60 border border-werewolf-purple/30 rounded-lg p-6 text-center'>
            <h1 className='text-2xl font-bold text-werewolf-gold mb-4'>
              Admin Access Required
            </h1>
            <p className='text-gray-300 mb-4'>
              This page is restricted to administrators.
            </p>
            <p className='text-sm text-gray-400'>
              To grant admin access, set{' '}
              <code className='bg-werewolf-dark px-1 rounded'>role: admin</code>{' '}
              in the user metadata of your account via Supabase Dashboard.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className='container mx-auto py-6 px-4'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-werewolf-gold'>
            User Management
          </h1>
          <Button
            variant='outline'
            onClick={fetchUsers}
            disabled={loading}
            className='border-werewolf-purple/30 bg-werewolf-dark/40'
          >
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin mr-2' />
            ) : (
              <RefreshCw className='h-4 w-4 mr-2' />
            )}
            Refresh
          </Button>
        </div>

        <div className='bg-werewolf-dark/60 border border-werewolf-purple/30 rounded-lg overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow className='border-werewolf-purple/30 hover:bg-transparent'>
                <TableHead className='text-werewolf-gold'>Email</TableHead>
                <TableHead className='text-werewolf-gold'>Password</TableHead>
                <TableHead className='text-werewolf-gold'>
                  Email Confirmed
                </TableHead>
                <TableHead className='text-werewolf-gold'>Created At</TableHead>
                <TableHead className='text-werewolf-gold'>
                  Last Sign In
                </TableHead>
                <TableHead className='text-werewolf-gold text-right'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 && !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='text-center text-gray-400 py-8'
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map(user => (
                  <TableRow key={user.id} className='border-werewolf-purple/20'>
                    <TableCell className='text-gray-200'>
                      {user.email || '—'}
                    </TableCell>
                    <TableCell className='font-mono text-gray-400'>
                      {user.password}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Switch
                          checked={user.email_confirmed}
                          onCheckedChange={() => setConfirmToggleUser(user)}
                          disabled={loading}
                        />
                        <Badge
                          variant={
                            user.email_confirmed ? 'default' : 'secondary'
                          }
                          className={
                            user.email_confirmed
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-gray-600 hover:bg-gray-700'
                          }
                        >
                          {user.email_confirmed ? 'Confirmed' : 'Unconfirmed'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className='text-gray-400 text-sm'>
                      {new Date(user.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className='text-gray-400 text-sm'>
                      {user.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleString()
                        : 'Never'}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='border-werewolf-purple/30 bg-werewolf-dark/40'
                        onClick={() => {
                          setSelectedUser(user);
                          setPasswordDialogOpen(true);
                        }}
                      >
                        <Lock className='h-3 w-3 mr-1' />
                        Reset Password
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Reset Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className='bg-werewolf-dark border-werewolf-purple/30 text-werewolf-ivory'>
          <DialogHeader>
            <DialogTitle className='text-werewolf-gold'>
              Reset Password
            </DialogTitle>
            <DialogDescription className='text-gray-400'>
              Set a new password for{' '}
              <strong className='text-gray-200'>
                {selectedUser?.email || selectedUser?.id}
              </strong>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdatePassword}>
            <div className='space-y-4 py-4'>
              <div className='space-y-2'>
                <Label htmlFor='new-password'>New Password</Label>
                <Input
                  id='new-password'
                  type='password'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className='bg-werewolf-dark/60 border-werewolf-purple/30'
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => setPasswordDialogOpen(false)}
                className='border-werewolf-purple/30 bg-werewolf-dark/40'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-werewolf-purple hover:bg-werewolf-light'
                disabled={loading || !newPassword}
              >
                {loading ? (
                  <Loader2 className='h-4 w-4 animate-spin mr-2' />
                ) : null}
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Toggle Dialog */}
      <Dialog
        open={!!confirmToggleUser}
        onOpenChange={open => !open && setConfirmToggleUser(null)}
      >
        <DialogContent className='bg-werewolf-dark border-werewolf-purple/30 text-werewolf-ivory'>
          <DialogHeader>
            <DialogTitle className='text-werewolf-gold'>
              Confirm Email Status Change
            </DialogTitle>
            <DialogDescription className='text-gray-400'>
              Are you sure you want to mark{' '}
              <strong className='text-gray-200'>
                {confirmToggleUser?.email || confirmToggleUser?.id}
              </strong>{' '}
              as{' '}
              <strong className='text-gray-200'>
                {confirmToggleUser?.email_confirmed
                  ? 'unconfirmed'
                  : 'confirmed'}
              </strong>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setConfirmToggleUser(null)}
              className='border-werewolf-purple/30 bg-werewolf-dark/40'
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                confirmToggleUser &&
                handleToggleEmailConfirmation(confirmToggleUser)
              }
              className='bg-werewolf-purple hover:bg-werewolf-light'
              disabled={loading}
            >
              {loading ? (
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
              ) : null}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default AdminUsersPage;
