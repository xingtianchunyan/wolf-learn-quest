/**
 * i18n 类型定义
 *
 * 支持嵌套翻译对象与点号 key（如 `game.phase.day`），
 * 同时保留旧版扁平 key 的兼容性。
 */

export type LanguageCode = 'en' | 'zh';

export type NestedTranslations = {
  [key: string]: string | NestedTranslations;
};

export type FlatTranslations = Record<string, string>;

/**
 * 将嵌套对象展平为 `{ 'a.b.c': 'value' }` 形式。
 */
export function flattenTranslations(
  nested: NestedTranslations,
  prefix = ''
): FlatTranslations {
  const result: FlatTranslations = {};

  for (const [key, value] of Object.entries(nested)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenTranslations(value, fullKey));
    }
  }

  return result;
}

/**
 * 递归获取嵌套对象中的值。
 */
export function getNestedValue(
  obj: NestedTranslations | FlatTranslations,
  path: string
): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * 模板变量插值，支持 `{name}` 语法。
 */
export function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = vars[key];
    return value !== undefined ? String(value) : `{${key}}`;
  });
}

/**
 * 计算嵌套对象的所有叶子路径（用于 TranslationKey 类型）。
 */
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? ObjectType[Key] extends string
      ? `${Key}`
      : `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];
