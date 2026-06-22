import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, Languages } from 'lucide-react';
import {
  defaultLanguage,
  languages,
  translations,
  type LanguageCode,
} from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('language') as LanguageCode | null;
    return saved && translations[saved] ? saved : defaultLanguage;
  });

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    localStorage.setItem('language', code);
  };

  useEffect(() => {
    const saved = localStorage.getItem('language') as LanguageCode | null;
    if (saved && translations[saved] && saved !== language) {
      setLanguageState(saved);
    }
  }, []);

  const t = (key: string): string => translations[language]?.[key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage =
    languages.find(lang => lang.code === language) || languages[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='nav-link flex items-center'>
          <Languages size={20} className='mr-1' />
          <span>{currentLanguage.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-48 p-2 bg-werewolf-card border-werewolf-purple/30'>
        <div className='space-y-1'>
          {languages.map(lang => (
            <Button
              key={lang.code}
              variant='ghost'
              className='w-full justify-start'
              onClick={() => setLanguage(lang.code)}
            >
              {lang.code === language && (
                <Check size={16} className='mr-2 text-werewolf-purple' />
              )}
              {lang.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
