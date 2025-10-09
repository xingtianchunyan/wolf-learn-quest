# WebSocket事件文档

## 概述

本文档描述了系统中所有的WebSocket事件，包括发送和监听的事件。

## 发送事件 (Emit Events)

## 监听事件 (Listen Events)

### postgres_changes

**描述**: 待补充描述

**文件位置**: `src\components\game\interfaces\SkillConflictResolver.tsx`

**使用示例**:

```javascript
socket.on('postgres_changes', data => {
  // 处理事件数据
});
```

---

### reInit

**描述**: 待补充描述

**文件位置**: `src\components\ui\carousel.tsx`

**使用示例**:

```javascript
socket.on('reInit', data => {
  // 处理事件数据
});
```

---

### select

**描述**: 待补充描述

**文件位置**: `src\components\ui\carousel.tsx`

**使用示例**:

```javascript
socket.on('select', data => {
  // 处理事件数据
});
```

---

### presence

**描述**: 监听presence变化

**文件位置**: `src\hooks\usePlayerPresence.ts`

**使用示例**:

```javascript
socket.on('presence', data => {
  // 处理事件数据
});
```

---

### finish

**描述**: 监听响应完成

**文件位置**: `src\middleware\apiSecurityMiddleware.ts`

**使用示例**:

```javascript
socket.on('finish', data => {
  // 处理事件数据
});
```

---

### system

**描述**: 监听频道状态

**文件位置**: `src\utils\enhancedRealtimeManager.ts`

**使用示例**:

```javascript
socket.on('system', data => {
  // 处理事件数据
});
```

---

## 事件数据格式

所有WebSocket事件都应该遵循以下数据格式：

```typescript
interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
  userId?: string;
  roomId?: string;
}
```

## 更新日志

- 2025-10-08: 自动生成WebSocket事件文档
