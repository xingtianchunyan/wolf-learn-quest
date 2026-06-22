/**
 * 错误监控服务占位实现
 * 原完整实现已随过度工程化安全模块清理而移除，保留 recordOperation 等核心接口。
 */

export const recordOperation = (): void => {
  // no-op：原用于错误率统计，后续可接入 Sentry 等真实监控服务
};

export const ErrorMonitoringService = {
  recordOperation,
};
