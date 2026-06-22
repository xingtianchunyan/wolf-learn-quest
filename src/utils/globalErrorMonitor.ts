/**
 * 全局错误监控占位实现
 * 原完整实现已随过度工程化模块清理而移除，保留 noop 单例以避免现有调用点报错。
 */

export class GlobalErrorMonitor {
  private static instance: GlobalErrorMonitor;

  private constructor() {}

  static getInstance(): GlobalErrorMonitor {
    if (!GlobalErrorMonitor.instance) {
      GlobalErrorMonitor.instance = new GlobalErrorMonitor();
    }
    return GlobalErrorMonitor.instance;
  }

  recordError(_error: unknown, _context?: Record<string, unknown>): void {
    // no-op
  }

  recordWarning(_message: string, _context?: Record<string, unknown>): void {
    // no-op
  }
}
