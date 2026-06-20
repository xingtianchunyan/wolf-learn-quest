/**
 * 用户错误接口兜底实现
 */

export interface UserErrorInfo {
  message: string;
  code?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, unknown>;
}

export function useEnhancedUserErrorInterface() {
  return {
    errorInfo: null as UserErrorInfo | null,
    setErrorInfo: (_: UserErrorInfo | null) => {},
  };
}
