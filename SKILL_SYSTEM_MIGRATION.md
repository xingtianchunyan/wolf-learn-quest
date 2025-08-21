/**
 * 技能系统迁移指南
 * 
 * 本文档指导从旧版技能系统迁移到增强版技能系统
 */

## 迁移概览

### 旧版系统 (已废弃)
- `useSkillSystem` hook
- `SkillService` 服务  
- 前端冲突处理逻辑
- 基础验证机制

### 新版系统 (推荐)
- `useEnhancedSkillSystem` hook
- `EnhancedSkillService` 服务
- 数据库层统一冲突处理
- 配置化技能定义
- 完善的类型安全

## 详细迁移步骤

### 1. Hook 替换

```typescript
// 旧用法 ❌
import { useSkillSystem } from '@/hooks/useSkillSystem';
const { useSkill, skillUses } = useSkillSystem(gameStateId, roomId);

// 新用法 ✅
import { useEnhancedSkillSystem } from '@/hooks/useEnhancedSkillSystem';
const { useSkillEnhanced, skillUses } = useEnhancedSkillSystem(gameStateId, roomId);
```

### 2. 服务替换

```typescript
// 旧用法 ❌
import { SkillService } from '@/services/skillService';
await SkillService.useSkill(userId, gameStateId, skillName, targetUserId);

// 新用法 ✅
import { EnhancedSkillService } from '@/services/enhancedSkillService';
await EnhancedSkillService.useSkillEnhanced(context);
```

### 3. 参数结构调整

```typescript
// 旧参数结构 ❌
await useSkill('attack', 'target-user-id', { damage: 100 });

// 新参数结构 ✅
const context: SkillUsageContext = {
  userId: 'current-user-id',
  gameStateId: 'game-state-id',
  roomId: 'room-id',
  currentPhase: 3, // 使用数字阶段
  currentRound: 1,
  roleState: roleStateData,
  roleDesign: roleDesignData,
  targetUserId: 'target-user-id',
  additionalData: { damage: 100 }
};
await useSkillEnhanced(context);
```

### 4. 冲突处理迁移

```typescript
// 旧方式 ❌ - 前端处理冲突
await EnhancedSkillService.resolveSkillConflictsInRound(gameStateId, round);

// 新方式 ✅ - 数据库统一处理
await supabase.rpc('detect_skill_conflicts', {
  p_game_state_id: gameStateId,
  p_round_number: round,
  p_phase: toPhaseName(currentPhase)
});
```

## 类型安全改进

### 阶段处理
```typescript
// 旧方式 ❌ - 混用数字和字符串
const phase = 'night'; // 或 3

// 新方式 ✅ - 统一转换
import { toPhaseName, toPhaseId } from '@/utils/phaseUtils';
const phaseName = toPhaseName(3); // 'night'
const phaseId = toPhaseId('night'); // 3
```

### 技能配置
```typescript
// 旧方式 ❌ - 硬编码技能属性
const skillName = 'werewolf_attack';

// 新方式 ✅ - 配置化定义
import { getSkillConfigByEnglish } from '@/utils/skillMappingConfig';
const skillConfig = getSkillConfigByEnglish('werewolf_attack');
```

## 迁移检查清单

- [ ] 替换所有 `useSkillSystem` 为 `useEnhancedSkillSystem`
- [ ] 替换所有 `SkillService` 为 `EnhancedSkillService`  
- [ ] 更新技能使用调用的参数结构
- [ ] 移除前端冲突处理逻辑
- [ ] 使用 `phaseUtils` 进行阶段转换
- [ ] 更新技能配置为配置化定义
- [ ] 测试所有技能使用场景
- [ ] 验证冲突处理正常工作
- [ ] 确认类型检查通过

## 注意事项

1. **向后兼容**: 旧版系统标记为 deprecated 但仍可使用，建议逐步迁移
2. **数据库函数**: 确保 `detect_skill_conflicts` 等数据库函数已部署
3. **阶段统一**: 统一使用数字阶段(1-4)，通过工具函数转换
4. **错误处理**: 新版系统有更完善的错误分类和处理机制
5. **测试覆盖**: 迁移后进行充分的集成测试

## 性能改进

- 减少前端冲突处理的计算开销
- 统一的数据库层冲突解决机制  
- 更好的缓存和状态管理
- 类型安全减少运行时错误