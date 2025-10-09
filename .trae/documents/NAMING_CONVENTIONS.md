# 项目命名规范指南

## 文件命名规范

### 1. React 组件文件
- **格式**: PascalCase
- **扩展名**: `.tsx`
- **示例**: `GamePage.tsx`, `PlayerAvatar.tsx`, `MonitoringDashboard.tsx`

### 2. Hook 文件
- **格式**: camelCase，以 `use` 开头
- **扩展名**: `.ts` 或 `.tsx`
- **示例**: `useGameState.ts`, `usePlayerRoom.ts`, `useEnhancedSkillSystem.ts`

### 3. 工具函数文件
- **格式**: camelCase
- **扩展名**: `.ts`
- **示例**: `errorHandler.ts`, `debugUtils.ts`, `performanceReporter.ts`

### 4. 服务类文件
- **格式**: camelCase，以 `Service` 结尾
- **扩展名**: `.ts`
- **示例**: `gameService.ts`, `skillSystemService.ts`, `errorHandlingService.ts`

### 5. 类型定义文件
- **格式**: camelCase，以 `types` 结尾
- **扩展名**: `.ts`
- **示例**: `gameTypes.ts`, `skillTypes.ts`, `apiTypes.ts`

### 6. UI 组件文件（shadcn/ui）
- **格式**: kebab-case
- **扩展名**: `.tsx`
- **示例**: `alert-dialog.tsx`, `dropdown-menu.tsx`, `input-otp.tsx`

### 7. 配置文件
- **格式**: camelCase，以 `.config` 结尾
- **扩展名**: `.ts`
- **示例**: `performance.config.ts`, `security.config.ts`

## 变量和函数命名规范

### 1. 变量命名
- **格式**: camelCase
- **示例**: `playerData`, `gameState`, `skillEffects`

### 2. 常量命名
- **格式**: SCREAMING_SNAKE_CASE
- **示例**: `MAX_PLAYERS`, `DEFAULT_TIMEOUT`, `ERROR_MESSAGES`

### 3. 函数命名
- **格式**: camelCase
- **动词开头**: `handleClick`, `fetchData`, `validateInput`
- **布尔返回**: `isValid`, `hasPermission`, `canExecute`

### 4. 类命名
- **格式**: PascalCase
- **示例**: `GameService`, `SkillManager`, `ErrorHandler`

### 5. 接口命名
- **格式**: PascalCase
- **可选前缀**: `I` 或无前缀
- **示例**: `Player`, `GameState`, `ISkillEffect`

### 6. 类型别名命名
- **格式**: PascalCase
- **示例**: `PlayerRole`, `SkillType`, `GamePhase`

### 7. 枚举命名
- **枚举名**: PascalCase
- **枚举值**: SCREAMING_SNAKE_CASE
- **示例**: 
```typescript
enum GamePhase {
  DAY_DISCUSSION = 'DAY_DISCUSSION',
  NIGHT_ACTION = 'NIGHT_ACTION',
  VOTING = 'VOTING'
}
```

## 组件命名规范

### 1. React 组件
- **格式**: PascalCase
- **示例**: `PlayerAvatar`, `GameBoard`, `SkillPanel`

### 2. 组件 Props 接口
- **格式**: 组件名 + `Props`
- **示例**: `PlayerAvatarProps`, `GameBoardProps`

### 3. 组件状态接口
- **格式**: 组件名 + `State`
- **示例**: `GamePageState`, `PlayerPanelState`

## 目录命名规范

### 1. 功能模块目录
- **格式**: camelCase 或 kebab-case
- **示例**: `components`, `hooks`, `services`, `utils`

### 2. 组件分类目录
- **格式**: camelCase
- **示例**: `game`, `lobby`, `admin`, `voting`

### 3. UI 组件目录
- **格式**: kebab-case
- **示例**: `ui` (shadcn/ui 组件)

## 数据库命名规范

### 1. 表名
- **格式**: snake_case
- **示例**: `game_rooms`, `player_skills`, `vote_records`

### 2. 字段名
- **格式**: snake_case
- **示例**: `player_id`, `created_at`, `skill_type`

### 3. 索引名
- **格式**: `idx_` + 表名 + `_` + 字段名
- **示例**: `idx_game_rooms_status`, `idx_players_room_id`

## Git 分支命名规范

### 1. 功能分支
- **格式**: `feature/` + kebab-case
- **示例**: `feature/skill-system`, `feature/voting-mechanism`

### 2. 修复分支
- **格式**: `fix/` + kebab-case
- **示例**: `fix/memory-leak`, `fix/voting-bug`

### 3. 重构分支
- **格式**: `refactor/` + kebab-case
- **示例**: `refactor/error-handling`, `refactor/performance-optimization`

## 注释和文档命名规范

### 1. JSDoc 注释
- **函数描述**: 动词开头，简洁明了
- **参数描述**: 名词性短语
- **返回值描述**: 说明返回的内容和类型

### 2. 文档文件
- **格式**: SCREAMING_SNAKE_CASE.md
- **示例**: `README.md`, `API_DOCUMENTATION.md`, `DEPLOYMENT_GUIDE.md`

## 自动化检查工具配置

### 1. ESLint 规则
```javascript
{
  "@typescript-eslint/naming-convention": [
    "error",
    {
      "selector": "variableLike",
      "format": ["camelCase"]
    },
    {
      "selector": "typeLike",
      "format": ["PascalCase"]
    },
    {
      "selector": "enumMember",
      "format": ["UPPER_CASE"]
    }
  ]
}
```

### 2. 文件命名检查脚本
- 检查组件文件是否使用 PascalCase
- 检查 Hook 文件是否以 `use` 开头
- 检查服务文件是否以 `Service` 结尾

## 迁移指南

### 需要重命名的文件
1. `use-mobile.tsx` → `useMobile.ts`
2. `use-toast.ts` → `useToast.ts`
3. 其他不符合规范的文件

### 重命名步骤
1. 使用 IDE 的重构功能进行安全重命名
2. 更新所有导入语句
3. 运行测试确保没有破坏性变更
4. 提交变更

## 最佳实践

1. **一致性**: 在整个项目中保持命名风格一致
2. **可读性**: 使用有意义的名称，避免缩写
3. **简洁性**: 名称应该简洁但不失清晰
4. **上下文**: 在特定上下文中，名称应该有意义
5. **团队约定**: 遵循团队约定的命名规范

## 工具推荐

1. **ESLint**: 自动检查命名规范
2. **Prettier**: 代码格式化
3. **TypeScript**: 类型检查
4. **VS Code 扩展**: 
   - ESLint
   - Prettier
   - TypeScript Importer
   - Auto Rename Tag