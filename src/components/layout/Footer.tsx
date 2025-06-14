
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { useLanguage } from './LanguageSwitcher';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-werewolf-dark/80 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4 md:gap-x-8">
        <div className="text-sm mb-4 md:mb-0">{t('footer_tagline')}</div>
        
        <Button 
          variant="ghost" 
          className="mb-4 md:mb-0 text-gray-300 hover:text-white"
          onClick={() => window.open("https://github.com/xingtianchunyan/wolf-learn-quest", "_blank")}
        >
          <Github className="mr-2 h-4 w-4" />
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
