
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useLanguage } from './LanguageSwitcher';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-werewolf-dark/95 backdrop-blur-sm text-gray-300 py-4 z-10 border-t border-werewolf-purple/20">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4 md:gap-x-8">
        <div className="text-sm mb-2 md:mb-0">{t('footer_tagline')}</div>
        
        <Button 
          variant="ghost" 
          className="mb-2 md:mb-0 text-gray-300 hover:text-white text-sm py-1 px-3 h-auto"
          onClick={() => window.open("https://github.com/xingtianchunyan/wolf-learn-quest", "_blank")}
        >
          <Github className="mr-2 h-3 w-3" />
          GitHub
        </Button>
        
        <div className="text-sm">
          © {t('footer_copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
