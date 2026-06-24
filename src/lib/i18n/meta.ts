import { getTranslation, type LanguageCode } from '@/lib/translations';

export interface SiteMeta {
  title: string;
  description: string;
  ogLocale: string;
  twitterSite: string;
}

export function getSiteMeta(language: LanguageCode): SiteMeta {
  return {
    title: getTranslation(language, 'meta.site_title'),
    description: getTranslation(language, 'meta.site_description'),
    ogLocale: getTranslation(language, 'meta.og_locale'),
    twitterSite: getTranslation(language, 'meta.twitter_site'),
  };
}

/**
 * 同步 document.title 与 <meta name="description">。
 * 在 LanguageProvider 或根组件的 effect 中调用。
 */
export function updateDocumentMeta(language: LanguageCode): void {
  if (typeof document === 'undefined') return;

  const { title, description, ogLocale } = getSiteMeta(language);

  document.title = title;
  document.documentElement.lang = language;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', description);
  }

  const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
  if (ogLocaleMeta) {
    ogLocaleMeta.setAttribute('content', ogLocale);
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:locale');
    meta.setAttribute('content', ogLocale);
    document.head.appendChild(meta);
  }
}
