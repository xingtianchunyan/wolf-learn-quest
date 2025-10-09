# WebSocket事件文档

## 概述

本文档描述了系统中所有的WebSocket事件，包括发送和监听的事件。

## 发送事件 (Emit Events)

### gameCreated

**描述**: 9. 发送事件

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameCreated', data);
```

---

### gameCreationFailed

**描述**: 待补充描述

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameCreationFailed', data);
```

---

### gameStateChanged

**描述**: 5. 发送事件

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameStateChanged', data);
```

---

### gameStateUpdateFailed

**描述**: 待补充描述

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameStateUpdateFailed', data);
```

---

### gamePhaseChanged

**描述**: 发送阶段变更事件

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gamePhaseChanged', data);
```

---

### playerStateChanged

**描述**: 发送玩家状态变更事件

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('playerStateChanged', data);
```

---

### gameEventAdded

**描述**: 发送事件添加通知

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameEventAdded', data);
```

---

### voteResultAdded

**描述**: 发送投票结果事件

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('voteResultAdded', data);
```

---

### gameEnded

**描述**: 发送游戏结束事件

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameEnded', data);
```

---

### snapshotCreated

**描述**: 待补充描述

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('snapshotCreated', data);
```

---

### snapshotRestored

**描述**: 待补充描述

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('snapshotRestored', data);
```

---

### gameStateSynced

**描述**: 暂时只发送同步事件

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameStateSynced', data);
```

---

### gameStateSyncFailed

**描述**: 待补充描述

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameStateSyncFailed', data);
```

---

### gameDeleted

**描述**: 待补充描述

**文件位置**: `src\services\GameStateService.ts`

**使用示例**:

```javascript
socket.emit('gameDeleted', data);
```

---

### notificationCreated

**描述**: 发送事件

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('notificationCreated', data);
```

---

### batchNotificationsSent

**描述**: 待补充描述

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('batchNotificationsSent', data);
```

---

### inAppNotification

**描述**: 发送应用内通知事件

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('inAppNotification', data);
```

---

### webSocketNotification

**描述**: 发送WebSocket通知事件

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('webSocketNotification', data);
```

---

### notificationRetry

**描述**: 待补充描述

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('notificationRetry', data);
```

---

### notificationFailed

**描述**: 待补充描述

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('notificationFailed', data);
```

---

### notificationStatusChanged

**描述**: 发送事件

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('notificationStatusChanged', data);
```

---

### batchNotificationsRead

**描述**: 待补充描述

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('batchNotificationsRead', data);
```

---

### notificationDismissed

**描述**: 待补充描述

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('notificationDismissed', data);
```

---

### templateRegistered

**描述**: 待补充描述

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('templateRegistered', data);
```

---

### statsReset

**描述**: 待补充描述

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('statsReset', data);
```

---

### configUpdated

**描述**: /

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('configUpdated', data);
```

---

### cleanupCompleted

**描述**: 清理缓存

**文件位置**: `src\services\NotificationService.ts`

**使用示例**:

```javascript
socket.emit('cleanupCompleted', data);
```

---

### skillExecuted

**描述**: 10. 发送事件

**文件位置**: `src\services\SkillExecutionService.ts`

**使用示例**:

```javascript
socket.emit('skillExecuted', data);
```

---

### skillExecutionFailed

**描述**: 待补充描述

**文件位置**: `src\services\SkillExecutionService.ts`

**使用示例**:

```javascript
socket.emit('skillExecutionFailed', data);
```

---

### skillExecutionStarted

**描述**: 发送技能开始事件

**文件位置**: `src\services\SkillExecutionService.ts`

**使用示例**:

```javascript
socket.emit('skillExecutionStarted', data);
```

---

### effectApplied

**描述**: 发送效果应用事件

**文件位置**: `src\services\SkillExecutionService.ts`

**使用示例**:

```javascript
socket.emit('effectApplied', data);
```

---

### skillExecutionCompleted

**描述**: 发送技能完成事件

**文件位置**: `src\services\SkillExecutionService.ts`

**使用示例**:

```javascript
socket.emit('skillExecutionCompleted', data);
```

---

### turnDataReset

**描述**: 待补充描述

**文件位置**: `src\services\SkillExecutionService.ts`

**使用示例**:

```javascript
socket.emit('turnDataReset', data);
```

---

### validatorRegistered

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validatorRegistered', data);
```

---

### validatorUnregistered

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validatorUnregistered', data);
```

---

### validationCompleted

**描述**: 发送事件

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validationCompleted', data);
```

---

### validationFailed

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validationFailed', data);
```

---

### batchValidationCompleted

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('batchValidationCompleted', data);
```

---

### validationTaskCreated

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validationTaskCreated', data);
```

---

### validationTaskCompleted

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validationTaskCompleted', data);
```

---

### validationTaskFailed

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validationTaskFailed', data);
```

---

### validationTaskDeleted

**描述**: 待补充描述

**文件位置**: `src\services\ValidationService.ts`

**使用示例**:

```javascript
socket.emit('validationTaskDeleted', data);
```

---

## 监听事件 (Listen Events)

### postgres_changes

**描述**: 实时监听冲突变化

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

- 2025-10-09: 自动生成WebSocket事件文档
