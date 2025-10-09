# 代码质量分析报告

## 概述

**生成时间**: 2025/10/9 12:26:53

## 总体指标

| 指标 | 数值 |
|------|------|
| 文件数量 | 336 |
| 总行数 | 119248 |
| 代码行数 | 79838 |
| 注释行数 | 26276 |
| 可维护性指数 | 47.90 |
| 技术债务 | 6573.50 小时 |

## 代码异味

发现 **6085** 个代码异味：


- **Long Function** (medium) - components\admin\MonitoringDashboard.tsx:98
  - 函数 getStatusText 有 125 行，建议拆分

- **Long Function** (medium) - components\admin\PerformanceDashboard.tsx:201
  - 函数 handleClearData 有 241 行，建议拆分

- **Long Function** (medium) - components\admin\SkillSystemMonitor.tsx:251
  - 函数 getHealthIcon 有 285 行，建议拆分

- **Long Function** (medium) - components\chat\MultiChannelChat.tsx:118
  - 函数 getChannelDisplayName 有 83 行，建议拆分

- **Large Class** (high) - components\common\hoc\withErrorBoundary.tsx:172
  - 类 ErrorBoundaryHOC 有 39 个方法，建议拆分

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:258
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:259
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:261
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:262
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withErrorBoundary.tsx:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:229
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:230
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:231
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:232
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:233
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:234
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:235
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:236
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withLoading.tsx:250
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\common\hoc\withPermission.tsx:297
  - 函数 checkPermissions 有 75 行，建议拆分

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:299
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:300
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:301
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:302
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:305
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:306
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:307
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:308
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:311
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:325
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:326
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:327
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:328
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:329
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:330
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:331
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\common\hoc\withPermission.tsx:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\debug\DebugTools.tsx:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\debug\DebugTools.tsx:323
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\debug\PerformanceMonitor.tsx:427
  - 函数 clearHistory 有 304 行，建议拆分

- **Long Function** (medium) - components\dialogs\GameRulesDialog.tsx:112
  - 函数 trigger 有 251 行，建议拆分

- **Long Function** (medium) - components\dialogs\LoginDialog.tsx:198
  - 函数 handleLogout 有 154 行，建议拆分

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\dialogs\LoginDialog.tsx:165
  - 嵌套深度 5，建议重构

- **Large Class** (high) - components\error\ErrorBoundary.tsx:82
  - 类 ErrorBoundary 有 57 个方法，建议拆分

- **Deep Nesting** (medium) - components\error\ErrorBoundary.tsx:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorBoundary.tsx:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\error\ErrorBoundary.tsx:364
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\error\ErrorDisplayComponent.tsx:217
  - 函数 getImpactIcon 有 262 行，建议拆分

- **Long Parameter List** (low) - components\ErrorBoundary.tsx:135
  - 函数 result 有 9 个参数，建议使用对象参数

- **Large Class** (high) - components\ErrorBoundary.tsx:71
  - 类 ErrorBoundary 有 48 个方法，建议拆分

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ErrorBoundary.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:186
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:187
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:188
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:189
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:190
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:192
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:193
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:194
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:195
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:196
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:197
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:198
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:199
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:200
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:201
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:202
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:203
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\accessibility\AccessibilityEnhancement.tsx:204
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:195
  - 函数 getPlayerCardClass 有 99 行，建议拆分

- **Deep Nesting** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\displays\GamePlayerStatusDisplay.tsx:247
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\displays\GameStateDisplay.tsx:113
  - 函数 canAdvancePhase 有 170 行，建议拆分

- **Long Function** (medium) - components\game\displays\RoleSkillInfo.tsx:123
  - 函数 getFactionColor 有 73 行，建议拆分

- **Long Function** (medium) - components\game\displays\SkillEffectsDisplay.tsx:143
  - 函数 getProgressPercentage 有 66 行，建议拆分

- **Long Function** (medium) - components\game\feedback\OperationFeedback.tsx:120
  - 函数 renderIcon 有 96 行，建议拆分

- **Deep Nesting** (medium) - components\game\feedback\OperationFeedback.tsx:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\feedback\OperationFeedback.tsx:84
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:182
  - 函数 triggerHunterDying 有 236 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\EnhancedSkillManager.tsx:118
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\NightSkillInterface.tsx:173
  - 函数 getSkillStatusColor 有 154 行，建议拆分

- **Long Parameter List** (low) - components\game\interfaces\NightSkillInterface.tsx:121
  - 函数 result 有 6 个参数，建议使用对象参数

- **Long Function** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:245
  - 函数 parseInvestigationResult 有 83 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\RoleSpecificSkills.tsx:302
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\SkillConflictResolver.tsx:184
  - 函数 getResolutionRuleText 有 187 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:259
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:260
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:261
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:262
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:292
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\SkillConflictResolver.tsx:294
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:89
  - 函数 handleUsePoison 有 112 行，建议拆分

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:97
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:98
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:99
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\interfaces\UnifiedWitchSkillInterface.tsx:101
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:145
  - 函数 OptimizedEnhancedSkillPanel 有 14 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:354
  - 函数 result 有 7 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:217
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:218
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\OptimizedEnhancedSkillPanel.tsx:486
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\optimized\PerformanceMonitor.tsx:355
  - 函数 getTrendIcon 有 331 行，建议拆分

- **Long Parameter List** (low) - components\game\optimized\PerformanceMonitor.tsx:139
  - 函数 PerformanceMonitor 有 8 个参数，建议使用对象参数

- **Long Function** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:463
  - 函数 offset 有 86 行，建议拆分

- **Long Parameter List** (low) - components\game\optimized\SkillEffectsVirtualList.tsx:112
  - 函数 SkillEffectsVirtualList 有 8 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:273
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:274
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\optimized\SkillEffectsVirtualList.tsx:275
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\EnhancedSkillPanel.tsx:334
  - 函数 interval 有 303 行，建议拆分

- **Long Parameter List** (low) - components\game\panels\EnhancedSkillPanel.tsx:109
  - 函数 EnhancedSkillPanel 有 10 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\panels\EnhancedSkillPanel.tsx:230
  - 函数 result 有 7 个参数，建议使用对象参数

- **Long Function** (medium) - components\game\panels\GameInfoPanel.tsx:71
  - 函数 getGameStatusDisplay 有 112 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSettingsPanel.tsx:78
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\GameSkillPanel.tsx:124
  - 函数 handleUseSkill 有 120 行，建议拆分

- **Long Parameter List** (low) - components\game\panels\GameSkillPanel.tsx:83
  - 函数 canUseSkill 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\GameSkillPanel.tsx:111
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\PlayerStatusManager.tsx:176
  - 函数 getStatusChangeAnimation 有 111 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:104
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:105
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:106
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:133
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:134
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\PlayerStatusManager.tsx:246
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\RoleStatusPanel.tsx:76
  - 函数 togglePlayerExpansion 有 139 行，建议拆分

- **Long Function** (medium) - components\game\panels\SkillSystemManager.tsx:105
  - 函数 stats 有 141 行，建议拆分

- **Long Function** (medium) - components\game\panels\SkillUsePanel.tsx:182
  - 函数 handleSkillUse 有 78 行，建议拆分

- **Long Parameter List** (low) - components\game\panels\SkillUsePanel.tsx:114
  - 函数 result 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\panels\SkillUsePanel.tsx:185
  - 函数 frontendValidation 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\game\panels\SkillUsePanel.tsx:199
  - 函数 result 有 6 个参数，建议使用对象参数

- **Long Function** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:204
  - 函数 getStatusMessage 有 129 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentAnswerRecordPanel.tsx:313
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\panels\StudentSystemPanel.tsx:491
  - 函数 getGameStatusInfo 有 98 行，建议拆分

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:441
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:442
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:443
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:444
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:445
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:446
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:447
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:448
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:449
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:450
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:451
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:452
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:453
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:454
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:455
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:459
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:460
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\panels\StudentSystemPanel.tsx:466
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\skill\SkillConflictVisualization.tsx:156
  - 函数 getResolutionExplanation 有 177 行，建议拆分

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:91
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:92
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:93
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:94
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\skill\SkillConflictVisualization.tsx:307
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\smart-hints\SmartHintSystem.tsx:327
  - 函数 getPriorityBadge 有 101 行，建议拆分

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:157
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:208
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:213
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\smart-hints\SmartHintSystem.tsx:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentPreviousQuestionDisplay.tsx:73
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\game\student\StudentQuestionDisplay.tsx:68
  - 函数 getOptionText 有 93 行，建议拆分

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\game\student\StudentQuestionDisplay.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\hoc\withErrorBoundary.tsx:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\hoc\withErrorBoundary.tsx:70
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\AnswerRecordPanel.tsx:159
  - 函数 getStatusMessage 有 141 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:78
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:81
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:82
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:83
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:247
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:267
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:268
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:269
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:270
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:271
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:272
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:273
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:274
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:275
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:276
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:277
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\AnswerRecordPanel.tsx:278
  - 嵌套深度 6，建议重构

- **Long Function** (medium) - components\judge\management\JudgeActionPanel.tsx:155
  - 函数 handleQuitJudge 有 166 行，建议拆分

- **Long Function** (medium) - components\judge\management\PlayerStatusPanel.tsx:190
  - 函数 playerOnline 有 56 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\PlayerStatusPanel.tsx:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PlayerStatusPanel.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\PreparationPhaseDialog.tsx:138
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\QuestionBankDialog.tsx:461
  - 函数 updateManualQuestion 有 89 行，建议拆分

- **Long Parameter List** (low) - components\judge\management\QuestionBankDialog.tsx:436
  - 函数 questionsToSave 有 11 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:204
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:205
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:208
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:209
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:210
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:211
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:212
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:213
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:214
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:215
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:270
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankDialog.tsx:405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:354
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:406
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:407
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:467
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:480
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:481
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:482
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:483
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:484
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:485
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:486
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:487
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:488
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:489
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:490
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:491
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:492
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:502
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:503
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:504
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:505
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:506
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:507
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:508
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:509
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:510
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionBankPanel.tsx:511
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\QuestionOrderEditor.tsx:77
  - 函数 getDifficultyLabel 有 88 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:123
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:124
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionOrderEditor.tsx:150
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\management\QuestionPreview.tsx:84
  - 函数 getPhaseLabel 有 146 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\QuestionPreview.tsx:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionPreview.tsx:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionPreview.tsx:164
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\management\QuestionPreview.tsx:170
  - 嵌套深度 6，建议重构

- **Long Function** (medium) - components\judge\management\TeacherSystemPanel.tsx:128
  - 函数 getGameStatusInfo 有 92 行，建议拆分

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\management\TeacherSystemPanel.tsx:180
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\monitoring\DyingStatusResolutionPanel.tsx:81
  - 函数 getDyingReasonText 有 132 行，建议拆分

- **Long Function** (medium) - components\judge\monitoring\EnhancedGameStateDisplay.tsx:106
  - 函数 getGameStatusDisplay 有 96 行，建议拆分

- **Deep Nesting** (medium) - components\judge\monitoring\EnhancedGameStateDisplay.tsx:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:214
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:231
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:256
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:269
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:270
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:271
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:272
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:273
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:274
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\judge\monitoring\PlayerStatusDisplay.tsx:280
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\judge\monitoring\SkillSystemDashboard.tsx:128
  - 函数 getSystemStatus 有 313 行，建议拆分

- **Deep Nesting** (medium) - components\layout\Navbar.tsx:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\layout\Navbar.tsx:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\layout\Navbar.tsx:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\layout\Navbar.tsx:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\layout\Navbar.tsx:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\layout\Navbar.tsx:150
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\lobby\AvatarUpload.tsx:98
  - 函数 oldPath 有 60 行，建议拆分

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\lobby\AvatarUpload.tsx:143
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\lobby\PlayerStats.tsx:53
  - 函数 getLevelInfo 有 52 行，建议拆分

- **Long Function** (medium) - components\room\PlayersList.tsx:105
  - 函数 getReadyButtonText 有 188 行，建议拆分

- **Long Function** (medium) - components\room\RoleSelection.tsx:186
  - 函数 getRoleDesignById 有 241 行，建议拆分

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:297
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:298
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:299
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:300
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:301
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:302
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:303
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:304
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:305
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoleSelection.tsx:353
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\room\RoomInfoCard.tsx:71
  - 函数 fetchRoomInfo 有 56 行，建议拆分

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:98
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\room\RoomInfoCard.tsx:118
  - 嵌套深度 5，建议重构

- **Large Class** (high) - components\shared\hoc\withErrorBoundary.tsx:139
  - 类 ErrorBoundary 有 31 个方法，建议拆分

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:150
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:177
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:178
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:179
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:180
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:182
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:183
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:192
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:193
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:194
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:214
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:215
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:216
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:217
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:253
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withErrorBoundary.tsx:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:253
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:255
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:256
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:257
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:261
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:262
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:263
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:264
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:265
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:266
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:267
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:268
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:279
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:280
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:281
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:285
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:286
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:287
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:288
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:289
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:290
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:291
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:292
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:293
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:294
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:295
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:296
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:297
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:298
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:301
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:302
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:303
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:304
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:309
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:326
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:327
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:328
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:520
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:521
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:524
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:531
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:532
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withLoading.tsx:534
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - components\shared\hoc\withPermission.tsx:446
  - 函数 checkPermission 有 66 行，建议拆分

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:318
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:319
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:365
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:381
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:382
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:397
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\shared\hoc\withPermission.tsx:398
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\ui\badge.tsx:34
  - 函数 badgeVariants 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\ui\button.tsx:36
  - 函数 buttonVariants 有 13 个参数，建议使用对象参数

- **Long Parameter List** (low) - components\ui\button.tsx:72
  - 函数 Button 有 8 个参数，建议使用对象参数

- **Long Function** (medium) - components\ui\carousel.tsx:113
  - 函数 scrollNext 有 57 行，建议拆分

- **Long Function** (medium) - components\ui\chart.tsx:225
  - 函数 key 有 93 行，建议拆分

- **Deep Nesting** (medium) - components\ui\chart.tsx:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:124
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:125
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:126
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:127
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:128
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:129
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:247
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:248
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:249
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:250
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:251
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:252
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:253
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:256
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:257
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:258
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:345
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\ui\chart.tsx:346
  - 嵌套深度 6，建议重构

- **Long Parameter List** (low) - components\ui\sheet.tsx:83
  - 函数 sheetVariants 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - components\ui\skill-progress-indicator.tsx:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\skill-progress-indicator.tsx:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\skill-progress-indicator.tsx:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\skill-progress-indicator.tsx:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\ui\skill-progress-indicator.tsx:217
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - components\ui\toggle.tsx:35
  - 函数 toggleVariants 有 8 个参数，建议使用对象参数

- **Long Function** (medium) - components\voting\EnhancedVotingManager.tsx:194
  - 函数 handleProcessResults 有 165 行，建议拆分

- **Long Function** (medium) - components\voting\VotingPanel.tsx:193
  - 函数 handleCreateSession 有 325 行，建议拆分

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:321
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:322
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:323
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:382
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:393
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:394
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - components\voting\VotingPanel.tsx:453
  - 嵌套深度 5，建议重构

- **Large Class** (high) - config\errorMessages.ts:652
  - 类 ErrorMessageManager 有 27 个方法，建议拆分

- **Deep Nesting** (medium) - config\validationRules.ts:721
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - config\validationRules.ts:722
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - config\validationRules.ts:723
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - config\validationRules.ts:724
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - contexts\JudgePageContext.tsx:187
  - 函数 refreshLinkedQuestions 有 58 行，建议拆分

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:107
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:108
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:109
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:117
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:120
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\JudgePageContext.tsx:194
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - contexts\PermissionContext.tsx:121
  - 函数 effects 有 54 行，建议拆分

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - contexts\PermissionContext.tsx:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useDataFetch.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useDataFetch.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useDataFetch.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useDataFetch.ts:532
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useDataFetch.ts:533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useDataFetch.ts:534
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:579
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:581
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:609
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:645
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:646
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:647
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:648
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:649
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:650
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:654
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:655
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:663
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:701
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:702
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:778
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:779
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:801
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\shared\useForm.ts:802
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - hooks\shared\useGameState.ts:281
  - 函数 result 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:83
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:84
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillData.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:36
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:37
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:38
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:39
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillRealtime.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillStats.ts:75
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:31
  - 函数 validateSkillFrontend 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:91
  - 函数 useSkillEnhanced 有 8 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:104
  - 函数 frontendValidation 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\skill\useSkillValidation.ts:207
  - 函数 canUseSkill 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\skill\useSkillValidation.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:140
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:141
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:142
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoDyingStatusProcessor.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:33
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:41
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:60
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:63
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:64
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:65
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:66
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:92
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:93
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:94
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:96
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:97
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useAutoProcessDayVote.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:40
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:41
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:42
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:43
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:45
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:46
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDataCache.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useDyingStatusManager.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:234
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:235
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:236
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:237
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:238
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedErrorHandler.ts:245
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - hooks\useEnhancedSkillSystem.ts:63
  - 函数 skillUsesSubscription 有 8 个参数，建议使用对象参数

- **Long Parameter List** (low) - hooks\useEnhancedSkillSystem.ts:91
  - 函数 skillEffectsSubscription 有 6 个参数，建议使用对象参数

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEnhancedSkillSystem.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEveningRefresh.ts:31
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEveningRefresh.ts:32
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useEveningRefresh.ts:33
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useGameState.ts:52
  - 函数 fetchGameData 有 60 行，建议拆分

- **Long Function** (medium) - hooks\useGameState.ts:248
  - 函数 settings 有 69 行，建议拆分

- **Deep Nesting** (medium) - hooks\useGameState.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:78
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:81
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:82
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:83
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:84
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:90
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:97
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:98
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:99
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:238
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:403
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:404
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:406
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:454
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:497
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useGameState.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:91
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:93
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:99
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMemoryManager.ts:189
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useMultiChannelChat.ts:100
  - 函数 fetchMessages 有 55 行，建议拆分

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:122
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:123
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:124
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:125
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:134
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:136
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:141
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:142
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useMultiChannelChat.ts:243
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useOptimizedSupabaseQuery.ts:164
  - 函数 refetch 有 69 行，建议拆分

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useOptimizedSupabaseQuery.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:144
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceMonitoring.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:111
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:112
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:177
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePerformanceOptimizationNew.ts:195
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\usePermissions.ts:23
  - 函数 checkPermissions 有 54 行，建议拆分

- **Deep Nesting** (medium) - hooks\usePermissions.ts:25
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:26
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:27
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:28
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:37
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePermissions.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:41
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:42
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:43
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:44
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:45
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:46
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:47
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerPresence.ts:107
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\usePlayerRoom.ts:68
  - 函数 leaveCurrentRoom 有 57 行，建议拆分

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayerRoom.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:38
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:68
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:69
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:70
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:71
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:72
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:73
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:74
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:75
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:76
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:82
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:83
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:84
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:85
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:86
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:87
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:88
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:89
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:90
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:91
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:92
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:93
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:94
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:95
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:96
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:97
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:98
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:99
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:100
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:101
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:102
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:103
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:104
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\usePlayersRealtime.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:55
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:56
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:57
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:58
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:59
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:60
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:61
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleDesigns.ts:63
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useRoleSelection.ts:41
  - 函数 fetchRoleSelections 有 52 行，建议拆分

- **Deep Nesting** (medium) - hooks\useRoleSelection.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleSelection.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:65
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:66
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:67
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:68
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:69
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoleStates.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:64
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:65
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:66
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:67
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:68
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomAnswers.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:52
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:53
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:54
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:55
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:62
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:64
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:69
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:70
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomChat.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomCleanup.ts:23
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomCleanup.ts:24
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:36
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:37
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:38
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:39
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:40
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:41
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomRealtime.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:59
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:60
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:61
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:62
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:64
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:65
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:66
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:67
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:69
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:72
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:105
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:108
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:109
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useRoomTransition.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:74
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:75
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:76
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:150
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectAutoProcessor.ts:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:118
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useSkillEffectProcessor.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:183
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:202
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useToast.ts:203
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useUXOptimization.ts:259
  - 函数 getSmartSuggestions 有 105 行，建议拆分

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:226
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:227
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:228
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:229
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useUXOptimization.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:108
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:109
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:110
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVoteResults.ts:126
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useVotingSystem.ts:451
  - 函数 getVotersForTarget 有 120 行，建议拆分

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:270
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:271
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:272
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:273
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:276
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:277
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:278
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:279
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:281
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:282
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:283
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:284
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:313
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:475
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:482
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:483
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:491
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:492
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:493
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:496
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:497
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:498
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:500
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useVotingSystem.ts:513
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - hooks\useWitchPotionManager.ts:137
  - 函数 useAttackPotion 有 90 行，建议拆分

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - hooks\useWitchPotionManager.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:17
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:18
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:19
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:20
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:21
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:22
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:23
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:24
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:25
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:26
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:27
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:29
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:30
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:31
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:32
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:33
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:34
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:35
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:36
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:37
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:38
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:40
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:41
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:42
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:43
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:44
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:54
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:55
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:58
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:59
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:60
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:61
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:66
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:80
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:134
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:149
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:150
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:239
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:263
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:345
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:365
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:367
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:369
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:370
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:381
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:398
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:399
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:400
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:401
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:402
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:404
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:406
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:407
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:410
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:411
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:414
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:416
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:417
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:423
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:424
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:425
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:426
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:430
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:431
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:432
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:433
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:451
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:453
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:454
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:459
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:460
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:461
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:462
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:467
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:475
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:478
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:479
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:481
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:482
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:483
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:488
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:489
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:490
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:492
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:493
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:504
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:513
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:514
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:516
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:517
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:518
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:519
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:520
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:521
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:522
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:523
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:527
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:528
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:529
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:530
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:531
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:534
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:535
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:536
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:537
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:538
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:539
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:541
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:543
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:547
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:549
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:550
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:551
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:552
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:555
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:560
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:561
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:563
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:566
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:567
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:569
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:570
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:572
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:573
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:576
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:578
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:579
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:580
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:581
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:582
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:583
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:584
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:585
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:586
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:587
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:588
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:590
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:591
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:593
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:594
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:595
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:596
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:597
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:598
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:601
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:602
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:603
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:604
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:605
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:606
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:607
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:608
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:609
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:612
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:615
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:616
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:618
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:619
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:620
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:621
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:622
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:624
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:625
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:626
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:627
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:628
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:629
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:630
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:631
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:632
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:633
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:635
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:636
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:637
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:638
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:639
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:640
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:641
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:642
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:643
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:645
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:646
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:647
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:648
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:649
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:650
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:651
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:652
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:653
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:655
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:656
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:657
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:659
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:661
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:662
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:663
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:664
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:665
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:668
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:669
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:670
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:671
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:672
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:673
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:674
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:675
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:676
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:677
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:678
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:679
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:680
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:681
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:682
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:684
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:685
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:686
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:687
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:688
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:689
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:690
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:691
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:692
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:693
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:694
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:695
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:696
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:697
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:698
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:700
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:701
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:702
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:703
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:704
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:705
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:706
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:707
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:708
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:709
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:710
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:711
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:712
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:713
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:716
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:717
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:718
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:719
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:720
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:722
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:723
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:724
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:725
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:726
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:728
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:729
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:730
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:731
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:732
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:734
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:735
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:736
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:737
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:738
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:740
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:741
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:742
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:743
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:744
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:746
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:747
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:748
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:749
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:750
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:751
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:752
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:753
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:754
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:755
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:756
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:757
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:758
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:759
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:760
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:761
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:762
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:764
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:765
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:766
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:767
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:768
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:769
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:771
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:772
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:773
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:774
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:775
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:776
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:777
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:778
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:779
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:781
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:782
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:783
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:784
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:785
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:786
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:787
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:788
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:789
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:790
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:791
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:792
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:793
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:794
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:795
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:796
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:798
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:799
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:800
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:801
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:802
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:804
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:805
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:806
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:807
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:808
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:809
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:810
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:811
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:812
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:813
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:814
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:815
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:816
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:817
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:819
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:820
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:821
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:822
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:823
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:824
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:825
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:826
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:827
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:828
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:829
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:830
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:831
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:833
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:834
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:835
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:836
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:837
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:838
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:839
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:840
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:841
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:842
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:843
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:844
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:845
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:847
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:848
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:849
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:850
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:851
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:853
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:854
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:855
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:856
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:857
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:859
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:860
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:861
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:862
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:863
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:864
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:866
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:867
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:868
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:869
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:870
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:872
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:873
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:874
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:875
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:876
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:878
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:879
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:880
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:881
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:882
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:884
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:885
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:886
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:887
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:888
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:889
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:890
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:891
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:892
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:893
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:895
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:896
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:897
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:898
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:899
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:900
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:901
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:902
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:903
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:905
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:906
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:907
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:908
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:909
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:910
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:911
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:912
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:913
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:917
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:918
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:919
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:920
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:921
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:922
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:923
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:924
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:926
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:927
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:928
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:929
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:930
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:931
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:932
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:934
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:935
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:936
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:937
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:938
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:939
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:940
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:942
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:943
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:944
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:945
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:946
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:948
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:949
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:950
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:951
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:952
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:953
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:954
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:955
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:956
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:958
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:959
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:960
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:961
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:962
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:963
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:964
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:965
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:967
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:968
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:969
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:970
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:971
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:972
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:973
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:974
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:976
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:977
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:978
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:979
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:980
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:982
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:983
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:984
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:985
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:986
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:987
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:988
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:989
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:990
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:991
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:992
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:993
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:994
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:996
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:997
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:998
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:999
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1000
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1001
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1002
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1003
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1004
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1005
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1006
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1007
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1009
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1010
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1011
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1012
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1013
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1014
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1015
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1016
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1017
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1018
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1019
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1020
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1022
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1023
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1024
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1025
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1026
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1028
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1029
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1030
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1031
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1032
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1033
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1034
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1035
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1036
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1037
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1038
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1039
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1041
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1042
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1043
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1044
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1045
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1046
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1047
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1048
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1049
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1050
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1051
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1053
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1054
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1055
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1056
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1057
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1058
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1059
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1060
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1061
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1062
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1063
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1069
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1070
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1071
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1072
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1073
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1079
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1081
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1082
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1083
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1085
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1089
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1093
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1097
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1139
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1140
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1163
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1180
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1182
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1199
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1219
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1276
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1345
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1354
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - integrations\supabase\types.ts:1358
  - 嵌套深度 5，建议重构

- **Large Class** (high) - lib\debugUtils.ts:46
  - 类 PerformanceMonitor 有 27 个方法，建议拆分

- **Large Class** (high) - lib\performanceReporter.ts:18
  - 类 PerformanceReporter 有 74 个方法，建议拆分

- **Deep Nesting** (medium) - lib\performanceReporter.ts:79
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:81
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:82
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:83
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:105
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:106
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - lib\performanceReporter.ts:123
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - middleware\apiSecurityMiddleware.ts:437
  - 函数 validationResult 有 11 个参数，建议使用对象参数

- **Large Class** (high) - middleware\apiSecurityMiddleware.ts:178
  - 类 ApiSecurityMiddleware 有 294 个方法，建议拆分

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:342
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:397
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:402
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:403
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:404
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:406
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:407
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:408
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:420
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:421
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:422
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:423
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:424
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:425
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:426
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:427
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:428
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:429
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:430
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:431
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:432
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:449
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:450
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:451
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:452
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:453
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:572
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:573
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:585
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:586
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:587
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:588
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:589
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:590
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:591
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:592
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:593
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\apiSecurityMiddleware.ts:594
  - 嵌套深度 5，建议重构

- **Large Class** (high) - middleware\permissionMiddleware.ts:157
  - 类 PermissionMiddleware 有 229 个方法，建议拆分

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:236
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:237
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:238
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:239
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:240
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:258
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:552
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:553
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:601
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:602
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:603
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:604
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:630
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:631
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:632
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:633
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:685
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - middleware\permissionMiddleware.ts:687
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - pages\GameLobby.tsx:312
  - 函数 roomId 有 61 行，建议拆分

- **Long Function** (medium) - pages\GameLobby.tsx:400
  - 函数 roomId 有 61 行，建议拆分

- **Long Function** (medium) - pages\GameLobby.tsx:557
  - 函数 playAsJudge 有 100 行，建议拆分

- **Deep Nesting** (medium) - pages\GameLobby.tsx:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameLobby.tsx:216
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - pages\GamePage.tsx:74
  - 函数 canUse 有 6 个参数，建议使用对象参数

- **Long Function** (medium) - pages\GameRoom.tsx:548
  - 函数 handleLeaveRoom 有 149 行，建议拆分

- **Deep Nesting** (medium) - pages\GameRoom.tsx:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:108
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:109
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:110
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:111
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:159
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:160
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:161
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:201
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:207
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:210
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:214
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:215
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:223
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:237
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:238
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:239
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:240
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:241
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:242
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:243
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:247
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:253
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:255
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:256
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:257
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:258
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:259
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:260
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:261
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:262
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:263
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:264
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:265
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:266
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:267
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:268
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:269
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:270
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:271
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:272
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:273
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:274
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:275
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:276
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:277
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:278
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:279
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:280
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:281
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:282
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:283
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:284
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:289
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:304
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:309
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:311
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:314
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:315
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:316
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:317
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:318
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:319
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:320
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:321
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:322
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:323
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:324
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:325
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:326
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:327
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:328
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:329
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:330
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:331
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:332
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:333
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:334
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:335
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:336
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:337
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:338
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:339
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:340
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:341
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:342
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:343
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:344
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:345
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:422
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:423
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:424
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:425
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:478
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:479
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:480
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:482
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:483
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:552
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:559
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - pages\GameRoom.tsx:560
  - 嵌套深度 5，建议重构

- **Large Class** (high) - patterns\factory\SkillFactory.ts:63
  - 类 SkillFactory 有 106 个方法，建议拆分

- **Long Parameter List** (low) - patterns\observer\EventEmitter.ts:635
  - 函数 globalEventEmitter 有 6 个参数，建议使用对象参数

- **Large Class** (high) - patterns\observer\EventEmitter.ts:88
  - 类 EventEmitter 有 144 个方法，建议拆分

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:433
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:434
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:490
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:491
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:492
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:493
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:503
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:504
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:710
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\observer\EventEmitter.ts:711
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - patterns\strategy\ValidationStrategy.ts:744
  - 函数 defaultValidationManager 有 7 个参数，建议使用对象参数

- **Large Class** (high) - patterns\strategy\ValidationStrategy.ts:127
  - 类 ValidationStrategyManager 有 152 个方法，建议拆分

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:374
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:379
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:380
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:381
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:382
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:383
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:384
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:399
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:400
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:401
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:402
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:403
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:404
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:405
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:406
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:407
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:451
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:487
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:559
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:560
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:561
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:576
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:577
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:578
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - patterns\strategy\ValidationStrategy.ts:579
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:67
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:68
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:73
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:81
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:82
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:83
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - providers\AuthProvider.tsx:122
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\AnalyticsService.ts:33
  - 类 AnalyticsService 有 120 个方法，建议拆分

- **Deep Nesting** (medium) - services\AnalyticsService.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:85
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:87
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:88
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:89
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:120
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:121
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:122
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:151
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:231
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:232
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:233
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:234
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:235
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:250
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:253
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:255
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AnalyticsService.ts:273
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - services\AutomatedSecurityService.ts:503
  - 函数 autoFixLevels 有 127 行，建议拆分

- **Large Class** (high) - services\AutomatedSecurityService.ts:78
  - 类 AutomatedSecurityService 有 174 个方法，建议拆分

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:467
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:470
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:475
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\AutomatedSecurityService.ts:477
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - services\CacheService.ts:1006
  - 函数 listeners 有 133 行，建议拆分

- **Large Class** (high) - services\CacheService.ts:137
  - 类 CacheService 有 318 个方法，建议拆分

- **Deep Nesting** (medium) - services\CacheService.ts:422
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:459
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:460
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:461
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:504
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:514
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:515
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:516
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:517
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:541
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:812
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:813
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:814
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:933
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:934
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:935
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:936
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:937
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:938
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:939
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:940
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:941
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:942
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:965
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:966
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:967
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:968
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:973
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1021
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1022
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1023
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1024
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1025
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1026
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1027
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1028
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1029
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1030
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1048
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1062
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1086
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1087
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1088
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1089
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1090
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1091
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1092
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1093
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1094
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1095
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1096
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1097
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\CacheService.ts:1098
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\ConfigurationService.ts:104
  - 类 ConfigurationService 有 220 个方法，建议拆分

- **Deep Nesting** (medium) - services\ConfigurationService.ts:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:236
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:405
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:410
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:417
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:424
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:493
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:538
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:539
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:540
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:671
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:672
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:673
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:674
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:701
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:702
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:703
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:704
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:706
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:707
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:708
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:754
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:755
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:756
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:757
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:758
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:759
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:760
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:761
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:762
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:763
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:764
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:765
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:766
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:767
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:768
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:769
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:770
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:771
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:772
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:773
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:774
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:775
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:776
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:777
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:778
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:779
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:780
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:781
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:782
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:783
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:784
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:785
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:786
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:787
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:788
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:789
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:790
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:791
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:796
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:797
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:798
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:799
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:800
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:801
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:802
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:803
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:804
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:805
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:806
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:807
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:808
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:809
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:810
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:811
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:812
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:813
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:814
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:815
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:816
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:817
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:818
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:823
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:824
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:825
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:826
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:827
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:828
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:833
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:834
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:835
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:836
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:837
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:838
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:843
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:844
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:845
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:846
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:847
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:848
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:853
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:854
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:855
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:856
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:857
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:858
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:859
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:860
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:861
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:862
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:863
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:864
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:865
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:866
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:867
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:872
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:873
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:874
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:875
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:876
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:877
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:878
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:879
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:880
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:881
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:882
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:883
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:884
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:885
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:886
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:965
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:966
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:967
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:968
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:995
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:996
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1010
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1011
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1012
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1013
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1021
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1022
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1023
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1024
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1077
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1078
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1079
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1082
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1083
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1084
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1086
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1087
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ConfigurationService.ts:1088
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\DyingStatusService.ts:22
  - 类 DyingStatusService 有 30 个方法，建议拆分

- **Long Parameter List** (low) - services\EnhancedSkillService.ts:152
  - 函数 validation 有 6 个参数，建议使用对象参数

- **Long Parameter List** (low) - services\EnhancedSkillService.ts:296
  - 函数 skillError 有 7 个参数，建议使用对象参数

- **Long Parameter List** (low) - services\EnhancedSkillService.ts:322
  - 函数 networkError 有 7 个参数，建议使用对象参数

- **Large Class** (high) - services\EnhancedSkillService.ts:63
  - 类 EnhancedSkillService 有 156 个方法，建议拆分

- **Long Parameter List** (low) - services\ErrorHandlingService.ts:202
  - 函数 error 有 11 个参数，建议使用对象参数

- **Long Parameter List** (low) - services\ErrorHandlingService.ts:223
  - 函数 error 有 9 个参数，建议使用对象参数

- **Large Class** (high) - services\ErrorHandlingService.ts:136
  - 类 ErrorHandlingService 有 228 个方法，建议拆分

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:209
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:210
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:211
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:212
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:214
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:215
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:230
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:231
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:233
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:234
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:252
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:407
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:410
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:411
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:583
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:584
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:585
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:586
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:587
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:588
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:589
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:590
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:591
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:592
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:593
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:594
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:595
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:596
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:597
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:598
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:599
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:600
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:601
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:637
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:638
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:639
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:640
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:645
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:666
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:802
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:803
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorHandlingService.ts:804
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - services\ErrorMonitoringService.ts:1011
  - 函数 screen 有 87 行，建议拆分

- **Large Class** (high) - services\ErrorMonitoringService.ts:267
  - 类 ErrorMonitoringService 有 225 个方法，建议拆分

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:608
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:625
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:626
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:653
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:654
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:655
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:672
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:673
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:674
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:675
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:676
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:677
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:678
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:679
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:817
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:818
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ErrorMonitoringService.ts:823
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\GameService.ts:12
  - 类 GameService 有 38 个方法，建议拆分

- **Long Function** (medium) - services\GameStateService.ts:182
  - 函数 configValidation 有 86 行，建议拆分

- **Long Parameter List** (low) - services\GameStateService.ts:598
  - 函数 finalState 有 9 个参数，建议使用对象参数

- **Large Class** (high) - services\GameStateService.ts:95
  - 类 GameStateService 有 260 个方法，建议拆分

- **Large Class** (high) - services\index.ts:70
  - 类 ServiceManager 有 42 个方法，建议拆分

- **Deep Nesting** (medium) - services\index.ts:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\index.ts:268
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\MonitoringService.ts:34
  - 类 MonitoringService 有 78 个方法，建议拆分

- **Deep Nesting** (medium) - services\MonitoringService.ts:69
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:70
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:73
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:74
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:75
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:76
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:83
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:84
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:98
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:99
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\MonitoringService.ts:102
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\NotificationService.ts:247
  - 类 NotificationService 有 220 个方法，建议拆分

- **Deep Nesting** (medium) - services\NotificationService.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:369
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:370
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:569
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:939
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:940
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1044
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1045
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1060
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1061
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1062
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1063
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1064
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\NotificationService.ts:1065
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\PassiveSkillService.ts:17
  - 类 PassiveSkillService 有 54 个方法，建议拆分

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:36
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:45
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:46
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:47
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:48
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:49
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:50
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:51
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:52
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:53
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:56
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:57
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:88
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:96
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:107
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:108
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:198
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PassiveSkillService.ts:224
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\PerformanceMonitoringService.ts:125
  - 类 PerformanceMonitoringService 有 223 个方法，建议拆分

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:237
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:238
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:242
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:243
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:245
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:246
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:247
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:248
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:258
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:259
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:260
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:261
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:262
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:263
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:264
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:265
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:266
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:267
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:268
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:269
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:279
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:280
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:281
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:282
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:283
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:284
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:285
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:286
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:287
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:288
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:444
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:452
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:503
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:522
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:523
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:529
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:530
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:531
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:532
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:533
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:534
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:535
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:536
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:537
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:538
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:539
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:540
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:541
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:542
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:543
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:544
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:545
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:546
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:547
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:548
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:549
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:550
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:551
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:552
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:553
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:554
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:555
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:561
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:681
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:682
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\PerformanceMonitoringService.ts:706
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - services\RoomService.ts:40
  - 函数 authenticatedUserId 有 73 行，建议拆分

- **Large Class** (high) - services\RoomService.ts:12
  - 类 RoomService 有 61 个方法，建议拆分

- **Large Class** (high) - services\SecurityAuditService.ts:119
  - 类 SecurityAuditService 有 161 个方法，建议拆分

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:181
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:249
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:251
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:252
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:253
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:255
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:256
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:257
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:292
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:293
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:294
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:295
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:296
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:309
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:311
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:354
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:367
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:368
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:369
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:370
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:371
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:453
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:492
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:509
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:521
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:522
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:523
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:524
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:527
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:528
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:529
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:530
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:531
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:532
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:533
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:534
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:535
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:536
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:537
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:538
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:539
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:540
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:541
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:542
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:543
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:544
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:545
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:598
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:599
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SecurityAuditService.ts:600
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - services\SkillExecutionService.ts:273
  - 函数 validationResult 有 6 个参数，建议使用对象参数

- **Large Class** (high) - services\SkillExecutionService.ts:125
  - 类 SkillExecutionService 有 139 个方法，建议拆分

- **Long Parameter List** (low) - services\SkillSystemService.ts:228
  - 函数 effectsData 有 6 个参数，建议使用对象参数

- **Large Class** (high) - services\SkillSystemService.ts:71
  - 类 SkillSystemService 有 139 个方法，建议拆分

- **Deep Nesting** (medium) - services\SkillSystemService.ts:100
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:101
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:102
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:186
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:274
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:283
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:291
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:292
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:301
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:310
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:317
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:319
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:403
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SkillSystemService.ts:420
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - services\SystemAnnouncementService.ts:66
  - 函数 message 有 159 行，建议拆分

- **Large Class** (high) - services\SystemAnnouncementService.ts:28
  - 类 SystemAnnouncementService 有 41 个方法，建议拆分

- **Deep Nesting** (medium) - services\SystemAnnouncementService.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SystemAnnouncementService.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\SystemAnnouncementService.ts:167
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - services\ValidationService.ts:402
  - 函数 validationPromises 有 52 行，建议拆分

- **Large Class** (high) - services\ValidationService.ts:128
  - 类 ValidationService 有 189 个方法，建议拆分

- **Deep Nesting** (medium) - services\ValidationService.ts:426
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ValidationService.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ValidationService.ts:428
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ValidationService.ts:429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - services\ValidationService.ts:430
  - 嵌套深度 5，建议重构

- **Large Class** (high) - services\VotingService.ts:12
  - 类 VotingService 有 25 个方法，建议拆分

- **Long Function** (medium) - utils\advancedInputValidationSystem.ts:988
  - 函数 levels 有 168 行，建议拆分

- **Large Class** (high) - utils\advancedInputValidationSystem.ts:255
  - 类 AdvancedInputValidationSystem 有 248 个方法，建议拆分

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:509
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:510
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:512
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:513
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:514
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:547
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:549
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:550
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:856
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:857
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:858
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedInputValidationSystem.ts:859
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\advancedRBACSystem.ts:380
  - 类 AdvancedRBACSystem 有 299 个方法，建议拆分

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:470
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:501
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:670
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:671
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:716
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:722
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:723
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:724
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:725
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:726
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:727
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:728
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:749
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:750
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:751
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:752
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:753
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:757
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:758
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:759
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:760
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:764
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:765
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:766
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:767
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:877
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:878
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:879
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:880
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:881
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:882
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:962
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:963
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:964
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:965
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:987
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:1009
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\advancedRBACSystem.ts:1017
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\apiSecurityConfig.ts:384
  - 类 ApiSecurityConfigManager 有 209 个方法，建议拆分

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:451
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:452
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:453
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:454
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:463
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:464
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:465
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:484
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:486
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:487
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:488
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:489
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:490
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:491
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:492
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:493
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:494
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:497
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:498
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:499
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:500
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:509
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:524
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:527
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:529
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:530
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:531
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:532
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:549
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:551
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:555
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:570
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:571
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:573
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:577
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:578
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:590
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:591
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:595
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:596
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:597
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:598
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:611
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:612
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:613
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:615
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:616
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:619
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:620
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:621
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:662
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:663
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:664
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:665
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:682
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:713
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:714
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:716
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:798
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:799
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:800
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:856
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:857
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:858
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:859
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:860
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:927
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:928
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:929
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:930
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:931
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:948
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:949
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:951
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:952
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:953
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\apiSecurityConfig.ts:1034
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\automatedSecurityChecker.ts:196
  - 类 AutomatedSecurityChecker 有 384 个方法，建议拆分

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:422
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:486
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:590
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:641
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:689
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:737
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:785
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:833
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:860
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:876
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:877
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:878
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:879
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:880
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:881
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:882
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:883
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:884
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:885
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:886
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:929
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:933
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:934
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:936
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:937
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:975
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:976
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:977
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:978
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:979
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\automatedSecurityChecker.ts:980
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\codeAnalyzer.ts:43
  - 类 CodeAnalyzer 有 142 个方法，建议拆分

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:99
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:100
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:101
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:102
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:103
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:104
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:105
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:106
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:107
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:108
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:109
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:144
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:145
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:147
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:148
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:209
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:210
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:211
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:212
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:237
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:238
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:239
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:240
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:242
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:244
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:246
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:264
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:265
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:275
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:276
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:277
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:278
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:283
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:284
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:285
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:286
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:385
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\codeAnalyzer.ts:420
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\common\cacheUtils.ts:88
  - 类 MemoryCache 有 115 个方法，建议拆分

- **Large Class** (high) - utils\common\cacheUtils.ts:452
  - 类 LocalStorageCache 有 63 个方法，建议拆分

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:602
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:603
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:604
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:605
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:606
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:607
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:608
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:609
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:610
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:611
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:612
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:677
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:678
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:718
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\cacheUtils.ts:719
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\common\stateHelpers.ts:224
  - 类 RoleStatusManager 有 33 个方法，建议拆分

- **Large Class** (high) - utils\common\stateHelpers.ts:342
  - 类 SkillUsageManager 有 47 个方法，建议拆分

- **Deep Nesting** (medium) - utils\common\stateHelpers.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\stateHelpers.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\stateHelpers.ts:321
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\stateHelpers.ts:482
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\common\stateHelpers.ts:483
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\componentRenderOptimizer.ts:40
  - 类 ComponentRenderOptimizer 有 35 个方法，建议拆分

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:489
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:490
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:491
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:492
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:493
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\componentRenderOptimizer.ts:494
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\comprehensiveSecurityAudit.ts:122
  - 类 ComprehensiveSecurityAudit 有 281 个方法，建议拆分

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:218
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:219
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:409
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:410
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:411
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:414
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:415
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:416
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:417
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:461
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:462
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:463
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:464
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:465
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:466
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:467
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:468
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:469
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:470
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:471
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:472
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:473
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:576
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:577
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:578
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:579
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:580
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:581
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:582
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:583
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:584
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:585
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:599
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:618
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:619
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:620
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:621
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:622
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:624
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:625
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:626
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:635
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:659
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:660
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:661
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:662
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:663
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:664
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:665
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:666
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:667
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:668
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:669
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\comprehensiveSecurityAudit.ts:681
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\debugSystem.ts:99
  - 类 DebugSystem 有 147 个方法，建议拆分

- **Large Class** (high) - utils\documentationGenerator.ts:90
  - 类 DocumentationGenerator 有 62 个方法，建议拆分

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:267
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:268
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:269
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:365
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:508
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:509
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:510
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:511
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:547
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\documentationGenerator.ts:548
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\enhancedInputValidation.ts:659
  - 函数 lower 有 140 行，建议拆分

- **Large Class** (high) - utils\enhancedInputValidation.ts:231
  - 类 EnhancedInputValidator 有 328 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:396
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:397
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:398
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:399
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:400
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:401
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:402
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:403
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:404
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:405
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:406
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:407
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:408
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:418
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:420
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:432
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:470
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:471
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:495
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:496
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:497
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:498
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:499
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:500
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:501
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:502
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:503
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:504
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:505
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:506
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:507
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:508
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:509
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:510
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:511
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:512
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:513
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:514
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:515
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:516
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:517
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:518
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:519
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:520
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:521
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:522
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:523
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:524
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:525
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:526
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:527
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:528
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:529
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:530
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:531
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:532
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:533
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:534
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:535
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:557
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:558
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:559
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:560
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:561
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:581
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:582
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:584
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:586
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:595
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:596
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:597
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:598
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:616
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:617
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:618
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:619
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:620
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:621
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:622
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:624
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:625
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:626
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:627
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:628
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:629
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:630
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:631
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:632
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:633
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:634
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:635
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:636
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:637
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:638
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:639
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:640
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:641
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:642
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:643
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:644
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:645
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:646
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:647
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:648
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:649
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:650
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:651
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:652
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:653
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:654
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:655
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:656
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:657
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:658
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:659
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:660
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:661
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:662
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:663
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:664
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:665
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:666
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:668
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:669
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:670
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:671
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:672
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:673
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:674
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:675
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:676
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:677
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:678
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:679
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:680
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:681
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:682
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:683
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:684
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:685
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:686
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:687
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:688
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:689
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:690
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:691
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:692
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:693
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:694
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:695
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:696
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:697
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:698
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:699
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:700
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:701
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:702
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:703
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:704
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:705
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:706
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:707
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:708
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:709
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:710
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:711
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:712
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:713
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:714
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:715
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:716
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:717
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:718
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:719
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:720
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:721
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:722
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:723
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:724
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:725
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:726
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:727
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:728
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:729
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:730
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:731
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:732
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:733
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:734
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:735
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:736
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:737
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:738
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:739
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:740
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:741
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:742
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:743
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:744
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:745
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:746
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:747
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:748
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:749
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:750
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:751
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:752
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:753
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:754
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:755
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:756
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:757
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:758
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:759
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:760
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:761
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:762
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:763
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:764
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:765
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:766
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:767
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:768
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:769
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:771
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:772
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:773
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:774
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:775
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:776
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:777
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:778
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:779
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:780
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:781
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:782
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:783
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:784
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:785
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:786
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:787
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:788
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:789
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:790
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:791
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:792
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:793
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:794
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:795
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:796
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:797
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:799
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:800
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:801
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:802
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:803
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:804
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:805
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:806
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:807
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:808
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:825
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:826
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:827
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:828
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:829
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:830
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:831
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:832
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:833
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:834
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:835
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:836
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:837
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:838
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:839
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:840
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:841
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:842
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:843
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:844
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:845
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:846
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:847
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:848
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:850
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:851
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:852
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:853
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:854
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:855
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:856
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:857
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:858
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:859
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:877
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:878
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:879
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:880
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:881
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:882
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:883
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:884
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:885
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:889
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:890
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:891
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:892
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:893
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:894
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:895
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:896
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:897
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:898
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:902
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:903
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:904
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:905
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:906
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:907
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:908
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:909
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:910
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:911
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:929
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:930
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:931
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:932
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:933
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:934
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:935
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:936
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:937
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:941
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:942
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:943
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:944
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:945
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:946
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:947
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:948
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:949
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:950
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:954
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:955
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:956
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:957
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:958
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:959
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:960
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:961
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:962
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:963
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:980
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:981
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:982
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:983
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:984
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:985
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:986
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:987
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:988
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:993
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:994
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:995
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:996
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:997
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:998
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:999
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1000
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1001
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1024
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1025
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1026
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1027
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1028
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1029
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1030
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1031
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1032
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1037
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1038
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1039
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1040
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1041
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1042
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1043
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1044
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1045
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1046
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1047
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1049
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1050
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1051
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1052
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1053
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1054
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1055
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1056
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1057
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1058
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1077
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1078
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1079
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1080
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1081
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1082
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1083
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1084
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1085
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1090
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1091
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1092
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1093
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1094
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1095
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1096
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1097
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1098
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1099
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1103
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1104
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1105
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1106
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1107
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1108
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1109
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1110
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1111
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1119
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1120
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1121
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1122
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1123
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1124
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1125
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1126
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1127
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1133
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1134
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1135
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1136
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1137
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1138
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1139
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1140
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1141
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1142
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1161
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1162
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1163
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1164
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1165
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1166
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1167
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1176
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1177
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1178
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1179
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1180
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1181
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1182
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1183
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1189
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1190
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1191
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1192
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1193
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1194
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1195
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1196
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1197
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1202
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1203
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1204
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1205
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1206
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1209
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1210
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1211
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1212
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1213
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1216
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1217
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1218
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1219
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1220
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1221
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1239
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1240
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1241
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1242
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1243
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1244
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1245
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1254
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1255
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1256
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1257
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1258
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1259
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1260
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1261
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1262
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1263
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1264
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1265
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1270
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1271
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1272
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1273
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1274
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1275
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1276
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1277
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1278
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1279
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1280
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1281
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1288
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1289
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1290
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1291
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1292
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1293
  - 嵌套深度 9，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1294
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1295
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1296
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1297
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1298
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1299
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1372
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1373
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1374
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1375
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1429
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1430
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1447
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1532
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1533
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1554
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedInputValidation.ts:1555
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\enhancedPermissionSystem.ts:940
  - 函数 now 有 170 行，建议拆分

- **Large Class** (high) - utils\enhancedPermissionSystem.ts:246
  - 类 EnhancedPermissionSystem 有 233 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:571
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:572
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:573
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:575
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:611
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:612
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:623
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:628
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:824
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedPermissionSystem.ts:825
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\enhancedQueryCacheStrategy.ts:706
  - 函数 metrics 有 99 行，建议拆分

- **Large Class** (high) - utils\enhancedQueryCacheStrategy.ts:209
  - 类 EnhancedQueryCacheStrategy 有 198 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedQueryCacheStrategy.ts:569
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\enhancedRealtimeManager.ts:176
  - 函数 existingCallbacks 有 53 行，建议拆分

- **Large Class** (high) - utils\enhancedRealtimeManager.ts:106
  - 类 EnhancedRealtimeManager 有 238 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:317
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:321
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:322
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:411
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:412
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:413
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:419
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:420
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:421
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:422
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:423
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:458
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:459
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:594
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:595
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:596
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:597
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:669
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:670
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:824
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedRealtimeManager.ts:825
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\enhancedSkillSystemOptimizer.ts:447
  - 函数 metrics 有 65 行，建议拆分

- **Large Class** (high) - utils\enhancedSkillSystemOptimizer.ts:89
  - 类 EnhancedSkillSystemOptimizer 有 125 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:222
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:223
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:224
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:225
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:226
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:227
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:228
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:229
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:230
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:231
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:232
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:301
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:302
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:303
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:304
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedSkillSystemOptimizer.ts:380
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\enhancedUserErrorInterface.ts:223
  - 函数 category 有 52 行，建议拆分

- **Large Class** (high) - utils\enhancedUserErrorInterface.ts:152
  - 类 EnhancedUserErrorInterface 有 60 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedUserErrorInterface.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserErrorInterface.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserErrorInterface.ts:306
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\enhancedUserNotificationSystem.ts:120
  - 类 EnhancedUserNotificationSystem 有 235 个方法，建议拆分

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:466
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:467
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:470
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:471
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:472
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:473
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:475
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:476
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:478
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:485
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:645
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:646
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:647
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:648
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:649
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:650
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:651
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:652
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:653
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:862
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:863
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:864
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\enhancedUserNotificationSystem.ts:865
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\errorClassifier.ts:53
  - 类 ErrorClassifier 有 89 个方法，建议拆分

- **Deep Nesting** (medium) - utils\errorHandler.ts:146
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - utils\errorHandlingExamples.ts:31
  - 函数 result 有 6 个参数，建议使用对象参数

- **Large Class** (high) - utils\errorHandlingExamples.ts:83
  - 类 FormValidationExample 有 29 个方法，建议拆分

- **Large Class** (high) - utils\errorHandlingExamples.ts:157
  - 类 GameOperationExample 有 25 个方法，建议拆分

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:23
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:32
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:61
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:62
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:63
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:64
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:65
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:93
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:94
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:95
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:96
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:97
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:203
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:205
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:211
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:212
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:213
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:290
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:341
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:342
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:343
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:344
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:345
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:346
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:382
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorHandlingExamples.ts:385
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\errorMonitoringAndReporting.ts:159
  - 类 ErrorMonitoringAndReportingSystem 有 185 个方法，建议拆分

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:245
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:420
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:421
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:545
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:546
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:716
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:717
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\errorMonitoringAndReporting.ts:722
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\globalErrorMonitor.ts:747
  - 函数 oneHourAgo 有 64 行，建议拆分

- **Large Class** (high) - utils\globalErrorMonitor.ts:174
  - 类 GlobalErrorMonitor 有 192 个方法，建议拆分

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:361
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:362
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:363
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:706
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\globalErrorMonitor.ts:735
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\improvedErrorSystem.ts:185
  - 函数 errorRecord 有 71 行，建议拆分

- **Large Class** (high) - utils\improvedErrorSystem.ts:23
  - 类 ErrorRecoveryStrategy 有 25 个方法，建议拆分

- **Large Class** (high) - utils\improvedErrorSystem.ts:135
  - 类 ImprovedErrorSystem 有 73 个方法，建议拆分

- **Deep Nesting** (medium) - utils\improvedErrorSystem.ts:214
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\inputValidationManager.ts:236
  - 类 InputValidationManager 有 267 个方法，建议拆分

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:584
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\inputValidationManager.ts:585
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\intelligentCacheStrategy.ts:1002
  - 函数 stats 有 54 行，建议拆分

- **Long Parameter List** (low) - utils\intelligentCacheStrategy.ts:560
  - 函数 promises 有 6 个参数，建议使用对象参数

- **Large Class** (high) - utils\intelligentCacheStrategy.ts:125
  - 类 IntelligentCacheStrategy 有 303 个方法，建议拆分

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:302
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:305
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:306
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:307
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:308
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:309
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:310
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:311
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:312
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:313
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:314
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:315
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:316
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:442
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:468
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:562
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:563
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:565
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\intelligentCacheStrategy.ts:566
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\jsdocGenerator.ts:134
  - 类 JSDocGenerator 有 132 个方法，建议拆分

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:348
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:349
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:351
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:354
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:375
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:376
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:379
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:389
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:391
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:514
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:515
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:516
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:517
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:518
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:519
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:520
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:549
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:550
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:551
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:552
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:553
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:554
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:555
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:556
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:588
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:589
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:590
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:591
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:592
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:593
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:594
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:595
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:596
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:715
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:716
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:717
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:718
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\jsdocGenerator.ts:719
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\masterErrorHandler.ts:168
  - 类 MasterErrorHandler 有 127 个方法，建议拆分

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:277
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:278
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:279
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:378
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\masterErrorHandler.ts:402
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\memoryLeakPrevention.ts:477
  - 函数 currentUsage 有 58 行，建议拆分

- **Large Class** (high) - utils\memoryLeakPrevention.ts:83
  - 类 MemoryLeakPrevention 有 130 个方法，建议拆分

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:136
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:137
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:138
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:220
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:221
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:222
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:223
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:224
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:315
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:316
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:317
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:318
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:345
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:348
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:423
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:424
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:425
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:426
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:427
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:444
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:445
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:446
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:447
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:457
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:458
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:459
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:460
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryLeakPrevention.ts:461
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\memoryManagementSystem.ts:72
  - 类 MemoryManagementSystem 有 174 个方法，建议拆分

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:288
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:343
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:344
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:345
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:469
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:470
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:471
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:472
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:473
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:474
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:477
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:478
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:479
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:480
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:481
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:482
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\memoryManagementSystem.ts:483
  - 嵌套深度 6，建议重构

- **Long Function** (medium) - utils\optimizedQueryCache.ts:454
  - 函数 now 有 85 行，建议拆分

- **Large Class** (high) - utils\optimizedQueryCache.ts:75
  - 类 OptimizedQueryCache 有 168 个方法，建议拆分

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:274
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:594
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:595
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:596
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedQueryCache.ts:597
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\optimizedRenderingSystem.ts:99
  - 函数 existing 有 110 行，建议拆分

- **Large Class** (high) - utils\optimizedRenderingSystem.ts:50
  - 类 OptimizedRenderingSystem 有 54 个方法，建议拆分

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:82
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:83
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:84
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:85
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:86
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\optimizedRenderingSystem.ts:90
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\command.ts:39
  - 类 CommandInvoker 有 26 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\decorator.ts:160
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\decorator.ts:161
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\decorator.ts:162
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\decorator.ts:163
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\decorator.ts:164
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\decorator.ts:165
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\factory.ts:25
  - 类 AbstractFactory 有 33 个方法，建议拆分

- **Large Class** (high) - utils\patterns\factory.ts:166
  - 类 AsyncFactory 有 38 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\factory.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\factory.ts:360
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\patterns\index.ts:233
  - 函数 pattern 有 92 行，建议拆分

- **Large Class** (high) - utils\patterns\index.ts:189
  - 类 PatternRegistry 有 35 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\index.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\index.ts:287
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\index.ts:288
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\index.ts:289
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\observer.ts:39
  - 类 EventEmitter 有 86 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\observer.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:146
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:184
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:191
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:200
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:201
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\observer.ts:235
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\patterns\singleton.ts:18
  - 类 Singleton 有 36 个方法，建议拆分

- **Large Class** (high) - utils\patterns\singleton.ts:204
  - 类 ThreadSafeSingleton 有 34 个方法，建议拆分

- **Large Class** (high) - utils\patterns\singleton.ts:286
  - 类 SingletonRegistry 有 37 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:77
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:78
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:79
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:80
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:81
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:145
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:271
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:272
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:273
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:354
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:355
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:430
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\singleton.ts:431
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\patterns\strategy.ts:363
  - 函数 index 有 62 行，建议拆分

- **Large Class** (high) - utils\patterns\strategy.ts:35
  - 类 StrategyContext 有 62 个方法，建议拆分

- **Large Class** (high) - utils\patterns\strategy.ts:240
  - 类 ConditionalStrategySelector 有 24 个方法，建议拆分

- **Large Class** (high) - utils\patterns\strategy.ts:333
  - 类 StrategyChain 有 24 个方法，建议拆分

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:206
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:284
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:386
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:387
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:388
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:393
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\patterns\strategy.ts:395
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\performanceCriticalFixes.ts:49
  - 类 PerformanceCriticalFixes 有 110 个方法，建议拆分

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:85
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:86
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:119
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:120
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:121
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:122
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:123
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:132
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:152
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:153
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:154
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:155
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:157
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:158
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:165
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:169
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:170
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:171
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:172
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:174
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:178
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:179
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:185
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:186
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:187
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:188
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:189
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:190
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:225
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:227
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:228
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:229
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:230
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:282
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:283
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:289
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:290
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:291
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:292
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:299
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\performanceCriticalFixes.ts:300
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\queryCacheOptimizer.ts:201
  - 类 QueryCacheOptimizer 有 283 个方法，建议拆分

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:293
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:294
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:295
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:297
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:298
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:299
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:300
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:301
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:302
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:303
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:304
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:305
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:306
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:329
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:330
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:331
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:333
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:361
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:362
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:363
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:364
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:365
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:366
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:369
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:370
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:391
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:393
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:394
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:397
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:398
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:399
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:400
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:401
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:402
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:403
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:606
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:607
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:608
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:702
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:703
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:704
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:705
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:710
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:711
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:712
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:713
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:718
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:719
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:720
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:721
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:794
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:795
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\queryCacheOptimizer.ts:815
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\realtimeSubscriptionManager.ts:129
  - 类 RealtimeSubscriptionManager 有 280 个方法，建议拆分

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:266
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:317
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:318
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:319
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:320
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:324
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:330
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:331
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:332
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:350
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:351
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:352
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:361
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:368
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:369
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:370
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:390
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:391
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:392
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:431
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:432
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:433
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:441
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:442
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:443
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:454
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:455
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:456
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:457
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:541
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:542
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:543
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:544
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:547
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:548
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:550
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:551
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:552
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:553
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:567
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:568
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:569
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:570
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:571
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:572
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:573
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:574
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:592
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:593
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:612
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:613
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:614
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:680
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:684
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:752
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:753
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:754
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:755
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:756
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:792
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:793
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\realtimeSubscriptionManager.ts:794
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\roleConfiguration.ts:164
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\roleConfiguration.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\roleConfiguration.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\roleConfiguration.ts:196
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\securityEnhancement.ts:35
  - 类 SecurityEnhancement 有 97 个方法，建议拆分

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:87
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:93
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:170
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:171
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:240
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:294
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:296
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:297
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:340
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:341
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityEnhancement.ts:347
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\securityMiddleware.ts:60
  - 类 SecurityMiddleware 有 93 个方法，建议拆分

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:93
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:94
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:95
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:110
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:111
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:112
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:113
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:114
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:124
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:125
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:126
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:135
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:136
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:137
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:138
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:139
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:140
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:141
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:142
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:143
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:144
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:145
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:146
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:147
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:148
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:149
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:150
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:151
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:152
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:153
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:154
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:155
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:156
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:159
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:166
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:167
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:168
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:169
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:174
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:175
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:176
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:177
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:178
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:179
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:180
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:181
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:182
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:183
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:187
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:188
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:189
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:192
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:193
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:194
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:196
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:197
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:198
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:199
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:200
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:201
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:202
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:203
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:204
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:207
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:208
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:214
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:215
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:216
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:218
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:219
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:220
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:221
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:222
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:223
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:224
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:225
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:226
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:233
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:241
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:242
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:243
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:248
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:249
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:250
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:251
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:262
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:305
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:306
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:313
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:314
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:319
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:320
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:321
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:322
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:323
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:331
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:345
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:346
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:347
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:351
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:352
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:353
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:356
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:357
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:358
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:359
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:360
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:361
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:362
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:363
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:369
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:370
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:371
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:372
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:373
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:374
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:375
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:376
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:377
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:380
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:383
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:384
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:385
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:386
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:387
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\securityMiddleware.ts:388
  - 嵌套深度 7，建议重构

- **Large Class** (high) - utils\skillBatchProcessor.ts:27
  - 类 SkillBatchProcessor 有 128 个方法，建议拆分

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:70
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:71
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:72
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:127
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:128
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:130
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:234
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:235
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:238
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:296
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:297
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:298
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\skillBatchProcessor.ts:299
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\skillCache.ts:29
  - 类 SkillCacheManager 有 79 个方法，建议拆分

- **Deep Nesting** (medium) - utils\skillDataStandardizer.ts:217
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillDataStandardizer.ts:251
  - 嵌套深度 5，建议重构

- **Long Parameter List** (low) - utils\skillErrorHandler.ts:268
  - 函数 skillError 有 7 个参数，建议使用对象参数

- **Large Class** (high) - utils\skillErrorHandler.ts:28
  - 类 SkillErrorHandler 有 63 个方法，建议拆分

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:115
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:116
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:117
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:118
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:129
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:130
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:131
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillErrorHandler.ts:132
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\skillSystemCache.ts:22
  - 类 SkillSystemCache 有 101 个方法，建议拆分

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:126
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillSystemValidation.ts:143
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:89
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:90
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:91
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:92
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:104
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:105
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:106
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\skillUsageRestrictions.ts:107
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\unifiedCacheManager.ts:211
  - 类 UnifiedCacheManager 有 199 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:325
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:326
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:327
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:328
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:329
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:330
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:332
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:333
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:334
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:335
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:336
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:435
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:436
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:437
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:438
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:439
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:440
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:766
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:770
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:777
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedCacheManager.ts:781
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\unifiedErrorHandler.ts:109
  - 类 UnifiedErrorHandler 有 155 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:172
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:173
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:195
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:196
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:246
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:247
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:255
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:259
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:260
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:261
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:311
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:312
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorHandler.ts:404
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\unifiedErrorManager.ts:737
  - 函数 retryableTypes 有 61 行，建议拆分

- **Large Class** (high) - utils\unifiedErrorManager.ts:129
  - 类 UnifiedErrorManager 有 184 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:231
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:232
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:253
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:254
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:285
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:286
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:298
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:299
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:300
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:301
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:302
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:303
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:304
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:307
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:308
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:309
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:310
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:564
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:565
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorManager.ts:566
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\unifiedErrorSystem.ts:413
  - 函数 enhancedContext 有 127 行，建议拆分

- **Large Class** (high) - utils\unifiedErrorSystem.ts:233
  - 类 UnifiedErrorSystem 有 251 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:337
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:338
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:339
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:364
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:365
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:366
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:367
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:368
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:369
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:370
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:371
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:394
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:395
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:448
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:449
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:450
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:451
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:452
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:595
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:596
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:602
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:615
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:616
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:633
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:659
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:660
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:661
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:662
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:666
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:667
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:668
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:669
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:705
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:706
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:707
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:708
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:709
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:710
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:711
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:712
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:713
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:714
  - 嵌套深度 8，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:715
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:716
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:717
  - 嵌套深度 7，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:718
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:719
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:720
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:721
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:722
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:723
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:724
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:725
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:726
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:727
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:728
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:774
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:775
  - 嵌套深度 6，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:776
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:777
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:1396
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedErrorSystem.ts:1397
  - 嵌套深度 5，建议重构

- **Large Class** (high) - utils\unifiedPermissionManager.ts:256
  - 类 UnifiedPermissionManager 有 262 个方法，建议拆分

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:769
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\unifiedPermissionManager.ts:778
  - 嵌套深度 5，建议重构

- **Long Function** (medium) - utils\userNotificationSystem.ts:760
  - 函数 notifications 有 109 行，建议拆分

- **Large Class** (high) - utils\userNotificationSystem.ts:156
  - 类 UserNotificationSystem 有 215 个方法，建议拆分

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:280
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:281
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:300
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:502
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:607
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:608
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:778
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:779
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:842
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:843
  - 嵌套深度 5，建议重构

- **Deep Nesting** (medium) - utils\userNotificationSystem.ts:844
  - 嵌套深度 5，建议重构


## 重复代码

发现 **3531** 处重复代码：


- components\admin\MonitoringDashboard.tsx (行 60) 与 components\admin\MonitoringDashboard.tsx (行 61)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 63) 与 components\admin\MonitoringDashboard.tsx (行 64)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 66) 与 components\admin\MonitoringDashboard.tsx (行 67)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 131) 与 components\admin\MonitoringDashboard.tsx (行 146)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 131) 与 components\admin\MonitoringDashboard.tsx (行 161)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 115) 与 components\admin\PerformanceDashboard.tsx (行 116)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 160) 与 components\admin\PerformanceDashboard.tsx (行 161)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 215) 与 components\admin\PerformanceDashboard.tsx (行 216)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 217) 与 components\admin\PerformanceDashboard.tsx (行 218)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 297) 与 components\admin\PerformanceDashboard.tsx (行 310)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 297) 与 components\admin\PerformanceDashboard.tsx (行 327)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 371) 与 components\admin\PerformanceDashboard.tsx (行 398)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 17) 与 components\admin\SkillSystemMonitor.tsx (行 1)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 34) 与 components\admin\SkillSystemMonitor.tsx (行 31)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 45) 与 components\admin\SkillSystemMonitor.tsx (行 46)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 89) 与 components\admin\SkillSystemMonitor.tsx (行 90)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 98) 与 components\admin\SkillSystemMonitor.tsx (行 99)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 182) 与 components\admin\SkillSystemMonitor.tsx (行 183)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 258) 与 components\admin\SkillSystemMonitor.tsx (行 259)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 348) 与 components\admin\SkillSystemMonitor.tsx (行 358)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 348) 与 components\admin\SkillSystemMonitor.tsx (行 368)
  - 相似度: 100.0%

- components\chat\ChatChannelSelector.tsx (行 9) 与 components\chat\ChatChannelSelector.tsx (行 10)
  - 相似度: 100.0%

- components\chat\ChatMessage.tsx (行 32) 与 components\chat\ChatMessage.tsx (行 33)
  - 相似度: 100.0%

- components\chat\ChatMessage.tsx (行 56) 与 components\chat\ChatMessage.tsx (行 57)
  - 相似度: 100.0%

- components\chat\ChatMessage.tsx (行 88) 与 components\chat\ChatMessage.tsx (行 89)
  - 相似度: 100.0%

- components\chat\ChatMessage.tsx (行 99) 与 components\chat\ChatMessage.tsx (行 100)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 171) 与 components\common\hoc\withErrorBoundary.tsx (行 172)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 177) 与 components\common\hoc\withErrorBoundary.tsx (行 178)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 225) 与 components\common\hoc\withErrorBoundary.tsx (行 226)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 241) 与 components\common\hoc\withErrorBoundary.tsx (行 242)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 46) 与 components\common\hoc\withLoading.tsx (行 63)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 47) 与 components\common\hoc\withLoading.tsx (行 64)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 48) 与 components\common\hoc\withLoading.tsx (行 65)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 153) 与 components\common\hoc\withLoading.tsx (行 107)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\common\hoc\withLoading.tsx (行 108)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\common\hoc\withLoading.tsx (行 128)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 271) 与 components\common\hoc\withLoading.tsx (行 153)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\common\hoc\withLoading.tsx (行 154)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 271) 与 components\common\hoc\withLoading.tsx (行 183)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\common\hoc\withLoading.tsx (行 184)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 235) 与 components\common\hoc\withLoading.tsx (行 236)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 388) 与 components\common\hoc\withLoading.tsx (行 389)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 394) 与 components\common\hoc\withLoading.tsx (行 395)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 271) 与 components\common\hoc\withPermission.tsx (行 186)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\common\hoc\withPermission.tsx (行 187)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 219) 与 components\common\hoc\withPermission.tsx (行 220)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 225) 与 components\common\hoc\withPermission.tsx (行 226)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 250) 与 components\common\hoc\withPermission.tsx (行 251)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 304) 与 components\common\hoc\withPermission.tsx (行 305)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 315) 与 components\common\hoc\withPermission.tsx (行 316)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 329) 与 components\common\hoc\withPermission.tsx (行 330)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 264) 与 components\common\hoc\withPermission.tsx (行 366)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 265) 与 components\common\hoc\withPermission.tsx (行 367)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 266) 与 components\common\hoc\withPermission.tsx (行 368)
  - 相似度: 100.0%

- components\common\hoc\withLoading.tsx (行 267) 与 components\common\hoc\withPermission.tsx (行 369)
  - 相似度: 100.0%

- components\common\hoc\withPermission.tsx (行 467) 与 components\common\hoc\withPermission.tsx (行 488)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\core\BaseCard.tsx (行 57)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 282) 与 components\debug\DebugPanel.tsx (行 340)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 283) 与 components\debug\DebugPanel.tsx (行 341)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 284) 与 components\debug\DebugPanel.tsx (行 342)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 282) 与 components\debug\DebugPanel.tsx (行 411)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 283) 与 components\debug\DebugPanel.tsx (行 412)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 284) 与 components\debug\DebugPanel.tsx (行 413)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 394) 与 components\debug\DebugPanel.tsx (行 438)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 443) 与 components\debug\DebugPanel.tsx (行 444)
  - 相似度: 100.0%

- components\debug\DebugPanel.tsx (行 508) 与 components\debug\DebugPanel.tsx (行 520)
  - 相似度: 100.0%

- components\debug\DebugTools.tsx (行 111) 与 components\debug\DebugTools.tsx (行 112)
  - 相似度: 100.0%

- components\debug\DebugTools.tsx (行 117) 与 components\debug\DebugTools.tsx (行 118)
  - 相似度: 100.0%

- components\debug\DebugTools.tsx (行 143) 与 components\debug\DebugTools.tsx (行 144)
  - 相似度: 100.0%

- components\debug\DebugTools.tsx (行 172) 与 components\debug\DebugTools.tsx (行 173)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 90) 与 components\debug\PerformanceMonitor.tsx (行 91)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 149) 与 components\debug\PerformanceMonitor.tsx (行 150)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 162) 与 components\debug\PerformanceMonitor.tsx (行 163)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 417) 与 components\debug\PerformanceMonitor.tsx (行 418)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 432) 与 components\debug\PerformanceMonitor.tsx (行 433)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 438) 与 components\debug\PerformanceMonitor.tsx (行 439)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 542) 与 components\debug\PerformanceMonitor.tsx (行 574)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 543) 与 components\debug\PerformanceMonitor.tsx (行 575)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 542) 与 components\debug\PerformanceMonitor.tsx (行 604)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 543) 与 components\debug\PerformanceMonitor.tsx (行 605)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 643) 与 components\debug\PerformanceMonitor.tsx (行 677)
  - 相似度: 100.0%

- components\debug\PerformanceMonitor.tsx (行 644) 与 components\debug\PerformanceMonitor.tsx (行 678)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 204) 与 components\dialogs\GameRulesDialog.tsx (行 205)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 210) 与 components\dialogs\GameRulesDialog.tsx (行 211)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 301) 与 components\dialogs\GameRulesDialog.tsx (行 302)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 325) 与 components\dialogs\GameRulesDialog.tsx (行 326)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 236) 与 components\dialogs\GameRulesDialog.tsx (行 331)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 288) 与 components\dialogs\GameRulesDialog.tsx (行 350)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 128) 与 components\dialogs\LoginDialog.tsx (行 129)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 77) 与 components\dialogs\LoginDialog.tsx (行 155)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 94) 与 components\dialogs\LoginDialog.tsx (行 186)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 95) 与 components\dialogs\LoginDialog.tsx (行 187)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 96) 与 components\dialogs\LoginDialog.tsx (行 188)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 235) 与 components\dialogs\LoginDialog.tsx (行 236)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 249) 与 components\dialogs\LoginDialog.tsx (行 290)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 250) 与 components\dialogs\LoginDialog.tsx (行 291)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 251) 与 components\dialogs\LoginDialog.tsx (行 292)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 252) 与 components\dialogs\LoginDialog.tsx (行 293)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 261) 与 components\dialogs\LoginDialog.tsx (行 314)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 262) 与 components\dialogs\LoginDialog.tsx (行 315)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 263) 与 components\dialogs\LoginDialog.tsx (行 316)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 265) 与 components\dialogs\LoginDialog.tsx (行 330)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 266) 与 components\dialogs\LoginDialog.tsx (行 331)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 267) 与 components\dialogs\LoginDialog.tsx (行 332)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 268) 与 components\dialogs\LoginDialog.tsx (行 333)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 269) 与 components\dialogs\LoginDialog.tsx (行 334)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 270) 与 components\dialogs\LoginDialog.tsx (行 335)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 358) 与 components\dialogs\LoginDialog.tsx (行 347)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 359) 与 components\dialogs\LoginDialog.tsx (行 348)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 171) 与 components\error\ErrorBoundary.tsx (行 172)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 195) 与 components\error\ErrorBoundary.tsx (行 196)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 93) 与 components\error\ErrorBoundary.tsx (行 212)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 94) 与 components\error\ErrorBoundary.tsx (行 213)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 201) 与 components\error\ErrorBoundary.tsx (行 220)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 202) 与 components\error\ErrorBoundary.tsx (行 221)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 415) 与 components\error\ErrorBoundary.tsx (行 416)
  - 相似度: 100.0%

- components\error\ErrorDisplayComponent.tsx (行 178) 与 components\error\ErrorDisplayComponent.tsx (行 179)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 271) 与 components\error\ErrorDisplayComponent.tsx (行 474)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\error\ErrorDisplayComponent.tsx (行 475)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 32) 与 components\ErrorBoundary.tsx (行 28)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 33) 与 components\ErrorBoundary.tsx (行 29)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 34) 与 components\ErrorBoundary.tsx (行 30)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 35) 与 components\ErrorBoundary.tsx (行 31)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 91) 与 components\ErrorBoundary.tsx (行 78)
  - 相似度: 100.0%

- components\ErrorBoundary.tsx (行 151) 与 components\ErrorBoundary.tsx (行 152)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 420) 与 components\ErrorBoundary.tsx (行 400)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 421) 与 components\ErrorBoundary.tsx (行 401)
  - 相似度: 100.0%

- components\ErrorBoundary.tsx (行 419) 与 components\ErrorBoundary.tsx (行 420)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 40) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 41)
  - 相似度: 100.0%

- components\game\accessibility\AccessibilityEnhancement.tsx (行 219) 与 components\game\accessibility\AccessibilityEnhancement.tsx (行 220)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 103) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 104)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 132) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 144)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 158) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 159)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 200) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 201)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 206) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 207)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\game\displays\GamePlayerStatusDisplay.tsx (行 290)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 272) 与 components\game\displays\GameStateDisplay.tsx (行 70)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\displays\RoleSkillInfo.tsx (行 192)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 128) 与 components\game\displays\SkillEffectsDisplay.tsx (行 129)
  - 相似度: 100.0%

- components\game\feedback\OperationFeedback.tsx (行 44) 与 components\game\feedback\OperationFeedback.tsx (行 45)
  - 相似度: 100.0%

- components\game\feedback\OperationFeedback.tsx (行 86) 与 components\game\feedback\OperationFeedback.tsx (行 87)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 95) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 131)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 206) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 207)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 212) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 213)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 276) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 354)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 278) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 413)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 279) 与 components\game\interfaces\EnhancedSkillManager.tsx (行 414)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\interfaces\GuardProtectionInterface.tsx (行 62)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 48) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 48)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 49) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 49)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 50) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 50)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 60) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 60)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 61) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 61)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\interfaces\HunterRevengeInterface.tsx (行 62)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 279) 与 components\game\interfaces\NightSkillInterface.tsx (行 323)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 75) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 76)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 112) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 167)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 113) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 168)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 114) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 169)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 115) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 170)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 124) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 179)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 146) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 201)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 147) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 202)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 148) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 203)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 112) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 266)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 113) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 267)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 114) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 268)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 115) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 269)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 124) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 279)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 412) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 322)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 278) 与 components\game\interfaces\RoleSpecificSkills.tsx (行 323)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 48) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 48)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 49) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 49)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 50) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 50)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 60) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 60)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 61) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 61)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\interfaces\SeerInvestigationInterface.tsx (行 62)
  - 相似度: 100.0%

- components\game\interfaces\SkillConflictResolver.tsx (行 107) 与 components\game\interfaces\SkillConflictResolver.tsx (行 108)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 218) 与 components\game\interfaces\SkillConflictResolver.tsx (行 198)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 243) 与 components\game\interfaces\SkillConflictResolver.tsx (行 208)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 244) 与 components\game\interfaces\SkillConflictResolver.tsx (行 209)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 245) 与 components\game\interfaces\SkillConflictResolver.tsx (行 210)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 246) 与 components\game\interfaces\SkillConflictResolver.tsx (行 211)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 247) 与 components\game\interfaces\SkillConflictResolver.tsx (行 212)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 248) 与 components\game\interfaces\SkillConflictResolver.tsx (行 213)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 249) 与 components\game\interfaces\SkillConflictResolver.tsx (行 214)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 250) 与 components\game\interfaces\SkillConflictResolver.tsx (行 215)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 251) 与 components\game\interfaces\SkillConflictResolver.tsx (行 216)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 252) 与 components\game\interfaces\SkillConflictResolver.tsx (行 217)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 253) 与 components\game\interfaces\SkillConflictResolver.tsx (行 218)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 254) 与 components\game\interfaces\SkillConflictResolver.tsx (行 219)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 255) 与 components\game\interfaces\SkillConflictResolver.tsx (行 220)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 256) 与 components\game\interfaces\SkillConflictResolver.tsx (行 221)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 412) 与 components\game\interfaces\SkillConflictResolver.tsx (行 365)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 278) 与 components\game\interfaces\SkillConflictResolver.tsx (行 366)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 279) 与 components\game\interfaces\SkillConflictResolver.tsx (行 367)
  - 相似度: 100.0%

- components\game\interfaces\UnifiedWitchSkillInterface.tsx (行 56) 与 components\game\interfaces\UnifiedWitchSkillInterface.tsx (行 57)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 48) 与 components\game\interfaces\WolfKillInterface.tsx (行 48)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 49) 与 components\game\interfaces\WolfKillInterface.tsx (行 49)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 50) 与 components\game\interfaces\WolfKillInterface.tsx (行 50)
  - 相似度: 100.0%

- components\game\interfaces\HunterRevengeInterface.tsx (行 58) 与 components\game\interfaces\WolfKillInterface.tsx (行 58)
  - 相似度: 100.0%

- components\game\interfaces\HunterRevengeInterface.tsx (行 59) 与 components\game\interfaces\WolfKillInterface.tsx (行 59)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 60) 与 components\game\interfaces\WolfKillInterface.tsx (行 60)
  - 相似度: 100.0%

- components\game\interfaces\GuardProtectionInterface.tsx (行 61) 与 components\game\interfaces\WolfKillInterface.tsx (行 61)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\interfaces\WolfKillInterface.tsx (行 62)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 167) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 168)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 236) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 237)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 242) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 243)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 248) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 249)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 293) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 294)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 299) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 300)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 302) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 303)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 272) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 395)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 273) 与 components\game\optimized\AdvancedSkillAnalytics.tsx (行 396)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 171) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 172)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 257) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 258)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 363) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 364)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 444) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 445)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 484) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 485)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 273) 与 components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 538)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 111) 与 components\game\optimized\PerformanceMonitor.tsx (行 61)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 112) 与 components\game\optimized\PerformanceMonitor.tsx (行 62)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 113) 与 components\game\optimized\PerformanceMonitor.tsx (行 63)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 114) 与 components\game\optimized\PerformanceMonitor.tsx (行 64)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 173) 与 components\game\optimized\PerformanceMonitor.tsx (行 174)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 306) 与 components\game\optimized\PerformanceMonitor.tsx (行 307)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 316) 与 components\game\optimized\PerformanceMonitor.tsx (行 317)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 361) 与 components\game\optimized\PerformanceMonitor.tsx (行 362)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 369) 与 components\game\optimized\PerformanceMonitor.tsx (行 370)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 397) 与 components\game\optimized\PerformanceMonitor.tsx (行 400)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 398) 与 components\game\optimized\PerformanceMonitor.tsx (行 401)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 399) 与 components\game\optimized\PerformanceMonitor.tsx (行 402)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 400) 与 components\game\optimized\PerformanceMonitor.tsx (行 403)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 434) 与 components\game\optimized\PerformanceMonitor.tsx (行 433)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 435) 与 components\game\optimized\PerformanceMonitor.tsx (行 434)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 436) 与 components\game\optimized\PerformanceMonitor.tsx (行 435)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 696) 与 components\game\optimized\PerformanceMonitor.tsx (行 488)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 703) 与 components\game\optimized\PerformanceMonitor.tsx (行 503)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 704) 与 components\game\optimized\PerformanceMonitor.tsx (行 504)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 519) 与 components\game\optimized\PerformanceMonitor.tsx (行 530)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 573) 与 components\game\optimized\PerformanceMonitor.tsx (行 574)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 587) 与 components\game\optimized\PerformanceMonitor.tsx (行 600)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 741) 与 components\game\optimized\PerformanceMonitor.tsx (行 680)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 742) 与 components\game\optimized\PerformanceMonitor.tsx (行 681)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 743) 与 components\game\optimized\PerformanceMonitor.tsx (行 682)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 30) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 27)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 31) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 28)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 32) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 29)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 33) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 30)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 151) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 152)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 172) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 173)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 190) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 191)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 246) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 247)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 297) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 298)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 409) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 410)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 430) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 431)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 448) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 449)
  - 相似度: 100.0%

- components\game\optimized\SkillEffectsVirtualList.tsx (行 461) 与 components\game\optimized\SkillEffectsVirtualList.tsx (行 462)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 8) 与 components\game\panels\EnhancedSkillPanel.tsx (行 6)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 79) 与 components\game\panels\EnhancedSkillPanel.tsx (行 38)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 80) 与 components\game\panels\EnhancedSkillPanel.tsx (行 39)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 81) 与 components\game\panels\EnhancedSkillPanel.tsx (行 40)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 82) 与 components\game\panels\EnhancedSkillPanel.tsx (行 41)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 83) 与 components\game\panels\EnhancedSkillPanel.tsx (行 42)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 84) 与 components\game\panels\EnhancedSkillPanel.tsx (行 43)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 85) 与 components\game\panels\EnhancedSkillPanel.tsx (行 44)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 86) 与 components\game\panels\EnhancedSkillPanel.tsx (行 45)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 87) 与 components\game\panels\EnhancedSkillPanel.tsx (行 46)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 88) 与 components\game\panels\EnhancedSkillPanel.tsx (行 47)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 89) 与 components\game\panels\EnhancedSkillPanel.tsx (行 48)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 90) 与 components\game\panels\EnhancedSkillPanel.tsx (行 49)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 91) 与 components\game\panels\EnhancedSkillPanel.tsx (行 50)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 146) 与 components\game\panels\EnhancedSkillPanel.tsx (行 110)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 147) 与 components\game\panels\EnhancedSkillPanel.tsx (行 111)
  - 相似度: 100.0%

- components\game\optimized\OptimizedEnhancedSkillPanel.tsx (行 148) 与 components\game\panels\EnhancedSkillPanel.tsx (行 112)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 128) 与 components\game\panels\EnhancedSkillPanel.tsx (行 129)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 152) 与 components\game\panels\EnhancedSkillPanel.tsx (行 153)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 326) 与 components\game\panels\EnhancedSkillPanel.tsx (行 327)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 355) 与 components\game\panels\EnhancedSkillPanel.tsx (行 356)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 141) 与 components\game\panels\EnhancedSkillPanel.tsx (行 377)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 111) 与 components\game\panels\GameInfoPanel.tsx (行 112)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 272) 与 components\game\panels\GameSettingsPanel.tsx (行 97)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 273) 与 components\game\panels\GameSettingsPanel.tsx (行 98)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 397) 与 components\game\panels\GameSettingsPanel.tsx (行 99)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 398) 与 components\game\panels\GameSettingsPanel.tsx (行 100)
  - 相似度: 100.0%

- components\game\panels\GameSkillPanel.tsx (行 91) 与 components\game\panels\GameSkillPanel.tsx (行 92)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 273) 与 components\game\panels\GameSkillPanel.tsx (行 147)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 465) 与 components\game\panels\GameSkillPanel.tsx (行 198)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 466) 与 components\game\panels\GameSkillPanel.tsx (行 199)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 474) 与 components\game\panels\GameSkillPanel.tsx (行 207)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 475) 与 components\game\panels\GameSkillPanel.tsx (行 208)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 476) 与 components\game\panels\GameSkillPanel.tsx (行 209)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 477) 与 components\game\panels\GameSkillPanel.tsx (行 210)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 478) 与 components\game\panels\GameSkillPanel.tsx (行 211)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 479) 与 components\game\panels\GameSkillPanel.tsx (行 212)
  - 相似度: 100.0%

- components\game\panels\EnhancedSkillPanel.tsx (行 480) 与 components\game\panels\GameSkillPanel.tsx (行 213)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 423) 与 components\game\panels\GameSkillPanel.tsx (行 239)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\panels\GameSkillPanel.tsx (行 240)
  - 相似度: 100.0%

- components\game\panels\PlayerStatusManager.tsx (行 78) 与 components\game\panels\PlayerStatusManager.tsx (行 79)
  - 相似度: 100.0%

- components\game\panels\PlayerStatusManager.tsx (行 153) 与 components\game\panels\PlayerStatusManager.tsx (行 154)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 238) 与 components\game\panels\PlayerStatusManager.tsx (行 231)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 285) 与 components\game\panels\PlayerStatusManager.tsx (行 278)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 286) 与 components\game\panels\PlayerStatusManager.tsx (行 279)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 287) 与 components\game\panels\PlayerStatusManager.tsx (行 280)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 288) 与 components\game\panels\PlayerStatusManager.tsx (行 281)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 289) 与 components\game\panels\PlayerStatusManager.tsx (行 282)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\game\panels\PlayerStatusManager.tsx (行 283)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 272) 与 components\game\panels\RoleStatusPanel.tsx (行 95)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 273) 与 components\game\panels\RoleStatusPanel.tsx (行 96)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 397) 与 components\game\panels\RoleStatusPanel.tsx (行 97)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 398) 与 components\game\panels\RoleStatusPanel.tsx (行 98)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 159) 与 components\game\panels\RoleStatusPanel.tsx (行 160)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 165) 与 components\game\panels\RoleStatusPanel.tsx (行 166)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 423) 与 components\game\panels\RoleStatusPanel.tsx (行 210)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\panels\RoleStatusPanel.tsx (行 211)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 34) 与 components\game\panels\SkillUsePanel.tsx (行 31)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 35) 与 components\game\panels\SkillUsePanel.tsx (行 32)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 36) 与 components\game\panels\SkillUsePanel.tsx (行 33)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 60) 与 components\game\panels\SkillUsePanel.tsx (行 61)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 123) 与 components\game\panels\SkillUsePanel.tsx (行 116)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 124) 与 components\game\panels\SkillUsePanel.tsx (行 117)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 125) 与 components\game\panels\SkillUsePanel.tsx (行 118)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 96) 与 components\game\panels\SkillUsePanel.tsx (行 141)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 108) 与 components\game\panels\SkillUsePanel.tsx (行 153)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 109) 与 components\game\panels\SkillUsePanel.tsx (行 154)
  - 相似度: 100.0%

- components\game\displays\SkillEffectsDisplay.tsx (行 110) 与 components\game\panels\SkillUsePanel.tsx (行 155)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 124) 与 components\game\panels\SkillUsePanel.tsx (行 202)
  - 相似度: 100.0%

- components\game\interfaces\NightSkillInterface.tsx (行 125) 与 components\game\panels\SkillUsePanel.tsx (行 203)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 119) 与 components\game\panels\SkillUsePanel.tsx (行 204)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 120) 与 components\game\panels\SkillUsePanel.tsx (行 205)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 121) 与 components\game\panels\SkillUsePanel.tsx (行 206)
  - 相似度: 100.0%

- components\game\panels\SkillUsePanel.tsx (行 122) 与 components\game\panels\SkillUsePanel.tsx (行 207)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 42) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 43)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 122) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 123)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 190) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 327)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 191) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 328)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\game\panels\StudentAnswerRecordPanel.tsx (行 329)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 25) 与 components\game\panels\StudentSystemPanel.tsx (行 29)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 26) 与 components\game\panels\StudentSystemPanel.tsx (行 30)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 82) 与 components\game\panels\StudentSystemPanel.tsx (行 83)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 250) 与 components\game\panels\StudentSystemPanel.tsx (行 251)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 284) 与 components\game\panels\StudentSystemPanel.tsx (行 285)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 309) 与 components\game\panels\StudentSystemPanel.tsx (行 310)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 479) 与 components\game\panels\StudentSystemPanel.tsx (行 480)
  - 相似度: 100.0%

- components\game\panels\GameSettingsPanel.tsx (行 238) 与 components\game\panels\StudentSystemPanel.tsx (行 585)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 67) 与 components\game\panels\VotingSystemManager.tsx (行 68)
  - 相似度: 100.0%

- components\game\skill\SkillConflictVisualization.tsx (行 38) 与 components\game\skill\SkillConflictVisualization.tsx (行 39)
  - 相似度: 100.0%

- components\game\skill\SkillConflictVisualization.tsx (行 245) 与 components\game\skill\SkillConflictVisualization.tsx (行 246)
  - 相似度: 100.0%

- components\game\smart-hints\SmartHintSystem.tsx (行 186) 与 components\game\smart-hints\SmartHintSystem.tsx (行 187)
  - 相似度: 100.0%

- components\game\smart-hints\SmartHintSystem.tsx (行 235) 与 components\game\smart-hints\SmartHintSystem.tsx (行 236)
  - 相似度: 100.0%

- components\game\smart-hints\SmartHintSystem.tsx (行 389) 与 components\game\smart-hints\SmartHintSystem.tsx (行 390)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 25) 与 components\game\student\StudentPreviousQuestionDisplay.tsx (行 17)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 26) 与 components\game\student\StudentPreviousQuestionDisplay.tsx (行 18)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 31) 与 components\game\student\StudentPreviousQuestionDisplay.tsx (行 19)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 25) 与 components\game\student\StudentQuestionDisplay.tsx (行 17)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 26) 与 components\game\student\StudentQuestionDisplay.tsx (行 18)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 31) 与 components\game\student\StudentQuestionDisplay.tsx (行 19)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 32) 与 components\game\student\StudentQuestionDisplay.tsx (行 20)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 33) 与 components\game\student\StudentQuestionDisplay.tsx (行 21)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 34) 与 components\game\student\StudentQuestionDisplay.tsx (行 22)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 35) 与 components\game\student\StudentQuestionDisplay.tsx (行 23)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 36) 与 components\game\student\StudentQuestionDisplay.tsx (行 24)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 74) 与 components\game\student\StudentQuestionDisplay.tsx (行 121)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 146) 与 components\game\student\StudentQuestionDisplay.tsx (行 147)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\game\student\StudentQuestionNotFound.tsx (行 52)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 156) 与 components\game\student\StudentTimerDisplay.tsx (行 65)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 157) 与 components\game\student\StudentTimerDisplay.tsx (行 66)
  - 相似度: 100.0%

- components\hoc\withPermission.tsx (行 87) 与 components\hoc\withPermission.tsx (行 88)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 39) 与 components\judge\management\AnswerRecordPanel.tsx (行 32)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 40) 与 components\judge\management\AnswerRecordPanel.tsx (行 33)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 148) 与 components\judge\management\AnswerRecordPanel.tsx (行 103)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 149) 与 components\judge\management\AnswerRecordPanel.tsx (行 104)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 155) 与 components\judge\management\AnswerRecordPanel.tsx (行 110)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 156) 与 components\judge\management\AnswerRecordPanel.tsx (行 111)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 157) 与 components\judge\management\AnswerRecordPanel.tsx (行 112)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 158) 与 components\judge\management\AnswerRecordPanel.tsx (行 113)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 165) 与 components\judge\management\AnswerRecordPanel.tsx (行 120)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 166) 与 components\judge\management\AnswerRecordPanel.tsx (行 121)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 167) 与 components\judge\management\AnswerRecordPanel.tsx (行 122)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 168) 与 components\judge\management\AnswerRecordPanel.tsx (行 123)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 177) 与 components\judge\management\AnswerRecordPanel.tsx (行 132)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 178) 与 components\judge\management\AnswerRecordPanel.tsx (行 133)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 179) 与 components\judge\management\AnswerRecordPanel.tsx (行 134)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 180) 与 components\judge\management\AnswerRecordPanel.tsx (行 135)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 188) 与 components\judge\management\AnswerRecordPanel.tsx (行 143)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 189) 与 components\judge\management\AnswerRecordPanel.tsx (行 144)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 190) 与 components\judge\management\AnswerRecordPanel.tsx (行 145)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 191) 与 components\judge\management\AnswerRecordPanel.tsx (行 146)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 192) 与 components\judge\management\AnswerRecordPanel.tsx (行 147)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 193) 与 components\judge\management\AnswerRecordPanel.tsx (行 148)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 194) 与 components\judge\management\AnswerRecordPanel.tsx (行 149)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 195) 与 components\judge\management\AnswerRecordPanel.tsx (行 150)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 196) 与 components\judge\management\AnswerRecordPanel.tsx (行 151)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 201) 与 components\judge\management\AnswerRecordPanel.tsx (行 156)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 208) 与 components\judge\management\AnswerRecordPanel.tsx (行 163)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 209) 与 components\judge\management\AnswerRecordPanel.tsx (行 164)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 210) 与 components\judge\management\AnswerRecordPanel.tsx (行 165)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 211) 与 components\judge\management\AnswerRecordPanel.tsx (行 166)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 212) 与 components\judge\management\AnswerRecordPanel.tsx (行 167)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 213) 与 components\judge\management\AnswerRecordPanel.tsx (行 168)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 214) 与 components\judge\management\AnswerRecordPanel.tsx (行 169)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 215) 与 components\judge\management\AnswerRecordPanel.tsx (行 170)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 222) 与 components\judge\management\AnswerRecordPanel.tsx (行 177)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 223) 与 components\judge\management\AnswerRecordPanel.tsx (行 178)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 224) 与 components\judge\management\AnswerRecordPanel.tsx (行 179)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 225) 与 components\judge\management\AnswerRecordPanel.tsx (行 180)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 226) 与 components\judge\management\AnswerRecordPanel.tsx (行 181)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 227) 与 components\judge\management\AnswerRecordPanel.tsx (行 182)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 228) 与 components\judge\management\AnswerRecordPanel.tsx (行 183)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 229) 与 components\judge\management\AnswerRecordPanel.tsx (行 184)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 230) 与 components\judge\management\AnswerRecordPanel.tsx (行 185)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 231) 与 components\judge\management\AnswerRecordPanel.tsx (行 186)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 232) 与 components\judge\management\AnswerRecordPanel.tsx (行 187)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 233) 与 components\judge\management\AnswerRecordPanel.tsx (行 188)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 234) 与 components\judge\management\AnswerRecordPanel.tsx (行 189)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 235) 与 components\judge\management\AnswerRecordPanel.tsx (行 190)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 236) 与 components\judge\management\AnswerRecordPanel.tsx (行 191)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 237) 与 components\judge\management\AnswerRecordPanel.tsx (行 192)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 238) 与 components\judge\management\AnswerRecordPanel.tsx (行 193)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 239) 与 components\judge\management\AnswerRecordPanel.tsx (行 194)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 240) 与 components\judge\management\AnswerRecordPanel.tsx (行 195)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 241) 与 components\judge\management\AnswerRecordPanel.tsx (行 196)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 242) 与 components\judge\management\AnswerRecordPanel.tsx (行 197)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 243) 与 components\judge\management\AnswerRecordPanel.tsx (行 198)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 244) 与 components\judge\management\AnswerRecordPanel.tsx (行 199)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 245) 与 components\judge\management\AnswerRecordPanel.tsx (行 200)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 246) 与 components\judge\management\AnswerRecordPanel.tsx (行 201)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 247) 与 components\judge\management\AnswerRecordPanel.tsx (行 202)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 248) 与 components\judge\management\AnswerRecordPanel.tsx (行 203)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 249) 与 components\judge\management\AnswerRecordPanel.tsx (行 204)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 250) 与 components\judge\management\AnswerRecordPanel.tsx (行 205)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 251) 与 components\judge\management\AnswerRecordPanel.tsx (行 206)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 252) 与 components\judge\management\AnswerRecordPanel.tsx (行 207)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 253) 与 components\judge\management\AnswerRecordPanel.tsx (行 208)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 254) 与 components\judge\management\AnswerRecordPanel.tsx (行 209)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 255) 与 components\judge\management\AnswerRecordPanel.tsx (行 210)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 256) 与 components\judge\management\AnswerRecordPanel.tsx (行 211)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 257) 与 components\judge\management\AnswerRecordPanel.tsx (行 212)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 258) 与 components\judge\management\AnswerRecordPanel.tsx (行 213)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 259) 与 components\judge\management\AnswerRecordPanel.tsx (行 214)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 260) 与 components\judge\management\AnswerRecordPanel.tsx (行 215)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 320) 与 components\judge\management\AnswerRecordPanel.tsx (行 286)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 321) 与 components\judge\management\AnswerRecordPanel.tsx (行 287)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 322) 与 components\judge\management\AnswerRecordPanel.tsx (行 288)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 323) 与 components\judge\management\AnswerRecordPanel.tsx (行 289)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 324) 与 components\judge\management\AnswerRecordPanel.tsx (行 290)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 325) 与 components\judge\management\AnswerRecordPanel.tsx (行 291)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 326) 与 components\judge\management\AnswerRecordPanel.tsx (行 292)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 30) 与 components\judge\management\JudgeActionPanel.tsx (行 35)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 30) 与 components\judge\management\JudgeActionPanel.tsx (行 36)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 65) 与 components\judge\management\JudgeActionPanel.tsx (行 66)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 102) 与 components\judge\management\ManualQuestionEditor.tsx (行 122)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 103) 与 components\judge\management\ManualQuestionEditor.tsx (行 123)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 102) 与 components\judge\management\ManualQuestionEditor.tsx (行 142)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 103) 与 components\judge\management\ManualQuestionEditor.tsx (行 143)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\judge\management\ManualQuestionEditor.tsx (行 187)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 148) 与 components\judge\management\PlayerStatusPanel.tsx (行 149)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 217) 与 components\judge\management\PlayerStatusPanel.tsx (行 231)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 185) 与 components\judge\management\PlayerStatusPanel.tsx (行 248)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 186) 与 components\judge\management\PlayerStatusPanel.tsx (行 249)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\judge\management\PlayerStatusPanel.tsx (行 250)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 98) 与 components\judge\management\PreparationPhaseDialog.tsx (行 99)
  - 相似度: 100.0%

- components\error\ErrorDisplayComponent.tsx (行 473) 与 components\judge\management\PreparationPhaseDialog.tsx (行 218)
  - 相似度: 100.0%

- components\admin\MonitoringDashboard.tsx (行 271) 与 components\judge\management\PreparationPhaseDialog.tsx (行 219)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\judge\management\PreparationPhaseDialog.tsx (行 220)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 50) 与 components\judge\management\QuestionBankDialog.tsx (行 47)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 70) 与 components\judge\management\QuestionBankDialog.tsx (行 80)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 71) 与 components\judge\management\QuestionBankDialog.tsx (行 81)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 72) 与 components\judge\management\QuestionBankDialog.tsx (行 82)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 73) 与 components\judge\management\QuestionBankDialog.tsx (行 83)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 74) 与 components\judge\management\QuestionBankDialog.tsx (行 84)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 75) 与 components\judge\management\QuestionBankDialog.tsx (行 85)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 76) 与 components\judge\management\QuestionBankDialog.tsx (行 86)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 77) 与 components\judge\management\QuestionBankDialog.tsx (行 87)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 78) 与 components\judge\management\QuestionBankDialog.tsx (行 88)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 79) 与 components\judge\management\QuestionBankDialog.tsx (行 89)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 80) 与 components\judge\management\QuestionBankDialog.tsx (行 90)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 81) 与 components\judge\management\QuestionBankDialog.tsx (行 91)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 82) 与 components\judge\management\QuestionBankDialog.tsx (行 92)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 83) 与 components\judge\management\QuestionBankDialog.tsx (行 93)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 84) 与 components\judge\management\QuestionBankDialog.tsx (行 94)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 85) 与 components\judge\management\QuestionBankDialog.tsx (行 95)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 86) 与 components\judge\management\QuestionBankDialog.tsx (行 96)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 87) 与 components\judge\management\QuestionBankDialog.tsx (行 97)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 88) 与 components\judge\management\QuestionBankDialog.tsx (行 98)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 94) 与 components\judge\management\QuestionBankDialog.tsx (行 104)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 95) 与 components\judge\management\QuestionBankDialog.tsx (行 105)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 96) 与 components\judge\management\QuestionBankDialog.tsx (行 106)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 97) 与 components\judge\management\QuestionBankDialog.tsx (行 107)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 98) 与 components\judge\management\QuestionBankDialog.tsx (行 108)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 98) 与 components\judge\management\QuestionBankDialog.tsx (行 109)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 100) 与 components\judge\management\QuestionBankDialog.tsx (行 110)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 101) 与 components\judge\management\QuestionBankDialog.tsx (行 111)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 102) 与 components\judge\management\QuestionBankDialog.tsx (行 112)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 103) 与 components\judge\management\QuestionBankDialog.tsx (行 113)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 104) 与 components\judge\management\QuestionBankDialog.tsx (行 114)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 105) 与 components\judge\management\QuestionBankDialog.tsx (行 115)
  - 相似度: 100.0%

- components\judge\management\PreparationPhaseDialog.tsx (行 106) 与 components\judge\management\QuestionBankDialog.tsx (行 116)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 95) 与 components\judge\management\QuestionBankDialog.tsx (行 232)
  - 相似度: 100.0%

- components\dialogs\LoginDialog.tsx (行 96) 与 components\judge\management\QuestionBankDialog.tsx (行 233)
  - 相似度: 100.0%

- components\judge\management\QuestionBankDialog.tsx (行 299) 与 components\judge\management\QuestionBankDialog.tsx (行 300)
  - 相似度: 100.0%

- components\judge\management\QuestionBankDialog.tsx (行 394) 与 components\judge\management\QuestionBankDialog.tsx (行 395)
  - 相似度: 100.0%

- components\judge\management\QuestionBankDialog.tsx (行 421) 与 components\judge\management\QuestionBankDialog.tsx (行 422)
  - 相似度: 100.0%

- components\game\smart-hints\SmartHintSystem.tsx (行 424) 与 components\judge\management\QuestionBankDialog.tsx (行 546)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 28) 与 components\judge\management\QuestionBankPanel.tsx (行 29)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 150) 与 components\judge\management\QuestionBankPanel.tsx (行 151)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 156) 与 components\judge\management\QuestionBankPanel.tsx (行 157)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 162) 与 components\judge\management\QuestionBankPanel.tsx (行 163)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 198) 与 components\judge\management\QuestionBankPanel.tsx (行 199)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 204) 与 components\judge\management\QuestionBankPanel.tsx (行 205)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 210) 与 components\judge\management\QuestionBankPanel.tsx (行 211)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 289) 与 components\judge\management\QuestionBankPanel.tsx (行 299)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 289) 与 components\judge\management\QuestionBankPanel.tsx (行 311)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 327) 与 components\judge\management\QuestionBankPanel.tsx (行 328)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 289) 与 components\judge\management\QuestionBankPanel.tsx (行 383)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 289) 与 components\judge\management\QuestionBankPanel.tsx (行 449)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 459) 与 components\judge\management\QuestionBankPanel.tsx (行 460)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 472) 与 components\judge\management\QuestionBankPanel.tsx (行 473)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 487) 与 components\judge\management\QuestionBankPanel.tsx (行 506)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 488) 与 components\judge\management\QuestionBankPanel.tsx (行 507)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 489) 与 components\judge\management\QuestionBankPanel.tsx (行 508)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 609) 与 components\judge\management\QuestionBankPanel.tsx (行 664)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 610) 与 components\judge\management\QuestionBankPanel.tsx (行 665)
  - 相似度: 100.0%

- components\judge\management\QuestionBankPanel.tsx (行 611) 与 components\judge\management\QuestionBankPanel.tsx (行 666)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 270) 与 components\judge\management\QuestionBankPanel.tsx (行 686)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 317) 与 components\judge\management\QuestionBankPanel.tsx (行 696)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 191) 与 components\judge\management\QuestionOrderEditor.tsx (行 160)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\judge\management\QuestionOrderEditor.tsx (行 161)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 61) 与 components\judge\management\QuestionPreview.tsx (行 51)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 62) 与 components\judge\management\QuestionPreview.tsx (行 52)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 63) 与 components\judge\management\QuestionPreview.tsx (行 53)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 64) 与 components\judge\management\QuestionPreview.tsx (行 54)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 65) 与 components\judge\management\QuestionPreview.tsx (行 55)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 66) 与 components\judge\management\QuestionPreview.tsx (行 56)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 67) 与 components\judge\management\QuestionPreview.tsx (行 57)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 74) 与 components\judge\management\QuestionPreview.tsx (行 64)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 75) 与 components\judge\management\QuestionPreview.tsx (行 65)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 76) 与 components\judge\management\QuestionPreview.tsx (行 66)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 77) 与 components\judge\management\QuestionPreview.tsx (行 67)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 78) 与 components\judge\management\QuestionPreview.tsx (行 68)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 79) 与 components\judge\management\QuestionPreview.tsx (行 69)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 80) 与 components\judge\management\QuestionPreview.tsx (行 70)
  - 相似度: 100.0%

- components\judge\management\QuestionOrderEditor.tsx (行 81) 与 components\judge\management\QuestionPreview.tsx (行 71)
  - 相似度: 100.0%

- components\game\displays\RoleSkillInfo.tsx (行 191) 与 components\judge\management\QuestionPreview.tsx (行 225)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\judge\management\QuestionPreview.tsx (行 226)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 248) 与 components\judge\management\QuestionSourceList.tsx (行 76)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 185) 与 components\judge\management\QuestionSourceList.tsx (行 124)
  - 相似度: 100.0%

- components\judge\management\ManualQuestionEditor.tsx (行 186) 与 components\judge\management\QuestionSourceList.tsx (行 125)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\judge\management\QuestionSourceList.tsx (行 126)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 69) 与 components\judge\management\TeacherSystemPanel.tsx (行 108)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 70) 与 components\judge\management\TeacherSystemPanel.tsx (行 109)
  - 相似度: 100.0%

- components\game\student\StudentQuestionDisplay.tsx (行 71) 与 components\judge\management\TeacherSystemPanel.tsx (行 110)
  - 相似度: 100.0%

- components\judge\management\TeacherSystemPanel.tsx (行 115) 与 components\judge\management\TeacherSystemPanel.tsx (行 116)
  - 相似度: 100.0%

- components\game\student\StudentTimerDisplay.tsx (行 59) 与 components\judge\management\TeacherSystemPanel.tsx (行 154)
  - 相似度: 100.0%

- components\game\student\StudentTimerDisplay.tsx (行 60) 与 components\judge\management\TeacherSystemPanel.tsx (行 155)
  - 相似度: 100.0%

- components\game\student\StudentTimerDisplay.tsx (行 61) 与 components\judge\management\TeacherSystemPanel.tsx (行 156)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 279) 与 components\judge\management\TeacherSystemPanel.tsx (行 216)
  - 相似度: 100.0%

- components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 144) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 145)
  - 相似度: 100.0%

- components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 150) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 151)
  - 相似度: 100.0%

- components\game\panels\PlayerStatusManager.tsx (行 277) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 202)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 285) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 203)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 423) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 208)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\judge\monitoring\DyingStatusResolutionPanel.tsx (行 209)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 51) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 50)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 52) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 51)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 53) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 52)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 54) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 53)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 55) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 54)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 56) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 55)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 57) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 56)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 58) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 57)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 59) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 58)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 60) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 59)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 68) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 103)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 69) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 104)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 70) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 105)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 71) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 106)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 72) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 107)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 73) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 108)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 74) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 109)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 75) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 110)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 76) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 111)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 77) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 112)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 78) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 113)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 79) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 114)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 80) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 115)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 81) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 116)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 89) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 124)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 90) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 125)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 91) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 126)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 92) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 127)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 93) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 128)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 94) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 129)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 95) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 130)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 96) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 131)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 97) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 132)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 98) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 133)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 99) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 134)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 100) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 135)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 101) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 136)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 102) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 137)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 103) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 138)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 104) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 139)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 105) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 140)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 106) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 141)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 122) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 158)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 123) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 159)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 124) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 160)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 125) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 161)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 126) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 162)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 127) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 163)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 128) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 164)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 135) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 171)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 136) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 172)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 137) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 173)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 138) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 174)
  - 相似度: 100.0%

- components\game\panels\GameInfoPanel.tsx (行 139) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 175)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 423) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 197)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\judge\monitoring\EnhancedGameStateDisplay.tsx (行 198)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 103)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 77) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 117)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 78) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 118)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 79) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 119)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 80) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 120)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 145) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 146)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 286) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 285)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 287) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 286)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 288) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 287)
  - 相似度: 100.0%

- components\game\displays\GamePlayerStatusDisplay.tsx (行 289) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 288)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 154) 与 components\judge\monitoring\PlayerStatusDisplay.tsx (行 289)
  - 相似度: 100.0%

- components\judge\monitoring\SkillSystemDashboard.tsx (行 39) 与 components\judge\monitoring\SkillSystemDashboard.tsx (行 40)
  - 相似度: 100.0%

- components\judge\monitoring\SkillSystemDashboard.tsx (行 249) 与 components\judge\monitoring\SkillSystemDashboard.tsx (行 302)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 241) 与 components\judge\monitoring\SkillSystemDashboard.tsx (行 436)
  - 相似度: 100.0%

- components\game\panels\SkillSystemManager.tsx (行 242) 与 components\judge\monitoring\SkillSystemDashboard.tsx (行 437)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 31) 与 components\judge\types\questionBank.ts (行 3)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 32) 与 components\judge\types\questionBank.ts (行 4)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 33) 与 components\judge\types\questionBank.ts (行 5)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 31) 与 components\judge\types\questionBank.ts (行 25)
  - 相似度: 100.0%

- components\layout\Footer.tsx (行 38) 与 components\layout\Footer.tsx (行 39)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 36) 与 components\layout\LanguageSwitcher.tsx (行 37)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 163) 与 components\layout\LanguageSwitcher.tsx (行 164)
  - 相似度: 100.0%

- components\layout\LanguageSwitcher.tsx (行 520) 与 components\layout\LanguageSwitcher.tsx (行 521)
  - 相似度: 100.0%

- components\layout\Navbar.tsx (行 128) 与 components\layout\Navbar.tsx (行 139)
  - 相似度: 100.0%

- components\layout\Navbar.tsx (行 129) 与 components\layout\Navbar.tsx (行 140)
  - 相似度: 100.0%

- components\lobby\AvatarUpload.tsx (行 122) 与 components\lobby\AvatarUpload.tsx (行 123)
  - 相似度: 100.0%

- components\judge\management\QuestionBankTooltip.tsx (行 66) 与 components\lobby\ExperienceTooltip.tsx (行 63)
  - 相似度: 100.0%

- components\lobby\ExperienceTooltip.tsx (行 20) 与 components\lobby\PlayerInfo.tsx (行 24)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 86) 与 components\lobby\PlayerInfo.tsx (行 87)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 162) 与 components\lobby\PlayerInfo.tsx (行 163)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\lobby\PlayerInfo.tsx (行 176)
  - 相似度: 100.0%

- components\admin\PerformanceDashboard.tsx (行 438) 与 components\lobby\PlayerInfoPanel.tsx (行 100)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 129) 与 components\lobby\PlayerStats.tsx (行 50)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 130) 与 components\lobby\PlayerStats.tsx (行 51)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 131) 与 components\lobby\PlayerStats.tsx (行 52)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 132) 与 components\lobby\PlayerStats.tsx (行 53)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 133) 与 components\lobby\PlayerStats.tsx (行 54)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 134) 与 components\lobby\PlayerStats.tsx (行 55)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 135) 与 components\lobby\PlayerStats.tsx (行 56)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 136) 与 components\lobby\PlayerStats.tsx (行 57)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 137) 与 components\lobby\PlayerStats.tsx (行 58)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 138) 与 components\lobby\PlayerStats.tsx (行 59)
  - 相似度: 100.0%

- components\lobby\PlayerInfo.tsx (行 139) 与 components\lobby\PlayerStats.tsx (行 60)
  - 相似度: 100.0%

- components\game\student\StudentPreviousQuestionDisplay.tsx (行 91) 与 components\lobby\PlayerStats.tsx (行 101)
  - 相似度: 100.0%

- components\judge\management\JudgeActionPanel.tsx (行 34) 与 components\lobby\RoomListTable.tsx (行 21)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 30) 与 components\lobby\RoomListTable.tsx (行 22)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 30) 与 components\lobby\RoomListTable.tsx (行 23)
  - 相似度: 100.0%

- components\game\optimized\PerformanceMonitor.tsx (行 573) 与 components\room\PlayersList.tsx (行 167)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 422) 与 components\room\PlayersList.tsx (行 287)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 423) 与 components\room\PlayersList.tsx (行 288)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\room\PlayersList.tsx (行 289)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 121) 与 components\room\RoleSelection.tsx (行 87)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 273) 与 components\room\RoleSelection.tsx (行 199)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 272) 与 components\room\RoleSelection.tsx (行 303)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 273) 与 components\room\RoleSelection.tsx (行 304)
  - 相似度: 100.0%

- components\judge\management\TeacherSystemPanel.tsx (行 214) 与 components\room\RoleSelection.tsx (行 421)
  - 相似度: 100.0%

- components\judge\management\TeacherSystemPanel.tsx (行 215) 与 components\room\RoleSelection.tsx (行 422)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 279) 与 components\room\RoleSelection.tsx (行 423)
  - 相似度: 100.0%

- components\room\RoomInfoCard.tsx (行 21) 与 components\room\RoomInfoCard.tsx (行 22)
  - 相似度: 100.0%

- components\room\RoomInfoCard.tsx (行 106) 与 components\room\RoomInfoCard.tsx (行 107)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 90) 与 components\room\RoomInfoCard.tsx (行 132)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 91) 与 components\room\RoomInfoCard.tsx (行 133)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 92) 与 components\room\RoomInfoCard.tsx (行 134)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 93) 与 components\room\RoomInfoCard.tsx (行 135)
  - 相似度: 100.0%

- components\game\panels\RoleStatusPanel.tsx (行 94) 与 components\room\RoomInfoCard.tsx (行 136)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 272) 与 components\room\RoomInfoCard.tsx (行 137)
  - 相似度: 100.0%

- components\room\RoomInfoCard.tsx (行 129) 与 components\room\RoomInfoCard.tsx (行 144)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 272) 与 components\room\RoomInfoCard.tsx (行 151)
  - 相似度: 100.0%

- components\admin\SkillSystemMonitor.tsx (行 273) 与 components\room\RoomInfoCard.tsx (行 152)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 397) 与 components\room\RoomInfoCard.tsx (行 153)
  - 相似度: 100.0%

- components\game\optimized\AdvancedSkillAnalytics.tsx (行 398) 与 components\room\RoomInfoCard.tsx (行 154)
  - 相似度: 100.0%

- components\game\interfaces\RoleSpecificSkills.tsx (行 423) 与 components\room\RoomInfoCard.tsx (行 182)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\room\RoomInfoCard.tsx (行 183)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 57) 与 components\shared\hoc\withErrorBoundary.tsx (行 38)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 58) 与 components\shared\hoc\withErrorBoundary.tsx (行 39)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 138) 与 components\shared\hoc\withErrorBoundary.tsx (行 139)
  - 相似度: 100.0%

- components\common\hoc\withErrorBoundary.tsx (行 174) 与 components\shared\hoc\withErrorBoundary.tsx (行 141)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 197) 与 components\shared\hoc\withErrorBoundary.tsx (行 198)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 220) 与 components\shared\hoc\withErrorBoundary.tsx (行 221)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 119) 与 components\shared\hoc\withLoading.tsx (行 164)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 120) 与 components\shared\hoc\withLoading.tsx (行 165)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 121) 与 components\shared\hoc\withLoading.tsx (行 166)
  - 相似度: 100.0%

- components\shared\hoc\withLoading.tsx (行 187) 与 components\shared\hoc\withLoading.tsx (行 188)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 121) 与 components\shared\hoc\withLoading.tsx (行 212)
  - 相似度: 100.0%

- components\shared\hoc\withLoading.tsx (行 277) 与 components\shared\hoc\withLoading.tsx (行 278)
  - 相似度: 100.0%

- components\shared\hoc\withLoading.tsx (行 418) 与 components\shared\hoc\withLoading.tsx (行 419)
  - 相似度: 100.0%

- components\shared\hoc\withLoading.tsx (行 428) 与 components\shared\hoc\withLoading.tsx (行 429)
  - 相似度: 100.0%

- components\shared\hoc\withLoading.tsx (行 434) 与 components\shared\hoc\withLoading.tsx (行 435)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 372) 与 components\shared\hoc\withLoading.tsx (行 531)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 373) 与 components\shared\hoc\withLoading.tsx (行 532)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 374) 与 components\shared\hoc\withLoading.tsx (行 533)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 375) 与 components\shared\hoc\withLoading.tsx (行 534)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 376) 与 components\shared\hoc\withLoading.tsx (行 535)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 78) 与 components\shared\hoc\withPermission.tsx (行 79)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 99) 与 components\shared\hoc\withPermission.tsx (行 117)
  - 相似度: 100.0%

- components\shared\hoc\withLoading.tsx (行 211) 与 components\shared\hoc\withPermission.tsx (行 144)
  - 相似度: 100.0%

- components\shared\hoc\withErrorBoundary.tsx (行 121) 与 components\shared\hoc\withPermission.tsx (行 145)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 283) 与 components\shared\hoc\withPermission.tsx (行 284)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 286) 与 components\shared\hoc\withPermission.tsx (行 397)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 287) 与 components\shared\hoc\withPermission.tsx (行 398)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 293) 与 components\shared\hoc\withPermission.tsx (行 404)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 294) 与 components\shared\hoc\withPermission.tsx (行 405)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 467) 与 components\shared\hoc\withPermission.tsx (行 468)
  - 相似度: 100.0%

- components\shared\hoc\withPermission.tsx (行 486) 与 components\shared\hoc\withPermission.tsx (行 487)
  - 相似度: 100.0%

- components\ui\button.tsx (行 59) 与 components\ui\button.tsx (行 60)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 29) 与 components\ui\carousel.tsx (行 30)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 125) 与 components\ui\carousel.tsx (行 126)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 129) 与 components\ui\carousel.tsx (行 130)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 235) 与 components\ui\carousel.tsx (行 268)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 236) 与 components\ui\carousel.tsx (行 269)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 69) 与 components\ui\chart.tsx (行 63)
  - 相似度: 100.0%

- components\ui\chart.tsx (行 189) 与 components\ui\chart.tsx (行 190)
  - 相似度: 100.0%

- components\ui\command.tsx (行 147) 与 components\ui\command.tsx (行 187)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 149) 与 components\ui\context-menu.tsx (行 230)
  - 相似度: 100.0%

- components\ui\command.tsx (行 202) 与 components\ui\context-menu.tsx (行 263)
  - 相似度: 100.0%

- components\ui\command.tsx (行 203) 与 components\ui\context-menu.tsx (行 264)
  - 相似度: 100.0%

- components\ui\command.tsx (行 204) 与 components\ui\context-menu.tsx (行 265)
  - 相似度: 100.0%

- components\ui\command.tsx (行 205) 与 components\ui\context-menu.tsx (行 266)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 74) 与 components\ui\dialog.tsx (行 95)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 110) 与 components\ui\dialog.tsx (行 137)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 111) 与 components\ui\dialog.tsx (行 138)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 112) 与 components\ui\dialog.tsx (行 139)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 113) 与 components\ui\dialog.tsx (行 140)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 159) 与 components\ui\drawer.tsx (行 153)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 160) 与 components\ui\drawer.tsx (行 154)
  - 相似度: 100.0%

- components\ui\dialog.tsx (行 161) 与 components\ui\drawer.tsx (行 155)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 79) 与 components\ui\dropdown-menu.tsx (行 79)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 80) 与 components\ui\dropdown-menu.tsx (行 80)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 102) 与 components\ui\dropdown-menu.tsx (行 127)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 149) 与 components\ui\dropdown-menu.tsx (行 152)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 171) 与 components\ui\dropdown-menu.tsx (行 174)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 149) 与 components\ui\dropdown-menu.tsx (行 233)
  - 相似度: 100.0%

- components\ui\form.tsx (行 23) 与 components\ui\form.tsx (行 24)
  - 相似度: 100.0%

- components\ui\form.tsx (行 45) 与 components\ui\form.tsx (行 46)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 76) 与 components\ui\menubar.tsx (行 123)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 77) 与 components\ui\menubar.tsx (行 124)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 78) 与 components\ui\menubar.tsx (行 125)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 79) 与 components\ui\menubar.tsx (行 126)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 80) 与 components\ui\menubar.tsx (行 127)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 146) 与 components\ui\menubar.tsx (行 200)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 147) 与 components\ui\menubar.tsx (行 201)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 148) 与 components\ui\menubar.tsx (行 202)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 149) 与 components\ui\menubar.tsx (行 203)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 168) 与 components\ui\menubar.tsx (行 222)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 169) 与 components\ui\menubar.tsx (行 223)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 170) 与 components\ui\menubar.tsx (行 224)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 171) 与 components\ui\menubar.tsx (行 225)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 198) 与 components\ui\menubar.tsx (行 251)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 199) 与 components\ui\menubar.tsx (行 252)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 200) 与 components\ui\menubar.tsx (行 253)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 230) 与 components\ui\menubar.tsx (行 280)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 231) 与 components\ui\menubar.tsx (行 281)
  - 相似度: 100.0%

- components\ui\dropdown-menu.tsx (行 232) 与 components\ui\menubar.tsx (行 282)
  - 相似度: 100.0%

- components\ui\context-menu.tsx (行 149) 与 components\ui\menubar.tsx (行 283)
  - 相似度: 100.0%

- components\ui\command.tsx (行 202) 与 components\ui\menubar.tsx (行 316)
  - 相似度: 100.0%

- components\ui\command.tsx (行 203) 与 components\ui\menubar.tsx (行 317)
  - 相似度: 100.0%

- components\ui\command.tsx (行 204) 与 components\ui\menubar.tsx (行 318)
  - 相似度: 100.0%

- components\ui\command.tsx (行 205) 与 components\ui\menubar.tsx (行 319)
  - 相似度: 100.0%

- components\ui\select.tsx (行 90) 与 components\ui\select.tsx (行 113)
  - 相似度: 100.0%

- components\ui\select.tsx (行 91) 与 components\ui\select.tsx (行 114)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 51) 与 components\ui\sheet.tsx (行 73)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 52) 与 components\ui\sheet.tsx (行 74)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 53) 与 components\ui\sheet.tsx (行 75)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 92) 与 components\ui\sheet.tsx (行 135)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 93) 与 components\ui\sheet.tsx (行 136)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 94) 与 components\ui\sheet.tsx (行 137)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 95) 与 components\ui\sheet.tsx (行 138)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 110) 与 components\ui\sheet.tsx (行 153)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 111) 与 components\ui\sheet.tsx (行 154)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 112) 与 components\ui\sheet.tsx (行 155)
  - 相似度: 100.0%

- components\ui\alert-dialog.tsx (行 113) 与 components\ui\sheet.tsx (行 156)
  - 相似度: 100.0%

- components\ui\carousel.tsx (行 69) 与 components\ui\sidebar.tsx (行 110)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 148) 与 components\ui\sidebar.tsx (行 149)
  - 相似度: 100.0%

- components\ui\button.tsx (行 54) 与 components\ui\sidebar.tsx (行 638)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 758) 与 components\ui\sidebar.tsx (行 820)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 563) 与 components\ui\sidebar.tsx (行 865)
  - 相似度: 100.0%

- components\ui\skill-progress-indicator.tsx (行 73) 与 components\ui\skill-progress-indicator.tsx (行 74)
  - 相似度: 100.0%

- components\ui\skill-progress-indicator.tsx (行 76) 与 components\ui\skill-progress-indicator.tsx (行 77)
  - 相似度: 100.0%

- components\ui\skill-progress-indicator.tsx (行 135) 与 components\ui\skill-progress-indicator.tsx (行 136)
  - 相似度: 100.0%

- components\ui\input.tsx (行 39) 与 components\ui\textarea.tsx (行 41)
  - 相似度: 100.0%

- components\ui\input.tsx (行 40) 与 components\ui\textarea.tsx (行 42)
  - 相似度: 100.0%

- components\ui\alert.tsx (行 40) 与 components\ui\toast.tsx (行 65)
  - 相似度: 100.0%

- components\ui\toaster.tsx (行 19) 与 components\ui\toaster.tsx (行 20)
  - 相似度: 100.0%

- components\ui\toggle-group.tsx (行 22) 与 components\ui\toggle-group.tsx (行 23)
  - 相似度: 100.0%

- components\ui\button.tsx (行 54) 与 components\ui\toggle.tsx (行 45)
  - 相似度: 100.0%

- components\ui\sidebar.tsx (行 639) 与 components\ui\toggle.tsx (行 46)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 30) 与 components\voting\EnhancedVotingManager.tsx (行 33)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 31) 与 components\voting\EnhancedVotingManager.tsx (行 34)
  - 相似度: 100.0%

- components\voting\EnhancedVotingManager.tsx (行 98) 与 components\voting\EnhancedVotingManager.tsx (行 99)
  - 相似度: 100.0%

- components\voting\EnhancedVotingManager.tsx (行 122) 与 components\voting\EnhancedVotingManager.tsx (行 123)
  - 相似度: 100.0%

- components\voting\EnhancedVotingManager.tsx (行 167) 与 components\voting\EnhancedVotingManager.tsx (行 197)
  - 相似度: 100.0%

- components\game\panels\StudentAnswerRecordPanel.tsx (行 214) 与 components\voting\EnhancedVotingManager.tsx (行 224)
  - 相似度: 100.0%

- components\chat\MultiChannelChat.tsx (行 197) 与 components\voting\EnhancedVotingManager.tsx (行 355)
  - 相似度: 100.0%

- components\voting\VotingPanel.tsx (行 116) 与 components\voting\VotingPanel.tsx (行 117)
  - 相似度: 100.0%

- components\voting\VotingPanel.tsx (行 118) 与 components\voting\VotingPanel.tsx (行 119)
  - 相似度: 100.0%

- components\judge\management\AnswerRecordPanel.tsx (行 281) 与 components\voting\VotingPanel.tsx (行 397)
  - 相似度: 100.0%

- components\judge\management\AnswerRecordPanel.tsx (行 282) 与 components\voting\VotingPanel.tsx (行 398)
  - 相似度: 100.0%

- components\judge\management\AnswerRecordPanel.tsx (行 283) 与 components\voting\VotingPanel.tsx (行 399)
  - 相似度: 100.0%

- components\game\interfaces\EnhancedSkillManager.tsx (行 349) 与 components\voting\VotingPanel.tsx (行 400)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 100) 与 components\voting\VotingPanel.tsx (行 512)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 101) 与 components\voting\VotingPanel.tsx (行 513)
  - 相似度: 100.0%

- components\game\panels\VotingSystemManager.tsx (行 102) 与 components\voting\VotingPanel.tsx (行 514)
  - 相似度: 100.0%

- config\errorMessages.ts (行 743) 与 config\errorMessages.ts (行 744)
  - 相似度: 100.0%

- config\gameConfig.ts (行 757) 与 config\gameConfig.ts (行 758)
  - 相似度: 100.0%

- config\gameConfig.ts (行 775) 与 config\gameConfig.ts (行 776)
  - 相似度: 100.0%

- config\performance.config.ts (行 12) 与 config\performance.config.ts (行 13)
  - 相似度: 100.0%

- config\security.config.ts (行 231) 与 config\security.config.ts (行 243)
  - 相似度: 100.0%

- config\security.config.ts (行 231) 与 config\security.config.ts (行 255)
  - 相似度: 100.0%

- config\security.config.ts (行 256) 与 config\security.config.ts (行 270)
  - 相似度: 100.0%

- config\security.config.ts (行 231) 与 config\security.config.ts (行 283)
  - 相似度: 100.0%

- config\security.config.ts (行 256) 与 config\security.config.ts (行 284)
  - 相似度: 100.0%

- config\security.config.ts (行 218) 与 config\security.config.ts (行 296)
  - 相似度: 100.0%

- config\security.config.ts (行 219) 与 config\security.config.ts (行 297)
  - 相似度: 100.0%

- config\security.config.ts (行 256) 与 config\security.config.ts (行 298)
  - 相似度: 100.0%

- config\security.config.ts (行 380) 与 config\security.config.ts (行 381)
  - 相似度: 100.0%

- config\security.config.ts (行 401) 与 config\security.config.ts (行 402)
  - 相似度: 100.0%

- config\security.config.ts (行 407) 与 config\security.config.ts (行 408)
  - 相似度: 100.0%

- config\security.config.ts (行 444) 与 config\security.config.ts (行 445)
  - 相似度: 100.0%

- config\skillConfig.ts (行 225) 与 config\skillConfig.ts (行 315)
  - 相似度: 100.0%

- config\skillConfig.ts (行 226) 与 config\skillConfig.ts (行 316)
  - 相似度: 100.0%

- config\skillConfig.ts (行 227) 与 config\skillConfig.ts (行 317)
  - 相似度: 100.0%

- config\skillConfig.ts (行 228) 与 config\skillConfig.ts (行 318)
  - 相似度: 100.0%

- config\skillConfig.ts (行 229) 与 config\skillConfig.ts (行 319)
  - 相似度: 100.0%

- config\skillConfig.ts (行 230) 与 config\skillConfig.ts (行 320)
  - 相似度: 100.0%

- config\skillConfig.ts (行 231) 与 config\skillConfig.ts (行 321)
  - 相似度: 100.0%

- config\skillConfig.ts (行 282) 与 config\skillConfig.ts (行 326)
  - 相似度: 100.0%

- config\skillConfig.ts (行 283) 与 config\skillConfig.ts (行 327)
  - 相似度: 100.0%

- config\skillConfig.ts (行 284) 与 config\skillConfig.ts (行 328)
  - 相似度: 100.0%

- config\skillConfig.ts (行 246) 与 config\skillConfig.ts (行 336)
  - 相似度: 100.0%

- config\skillConfig.ts (行 247) 与 config\skillConfig.ts (行 337)
  - 相似度: 100.0%

- config\skillConfig.ts (行 248) 与 config\skillConfig.ts (行 338)
  - 相似度: 100.0%

- config\skillConfig.ts (行 249) 与 config\skillConfig.ts (行 339)
  - 相似度: 100.0%

- config\skillConfig.ts (行 250) 与 config\skillConfig.ts (行 340)
  - 相似度: 100.0%

- config\skillConfig.ts (行 251) 与 config\skillConfig.ts (行 341)
  - 相似度: 100.0%

- config\skillConfig.ts (行 252) 与 config\skillConfig.ts (行 342)
  - 相似度: 100.0%

- config\skillConfig.ts (行 253) 与 config\skillConfig.ts (行 343)
  - 相似度: 100.0%

- config\skillConfig.ts (行 254) 与 config\skillConfig.ts (行 344)
  - 相似度: 100.0%

- config\skillConfig.ts (行 255) 与 config\skillConfig.ts (行 345)
  - 相似度: 100.0%

- config\skillConfig.ts (行 256) 与 config\skillConfig.ts (行 346)
  - 相似度: 100.0%

- config\skillConfig.ts (行 257) 与 config\skillConfig.ts (行 347)
  - 相似度: 100.0%

- config\skillConfig.ts (行 258) 与 config\skillConfig.ts (行 348)
  - 相似度: 100.0%

- config\skillConfig.ts (行 225) 与 config\skillConfig.ts (行 361)
  - 相似度: 100.0%

- config\skillConfig.ts (行 226) 与 config\skillConfig.ts (行 362)
  - 相似度: 100.0%

- config\skillConfig.ts (行 227) 与 config\skillConfig.ts (行 363)
  - 相似度: 100.0%

- config\skillConfig.ts (行 228) 与 config\skillConfig.ts (行 364)
  - 相似度: 100.0%

- config\skillConfig.ts (行 229) 与 config\skillConfig.ts (行 365)
  - 相似度: 100.0%

- config\skillConfig.ts (行 230) 与 config\skillConfig.ts (行 366)
  - 相似度: 100.0%

- config\skillConfig.ts (行 231) 与 config\skillConfig.ts (行 367)
  - 相似度: 100.0%

- config\skillConfig.ts (行 322) 与 config\skillConfig.ts (行 368)
  - 相似度: 100.0%

- config\skillConfig.ts (行 323) 与 config\skillConfig.ts (行 369)
  - 相似度: 100.0%

- config\skillConfig.ts (行 324) 与 config\skillConfig.ts (行 370)
  - 相似度: 100.0%

- config\skillConfig.ts (行 238) 与 config\skillConfig.ts (行 374)
  - 相似度: 100.0%

- config\skillConfig.ts (行 239) 与 config\skillConfig.ts (行 375)
  - 相似度: 100.0%

- config\skillConfig.ts (行 240) 与 config\skillConfig.ts (行 376)
  - 相似度: 100.0%

- config\skillConfig.ts (行 241) 与 config\skillConfig.ts (行 377)
  - 相似度: 100.0%

- config\skillConfig.ts (行 242) 与 config\skillConfig.ts (行 378)
  - 相似度: 100.0%

- config\skillConfig.ts (行 243) 与 config\skillConfig.ts (行 379)
  - 相似度: 100.0%

- config\skillConfig.ts (行 244) 与 config\skillConfig.ts (行 380)
  - 相似度: 100.0%

- config\skillConfig.ts (行 251) 与 config\skillConfig.ts (行 387)
  - 相似度: 100.0%

- config\skillConfig.ts (行 252) 与 config\skillConfig.ts (行 388)
  - 相似度: 100.0%

- config\skillConfig.ts (行 253) 与 config\skillConfig.ts (行 389)
  - 相似度: 100.0%

- config\skillConfig.ts (行 254) 与 config\skillConfig.ts (行 390)
  - 相似度: 100.0%

- config\skillConfig.ts (行 255) 与 config\skillConfig.ts (行 391)
  - 相似度: 100.0%

- config\skillConfig.ts (行 256) 与 config\skillConfig.ts (行 392)
  - 相似度: 100.0%

- config\skillConfig.ts (行 257) 与 config\skillConfig.ts (行 393)
  - 相似度: 100.0%

- config\skillConfig.ts (行 258) 与 config\skillConfig.ts (行 394)
  - 相似度: 100.0%

- config\skillConfig.ts (行 225) 与 config\skillConfig.ts (行 407)
  - 相似度: 100.0%

- config\skillConfig.ts (行 226) 与 config\skillConfig.ts (行 408)
  - 相似度: 100.0%

- config\skillConfig.ts (行 227) 与 config\skillConfig.ts (行 409)
  - 相似度: 100.0%

- config\skillConfig.ts (行 228) 与 config\skillConfig.ts (行 410)
  - 相似度: 100.0%

- config\skillConfig.ts (行 229) 与 config\skillConfig.ts (行 411)
  - 相似度: 100.0%

- config\skillConfig.ts (行 230) 与 config\skillConfig.ts (行 412)
  - 相似度: 100.0%

- config\skillConfig.ts (行 231) 与 config\skillConfig.ts (行 413)
  - 相似度: 100.0%

- config\skillConfig.ts (行 238) 与 config\skillConfig.ts (行 420)
  - 相似度: 100.0%

- config\skillConfig.ts (行 239) 与 config\skillConfig.ts (行 421)
  - 相似度: 100.0%

- config\skillConfig.ts (行 382) 与 config\skillConfig.ts (行 428)
  - 相似度: 100.0%

- config\skillConfig.ts (行 383) 与 config\skillConfig.ts (行 429)
  - 相似度: 100.0%

- config\skillConfig.ts (行 384) 与 config\skillConfig.ts (行 430)
  - 相似度: 100.0%

- config\skillConfig.ts (行 385) 与 config\skillConfig.ts (行 431)
  - 相似度: 100.0%

- config\skillConfig.ts (行 386) 与 config\skillConfig.ts (行 432)
  - 相似度: 100.0%

- config\skillConfig.ts (行 251) 与 config\skillConfig.ts (行 433)
  - 相似度: 100.0%

- config\skillConfig.ts (行 252) 与 config\skillConfig.ts (行 434)
  - 相似度: 100.0%

- config\skillConfig.ts (行 253) 与 config\skillConfig.ts (行 435)
  - 相似度: 100.0%

- config\skillConfig.ts (行 254) 与 config\skillConfig.ts (行 436)
  - 相似度: 100.0%

- config\skillConfig.ts (行 255) 与 config\skillConfig.ts (行 437)
  - 相似度: 100.0%

- config\skillConfig.ts (行 256) 与 config\skillConfig.ts (行 438)
  - 相似度: 100.0%

- config\skillConfig.ts (行 257) 与 config\skillConfig.ts (行 439)
  - 相似度: 100.0%

- config\skillConfig.ts (行 258) 与 config\skillConfig.ts (行 440)
  - 相似度: 100.0%

- config\skillConfig.ts (行 231) 与 config\skillConfig.ts (行 459)
  - 相似度: 100.0%

- config\skillConfig.ts (行 284) 与 config\skillConfig.ts (行 466)
  - 相似度: 100.0%

- config\skillConfig.ts (行 329) 与 config\skillConfig.ts (行 467)
  - 相似度: 100.0%

- config\skillConfig.ts (行 246) 与 config\skillConfig.ts (行 474)
  - 相似度: 100.0%

- config\skillConfig.ts (行 247) 与 config\skillConfig.ts (行 475)
  - 相似度: 100.0%

- config\skillConfig.ts (行 248) 与 config\skillConfig.ts (行 476)
  - 相似度: 100.0%

- config\skillConfig.ts (行 249) 与 config\skillConfig.ts (行 477)
  - 相似度: 100.0%

- config\skillConfig.ts (行 250) 与 config\skillConfig.ts (行 478)
  - 相似度: 100.0%

- config\skillConfig.ts (行 251) 与 config\skillConfig.ts (行 479)
  - 相似度: 100.0%

- config\skillConfig.ts (行 252) 与 config\skillConfig.ts (行 480)
  - 相似度: 100.0%

- config\skillConfig.ts (行 257) 与 config\skillConfig.ts (行 491)
  - 相似度: 100.0%

- config\skillConfig.ts (行 299) 与 config\skillConfig.ts (行 494)
  - 相似度: 100.0%

- config\skillConfig.ts (行 225) 与 config\skillConfig.ts (行 510)
  - 相似度: 100.0%

- config\skillConfig.ts (行 226) 与 config\skillConfig.ts (行 511)
  - 相似度: 100.0%

- config\skillConfig.ts (行 464) 与 config\skillConfig.ts (行 521)
  - 相似度: 100.0%

- config\skillConfig.ts (行 465) 与 config\skillConfig.ts (行 522)
  - 相似度: 100.0%

- config\skillConfig.ts (行 284) 与 config\skillConfig.ts (行 523)
  - 相似度: 100.0%

- config\skillConfig.ts (行 329) 与 config\skillConfig.ts (行 524)
  - 相似度: 100.0%

- config\skillConfig.ts (行 246) 与 config\skillConfig.ts (行 531)
  - 相似度: 100.0%

- config\skillConfig.ts (行 247) 与 config\skillConfig.ts (行 532)
  - 相似度: 100.0%

- config\skillConfig.ts (行 248) 与 config\skillConfig.ts (行 533)
  - 相似度: 100.0%

- config\skillConfig.ts (行 249) 与 config\skillConfig.ts (行 534)
  - 相似度: 100.0%

- config\skillConfig.ts (行 284) 与 config\skillConfig.ts (行 569)
  - 相似度: 100.0%

- config\skillConfig.ts (行 329) 与 config\skillConfig.ts (行 570)
  - 相似度: 100.0%

- config\skillConfig.ts (行 299) 与 config\skillConfig.ts (行 591)
  - 相似度: 100.0%

- config\skillConfig.ts (行 729) 与 config\skillConfig.ts (行 730)
  - 相似度: 100.0%

- config\skillConfig.ts (行 770) 与 config\skillConfig.ts (行 806)
  - 相似度: 100.0%

- config\skillConfig.ts (行 813) 与 config\skillConfig.ts (行 814)
  - 相似度: 100.0%

- config\skillConfig.ts (行 823) 与 config\skillConfig.ts (行 824)
  - 相似度: 100.0%

- config\gameConfig.ts (行 6) 与 config\validationRules.ts (行 6)
  - 相似度: 100.0%

- config\gameConfig.ts (行 7) 与 config\validationRules.ts (行 7)
  - 相似度: 100.0%

- config\gameConfig.ts (行 8) 与 config\validationRules.ts (行 8)
  - 相似度: 100.0%

- config\gameConfig.ts (行 9) 与 config\validationRules.ts (行 9)
  - 相似度: 100.0%

- config\validationRules.ts (行 330) 与 config\validationRules.ts (行 350)
  - 相似度: 100.0%

- config\validationRules.ts (行 401) 与 config\validationRules.ts (行 402)
  - 相似度: 100.0%

- config\validationRules.ts (行 509) 与 config\validationRules.ts (行 510)
  - 相似度: 100.0%

- config\validationRules.ts (行 520) 与 config\validationRules.ts (行 521)
  - 相似度: 100.0%

- config\validationRules.ts (行 714) 与 config\validationRules.ts (行 715)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 31) 与 contexts\JudgePageContext.tsx (行 9)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 32) 与 contexts\JudgePageContext.tsx (行 10)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 33) 与 contexts\JudgePageContext.tsx (行 11)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 20) 与 contexts\JudgePageContext.tsx (行 21)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 26) 与 contexts\JudgePageContext.tsx (行 27)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 45) 与 contexts\JudgePageContext.tsx (行 46)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 109) 与 contexts\JudgePageContext.tsx (行 56)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 110) 与 contexts\JudgePageContext.tsx (行 57)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 111) 与 contexts\JudgePageContext.tsx (行 58)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 112) 与 contexts\JudgePageContext.tsx (行 59)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 113) 与 contexts\JudgePageContext.tsx (行 60)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 114) 与 contexts\JudgePageContext.tsx (行 61)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 115) 与 contexts\JudgePageContext.tsx (行 62)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 116) 与 contexts\JudgePageContext.tsx (行 63)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 117) 与 contexts\JudgePageContext.tsx (行 64)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 118) 与 contexts\JudgePageContext.tsx (行 65)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 119) 与 contexts\JudgePageContext.tsx (行 66)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 126) 与 contexts\JudgePageContext.tsx (行 74)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 81) 与 contexts\JudgePageContext.tsx (行 82)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 87) 与 contexts\JudgePageContext.tsx (行 88)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 135) 与 contexts\JudgePageContext.tsx (行 136)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 152) 与 contexts\JudgePageContext.tsx (行 153)
  - 相似度: 100.0%

- contexts\JudgePageContext.tsx (行 163) 与 contexts\JudgePageContext.tsx (行 164)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 205) 与 contexts\JudgePageContext.tsx (行 214)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 206) 与 contexts\JudgePageContext.tsx (行 215)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 207) 与 contexts\JudgePageContext.tsx (行 216)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 99) 与 contexts\JudgePageContext.tsx (行 224)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 contexts\JudgePageContext.tsx (行 225)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 contexts\JudgePageContext.tsx (行 226)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 contexts\JudgePageContext.tsx (行 227)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 contexts\JudgePageContext.tsx (行 228)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 7) 与 contexts\PermissionContext.tsx (行 8)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 93) 与 contexts\PermissionContext.tsx (行 94)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 113) 与 contexts\PermissionContext.tsx (行 114)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 60) 与 contexts\PermissionContext.tsx (行 167)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 184) 与 contexts\PermissionContext.tsx (行 185)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 contexts\PermissionContext.tsx (行 202)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 203) 与 contexts\PermissionContext.tsx (行 204)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 215) 与 contexts\PermissionContext.tsx (行 233)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 216) 与 contexts\PermissionContext.tsx (行 234)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 239) 与 contexts\PermissionContext.tsx (行 240)
  - 相似度: 100.0%

- contexts\PermissionContext.tsx (行 256) 与 contexts\PermissionContext.tsx (行 257)
  - 相似度: 100.0%

- hooks\index.ts (行 15) 与 hooks\index.ts (行 16)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 224) 与 hooks\shared\useDataFetch.ts (行 225)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 243) 与 hooks\shared\useDataFetch.ts (行 244)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 266) 与 hooks\shared\useDataFetch.ts (行 267)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 312) 与 hooks\shared\useDataFetch.ts (行 313)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 322) 与 hooks\shared\useDataFetch.ts (行 323)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 373) 与 hooks\shared\useDataFetch.ts (行 374)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 358) 与 hooks\shared\useDataFetch.ts (行 382)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 563) 与 hooks\shared\useDataFetch.ts (行 591)
  - 相似度: 100.0%

- hooks\shared\useDataFetch.ts (行 624) 与 hooks\shared\useDataFetch.ts (行 625)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 410) 与 hooks\shared\useForm.ts (行 411)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 427) 与 hooks\shared\useForm.ts (行 428)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 433) 与 hooks\shared\useForm.ts (行 434)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 439) 与 hooks\shared\useForm.ts (行 440)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 470) 与 hooks\shared\useForm.ts (行 471)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 485) 与 hooks\shared\useForm.ts (行 486)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 493) 与 hooks\shared\useForm.ts (行 494)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 560) 与 hooks\shared\useForm.ts (行 561)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 560) 与 hooks\shared\useForm.ts (行 577)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 560) 与 hooks\shared\useForm.ts (行 578)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 587) 与 hooks\shared\useForm.ts (行 588)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 615) 与 hooks\shared\useForm.ts (行 616)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 688) 与 hooks\shared\useForm.ts (行 689)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 706) 与 hooks\shared\useForm.ts (行 707)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 730) 与 hooks\shared\useForm.ts (行 731)
  - 相似度: 100.0%

- hooks\shared\useForm.ts (行 507) 与 hooks\shared\useForm.ts (行 744)
  - 相似度: 100.0%

- hooks\shared\useGameState.ts (行 372) 与 hooks\shared\useGameState.ts (行 373)
  - 相似度: 100.0%

- hooks\shared\useGameState.ts (行 407) 与 hooks\shared\useGameState.ts (行 408)
  - 相似度: 100.0%

- hooks\shared\useGameState.ts (行 413) 与 hooks\shared\useGameState.ts (行 414)
  - 相似度: 100.0%

- hooks\skill\useSkillData.ts (行 109) 与 hooks\skill\useSkillData.ts (行 110)
  - 相似度: 100.0%

- hooks\skill\useSkillRealtime.ts (行 70) 与 hooks\skill\useSkillRealtime.ts (行 71)
  - 相似度: 100.0%

- hooks\skill\useSkillStats.ts (行 43) 与 hooks\skill\useSkillStats.ts (行 44)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 55) 与 hooks\skill\useSkillValidation.ts (行 192)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 56) 与 hooks\skill\useSkillValidation.ts (行 193)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 57) 与 hooks\skill\useSkillValidation.ts (行 194)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 58) 与 hooks\skill\useSkillValidation.ts (行 195)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 59) 与 hooks\skill\useSkillValidation.ts (行 196)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 60) 与 hooks\skill\useSkillValidation.ts (行 197)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 32) 与 hooks\skill\useSkillValidation.ts (行 208)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 58) 与 hooks\skill\useSkillValidation.ts (行 218)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 59) 与 hooks\skill\useSkillValidation.ts (行 219)
  - 相似度: 100.0%

- hooks\skill\useSkillValidation.ts (行 60) 与 hooks\skill\useSkillValidation.ts (行 220)
  - 相似度: 100.0%

- hooks\useApi.ts (行 52) 与 hooks\useApi.ts (行 53)
  - 相似度: 100.0%

- hooks\useApi.ts (行 66) 与 hooks\useApi.ts (行 67)
  - 相似度: 100.0%

- hooks\useApi.ts (行 85) 与 hooks\useApi.ts (行 86)
  - 相似度: 100.0%

- hooks\useApi.ts (行 231) 与 hooks\useApi.ts (行 232)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 14) 与 hooks\useAutoDyingStatusProcessor.ts (行 15)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 172) 与 hooks\useAutoDyingStatusProcessor.ts (行 173)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 211) 与 hooks\useAutoDyingStatusProcessor.ts (行 212)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 217) 与 hooks\useAutoDyingStatusProcessor.ts (行 218)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 245) 与 hooks\useAutoDyingStatusProcessor.ts (行 246)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 249) 与 hooks\useAutoDyingStatusProcessor.ts (行 250)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 255) 与 hooks\useAutoDyingStatusProcessor.ts (行 256)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 287) 与 hooks\useAutoDyingStatusProcessor.ts (行 288)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 295) 与 hooks\useAutoDyingStatusProcessor.ts (行 296)
  - 相似度: 100.0%

- hooks\useAutoProcessDayVote.ts (行 4) 与 hooks\useAutoProcessDayVote.ts (行 5)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 64) 与 hooks\useDataCache.ts (行 65)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 95) 与 hooks\useDataCache.ts (行 96)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 117) 与 hooks\useDataCache.ts (行 118)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 169) 与 hooks\useDataCache.ts (行 170)
  - 相似度: 100.0%

- hooks\useDataCache.ts (行 186) 与 hooks\useDataCache.ts (行 187)
  - 相似度: 100.0%

- hooks\useDebounce.ts (行 16) 与 hooks\useDebounce.ts (行 17)
  - 相似度: 100.0%

- hooks\useDebounce.ts (行 22) 与 hooks\useDebounce.ts (行 23)
  - 相似度: 100.0%

- hooks\useDyingStatusManager.ts (行 35) 与 hooks\useDyingStatusManager.ts (行 36)
  - 相似度: 100.0%

- hooks\useDyingStatusManager.ts (行 82) 与 hooks\useDyingStatusManager.ts (行 83)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 132) 与 hooks\useEnhancedErrorHandler.ts (行 133)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 146) 与 hooks\useEnhancedErrorHandler.ts (行 158)
  - 相似度: 100.0%

- hooks\useEnhancedErrorHandler.ts (行 167) 与 hooks\useEnhancedErrorHandler.ts (行 168)
  - 相似度: 100.0%

- hooks\useEnhancedSkillSystem.ts (行 33) 与 hooks\useEnhancedSkillSystem.ts (行 34)
  - 相似度: 100.0%

- hooks\useEnhancedSkillSystem.ts (行 107) 与 hooks\useEnhancedSkillSystem.ts (行 108)
  - 相似度: 100.0%

- hooks\useEnhancedSkillSystem.ts (行 175) 与 hooks\useEnhancedSkillSystem.ts (行 176)
  - 相似度: 100.0%

- hooks\useEnhancedSkillSystem.ts (行 181) 与 hooks\useEnhancedSkillSystem.ts (行 182)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 85) 与 hooks\useErrorHandler.ts (行 86)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 69) 与 hooks\useErrorHandler.ts (行 104)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 70) 与 hooks\useErrorHandler.ts (行 105)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 71) 与 hooks\useErrorHandler.ts (行 106)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 72) 与 hooks\useErrorHandler.ts (行 107)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 73) 与 hooks\useErrorHandler.ts (行 108)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 74) 与 hooks\useErrorHandler.ts (行 109)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 75) 与 hooks\useErrorHandler.ts (行 110)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 76) 与 hooks\useErrorHandler.ts (行 111)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 77) 与 hooks\useErrorHandler.ts (行 112)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 78) 与 hooks\useErrorHandler.ts (行 113)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 79) 与 hooks\useErrorHandler.ts (行 114)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 80) 与 hooks\useErrorHandler.ts (行 115)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 81) 与 hooks\useErrorHandler.ts (行 116)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 82) 与 hooks\useErrorHandler.ts (行 117)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 83) 与 hooks\useErrorHandler.ts (行 118)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 84) 与 hooks\useErrorHandler.ts (行 119)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 85) 与 hooks\useErrorHandler.ts (行 120)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 85) 与 hooks\useErrorHandler.ts (行 121)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 87) 与 hooks\useErrorHandler.ts (行 122)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 88) 与 hooks\useErrorHandler.ts (行 123)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 89) 与 hooks\useErrorHandler.ts (行 124)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 90) 与 hooks\useErrorHandler.ts (行 125)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 91) 与 hooks\useErrorHandler.ts (行 126)
  - 相似度: 100.0%

- hooks\useErrorHandler.ts (行 92) 与 hooks\useErrorHandler.ts (行 127)
  - 相似度: 100.0%

- hooks\useAutoProcessDayVote.ts (行 4) 与 hooks\useEveningRefresh.ts (行 2)
  - 相似度: 100.0%

- hooks\useAutoProcessDayVote.ts (行 4) 与 hooks\useEveningRefresh.ts (行 3)
  - 相似度: 100.0%

- hooks\useAutoProcessDayVote.ts (行 6) 与 hooks\useEveningRefresh.ts (行 4)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 109) 与 hooks\useGameState.ts (行 110)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 143) 与 hooks\useGameState.ts (行 170)
  - 相似度: 100.0%

- hooks\useAutoDyingStatusProcessor.ts (行 283) 与 hooks\useGameState.ts (行 171)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 182) 与 hooks\useGameState.ts (行 183)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 339) 与 hooks\useGameState.ts (行 340)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 334) 与 hooks\useGameState.ts (行 361)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 334) 与 hooks\useGameState.ts (行 405)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 313) 与 hooks\useGameState.ts (行 510)
  - 相似度: 100.0%

- components\game\displays\GameStateDisplay.tsx (行 54) 与 hooks\useGameState.ts (行 545)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 10) 与 hooks\useMemoryManager.ts (行 11)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 30) 与 hooks\useMemoryManager.ts (行 31)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 36) 与 hooks\useMemoryManager.ts (行 37)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 45) 与 hooks\useMemoryManager.ts (行 46)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 56) 与 hooks\useMemoryManager.ts (行 57)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 67) 与 hooks\useMemoryManager.ts (行 68)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 105) 与 hooks\useMemoryManager.ts (行 106)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 111) 与 hooks\useMemoryManager.ts (行 112)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 195) 与 hooks\useMemoryManager.ts (行 196)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 203) 与 hooks\useMemoryManager.ts (行 204)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 205) 与 hooks\useMemoryManager.ts (行 206)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 227) 与 hooks\useMemoryManager.ts (行 228)
  - 相似度: 100.0%

- hooks\useMemoryManager.ts (行 229) 与 hooks\useMemoryManager.ts (行 230)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 69) 与 hooks\useMultiChannelChat.ts (行 70)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 88) 与 hooks\useMultiChannelChat.ts (行 89)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 140) 与 hooks\useMultiChannelChat.ts (行 141)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 146) 与 hooks\useMultiChannelChat.ts (行 147)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 152) 与 hooks\useMultiChannelChat.ts (行 153)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 171) 与 hooks\useMultiChannelChat.ts (行 172)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 177) 与 hooks\useMultiChannelChat.ts (行 178)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 99) 与 hooks\useMultiChannelChat.ts (行 185)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 hooks\useMultiChannelChat.ts (行 186)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 hooks\useMultiChannelChat.ts (行 187)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useMultiChannelChat.ts (行 188)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useMultiChannelChat.ts (行 189)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 334) 与 hooks\useMultiChannelChat.ts (行 242)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 313) 与 hooks\useMultiChannelChat.ts (行 254)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 17) 与 hooks\useOptimizedSupabaseQuery.ts (行 18)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 40) 与 hooks\useOptimizedSupabaseQuery.ts (行 41)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 78) 与 hooks\useOptimizedSupabaseQuery.ts (行 79)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 141) 与 hooks\useOptimizedSupabaseQuery.ts (行 142)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 156) 与 hooks\useOptimizedSupabaseQuery.ts (行 157)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 170) 与 hooks\useOptimizedSupabaseQuery.ts (行 171)
  - 相似度: 100.0%

- hooks\useOptimizedSupabaseQuery.ts (行 194) 与 hooks\useOptimizedSupabaseQuery.ts (行 195)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 29) 与 hooks\usePerformanceMonitoring.ts (行 30)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 120) 与 hooks\usePerformanceMonitoring.ts (行 135)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 121) 与 hooks\usePerformanceMonitoring.ts (行 136)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 122) 与 hooks\usePerformanceMonitoring.ts (行 137)
  - 相似度: 100.0%

- hooks\usePerformanceMonitoring.ts (行 123) 与 hooks\usePerformanceMonitoring.ts (行 138)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 45) 与 hooks\usePerformanceOptimization.ts (行 73)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 46) 与 hooks\usePerformanceOptimization.ts (行 74)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 47) 与 hooks\usePerformanceOptimization.ts (行 75)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 79) 与 hooks\usePerformanceOptimization.ts (行 80)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 58) 与 hooks\usePerformanceOptimization.ts (行 88)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 59) 与 hooks\usePerformanceOptimization.ts (行 89)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 60) 与 hooks\usePerformanceOptimization.ts (行 90)
  - 相似度: 100.0%

- hooks\usePerformanceOptimization.ts (行 145) 与 hooks\usePerformanceOptimization.ts (行 146)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 49) 与 hooks\usePerformanceOptimizationNew.ts (行 50)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 63) 与 hooks\usePerformanceOptimizationNew.ts (行 64)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 123) 与 hooks\usePerformanceOptimizationNew.ts (行 124)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 129) 与 hooks\usePerformanceOptimizationNew.ts (行 130)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 135) 与 hooks\usePerformanceOptimizationNew.ts (行 136)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 143) 与 hooks\usePerformanceOptimizationNew.ts (行 144)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 149) 与 hooks\usePerformanceOptimizationNew.ts (行 150)
  - 相似度: 100.0%

- hooks\usePerformanceOptimizationNew.ts (行 151) 与 hooks\usePerformanceOptimizationNew.ts (行 152)
  - 相似度: 100.0%

- hooks\usePlayerPresence.ts (行 4) 与 hooks\usePlayerPresence.ts (行 5)
  - 相似度: 100.0%

- hooks\usePlayerPresence.ts (行 31) 与 hooks\usePlayerPresence.ts (行 32)
  - 相似度: 100.0%

- hooks\usePlayerPresence.ts (行 70) 与 hooks\usePlayerPresence.ts (行 71)
  - 相似度: 100.0%

- hooks\usePlayerRoom.ts (行 101) 与 hooks\usePlayerRoom.ts (行 102)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 32) 与 hooks\usePlayersRealtime.ts (行 3)
  - 相似度: 100.0%

- components\judge\management\PlayerStatusPanel.tsx (行 33) 与 hooks\usePlayersRealtime.ts (行 4)
  - 相似度: 100.0%

- components\room\PlayersList.tsx (行 25) 与 hooks\usePlayersRealtime.ts (行 5)
  - 相似度: 100.0%

- hooks\usePlayersRealtime.ts (行 55) 与 hooks\usePlayersRealtime.ts (行 56)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 217) 与 hooks\usePlayersRealtime.ts (行 134)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 99) 与 hooks\usePlayersRealtime.ts (行 135)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 hooks\usePlayersRealtime.ts (行 136)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 hooks\usePlayersRealtime.ts (行 137)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\usePlayersRealtime.ts (行 138)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\usePlayersRealtime.ts (行 139)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 104) 与 hooks\usePlayersRealtime.ts (行 140)
  - 相似度: 100.0%

- hooks\usePlayersRealtime.ts (行 163) 与 hooks\usePlayersRealtime.ts (行 164)
  - 相似度: 100.0%

- hooks\usePlayersRealtime.ts (行 187) 与 hooks\usePlayersRealtime.ts (行 188)
  - 相似度: 100.0%

- hooks\usePlayersRealtime.ts (行 193) 与 hooks\usePlayersRealtime.ts (行 194)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 217) 与 hooks\useRoleSelection.ts (行 83)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 99) 与 hooks\useRoleSelection.ts (行 84)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 hooks\useRoleSelection.ts (行 85)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 hooks\useRoleSelection.ts (行 86)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoleSelection.ts (行 87)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoleSelection.ts (行 88)
  - 相似度: 100.0%

- hooks\useRoleSelection.ts (行 101) 与 hooks\useRoleSelection.ts (行 102)
  - 相似度: 100.0%

- hooks\useRoleSelection.ts (行 111) 与 hooks\useRoleSelection.ts (行 112)
  - 相似度: 100.0%

- hooks\useRoleSelection.ts (行 138) 与 hooks\useRoleSelection.ts (行 139)
  - 相似度: 100.0%

- hooks\useRoleSelection.ts (行 162) 与 hooks\useRoleSelection.ts (行 163)
  - 相似度: 100.0%

- hooks\useRoleStates.ts (行 45) 与 hooks\useRoleStates.ts (行 46)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoleStates.ts (行 83)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoleStates.ts (行 84)
  - 相似度: 100.0%

- hooks\useRoomAnswers.ts (行 44) 与 hooks\useRoomAnswers.ts (行 45)
  - 相似度: 100.0%

- hooks\skill\useSkillRealtime.ts (行 48) 与 hooks\useRoomAnswers.ts (行 74)
  - 相似度: 100.0%

- hooks\useRoleStates.ts (行 80) 与 hooks\useRoomAnswers.ts (行 76)
  - 相似度: 100.0%

- hooks\useRoleStates.ts (行 81) 与 hooks\useRoomAnswers.ts (行 77)
  - 相似度: 100.0%

- hooks\useRoleStates.ts (行 82) 与 hooks\useRoomAnswers.ts (行 78)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoomAnswers.ts (行 79)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoomAnswers.ts (行 80)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 104) 与 hooks\useRoomChat.ts (行 36)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 105) 与 hooks\useRoomChat.ts (行 37)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 106) 与 hooks\useRoomChat.ts (行 38)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 118) 与 hooks\useRoomChat.ts (行 48)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 119) 与 hooks\useRoomChat.ts (行 49)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 120) 与 hooks\useRoomChat.ts (行 50)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 121) 与 hooks\useRoomChat.ts (行 51)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 122) 与 hooks\useRoomChat.ts (行 52)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 123) 与 hooks\useRoomChat.ts (行 53)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 124) 与 hooks\useRoomChat.ts (行 54)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 131) 与 hooks\useRoomChat.ts (行 59)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 132) 与 hooks\useRoomChat.ts (行 60)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 133) 与 hooks\useRoomChat.ts (行 61)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 134) 与 hooks\useRoomChat.ts (行 62)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 135) 与 hooks\useRoomChat.ts (行 63)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 136) 与 hooks\useRoomChat.ts (行 64)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 137) 与 hooks\useRoomChat.ts (行 65)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 138) 与 hooks\useRoomChat.ts (行 66)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 139) 与 hooks\useRoomChat.ts (行 67)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 140) 与 hooks\useRoomChat.ts (行 68)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 140) 与 hooks\useRoomChat.ts (行 69)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 142) 与 hooks\useRoomChat.ts (行 70)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 143) 与 hooks\useRoomChat.ts (行 71)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 144) 与 hooks\useRoomChat.ts (行 72)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 145) 与 hooks\useRoomChat.ts (行 73)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 146) 与 hooks\useRoomChat.ts (行 74)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 146) 与 hooks\useRoomChat.ts (行 75)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 148) 与 hooks\useRoomChat.ts (行 76)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 149) 与 hooks\useRoomChat.ts (行 77)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 150) 与 hooks\useRoomChat.ts (行 78)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 151) 与 hooks\useRoomChat.ts (行 79)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 152) 与 hooks\useRoomChat.ts (行 80)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 152) 与 hooks\useRoomChat.ts (行 81)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 154) 与 hooks\useRoomChat.ts (行 82)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 161) 与 hooks\useRoomChat.ts (行 89)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 162) 与 hooks\useRoomChat.ts (行 90)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 163) 与 hooks\useRoomChat.ts (行 91)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 164) 与 hooks\useRoomChat.ts (行 92)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 165) 与 hooks\useRoomChat.ts (行 93)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 166) 与 hooks\useRoomChat.ts (行 94)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 167) 与 hooks\useRoomChat.ts (行 95)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 168) 与 hooks\useRoomChat.ts (行 96)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 169) 与 hooks\useRoomChat.ts (行 97)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 170) 与 hooks\useRoomChat.ts (行 98)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 171) 与 hooks\useRoomChat.ts (行 99)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 171) 与 hooks\useRoomChat.ts (行 100)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 173) 与 hooks\useRoomChat.ts (行 101)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 174) 与 hooks\useRoomChat.ts (行 102)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 175) 与 hooks\useRoomChat.ts (行 103)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 176) 与 hooks\useRoomChat.ts (行 104)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 177) 与 hooks\useRoomChat.ts (行 105)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 177) 与 hooks\useRoomChat.ts (行 106)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 179) 与 hooks\useRoomChat.ts (行 107)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 180) 与 hooks\useRoomChat.ts (行 108)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 181) 与 hooks\useRoomChat.ts (行 109)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 182) 与 hooks\useRoomChat.ts (行 110)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 183) 与 hooks\useRoomChat.ts (行 111)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 184) 与 hooks\useRoomChat.ts (行 112)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 99) 与 hooks\useRoomChat.ts (行 113)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 hooks\useRoomChat.ts (行 114)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 hooks\useRoomChat.ts (行 115)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoomChat.ts (行 116)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoomChat.ts (行 117)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 104) 与 hooks\useRoomChat.ts (行 118)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 216) 与 hooks\useRoomChat.ts (行 134)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 217) 与 hooks\useRoomChat.ts (行 135)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 218) 与 hooks\useRoomChat.ts (行 136)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 219) 与 hooks\useRoomChat.ts (行 137)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 220) 与 hooks\useRoomChat.ts (行 138)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 221) 与 hooks\useRoomChat.ts (行 139)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 222) 与 hooks\useRoomChat.ts (行 140)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 223) 与 hooks\useRoomChat.ts (行 141)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 224) 与 hooks\useRoomChat.ts (行 142)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 237) 与 hooks\useRoomChat.ts (行 152)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 238) 与 hooks\useRoomChat.ts (行 153)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 239) 与 hooks\useRoomChat.ts (行 154)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 240) 与 hooks\useRoomChat.ts (行 155)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 241) 与 hooks\useRoomChat.ts (行 156)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 334) 与 hooks\useRoomChat.ts (行 157)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 335) 与 hooks\useRoomChat.ts (行 158)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 249) 与 hooks\useRoomChat.ts (行 163)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 250) 与 hooks\useRoomChat.ts (行 164)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 251) 与 hooks\useRoomChat.ts (行 165)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 252) 与 hooks\useRoomChat.ts (行 166)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 253) 与 hooks\useRoomChat.ts (行 167)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 313) 与 hooks\useRoomChat.ts (行 168)
  - 相似度: 100.0%

- hooks\useRoomCleanup.ts (行 30) 与 hooks\useRoomCleanup.ts (行 31)
  - 相似度: 100.0%

- hooks\useRoomRealtime.ts (行 3) 与 hooks\useRoomRealtime.ts (行 4)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 hooks\useRoomRealtime.ts (行 45)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 hooks\useRoomRealtime.ts (行 46)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoomRealtime.ts (行 47)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 102) 与 hooks\useRoomRealtime.ts (行 48)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 104) 与 hooks\useRoomRealtime.ts (行 49)
  - 相似度: 100.0%

- hooks\useRoomRealtime.ts (行 73) 与 hooks\useRoomRealtime.ts (行 74)
  - 相似度: 100.0%

- hooks\useRoomTransition.ts (行 121) 与 hooks\useRoomTransition.ts (行 122)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 43) 与 hooks\useSkillEffectAutoProcessor.ts (行 44)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 47) 与 hooks\useSkillEffectAutoProcessor.ts (行 48)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 96) 与 hooks\useSkillEffectAutoProcessor.ts (行 97)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 102) 与 hooks\useSkillEffectAutoProcessor.ts (行 103)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 196) 与 hooks\useSkillEffectAutoProcessor.ts (行 197)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 55) 与 hooks\useSkillEffectProcessor.ts (行 56)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 66) 与 hooks\useSkillEffectProcessor.ts (行 67)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 49) 与 hooks\useSkillEffectProcessor.ts (行 72)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 50) 与 hooks\useSkillEffectProcessor.ts (行 73)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 51) 与 hooks\useSkillEffectProcessor.ts (行 74)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 52) 与 hooks\useSkillEffectProcessor.ts (行 75)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 53) 与 hooks\useSkillEffectProcessor.ts (行 76)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 54) 与 hooks\useSkillEffectProcessor.ts (行 77)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 55) 与 hooks\useSkillEffectProcessor.ts (行 78)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 56) 与 hooks\useSkillEffectProcessor.ts (行 79)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 83) 与 hooks\useSkillEffectProcessor.ts (行 84)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 79) 与 hooks\useSkillEffectProcessor.ts (行 103)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 80) 与 hooks\useSkillEffectProcessor.ts (行 104)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 107) 与 hooks\useSkillEffectProcessor.ts (行 108)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 128) 与 hooks\useSkillEffectProcessor.ts (行 129)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 138) 与 hooks\useSkillEffectProcessor.ts (行 139)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 158) 与 hooks\useSkillEffectProcessor.ts (行 185)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 166) 与 hooks\useSkillEffectProcessor.ts (行 192)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 167) 与 hooks\useSkillEffectProcessor.ts (行 193)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 168) 与 hooks\useSkillEffectProcessor.ts (行 194)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 169) 与 hooks\useSkillEffectProcessor.ts (行 195)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 170) 与 hooks\useSkillEffectProcessor.ts (行 196)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 48) 与 hooks\useSkillEffectProcessor.ts (行 198)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 194) 与 hooks\useSkillEffectProcessor.ts (行 209)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 195) 与 hooks\useSkillEffectProcessor.ts (行 210)
  - 相似度: 100.0%

- hooks\useSkillEffectProcessor.ts (行 211) 与 hooks\useSkillEffectProcessor.ts (行 212)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 202) 与 hooks\useSkillEffectProcessor.ts (行 217)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 203) 与 hooks\useSkillEffectProcessor.ts (行 218)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 204) 与 hooks\useSkillEffectProcessor.ts (行 219)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 205) 与 hooks\useSkillEffectProcessor.ts (行 220)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 206) 与 hooks\useSkillEffectProcessor.ts (行 221)
  - 相似度: 100.0%

- hooks\useSkillEffectAutoProcessor.ts (行 207) 与 hooks\useSkillEffectProcessor.ts (行 222)
  - 相似度: 100.0%

- hooks\useToast.ts (行 20) 与 hooks\useToast.ts (行 21)
  - 相似度: 100.0%

- hooks\useToast.ts (行 26) 与 hooks\useToast.ts (行 27)
  - 相似度: 100.0%

- hooks\useToast.ts (行 96) 与 hooks\useToast.ts (行 97)
  - 相似度: 100.0%

- hooks\useToast.ts (行 105) 与 hooks\useToast.ts (行 106)
  - 相似度: 100.0%

- hooks\useToast.ts (行 205) 与 hooks\useToast.ts (行 206)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 63) 与 hooks\useUnifiedErrorHandling.ts (行 64)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 93) 与 hooks\useUnifiedErrorHandling.ts (行 94)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 170) 与 hooks\useUnifiedErrorHandling.ts (行 171)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 315) 与 hooks\useUnifiedErrorHandling.ts (行 316)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 321) 与 hooks\useUnifiedErrorHandling.ts (行 322)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 327) 与 hooks\useUnifiedErrorHandling.ts (行 328)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 330) 与 hooks\useUnifiedErrorHandling.ts (行 331)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 333) 与 hooks\useUnifiedErrorHandling.ts (行 334)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 343) 与 hooks\useUnifiedErrorHandling.ts (行 344)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 396) 与 hooks\useUnifiedErrorHandling.ts (行 397)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 398) 与 hooks\useUnifiedErrorHandling.ts (行 399)
  - 相似度: 100.0%

- hooks\useUnifiedErrorHandling.ts (行 512) 与 hooks\useUnifiedErrorHandling.ts (行 513)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 26) 与 hooks\useUXOptimization.ts (行 27)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 98) 与 hooks\useUXOptimization.ts (行 99)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 111) 与 hooks\useUXOptimization.ts (行 112)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 117) 与 hooks\useUXOptimization.ts (行 118)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 123) 与 hooks\useUXOptimization.ts (行 124)
  - 相似度: 100.0%

- hooks\useUXOptimization.ts (行 246) 与 hooks\useUXOptimization.ts (行 247)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 4) 与 hooks\useVoteResults.ts (行 5)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 69) 与 hooks\useVoteResults.ts (行 70)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 90) 与 hooks\useVoteResults.ts (行 91)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 132) 与 hooks\useVoteResults.ts (行 133)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 149) 与 hooks\useVoteResults.ts (行 159)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 150) 与 hooks\useVoteResults.ts (行 160)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 151) 与 hooks\useVoteResults.ts (行 161)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 217) 与 hooks\useVoteResults.ts (行 164)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 99) 与 hooks\useVoteResults.ts (行 165)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 hooks\useVoteResults.ts (行 166)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 hooks\useVoteResults.ts (行 167)
  - 相似度: 100.0%

- hooks\useVoteResults.ts (行 168) 与 hooks\useVoteResults.ts (行 169)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 78) 与 hooks\useVotingSystem.ts (行 79)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 112) 与 hooks\useVotingSystem.ts (行 113)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 127) 与 hooks\useVotingSystem.ts (行 128)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 151) 与 hooks\useVotingSystem.ts (行 152)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 292) 与 hooks\useVotingSystem.ts (行 293)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 295) 与 hooks\useVotingSystem.ts (行 296)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 301) 与 hooks\useVotingSystem.ts (行 302)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 323) 与 hooks\useVotingSystem.ts (行 324)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 347) 与 hooks\useVotingSystem.ts (行 373)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 348) 与 hooks\useVotingSystem.ts (行 374)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 349) 与 hooks\useVotingSystem.ts (行 375)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 380) 与 hooks\useVotingSystem.ts (行 381)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 347) 与 hooks\useVotingSystem.ts (行 395)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 402) 与 hooks\useVotingSystem.ts (行 403)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 408) 与 hooks\useVotingSystem.ts (行 409)
  - 相似度: 100.0%

- hooks\useVotingSystem.ts (行 414) 与 hooks\useVotingSystem.ts (行 415)
  - 相似度: 100.0%

- components\voting\VotingPanel.tsx (行 94) 与 hooks\useVotingSystem.ts (行 553)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 32) 与 hooks\useWitchPotionManager.ts (行 33)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 58) 与 hooks\useWitchPotionManager.ts (行 59)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 60) 与 hooks\useWitchPotionManager.ts (行 61)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 66) 与 hooks\useWitchPotionManager.ts (行 67)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 72) 与 hooks\useWitchPotionManager.ts (行 73)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 334) 与 hooks\useWitchPotionManager.ts (行 112)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 95) 与 hooks\useWitchPotionManager.ts (行 149)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 96) 与 hooks\useWitchPotionManager.ts (行 150)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 97) 与 hooks\useWitchPotionManager.ts (行 151)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 98) 与 hooks\useWitchPotionManager.ts (行 152)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 99) 与 hooks\useWitchPotionManager.ts (行 153)
  - 相似度: 100.0%

- hooks\useGameState.ts (行 334) 与 hooks\useWitchPotionManager.ts (行 166)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 128) 与 hooks\useWitchPotionManager.ts (行 182)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 189) 与 hooks\useWitchPotionManager.ts (行 190)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 217) 与 hooks\useWitchPotionManager.ts (行 210)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 99) 与 hooks\useWitchPotionManager.ts (行 211)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 100) 与 hooks\useWitchPotionManager.ts (行 212)
  - 相似度: 100.0%

- components\judge\monitoring\PlayerStatusDisplay.tsx (行 101) 与 hooks\useWitchPotionManager.ts (行 213)
  - 相似度: 100.0%

- hooks\useWitchPotionManager.ts (行 214) 与 hooks\useWitchPotionManager.ts (行 215)
  - 相似度: 100.0%

- integrations\supabase\client.ts (行 12) 与 integrations\supabase\client.ts (行 13)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 146) 与 integrations\supabase\types.ts (行 156)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 188) 与 integrations\supabase\types.ts (行 203)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 189) 与 integrations\supabase\types.ts (行 204)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 190) 与 integrations\supabase\types.ts (行 205)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 191) 与 integrations\supabase\types.ts (行 206)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 235) 与 integrations\supabase\types.ts (行 245)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 236) 与 integrations\supabase\types.ts (行 246)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 237) 与 integrations\supabase\types.ts (行 247)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 238) 与 integrations\supabase\types.ts (行 248)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 304) 与 integrations\supabase\types.ts (行 316)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 362) 与 integrations\supabase\types.ts (行 376)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 363) 与 integrations\supabase\types.ts (行 377)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 471) 与 integrations\supabase\types.ts (行 482)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 472) 与 integrations\supabase\types.ts (行 483)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 473) 与 integrations\supabase\types.ts (行 484)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 474) 与 integrations\supabase\types.ts (行 485)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 475) 与 integrations\supabase\types.ts (行 486)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 526) 与 integrations\supabase\types.ts (行 534)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 527) 与 integrations\supabase\types.ts (行 535)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 591) 与 integrations\supabase\types.ts (行 602)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 592) 与 integrations\supabase\types.ts (行 603)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 820) 与 integrations\supabase\types.ts (行 834)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 821) 与 integrations\supabase\types.ts (行 835)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 997) 与 integrations\supabase\types.ts (行 1010)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 998) 与 integrations\supabase\types.ts (行 1011)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 999) 与 integrations\supabase\types.ts (行 1012)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1000) 与 integrations\supabase\types.ts (行 1013)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1001) 与 integrations\supabase\types.ts (行 1014)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1325) 与 integrations\supabase\types.ts (行 1337)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1326) 与 integrations\supabase\types.ts (行 1338)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1400) 与 integrations\supabase\types.ts (行 1422)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1401) 与 integrations\supabase\types.ts (行 1423)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1402) 与 integrations\supabase\types.ts (行 1424)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1403) 与 integrations\supabase\types.ts (行 1425)
  - 相似度: 100.0%

- integrations\supabase\types.ts (行 1404) 与 integrations\supabase\types.ts (行 1426)
  - 相似度: 100.0%

- lib\debugUtils.ts (行 77) 与 lib\debugUtils.ts (行 92)
  - 相似度: 100.0%

- lib\debugUtils.ts (行 78) 与 lib\debugUtils.ts (行 93)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 8) 与 lib\errorBoundary.tsx (行 9)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 19) 与 lib\errorBoundary.tsx (行 20)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 34) 与 lib\errorBoundary.tsx (行 35)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 420) 与 lib\errorBoundary.tsx (行 104)
  - 相似度: 100.0%

- lib\errorBoundary.tsx (行 105) 与 lib\errorBoundary.tsx (行 106)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 11) 与 lib\performanceReporter.ts (行 12)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 30) 与 lib\performanceReporter.ts (行 31)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 36) 与 lib\performanceReporter.ts (行 37)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 54) 与 lib\performanceReporter.ts (行 55)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 182) 与 lib\performanceReporter.ts (行 183)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 192) 与 lib\performanceReporter.ts (行 193)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 198) 与 lib\performanceReporter.ts (行 199)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 283) 与 middleware\apiSecurityMiddleware.ts (行 284)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 286) 与 middleware\apiSecurityMiddleware.ts (行 287)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 289) 与 middleware\apiSecurityMiddleware.ts (行 290)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 303) 与 middleware\apiSecurityMiddleware.ts (行 304)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 306) 与 middleware\apiSecurityMiddleware.ts (行 307)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 376) 与 middleware\apiSecurityMiddleware.ts (行 377)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 394) 与 middleware\apiSecurityMiddleware.ts (行 395)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 412) 与 middleware\apiSecurityMiddleware.ts (行 413)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 475) 与 middleware\apiSecurityMiddleware.ts (行 476)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 491) 与 middleware\apiSecurityMiddleware.ts (行 492)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 497) 与 middleware\apiSecurityMiddleware.ts (行 498)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 510) 与 middleware\apiSecurityMiddleware.ts (行 511)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 540) 与 middleware\apiSecurityMiddleware.ts (行 541)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 542) 与 middleware\apiSecurityMiddleware.ts (行 543)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 571) 与 middleware\apiSecurityMiddleware.ts (行 572)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 591) 与 middleware\apiSecurityMiddleware.ts (行 592)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 458) 与 middleware\apiSecurityMiddleware.ts (行 596)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 459) 与 middleware\apiSecurityMiddleware.ts (行 597)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 460) 与 middleware\apiSecurityMiddleware.ts (行 598)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 615) 与 middleware\apiSecurityMiddleware.ts (行 616)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 621) 与 middleware\apiSecurityMiddleware.ts (行 622)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 615) 与 middleware\apiSecurityMiddleware.ts (行 627)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 615) 与 middleware\apiSecurityMiddleware.ts (行 628)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 633) 与 middleware\apiSecurityMiddleware.ts (行 634)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 615) 与 middleware\apiSecurityMiddleware.ts (行 639)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 615) 与 middleware\apiSecurityMiddleware.ts (行 640)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 679) 与 middleware\apiSecurityMiddleware.ts (行 680)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 784) 与 middleware\apiSecurityMiddleware.ts (行 810)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 785) 与 middleware\apiSecurityMiddleware.ts (行 811)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 786) 与 middleware\apiSecurityMiddleware.ts (行 812)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 793) 与 middleware\apiSecurityMiddleware.ts (行 819)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 835) 与 middleware\apiSecurityMiddleware.ts (行 836)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 786) 与 middleware\apiSecurityMiddleware.ts (行 838)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 793) 与 middleware\apiSecurityMiddleware.ts (行 845)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 896) 与 middleware\apiSecurityMiddleware.ts (行 912)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 897) 与 middleware\apiSecurityMiddleware.ts (行 913)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 898) 与 middleware\apiSecurityMiddleware.ts (行 914)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 899) 与 middleware\apiSecurityMiddleware.ts (行 915)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 900) 与 middleware\apiSecurityMiddleware.ts (行 916)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 980) 与 middleware\apiSecurityMiddleware.ts (行 981)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 986) 与 middleware\apiSecurityMiddleware.ts (行 987)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 73) 与 middleware\permissionMiddleware.ts (行 74)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 254) 与 middleware\permissionMiddleware.ts (行 255)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 277) 与 middleware\permissionMiddleware.ts (行 296)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 413) 与 middleware\permissionMiddleware.ts (行 414)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 440) 与 middleware\permissionMiddleware.ts (行 441)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 769) 与 middleware\permissionMiddleware.ts (行 471)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 504) 与 middleware\permissionMiddleware.ts (行 505)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 595) 与 middleware\permissionMiddleware.ts (行 624)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 786) 与 middleware\permissionMiddleware.ts (行 787)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 817) 与 middleware\permissionMiddleware.ts (行 818)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 893) 与 middleware\permissionMiddleware.ts (行 894)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 30) 与 pages\GameLobby.tsx (行 17)
  - 相似度: 100.0%

- components\dialogs\GameRulesDialog.tsx (行 30) 与 pages\GameLobby.tsx (行 18)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 24) 与 pages\GameLobby.tsx (行 19)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 25) 与 pages\GameLobby.tsx (行 20)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 26) 与 pages\GameLobby.tsx (行 21)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 27) 与 pages\GameLobby.tsx (行 22)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 28) 与 pages\GameLobby.tsx (行 23)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 29) 与 pages\GameLobby.tsx (行 24)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 30) 与 pages\GameLobby.tsx (行 25)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 31) 与 pages\GameLobby.tsx (行 26)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 32) 与 pages\GameLobby.tsx (行 27)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 33) 与 pages\GameLobby.tsx (行 28)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 34) 与 pages\GameLobby.tsx (行 29)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 35) 与 pages\GameLobby.tsx (行 30)
  - 相似度: 100.0%

- components\lobby\RoomListTable.tsx (行 36) 与 pages\GameLobby.tsx (行 31)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 52) 与 pages\GameLobby.tsx (行 53)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 122) 与 pages\GameLobby.tsx (行 138)
  - 相似度: 100.0%

- components\game\panels\StudentSystemPanel.tsx (行 217) 与 pages\GameLobby.tsx (行 139)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 172) 与 pages\GameLobby.tsx (行 173)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 193) 与 pages\GameLobby.tsx (行 194)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 199) 与 pages\GameLobby.tsx (行 200)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 205) 与 pages\GameLobby.tsx (行 206)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 228) 与 pages\GameLobby.tsx (行 229)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 309) 与 pages\GameLobby.tsx (行 310)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 292) 与 pages\GameLobby.tsx (行 380)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 293) 与 pages\GameLobby.tsx (行 381)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 294) 与 pages\GameLobby.tsx (行 382)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 295) 与 pages\GameLobby.tsx (行 383)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 296) 与 pages\GameLobby.tsx (行 384)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 297) 与 pages\GameLobby.tsx (行 385)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 298) 与 pages\GameLobby.tsx (行 386)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 299) 与 pages\GameLobby.tsx (行 387)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 300) 与 pages\GameLobby.tsx (行 388)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 301) 与 pages\GameLobby.tsx (行 389)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 302) 与 pages\GameLobby.tsx (行 390)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 303) 与 pages\GameLobby.tsx (行 391)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 304) 与 pages\GameLobby.tsx (行 392)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 397) 与 pages\GameLobby.tsx (行 398)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 317) 与 pages\GameLobby.tsx (行 405)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 318) 与 pages\GameLobby.tsx (行 406)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 325) 与 pages\GameLobby.tsx (行 413)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 326) 与 pages\GameLobby.tsx (行 414)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 327) 与 pages\GameLobby.tsx (行 415)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 328) 与 pages\GameLobby.tsx (行 416)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 329) 与 pages\GameLobby.tsx (行 417)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 330) 与 pages\GameLobby.tsx (行 418)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 331) 与 pages\GameLobby.tsx (行 419)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 332) 与 pages\GameLobby.tsx (行 420)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 339) 与 pages\GameLobby.tsx (行 427)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 340) 与 pages\GameLobby.tsx (行 428)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 341) 与 pages\GameLobby.tsx (行 429)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 342) 与 pages\GameLobby.tsx (行 430)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 343) 与 pages\GameLobby.tsx (行 431)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 344) 与 pages\GameLobby.tsx (行 432)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 345) 与 pages\GameLobby.tsx (行 433)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 346) 与 pages\GameLobby.tsx (行 434)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 347) 与 pages\GameLobby.tsx (行 435)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 348) 与 pages\GameLobby.tsx (行 436)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 349) 与 pages\GameLobby.tsx (行 437)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 350) 与 pages\GameLobby.tsx (行 438)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 351) 与 pages\GameLobby.tsx (行 439)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 352) 与 pages\GameLobby.tsx (行 440)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 353) 与 pages\GameLobby.tsx (行 441)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 354) 与 pages\GameLobby.tsx (行 442)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 355) 与 pages\GameLobby.tsx (行 443)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 356) 与 pages\GameLobby.tsx (行 444)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 357) 与 pages\GameLobby.tsx (行 445)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 358) 与 pages\GameLobby.tsx (行 446)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 294) 与 pages\GameLobby.tsx (行 470)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 295) 与 pages\GameLobby.tsx (行 471)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 296) 与 pages\GameLobby.tsx (行 472)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 297) 与 pages\GameLobby.tsx (行 473)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 298) 与 pages\GameLobby.tsx (行 474)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 299) 与 pages\GameLobby.tsx (行 475)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 300) 与 pages\GameLobby.tsx (行 476)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 301) 与 pages\GameLobby.tsx (行 477)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 302) 与 pages\GameLobby.tsx (行 478)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 303) 与 pages\GameLobby.tsx (行 479)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 304) 与 pages\GameLobby.tsx (行 480)
  - 相似度: 100.0%

- components\room\RoleSelection.tsx (行 164) 与 pages\GameLobby.tsx (行 545)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GamePage.tsx (行 102)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GamePage.tsx (行 118)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GamePage.tsx (行 131)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GamePage.tsx (行 143)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 608) 与 pages\GamePage.tsx (行 144)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 609) 与 pages\GamePage.tsx (行 145)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 651) 与 pages\GamePage.tsx (行 254)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 652) 与 pages\GamePage.tsx (行 255)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 653) 与 pages\GamePage.tsx (行 256)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 70) 与 pages\GameRoom.tsx (行 71)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 79) 与 pages\GameRoom.tsx (行 80)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 135) 与 pages\GameRoom.tsx (行 136)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 261) 与 pages\GameRoom.tsx (行 323)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 276) 与 pages\GameRoom.tsx (行 338)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 277) 与 pages\GameRoom.tsx (行 339)
  - 相似度: 100.0%

- components\room\RoleSelection.tsx (行 164) 与 pages\GameRoom.tsx (行 396)
  - 相似度: 100.0%

- components\room\RoleSelection.tsx (行 164) 与 pages\GameRoom.tsx (行 432)
  - 相似度: 100.0%

- components\room\RoleSelection.tsx (行 164) 与 pages\GameRoom.tsx (行 492)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GameRoom.tsx (行 579)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GameRoom.tsx (行 580)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 606) 与 pages\GameRoom.tsx (行 599)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\GameRoom.tsx (行 600)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 608) 与 pages\GameRoom.tsx (行 601)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 609) 与 pages\GameRoom.tsx (行 602)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 650) 与 pages\GameRoom.tsx (行 690)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 651) 与 pages\GameRoom.tsx (行 691)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 652) 与 pages\GameRoom.tsx (行 692)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 653) 与 pages\GameRoom.tsx (行 693)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 95) 与 pages\JudgePage.tsx (行 36)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\JudgePage.tsx (行 43)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 112) 与 pages\JudgePage.tsx (行 48)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 113) 与 pages\JudgePage.tsx (行 49)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 114) 与 pages\JudgePage.tsx (行 50)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 115) 与 pages\JudgePage.tsx (行 51)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 116) 与 pages\JudgePage.tsx (行 52)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 117) 与 pages\JudgePage.tsx (行 53)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\JudgePage.tsx (行 54)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 119) 与 pages\JudgePage.tsx (行 55)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 120) 与 pages\JudgePage.tsx (行 56)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 121) 与 pages\JudgePage.tsx (行 57)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 122) 与 pages\JudgePage.tsx (行 58)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 123) 与 pages\JudgePage.tsx (行 59)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 124) 与 pages\JudgePage.tsx (行 60)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 125) 与 pages\JudgePage.tsx (行 61)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 126) 与 pages\JudgePage.tsx (行 62)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 127) 与 pages\JudgePage.tsx (行 63)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 128) 与 pages\JudgePage.tsx (行 64)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 129) 与 pages\JudgePage.tsx (行 65)
  - 相似度: 100.0%

- pages\GamePage.tsx (行 130) 与 pages\JudgePage.tsx (行 66)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\JudgePage.tsx (行 67)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 607) 与 pages\JudgePage.tsx (行 79)
  - 相似度: 100.0%

- pages\GameLobby.tsx (行 608) 与 pages\JudgePage.tsx (行 80)
  - 相似度: 100.0%

- pages\GameRoom.tsx (行 689) 与 pages\JudgePage.tsx (行 119)
  - 相似度: 100.0%

- patterns\factory\SkillFactory.ts (行 148) 与 patterns\factory\SkillFactory.ts (行 149)
  - 相似度: 100.0%

- patterns\factory\SkillFactory.ts (行 166) 与 patterns\factory\SkillFactory.ts (行 167)
  - 相似度: 100.0%

- patterns\factory\SkillFactory.ts (行 214) 与 patterns\factory\SkillFactory.ts (行 215)
  - 相似度: 100.0%

- patterns\factory\SkillFactory.ts (行 240) 与 patterns\factory\SkillFactory.ts (行 241)
  - 相似度: 100.0%

- patterns\factory\SkillFactory.ts (行 314) 与 patterns\factory\SkillFactory.ts (行 315)
  - 相似度: 100.0%

- patterns\factory\SkillFactory.ts (行 445) 与 patterns\factory\SkillFactory.ts (行 446)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 134) 与 patterns\observer\EventEmitter.ts (行 135)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 177) 与 patterns\observer\EventEmitter.ts (行 178)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 200) 与 patterns\observer\EventEmitter.ts (行 230)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 201) 与 patterns\observer\EventEmitter.ts (行 231)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 202) 与 patterns\observer\EventEmitter.ts (行 232)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 203) 与 patterns\observer\EventEmitter.ts (行 233)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 204) 与 patterns\observer\EventEmitter.ts (行 234)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 432) 与 patterns\observer\EventEmitter.ts (行 433)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 431) 与 patterns\observer\EventEmitter.ts (行 488)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 432) 与 patterns\observer\EventEmitter.ts (行 489)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 432) 与 patterns\observer\EventEmitter.ts (行 490)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 434) 与 patterns\observer\EventEmitter.ts (行 491)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 435) 与 patterns\observer\EventEmitter.ts (行 492)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 436) 与 patterns\observer\EventEmitter.ts (行 493)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 437) 与 patterns\observer\EventEmitter.ts (行 494)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 438) 与 patterns\observer\EventEmitter.ts (行 495)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 439) 与 patterns\observer\EventEmitter.ts (行 496)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 440) 与 patterns\observer\EventEmitter.ts (行 497)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 441) 与 patterns\observer\EventEmitter.ts (行 498)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 442) 与 patterns\observer\EventEmitter.ts (行 499)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 443) 与 patterns\observer\EventEmitter.ts (行 500)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 444) 与 patterns\observer\EventEmitter.ts (行 501)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 445) 与 patterns\observer\EventEmitter.ts (行 502)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 446) 与 patterns\observer\EventEmitter.ts (行 503)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 447) 与 patterns\observer\EventEmitter.ts (行 504)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 448) 与 patterns\observer\EventEmitter.ts (行 505)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 449) 与 patterns\observer\EventEmitter.ts (行 506)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 509) 与 patterns\observer\EventEmitter.ts (行 510)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 462) 与 patterns\observer\EventEmitter.ts (行 521)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 463) 与 patterns\observer\EventEmitter.ts (行 522)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 464) 与 patterns\observer\EventEmitter.ts (行 523)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 573) 与 patterns\observer\EventEmitter.ts (行 574)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 679) 与 patterns\observer\EventEmitter.ts (行 680)
  - 相似度: 100.0%

- config\validationRules.ts (行 49) 与 patterns\strategy\ValidationStrategy.ts (行 29)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 178) 与 patterns\strategy\ValidationStrategy.ts (行 179)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 194) 与 patterns\strategy\ValidationStrategy.ts (行 195)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 227) 与 patterns\strategy\ValidationStrategy.ts (行 228)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 313) 与 patterns\strategy\ValidationStrategy.ts (行 314)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 319) 与 patterns\strategy\ValidationStrategy.ts (行 320)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 427) 与 patterns\strategy\ValidationStrategy.ts (行 428)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 422) 与 patterns\strategy\ValidationStrategy.ts (行 472)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 423) 与 patterns\strategy\ValidationStrategy.ts (行 473)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 424) 与 patterns\strategy\ValidationStrategy.ts (行 474)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 425) 与 patterns\strategy\ValidationStrategy.ts (行 475)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 426) 与 patterns\strategy\ValidationStrategy.ts (行 476)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 477) 与 patterns\strategy\ValidationStrategy.ts (行 478)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 449) 与 patterns\strategy\ValidationStrategy.ts (行 493)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 450) 与 patterns\strategy\ValidationStrategy.ts (行 494)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 451) 与 patterns\strategy\ValidationStrategy.ts (行 495)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 459) 与 patterns\strategy\ValidationStrategy.ts (行 503)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 460) 与 patterns\strategy\ValidationStrategy.ts (行 504)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 644) 与 patterns\strategy\ValidationStrategy.ts (行 645)
  - 相似度: 100.0%

- patterns\factory\SkillFactory.ts (行 458) 与 patterns\strategy\ValidationStrategy.ts (行 657)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 73) 与 patterns\strategy\ValidationStrategy.ts (行 686)
  - 相似度: 100.0%

- providers\AuthProvider.tsx (行 57) 与 providers\AuthProvider.tsx (行 58)
  - 相似度: 100.0%

- providers\AuthProvider.tsx (行 128) 与 providers\AuthProvider.tsx (行 129)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 7) 与 services\AnalyticsService.ts (行 8)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 66) 与 services\AnalyticsService.ts (行 67)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 70) 与 services\AnalyticsService.ts (行 71)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 92) 与 services\AnalyticsService.ts (行 93)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 113) 与 services\AnalyticsService.ts (行 114)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 127) 与 services\AnalyticsService.ts (行 128)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 141) 与 services\AnalyticsService.ts (行 142)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 168) 与 services\AnalyticsService.ts (行 169)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 179) 与 services\AnalyticsService.ts (行 180)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 243) 与 services\AnalyticsService.ts (行 244)
  - 相似度: 100.0%

- services\AnalyticsService.ts (行 276) 与 services\AnalyticsService.ts (行 277)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 125) 与 services\AutomatedSecurityService.ts (行 126)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 128) 与 services\AutomatedSecurityService.ts (行 129)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 131) 与 services\AutomatedSecurityService.ts (行 132)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 169) 与 services\AutomatedSecurityService.ts (行 170)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 146) 与 services\AutomatedSecurityService.ts (行 179)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 147) 与 services\AutomatedSecurityService.ts (行 180)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 199) 与 services\AutomatedSecurityService.ts (行 200)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 205) 与 services\AutomatedSecurityService.ts (行 206)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 198) 与 services\AutomatedSecurityService.ts (行 233)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 234) 与 services\AutomatedSecurityService.ts (行 235)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 237) 与 services\AutomatedSecurityService.ts (行 238)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 243) 与 services\AutomatedSecurityService.ts (行 244)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 277) 与 services\AutomatedSecurityService.ts (行 278)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 288) 与 services\AutomatedSecurityService.ts (行 289)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 214) 与 services\AutomatedSecurityService.ts (行 297)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 215) 与 services\AutomatedSecurityService.ts (行 298)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 311) 与 services\AutomatedSecurityService.ts (行 312)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 346) 与 services\AutomatedSecurityService.ts (行 347)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 349) 与 services\AutomatedSecurityService.ts (行 350)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 491) 与 services\AutomatedSecurityService.ts (行 492)
  - 相似度: 100.0%

- services\CacheService.ts (行 146) 与 services\CacheService.ts (行 147)
  - 相似度: 100.0%

- services\CacheService.ts (行 217) 与 services\CacheService.ts (行 218)
  - 相似度: 100.0%

- services\CacheService.ts (行 261) 与 services\CacheService.ts (行 262)
  - 相似度: 100.0%

- services\CacheService.ts (行 286) 与 services\CacheService.ts (行 287)
  - 相似度: 100.0%

- services\CacheService.ts (行 278) 与 services\CacheService.ts (行 329)
  - 相似度: 100.0%

- services\CacheService.ts (行 334) 与 services\CacheService.ts (行 335)
  - 相似度: 100.0%

- services\CacheService.ts (行 360) 与 services\CacheService.ts (行 361)
  - 相似度: 100.0%

- services\CacheService.ts (行 379) 与 services\CacheService.ts (行 380)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 691) 与 services\CacheService.ts (行 399)
  - 相似度: 100.0%

- services\CacheService.ts (行 424) 与 services\CacheService.ts (行 425)
  - 相似度: 100.0%

- services\CacheService.ts (行 457) 与 services\CacheService.ts (行 458)
  - 相似度: 100.0%

- services\CacheService.ts (行 503) 与 services\CacheService.ts (行 504)
  - 相似度: 100.0%

- services\CacheService.ts (行 470) 与 services\CacheService.ts (行 516)
  - 相似度: 100.0%

- services\CacheService.ts (行 471) 与 services\CacheService.ts (行 517)
  - 相似度: 100.0%

- services\CacheService.ts (行 472) 与 services\CacheService.ts (行 518)
  - 相似度: 100.0%

- services\CacheService.ts (行 473) 与 services\CacheService.ts (行 519)
  - 相似度: 100.0%

- services\CacheService.ts (行 579) 与 services\CacheService.ts (行 599)
  - 相似度: 100.0%

- services\CacheService.ts (行 580) 与 services\CacheService.ts (行 600)
  - 相似度: 100.0%

- services\CacheService.ts (行 581) 与 services\CacheService.ts (行 601)
  - 相似度: 100.0%

- services\CacheService.ts (行 711) 与 services\CacheService.ts (行 712)
  - 相似度: 100.0%

- services\CacheService.ts (行 768) 与 services\CacheService.ts (行 769)
  - 相似度: 100.0%

- services\CacheService.ts (行 771) 与 services\CacheService.ts (行 772)
  - 相似度: 100.0%

- services\CacheService.ts (行 774) 与 services\CacheService.ts (行 775)
  - 相似度: 100.0%

- services\CacheService.ts (行 777) 与 services\CacheService.ts (行 778)
  - 相似度: 100.0%

- services\CacheService.ts (行 780) 与 services\CacheService.ts (行 781)
  - 相似度: 100.0%

- services\CacheService.ts (行 816) 与 services\CacheService.ts (行 834)
  - 相似度: 100.0%

- services\CacheService.ts (行 817) 与 services\CacheService.ts (行 835)
  - 相似度: 100.0%

- services\CacheService.ts (行 918) 与 services\CacheService.ts (行 919)
  - 相似度: 100.0%

- services\CacheService.ts (行 930) 与 services\CacheService.ts (行 931)
  - 相似度: 100.0%

- services\CacheService.ts (行 971) 与 services\CacheService.ts (行 972)
  - 相似度: 100.0%

- services\CacheService.ts (行 1033) 与 services\CacheService.ts (行 1034)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 111) 与 services\ConfigurationService.ts (行 112)
  - 相似度: 100.0%

- components\ui\toggle-group.tsx (行 37) 与 services\ConfigurationService.ts (行 212)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 331) 与 services\ConfigurationService.ts (行 394)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 267) 与 services\ConfigurationService.ts (行 424)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 331) 与 services\ConfigurationService.ts (行 470)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 515) 与 services\ConfigurationService.ts (行 516)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 521) 与 services\ConfigurationService.ts (行 522)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 789) 与 services\ConfigurationService.ts (行 816)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 789) 与 services\ConfigurationService.ts (行 865)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 710) 与 services\ConfigurationService.ts (行 889)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 711) 与 services\ConfigurationService.ts (行 890)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 912) 与 services\ConfigurationService.ts (行 913)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 711) 与 services\ConfigurationService.ts (行 914)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 926) 与 services\ConfigurationService.ts (行 927)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 943) 与 services\ConfigurationService.ts (行 944)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 929) 与 services\ConfigurationService.ts (行 946)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 930) 与 services\ConfigurationService.ts (行 947)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 931) 与 services\ConfigurationService.ts (行 948)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 984) 与 services\ConfigurationService.ts (行 985)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 1028) 与 services\ConfigurationService.ts (行 1029)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 1046) 与 services\ConfigurationService.ts (行 1047)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 1049) 与 services\ConfigurationService.ts (行 1050)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 1075) 与 services\ConfigurationService.ts (行 1076)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 703) 与 services\ConfigurationService.ts (行 1083)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 704) 与 services\ConfigurationService.ts (行 1084)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 705) 与 services\ConfigurationService.ts (行 1085)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 706) 与 services\ConfigurationService.ts (行 1086)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 707) 与 services\ConfigurationService.ts (行 1087)
  - 相似度: 100.0%

- services\DyingStatusService.ts (行 37) 与 services\DyingStatusService.ts (行 38)
  - 相似度: 100.0%

- services\DyingStatusService.ts (行 66) 与 services\DyingStatusService.ts (行 67)
  - 相似度: 100.0%

- services\DyingStatusService.ts (行 90) 与 services\DyingStatusService.ts (行 91)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 93) 与 services\EnhancedSkillService.ts (行 94)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 99) 与 services\EnhancedSkillService.ts (行 100)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 105) 与 services\EnhancedSkillService.ts (行 106)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 132) 与 services\EnhancedSkillService.ts (行 140)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 165) 与 services\EnhancedSkillService.ts (行 166)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 179) 与 services\EnhancedSkillService.ts (行 180)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 195) 与 services\EnhancedSkillService.ts (行 196)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 219) 与 services\EnhancedSkillService.ts (行 220)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 309) 与 services\EnhancedSkillService.ts (行 310)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 301) 与 services\EnhancedSkillService.ts (行 326)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 412) 与 services\EnhancedSkillService.ts (行 413)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 422) 与 services\EnhancedSkillService.ts (行 423)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 455) 与 services\EnhancedSkillService.ts (行 456)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 487) 与 services\EnhancedSkillService.ts (行 488)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 501) 与 services\EnhancedSkillService.ts (行 502)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 523) 与 services\EnhancedSkillService.ts (行 542)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 524) 与 services\EnhancedSkillService.ts (行 543)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 565) 与 services\EnhancedSkillService.ts (行 566)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 583) 与 services\EnhancedSkillService.ts (行 584)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 services\ErrorHandlingService.ts (行 35)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 183) 与 services\ErrorHandlingService.ts (行 184)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 189) 与 services\ErrorHandlingService.ts (行 190)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 213) 与 services\ErrorHandlingService.ts (行 232)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 214) 与 services\ErrorHandlingService.ts (行 233)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 253) 与 services\ErrorHandlingService.ts (行 297)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 462) 与 services\ErrorHandlingService.ts (行 463)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 465) 与 services\ErrorHandlingService.ts (行 466)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 468) 与 services\ErrorHandlingService.ts (行 469)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 471) 与 services\ErrorHandlingService.ts (行 472)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 474) 与 services\ErrorHandlingService.ts (行 475)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 477) 与 services\ErrorHandlingService.ts (行 478)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 480) 与 services\ErrorHandlingService.ts (行 481)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 499) 与 services\ErrorHandlingService.ts (行 500)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 502) 与 services\ErrorHandlingService.ts (行 503)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 445) 与 services\ErrorHandlingService.ts (行 609)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 723) 与 services\ErrorHandlingService.ts (行 724)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 778) 与 services\ErrorHandlingService.ts (行 779)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 813) 与 services\ErrorHandlingService.ts (行 814)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 846) 与 services\ErrorHandlingService.ts (行 847)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 849) 与 services\ErrorHandlingService.ts (行 850)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 894) 与 services\ErrorHandlingService.ts (行 895)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 414) 与 services\ErrorMonitoringService.ts (行 415)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 447) 与 services\ErrorMonitoringService.ts (行 448)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 453) 与 services\ErrorMonitoringService.ts (行 454)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 414) 与 services\ErrorMonitoringService.ts (行 491)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 414) 与 services\ErrorMonitoringService.ts (行 492)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 494) 与 services\ErrorMonitoringService.ts (行 495)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 311) 与 services\ErrorMonitoringService.ts (行 529)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 312) 与 services\ErrorMonitoringService.ts (行 530)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 313) 与 services\ErrorMonitoringService.ts (行 531)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 314) 与 services\ErrorMonitoringService.ts (行 532)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 315) 与 services\ErrorMonitoringService.ts (行 533)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 316) 与 services\ErrorMonitoringService.ts (行 534)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 317) 与 services\ErrorMonitoringService.ts (行 535)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 318) 与 services\ErrorMonitoringService.ts (行 536)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 319) 与 services\ErrorMonitoringService.ts (行 537)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 320) 与 services\ErrorMonitoringService.ts (行 538)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 321) 与 services\ErrorMonitoringService.ts (行 539)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 322) 与 services\ErrorMonitoringService.ts (行 540)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 323) 与 services\ErrorMonitoringService.ts (行 541)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 324) 与 services\ErrorMonitoringService.ts (行 542)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 325) 与 services\ErrorMonitoringService.ts (行 543)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 326) 与 services\ErrorMonitoringService.ts (行 544)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 327) 与 services\ErrorMonitoringService.ts (行 545)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 328) 与 services\ErrorMonitoringService.ts (行 546)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 329) 与 services\ErrorMonitoringService.ts (行 547)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 330) 与 services\ErrorMonitoringService.ts (行 548)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 331) 与 services\ErrorMonitoringService.ts (行 549)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 332) 与 services\ErrorMonitoringService.ts (行 550)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 566) 与 services\ErrorMonitoringService.ts (行 567)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 589) 与 services\ErrorMonitoringService.ts (行 599)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 629) 与 services\ErrorMonitoringService.ts (行 630)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 635) 与 services\ErrorMonitoringService.ts (行 636)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 659) 与 services\ErrorMonitoringService.ts (行 771)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 800) 与 services\ErrorMonitoringService.ts (行 801)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1015) 与 services\ErrorMonitoringService.ts (行 1016)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1041) 与 services\ErrorMonitoringService.ts (行 1042)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 911) 与 services\ErrorMonitoringService.ts (行 1064)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1092) 与 services\ErrorMonitoringService.ts (行 1093)
  - 相似度: 100.0%

- services\GameService.ts (行 19) 与 services\GameService.ts (行 20)
  - 相似度: 100.0%

- services\GameService.ts (行 25) 与 services\GameService.ts (行 26)
  - 相似度: 100.0%

- services\GameService.ts (行 28) 与 services\GameService.ts (行 29)
  - 相似度: 100.0%

- services\GameService.ts (行 38) 与 services\GameService.ts (行 39)
  - 相似度: 100.0%

- services\GameService.ts (行 44) 与 services\GameService.ts (行 45)
  - 相似度: 100.0%

- services\GameService.ts (行 24) 与 services\GameService.ts (行 49)
  - 相似度: 100.0%

- services\GameService.ts (行 25) 与 services\GameService.ts (行 50)
  - 相似度: 100.0%

- services\GameService.ts (行 25) 与 services\GameService.ts (行 51)
  - 相似度: 100.0%

- services\GameService.ts (行 68) 与 services\GameService.ts (行 69)
  - 相似度: 100.0%

- services\GameService.ts (行 83) 与 services\GameService.ts (行 84)
  - 相似度: 100.0%

- services\GameService.ts (行 87) 与 services\GameService.ts (行 88)
  - 相似度: 100.0%

- services\GameService.ts (行 24) 与 services\GameService.ts (行 92)
  - 相似度: 100.0%

- services\GameService.ts (行 25) 与 services\GameService.ts (行 93)
  - 相似度: 100.0%

- services\GameStateService.ts (行 158) 与 services\GameStateService.ts (行 159)
  - 相似度: 100.0%

- services\GameStateService.ts (行 160) 与 services\GameStateService.ts (行 161)
  - 相似度: 100.0%

- services\GameStateService.ts (行 185) 与 services\GameStateService.ts (行 186)
  - 相似度: 100.0%

- services\GameStateService.ts (行 240) 与 services\GameStateService.ts (行 241)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 341) 与 services\GameStateService.ts (行 265)
  - 相似度: 100.0%

- services\GameStateService.ts (行 282) 与 services\GameStateService.ts (行 283)
  - 相似度: 100.0%

- services\GameStateService.ts (行 263) 与 services\GameStateService.ts (行 348)
  - 相似度: 100.0%

- services\GameStateService.ts (行 264) 与 services\GameStateService.ts (行 349)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 341) 与 services\GameStateService.ts (行 350)
  - 相似度: 100.0%

- services\GameStateService.ts (行 305) 与 services\GameStateService.ts (行 366)
  - 相似度: 100.0%

- services\GameStateService.ts (行 306) 与 services\GameStateService.ts (行 367)
  - 相似度: 100.0%

- services\GameStateService.ts (行 386) 与 services\GameStateService.ts (行 387)
  - 相似度: 100.0%

- services\GameStateService.ts (行 412) 与 services\GameStateService.ts (行 413)
  - 相似度: 100.0%

- services\GameStateService.ts (行 365) 与 services\GameStateService.ts (行 443)
  - 相似度: 100.0%

- services\GameStateService.ts (行 305) 与 services\GameStateService.ts (行 444)
  - 相似度: 100.0%

- services\GameStateService.ts (行 306) 与 services\GameStateService.ts (行 445)
  - 相似度: 100.0%

- services\GameStateService.ts (行 455) 与 services\GameStateService.ts (行 456)
  - 相似度: 100.0%

- services\GameStateService.ts (行 425) 与 services\GameStateService.ts (行 478)
  - 相似度: 100.0%

- services\GameStateService.ts (行 426) 与 services\GameStateService.ts (行 479)
  - 相似度: 100.0%

- services\GameStateService.ts (行 305) 与 services\GameStateService.ts (行 493)
  - 相似度: 100.0%

- services\GameStateService.ts (行 306) 与 services\GameStateService.ts (行 494)
  - 相似度: 100.0%

- services\GameStateService.ts (行 425) 与 services\GameStateService.ts (行 536)
  - 相似度: 100.0%

- services\GameStateService.ts (行 426) 与 services\GameStateService.ts (行 537)
  - 相似度: 100.0%

- services\GameStateService.ts (行 305) 与 services\GameStateService.ts (行 551)
  - 相似度: 100.0%

- services\GameStateService.ts (行 306) 与 services\GameStateService.ts (行 552)
  - 相似度: 100.0%

- services\GameStateService.ts (行 553) 与 services\GameStateService.ts (行 554)
  - 相似度: 100.0%

- services\GameStateService.ts (行 425) 与 services\GameStateService.ts (行 571)
  - 相似度: 100.0%

- services\GameStateService.ts (行 426) 与 services\GameStateService.ts (行 572)
  - 相似度: 100.0%

- services\GameStateService.ts (行 305) 与 services\GameStateService.ts (行 588)
  - 相似度: 100.0%

- services\GameStateService.ts (行 306) 与 services\GameStateService.ts (行 589)
  - 相似度: 100.0%

- services\GameStateService.ts (行 613) 与 services\GameStateService.ts (行 614)
  - 相似度: 100.0%

- services\GameStateService.ts (行 642) 与 services\GameStateService.ts (行 643)
  - 相似度: 100.0%

- services\GameStateService.ts (行 724) 与 services\GameStateService.ts (行 725)
  - 相似度: 100.0%

- services\GameStateService.ts (行 730) 与 services\GameStateService.ts (行 731)
  - 相似度: 100.0%

- services\GameStateService.ts (行 741) 与 services\GameStateService.ts (行 742)
  - 相似度: 100.0%

- services\GameStateService.ts (行 796) 与 services\GameStateService.ts (行 797)
  - 相似度: 100.0%

- services\GameStateService.ts (行 802) 与 services\GameStateService.ts (行 803)
  - 相似度: 100.0%

- services\GameStateService.ts (行 830) 与 services\GameStateService.ts (行 831)
  - 相似度: 100.0%

- services\GameStateService.ts (行 916) 与 services\GameStateService.ts (行 917)
  - 相似度: 100.0%

- services\GameStateService.ts (行 984) 与 services\GameStateService.ts (行 985)
  - 相似度: 100.0%

- services\GameStateService.ts (行 1025) 与 services\GameStateService.ts (行 1026)
  - 相似度: 100.0%

- services\GameStateService.ts (行 1031) 与 services\GameStateService.ts (行 1032)
  - 相似度: 100.0%

- services\index.ts (行 271) 与 services\index.ts (行 272)
  - 相似度: 100.0%

- services\index.ts (行 288) 与 services\index.ts (行 289)
  - 相似度: 100.0%

- lib\performanceReporter.ts (行 6) 与 services\MonitoringService.ts (行 9)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 55) 与 services\MonitoringService.ts (行 56)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 75) 与 services\MonitoringService.ts (行 88)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 118) 与 services\MonitoringService.ts (行 119)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 136) 与 services\MonitoringService.ts (行 137)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 176) 与 services\MonitoringService.ts (行 177)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 195) 与 services\MonitoringService.ts (行 196)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 198) 与 services\MonitoringService.ts (行 199)
  - 相似度: 100.0%

- services\MonitoringService.ts (行 201) 与 services\MonitoringService.ts (行 202)
  - 相似度: 100.0%

- services\NotificationService.ts (行 388) 与 services\NotificationService.ts (行 389)
  - 相似度: 100.0%

- services\NotificationService.ts (行 449) 与 services\NotificationService.ts (行 450)
  - 相似度: 100.0%

- services\NotificationService.ts (行 455) 与 services\NotificationService.ts (行 456)
  - 相似度: 100.0%

- services\NotificationService.ts (行 522) 与 services\NotificationService.ts (行 523)
  - 相似度: 100.0%

- services\NotificationService.ts (行 546) 与 services\NotificationService.ts (行 547)
  - 相似度: 100.0%

- services\NotificationService.ts (行 559) 与 services\NotificationService.ts (行 560)
  - 相似度: 100.0%

- services\NotificationService.ts (行 572) 与 services\NotificationService.ts (行 573)
  - 相似度: 100.0%

- services\NotificationService.ts (行 661) 与 services\NotificationService.ts (行 662)
  - 相似度: 100.0%

- services\NotificationService.ts (行 724) 与 services\NotificationService.ts (行 725)
  - 相似度: 100.0%

- services\GameStateService.ts (行 955) 与 services\NotificationService.ts (行 750)
  - 相似度: 100.0%

- services\GameStateService.ts (行 956) 与 services\NotificationService.ts (行 751)
  - 相似度: 100.0%

- services\NotificationService.ts (行 766) 与 services\NotificationService.ts (行 767)
  - 相似度: 100.0%

- services\NotificationService.ts (行 789) 与 services\NotificationService.ts (行 790)
  - 相似度: 100.0%

- services\NotificationService.ts (行 823) 与 services\NotificationService.ts (行 824)
  - 相似度: 100.0%

- services\GameStateService.ts (行 956) 与 services\NotificationService.ts (行 850)
  - 相似度: 100.0%

- services\NotificationService.ts (行 962) 与 services\NotificationService.ts (行 963)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1029) 与 services\NotificationService.ts (行 1030)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1035) 与 services\NotificationService.ts (行 1036)
  - 相似度: 100.0%

- services\NotificationService.ts (行 281) 与 services\NotificationService.ts (行 1095)
  - 相似度: 100.0%

- services\NotificationService.ts (行 282) 与 services\NotificationService.ts (行 1096)
  - 相似度: 100.0%

- services\NotificationService.ts (行 283) 与 services\NotificationService.ts (行 1097)
  - 相似度: 100.0%

- services\NotificationService.ts (行 284) 与 services\NotificationService.ts (行 1098)
  - 相似度: 100.0%

- services\NotificationService.ts (行 285) 与 services\NotificationService.ts (行 1099)
  - 相似度: 100.0%

- services\NotificationService.ts (行 286) 与 services\NotificationService.ts (行 1100)
  - 相似度: 100.0%

- services\NotificationService.ts (行 287) 与 services\NotificationService.ts (行 1101)
  - 相似度: 100.0%

- services\NotificationService.ts (行 288) 与 services\NotificationService.ts (行 1102)
  - 相似度: 100.0%

- services\NotificationService.ts (行 289) 与 services\NotificationService.ts (行 1103)
  - 相似度: 100.0%

- services\NotificationService.ts (行 290) 与 services\NotificationService.ts (行 1104)
  - 相似度: 100.0%

- services\NotificationService.ts (行 291) 与 services\NotificationService.ts (行 1105)
  - 相似度: 100.0%

- services\NotificationService.ts (行 292) 与 services\NotificationService.ts (行 1106)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1122) 与 services\NotificationService.ts (行 1123)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1143) 与 services\NotificationService.ts (行 1144)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1149) 与 services\NotificationService.ts (行 1150)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1158) 与 services\NotificationService.ts (行 1159)
  - 相似度: 100.0%

- services\GameStateService.ts (行 987) 与 services\NotificationService.ts (行 1161)
  - 相似度: 100.0%

- services\GameStateService.ts (行 988) 与 services\NotificationService.ts (行 1162)
  - 相似度: 100.0%

- services\GameStateService.ts (行 993) 与 services\NotificationService.ts (行 1167)
  - 相似度: 100.0%

- services\GameStateService.ts (行 994) 与 services\NotificationService.ts (行 1168)
  - 相似度: 100.0%

- services\GameStateService.ts (行 995) 与 services\NotificationService.ts (行 1169)
  - 相似度: 100.0%

- services\GameStateService.ts (行 996) 与 services\NotificationService.ts (行 1170)
  - 相似度: 100.0%

- services\GameStateService.ts (行 997) 与 services\NotificationService.ts (行 1171)
  - 相似度: 100.0%

- services\GameStateService.ts (行 1002) 与 services\NotificationService.ts (行 1176)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 28) 与 services\PassiveSkillService.ts (行 29)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 80) 与 services\PassiveSkillService.ts (行 81)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 93) 与 services\PassiveSkillService.ts (行 94)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 139) 与 services\PassiveSkillService.ts (行 140)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 145) 与 services\PassiveSkillService.ts (行 146)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 164) 与 services\PassiveSkillService.ts (行 165)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 195) 与 services\PassiveSkillService.ts (行 196)
  - 相似度: 100.0%

- services\PassiveSkillService.ts (行 211) 与 services\PassiveSkillService.ts (行 212)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 215) 与 services\PerformanceMonitoringService.ts (行 216)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 221) 与 services\PerformanceMonitoringService.ts (行 222)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 238) 与 services\PerformanceMonitoringService.ts (行 258)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 305) 与 services\PerformanceMonitoringService.ts (行 306)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 322) 与 services\PerformanceMonitoringService.ts (行 323)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 361) 与 services\PerformanceMonitoringService.ts (行 362)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 455) 与 services\PerformanceMonitoringService.ts (行 456)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 513) 与 services\PerformanceMonitoringService.ts (行 514)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 558) 与 services\PerformanceMonitoringService.ts (行 559)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 569) 与 services\PerformanceMonitoringService.ts (行 570)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 590) 与 services\PerformanceMonitoringService.ts (行 591)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 596) 与 services\PerformanceMonitoringService.ts (行 597)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 630) 与 services\PerformanceMonitoringService.ts (行 631)
  - 相似度: 100.0%

- services\PerformanceMonitoringService.ts (行 789) 与 services\PerformanceMonitoringService.ts (行 790)
  - 相似度: 100.0%

- services\RoomService.ts (行 39) 与 services\RoomService.ts (行 40)
  - 相似度: 100.0%

- services\RoomService.ts (行 63) 与 services\RoomService.ts (行 64)
  - 相似度: 100.0%

- services\RoomService.ts (行 76) 与 services\RoomService.ts (行 77)
  - 相似度: 100.0%

- services\RoomService.ts (行 66) 与 services\RoomService.ts (行 79)
  - 相似度: 100.0%

- services\RoomService.ts (行 67) 与 services\RoomService.ts (行 80)
  - 相似度: 100.0%

- services\RoomService.ts (行 68) 与 services\RoomService.ts (行 81)
  - 相似度: 100.0%

- services\RoomService.ts (行 67) 与 services\RoomService.ts (行 94)
  - 相似度: 100.0%

- services\RoomService.ts (行 68) 与 services\RoomService.ts (行 95)
  - 相似度: 100.0%

- services\RoomService.ts (行 96) 与 services\RoomService.ts (行 97)
  - 相似度: 100.0%

- services\RoomService.ts (行 100) 与 services\RoomService.ts (行 101)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 26) 与 services\SecurityAuditService.ts (行 27)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 32) 与 services\SecurityAuditService.ts (行 33)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 43) 与 services\SecurityAuditService.ts (行 44)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 services\SecurityAuditService.ts (行 54)
  - 相似度: 100.0%

- services\AutomatedSecurityService.ts (行 35) 与 services\SecurityAuditService.ts (行 57)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 201) 与 services\SecurityAuditService.ts (行 202)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 228) 与 services\SecurityAuditService.ts (行 229)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 231) 与 services\SecurityAuditService.ts (行 232)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 278) 与 services\SecurityAuditService.ts (行 279)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 409) 与 services\SecurityAuditService.ts (行 410)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 497) 与 services\SecurityAuditService.ts (行 498)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 558) 与 services\SecurityAuditService.ts (行 559)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 564) 与 services\SecurityAuditService.ts (行 565)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 694) 与 services\SecurityAuditService.ts (行 695)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 216) 与 services\SkillExecutionService.ts (行 217)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 234) 与 services\SkillExecutionService.ts (行 235)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 283) 与 services\SkillExecutionService.ts (行 284)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 412) 与 services\SkillExecutionService.ts (行 413)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 354) 与 services\SkillExecutionService.ts (行 568)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 647) 与 services\SkillExecutionService.ts (行 677)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 648) 与 services\SkillExecutionService.ts (行 678)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 649) 与 services\SkillExecutionService.ts (行 679)
  - 相似度: 100.0%

- services\SkillExecutionService.ts (行 781) 与 services\SkillExecutionService.ts (行 782)
  - 相似度: 100.0%

- services\GameStateService.ts (行 993) 与 services\SkillExecutionService.ts (行 847)
  - 相似度: 100.0%

- services\GameStateService.ts (行 994) 与 services\SkillExecutionService.ts (行 848)
  - 相似度: 100.0%

- services\GameStateService.ts (行 995) 与 services\SkillExecutionService.ts (行 849)
  - 相似度: 100.0%

- services\GameStateService.ts (行 996) 与 services\SkillExecutionService.ts (行 850)
  - 相似度: 100.0%

- services\GameStateService.ts (行 997) 与 services\SkillExecutionService.ts (行 851)
  - 相似度: 100.0%

- services\GameStateService.ts (行 1002) 与 services\SkillExecutionService.ts (行 856)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1177) 与 services\SkillExecutionService.ts (行 857)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1178) 与 services\SkillExecutionService.ts (行 858)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1179) 与 services\SkillExecutionService.ts (行 859)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 111) 与 services\SkillSystemService.ts (行 112)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 246) 与 services\SkillSystemService.ts (行 247)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 323) 与 services\SkillSystemService.ts (行 324)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 378) 与 services\SkillSystemService.ts (行 379)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 384) 与 services\SkillSystemService.ts (行 385)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 429) 与 services\SkillSystemService.ts (行 430)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 475) 与 services\SkillSystemService.ts (行 476)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 491) 与 services\SkillSystemService.ts (行 492)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 527) 与 services\SkillSystemService.ts (行 528)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 575) 与 services\SkillSystemService.ts (行 576)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 581) 与 services\SkillSystemService.ts (行 582)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 19) 与 services\SystemAnnouncementService.ts (行 21)
  - 相似度: 100.0%

- hooks\useMultiChannelChat.ts (行 20) 与 services\SystemAnnouncementService.ts (行 22)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 55) 与 services\SystemAnnouncementService.ts (行 71)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 56) 与 services\SystemAnnouncementService.ts (行 72)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 57) 与 services\SystemAnnouncementService.ts (行 73)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 58) 与 services\SystemAnnouncementService.ts (行 74)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 116) 与 services\SystemAnnouncementService.ts (行 141)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 117) 与 services\SystemAnnouncementService.ts (行 142)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 118) 与 services\SystemAnnouncementService.ts (行 143)
  - 相似度: 100.0%

- services\SystemAnnouncementService.ts (行 174) 与 services\SystemAnnouncementService.ts (行 175)
  - 相似度: 100.0%

- services\NotificationService.ts (行 256) 与 services\ValidationService.ts (行 136)
  - 相似度: 100.0%

- patterns\strategy\ValidationStrategy.ts (行 284) 与 services\ValidationService.ts (行 308)
  - 相似度: 100.0%

- services\ValidationService.ts (行 310) 与 services\ValidationService.ts (行 311)
  - 相似度: 100.0%

- services\ValidationService.ts (行 316) 与 services\ValidationService.ts (行 317)
  - 相似度: 100.0%

- services\ValidationService.ts (行 333) 与 services\ValidationService.ts (行 334)
  - 相似度: 100.0%

- services\ValidationService.ts (行 339) 与 services\ValidationService.ts (行 340)
  - 相似度: 100.0%

- services\ValidationService.ts (行 409) 与 services\ValidationService.ts (行 410)
  - 相似度: 100.0%

- services\ValidationService.ts (行 481) 与 services\ValidationService.ts (行 482)
  - 相似度: 100.0%

- services\ValidationService.ts (行 519) 与 services\ValidationService.ts (行 520)
  - 相似度: 100.0%

- services\ValidationService.ts (行 530) 与 services\ValidationService.ts (行 531)
  - 相似度: 100.0%

- services\ValidationService.ts (行 273) 与 services\ValidationService.ts (行 578)
  - 相似度: 100.0%

- services\ValidationService.ts (行 274) 与 services\ValidationService.ts (行 579)
  - 相似度: 100.0%

- services\ValidationService.ts (行 275) 与 services\ValidationService.ts (行 580)
  - 相似度: 100.0%

- services\ValidationService.ts (行 601) 与 services\ValidationService.ts (行 602)
  - 相似度: 100.0%

- services\ValidationService.ts (行 727) 与 services\ValidationService.ts (行 728)
  - 相似度: 100.0%

- services\ValidationService.ts (行 749) 与 services\ValidationService.ts (行 750)
  - 相似度: 100.0%

- services\ValidationService.ts (行 755) 与 services\ValidationService.ts (行 756)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1088) 与 services\ValidationService.ts (行 799)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1089) 与 services\ValidationService.ts (行 800)
  - 相似度: 100.0%

- services\ValidationService.ts (行 158) 与 services\ValidationService.ts (行 806)
  - 相似度: 100.0%

- services\ValidationService.ts (行 159) 与 services\ValidationService.ts (行 807)
  - 相似度: 100.0%

- services\ValidationService.ts (行 160) 与 services\ValidationService.ts (行 808)
  - 相似度: 100.0%

- services\ValidationService.ts (行 161) 与 services\ValidationService.ts (行 809)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1111) 与 services\ValidationService.ts (行 814)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1112) 与 services\ValidationService.ts (行 815)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1113) 与 services\ValidationService.ts (行 816)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1114) 与 services\ValidationService.ts (行 817)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1122) 与 services\ValidationService.ts (行 833)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1122) 与 services\ValidationService.ts (行 834)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1124) 与 services\ValidationService.ts (行 835)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1125) 与 services\ValidationService.ts (行 836)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1126) 与 services\ValidationService.ts (行 837)
  - 相似度: 100.0%

- services\GameStateService.ts (行 1016) 与 services\ValidationService.ts (行 846)
  - 相似度: 100.0%

- services\ValidationService.ts (行 855) 与 services\ValidationService.ts (行 856)
  - 相似度: 100.0%

- services\GameStateService.ts (行 987) 与 services\ValidationService.ts (行 866)
  - 相似度: 100.0%

- services\GameStateService.ts (行 988) 与 services\ValidationService.ts (行 867)
  - 相似度: 100.0%

- services\GameStateService.ts (行 993) 与 services\ValidationService.ts (行 872)
  - 相似度: 100.0%

- services\GameStateService.ts (行 994) 与 services\ValidationService.ts (行 873)
  - 相似度: 100.0%

- services\GameStateService.ts (行 995) 与 services\ValidationService.ts (行 874)
  - 相似度: 100.0%

- services\GameStateService.ts (行 996) 与 services\ValidationService.ts (行 875)
  - 相似度: 100.0%

- services\GameStateService.ts (行 997) 与 services\ValidationService.ts (行 876)
  - 相似度: 100.0%

- services\GameStateService.ts (行 1002) 与 services\ValidationService.ts (行 881)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1177) 与 services\ValidationService.ts (行 882)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1178) 与 services\ValidationService.ts (行 883)
  - 相似度: 100.0%

- services\NotificationService.ts (行 1179) 与 services\ValidationService.ts (行 884)
  - 相似度: 100.0%

- services\VotingService.ts (行 59) 与 services\VotingService.ts (行 60)
  - 相似度: 100.0%

- services\VotingService.ts (行 63) 与 services\VotingService.ts (行 64)
  - 相似度: 100.0%

- services\VotingService.ts (行 58) 与 services\VotingService.ts (行 68)
  - 相似度: 100.0%

- services\VotingService.ts (行 69) 与 services\VotingService.ts (行 70)
  - 相似度: 100.0%

- services\VotingService.ts (行 73) 与 services\VotingService.ts (行 74)
  - 相似度: 100.0%

- types\skill.types.ts (行 5) 与 types\skill.types.ts (行 6)
  - 相似度: 100.0%

- types\skill.types.ts (行 39) 与 types\skill.types.ts (行 40)
  - 相似度: 100.0%

- types\skill.types.ts (行 56) 与 types\skill.types.ts (行 57)
  - 相似度: 100.0%

- types\skill.types.ts (行 69) 与 types\skill.types.ts (行 70)
  - 相似度: 100.0%

- types\skill.types.ts (行 82) 与 types\skill.types.ts (行 83)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 83) 与 types\skillSystem.types.ts (行 249)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 84) 与 types\skillSystem.types.ts (行 250)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 29) 与 utils\advancedInputValidationSystem.ts (行 30)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 179) 与 utils\advancedInputValidationSystem.ts (行 180)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 182) 与 utils\advancedInputValidationSystem.ts (行 183)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 265) 与 utils\advancedInputValidationSystem.ts (行 266)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 276) 与 utils\advancedInputValidationSystem.ts (行 277)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 319) 与 utils\advancedInputValidationSystem.ts (行 320)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 325) 与 utils\advancedInputValidationSystem.ts (行 326)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 423) 与 utils\advancedInputValidationSystem.ts (行 424)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 532) 与 utils\advancedInputValidationSystem.ts (行 533)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 574) 与 utils\advancedInputValidationSystem.ts (行 575)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 591) 与 utils\advancedInputValidationSystem.ts (行 592)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 606) 与 utils\advancedInputValidationSystem.ts (行 607)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 687) 与 utils\advancedInputValidationSystem.ts (行 688)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 690) 与 utils\advancedInputValidationSystem.ts (行 691)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 693) 与 utils\advancedInputValidationSystem.ts (行 694)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 829) 与 utils\advancedInputValidationSystem.ts (行 830)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 843) 与 utils\advancedInputValidationSystem.ts (行 844)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 865) 与 utils\advancedInputValidationSystem.ts (行 866)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 871) 与 utils\advancedInputValidationSystem.ts (行 872)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 875) 与 utils\advancedInputValidationSystem.ts (行 876)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 877) 与 utils\advancedInputValidationSystem.ts (行 878)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 881) 与 utils\advancedInputValidationSystem.ts (行 882)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 883) 与 utils\advancedInputValidationSystem.ts (行 884)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 677) 与 utils\advancedInputValidationSystem.ts (行 1116)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 678) 与 utils\advancedInputValidationSystem.ts (行 1117)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 679) 与 utils\advancedInputValidationSystem.ts (行 1118)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1178) 与 utils\advancedInputValidationSystem.ts (行 1179)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 71) 与 utils\advancedRBACSystem.ts (行 72)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 113) 与 utils\advancedRBACSystem.ts (行 114)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 131) 与 utils\advancedRBACSystem.ts (行 132)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 137) 与 utils\advancedRBACSystem.ts (行 138)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 160) 与 utils\advancedRBACSystem.ts (行 181)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 170) 与 utils\advancedRBACSystem.ts (行 191)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 171) 与 utils\advancedRBACSystem.ts (行 192)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 226) 与 utils\advancedRBACSystem.ts (行 227)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 160) 与 utils\advancedRBACSystem.ts (行 238)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 170) 与 utils\advancedRBACSystem.ts (行 248)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 171) 与 utils\advancedRBACSystem.ts (行 249)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 345) 与 utils\advancedRBACSystem.ts (行 346)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 351) 与 utils\advancedRBACSystem.ts (行 352)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 390) 与 utils\advancedRBACSystem.ts (行 391)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 484) 与 utils\advancedRBACSystem.ts (行 485)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 540) 与 utils\advancedRBACSystem.ts (行 541)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 543) 与 utils\advancedRBACSystem.ts (行 544)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 546) 与 utils\advancedRBACSystem.ts (行 547)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 554) 与 utils\advancedRBACSystem.ts (行 555)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 634) 与 utils\advancedRBACSystem.ts (行 635)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 674) 与 utils\advancedRBACSystem.ts (行 675)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 693) 与 utils\advancedRBACSystem.ts (行 694)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 731) 与 utils\advancedRBACSystem.ts (行 732)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 769) 与 utils\advancedRBACSystem.ts (行 770)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 805) 与 utils\advancedRBACSystem.ts (行 806)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 300) 与 utils\advancedRBACSystem.ts (行 914)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 301) 与 utils\advancedRBACSystem.ts (行 915)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 302) 与 utils\advancedRBACSystem.ts (行 916)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 303) 与 utils\advancedRBACSystem.ts (行 917)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 947) 与 utils\advancedRBACSystem.ts (行 948)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1109) 与 utils\advancedRBACSystem.ts (行 1110)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1120) 与 utils\advancedRBACSystem.ts (行 1121)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1138) 与 utils\advancedRBACSystem.ts (行 1139)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1151) 与 utils\advancedRBACSystem.ts (行 1152)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1172) 与 utils\advancedRBACSystem.ts (行 1173)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1182) 与 utils\advancedRBACSystem.ts (行 1183)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1203) 与 utils\advancedRBACSystem.ts (行 1204)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1207) 与 utils\advancedRBACSystem.ts (行 1208)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1249) 与 utils\advancedRBACSystem.ts (行 1250)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1255) 与 utils\advancedRBACSystem.ts (行 1256)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1261) 与 utils\advancedRBACSystem.ts (行 1262)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1267) 与 utils\advancedRBACSystem.ts (行 1268)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1280) 与 utils\advancedRBACSystem.ts (行 1281)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1308) 与 utils\advancedRBACSystem.ts (行 1309)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1314) 与 utils\advancedRBACSystem.ts (行 1315)
  - 相似度: 100.0%

- config\security.config.ts (行 12) 与 utils\apiSecurityConfig.ts (行 28)
  - 相似度: 100.0%

- config\security.config.ts (行 13) 与 utils\apiSecurityConfig.ts (行 29)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 utils\apiSecurityConfig.ts (行 30)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 556) 与 utils\apiSecurityConfig.ts (行 579)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 588) 与 utils\apiSecurityConfig.ts (行 589)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 654) 与 utils\apiSecurityConfig.ts (行 655)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 674) 与 utils\apiSecurityConfig.ts (行 675)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 705) 与 utils\apiSecurityConfig.ts (行 706)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 726) 与 utils\apiSecurityConfig.ts (行 727)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 711) 与 utils\apiSecurityConfig.ts (行 731)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 745) 与 utils\apiSecurityConfig.ts (行 746)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 748) 与 utils\apiSecurityConfig.ts (行 749)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 751) 与 utils\apiSecurityConfig.ts (行 752)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 754) 与 utils\apiSecurityConfig.ts (行 755)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 756) 与 utils\apiSecurityConfig.ts (行 782)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 823) 与 utils\apiSecurityConfig.ts (行 824)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 839) 与 utils\apiSecurityConfig.ts (行 840)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 659) 与 utils\apiSecurityConfig.ts (行 844)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 445) 与 utils\apiSecurityConfig.ts (行 893)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 240) 与 utils\apiSecurityConfig.ts (行 913)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 994) 与 utils\apiSecurityConfig.ts (行 995)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 112) 与 utils\automatedSecurityChecker.ts (行 161)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 113) 与 utils\automatedSecurityChecker.ts (行 162)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 279) 与 utils\automatedSecurityChecker.ts (行 280)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 282) 与 utils\automatedSecurityChecker.ts (行 283)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 308) 与 utils\automatedSecurityChecker.ts (行 309)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 314) 与 utils\automatedSecurityChecker.ts (行 315)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 347) 与 utils\automatedSecurityChecker.ts (行 348)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 350) 与 utils\automatedSecurityChecker.ts (行 351)
  - 相似度: 100.0%

- services\EnhancedSkillService.ts (行 341) 与 utils\automatedSecurityChecker.ts (行 362)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 373) 与 utils\automatedSecurityChecker.ts (行 374)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 461) 与 utils\automatedSecurityChecker.ts (行 462)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 467) 与 utils\automatedSecurityChecker.ts (行 468)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 523) 与 utils\automatedSecurityChecker.ts (行 524)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 565) 与 utils\automatedSecurityChecker.ts (行 566)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 571) 与 utils\automatedSecurityChecker.ts (行 572)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 537) 与 utils\automatedSecurityChecker.ts (行 585)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 538) 与 utils\automatedSecurityChecker.ts (行 586)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 622) 与 utils\automatedSecurityChecker.ts (行 623)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 537) 与 utils\automatedSecurityChecker.ts (行 636)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 538) 与 utils\automatedSecurityChecker.ts (行 637)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 664) 与 utils\automatedSecurityChecker.ts (行 665)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 670) 与 utils\automatedSecurityChecker.ts (行 671)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 537) 与 utils\automatedSecurityChecker.ts (行 684)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 538) 与 utils\automatedSecurityChecker.ts (行 685)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 712) 与 utils\automatedSecurityChecker.ts (行 713)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 718) 与 utils\automatedSecurityChecker.ts (行 719)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 537) 与 utils\automatedSecurityChecker.ts (行 732)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 538) 与 utils\automatedSecurityChecker.ts (行 733)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 760) 与 utils\automatedSecurityChecker.ts (行 761)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 766) 与 utils\automatedSecurityChecker.ts (行 767)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 537) 与 utils\automatedSecurityChecker.ts (行 780)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 538) 与 utils\automatedSecurityChecker.ts (行 781)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 808) 与 utils\automatedSecurityChecker.ts (行 809)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 814) 与 utils\automatedSecurityChecker.ts (行 815)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 537) 与 utils\automatedSecurityChecker.ts (行 828)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 538) 与 utils\automatedSecurityChecker.ts (行 829)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 953) 与 utils\automatedSecurityChecker.ts (行 954)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1029) 与 utils\automatedSecurityChecker.ts (行 1030)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1068) 与 utils\automatedSecurityChecker.ts (行 1069)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1074) 与 utils\automatedSecurityChecker.ts (行 1075)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1089) 与 utils\automatedSecurityChecker.ts (行 1090)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1095) 与 utils\automatedSecurityChecker.ts (行 1096)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1101) 与 utils\automatedSecurityChecker.ts (行 1102)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1107) 与 utils\automatedSecurityChecker.ts (行 1108)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1121) 与 utils\automatedSecurityChecker.ts (行 1122)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1127) 与 utils\automatedSecurityChecker.ts (行 1128)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1133) 与 utils\automatedSecurityChecker.ts (行 1134)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1139) 与 utils\automatedSecurityChecker.ts (行 1140)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1145) 与 utils\automatedSecurityChecker.ts (行 1146)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1151) 与 utils\automatedSecurityChecker.ts (行 1152)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1157) 与 utils\automatedSecurityChecker.ts (行 1158)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1163) 与 utils\automatedSecurityChecker.ts (行 1164)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1169) 与 utils\automatedSecurityChecker.ts (行 1170)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1175) 与 utils\automatedSecurityChecker.ts (行 1176)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1181) 与 utils\automatedSecurityChecker.ts (行 1182)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1187) 与 utils\automatedSecurityChecker.ts (行 1188)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1193) 与 utils\automatedSecurityChecker.ts (行 1194)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1218) 与 utils\automatedSecurityChecker.ts (行 1219)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1221) 与 utils\automatedSecurityChecker.ts (行 1222)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1224) 与 utils\automatedSecurityChecker.ts (行 1225)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1227) 与 utils\automatedSecurityChecker.ts (行 1228)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1230) 与 utils\automatedSecurityChecker.ts (行 1231)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 69) 与 utils\codeAnalyzer.ts (行 70)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 92) 与 utils\codeAnalyzer.ts (行 93)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 269) 与 utils\codeAnalyzer.ts (行 270)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 275) 与 utils\codeAnalyzer.ts (行 276)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 289) 与 utils\codeAnalyzer.ts (行 290)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 467) 与 utils\codeAnalyzer.ts (行 468)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 473) 与 utils\codeAnalyzer.ts (行 474)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 479) 与 utils\codeAnalyzer.ts (行 480)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 496) 与 utils\codeAnalyzer.ts (行 497)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 522) 与 utils\codeAnalyzer.ts (行 523)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 154) 与 utils\common\cacheUtils.ts (行 155)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 194) 与 utils\common\cacheUtils.ts (行 195)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 197) 与 utils\common\cacheUtils.ts (行 198)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 215) 与 utils\common\cacheUtils.ts (行 243)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 310) 与 utils\common\cacheUtils.ts (行 311)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 368) 与 utils\common\cacheUtils.ts (行 369)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 515) 与 utils\common\cacheUtils.ts (行 516)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 547) 与 utils\common\cacheUtils.ts (行 548)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 553) 与 utils\common\cacheUtils.ts (行 554)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 290) 与 utils\common\cacheUtils.ts (行 574)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 674) 与 utils\common\cacheUtils.ts (行 675)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 661) 与 utils\common\cacheUtils.ts (行 700)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 662) 与 utils\common\cacheUtils.ts (行 701)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 663) 与 utils\common\cacheUtils.ts (行 702)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 664) 与 utils\common\cacheUtils.ts (行 703)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 665) 与 utils\common\cacheUtils.ts (行 704)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 666) 与 utils\common\cacheUtils.ts (行 705)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 673) 与 utils\common\cacheUtils.ts (行 714)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 674) 与 utils\common\cacheUtils.ts (行 715)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 674) 与 utils\common\cacheUtils.ts (行 716)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 676) 与 utils\common\cacheUtils.ts (行 717)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 683) 与 utils\common\cacheUtils.ts (行 724)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 684) 与 utils\common\cacheUtils.ts (行 725)
  - 相似度: 100.0%

- utils\common\cacheUtils.ts (行 685) 与 utils\common\cacheUtils.ts (行 726)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 92) 与 utils\common\dataValidation.ts (行 93)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 121) 与 utils\common\dataValidation.ts (行 122)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 163) 与 utils\common\dataValidation.ts (行 164)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 226) 与 utils\common\dataValidation.ts (行 227)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 97) 与 utils\common\dataValidation.ts (行 231)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 98) 与 utils\common\dataValidation.ts (行 232)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 356) 与 utils\common\dataValidation.ts (行 357)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 362) 与 utils\common\dataValidation.ts (行 363)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 97) 与 utils\common\dataValidation.ts (行 367)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 98) 与 utils\common\dataValidation.ts (行 368)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 394) 与 utils\common\dataValidation.ts (行 395)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 400) 与 utils\common\dataValidation.ts (行 401)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 97) 与 utils\common\dataValidation.ts (行 405)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 98) 与 utils\common\dataValidation.ts (行 406)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 131) 与 utils\common\errorHandling.ts (行 132)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 174) 与 utils\common\errorHandling.ts (行 175)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 218) 与 utils\common\errorHandling.ts (行 219)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 224) 与 utils\common\errorHandling.ts (行 225)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 293) 与 utils\common\errorHandling.ts (行 294)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 332) 与 utils\common\errorHandling.ts (行 333)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 397) 与 utils\common\errorHandling.ts (行 398)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 403) 与 utils\common\errorHandling.ts (行 404)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 115) 与 utils\common\skillValidation.ts (行 116)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 165) 与 utils\common\skillValidation.ts (行 166)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 246) 与 utils\common\skillValidation.ts (行 247)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 97) 与 utils\common\skillValidation.ts (行 251)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 98) 与 utils\common\skillValidation.ts (行 252)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 283) 与 utils\common\skillValidation.ts (行 284)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 96) 与 utils\common\skillValidation.ts (行 348)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 97) 与 utils\common\skillValidation.ts (行 349)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 98) 与 utils\common\skillValidation.ts (行 350)
  - 相似度: 100.0%

- utils\common\skillValidation.ts (行 410) 与 utils\common\skillValidation.ts (行 411)
  - 相似度: 100.0%

- utils\common\stateHelpers.ts (行 161) 与 utils\common\stateHelpers.ts (行 162)
  - 相似度: 100.0%

- utils\common\stateHelpers.ts (行 171) 与 utils\common\stateHelpers.ts (行 262)
  - 相似度: 100.0%

- utils\common\stateHelpers.ts (行 298) 与 utils\common\stateHelpers.ts (行 299)
  - 相似度: 100.0%

- patterns\observer\EventEmitter.ts (行 326) 与 utils\common\stateHelpers.ts (行 463)
  - 相似度: 100.0%

- utils\common\stateHelpers.ts (行 480) 与 utils\common\stateHelpers.ts (行 481)
  - 相似度: 100.0%

- utils\common.ts (行 59) 与 utils\common.ts (行 60)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 91) 与 utils\componentRenderOptimizer.ts (行 92)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 172) 与 utils\componentRenderOptimizer.ts (行 173)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 183) 与 utils\componentRenderOptimizer.ts (行 184)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 185) 与 utils\componentRenderOptimizer.ts (行 186)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 213) 与 utils\componentRenderOptimizer.ts (行 214)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 278) 与 utils\componentRenderOptimizer.ts (行 279)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 305) 与 utils\componentRenderOptimizer.ts (行 306)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 311) 与 utils\componentRenderOptimizer.ts (行 312)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 319) 与 utils\componentRenderOptimizer.ts (行 320)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 357) 与 utils\componentRenderOptimizer.ts (行 358)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 359) 与 utils\componentRenderOptimizer.ts (行 360)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 363) 与 utils\componentRenderOptimizer.ts (行 364)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 376) 与 utils\componentRenderOptimizer.ts (行 377)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 382) 与 utils\componentRenderOptimizer.ts (行 383)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 414) 与 utils\componentRenderOptimizer.ts (行 415)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 418) 与 utils\componentRenderOptimizer.ts (行 419)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 435) 与 utils\componentRenderOptimizer.ts (行 436)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 480) 与 utils\componentRenderOptimizer.ts (行 481)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 496) 与 utils\componentRenderOptimizer.ts (行 497)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 226) 与 utils\comprehensiveSecurityAudit.ts (行 227)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 275) 与 utils\comprehensiveSecurityAudit.ts (行 276)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 306) 与 utils\comprehensiveSecurityAudit.ts (行 490)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 306) 与 utils\comprehensiveSecurityAudit.ts (行 525)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 306) 与 utils\comprehensiveSecurityAudit.ts (行 603)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 306) 与 utils\comprehensiveSecurityAudit.ts (行 685)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 725) 与 utils\comprehensiveSecurityAudit.ts (行 726)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 306) 与 utils\comprehensiveSecurityAudit.ts (行 790)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 306) 与 utils\comprehensiveSecurityAudit.ts (行 866)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 930) 与 utils\comprehensiveSecurityAudit.ts (行 931)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 954) 与 utils\comprehensiveSecurityAudit.ts (行 955)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 975) 与 utils\comprehensiveSecurityAudit.ts (行 976)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 932) 与 utils\comprehensiveSecurityAudit.ts (行 977)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 933) 与 utils\comprehensiveSecurityAudit.ts (行 978)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 934) 与 utils\comprehensiveSecurityAudit.ts (行 979)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1007) 与 utils\comprehensiveSecurityAudit.ts (行 1008)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1059) 与 utils\comprehensiveSecurityAudit.ts (行 1060)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1063) 与 utils\comprehensiveSecurityAudit.ts (行 1064)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1065) 与 utils\comprehensiveSecurityAudit.ts (行 1066)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1069) 与 utils\comprehensiveSecurityAudit.ts (行 1070)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1071) 与 utils\comprehensiveSecurityAudit.ts (行 1072)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1075) 与 utils\comprehensiveSecurityAudit.ts (行 1076)
  - 相似度: 100.0%

- utils\comprehensiveSecurityAudit.ts (行 1084) 与 utils\comprehensiveSecurityAudit.ts (行 1085)
  - 相似度: 100.0%

- utils\debugSystem.ts (行 252) 与 utils\debugSystem.ts (行 253)
  - 相似度: 100.0%

- utils\debugSystem.ts (行 266) 与 utils\debugSystem.ts (行 267)
  - 相似度: 100.0%

- utils\debugSystem.ts (行 310) 与 utils\debugSystem.ts (行 311)
  - 相似度: 100.0%

- utils\debugSystem.ts (行 316) 与 utils\debugSystem.ts (行 317)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 118) 与 utils\documentationGenerator.ts (行 119)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 121) 与 utils\documentationGenerator.ts (行 122)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 124) 与 utils\documentationGenerator.ts (行 125)
  - 相似度: 100.0%

- utils\codeAnalyzer.ts (行 249) 与 utils\documentationGenerator.ts (行 244)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 257) 与 utils\documentationGenerator.ts (行 258)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 326) 与 utils\documentationGenerator.ts (行 327)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 443) 与 utils\documentationGenerator.ts (行 444)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 446) 与 utils\documentationGenerator.ts (行 447)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 464) 与 utils\documentationGenerator.ts (行 465)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 515) 与 utils\documentationGenerator.ts (行 516)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 558) 与 utils\documentationGenerator.ts (行 559)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 572) 与 utils\documentationGenerator.ts (行 573)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 575) 与 utils\documentationGenerator.ts (行 576)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 614) 与 utils\documentationGenerator.ts (行 615)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 639) 与 utils\documentationGenerator.ts (行 640)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 645) 与 utils\documentationGenerator.ts (行 646)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 661) 与 utils\documentationGenerator.ts (行 662)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 305) 与 utils\enhancedInputValidation.ts (行 306)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 322) 与 utils\enhancedInputValidation.ts (行 323)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 335) 与 utils\enhancedInputValidation.ts (行 336)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 378) 与 utils\enhancedInputValidation.ts (行 379)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 381) 与 utils\enhancedInputValidation.ts (行 382)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 387) 与 utils\enhancedInputValidation.ts (行 388)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 460) 与 utils\enhancedInputValidation.ts (行 461)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 630) 与 utils\enhancedInputValidation.ts (行 647)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 630) 与 utils\enhancedInputValidation.ts (行 686)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 630) 与 utils\enhancedInputValidation.ts (行 702)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 630) 与 utils\enhancedInputValidation.ts (行 718)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 630) 与 utils\enhancedInputValidation.ts (行 734)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 719) 与 utils\enhancedInputValidation.ts (行 735)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 720) 与 utils\enhancedInputValidation.ts (行 736)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 721) 与 utils\enhancedInputValidation.ts (行 737)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 630) 与 utils\enhancedInputValidation.ts (行 750)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 719) 与 utils\enhancedInputValidation.ts (行 751)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 720) 与 utils\enhancedInputValidation.ts (行 752)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 721) 与 utils\enhancedInputValidation.ts (行 753)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 630) 与 utils\enhancedInputValidation.ts (行 766)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 719) 与 utils\enhancedInputValidation.ts (行 767)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 720) 与 utils\enhancedInputValidation.ts (行 768)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 721) 与 utils\enhancedInputValidation.ts (行 769)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 408) 与 utils\enhancedInputValidation.ts (行 808)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 828) 与 utils\enhancedInputValidation.ts (行 829)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 831) 与 utils\enhancedInputValidation.ts (行 832)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 834) 与 utils\enhancedInputValidation.ts (行 835)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 837) 与 utils\enhancedInputValidation.ts (行 838)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 840) 与 utils\enhancedInputValidation.ts (行 841)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 408) 与 utils\enhancedInputValidation.ts (行 859)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 882)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 894)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 895)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 896)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 907)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 908)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 909)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 934)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 935)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 946)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 947)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 948)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 959)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 960)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 961)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 910) 与 utils\enhancedInputValidation.ts (行 962)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 911) 与 utils\enhancedInputValidation.ts (行 963)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 912) 与 utils\enhancedInputValidation.ts (行 964)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 913) 与 utils\enhancedInputValidation.ts (行 965)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 985)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 986)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 998)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 999)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 910) 与 utils\enhancedInputValidation.ts (行 1000)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 911) 与 utils\enhancedInputValidation.ts (行 1001)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 912) 与 utils\enhancedInputValidation.ts (行 1002)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 913) 与 utils\enhancedInputValidation.ts (行 1003)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1029)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1030)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 848) 与 utils\enhancedInputValidation.ts (行 1047)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 1054)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1055)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1056)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 910) 与 utils\enhancedInputValidation.ts (行 1057)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 911) 与 utils\enhancedInputValidation.ts (行 1058)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 912) 与 utils\enhancedInputValidation.ts (行 1059)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 913) 与 utils\enhancedInputValidation.ts (行 1060)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1082)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1083)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 1095)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1096)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1097)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 1108)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1109)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1110)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1043) 与 utils\enhancedInputValidation.ts (行 1124)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1043) 与 utils\enhancedInputValidation.ts (行 1139)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1125) 与 utils\enhancedInputValidation.ts (行 1140)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1126) 与 utils\enhancedInputValidation.ts (行 1141)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 913) 与 utils\enhancedInputValidation.ts (行 1145)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1165)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1166)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 1180)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1181)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1182)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 855) 与 utils\enhancedInputValidation.ts (行 1193)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1194)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1195)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 856) 与 utils\enhancedInputValidation.ts (行 1243)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 883) 与 utils\enhancedInputValidation.ts (行 1244)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1260) 与 utils\enhancedInputValidation.ts (行 1294)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1261) 与 utils\enhancedInputValidation.ts (行 1295)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1262) 与 utils\enhancedInputValidation.ts (行 1296)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1263) 与 utils\enhancedInputValidation.ts (行 1297)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1223) 与 utils\enhancedInputValidation.ts (行 1301)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1319) 与 utils\enhancedInputValidation.ts (行 1320)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1322) 与 utils\enhancedInputValidation.ts (行 1323)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1525) 与 utils\enhancedInputValidation.ts (行 1526)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 480) 与 utils\enhancedPermissionSystem.ts (行 481)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 512) 与 utils\enhancedPermissionSystem.ts (行 513)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 518) 与 utils\enhancedPermissionSystem.ts (行 519)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 506) 与 utils\enhancedPermissionSystem.ts (行 528)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 507) 与 utils\enhancedPermissionSystem.ts (行 529)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 559) 与 utils\enhancedPermissionSystem.ts (行 560)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 766) 与 utils\enhancedPermissionSystem.ts (行 767)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 738) 与 utils\enhancedPermissionSystem.ts (行 771)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 792) 与 utils\enhancedPermissionSystem.ts (行 793)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 589) 与 utils\enhancedPermissionSystem.ts (行 828)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1541) 与 utils\enhancedPermissionSystem.ts (行 928)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1542) 与 utils\enhancedPermissionSystem.ts (行 929)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1543) 与 utils\enhancedPermissionSystem.ts (行 930)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1544) 与 utils\enhancedPermissionSystem.ts (行 931)
  - 相似度: 100.0%

- utils\enhancedInputValidation.ts (行 1545) 与 utils\enhancedPermissionSystem.ts (行 932)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 949) 与 utils\enhancedPermissionSystem.ts (行 950)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 974) 与 utils\enhancedPermissionSystem.ts (行 975)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 980) 与 utils\enhancedPermissionSystem.ts (行 981)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 983) 与 utils\enhancedPermissionSystem.ts (行 984)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 961) 与 utils\enhancedPermissionSystem.ts (行 1007)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 962) 与 utils\enhancedPermissionSystem.ts (行 1008)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 963) 与 utils\enhancedPermissionSystem.ts (行 1009)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 964) 与 utils\enhancedPermissionSystem.ts (行 1010)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 965) 与 utils\enhancedPermissionSystem.ts (行 1011)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 966) 与 utils\enhancedPermissionSystem.ts (行 1012)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 967) 与 utils\enhancedPermissionSystem.ts (行 1013)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 968) 与 utils\enhancedPermissionSystem.ts (行 1014)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 969) 与 utils\enhancedPermissionSystem.ts (行 1015)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 976) 与 utils\enhancedPermissionSystem.ts (行 1023)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 977) 与 utils\enhancedPermissionSystem.ts (行 1024)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 978) 与 utils\enhancedPermissionSystem.ts (行 1025)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 979) 与 utils\enhancedPermissionSystem.ts (行 1026)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1027) 与 utils\enhancedPermissionSystem.ts (行 1028)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 1030) 与 utils\enhancedPermissionSystem.ts (行 1031)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 986) 与 utils\enhancedPermissionSystem.ts (行 1033)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 72) 与 utils\enhancedQueryCacheStrategy.ts (行 73)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 242) 与 utils\enhancedQueryCacheStrategy.ts (行 243)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 253) 与 utils\enhancedQueryCacheStrategy.ts (行 254)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 321) 与 utils\enhancedQueryCacheStrategy.ts (行 322)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 769) 与 utils\enhancedQueryCacheStrategy.ts (行 374)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 406) 与 utils\enhancedQueryCacheStrategy.ts (行 407)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 412) 与 utils\enhancedQueryCacheStrategy.ts (行 413)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 460) 与 utils\enhancedQueryCacheStrategy.ts (行 461)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 478) 与 utils\enhancedQueryCacheStrategy.ts (行 479)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 506) 与 utils\enhancedQueryCacheStrategy.ts (行 532)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 603) 与 utils\enhancedQueryCacheStrategy.ts (行 604)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 623) 与 utils\enhancedQueryCacheStrategy.ts (行 624)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 682) 与 utils\enhancedQueryCacheStrategy.ts (行 683)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 686) 与 utils\enhancedQueryCacheStrategy.ts (行 687)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 721) 与 utils\enhancedQueryCacheStrategy.ts (行 722)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 741) 与 utils\enhancedQueryCacheStrategy.ts (行 742)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 744) 与 utils\enhancedQueryCacheStrategy.ts (行 745)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 747) 与 utils\enhancedQueryCacheStrategy.ts (行 748)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 750) 与 utils\enhancedQueryCacheStrategy.ts (行 751)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 760) 与 utils\enhancedQueryCacheStrategy.ts (行 761)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 786) 与 utils\enhancedQueryCacheStrategy.ts (行 787)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 789) 与 utils\enhancedQueryCacheStrategy.ts (行 790)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 792) 与 utils\enhancedQueryCacheStrategy.ts (行 793)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 795) 与 utils\enhancedQueryCacheStrategy.ts (行 796)
  - 相似度: 100.0%

- utils\enhancedQueryCacheStrategy.ts (行 830) 与 utils\enhancedQueryCacheStrategy.ts (行 831)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 218) 与 utils\enhancedRealtimeManager.ts (行 219)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 238) 与 utils\enhancedRealtimeManager.ts (行 239)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 275) 与 utils\enhancedRealtimeManager.ts (行 276)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 296) 与 utils\enhancedRealtimeManager.ts (行 297)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 302) 与 utils\enhancedRealtimeManager.ts (行 303)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 310) 与 utils\enhancedRealtimeManager.ts (行 311)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 324) 与 utils\enhancedRealtimeManager.ts (行 325)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 328) 与 utils\enhancedRealtimeManager.ts (行 329)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 861) 与 utils\enhancedRealtimeManager.ts (行 363)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 401) 与 utils\enhancedRealtimeManager.ts (行 402)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 434) 与 utils\enhancedRealtimeManager.ts (行 435)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 436) 与 utils\enhancedRealtimeManager.ts (行 437)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 440) 与 utils\enhancedRealtimeManager.ts (行 441)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 330) 与 utils\enhancedRealtimeManager.ts (行 442)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 472) 与 utils\enhancedRealtimeManager.ts (行 473)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 507) 与 utils\enhancedRealtimeManager.ts (行 508)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 520) 与 utils\enhancedRealtimeManager.ts (行 521)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 522) 与 utils\enhancedRealtimeManager.ts (行 523)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 579) 与 utils\enhancedRealtimeManager.ts (行 580)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 632) 与 utils\enhancedRealtimeManager.ts (行 633)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 727) 与 utils\enhancedRealtimeManager.ts (行 728)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 793) 与 utils\enhancedRealtimeManager.ts (行 794)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 797) 与 utils\enhancedRealtimeManager.ts (行 798)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 799) 与 utils\enhancedRealtimeManager.ts (行 800)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 108) 与 utils\enhancedSkillSystemOptimizer.ts (行 109)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 168) 与 utils\enhancedSkillSystemOptimizer.ts (行 169)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 188) 与 utils\enhancedSkillSystemOptimizer.ts (行 189)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 289) 与 utils\enhancedSkillSystemOptimizer.ts (行 290)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 308) 与 utils\enhancedSkillSystemOptimizer.ts (行 309)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 314) 与 utils\enhancedSkillSystemOptimizer.ts (行 315)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 337) 与 utils\enhancedSkillSystemOptimizer.ts (行 338)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 343) 与 utils\enhancedSkillSystemOptimizer.ts (行 344)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 498) 与 utils\enhancedSkillSystemOptimizer.ts (行 499)
  - 相似度: 100.0%

- utils\enhancedSkillSystemOptimizer.ts (行 528) 与 utils\enhancedSkillSystemOptimizer.ts (行 529)
  - 相似度: 100.0%

- utils\enhancedUserErrorInterface.ts (行 535) 与 utils\enhancedUserErrorInterface.ts (行 536)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 137) 与 utils\enhancedUserErrorInterface.ts (行 552)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 138) 与 utils\enhancedUserErrorInterface.ts (行 553)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 139) 与 utils\enhancedUserErrorInterface.ts (行 554)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 152) 与 utils\enhancedUserNotificationSystem.ts (行 153)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 155) 与 utils\enhancedUserNotificationSystem.ts (行 156)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 170) 与 utils\enhancedUserNotificationSystem.ts (行 171)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 269) 与 utils\enhancedUserNotificationSystem.ts (行 270)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 275) 与 utils\enhancedUserNotificationSystem.ts (行 276)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 281) 与 utils\enhancedUserNotificationSystem.ts (行 282)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 364) 与 utils\enhancedUserNotificationSystem.ts (行 365)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 368) 与 utils\enhancedUserNotificationSystem.ts (行 369)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 504) 与 utils\enhancedUserNotificationSystem.ts (行 505)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 508) 与 utils\enhancedUserNotificationSystem.ts (行 509)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 552) 与 utils\enhancedUserNotificationSystem.ts (行 553)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 619) 与 utils\enhancedUserNotificationSystem.ts (行 620)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 672) 与 utils\enhancedUserNotificationSystem.ts (行 673)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 767) 与 utils\enhancedUserNotificationSystem.ts (行 768)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 797) 与 utils\enhancedUserNotificationSystem.ts (行 798)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 962) 与 utils\enhancedUserNotificationSystem.ts (行 963)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 965) 与 utils\enhancedUserNotificationSystem.ts (行 966)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 968) 与 utils\enhancedUserNotificationSystem.ts (行 969)
  - 相似度: 100.0%

- utils\errorClassifier.ts (行 127) 与 utils\errorClassifier.ts (行 128)
  - 相似度: 100.0%

- utils\errorHandler.ts (行 73) 与 utils\errorHandler.ts (行 74)
  - 相似度: 100.0%

- utils\errorHandler.ts (行 76) 与 utils\errorHandler.ts (行 77)
  - 相似度: 100.0%

- utils\errorHandler.ts (行 94) 与 utils\errorHandler.ts (行 95)
  - 相似度: 100.0%

- utils\errorHandler.ts (行 117) 与 utils\errorHandler.ts (行 118)
  - 相似度: 100.0%

- services\ValidationService.ts (行 536) 与 utils\errorHandlingExamples.ts (行 43)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 53) 与 utils\errorHandlingExamples.ts (行 54)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 69) 与 utils\errorHandlingExamples.ts (行 70)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 177) 与 utils\errorHandlingExamples.ts (行 178)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 124) 与 utils\errorHandlingExamples.ts (行 191)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 125) 与 utils\errorHandlingExamples.ts (行 192)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 209) 与 utils\errorHandlingExamples.ts (行 210)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 294) 与 utils\errorHandlingExamples.ts (行 295)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 187) 与 utils\errorHandlingExamples.ts (行 303)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 374) 与 utils\errorHandlingExamples.ts (行 375)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 188) 与 utils\errorMonitoringAndReporting.ts (行 189)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 254) 与 utils\errorMonitoringAndReporting.ts (行 255)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 305) 与 utils\errorMonitoringAndReporting.ts (行 306)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 423) 与 utils\errorMonitoringAndReporting.ts (行 424)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 594) 与 utils\errorMonitoringAndReporting.ts (行 595)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 605) 与 utils\errorMonitoringAndReporting.ts (行 606)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 626) 与 utils\errorMonitoringAndReporting.ts (行 627)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 629) 与 utils\errorMonitoringAndReporting.ts (行 630)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 632) 与 utils\errorMonitoringAndReporting.ts (行 633)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 653) 与 utils\errorMonitoringAndReporting.ts (行 654)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 656) 与 utils\errorMonitoringAndReporting.ts (行 657)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 659) 与 utils\errorMonitoringAndReporting.ts (行 660)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 503) 与 utils\globalErrorMonitor.ts (行 287)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 313) 与 utils\globalErrorMonitor.ts (行 314)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 397) 与 utils\globalErrorMonitor.ts (行 398)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 435) 与 utils\globalErrorMonitor.ts (行 436)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 691) 与 utils\globalErrorMonitor.ts (行 445)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 457) 与 utils\globalErrorMonitor.ts (行 458)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 460) 与 utils\globalErrorMonitor.ts (行 461)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 466) 与 utils\globalErrorMonitor.ts (行 467)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 518) 与 utils\globalErrorMonitor.ts (行 519)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 586) 与 utils\globalErrorMonitor.ts (行 587)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 600) 与 utils\globalErrorMonitor.ts (行 601)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 661) 与 utils\globalErrorMonitor.ts (行 719)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 749) 与 utils\globalErrorMonitor.ts (行 750)
  - 相似度: 100.0%

- utils\globalErrorMonitor.ts (行 761) 与 utils\globalErrorMonitor.ts (行 762)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 13) 与 utils\improvedErrorSystem.ts (行 14)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 107) 与 utils\improvedErrorSystem.ts (行 118)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 219) 与 utils\improvedErrorSystem.ts (行 220)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 503) 与 utils\improvedErrorSystem.ts (行 255)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 276) 与 utils\improvedErrorSystem.ts (行 277)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 318) 与 utils\improvedErrorSystem.ts (行 319)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 351) 与 utils\improvedErrorSystem.ts (行 352)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 361) 与 utils\improvedErrorSystem.ts (行 362)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 879) 与 utils\improvedErrorSystem.ts (行 394)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1061) 与 utils\improvedErrorSystem.ts (行 430)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1062) 与 utils\improvedErrorSystem.ts (行 431)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 911) 与 utils\improvedErrorSystem.ts (行 433)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 2) 与 utils\inputValidationManager.ts (行 3)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 237) 与 utils\inputValidationManager.ts (行 238)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 316) 与 utils\inputValidationManager.ts (行 317)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 371) 与 utils\inputValidationManager.ts (行 372)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 411) 与 utils\inputValidationManager.ts (行 412)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 495) 与 utils\inputValidationManager.ts (行 496)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 531) 与 utils\inputValidationManager.ts (行 532)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 575) 与 utils\inputValidationManager.ts (行 576)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 629) 与 utils\inputValidationManager.ts (行 630)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 632) 与 utils\inputValidationManager.ts (行 633)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 654) 与 utils\inputValidationManager.ts (行 655)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 703) 与 utils\inputValidationManager.ts (行 704)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 716) 与 utils\inputValidationManager.ts (行 733)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 850) 与 utils\inputValidationManager.ts (行 851)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 901) 与 utils\inputValidationManager.ts (行 916)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 902) 与 utils\inputValidationManager.ts (行 917)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 903) 与 utils\inputValidationManager.ts (行 918)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 904) 与 utils\inputValidationManager.ts (行 919)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 958) 与 utils\inputValidationManager.ts (行 959)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1027) 与 utils\inputValidationManager.ts (行 1028)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1082) 与 utils\inputValidationManager.ts (行 1083)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 145) 与 utils\intelligentCacheStrategy.ts (行 146)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 208) 与 utils\intelligentCacheStrategy.ts (行 209)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 236) 与 utils\intelligentCacheStrategy.ts (行 237)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 265) 与 utils\intelligentCacheStrategy.ts (行 266)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 276) 与 utils\intelligentCacheStrategy.ts (行 277)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 769) 与 utils\intelligentCacheStrategy.ts (行 341)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 359) 与 utils\intelligentCacheStrategy.ts (行 360)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 387) 与 utils\intelligentCacheStrategy.ts (行 388)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 427) 与 utils\intelligentCacheStrategy.ts (行 428)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 433) 与 utils\intelligentCacheStrategy.ts (行 434)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 459) 与 utils\intelligentCacheStrategy.ts (行 460)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 589) 与 utils\intelligentCacheStrategy.ts (行 590)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 732) 与 utils\intelligentCacheStrategy.ts (行 593)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 716) 与 utils\intelligentCacheStrategy.ts (行 594)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 604) 与 utils\intelligentCacheStrategy.ts (行 605)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 643) 与 utils\intelligentCacheStrategy.ts (行 644)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 659) 与 utils\intelligentCacheStrategy.ts (行 660)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 719) 与 utils\intelligentCacheStrategy.ts (行 737)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 719) 与 utils\intelligentCacheStrategy.ts (行 755)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 720) 与 utils\intelligentCacheStrategy.ts (行 756)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 721) 与 utils\intelligentCacheStrategy.ts (行 757)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 722) 与 utils\intelligentCacheStrategy.ts (行 758)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 469) 与 utils\intelligentCacheStrategy.ts (行 784)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 909) 与 utils\intelligentCacheStrategy.ts (行 910)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 932) 与 utils\intelligentCacheStrategy.ts (行 933)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 955) 与 utils\intelligentCacheStrategy.ts (行 956)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 982) 与 utils\intelligentCacheStrategy.ts (行 983)
  - 相似度: 100.0%

- utils\enhancedRealtimeManager.ts (行 710) 与 utils\intelligentCacheStrategy.ts (行 996)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1008) 与 utils\intelligentCacheStrategy.ts (行 1009)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1082) 与 utils\intelligentCacheStrategy.ts (行 1083)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1104) 与 utils\intelligentCacheStrategy.ts (行 1105)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1106) 与 utils\intelligentCacheStrategy.ts (行 1107)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 44) 与 utils\jsdocGenerator.ts (行 48)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 45) 与 utils\jsdocGenerator.ts (行 49)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 46) 与 utils\jsdocGenerator.ts (行 50)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 47) 与 utils\jsdocGenerator.ts (行 51)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 38) 与 utils\jsdocGenerator.ts (行 76)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 39) 与 utils\jsdocGenerator.ts (行 77)
  - 相似度: 100.0%

- utils\documentationGenerator.ts (行 76) 与 utils\jsdocGenerator.ts (行 86)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 171) 与 utils\jsdocGenerator.ts (行 172)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 730) 与 utils\jsdocGenerator.ts (行 183)
  - 相似度: 100.0%

- services\ConfigurationService.ts (行 711) 与 utils\jsdocGenerator.ts (行 184)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 249) 与 utils\jsdocGenerator.ts (行 250)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 252) 与 utils\jsdocGenerator.ts (行 253)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 295) 与 utils\jsdocGenerator.ts (行 296)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 298) 与 utils\jsdocGenerator.ts (行 299)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 355) 与 utils\jsdocGenerator.ts (行 395)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 407) 与 utils\jsdocGenerator.ts (行 408)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 410) 与 utils\jsdocGenerator.ts (行 411)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 433) 与 utils\jsdocGenerator.ts (行 434)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 436) 与 utils\jsdocGenerator.ts (行 437)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 468) 与 utils\jsdocGenerator.ts (行 469)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 491) 与 utils\jsdocGenerator.ts (行 492)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 470) 与 utils\jsdocGenerator.ts (行 493)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 315) 与 utils\jsdocGenerator.ts (行 533)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 556) 与 utils\jsdocGenerator.ts (行 596)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 659) 与 utils\jsdocGenerator.ts (行 660)
  - 相似度: 100.0%

- utils\jsdocGenerator.ts (行 690) 与 utils\jsdocGenerator.ts (行 691)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 49) 与 utils\masterErrorHandler.ts (行 143)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 215) 与 utils\masterErrorHandler.ts (行 216)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 261) 与 utils\masterErrorHandler.ts (行 262)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 407) 与 utils\masterErrorHandler.ts (行 408)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 89) 与 utils\masterErrorHandler.ts (行 555)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 705) 与 utils\masterErrorHandler.ts (行 706)
  - 相似度: 100.0%

- components\error\ErrorBoundary.tsx (行 139) 与 utils\masterErrorHandler.ts (行 729)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 152) 与 utils\memoryLeakPrevention.ts (行 153)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 158) 与 utils\memoryLeakPrevention.ts (行 159)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 189) 与 utils\memoryLeakPrevention.ts (行 190)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 264) 与 utils\memoryLeakPrevention.ts (行 265)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 326) 与 utils\memoryLeakPrevention.ts (行 327)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 390) 与 utils\memoryLeakPrevention.ts (行 391)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 480) 与 utils\memoryLeakPrevention.ts (行 481)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 513) 与 utils\memoryLeakPrevention.ts (行 514)
  - 相似度: 100.0%

- utils\memoryLeakPrevention.ts (行 516) 与 utils\memoryLeakPrevention.ts (行 517)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 171) 与 utils\memoryManagementSystem.ts (行 172)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 229) 与 utils\memoryManagementSystem.ts (行 230)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 250) 与 utils\memoryManagementSystem.ts (行 251)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 312) 与 utils\memoryManagementSystem.ts (行 313)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 385) 与 utils\memoryManagementSystem.ts (行 386)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 558) 与 utils\memoryManagementSystem.ts (行 559)
  - 相似度: 100.0%

- utils\memoryManagementSystem.ts (行 622) 与 utils\memoryManagementSystem.ts (行 623)
  - 相似度: 100.0%

- services\CacheService.ts (行 55) 与 utils\optimizedQueryCache.ts (行 23)
  - 相似度: 100.0%

- services\CacheService.ts (行 313) 与 utils\optimizedQueryCache.ts (行 175)
  - 相似度: 100.0%

- services\CacheService.ts (行 314) 与 utils\optimizedQueryCache.ts (行 176)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 177) 与 utils\optimizedQueryCache.ts (行 178)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\optimizedQueryCache.ts (行 209)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 340) 与 utils\optimizedQueryCache.ts (行 341)
  - 相似度: 100.0%

- services\CacheService.ts (行 184) 与 utils\optimizedQueryCache.ts (行 430)
  - 相似度: 100.0%

- services\CacheService.ts (行 920) 与 utils\optimizedQueryCache.ts (行 446)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 140) 与 utils\optimizedQueryCache.ts (行 496)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 533) 与 utils\optimizedQueryCache.ts (行 534)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 607) 与 utils\optimizedQueryCache.ts (行 608)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1101) 与 utils\optimizedQueryCache.ts (行 613)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 616) 与 utils\optimizedQueryCache.ts (行 617)
  - 相似度: 100.0%

- utils\optimizedQueryCache.ts (行 618) 与 utils\optimizedQueryCache.ts (行 619)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 22) 与 utils\optimizedRenderingSystem.ts (行 21)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 89) 与 utils\optimizedRenderingSystem.ts (行 90)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 113) 与 utils\optimizedRenderingSystem.ts (行 114)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 140) 与 utils\optimizedRenderingSystem.ts (行 183)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 147) 与 utils\optimizedRenderingSystem.ts (行 190)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 235) 与 utils\optimizedRenderingSystem.ts (行 236)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 246) 与 utils\optimizedRenderingSystem.ts (行 247)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 261) 与 utils\optimizedRenderingSystem.ts (行 262)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 237) 与 utils\optimizedRenderingSystem.ts (行 316)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 238) 与 utils\optimizedRenderingSystem.ts (行 317)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 239) 与 utils\optimizedRenderingSystem.ts (行 318)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 240) 与 utils\optimizedRenderingSystem.ts (行 319)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 241) 与 utils\optimizedRenderingSystem.ts (行 320)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 242) 与 utils\optimizedRenderingSystem.ts (行 321)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 244) 与 utils\optimizedRenderingSystem.ts (行 323)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 245) 与 utils\optimizedRenderingSystem.ts (行 324)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 246) 与 utils\optimizedRenderingSystem.ts (行 325)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 247) 与 utils\optimizedRenderingSystem.ts (行 326)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 248) 与 utils\optimizedRenderingSystem.ts (行 327)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 249) 与 utils\optimizedRenderingSystem.ts (行 328)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 250) 与 utils\optimizedRenderingSystem.ts (行 329)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 251) 与 utils\optimizedRenderingSystem.ts (行 330)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 252) 与 utils\optimizedRenderingSystem.ts (行 331)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 253) 与 utils\optimizedRenderingSystem.ts (行 332)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 254) 与 utils\optimizedRenderingSystem.ts (行 333)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 255) 与 utils\optimizedRenderingSystem.ts (行 334)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 256) 与 utils\optimizedRenderingSystem.ts (行 335)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 257) 与 utils\optimizedRenderingSystem.ts (行 336)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 258) 与 utils\optimizedRenderingSystem.ts (行 337)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 259) 与 utils\optimizedRenderingSystem.ts (行 338)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 282) 与 utils\optimizedRenderingSystem.ts (行 360)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 283) 与 utils\optimizedRenderingSystem.ts (行 361)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 386) 与 utils\optimizedRenderingSystem.ts (行 387)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 395) 与 utils\optimizedRenderingSystem.ts (行 396)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 324) 与 utils\optimizedRenderingSystem.ts (行 400)
  - 相似度: 100.0%

- utils\optimizedRenderingSystem.ts (行 424) 与 utils\optimizedRenderingSystem.ts (行 425)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 365) 与 utils\optimizedRenderingSystem.ts (行 426)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 366) 与 utils\optimizedRenderingSystem.ts (行 427)
  - 相似度: 100.0%

- utils\componentRenderOptimizer.ts (行 367) 与 utils\optimizedRenderingSystem.ts (行 428)
  - 相似度: 100.0%

- utils\patterns\command.ts (行 67) 与 utils\patterns\command.ts (行 68)
  - 相似度: 100.0%

- utils\patterns\command.ts (行 73) 与 utils\patterns\command.ts (行 74)
  - 相似度: 100.0%

- utils\patterns\command.ts (行 73) 与 utils\patterns\command.ts (行 96)
  - 相似度: 100.0%

- utils\patterns\command.ts (行 75) 与 utils\patterns\command.ts (行 97)
  - 相似度: 100.0%

- utils\patterns\command.ts (行 120) 与 utils\patterns\command.ts (行 203)
  - 相似度: 100.0%

- utils\patterns\command.ts (行 120) 与 utils\patterns\command.ts (行 252)
  - 相似度: 100.0%

- utils\patterns\command.ts (行 300) 与 utils\patterns\command.ts (行 309)
  - 相似度: 100.0%

- lib\debugUtils.ts (行 96) 与 utils\patterns\decorator.ts (行 118)
  - 相似度: 100.0%

- utils\patterns\decorator.ts (行 153) 与 utils\patterns\decorator.ts (行 154)
  - 相似度: 100.0%

- utils\patterns\decorator.ts (行 24) 与 utils\patterns\decorator.ts (行 254)
  - 相似度: 100.0%

- utils\patterns\decorator.ts (行 350) 与 utils\patterns\decorator.ts (行 351)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\factory.ts (行 47)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 97) 与 utils\patterns\factory.ts (行 98)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 46) 与 utils\patterns\factory.ts (行 184)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\factory.ts (行 185)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 231) 与 utils\patterns\factory.ts (行 232)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 108) 与 utils\patterns\factory.ts (行 268)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\factory.ts (行 307)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 322) 与 utils\patterns\factory.ts (行 323)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 434) 与 utils\patterns\factory.ts (行 435)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\factory.ts (行 471)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 75) 与 utils\patterns\index.ts (行 76)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\index.ts (行 247)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 259) 与 utils\patterns\index.ts (行 264)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 105) 与 utils\patterns\observer.ts (行 106)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 175) 与 utils\patterns\observer.ts (行 176)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 691) 与 utils\patterns\observer.ts (行 208)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 191) 与 utils\patterns\observer.ts (行 234)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 202) 与 utils\patterns\observer.ts (行 236)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 203) 与 utils\patterns\observer.ts (行 237)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 204) 与 utils\patterns\observer.ts (行 238)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 205) 与 utils\patterns\observer.ts (行 239)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 206) 与 utils\patterns\observer.ts (行 240)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 207) 与 utils\patterns\observer.ts (行 241)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 691) 与 utils\patterns\observer.ts (行 242)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 314) 与 utils\patterns\observer.ts (行 315)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 334) 与 utils\patterns\observer.ts (行 335)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 340) 与 utils\patterns\observer.ts (行 341)
  - 相似度: 100.0%

- utils\patterns\observer.ts (行 355) 与 utils\patterns\observer.ts (行 356)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 27) 与 utils\patterns\singleton.ts (行 28)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 133) 与 utils\patterns\singleton.ts (行 134)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 328) 与 utils\patterns\singleton.ts (行 329)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\singleton.ts (行 330)
  - 相似度: 100.0%

- utils\patterns\singleton.ts (行 420) 与 utils\patterns\singleton.ts (行 421)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 246) 与 utils\patterns\strategy.ts (行 64)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\strategy.ts (行 65)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 84) 与 utils\patterns\strategy.ts (行 85)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 86) 与 utils\patterns\strategy.ts (行 97)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 306) 与 utils\patterns\strategy.ts (行 272)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\strategy.ts (行 273)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 327) 与 utils\patterns\strategy.ts (行 312)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 338) 与 utils\patterns\strategy.ts (行 323)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 339) 与 utils\patterns\strategy.ts (行 324)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\strategy.ts (行 367)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 381) 与 utils\patterns\strategy.ts (行 433)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 382) 与 utils\patterns\strategy.ts (行 434)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 446) 与 utils\patterns\strategy.ts (行 447)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 399) 与 utils\patterns\strategy.ts (行 452)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 473) 与 utils\patterns\strategy.ts (行 474)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 498) 与 utils\patterns\strategy.ts (行 499)
  - 相似度: 100.0%

- utils\patterns\strategy.ts (行 552) 与 utils\patterns\strategy.ts (行 553)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 568) 与 utils\patterns\strategy.ts (行 590)
  - 相似度: 100.0%

- utils\performanceCriticalFixes.ts (行 192) 与 utils\performanceCriticalFixes.ts (行 193)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1012) 与 utils\performanceCriticalFixes.ts (行 326)
  - 相似度: 100.0%

- utils\intelligentCacheStrategy.ts (行 1013) 与 utils\performanceCriticalFixes.ts (行 327)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 219) 与 utils\queryCacheOptimizer.ts (行 220)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 310) 与 utils\queryCacheOptimizer.ts (行 311)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 337) 与 utils\queryCacheOptimizer.ts (行 338)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 341) 与 utils\queryCacheOptimizer.ts (行 342)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 343) 与 utils\queryCacheOptimizer.ts (行 344)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 349) 与 utils\queryCacheOptimizer.ts (行 350)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 384) 与 utils\queryCacheOptimizer.ts (行 385)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 390) 与 utils\queryCacheOptimizer.ts (行 391)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 396) 与 utils\queryCacheOptimizer.ts (行 397)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 463) 与 utils\queryCacheOptimizer.ts (行 464)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 467) 与 utils\queryCacheOptimizer.ts (行 468)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 473) 与 utils\queryCacheOptimizer.ts (行 474)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 549) 与 utils\queryCacheOptimizer.ts (行 550)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 555) 与 utils\queryCacheOptimizer.ts (行 556)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 579) 与 utils\queryCacheOptimizer.ts (行 580)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 585) 与 utils\queryCacheOptimizer.ts (行 586)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 649) 与 utils\queryCacheOptimizer.ts (行 650)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 676) 与 utils\queryCacheOptimizer.ts (行 677)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 743) 与 utils\queryCacheOptimizer.ts (行 744)
  - 相似度: 100.0%

- utils\queryCacheOptimizer.ts (行 792) 与 utils\queryCacheOptimizer.ts (行 793)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 221) 与 utils\realtimeSubscriptionManager.ts (行 222)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 227) 与 utils\realtimeSubscriptionManager.ts (行 228)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 238) 与 utils\realtimeSubscriptionManager.ts (行 239)
  - 相似度: 100.0%

- utils\errorHandlingExamples.ts (行 42) 与 utils\realtimeSubscriptionManager.ts (行 290)
  - 相似度: 100.0%

- services\ValidationService.ts (行 536) 与 utils\realtimeSubscriptionManager.ts (行 291)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 305) 与 utils\realtimeSubscriptionManager.ts (行 306)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 316) 与 utils\realtimeSubscriptionManager.ts (行 317)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 322) 与 utils\realtimeSubscriptionManager.ts (行 323)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 349) 与 utils\realtimeSubscriptionManager.ts (行 350)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 360) 与 utils\realtimeSubscriptionManager.ts (行 361)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 333) 与 utils\realtimeSubscriptionManager.ts (行 371)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 334) 与 utils\realtimeSubscriptionManager.ts (行 372)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 335) 与 utils\realtimeSubscriptionManager.ts (行 373)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 388) 与 utils\realtimeSubscriptionManager.ts (行 389)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 397) 与 utils\realtimeSubscriptionManager.ts (行 398)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 446) 与 utils\realtimeSubscriptionManager.ts (行 447)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 476) 与 utils\realtimeSubscriptionManager.ts (行 477)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 485) 与 utils\realtimeSubscriptionManager.ts (行 486)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 507) 与 utils\realtimeSubscriptionManager.ts (行 508)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 625) 与 utils\realtimeSubscriptionManager.ts (行 626)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 628) 与 utils\realtimeSubscriptionManager.ts (行 629)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 631) 与 utils\realtimeSubscriptionManager.ts (行 632)
  - 相似度: 100.0%

- utils\realtimeSubscriptionManager.ts (行 637) 与 utils\realtimeSubscriptionManager.ts (行 638)
  - 相似度: 100.0%

- utils\apiSecurityConfig.ts (行 861) 与 utils\realtimeSubscriptionManager.ts (行 795)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 30) 与 utils\roleConfiguration.ts (行 42)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 31) 与 utils\roleConfiguration.ts (行 43)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 32) 与 utils\roleConfiguration.ts (行 44)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 33) 与 utils\roleConfiguration.ts (行 45)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 34) 与 utils\roleConfiguration.ts (行 46)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 34) 与 utils\roleConfiguration.ts (行 60)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 47) 与 utils\roleConfiguration.ts (行 61)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 48) 与 utils\roleConfiguration.ts (行 62)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 49) 与 utils\roleConfiguration.ts (行 63)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 30) 与 utils\roleConfiguration.ts (行 70)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 31) 与 utils\roleConfiguration.ts (行 71)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 32) 与 utils\roleConfiguration.ts (行 72)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 33) 与 utils\roleConfiguration.ts (行 73)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 34) 与 utils\roleConfiguration.ts (行 74)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 47) 与 utils\roleConfiguration.ts (行 75)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 48) 与 utils\roleConfiguration.ts (行 76)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 56) 与 utils\roleConfiguration.ts (行 88)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 57) 与 utils\roleConfiguration.ts (行 89)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 58) 与 utils\roleConfiguration.ts (行 90)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 59) 与 utils\roleConfiguration.ts (行 91)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 34) 与 utils\roleConfiguration.ts (行 92)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 47) 与 utils\roleConfiguration.ts (行 93)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 48) 与 utils\roleConfiguration.ts (行 94)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 77) 与 utils\roleConfiguration.ts (行 95)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 78) 与 utils\roleConfiguration.ts (行 96)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 79) 与 utils\roleConfiguration.ts (行 97)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 80) 与 utils\roleConfiguration.ts (行 98)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 81) 与 utils\roleConfiguration.ts (行 99)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 56) 与 utils\roleConfiguration.ts (行 106)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 57) 与 utils\roleConfiguration.ts (行 107)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 58) 与 utils\roleConfiguration.ts (行 108)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 59) 与 utils\roleConfiguration.ts (行 109)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 34) 与 utils\roleConfiguration.ts (行 110)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 47) 与 utils\roleConfiguration.ts (行 111)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 48) 与 utils\roleConfiguration.ts (行 112)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 77) 与 utils\roleConfiguration.ts (行 113)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 78) 与 utils\roleConfiguration.ts (行 114)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 79) 与 utils\roleConfiguration.ts (行 115)
  - 相似度: 100.0%

- utils\roleConfiguration.ts (行 80) 与 utils\roleConfiguration.ts (行 116)
  - 相似度: 100.0%

- services\SecurityAuditService.ts (行 145) 与 utils\securityEnhancement.ts (行 42)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 97) 与 utils\securityEnhancement.ts (行 98)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 105) 与 utils\securityEnhancement.ts (行 106)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 196) 与 utils\securityEnhancement.ts (行 197)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 344) 与 utils\securityEnhancement.ts (行 345)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 94) 与 utils\securityMiddleware.ts (行 127)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 95) 与 utils\securityMiddleware.ts (行 128)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 165) 与 utils\securityMiddleware.ts (行 166)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 171) 与 utils\securityMiddleware.ts (行 172)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 185) 与 utils\securityMiddleware.ts (行 186)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 211) 与 utils\securityMiddleware.ts (行 212)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 254) 与 utils\securityMiddleware.ts (行 255)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 260) 与 utils\securityMiddleware.ts (行 261)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 288) 与 utils\securityMiddleware.ts (行 289)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 246) 与 utils\securityMiddleware.ts (行 293)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 247) 与 utils\securityMiddleware.ts (行 294)
  - 相似度: 100.0%

- utils\securityEnhancement.ts (行 248) 与 utils\securityMiddleware.ts (行 295)
  - 相似度: 100.0%

- utils\securityMiddleware.ts (行 349) 与 utils\securityMiddleware.ts (行 350)
  - 相似度: 100.0%

- utils\skillBatchProcessor.ts (行 112) 与 utils\skillBatchProcessor.ts (行 113)
  - 相似度: 100.0%

- utils\skillBatchProcessor.ts (行 118) 与 utils\skillBatchProcessor.ts (行 119)
  - 相似度: 100.0%

- utils\skillBatchProcessor.ts (行 237) 与 utils\skillBatchProcessor.ts (行 238)
  - 相似度: 100.0%

- utils\skillCache.ts (行 10) 与 utils\skillCache.ts (行 11)
  - 相似度: 100.0%

- utils\skillCache.ts (行 16) 与 utils\skillCache.ts (行 17)
  - 相似度: 100.0%

- utils\skillCache.ts (行 22) 与 utils\skillCache.ts (行 23)
  - 相似度: 100.0%

- utils\skillCache.ts (行 28) 与 utils\skillCache.ts (行 29)
  - 相似度: 100.0%

- utils\skillCache.ts (行 109) 与 utils\skillCache.ts (行 136)
  - 相似度: 100.0%

- utils\skillCache.ts (行 110) 与 utils\skillCache.ts (行 137)
  - 相似度: 100.0%

- utils\skillCache.ts (行 121) 与 utils\skillCache.ts (行 165)
  - 相似度: 100.0%

- utils\skillCache.ts (行 122) 与 utils\skillCache.ts (行 166)
  - 相似度: 100.0%

- utils\skillCache.ts (行 121) 与 utils\skillCache.ts (行 202)
  - 相似度: 100.0%

- utils\skillCache.ts (行 122) 与 utils\skillCache.ts (行 203)
  - 相似度: 100.0%

- utils\skillCache.ts (行 235) 与 utils\skillCache.ts (行 254)
  - 相似度: 100.0%

- types\skill.types.ts (行 137) 与 utils\skillDataStandardizer.ts (行 56)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 91) 与 utils\skillDataStandardizer.ts (行 141)
  - 相似度: 100.0%

- utils\skillDataStandardizer.ts (行 91) 与 utils\skillDataStandardizer.ts (行 177)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 113) 与 utils\skillEffectsManager.ts (行 114)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 157) 与 utils\skillEffectsManager.ts (行 158)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 163) 与 utils\skillEffectsManager.ts (行 164)
  - 相似度: 100.0%

- utils\skillEffectsManager.ts (行 238) 与 utils\skillEffectsManager.ts (行 239)
  - 相似度: 100.0%

- components\room\RoleSelection.tsx (行 148) 与 utils\skillErrorHandler.ts (行 132)
  - 相似度: 100.0%

- utils\skillErrorHandler.ts (行 277) 与 utils\skillErrorHandler.ts (行 278)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 407) 与 utils\skillMappingConfig.ts (行 33)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 408) 与 utils\skillMappingConfig.ts (行 34)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 409) 与 utils\skillMappingConfig.ts (行 35)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 410) 与 utils\skillMappingConfig.ts (行 36)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 411) 与 utils\skillMappingConfig.ts (行 37)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 420) 与 utils\skillMappingConfig.ts (行 71)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 421) 与 utils\skillMappingConfig.ts (行 72)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 422) 与 utils\skillMappingConfig.ts (行 73)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 423) 与 utils\skillMappingConfig.ts (行 74)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 432) 与 utils\skillMappingConfig.ts (行 89)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 433) 与 utils\skillMappingConfig.ts (行 90)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 434) 与 utils\skillMappingConfig.ts (行 91)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 435) 与 utils\skillMappingConfig.ts (行 92)
  - 相似度: 100.0%

- types\skillSystem.types.ts (行 435) 与 utils\skillMappingConfig.ts (行 107)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 93) 与 utils\skillMappingConfig.ts (行 108)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 94) 与 utils\skillMappingConfig.ts (行 109)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 95) 与 utils\skillMappingConfig.ts (行 110)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 96) 与 utils\skillMappingConfig.ts (行 111)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 140) 与 utils\skillMappingConfig.ts (行 155)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 141) 与 utils\skillMappingConfig.ts (行 156)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 142) 与 utils\skillMappingConfig.ts (行 157)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 143) 与 utils\skillMappingConfig.ts (行 158)
  - 相似度: 100.0%

- utils\skillMappingConfig.ts (行 144) 与 utils\skillMappingConfig.ts (行 159)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 8) 与 utils\skillSystemCache.ts (行 9)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 30) 与 utils\skillSystemCache.ts (行 31)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 103) 与 utils\skillSystemCache.ts (行 104)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 137) 与 utils\skillSystemCache.ts (行 138)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 167) 与 utils\skillSystemCache.ts (行 168)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 270) 与 utils\skillSystemCache.ts (行 287)
  - 相似度: 100.0%

- utils\skillSystemCache.ts (行 271) 与 utils\skillSystemCache.ts (行 288)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 112) 与 utils\skillSystemValidation.ts (行 113)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 129) 与 utils\skillSystemValidation.ts (行 130)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 122) 与 utils\skillSystemValidation.ts (行 139)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 123) 与 utils\skillSystemValidation.ts (行 140)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 124) 与 utils\skillSystemValidation.ts (行 141)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 125) 与 utils\skillSystemValidation.ts (行 142)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 126) 与 utils\skillSystemValidation.ts (行 143)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 146) 与 utils\skillSystemValidation.ts (行 147)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 156) 与 utils\skillSystemValidation.ts (行 157)
  - 相似度: 100.0%

- utils\common\dataValidation.ts (行 75) 与 utils\skillSystemValidation.ts (行 174)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 179) 与 utils\skillSystemValidation.ts (行 180)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 187) 与 utils\skillSystemValidation.ts (行 188)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 217) 与 utils\skillSystemValidation.ts (行 218)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 223) 与 utils\skillSystemValidation.ts (行 224)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 192) 与 utils\skillSystemValidation.ts (行 228)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 193) 与 utils\skillSystemValidation.ts (行 229)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 247) 与 utils\skillSystemValidation.ts (行 248)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 192) 与 utils\skillSystemValidation.ts (行 252)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 193) 与 utils\skillSystemValidation.ts (行 253)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 309) 与 utils\skillSystemValidation.ts (行 310)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 344) 与 utils\skillSystemValidation.ts (行 345)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 409) 与 utils\skillSystemValidation.ts (行 420)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 425) 与 utils\skillSystemValidation.ts (行 426)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 527) 与 utils\skillSystemValidation.ts (行 583)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 528) 与 utils\skillSystemValidation.ts (行 584)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 529) 与 utils\skillSystemValidation.ts (行 585)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 530) 与 utils\skillSystemValidation.ts (行 586)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 531) 与 utils\skillSystemValidation.ts (行 587)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 532) 与 utils\skillSystemValidation.ts (行 588)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 533) 与 utils\skillSystemValidation.ts (行 589)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 534) 与 utils\skillSystemValidation.ts (行 590)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 535) 与 utils\skillSystemValidation.ts (行 591)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 536) 与 utils\skillSystemValidation.ts (行 592)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 537) 与 utils\skillSystemValidation.ts (行 593)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 538) 与 utils\skillSystemValidation.ts (行 594)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 539) 与 utils\skillSystemValidation.ts (行 595)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 540) 与 utils\skillSystemValidation.ts (行 596)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 541) 与 utils\skillSystemValidation.ts (行 597)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 542) 与 utils\skillSystemValidation.ts (行 598)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 543) 与 utils\skillSystemValidation.ts (行 599)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 544) 与 utils\skillSystemValidation.ts (行 600)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 545) 与 utils\skillSystemValidation.ts (行 601)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 546) 与 utils\skillSystemValidation.ts (行 602)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 547) 与 utils\skillSystemValidation.ts (行 603)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 548) 与 utils\skillSystemValidation.ts (行 604)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 549) 与 utils\skillSystemValidation.ts (行 605)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 550) 与 utils\skillSystemValidation.ts (行 606)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 551) 与 utils\skillSystemValidation.ts (行 607)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 552) 与 utils\skillSystemValidation.ts (行 608)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 553) 与 utils\skillSystemValidation.ts (行 609)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 554) 与 utils\skillSystemValidation.ts (行 610)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 555) 与 utils\skillSystemValidation.ts (行 611)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 565) 与 utils\skillSystemValidation.ts (行 616)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 566) 与 utils\skillSystemValidation.ts (行 617)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 567) 与 utils\skillSystemValidation.ts (行 618)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 568) 与 utils\skillSystemValidation.ts (行 619)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 569) 与 utils\skillSystemValidation.ts (行 620)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 500) 与 utils\skillSystemValidation.ts (行 643)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 642) 与 utils\skillSystemValidation.ts (行 715)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 500) 与 utils\skillSystemValidation.ts (行 716)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 641) 与 utils\skillSystemValidation.ts (行 770)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 642) 与 utils\skillSystemValidation.ts (行 771)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 500) 与 utils\skillSystemValidation.ts (行 772)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 835) 与 utils\skillSystemValidation.ts (行 836)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 452) 与 utils\skillSystemValidation.ts (行 856)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 453) 与 utils\skillSystemValidation.ts (行 857)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 454) 与 utils\skillSystemValidation.ts (行 858)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 455) 与 utils\skillSystemValidation.ts (行 859)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 456) 与 utils\skillSystemValidation.ts (行 860)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 457) 与 utils\skillSystemValidation.ts (行 861)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 458) 与 utils\skillSystemValidation.ts (行 862)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 466) 与 utils\skillSystemValidation.ts (行 870)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 467) 与 utils\skillSystemValidation.ts (行 871)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 474) 与 utils\skillSystemValidation.ts (行 878)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 475) 与 utils\skillSystemValidation.ts (行 879)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 476) 与 utils\skillSystemValidation.ts (行 880)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 477) 与 utils\skillSystemValidation.ts (行 881)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 478) 与 utils\skillSystemValidation.ts (行 882)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 479) 与 utils\skillSystemValidation.ts (行 883)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 489) 与 utils\skillSystemValidation.ts (行 894)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 490) 与 utils\skillSystemValidation.ts (行 895)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 14) 与 utils\skillUsageRestrictions.ts (行 15)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 124) 与 utils\skillUsageRestrictions.ts (行 139)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 125) 与 utils\skillUsageRestrictions.ts (行 140)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 126) 与 utils\skillUsageRestrictions.ts (行 141)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 124) 与 utils\skillUsageRestrictions.ts (行 154)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 125) 与 utils\skillUsageRestrictions.ts (行 155)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 126) 与 utils\skillUsageRestrictions.ts (行 156)
  - 相似度: 100.0%

- utils\skillUsageRestrictions.ts (行 57) 与 utils\skillUsageRestrictions.ts (行 198)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 28) 与 utils\skillValidationRules.ts (行 46)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 29) 与 utils\skillValidationRules.ts (行 47)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 30) 与 utils\skillValidationRules.ts (行 48)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 31) 与 utils\skillValidationRules.ts (行 49)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 32) 与 utils\skillValidationRules.ts (行 50)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 33) 与 utils\skillValidationRules.ts (行 51)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 34) 与 utils\skillValidationRules.ts (行 52)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 28) 与 utils\skillValidationRules.ts (行 64)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 29) 与 utils\skillValidationRules.ts (行 65)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 59) 与 utils\skillValidationRules.ts (行 76)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 60) 与 utils\skillValidationRules.ts (行 77)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 61) 与 utils\skillValidationRules.ts (行 78)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 62) 与 utils\skillValidationRules.ts (行 79)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 63) 与 utils\skillValidationRules.ts (行 80)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 28) 与 utils\skillValidationRules.ts (行 81)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 29) 与 utils\skillValidationRules.ts (行 82)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 66) 与 utils\skillValidationRules.ts (行 83)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 67) 与 utils\skillValidationRules.ts (行 84)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 68) 与 utils\skillValidationRules.ts (行 85)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 69) 与 utils\skillValidationRules.ts (行 86)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 117) 与 utils\skillValidationRules.ts (行 141)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 118) 与 utils\skillValidationRules.ts (行 142)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 119) 与 utils\skillValidationRules.ts (行 143)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 120) 与 utils\skillValidationRules.ts (行 144)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 121) 与 utils\skillValidationRules.ts (行 145)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 122) 与 utils\skillValidationRules.ts (行 146)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 129) 与 utils\skillValidationRules.ts (行 153)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 130) 与 utils\skillValidationRules.ts (行 154)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 131) 与 utils\skillValidationRules.ts (行 155)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 132) 与 utils\skillValidationRules.ts (行 156)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 133) 与 utils\skillValidationRules.ts (行 157)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 134) 与 utils\skillValidationRules.ts (行 158)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 209) 与 utils\skillValidationRules.ts (行 226)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 210) 与 utils\skillValidationRules.ts (行 227)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 211) 与 utils\skillValidationRules.ts (行 228)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 212) 与 utils\skillValidationRules.ts (行 229)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 213) 与 utils\skillValidationRules.ts (行 230)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 214) 与 utils\skillValidationRules.ts (行 231)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 215) 与 utils\skillValidationRules.ts (行 232)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 216) 与 utils\skillValidationRules.ts (行 233)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 217) 与 utils\skillValidationRules.ts (行 234)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 312) 与 utils\skillValidationRules.ts (行 313)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 325) 与 utils\skillValidationRules.ts (行 326)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 192) 与 utils\skillValidationRules.ts (行 330)
  - 相似度: 100.0%

- utils\skillSystemValidation.ts (行 193) 与 utils\skillValidationRules.ts (行 331)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 328) 与 utils\skillValidationRules.ts (行 375)
  - 相似度: 100.0%

- utils\skillValidationRules.ts (行 329) 与 utils\skillValidationRules.ts (行 376)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 169) 与 utils\unifiedCacheManager.ts (行 170)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 172) 与 utils\unifiedCacheManager.ts (行 173)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 212) 与 utils\unifiedCacheManager.ts (行 213)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 218) 与 utils\unifiedCacheManager.ts (行 219)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 445) 与 utils\unifiedCacheManager.ts (行 267)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 297) 与 utils\unifiedCacheManager.ts (行 298)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 300) 与 utils\unifiedCacheManager.ts (行 301)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 136) 与 utils\unifiedCacheManager.ts (行 346)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 295) 与 utils\unifiedCacheManager.ts (行 373)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 375) 与 utils\unifiedCacheManager.ts (行 376)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 378) 与 utils\unifiedCacheManager.ts (行 379)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 343) 与 utils\unifiedCacheManager.ts (行 403)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 344) 与 utils\unifiedCacheManager.ts (行 404)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 345) 与 utils\unifiedCacheManager.ts (行 405)
  - 相似度: 100.0%

- services\SkillSystemService.ts (行 136) 与 utils\unifiedCacheManager.ts (行 406)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 474) 与 utils\unifiedCacheManager.ts (行 475)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 769) 与 utils\unifiedCacheManager.ts (行 479)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 491) 与 utils\unifiedCacheManager.ts (行 492)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 691) 与 utils\unifiedCacheManager.ts (行 513)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 525) 与 utils\unifiedCacheManager.ts (行 526)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 528) 与 utils\unifiedCacheManager.ts (行 529)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 589) 与 utils\unifiedCacheManager.ts (行 590)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 616) 与 utils\unifiedCacheManager.ts (行 617)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 619) 与 utils\unifiedCacheManager.ts (行 620)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 689) 与 utils\unifiedCacheManager.ts (行 690)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 665) 与 utils\unifiedCacheManager.ts (行 694)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 666) 与 utils\unifiedCacheManager.ts (行 695)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 693) 与 utils\unifiedCacheManager.ts (行 716)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 665) 与 utils\unifiedCacheManager.ts (行 717)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 666) 与 utils\unifiedCacheManager.ts (行 718)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 665) 与 utils\unifiedCacheManager.ts (行 743)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 666) 与 utils\unifiedCacheManager.ts (行 744)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 788) 与 utils\unifiedCacheManager.ts (行 789)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 871) 与 utils\unifiedCacheManager.ts (行 872)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 875) 与 utils\unifiedCacheManager.ts (行 876)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 796) 与 utils\unifiedCacheManager.ts (行 881)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 796) 与 utils\unifiedCacheManager.ts (行 882)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 887) 与 utils\unifiedCacheManager.ts (行 888)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 928) 与 utils\unifiedCacheManager.ts (行 929)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 961) 与 utils\unifiedCacheManager.ts (行 962)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 964) 与 utils\unifiedCacheManager.ts (行 965)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1172) 与 utils\unifiedCacheManager.ts (行 992)
  - 相似度: 100.0%

- utils\advancedInputValidationSystem.ts (行 1173) 与 utils\unifiedCacheManager.ts (行 993)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 998) 与 utils\unifiedCacheManager.ts (行 999)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 33) 与 utils\unifiedErrorHandler.ts (行 14)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 34) 与 utils\unifiedErrorHandler.ts (行 15)
  - 相似度: 100.0%

- config\security.config.ts (行 14) 与 utils\unifiedErrorHandler.ts (行 16)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 177) 与 utils\unifiedErrorHandler.ts (行 200)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 245) 与 utils\unifiedErrorHandler.ts (行 246)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 251) 与 utils\unifiedErrorHandler.ts (行 252)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 257) 与 utils\unifiedErrorHandler.ts (行 258)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 389) 与 utils\unifiedErrorHandler.ts (行 390)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 395) 与 utils\unifiedErrorHandler.ts (行 396)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 413) 与 utils\unifiedErrorHandler.ts (行 414)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 519) 与 utils\unifiedErrorHandler.ts (行 520)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1061) 与 utils\unifiedErrorHandler.ts (行 523)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 539) 与 utils\unifiedErrorHandler.ts (行 540)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 553) 与 utils\unifiedErrorHandler.ts (行 554)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 728) 与 utils\unifiedErrorHandler.ts (行 729)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 399) 与 utils\unifiedErrorHandler.ts (行 772)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 60) 与 utils\unifiedErrorManager.ts (行 50)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 63) 与 utils\unifiedErrorManager.ts (行 53)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 64) 与 utils\unifiedErrorManager.ts (行 54)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 65) 与 utils\unifiedErrorManager.ts (行 55)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 66) 与 utils\unifiedErrorManager.ts (行 56)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 67) 与 utils\unifiedErrorManager.ts (行 57)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 68) 与 utils\unifiedErrorManager.ts (行 58)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 69) 与 utils\unifiedErrorManager.ts (行 59)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 70) 与 utils\unifiedErrorManager.ts (行 60)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 71) 与 utils\unifiedErrorManager.ts (行 61)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 72) 与 utils\unifiedErrorManager.ts (行 62)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 73) 与 utils\unifiedErrorManager.ts (行 63)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 74) 与 utils\unifiedErrorManager.ts (行 64)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 75) 与 utils\unifiedErrorManager.ts (行 65)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 92) 与 utils\unifiedErrorManager.ts (行 86)
  - 相似度: 100.0%

- utils\common\errorHandling.ts (行 24) 与 utils\unifiedErrorManager.ts (行 102)
  - 相似度: 100.0%

- utils\errorHandlerInterface.ts (行 14) 与 utils\unifiedErrorManager.ts (行 109)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 200) 与 utils\unifiedErrorManager.ts (行 159)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 201) 与 utils\unifiedErrorManager.ts (行 160)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 202) 与 utils\unifiedErrorManager.ts (行 161)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 203) 与 utils\unifiedErrorManager.ts (行 162)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 204) 与 utils\unifiedErrorManager.ts (行 163)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 221) 与 utils\unifiedErrorManager.ts (行 180)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 222) 与 utils\unifiedErrorManager.ts (行 181)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 223) 与 utils\unifiedErrorManager.ts (行 182)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 224) 与 utils\unifiedErrorManager.ts (行 183)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 225) 与 utils\unifiedErrorManager.ts (行 184)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 264) 与 utils\unifiedErrorManager.ts (行 203)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 156) 与 utils\unifiedErrorManager.ts (行 216)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 173) 与 utils\unifiedErrorManager.ts (行 232)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 174) 与 utils\unifiedErrorManager.ts (行 233)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 175) 与 utils\unifiedErrorManager.ts (行 234)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 176) 与 utils\unifiedErrorManager.ts (行 235)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 177) 与 utils\unifiedErrorManager.ts (行 236)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 178) 与 utils\unifiedErrorManager.ts (行 237)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 179) 与 utils\unifiedErrorManager.ts (行 238)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 177) 与 utils\unifiedErrorManager.ts (行 259)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 282) 与 utils\unifiedErrorManager.ts (行 283)
  - 相似度: 100.0%

- utils\unifiedCacheManager.ts (行 478) 与 utils\unifiedErrorManager.ts (行 312)
  - 相似度: 100.0%

- middleware\apiSecurityMiddleware.ts (行 769) 与 utils\unifiedErrorManager.ts (行 313)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 300) 与 utils\unifiedErrorManager.ts (行 326)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 300) 与 utils\unifiedErrorManager.ts (行 327)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 330) 与 utils\unifiedErrorManager.ts (行 331)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 293) 与 utils\unifiedErrorManager.ts (行 332)
  - 相似度: 100.0%

- utils\errorMonitoringAndReporting.ts (行 293) 与 utils\unifiedErrorManager.ts (行 333)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 287) 与 utils\unifiedErrorManager.ts (行 379)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 281) 与 utils\unifiedErrorManager.ts (行 391)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 317) 与 utils\unifiedErrorManager.ts (行 427)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 318) 与 utils\unifiedErrorManager.ts (行 428)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 319) 与 utils\unifiedErrorManager.ts (行 429)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 320) 与 utils\unifiedErrorManager.ts (行 430)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 333) 与 utils\unifiedErrorManager.ts (行 446)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 334) 与 utils\unifiedErrorManager.ts (行 447)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 335) 与 utils\unifiedErrorManager.ts (行 448)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 336) 与 utils\unifiedErrorManager.ts (行 449)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 352) 与 utils\unifiedErrorManager.ts (行 469)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 353) 与 utils\unifiedErrorManager.ts (行 470)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 267) 与 utils\unifiedErrorManager.ts (行 608)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 427) 与 utils\unifiedErrorManager.ts (行 624)
  - 相似度: 100.0%

- utils\improvedErrorSystem.ts (行 428) 与 utils\unifiedErrorManager.ts (行 625)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 658) 与 utils\unifiedErrorManager.ts (行 634)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 497) 与 utils\unifiedErrorManager.ts (行 641)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 498) 与 utils\unifiedErrorManager.ts (行 642)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 499) 与 utils\unifiedErrorManager.ts (行 643)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 500) 与 utils\unifiedErrorManager.ts (行 644)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 501) 与 utils\unifiedErrorManager.ts (行 645)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 502) 与 utils\unifiedErrorManager.ts (行 646)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 503) 与 utils\unifiedErrorManager.ts (行 647)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 504) 与 utils\unifiedErrorManager.ts (行 648)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 505) 与 utils\unifiedErrorManager.ts (行 649)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 506) 与 utils\unifiedErrorManager.ts (行 650)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 507) 与 utils\unifiedErrorManager.ts (行 651)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 508) 与 utils\unifiedErrorManager.ts (行 652)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 509) 与 utils\unifiedErrorManager.ts (行 653)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1061) 与 utils\unifiedErrorManager.ts (行 672)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1062) 与 utils\unifiedErrorManager.ts (行 673)
  - 相似度: 100.0%

- services\ErrorHandlingService.ts (行 911) 与 utils\unifiedErrorManager.ts (行 675)
  - 相似度: 100.0%

- services\ErrorMonitoringService.ts (行 1065) 与 utils\unifiedErrorManager.ts (行 676)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 539) 与 utils\unifiedErrorManager.ts (行 695)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 539) 与 utils\unifiedErrorManager.ts (行 696)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 553) 与 utils\unifiedErrorManager.ts (行 705)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 553) 与 utils\unifiedErrorManager.ts (行 706)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 758) 与 utils\unifiedErrorManager.ts (行 759)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 27) 与 utils\unifiedErrorSystem.ts (行 81)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 28) 与 utils\unifiedErrorSystem.ts (行 82)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 29) 与 utils\unifiedErrorSystem.ts (行 83)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 66) 与 utils\unifiedErrorSystem.ts (行 86)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 67) 与 utils\unifiedErrorSystem.ts (行 87)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 35) 与 utils\unifiedErrorSystem.ts (行 91)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 36) 与 utils\unifiedErrorSystem.ts (行 92)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 37) 与 utils\unifiedErrorSystem.ts (行 93)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 38) 与 utils\unifiedErrorSystem.ts (行 94)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 39) 与 utils\unifiedErrorSystem.ts (行 95)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 38) 与 utils\unifiedErrorSystem.ts (行 143)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 102) 与 utils\unifiedErrorSystem.ts (行 149)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 103) 与 utils\unifiedErrorSystem.ts (行 150)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 104) 与 utils\unifiedErrorSystem.ts (行 151)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 40) 与 utils\unifiedErrorSystem.ts (行 161)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 200) 与 utils\unifiedErrorSystem.ts (行 278)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 201) 与 utils\unifiedErrorSystem.ts (行 279)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 202) 与 utils\unifiedErrorSystem.ts (行 280)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 203) 与 utils\unifiedErrorSystem.ts (行 281)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 204) 与 utils\unifiedErrorSystem.ts (行 282)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 205) 与 utils\unifiedErrorSystem.ts (行 283)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 206) 与 utils\unifiedErrorSystem.ts (行 284)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 207) 与 utils\unifiedErrorSystem.ts (行 285)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 208) 与 utils\unifiedErrorSystem.ts (行 286)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 209) 与 utils\unifiedErrorSystem.ts (行 287)
  - 相似度: 100.0%

- utils\masterErrorHandler.ts (行 210) 与 utils\unifiedErrorSystem.ts (行 288)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 293) 与 utils\unifiedErrorSystem.ts (行 294)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 296) 与 utils\unifiedErrorSystem.ts (行 297)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 322) 与 utils\unifiedErrorSystem.ts (行 323)
  - 相似度: 100.0%

- utils\unifiedErrorManager.ts (行 215) 与 utils\unifiedErrorSystem.ts (行 343)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 156) 与 utils\unifiedErrorSystem.ts (行 344)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 166) 与 utils\unifiedErrorSystem.ts (行 354)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 177) 与 utils\unifiedErrorSystem.ts (行 374)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 178) 与 utils\unifiedErrorSystem.ts (行 375)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 179) 与 utils\unifiedErrorSystem.ts (行 376)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 189) 与 utils\unifiedErrorSystem.ts (行 386)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 177) 与 utils\unifiedErrorSystem.ts (行 397)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 295) 与 utils\unifiedErrorSystem.ts (行 437)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 317) 与 utils\unifiedErrorSystem.ts (行 462)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 333) 与 utils\unifiedErrorSystem.ts (行 481)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 549) 与 utils\unifiedErrorSystem.ts (行 550)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 369) 与 utils\unifiedErrorSystem.ts (行 562)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 583) 与 utils\unifiedErrorSystem.ts (行 584)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 607) 与 utils\unifiedErrorSystem.ts (行 608)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 625) 与 utils\unifiedErrorSystem.ts (行 626)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 631) 与 utils\unifiedErrorSystem.ts (行 632)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 646) 与 utils\unifiedErrorSystem.ts (行 647)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 435) 与 utils\unifiedErrorSystem.ts (行 843)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 452) 与 utils\unifiedErrorSystem.ts (行 865)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 489) 与 utils\unifiedErrorSystem.ts (行 899)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 497) 与 utils\unifiedErrorSystem.ts (行 908)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 498) 与 utils\unifiedErrorSystem.ts (行 909)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 499) 与 utils\unifiedErrorSystem.ts (行 910)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 500) 与 utils\unifiedErrorSystem.ts (行 911)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 501) 与 utils\unifiedErrorSystem.ts (行 912)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 502) 与 utils\unifiedErrorSystem.ts (行 913)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 503) 与 utils\unifiedErrorSystem.ts (行 914)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 504) 与 utils\unifiedErrorSystem.ts (行 915)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 505) 与 utils\unifiedErrorSystem.ts (行 916)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 506) 与 utils\unifiedErrorSystem.ts (行 917)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 507) 与 utils\unifiedErrorSystem.ts (行 918)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 508) 与 utils\unifiedErrorSystem.ts (行 919)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 509) 与 utils\unifiedErrorSystem.ts (行 920)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 510) 与 utils\unifiedErrorSystem.ts (行 921)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 511) 与 utils\unifiedErrorSystem.ts (行 922)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 930) 与 utils\unifiedErrorSystem.ts (行 931)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 942) 与 utils\unifiedErrorSystem.ts (行 943)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 524) 与 utils\unifiedErrorSystem.ts (行 963)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 526) 与 utils\unifiedErrorSystem.ts (行 965)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 527) 与 utils\unifiedErrorSystem.ts (行 966)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 1129) 与 utils\unifiedErrorSystem.ts (行 1130)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 612) 与 utils\unifiedErrorSystem.ts (行 1167)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 613) 与 utils\unifiedErrorSystem.ts (行 1168)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 614) 与 utils\unifiedErrorSystem.ts (行 1169)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 615) 与 utils\unifiedErrorSystem.ts (行 1170)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 616) 与 utils\unifiedErrorSystem.ts (行 1171)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 617) 与 utils\unifiedErrorSystem.ts (行 1172)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 618) 与 utils\unifiedErrorSystem.ts (行 1173)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 619) 与 utils\unifiedErrorSystem.ts (行 1174)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 620) 与 utils\unifiedErrorSystem.ts (行 1175)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 621) 与 utils\unifiedErrorSystem.ts (行 1176)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 622) 与 utils\unifiedErrorSystem.ts (行 1177)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 623) 与 utils\unifiedErrorSystem.ts (行 1178)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 671) 与 utils\unifiedErrorSystem.ts (行 1261)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 672) 与 utils\unifiedErrorSystem.ts (行 1262)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 673) 与 utils\unifiedErrorSystem.ts (行 1263)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 674) 与 utils\unifiedErrorSystem.ts (行 1264)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 675) 与 utils\unifiedErrorSystem.ts (行 1265)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 676) 与 utils\unifiedErrorSystem.ts (行 1266)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 677) 与 utils\unifiedErrorSystem.ts (行 1267)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 678) 与 utils\unifiedErrorSystem.ts (行 1268)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 679) 与 utils\unifiedErrorSystem.ts (行 1269)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 680) 与 utils\unifiedErrorSystem.ts (行 1270)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 684) 与 utils\unifiedErrorSystem.ts (行 1274)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 685) 与 utils\unifiedErrorSystem.ts (行 1275)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 686) 与 utils\unifiedErrorSystem.ts (行 1276)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 687) 与 utils\unifiedErrorSystem.ts (行 1277)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 688) 与 utils\unifiedErrorSystem.ts (行 1278)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 689) 与 utils\unifiedErrorSystem.ts (行 1279)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 690) 与 utils\unifiedErrorSystem.ts (行 1280)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 691) 与 utils\unifiedErrorSystem.ts (行 1281)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 1362) 与 utils\unifiedErrorSystem.ts (行 1363)
  - 相似度: 100.0%

- utils\unifiedErrorSystem.ts (行 1365) 与 utils\unifiedErrorSystem.ts (行 1366)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 746) 与 utils\unifiedErrorSystem.ts (行 1373)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 759) 与 utils\unifiedErrorSystem.ts (行 1386)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 760) 与 utils\unifiedErrorSystem.ts (行 1387)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 761) 与 utils\unifiedErrorSystem.ts (行 1388)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 762) 与 utils\unifiedErrorSystem.ts (行 1389)
  - 相似度: 100.0%

- utils\unifiedErrorHandler.ts (行 770) 与 utils\unifiedErrorSystem.ts (行 1400)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 278) 与 utils\unifiedPermissionManager.ts (行 279)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 296) 与 utils\unifiedPermissionManager.ts (行 297)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 302) 与 utils\unifiedPermissionManager.ts (行 303)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 308) 与 utils\unifiedPermissionManager.ts (行 309)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 314) 与 utils\unifiedPermissionManager.ts (行 315)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 320) 与 utils\unifiedPermissionManager.ts (行 321)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 326) 与 utils\unifiedPermissionManager.ts (行 327)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 444) 与 utils\unifiedPermissionManager.ts (行 329)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 445) 与 utils\unifiedPermissionManager.ts (行 330)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 449) 与 utils\unifiedPermissionManager.ts (行 345)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 435) 与 utils\unifiedPermissionManager.ts (行 436)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 441) 与 utils\unifiedPermissionManager.ts (行 442)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 467) 与 utils\unifiedPermissionManager.ts (行 468)
  - 相似度: 100.0%

- utils\enhancedPermissionSystem.ts (行 998) 与 utils\unifiedPermissionManager.ts (行 470)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 489) 与 utils\unifiedPermissionManager.ts (行 490)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 495) 与 utils\unifiedPermissionManager.ts (行 496)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 444) 与 utils\unifiedPermissionManager.ts (行 498)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 465) 与 utils\unifiedPermissionManager.ts (行 518)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 466) 与 utils\unifiedPermissionManager.ts (行 519)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 467) 与 utils\unifiedPermissionManager.ts (行 520)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 467) 与 utils\unifiedPermissionManager.ts (行 521)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 469) 与 utils\unifiedPermissionManager.ts (行 522)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 537) 与 utils\unifiedPermissionManager.ts (行 538)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 543) 与 utils\unifiedPermissionManager.ts (行 544)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 588) 与 utils\unifiedPermissionManager.ts (行 589)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 826) 与 utils\unifiedPermissionManager.ts (行 601)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 827) 与 utils\unifiedPermissionManager.ts (行 602)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 425) 与 utils\unifiedPermissionManager.ts (行 611)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 689) 与 utils\unifiedPermissionManager.ts (行 641)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 690) 与 utils\unifiedPermissionManager.ts (行 642)
  - 相似度: 100.0%

- middleware\permissionMiddleware.ts (行 691) 与 utils\unifiedPermissionManager.ts (行 643)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 395) 与 utils\unifiedPermissionManager.ts (行 748)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 259) 与 utils\unifiedPermissionManager.ts (行 782)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 395) 与 utils\unifiedPermissionManager.ts (行 792)
  - 相似度: 100.0%

- utils\patterns\index.ts (行 263) 与 utils\unifiedPermissionManager.ts (行 811)
  - 相似度: 100.0%

- utils\patterns\factory.ts (行 259) 与 utils\unifiedPermissionManager.ts (行 812)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 823) 与 utils\unifiedPermissionManager.ts (行 824)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 826) 与 utils\unifiedPermissionManager.ts (行 827)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 829) 与 utils\unifiedPermissionManager.ts (行 830)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 832) 与 utils\unifiedPermissionManager.ts (行 833)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 930) 与 utils\unifiedPermissionManager.ts (行 931)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 932) 与 utils\unifiedPermissionManager.ts (行 933)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1126) 与 utils\unifiedPermissionManager.ts (行 948)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1127) 与 utils\unifiedPermissionManager.ts (行 949)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1128) 与 utils\unifiedPermissionManager.ts (行 950)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1132) 与 utils\unifiedPermissionManager.ts (行 958)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1133) 与 utils\unifiedPermissionManager.ts (行 959)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1134) 与 utils\unifiedPermissionManager.ts (行 960)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1135) 与 utils\unifiedPermissionManager.ts (行 961)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1136) 与 utils\unifiedPermissionManager.ts (行 962)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1137) 与 utils\unifiedPermissionManager.ts (行 963)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1138) 与 utils\unifiedPermissionManager.ts (行 964)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1138) 与 utils\unifiedPermissionManager.ts (行 965)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 970) 与 utils\unifiedPermissionManager.ts (行 971)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 987) 与 utils\unifiedPermissionManager.ts (行 988)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 998) 与 utils\unifiedPermissionManager.ts (行 999)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 1011) 与 utils\unifiedPermissionManager.ts (行 1012)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 1132) 与 utils\unifiedPermissionManager.ts (行 1133)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1285) 与 utils\unifiedPermissionManager.ts (行 1137)
  - 相似度: 100.0%

- utils\advancedRBACSystem.ts (行 1286) 与 utils\unifiedPermissionManager.ts (行 1138)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1077) 与 utils\unifiedPermissionManager.ts (行 1163)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1078) 与 utils\unifiedPermissionManager.ts (行 1164)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1079) 与 utils\unifiedPermissionManager.ts (行 1165)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 1168) 与 utils\unifiedPermissionManager.ts (行 1169)
  - 相似度: 100.0%

- utils\unifiedPermissionManager.ts (行 1178) 与 utils\unifiedPermissionManager.ts (行 1179)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1096) 与 utils\unifiedPermissionManager.ts (行 1208)
  - 相似度: 100.0%

- utils\inputValidationManager.ts (行 1103) 与 utils\unifiedPermissionManager.ts (行 1215)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 31) 与 utils\userNotificationSystem.ts (行 47)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 79) 与 utils\userNotificationSystem.ts (行 91)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 82) 与 utils\userNotificationSystem.ts (行 94)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 83) 与 utils\userNotificationSystem.ts (行 95)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 272) 与 utils\userNotificationSystem.ts (行 273)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 325) 与 utils\userNotificationSystem.ts (行 326)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 328) 与 utils\userNotificationSystem.ts (行 329)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 381) 与 utils\userNotificationSystem.ts (行 395)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 382) 与 utils\userNotificationSystem.ts (行 396)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 381) 与 utils\userNotificationSystem.ts (行 423)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 382) 与 utils\userNotificationSystem.ts (行 424)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 189) 与 utils\userNotificationSystem.ts (行 451)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 190) 与 utils\userNotificationSystem.ts (行 452)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 191) 与 utils\userNotificationSystem.ts (行 453)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 192) 与 utils\userNotificationSystem.ts (行 454)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 193) 与 utils\userNotificationSystem.ts (行 455)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 194) 与 utils\userNotificationSystem.ts (行 456)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 195) 与 utils\userNotificationSystem.ts (行 457)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 196) 与 utils\userNotificationSystem.ts (行 458)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 197) 与 utils\userNotificationSystem.ts (行 459)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 198) 与 utils\userNotificationSystem.ts (行 460)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 199) 与 utils\userNotificationSystem.ts (行 461)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 200) 与 utils\userNotificationSystem.ts (行 462)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 201) 与 utils\userNotificationSystem.ts (行 463)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 505) 与 utils\userNotificationSystem.ts (行 506)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 508) 与 utils\userNotificationSystem.ts (行 509)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 649) 与 utils\userNotificationSystem.ts (行 650)
  - 相似度: 100.0%

- utils\userNotificationSystem.ts (行 730) 与 utils\userNotificationSystem.ts (行 731)
  - 相似度: 100.0%

- services\ValidationService.ts (行 697) 与 utils\userNotificationSystem.ts (行 732)
  - 相似度: 100.0%

- utils\enhancedUserNotificationSystem.ts (行 872) 与 utils\userNotificationSystem.ts (行 862)
  - 相似度: 100.0%

- utils\automatedSecurityChecker.ts (行 1332) 与 utils\userNotificationSystem.ts (行 867)
  - 相似度: 100.0%

- utils\votingSystemHelpers.ts (行 149) 与 utils\votingSystemHelpers.ts (行 177)
  - 相似度: 100.0%

- utils\votingSystemHelpers.ts (行 159) 与 utils\votingSystemHelpers.ts (行 187)
  - 相似度: 100.0%

- utils\votingSystemHelpers.ts (行 208) 与 utils\votingSystemHelpers.ts (行 209)
  - 相似度: 100.0%


## 建议

### 高优先级
1. 修复所有高严重程度的代码异味
2. 重构重复代码，提取公共函数或组件
3. 拆分过长的函数和类

### 中优先级
1. 减少代码嵌套深度
2. 优化函数参数列表
3. 增加代码注释覆盖率

### 低优先级
1. 统一代码风格
2. 优化导入导出结构
3. 提升整体可维护性指数

---

*报告由代码质量分析工具自动生成*