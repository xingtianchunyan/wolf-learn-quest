/**
 * 文件级注释：登录与注册对话框
 * 提供邮箱密码登录、注册以及密码重置入口。
 */
import React, { useState } from 'react';
import { createLogger } from '@/lib/logger';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '../layout/LanguageSwitcher';
import { useAuth } from '@/providers/AuthProvider';

const LoginDialog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isLoggedIn, initializing, isLoginOpen, setIsLoginOpen } = useAuth();
  const logger = createLogger('LoginDialog');

  /**
   * 函数级注释：执行邮箱密码登录
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: _data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: t('login_failed'),
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: t('login_success'),
        description: t('login_success_desc'),
      });

      setIsLoginOpen(false);
      // Reset form
      setEmail('');
      setPassword('');
    } catch (error) {
      logger.error('Login error:', error);
      toast({
        title: t('login_failed'),
        description: t('unexpected_error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 函数级注释：执行邮箱注册
   */
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: t('password_mismatch'),
        description: t('password_mismatch_desc'),
        variant: 'destructive',
      });
      return;
    }

    if (!playerId.trim()) {
      toast({
        title: t('player_id_required'),
        description: t('player_id_required_desc'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Check if Player ID already exists
      const { data: existingUserRows, error: _checkError } = await supabase.rpc(
        'get_public_user_by_name',
        { p_name: playerId.trim() }
      );

      if (
        existingUserRows &&
        Array.isArray(existingUserRows) &&
        existingUserRows.length > 0
      ) {
        toast({
          title: t('player_id_taken'),
          description: t('player_id_taken_desc'),
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Sign up the user with player_name in metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            player_name: playerId.trim(),
            display_name: playerId.trim(), // Set display name for Supabase Auth
          },
        },
      });

      if (error) {
        toast({
          title: t('registration_failed'),
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Update the user's display name in Supabase Auth
      if (data.user) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            display_name: playerId.trim(),
            player_name: playerId.trim(),
          },
        });

        if (updateError) {
          logger.error('Error updating display name:', updateError);
        }
      }

      toast({
        title: t('registration_success'),
        description: t('registration_success_desc'),
      });

      setIsLoginOpen(false);
      // Reset form
      setEmail('');
      setPassword('');
      setPlayerId('');
      setConfirmPassword('');
    } catch (error) {
      logger.error('Signup error:', error);
      toast({
        title: t('registration_failed'),
        description: t('unexpected_error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 函数级注释：发送密码重置链接
   */
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: t('email'),
        description: t('player_id_required_desc'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) {
        toast({
          title: t('reset_link_failed'),
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: t('reset_link_sent'),
        description: t('reset_link_sent_desc'),
      });

      setActiveTab('signin');
    } catch (error) {
      logger.error('Forgot password error:', error);
      toast({
        title: t('reset_link_failed'),
        description: t('unexpected_error'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 函数级注释：执行退出登录
   */
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: t('logout_failed'),
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('logout_success'),
        description: t('logout_success_desc'),
      });
    }
  };

  if (isLoggedIn) {
    return (
      <Button
        variant='ghost'
        className='nav-link flex items-center'
        onClick={handleLogout}
      >
        <LogIn size={20} className='mr-1' />
        <span>{t('signout')}</span>
      </Button>
    );
  }

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='nav-link flex items-center'
          loading={initializing}
        >
          <LogIn size={20} className='mr-1' />
          <span>{t('signin')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-werewolf-card text-werewolf-text'>
        <DialogHeader>
          <DialogTitle className='text-werewolf-purple'>
            {t('auth_title')}
          </DialogTitle>
          <DialogDescription>{t('auth_desc')}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid grid-cols-2 bg-werewolf-dark/60'>
            <TabsTrigger value='signin'>{t('signin')}</TabsTrigger>
            <TabsTrigger value='signup'>{t('signup')}</TabsTrigger>
          </TabsList>

          <TabsContent value='signin'>
            <form onSubmit={handleLogin}>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email-login'>{t('email')}</Label>
                  <Input
                    id='email-login'
                    type='email'
                    placeholder={t('placeholder_email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className='bg-werewolf-dark/60 border-werewolf-purple/30'
                  />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='password-login'>{t('password')}</Label>
                    <button
                      type='button'
                      onClick={() => setActiveTab('forgot')}
                      className='text-xs text-werewolf-purple hover:underline bg-transparent border-none p-0'
                    >
                      {t('forgot_password')}
                    </button>
                  </div>
                  <Input
                    id='password-login'
                    type='password'
                    placeholder={t('placeholder_password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className='bg-werewolf-dark/60 border-werewolf-purple/30'
                  />
                </div>
              </div>
              <DialogFooter>
                <div className='flex w-full flex-col gap-2 sm:flex-row sm:justify-end'>
                  <Button
                    type='submit'
                    className='bg-werewolf-purple hover:bg-werewolf-light'
                    disabled={loading}
                  >
                    {loading ? t('signing_in') : t('signin')}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value='forgot'>
            <form onSubmit={handleForgotPassword}>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email-forgot'>{t('email')}</Label>
                  <Input
                    id='email-forgot'
                    type='email'
                    placeholder={t('placeholder_email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className='bg-werewolf-dark/60 border-werewolf-purple/30'
                  />
                  <p className='text-xs text-muted-foreground'>
                    {t('forgot_password_desc')}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <div className='flex w-full flex-col gap-2 sm:flex-row sm:justify-end'>
                  <Button
                    type='button'
                    variant='outline'
                    className='border-werewolf-purple/30 bg-werewolf-dark/40'
                    disabled={loading}
                    onClick={() => setActiveTab('signin')}
                  >
                    {t('back_to_signin')}
                  </Button>
                  <Button
                    type='submit'
                    className='bg-werewolf-purple hover:bg-werewolf-light'
                    disabled={loading}
                  >
                    {loading ? t('sending_reset_link') : t('send_reset_link')}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value='signup'>
            <form onSubmit={handleSignUp}>
              <div className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email-signup'>{t('email')}</Label>
                  <Input
                    id='email-signup'
                    type='email'
                    placeholder={t('placeholder_email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className='bg-werewolf-dark/60 border-werewolf-purple/30'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='playerId'>{t('player_id')}</Label>
                  <Input
                    id='playerId'
                    type='text'
                    placeholder={t('placeholder_player_id')}
                    value={playerId}
                    onChange={e => setPlayerId(e.target.value)}
                    required
                    className='bg-werewolf-dark/60 border-werewolf-purple/30'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password-signup'>{t('password')}</Label>
                  <Input
                    id='password-signup'
                    type='password'
                    placeholder={t('placeholder_password')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className='bg-werewolf-dark/60 border-werewolf-purple/30'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>
                    {t('confirm_password')}
                  </Label>
                  <Input
                    id='confirm-password'
                    type='password'
                    placeholder={t('placeholder_confirm_password')}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    className='bg-werewolf-dark/60 border-werewolf-purple/30'
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type='submit'
                  className='bg-werewolf-purple hover:bg-werewolf-light w-full'
                  disabled={loading}
                >
                  {loading ? t('creating_account') : t('signup')}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
