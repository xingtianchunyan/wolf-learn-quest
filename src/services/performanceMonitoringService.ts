/**
 * 性能监控服务占位实现
 * 原完整实现已随过度工程化模块清理而移除，保留 noop 以避免现有调用点报错。
 */

export const performanceMonitoringService = {
  recordMetric: (_name: string, _duration: number): void => {
    // no-op
  },
};
