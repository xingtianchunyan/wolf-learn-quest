
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

const LoginDialog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Check for existing session on component mount
  React.useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    
    checkSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Login successful!",
        description: "Welcome to Werewolf Social Learning",
      });
      
      setIsOpen(false);
      // Reset form
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
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
        title: "Password mismatch",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    if (!playerId.trim()) {
      toast({
        title: "Player ID required",
        description: "Please enter a Player ID",
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
        .single();
        
      if (existingUser) {
        toast({
          title: "Player ID taken",
          description: "This Player ID is already in use. Please choose a different one.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            player_name: playerId.trim(),
          }
        }
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      if (data.user) {
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
          toast({
            title: "Profile creation failed",
            description: "Account created but profile setup failed. Please contact support.",
            variant: "destructive",
          });
          return;
        }
      }
      
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account",
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
        title: "Registration failed",
        description: "An unexpected error occurred",
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
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    }
  };

  if (isLoggedIn) {
    return (
      <Button variant="ghost" className="nav-link flex items-center" onClick={handleLogout}>
        <LogIn size={20} className="mr-1" />
        <span className="hidden sm:inline">Sign Out</span>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="nav-link flex items-center">
          <LogIn size={20} className="mr-1" />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-werewolf-card text-werewolf-text">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple">Authentication</DialogTitle>
          <DialogDescription>
            Sign in to access your account or create a new one
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid grid-cols-2 bg-werewolf-dark/60">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={handleLogin}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input
                    id="password-login"
                    type="password"
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
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playerId">Player ID</Label>
                  <Input
                    id="playerId"
                    type="text"
                    placeholder="Choose a unique player ID"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-werewolf-dark/60 border-werewolf-purple/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
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
                  {loading ? 'Creating account...' : 'Sign Up'}
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
