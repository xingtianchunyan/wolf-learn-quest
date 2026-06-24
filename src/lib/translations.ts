import { en as enFlat } from './translations/en';
import { zh as zhFlat } from './translations/zh';
import { common as enCommon } from './translations/en/common';
import { common as zhCommon } from './translations/zh/common';
import { game as enGame } from './translations/en/game';
import { game as zhGame } from './translations/zh/game';
import { gameComponent as enGameComponent } from './translations/en/gameComponent';
import { gameComponent as zhGameComponent } from './translations/zh/gameComponent';
import { hook as enHook } from './translations/en/hook';
import { hook as zhHook } from './translations/zh/hook';
import { judge as enJudge } from './translations/en/judge';
import { judge as zhJudge } from './translations/zh/judge';
import { meta as enMeta } from './translations/en/meta';
import { meta as zhMeta } from './translations/zh/meta';
import { page as enPage } from './translations/en/page';
import { page as zhPage } from './translations/zh/page';
import { voting as enVoting } from './translations/en/voting';
import { voting as zhVoting } from './translations/zh/voting';
import {
  flattenTranslations,
  interpolate,
  type FlatTranslations,
  type LanguageCode,
  type NestedKeyOf,
  type NestedTranslations,
} from './translations/types';

export type { LanguageCode };

export const defaultLanguage: LanguageCode = 'en';

export const languages: { code: LanguageCode; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '简体中文' },
];

const enNamespaces: NestedTranslations = {
  common: enCommon,
  game: enGame,
  gameComponent: enGameComponent,
  hook: enHook,
  judge: enJudge,
  meta: enMeta,
  page: enPage,
  voting: enVoting,
};

const zhNamespaces: NestedTranslations = {
  common: zhCommon,
  game: zhGame,
  gameComponent: zhGameComponent,
  hook: zhHook,
  judge: zhJudge,
  meta: zhMeta,
  page: zhPage,
  voting: zhVoting,
};

const enNested = flattenTranslations(enNamespaces);
const zhNested = flattenTranslations(zhNamespaces);

export const translations = {
  en: { ...enFlat, ...enNested },
  zh: { ...zhFlat, ...zhNested },
} as const;

/**
 * 所有可用的翻译 key。
 * 同时兼容旧版扁平 key 与新版嵌套 key（如 `common.loading`）。
 */
export type TranslationKey =
  | keyof (typeof translations)['en']
  | NestedKeyOf<typeof enNamespaces>;

export function getTranslation(
  language: LanguageCode,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  const dict = translations[language] as FlatTranslations;
  const fallback = translations.en as FlatTranslations;

  const value = dict[key as string] ?? fallback[key as string];
  if (typeof value === 'string') {
    return interpolate(value, vars);
  }

  return key as string;
}

/**
 * 供 Hook / Service 等非组件场景使用的翻译函数。
 * 直接传入当前语言代码即可获得 t 能力。
 */
export function createTranslator(language: LanguageCode) {
  return (
    key: TranslationKey,
    vars?: Record<string, string | number>
  ): string => getTranslation(language, key, vars);
}
