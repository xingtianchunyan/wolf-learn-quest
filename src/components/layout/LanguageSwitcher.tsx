
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, Language } from 'lucide-react';

type LanguageOption = {
  code: string;
  name: string;
};

const languages: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(languages[0]);

  const handleLanguageChange = (language: LanguageOption) => {
    setCurrentLanguage(language);
    // Here you would implement actual language change logic
    console.log(`Language changed to ${language.name}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="nav-link flex items-center">
          <Language size={20} className="mr-1" />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2 bg-werewolf-card border-werewolf-purple/30">
        <div className="space-y-1">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleLanguageChange(language)}
            >
              {language.code === currentLanguage.code && (
                <Check size={16} className="mr-2 text-werewolf-purple" />
              )}
              {language.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
