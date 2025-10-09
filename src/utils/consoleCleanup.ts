import { createLogger } from '@/lib/logger';

/**
 * 控制台清理工具 - 统一替换项目中的console调用
 */
export const createFileLogger = (fileName: string) => {
  return createLogger(fileName);
};
/**
 * 替换console调用的快捷函数
 */
export const replaceConsoleInFile = (fileName: string) => {
  const logger = createLogger(fileName);
  return {
    log: logger.info,
    error: logger.error,
    warn: logger.warn,
    debug: logger.debug,
    info: logger.info,
  };
};

/**
 * 开发环境下的调试工具，生产环境会被移除
 */
export const devDebug = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger('debug');
    logger.debug(message, data);
  }
};
