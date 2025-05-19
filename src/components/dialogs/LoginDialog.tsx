
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
import { LogIn } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LoginDialog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement actual login logic
    console.log('Login attempt with:', { email, password });
    
    toast({
      title: "Login successful!",
      description: "Welcome to Werewolf Social Learning",
    });
    
    setIsOpen(false);
  };

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
          <DialogTitle className="text-werewolf-purple">Sign In</DialogTitle>
          <DialogDescription>
            Sign in to access your account and join games
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-werewolf-dark/60 border-werewolf-purple/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
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
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
