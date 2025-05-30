import React, { useState } from 'react';
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
import { LogIn, UserPlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '../layout/LanguageSwitcher';

const LoginDialog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Check for existing session on component mount
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          return;
        }

        if (session?.user) {
          setIsLoggedIn(true);
          setCurrentUser(session.user);
          
          // Try to get or create user profile
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (userError && userError.code !== 'PGRST116') {
            console.error('Error fetching user profile:', userError);
          }
          
          // If no profile exists, create one
          if (!userData && session.user.user_metadata?.player_name) {
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                user_id: session.user.id,
                player_name: session.user.user_metadata.player_name,
                experience: 0,
                level: 1,
                games_won: 0,
                games_lost: 0,
              });
            
            if (insertError) {
              console.error('Error creating user profile:', insertError);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };
    
    initializeAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      setIsLoggedIn(!!session);
      setCurrentUser(session?.user || null);
      
      // When user logs in, ensure profile exists
      if (event === 'SIGNED_IN' && session?.user) {
        setTimeout(async () => {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (!userData && session.user.user_metadata?.player_name) {
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                user_id: session.user.id,
                player_name: session.user.user_metadata.player_name,
                experience: 0,
                level: 1,
                games_won: 0,
                games_lost: 0,
              });
            
            if (insertError) {
              console.error('Error creating user profile:', insertError);
            }
          }
        }, 100);
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: t('login_failed'),
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: t('login_success'),
        description: t('login_success_desc'),
      });
      
      setIsOpen(false);
      // Reset form
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('login_failed'),
        description: t('unexpected_error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: t('password_mismatch'),
        description: t('password_mismatch_desc'),
        variant: "destructive",
      });
      return;
    }
    
    if (!playerId.trim()) {
      toast({
        title: t('player_id_required'),
        description: t('player_id_required_desc'),
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Check if Player ID already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('player_name')
        .eq('player_name', playerId.trim())
        .maybeSingle();
        
      if (existingUser) {
        toast({
          title: t('player_id_taken'),
          description: t('player_id_taken_desc'),
          variant: "destructive",
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
          }
        }
      });
      
      if (error) {
        toast({
          title: t('registration_failed'),
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Update the user's display name in Supabase Auth
      if (data.user) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { 
            display_name: playerId.trim(),
            player_name: playerId.trim()
          }
        });
        
        if (updateError) {
          console.error('Error updating display name:', updateError);
        }
        
        // Create user profile with Player ID
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            user_id: data.user.id,
            player_name: playerId.trim(),
            experience: 0,
            level: 1,
            games_won: 0,
            games_lost: 0,
          });
          
        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't show error to user as the account was created successfully
        }
      }
      
      toast({
        title: t('registration_success'),
        description: t('registration_success_desc'),
      });
      
      setIsOpen(false);
      // Reset form
      setEmail('');
      setPassword('');
      setPlayerId('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: t('registration_failed'),
        description: t('unexpected_error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: t('logout_failed'),
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t('logout_success'),
        description: t('logout_success_desc'),
      });
      setCurrentUser(null);
    }
  };

  if (isLoggedIn) {
    return (
      <Button variant="ghost" className="nav-link flex items-center" onClick={handleLogout}>
        <LogIn size={20} className="mr-1" />
        <span>{t('signout')}</span>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="nav-link flex items-center">
          <LogIn size={20} className="mr-1" />
          <span>{t('signin')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-werewolf-card text-werewolf-text">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple">{t('auth_title')}</DialogTitle>
          <DialogDescription>
            {t('auth_desc')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid grid-cols-2 bg-werewolf-dark/60">
            <TabsTrigger value="signin">{t('signin')}</TabsTrigger>
            <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleLogin}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">{t('email')}</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder={t('placeholder_email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">{t('password')}</Label>
                  <Input
                    id="password-login"
                    type="password"
                    placeholder={t('placeholder_password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-werewolf-purple hover:bg-werewolf-light"
                  disabled={loading}
                >
                  {loading ? t('signing_in') : t('signin')}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">{t('email')}</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder={t('placeholder_email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playerId">{t('player_id')}</Label>
                  <Input
                    id="playerId"
                    type="text"
                    placeholder={t('placeholder_player_id')}
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">{t('password')}</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder={t('placeholder_password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t('confirm_password')}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder={t('placeholder_confirm_password')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-werewolf-purple hover:bg-werewolf-light"
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
