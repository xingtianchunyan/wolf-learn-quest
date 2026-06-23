import { en } from './translations/en';
import { zh } from './translations/zh';

export type LanguageCode = 'en' | 'zh';

export const defaultLanguage: LanguageCode = 'en';

export const languages: { code: LanguageCode; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '简体中文' },
];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en,
  zh,
};
