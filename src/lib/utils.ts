import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 根据字符串种子生成确定性随机数
 */
function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * 使用 Fisher-Yates 算法根据种子对数组进行确定性洗牌
 * 同一房间的所有客户端都会得到相同的随机顺序
 */
export function shuffleWithSeed<T>(array: T[], seed: string): T[] {
  const result = [...array];
  const baseSeed = stringToSeed(seed || 'default');
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(baseSeed + i) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
