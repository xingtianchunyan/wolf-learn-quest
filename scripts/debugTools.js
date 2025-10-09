/**
 * 文件级注释：调试工具集
 * 提供统一的调试工具和日志管理
 */

/**
 * 调试工具类
 */
class DebugTools {
  constructor() {
    this.isDebugMode = process.env.NODE_ENV === 'development';
    this.logLevel = process.env.LOG_LEVEL || 'info';
  }

  /**
   * 调试日志
   * @param {string} message - 日志消息
   * @param {any} data - 附加数据
   */
  debug(message, data = null) {
    if (this.isDebugMode) {
      console.log(
        `🐛 [${new Date().toISOString()}] DEBUG: ${message}`,
        data || ''
      );
    }
  }

  /**
   * 信息日志
   * @param {string} message - 日志消息
   * @param {any} data - 附加数据
   */
  info(message, data = null) {
    console.log(
      `ℹ️  [${new Date().toISOString()}] INFO: ${message}`,
      data || ''
    );
  }

  /**
   * 警告日志
   * @param {string} message - 日志消息
   * @param {any} data - 附加数据
   */
  warn(message, data = null) {
    console.warn(
      `⚠️  [${new Date().toISOString()}] WARN: ${message}`,
      data || ''
    );
  }

  /**
   * 错误日志
   * @param {string} message - 日志消息
   * @param {any} error - 错误对象
   */
  error(message, error = null) {
    console.error(
      `❌ [${new Date().toISOString()}] ERROR: ${message}`,
      error || ''
    );
  }

  /**
   * 性能测量
   * @param {string} label - 测量标签
   * @param {Function} fn - 要测量的函数
   */
  async measure(label, fn) {
    const start = performance.now();
    try {
      const result = await fn();
      const end = performance.now();
      this.debug(`Performance [${label}]: ${(end - start).toFixed(2)}ms`);
      return result;
    } catch (error) {
      const end = performance.now();
      this.error(
        `Performance [${label}] failed after ${(end - start).toFixed(2)}ms`,
        error
      );
      throw error;
    }
  }

  /**
   * 内存使用情况
   */
  memoryUsage() {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const usage = process.memoryUsage();
      this.debug('Memory Usage:', {
        rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
        external: `${Math.round(usage.external / 1024 / 1024)}MB`,
      });
    }
  }
}

// 导出单例实例
export const debugTools = new DebugTools();
export default debugTools;
