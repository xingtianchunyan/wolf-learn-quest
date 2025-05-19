
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-werewolf-card py-6 text-center text-sm text-gray-400">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="md:text-left">
          <p>Gamified Learning for Communities</p>
        </div>
        
        <Button 
          variant="ghost" 
          className="text-gray-400 hover:text-werewolf-purple"
          onClick={() => window.open("https://github.com/xingtianchunyan/quiz-werewolf-academy", "_blank")}
        >
          <Github size={20} className="mr-2" />
          GitHub
        </Button>
        
        <div className="md:text-right">
          <p>© {currentYear} Old With New Werewolf</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
