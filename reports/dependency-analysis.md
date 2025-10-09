# 依赖分析报告

## 概述

**分析时间**: 2025/10/9 01:55:52
**总文件数**: 298
**循环依赖**: 2
**未使用依赖**: 33
**缺失依赖**: 12
**平均依赖数**: 3.05

## 循环依赖

### 循环 1

```
integrations\supabase\client.ts → integrations\supabase\client.ts → integrations\supabase\client.ts
```

### 循环 2

```
services\errorMonitoringService.ts → utils\automatedSecurityChecker.ts → services\errorMonitoringService.ts → services\errorMonitoringService.ts
```

## 未使用的依赖

- @hookform/resolvers
- @testing-library/react
- @testing-library/user-event
- @types/react-beautiful-dnd
- @types/validator
- date-fns
- eslint-plugin-unused-imports
- jsdom
- tailwindcss-animate
- zod
- serve
- @eslint/js
- @tailwindcss/typography
- @types/express
- @types/node
- @types/react
- @types/react-dom
- @types/supertest
- @vitejs/plugin-react-swc
- @vitest/coverage-v8
- autoprefixer
- eslint
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- globals
- lovable-tagger
- postcss
- prettier
- supertest
- tailwindcss
- typescript
- typescript-eslint
- vite

## 缺失的依赖

- **文件**: components\common\hoc\withErrorBoundary.tsx
- **导入**: @/types/skillSystem.types
- **解析路径**: 无法解析

- **文件**: components\common\hoc\withPermission.tsx
- **导入**: @/types/skillSystem.types
- **解析路径**: 无法解析

- **文件**: components\game\optimized\OptimizedEnhancedSkillPanel.tsx
- **导入**: @/data/skillConfigs
- **解析路径**: 无法解析

- **文件**: components\game\panels\EnhancedSkillPanel.tsx
- **导入**: @/data/skillConfigs
- **解析路径**: 无法解析

- **文件**: services\automatedSecurityService.ts
- **导入**: @/config/security.config
- **解析路径**: 无法解析

- **文件**: services\enhancedSkillService.ts
- **导入**: ./skillSystemValidation
- **解析路径**: 无法解析

- **文件**: services\enhancedSkillService.ts
- **导入**: ../types/skillSystem.types
- **解析路径**: 无法解析

- **文件**: utils\common\dataValidation.ts
- **导入**: @/types/skillSystem.types
- **解析路径**: 无法解析

- **文件**: utils\common\errorHandling.ts
- **导入**: @/types/skillSystem.types
- **解析路径**: 无法解析

- **文件**: utils\common\skillValidation.ts
- **导入**: @/types/skillSystem.types
- **解析路径**: 无法解析

- **文件**: utils\comprehensiveSecurityAudit.ts
- **导入**: @/config/security.config
- **解析路径**: 无法解析

- **文件**: utils\skillSystemValidation.ts
- **导入**: ../types/skillSystem.types
- **解析路径**: 无法解析

## 依赖最多的文件

1. **pages\GamePage.tsx** (21 个依赖)

2. **pages\GameRoom.tsx** (17 个依赖)

3. **components\game\optimized\OptimizedEnhancedSkillPanel.tsx** (15 个依赖)

4. **components\judge\management\JudgeActionPanel.tsx** (15 个依赖)

5. **pages\JudgePage.tsx** (14 个依赖)

6. **components\game\panels\EnhancedSkillPanel.tsx** (13 个依赖)

7. **pages\GameLobby.tsx** (13 个依赖)

8. **App.tsx** (12 个依赖)

9. **components\game\interfaces\EnhancedSkillManager.tsx** (11 个依赖)

10. **components\game\panels\StudentSystemPanel.tsx** (11 个依赖)

## 被使用最多的文件

1. **lib\logger.ts** (被 97 个文件使用)

2. **integrations\supabase\client.ts** (被 61 个文件使用)

3. **components\ui\card.tsx** (被 59 个文件使用)

4. **components\ui\button.tsx** (被 58 个文件使用)

5. **lib\utils.ts** (被 48 个文件使用)

6. **components\ui\badge.tsx** (被 39 个文件使用)

7. **hooks\useToast.ts** (被 31 个文件使用)

8. **providers\AuthProvider.tsx** (被 21 个文件使用)

9. **components\ui\scroll-area.tsx** (被 20 个文件使用)

10. **utils\masterErrorHandler.ts** (被 17 个文件使用)

## 文件复杂度分析

1. **lib\logger.ts**
   - 类型: typescript
   - 大小: 1.00 KB
   - 本地导入: 0
   - 外部导入: 0
   - 依赖数: 0
   - 被依赖数: 97
   - 复杂度: 292.02

2. **integrations\supabase\client.ts**
   - 类型: typescript
   - 大小: 0.87 KB
   - 本地导入: 1
   - 外部导入: 1
   - 依赖数: 1
   - 被依赖数: 61
   - 复杂度: 185.89

3. **components\ui\card.tsx**
   - 类型: react-component
   - 大小: 2.46 KB
   - 本地导入: 1
   - 外部导入: 1
   - 依赖数: 1
   - 被依赖数: 59
   - 复杂度: 181.51

4. **components\ui\button.tsx**
   - 类型: react-component
   - 大小: 2.72 KB
   - 本地导入: 1
   - 外部导入: 4
   - 依赖数: 1
   - 被依赖数: 58
   - 复杂度: 178.79

5. **lib\utils.ts**
   - 类型: typescript
   - 大小: 0.17 KB
   - 本地导入: 0
   - 外部导入: 2
   - 依赖数: 0
   - 被依赖数: 48
   - 复杂度: 144.17

6. **components\ui\badge.tsx**
   - 类型: react-component
   - 大小: 1.69 KB
   - 本地导入: 1
   - 外部导入: 2
   - 依赖数: 1
   - 被依赖数: 39
   - 复杂度: 120.73

7. **hooks\useToast.ts**
   - 类型: typescript
   - 大小: 3.98 KB
   - 本地导入: 0
   - 外部导入: 1
   - 依赖数: 0
   - 被依赖数: 31
   - 复杂度: 97.07

8. **components\layout\LanguageSwitcher.tsx**
   - 类型: react-component
   - 大小: 37.54 KB
   - 本地导入: 3
   - 外部导入: 2
   - 依赖数: 3
   - 被依赖数: 15
   - 复杂度: 89.44

9. **utils\masterErrorHandler.ts**
   - 类型: typescript
   - 大小: 23.91 KB
   - 本地导入: 4
   - 外部导入: 0
   - 依赖数: 4
   - 被依赖数: 17
   - 复杂度: 83.49

10. **hooks\useGameState.ts**

- 类型: typescript
- 大小: 16.65 KB
- 本地导入: 3
- 外部导入: 1
- 依赖数: 3
- 被依赖数: 17
- 复杂度: 74.05

11. **providers\AuthProvider.tsx**

- 类型: react-component
- 大小: 4.76 KB
- 本地导入: 2
- 外部导入: 2
- 依赖数: 2
- 被依赖数: 21
- 复杂度: 71.87

12. **utils\unifiedErrorHandler.ts**

- 类型: typescript
- 大小: 22.78 KB
- 本地导入: 3
- 外部导入: 0
- 依赖数: 3
- 被依赖数: 13
- 复杂度: 68.33

13. **utils\enhancedInputValidation.ts**

- 类型: typescript
- 大小: 44.19 KB
- 本地导入: 2
- 外部导入: 2
- 依赖数: 2
- 被依赖数: 6
- 复杂度: 67.25

14. **components\ui\scroll-area.tsx**

- 类型: react-component
- 大小: 2.00 KB
- 本地导入: 1
- 外部导入: 2
- 依赖数: 1
- 被依赖数: 20
- 复杂度: 64.05

15. **pages\GameRoom.tsx**

- 类型: react-component
- 大小: 23.17 KB
- 本地导入: 17
- 外部导入: 2
- 依赖数: 17
- 被依赖数: 1
- 复杂度: 60.73

16. **components\game\optimized\OptimizedEnhancedSkillPanel.tsx**

- 类型: react-component
- 大小: 27.15 KB
- 本地导入: 15
- 外部导入: 2
- 依赖数: 15
- 被依赖数: 0
- 复杂度: 57.80

17. **utils\enhancedPermissionSystem.ts**

- 类型: typescript
- 大小: 31.86 KB
- 本地导入: 2
- 外部导入: 0
- 依赖数: 2
- 被依赖数: 7
- 复杂度: 57.62

18. **utils\comprehensiveSecurityAudit.ts**

- 类型: typescript
- 大小: 41.05 KB
- 本地导入: 4
- 外部导入: 0
- 依赖数: 4
- 被依赖数: 2
- 复杂度: 56.03

19. **pages\GamePage.tsx**

- 类型: react-component
- 大小: 10.74 KB
- 本地导入: 21
- 外部导入: 2
- 依赖数: 21
- 被依赖数: 1
- 复杂度: 55.99

20. **utils\automatedSecurityChecker.ts**

- 类型: typescript
- 大小: 41.63 KB
- 本地导入: 5
- 外部导入: 0
- 依赖数: 5
- 被依赖数: 1
- 复杂度: 55.63

## 建议

### 循环依赖处理

- 重构代码以消除循环依赖
- 考虑提取公共模块
- 使用依赖注入模式

### 依赖优化

- 移除未使用的依赖包
- 定期清理package.json

### 架构改进

- 考虑将高复杂度文件拆分
- 减少文件间的耦合度
- 建立清晰的模块边界

---

_报告由依赖分析工具生成_
