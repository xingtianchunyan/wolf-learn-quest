/**
 * 安全审计服务占位实现
 * 原完整实现已随过度工程化安全模块清理而移除，保留 PermissionContext 所需接口。
 */

export enum SecurityEventType {
  PERMISSION_GRANTED = 'PERMISSION_GRANTED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
}

interface SecurityEvent {
  userId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  source?: string;
}

export const securityAuditService = {
  recordSecurityEvent: async (
    _type: SecurityEventType,
    _event: SecurityEvent
  ): Promise<void> => {
    // no-op：原用于安全审计日志，后续可接入真实审计系统
  },
};
