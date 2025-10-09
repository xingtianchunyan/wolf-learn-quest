# 错误码文档

## 概述
本文档描述了系统中所有的错误码定义和说明。

## 错误码列表


### HANDLING

**值**: `errorHandling`

**描述**: 待补充描述

**文件位置**: `src\services\index.ts`

---

### SERVICE_ERROR

**值**: `service:error`

**描述**: 待补充描述

**文件位置**: `src\services\index.ts`

---

### RATE

**值**: `error_rate`

**描述**: 待补充描述

**文件位置**: `src\services\performanceMonitoringService.ts`

---

### SYSTEM_ERROR

**值**: `system_error`

**描述**: 系统事件

**文件位置**: `src\services\securityAuditService.ts`

---

### VALIDATION_ERROR

**值**: `VALIDATION_ERROR`

**描述**: /

**文件位置**: `src\types\skillSystem.types.ts`

---

### EXECUTION_ERROR

**值**: `EXECUTION_ERROR`

**描述**: /

**文件位置**: `src\types\skillSystem.types.ts`

---

### NETWORK_ERROR

**值**: `NETWORK_ERROR`

**描述**: 待补充描述

**文件位置**: `src\types\skillSystem.types.ts`

---

### PERMISSION_ERROR

**值**: `PERMISSION_ERROR`

**描述**: 待补充描述

**文件位置**: `src\types\skillSystem.types.ts`

---

### CONFIG_ERROR

**值**: `CONFIG_ERROR`

**描述**: 待补充描述

**文件位置**: `src\types\skillSystem.types.ts`

---

### CONFLICT_ERROR

**值**: `CONFLICT_ERROR`

**描述**: 待补充描述

**文件位置**: `src\types\skillSystem.types.ts`

---

### 429

**值**: `429`

**描述**: 待补充描述

**文件位置**: `src\utils\apiSecurityConfig.ts`

---

### CONFIGURATION_ERROR

**值**: `configuration_error`

**描述**: 待补充描述

**文件位置**: `src\utils\automatedSecurityChecker.ts`

---

### MESSAGES

**值**: `Record<ErrorCode`

**描述**: /

**文件位置**: `src\utils\errorHandler.ts`

---

### API_ERROR

**值**: `API_ERROR`

**描述**: 网络相关

**文件位置**: `src\utils\errorHandler.ts`

---

### GAME_ERROR

**值**: `GAME_ERROR`

**描述**: 业务逻辑

**文件位置**: `src\utils\errorHandler.ts`

---

### SKILL_ERROR

**值**: `SKILL_ERROR`

**描述**: 业务逻辑

**文件位置**: `src\utils\errorHandler.ts`

---

### VOTE_ERROR

**值**: `VOTE_ERROR`

**描述**: 业务逻辑

**文件位置**: `src\utils\errorHandler.ts`

---

### UNKNOWN_ERROR

**值**: `UNKNOWN_ERROR`

**描述**: 系统错误

**文件位置**: `src\utils\errorHandler.ts`

---

### OCCURRED

**值**: `error:occurred`

**描述**: 错误相关事件

**文件位置**: `src\utils\patterns\observer.ts`

---

### RECOVERED

**值**: `error:recovered`

**描述**: 错误相关事件

**文件位置**: `src\utils\patterns\observer.ts`

---

### 403

**值**: `403`

**描述**: 待补充描述

**文件位置**: `src\utils\securityMiddleware.ts`

---

### 500

**值**: `500`

**描述**: 待补充描述

**文件位置**: `src\utils\securityMiddleware.ts`

---

### TIMEOUT_ERROR

**值**: `TIMEOUT_ERROR`

**描述**: 待补充描述

**文件位置**: `src\utils\skillErrorHandler.ts`

---


## HTTP状态码

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 | 成功 | 请求成功处理 |
| 400 | 请求错误 | 参数错误或格式不正确 |
| 401 | 未授权 | 需要登录或token无效 |
| 403 | 禁止访问 | 权限不足 |
| 404 | 未找到 | 资源不存在 |
| 500 | 服务器错误 | 内部服务器错误 |

## 错误响应格式

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: number;
}
```

## 更新日志

- 2025-10-08: 自动生成错误码文档
