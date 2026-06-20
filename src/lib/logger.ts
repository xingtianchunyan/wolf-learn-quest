/**
 * 文件级注释：轻量日志工具
 * - 开发环境输出详细日志
 * - 生产环境最小化输出，避免信息泄漏与性能问题
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * 接口注释：Logger 接口定义
 */
export interface ILogger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

/**
 * 函数级注释：创建环境感知的 Logger 实例
 */
export function createLogger(namespace: string): ILogger {
  const isDev = import.meta.env.DEV === true;

  const prefix = `[${namespace}]`;
  return {
    debug: (...args) => {
      if (isDev) console.debug(prefix, ...args);
    },
    info: (...args) => {
      if (isDev) console.info(prefix, ...args);
    },
    warn: (...args) => console.warn(prefix, ...args),
    error: (...args) => console.error(prefix, ...args),
  };
}

// 默认导出应用级 logger
export const logger = createLogger('app');
