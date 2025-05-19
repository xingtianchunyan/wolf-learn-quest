
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

const LoginDialog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement actual login logic with Supabase
    console.log('Login attempt with:', { email, password });
    
    toast({
      title: "Login successful!",
      description: "Welcome to Werewolf Social Learning",
    });
    
    setIsLoggedIn(true);
    setIsOpen(false);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement actual signup logic with Supabase
    console.log('Sign up attempt with:', { email, playerId, password, confirmPassword });
    
    toast({
      title: "Registration successful!",
      description: "Please verify your email to complete the registration",
    });
    
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Here you would implement actual logout logic with Supabase
    console.log('Logging out');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    setIsLoggedIn(false);
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
                <Button type="submit" className="bg-werewolf-purple hover:bg-werewolf-light">
                  Sign In
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
                    placeholder="Choose a player ID"
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
                <Button type="submit" className="bg-werewolf-purple hover:bg-werewolf-light">
                  Sign Up
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
