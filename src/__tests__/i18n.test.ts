import { describe, it, expect } from 'vitest';
import {
  createTranslator,
  defaultLanguage,
  getTranslation,
  languages,
  translations,
  type TranslationKey,
} from '@/lib/translations';
import {
  flattenTranslations,
  getNestedValue,
  interpolate,
} from '@/lib/translations/types';

describe('i18n utilities', () => {
  describe('flattenTranslations', () => {
    it('flattens nested objects into dot-notation keys', () => {
      const nested = {
        a: {
          b: {
            c: 'value',
          },
        },
        d: 'top',
      };
      const flat = flattenTranslations(nested);
      expect(flat).toEqual({
        'a.b.c': 'value',
        d: 'top',
      });
    });
  });

  describe('getNestedValue', () => {
    it('returns value for nested path', () => {
      expect(getNestedValue({ a: { b: 'val' } }, 'a.b')).toBe('val');
    });

    it('returns undefined for missing path', () => {
      expect(getNestedValue({ a: { b: 'val' } }, 'a.c')).toBeUndefined();
    });
  });

  describe('interpolate', () => {
    it('replaces placeholders with values', () => {
      expect(interpolate('Hello {name}', { name: 'World' })).toBe(
        'Hello World'
      );
    });

    it('keeps unmatched placeholders', () => {
      expect(interpolate('Hello {name}', {})).toBe('Hello {name}');
    });

    it('supports number values', () => {
      expect(interpolate('Count: {count}', { count: 42 })).toBe('Count: 42');
    });
  });

  describe('getTranslation', () => {
    it('returns translation for current language', () => {
      expect(getTranslation('zh', 'common.loading')).toBe('加载中...');
      expect(getTranslation('en', 'common.loading')).toBe('Loading...');
    });

    it('falls back to English when key is missing in target language', () => {
      // Simulate a key that exists only in English by temporarily removing it.
      const original = translations.zh['meta.twitter_site'];
      delete (translations.zh as Record<string, string>)['meta.twitter_site'];
      expect(getTranslation('zh', 'meta.twitter_site')).toBe('@wolflearnquest');
      (translations.zh as Record<string, string>)['meta.twitter_site'] =
        original;
    });

    it('falls back to key name when translation is missing in both languages', () => {
      expect(
        getTranslation(
          'en',
          'missing.key.that.does.not.exist' as TranslationKey
        )
      ).toBe('missing.key.that.does.not.exist');
    });

    it('supports interpolation for nested keys', () => {
      expect(
        getTranslation('en', 'game.phase.round_phase', {
          round: 3,
          phase: 'day',
        })
      ).toBe('Round 3 - day');
      expect(
        getTranslation('zh', 'game.phase.round_phase', {
          round: 3,
          phase: '白天',
        })
      ).toBe('第3轮 白天');
    });

    it('supports legacy flat keys', () => {
      expect(getTranslation('en', 'home')).toBe('Home');
      expect(getTranslation('zh', 'home')).toBe('首页');
    });

    it('supports flat keys with interpolation', () => {
      // Existing flat key that uses English only; verify it still resolves.
      expect(typeof getTranslation('en', 'welcome')).toBe('string');
    });
  });

  describe('createTranslator', () => {
    it('creates a translator bound to a language', () => {
      const t = createTranslator('zh');
      expect(t('common.error')).toBe('错误');
      expect(t('game.phase.day')).toBe('白天');
    });
  });

  describe('configuration', () => {
    it('has English as default language', () => {
      expect(defaultLanguage).toBe('en');
    });

    it('lists supported languages', () => {
      expect(languages.map(l => l.code)).toEqual(['en', 'zh']);
    });
  });

  describe('namespace coverage', () => {
    it('loads all nested namespaces', () => {
      const nestedKeys = Object.keys(translations.en).filter(k =>
        k.includes('.')
      );
      expect(nestedKeys.length).toBeGreaterThan(0);
      expect(nestedKeys).toContain('common.loading');
      expect(nestedKeys).toContain('game.phase.day');
      expect(nestedKeys).toContain('meta.site_title');
    });

    it('has matching nested namespaces in both languages', () => {
      const enKeys = new Set(Object.keys(translations.en));
      const zhKeys = new Set(Object.keys(translations.zh));
      const nestedEnKeys = Object.keys(translations.en).filter(k =>
        k.includes('.')
      );
      for (const key of nestedEnKeys) {
        expect(zhKeys.has(key)).toBe(true);
      }
    });
  });
});
