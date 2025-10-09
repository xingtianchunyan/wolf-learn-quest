# 自动重构报告

## 概述

**执行时间**: 2025/10/9 01:53:20
**模式**: 试运行
**修改文件数**: 569

## 规则执行摘要

- **removeUnusedImports**: 12 个文件

- **extractConstants**: 200 个文件

- **simplifyConditionals**: 16 个文件

- **removeDeadCode**: 65 个文件

- **optimizeLoops**: 7 个文件

- **extractFunctions**: 236 个文件

- **addTypeAnnotations**: 33 个文件

## 详细变更

### App.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### components\game\panels\VotingSystemManager.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -2

---

### components\ui\command.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -2

---

### components\ui\drawer.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### components\ui\toggle-group.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### hooks\useEnhancedSkillSystem.ts

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### pages\GameLobby.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -3

---

### pages\GamePage.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -2

---

### pages\Index.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### pages\JudgePage.tsx

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### services\enhancedSkillService.ts

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### utils\skillSystemValidation.ts

**规则**: removeUnusedImports
**变更**: 行数变化: -1

---

### components\admin\MonitoringDashboard.tsx

**规则**: extractConstants
**变更**: 行数变化: -6

---

### components\admin\PerformanceDashboard.tsx

**规则**: extractConstants
**变更**: 行数变化: -2

---

### components\admin\SkillSystemMonitor.tsx

**规则**: extractConstants
**变更**: 行数变化: +2

---

### components\chat\ChatMessage.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\chat\MultiChannelChat.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\common\hoc\withErrorBoundary.tsx

**规则**: extractConstants
**变更**: 行数变化: +7

---

### components\common\hoc\withLoading.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\common\hoc\withPermission.tsx

**规则**: extractConstants
**变更**: 行数变化: +6

---

### components\core\PlayerAvatar.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\core\StatusBadge.tsx

**规则**: extractConstants
**变更**: 行数变化: -3

---

### components\dialogs\GameRulesDialog.tsx

**规则**: extractConstants
**变更**: 行数变化: -12

---

### components\dialogs\LoginDialog.tsx

**规则**: extractConstants
**变更**: 行数变化: -15

---

### components\error\ErrorBoundary.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\error\ErrorDisplayComponent.tsx

**规则**: extractConstants
**变更**: 行数变化: 0

---

### components\ErrorBoundary.tsx

**规则**: extractConstants
**变更**: 行数变化: 0

---

### components\game\accessibility\AccessibilityEnhancement.tsx

**规则**: extractConstants
**变更**: 行数变化: -13

---

### components\game\displays\GamePlayerStatusDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\game\displays\GameStateDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +9

---

### components\game\displays\RoleSkillInfo.tsx

**规则**: extractConstants
**变更**: 行数变化: -3

---

### components\game\displays\SkillEffectsDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\game\feedback\OperationFeedback.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\game\index.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\game\interfaces\EnhancedSkillManager.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\game\interfaces\GuardProtectionInterface.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\game\interfaces\NightSkillInterface.tsx

**规则**: extractConstants
**变更**: 行数变化: +8

---

### components\game\interfaces\RoleSpecificSkills.tsx

**规则**: extractConstants
**变更**: 行数变化: +11

---

### components\game\interfaces\SkillConflictResolver.tsx

**规则**: extractConstants
**变更**: 行数变化: +7

---

### components\game\interfaces\UnifiedWitchSkillInterface.tsx

**规则**: extractConstants
**变更**: 行数变化: +9

---

### components\game\interfaces\WolfKillInterface.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\game\optimized\AdvancedSkillAnalytics.tsx

**规则**: extractConstants
**变更**: 行数变化: +2

---

### components\game\optimized\OptimizedEnhancedSkillPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: -1

---

### components\game\optimized\PerformanceMonitor.tsx

**规则**: extractConstants
**变更**: 行数变化: -10

---

### components\game\optimized\SkillEffectsVirtualList.tsx

**规则**: extractConstants
**变更**: 行数变化: +8

---

### components\game\panels\EnhancedSkillPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: -1

---

### components\game\panels\GameInfoPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: -2

---

### components\game\panels\GameSettingsPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: -5

---

### components\game\panels\GameSkillPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\game\panels\PlayerStatusManager.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\game\panels\RoleStatusPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +6

---

### components\game\panels\SkillSystemManager.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\game\panels\SkillUsePanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\game\panels\StudentAnswerRecordPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +6

---

### components\game\panels\StudentSystemPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +2

---

### components\game\panels\VotingSystemManager.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\game\skill\SkillConflictVisualization.tsx

**规则**: extractConstants
**变更**: 行数变化: +6

---

### components\game\smart-hints\SmartHintSystem.tsx

**规则**: extractConstants
**变更**: 行数变化: -20

---

### components\game\student\StudentPreviousQuestionDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\game\student\StudentQuestionDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +8

---

### components\game\student\StudentTimerDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\judge\management\AnswerRecordPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +6

---

### components\judge\management\JudgeActionPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\judge\management\ManualQuestionEditor.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\judge\management\PlayerStatusPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +7

---

### components\judge\management\PreparationPhaseDialog.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\judge\management\QuestionBankDialog.tsx

**规则**: extractConstants
**变更**: 行数变化: -1

---

### components\judge\management\QuestionBankPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: -3

---

### components\judge\management\QuestionBankTooltip.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\judge\management\QuestionOrderEditor.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\judge\management\QuestionPreview.tsx

**规则**: extractConstants
**变更**: 行数变化: +8

---

### components\judge\management\QuestionSourceList.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\judge\management\TeacherSystemPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\judge\monitoring\DyingStatusResolutionPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +7

---

### components\judge\monitoring\EnhancedGameStateDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +1

---

### components\judge\monitoring\PlayerStatusDisplay.tsx

**规则**: extractConstants
**变更**: 行数变化: +7

---

### components\judge\monitoring\SkillSystemDashboard.tsx

**规则**: extractConstants
**变更**: 行数变化: +6

---

### components\layout\LanguageSwitcher.tsx

**规则**: extractConstants
**变更**: 行数变化: +9

---

### components\layout\Navbar.tsx

**规则**: extractConstants
**变更**: 行数变化: -4

---

### components\lobby\AvatarUpload.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\lobby\ExperienceTooltip.tsx

**规则**: extractConstants
**变更**: 行数变化: +1

---

### components\lobby\PlayerInfoPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +6

---

### components\lobby\PlayerStats.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\lobby\RoomListTable.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\room\PlayersList.tsx

**规则**: extractConstants
**变更**: 行数变化: +7

---

### components\room\RoleSelection.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\room\RoomInfoCard.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\ui\alert-dialog.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\badge.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\breadcrumb.tsx

**规则**: extractConstants
**变更**: 行数变化: +2

---

### components\ui\button.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\calendar.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\carousel.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\ui\chart.tsx

**规则**: extractConstants
**变更**: 行数变化: +2

---

### components\ui\command.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\context-menu.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\dialog.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\dropdown-menu.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\input-otp.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\ui\menubar.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\navigation-menu.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\ui\pagination.tsx

**规则**: extractConstants
**变更**: 行数变化: +2

---

### components\ui\scroll-area.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### components\ui\select.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\ui\sidebar.tsx

**规则**: extractConstants
**变更**: 行数变化: -24

---

### components\ui\skill-progress-indicator.tsx

**规则**: extractConstants
**变更**: 行数变化: -7

---

### components\ui\toast.tsx

**规则**: extractConstants
**变更**: 行数变化: +4

---

### components\voting\EnhancedVotingManager.tsx

**规则**: extractConstants
**变更**: 行数变化: +5

---

### components\voting\VotingPanel.tsx

**规则**: extractConstants
**变更**: 行数变化: +13

---

### config\performance.config.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### config\security.config.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### contexts\JudgePageContext.tsx

**规则**: extractConstants
**变更**: 行数变化: +1

---

### contexts\PermissionContext.tsx

**规则**: extractConstants
**变更**: 行数变化: +2

---

### hooks\skill\useSkillData.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### hooks\skill\useSkillRealtime.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### hooks\skill\useSkillStats.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### hooks\useAutoDyingStatusProcessor.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### hooks\useAutoProcessDayVote.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### hooks\useDyingStatusManager.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### hooks\useEnhancedErrorHandler.ts

**规则**: extractConstants
**变更**: 行数变化: -3

---

### hooks\useEnhancedSkillSystem.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### hooks\useErrorHandler.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### hooks\useGameState.ts

**规则**: extractConstants
**变更**: 行数变化: -1

---

### hooks\useMemoryManager.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### hooks\usePerformanceMonitoring.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### hooks\usePermissions.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### hooks\usePlayerPresence.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### hooks\usePlayerRoom.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### hooks\usePlayersRealtime.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### hooks\useRoleSelection.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### hooks\useRoomTransition.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### hooks\useToast.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### hooks\useUXOptimization.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### hooks\useVoteResults.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### hooks\useVotingSystem.ts

**规则**: extractConstants
**变更**: 行数变化: -27

---

### hooks\useWitchPotionManager.ts

**规则**: extractConstants
**变更**: 行数变化: -4

---

### integrations\supabase\types.ts

**规则**: extractConstants
**变更**: 行数变化: -67

---

### lib\debugUtils.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### lib\performanceReporter.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### middleware\apiSecurityMiddleware.ts

**规则**: extractConstants
**变更**: 行数变化: -10

---

### middleware\permissionMiddleware.ts

**规则**: extractConstants
**变更**: 行数变化: +7

---

### pages\GameLobby.tsx

**规则**: extractConstants
**变更**: 行数变化: -37

---

### pages\GamePage.tsx

**规则**: extractConstants
**变更**: 行数变化: -1

---

### pages\GameRoom.tsx

**规则**: extractConstants
**变更**: 行数变化: -27

---

### pages\Index.tsx

**规则**: extractConstants
**变更**: 行数变化: +3

---

### pages\JudgePage.tsx

**规则**: extractConstants
**变更**: 行数变化: +1

---

### services\analyticsService.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### services\automatedSecurityService.ts

**规则**: extractConstants
**变更**: 行数变化: -7

---

### services\cacheService.ts

**规则**: extractConstants
**变更**: 行数变化: +7

---

### services\configurationService.ts

**规则**: extractConstants
**变更**: 行数变化: -64

---

### services\dyingStatusService.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### services\enhancedSkillService.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### services\errorHandlingService.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### services\errorMonitoringService.ts

**规则**: extractConstants
**变更**: 行数变化: -13

---

### services\index.ts

**规则**: extractConstants
**变更**: 行数变化: -5

---

### services\monitoringService.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### services\passiveSkillService.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### services\performanceMonitoringService.ts

**规则**: extractConstants
**变更**: 行数变化: -16

---

### services\roomService.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### services\securityAuditService.ts

**规则**: extractConstants
**变更**: 行数变化: +6

---

### services\skillSystemService.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### types\skillSystem.types.ts

**规则**: extractConstants
**变更**: 行数变化: -11

---

### utils\advancedInputValidationSystem.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### utils\advancedRBACSystem.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### utils\apiSecurityConfig.ts

**规则**: extractConstants
**变更**: 行数变化: -8

---

### utils\automatedSecurityChecker.ts

**规则**: extractConstants
**变更**: 行数变化: -6

---

### utils\common\dataValidation.ts

**规则**: extractConstants
**变更**: 行数变化: -3

---

### utils\common\errorHandling.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### utils\comprehensiveSecurityAudit.ts

**规则**: extractConstants
**变更**: 行数变化: -130

---

### utils\enhancedInputValidation.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### utils\enhancedPermissionSystem.ts

**规则**: extractConstants
**变更**: 行数变化: -8

---

### utils\enhancedQueryCacheStrategy.ts

**规则**: extractConstants
**变更**: 行数变化: +8

---

### utils\enhancedRealtimeManager.ts

**规则**: extractConstants
**变更**: 行数变化: +8

---

### utils\enhancedUserErrorInterface.ts

**规则**: extractConstants
**变更**: 行数变化: -82

---

### utils\enhancedUserNotificationSystem.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### utils\errorClassifier.ts

**规则**: extractConstants
**变更**: 行数变化: -22

---

### utils\errorHandlingExamples.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### utils\errorMonitoringAndReporting.ts

**规则**: extractConstants
**变更**: 行数变化: +6

---

### utils\globalErrorMonitor.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### utils\inputValidationManager.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### utils\intelligentCacheStrategy.ts

**规则**: extractConstants
**变更**: 行数变化: +9

---

### utils\masterErrorHandler.ts

**规则**: extractConstants
**变更**: 行数变化: -6

---

### utils\memoryLeakPrevention.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### utils\memoryManagementSystem.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### utils\optimizedQueryCache.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### utils\patterns\factory.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### utils\patterns\strategy.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### utils\performanceCriticalFixes.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### utils\phaseUtils.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### utils\queryCacheOptimizer.ts

**规则**: extractConstants
**变更**: 行数变化: +1

---

### utils\realtimeSubscriptionManager.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### utils\roleConfiguration.ts

**规则**: extractConstants
**变更**: 行数变化: -35

---

### utils\roleStateHelpers.ts

**规则**: extractConstants
**变更**: 行数变化: -8

---

### utils\securityEnhancement.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### utils\skillBatchProcessor.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### utils\skillCache.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### utils\skillDataStandardizer.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### utils\skillEffectsManager.ts

**规则**: extractConstants
**变更**: 行数变化: -7

---

### utils\skillErrorHandler.ts

**规则**: extractConstants
**变更**: 行数变化: -1

---

### utils\skillMappingConfig.ts

**规则**: extractConstants
**变更**: 行数变化: -46

---

### utils\skillSystemCache.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### utils\skillSystemHelpers.ts

**规则**: extractConstants
**变更**: 行数变化: +3

---

### utils\skillSystemValidation.ts

**规则**: extractConstants
**变更**: 行数变化: -37

---

### utils\skillUsageRestrictions.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### utils\skillValidationRules.ts

**规则**: extractConstants
**变更**: 行数变化: -26

---

### utils\unifiedCacheManager.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### utils\unifiedErrorHandler.ts

**规则**: extractConstants
**变更**: 行数变化: +2

---

### utils\unifiedErrorManager.ts

**规则**: extractConstants
**变更**: 行数变化: +5

---

### utils\unifiedErrorSystem.ts

**规则**: extractConstants
**变更**: 行数变化: -6

---

### utils\unifiedPermissionManager.ts

**规则**: extractConstants
**变更**: 行数变化: +4

---

### utils\userNotificationSystem.ts

**规则**: extractConstants
**变更**: 行数变化: 0

---

### utils\votingSystemHelpers.ts

**规则**: extractConstants
**变更**: 行数变化: -5

---

### components\error\ErrorBoundary.tsx

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### components\game\interfaces\RoleSpecificSkills.tsx

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### middleware\apiSecurityMiddleware.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\apiSecurityConfig.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\enhancedInputValidation.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\enhancedUserNotificationSystem.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\improvedErrorSystem.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\intelligentCacheStrategy.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\masterErrorHandler.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\optimizedQueryCache.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\roleStateHelpers.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\unifiedErrorHandler.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\unifiedErrorManager.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\unifiedErrorSystem.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\userNotificationSystem.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### utils\votingSystemHelpers.ts

**规则**: simplifyConditionals
**变更**: 行数变化: 0

---

### components\chat\ChatChannelSelector.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\chat\ChatMessage.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\ErrorBoundary.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\displays\GameStateDisplay.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\displays\RoleSkillInfo.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\displays\SkillEffectsDisplay.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\interfaces\NightSkillInterface.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\panels\GameSettingsPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\panels\GameSkillPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\panels\RoleStatusPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\panels\SkillSystemManager.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\panels\StudentAnswerRecordPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\student\StudentPreviousQuestionDisplay.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\student\StudentQuestionDisplay.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\student\StudentQuestionNotFound.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\student\StudentTimerDisplay.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\home\FeatureCard.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\management\JudgeActionPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -2

---

### components\judge\management\ManualQuestionEditor.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\management\PlayerStatusPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\management\QuestionBankDialog.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -5

---

### components\judge\management\QuestionBankPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -28

---

### components\judge\management\QuestionBankTooltip.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\management\QuestionOrderEditor.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\management\QuestionPreview.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\management\QuestionSourceList.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\management\TeacherSystemPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\judge\monitoring\EnhancedGameStateDisplay.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\layout\Footer.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\layout\LanguageSwitcher.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\layout\PageLayout.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\lobby\AvatarUpload.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\lobby\LobbyActionButtons.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\lobby\PlayerInfo.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\lobby\PlayerInfoPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\lobby\RoomListTable.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\room\PlayersList.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\room\RoleSelection.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\room\RoomInfoCard.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -2

---

### components\ui\switch.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\voting\EnhancedVotingManager.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\voting\VotingPanel.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -6

---

### hooks\useAutoProcessDayVote.ts

**规则**: removeDeadCode
**变更**: 行数变化: -3

---

### hooks\useGameState.ts

**规则**: removeDeadCode
**变更**: 行数变化: -4

---

### hooks\useMultiChannelChat.ts

**规则**: removeDeadCode
**变更**: 行数变化: -9

---

### hooks\usePlayerPresence.ts

**规则**: removeDeadCode
**变更**: 行数变化: -17

---

### hooks\usePlayersRealtime.ts

**规则**: removeDeadCode
**变更**: 行数变化: -12

---

### hooks\useRoleSelection.ts

**规则**: removeDeadCode
**变更**: 行数变化: -3

---

### hooks\useRoomChat.ts

**规则**: removeDeadCode
**变更**: 行数变化: -2

---

### hooks\useRoomRealtime.ts

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### hooks\useVotingSystem.ts

**规则**: removeDeadCode
**变更**: 行数变化: -22

---

### lib\debugUtils.ts

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### pages\GameLobby.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -34

---

### pages\GameRoom.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -17

---

### pages\JudgePage.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### providers\AuthProvider.tsx

**规则**: removeDeadCode
**变更**: 行数变化: -5

---

### services\enhancedSkillService.ts

**规则**: removeDeadCode
**变更**: 行数变化: -3

---

### services\index.ts

**规则**: removeDeadCode
**变更**: 行数变化: -2

---

### services\votingService.ts

**规则**: removeDeadCode
**变更**: 行数变化: -10

---

### utils\apiSecurityConfig.ts

**规则**: removeDeadCode
**变更**: 行数变化: -6

---

### utils\enhancedUserErrorInterface.ts

**规则**: removeDeadCode
**变更**: 行数变化: 0

---

### utils\errorHandlingExamples.ts

**规则**: removeDeadCode
**变更**: 行数变化: 0

---

### utils\errorMonitoringAndReporting.ts

**规则**: removeDeadCode
**变更**: 行数变化: -5

---

### utils\globalErrorMonitor.ts

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### utils\skillEffectsManager.ts

**规则**: removeDeadCode
**变更**: 行数变化: -1

---

### components\game\optimized\SkillEffectsVirtualList.tsx

**规则**: optimizeLoops
**变更**: 行数变化: 0

---

### services\enhancedSkillService.ts

**规则**: optimizeLoops
**变更**: 行数变化: 0

---

### services\passiveSkillService.ts

**规则**: optimizeLoops
**变更**: 行数变化: 0

---

### utils\common\skillValidation.ts

**规则**: optimizeLoops
**变更**: 行数变化: 0

---

### utils\componentRenderOptimizer.ts

**规则**: optimizeLoops
**变更**: 行数变化: 0

---

### utils\enhancedInputValidation.ts

**规则**: optimizeLoops
**变更**: 行数变化: 0

---

### utils\skillMappingConfig.ts

**规则**: optimizeLoops
**变更**: 行数变化: 0

---

### components\admin\MonitoringDashboard.tsx

**规则**: extractFunctions
**变更**: 行数变化: +24

---

### components\admin\PerformanceDashboard.tsx

**规则**: extractFunctions
**变更**: 行数变化: +85

---

### components\admin\SkillSystemMonitor.tsx

**规则**: extractFunctions
**变更**: 行数变化: +39

---

### components\chat\ChatMessage.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\chat\MultiChannelChat.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\common\hoc\withErrorBoundary.tsx

**规则**: extractFunctions
**变更**: 行数变化: +44

---

### components\common\hoc\withLoading.tsx

**规则**: extractFunctions
**变更**: 行数变化: +78

---

### components\common\hoc\withPermission.tsx

**规则**: extractFunctions
**变更**: 行数变化: +60

---

### components\core\BaseCard.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\core\LoadingSpinner.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\core\PlayerAvatar.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\core\StatusBadge.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\dialogs\GameRulesDialog.tsx

**规则**: extractFunctions
**变更**: 行数变化: +56

---

### components\dialogs\LoginDialog.tsx

**规则**: extractFunctions
**变更**: 行数变化: +224

---

### components\error\ErrorBoundary.tsx

**规则**: extractFunctions
**变更**: 行数变化: +78

---

### components\error\ErrorDisplayComponent.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\game\accessibility\AccessibilityEnhancement.tsx

**规则**: extractFunctions
**变更**: 行数变化: +78

---

### components\game\displays\GamePlayerStatusDisplay.tsx

**规则**: extractFunctions
**变更**: 行数变化: +75

---

### components\game\displays\GameStateDisplay.tsx

**规则**: extractFunctions
**变更**: 行数变化: +24

---

### components\game\displays\RoleSkillInfo.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\game\displays\SkillEffectsDisplay.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\game\feedback\OperationFeedback.tsx

**规则**: extractFunctions
**变更**: 行数变化: +44

---

### components\game\interfaces\EnhancedSkillManager.tsx

**规则**: extractFunctions
**变更**: 行数变化: +69

---

### components\game\interfaces\NightSkillInterface.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\game\interfaces\RoleSpecificSkills.tsx

**规则**: extractFunctions
**变更**: 行数变化: +135

---

### components\game\interfaces\SkillConflictResolver.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\game\interfaces\UnifiedWitchSkillInterface.tsx

**规则**: extractFunctions
**变更**: 行数变化: +32

---

### components\game\optimized\AdvancedSkillAnalytics.tsx

**规则**: extractFunctions
**变更**: 行数变化: +83

---

### components\game\optimized\OptimizedEnhancedSkillPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +80

---

### components\game\optimized\PerformanceMonitor.tsx

**规则**: extractFunctions
**变更**: 行数变化: +24

---

### components\game\optimized\SkillEffectsVirtualList.tsx

**规则**: extractFunctions
**变更**: 行数变化: +90

---

### components\game\panels\EnhancedSkillPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### components\game\panels\GameSettingsPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +47

---

### components\game\panels\GameSkillPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### components\game\panels\PlayerStatusManager.tsx

**规则**: extractFunctions
**变更**: 行数变化: +44

---

### components\game\panels\RoleStatusPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\game\panels\SkillSystemManager.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\game\panels\SkillUsePanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +78

---

### components\game\panels\StudentAnswerRecordPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +58

---

### components\game\panels\StudentSystemPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +52

---

### components\game\panels\VotingSystemManager.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\game\skill\SkillConflictVisualization.tsx

**规则**: extractFunctions
**变更**: 行数变化: +30

---

### components\game\smart-hints\SmartHintSystem.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\game\student\StudentPreviousQuestionDisplay.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\game\student\StudentTimerDisplay.tsx

**规则**: extractFunctions
**变更**: 行数变化: +8

---

### components\home\FeatureCard.tsx

**规则**: extractFunctions
**变更**: 行数变化: +8

---

### components\judge\management\AnswerRecordPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +30

---

### components\judge\management\JudgeActionPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +31

---

### components\judge\management\ManualQuestionEditor.tsx

**规则**: extractFunctions
**变更**: 行数变化: +40

---

### components\judge\management\PlayerStatusPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +18

---

### components\judge\management\PreparationPhaseDialog.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\judge\management\QuestionBankDialog.tsx

**规则**: extractFunctions
**变更**: 行数变化: +45

---

### components\judge\management\QuestionBankPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +205

---

### components\judge\management\QuestionBankTooltip.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\judge\management\TeacherSystemPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### components\judge\monitoring\DyingStatusResolutionPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\judge\monitoring\EnhancedGameStateDisplay.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\judge\monitoring\SkillSystemDashboard.tsx

**规则**: extractFunctions
**变更**: 行数变化: +40

---

### components\judge\types\questionBank.ts

**规则**: extractFunctions
**变更**: 行数变化: +26

---

### components\layout\LanguageSwitcher.tsx

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### components\layout\Navbar.tsx

**规则**: extractFunctions
**变更**: 行数变化: +34

---

### components\layout\PageLayout.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\lobby\AvatarUpload.tsx

**规则**: extractFunctions
**变更**: 行数变化: +10

---

### components\lobby\LobbyActionButtons.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\lobby\PlayerInfo.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\lobby\PlayerStats.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\room\RoleSelection.tsx

**规则**: extractFunctions
**变更**: 行数变化: +56

---

### components\room\RoomInfoCard.tsx

**规则**: extractFunctions
**变更**: 行数变化: +49

---

### components\ui\accordion.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\ui\alert-dialog.tsx

**规则**: extractFunctions
**变更**: 行数变化: +32

---

### components\ui\aspect-ratio.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\ui\badge.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\breadcrumb.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\calendar.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\card.tsx

**规则**: extractFunctions
**变更**: 行数变化: +25

---

### components\ui\carousel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +61

---

### components\ui\chart.tsx

**规则**: extractFunctions
**变更**: 行数变化: +31

---

### components\ui\checkbox.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\collapsible.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\ui\context-menu.tsx

**规则**: extractFunctions
**变更**: 行数变化: +83

---

### components\ui\dialog.tsx

**规则**: extractFunctions
**变更**: 行数变化: +39

---

### components\ui\drawer.tsx

**规则**: extractFunctions
**变更**: 行数变化: +24

---

### components\ui\dropdown-menu.tsx

**规则**: extractFunctions
**变更**: 行数变化: +83

---

### components\ui\form.tsx

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### components\ui\hover-card.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\ui\input-otp.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\input.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\label.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\menubar.tsx

**规则**: extractFunctions
**变更**: 行数变化: +62

---

### components\ui\navigation-menu.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\pagination.tsx

**规则**: extractFunctions
**变更**: 行数变化: +10

---

### components\ui\radio-group.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\select.tsx

**规则**: extractFunctions
**变更**: 行数变化: +40

---

### components\ui\sheet.tsx

**规则**: extractFunctions
**变更**: 行数变化: +39

---

### components\ui\sidebar.tsx

**规则**: extractFunctions
**变更**: 行数变化: +97

---

### components\ui\switch.tsx

**规则**: extractFunctions
**变更**: 行数变化: +8

---

### components\ui\table.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\textarea.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\toast.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\ui\toggle-group.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\ui\toggle.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### components\ui\tooltip.tsx

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### components\voting\EnhancedVotingManager.tsx

**规则**: extractFunctions
**变更**: 行数变化: +26

---

### components\voting\VotingPanel.tsx

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### config\security.config.ts

**规则**: extractFunctions
**变更**: 行数变化: +56

---

### contexts\JudgePageContext.tsx

**规则**: extractFunctions
**变更**: 行数变化: +52

---

### contexts\PermissionContext.tsx

**规则**: extractFunctions
**变更**: 行数变化: +118

---

### hooks\skill\useSkillData.ts

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### hooks\skill\useSkillRealtime.ts

**规则**: extractFunctions
**变更**: 行数变化: +10

---

### hooks\skill\useSkillStats.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### hooks\skill\useSkillValidation.ts

**规则**: extractFunctions
**变更**: 行数变化: +118

---

### hooks\useAutoDyingStatusProcessor.ts

**规则**: extractFunctions
**变更**: 行数变化: +39

---

### hooks\useDataCache.ts

**规则**: extractFunctions
**变更**: 行数变化: +65

---

### hooks\useEnhancedErrorHandler.ts

**规则**: extractFunctions
**变更**: 行数变化: +17

---

### hooks\useEnhancedSkillSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +18

---

### hooks\useErrorHandler.ts

**规则**: extractFunctions
**变更**: 行数变化: +218

---

### hooks\useEveningRefresh.ts

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### hooks\useGameState.ts

**规则**: extractFunctions
**变更**: 行数变化: +98

---

### hooks\useMemoryManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +44

---

### hooks\useMultiChannelChat.ts

**规则**: extractFunctions
**变更**: 行数变化: +52

---

### hooks\useOptimizedSupabaseQuery.ts

**规则**: extractFunctions
**变更**: 行数变化: +65

---

### hooks\usePerformanceMonitoring.ts

**规则**: extractFunctions
**变更**: 行数变化: +106

---

### hooks\usePerformanceOptimization.ts

**规则**: extractFunctions
**变更**: 行数变化: +63

---

### hooks\usePerformanceOptimizationNew.ts

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### hooks\usePermissions.ts

**规则**: extractFunctions
**变更**: 行数变化: +18

---

### hooks\usePlayerPresence.ts

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### hooks\usePlayerRoom.ts

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### hooks\usePlayersRealtime.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### hooks\useRoleDesigns.ts

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### hooks\useRoleSelection.ts

**规则**: extractFunctions
**变更**: 行数变化: +46

---

### hooks\useRoleStates.ts

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### hooks\useRoomAnswers.ts

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### hooks\useRoomChat.ts

**规则**: extractFunctions
**变更**: 行数变化: +45

---

### hooks\useRoomCleanup.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### hooks\useRoomTransition.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### hooks\useSkillEffectAutoProcessor.ts

**规则**: extractFunctions
**变更**: 行数变化: +44

---

### hooks\useSkillEffectProcessor.ts

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### hooks\useToast.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### hooks\useUnifiedErrorHandling.ts

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### hooks\useUXOptimization.ts

**规则**: extractFunctions
**变更**: 行数变化: +100

---

### hooks\useVoteResults.ts

**规则**: extractFunctions
**变更**: 行数变化: +56

---

### hooks\useVotingSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +131

---

### hooks\useWitchPotionManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +134

---

### integrations\supabase\client.ts

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### integrations\supabase\types.ts

**规则**: extractFunctions
**变更**: 行数变化: +1041

---

### lib\debugUtils.ts

**规则**: extractFunctions
**变更**: 行数变化: +54

---

### lib\performanceReporter.ts

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### lib\utils.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### middleware\apiSecurityMiddleware.ts

**规则**: extractFunctions
**变更**: 行数变化: +188

---

### middleware\permissionMiddleware.ts

**规则**: extractFunctions
**变更**: 行数变化: +159

---

### pages\GameLobby.tsx

**规则**: extractFunctions
**变更**: 行数变化: +445

---

### pages\GamePage.tsx

**规则**: extractFunctions
**变更**: 行数变化: +39

---

### pages\GameRoom.tsx

**规则**: extractFunctions
**变更**: 行数变化: +145

---

### pages\Index.tsx

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### pages\JudgePage.tsx

**规则**: extractFunctions
**变更**: 行数变化: +18

---

### providers\AuthProvider.tsx

**规则**: extractFunctions
**变更**: 行数变化: +30

---

### services\analyticsService.ts

**规则**: extractFunctions
**变更**: 行数变化: +59

---

### services\automatedSecurityService.ts

**规则**: extractFunctions
**变更**: 行数变化: +111

---

### services\cacheService.ts

**规则**: extractFunctions
**变更**: 行数变化: +233

---

### services\configurationService.ts

**规则**: extractFunctions
**变更**: 行数变化: +173

---

### services\enhancedSkillService.ts

**规则**: extractFunctions
**变更**: 行数变化: +84

---

### services\errorHandlingService.ts

**规则**: extractFunctions
**变更**: 行数变化: +187

---

### services\errorMonitoringService.ts

**规则**: extractFunctions
**变更**: 行数变化: +306

---

### services\gameService.ts

**规则**: extractFunctions
**变更**: 行数变化: +32

---

### services\index.ts

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### services\monitoringService.ts

**规则**: extractFunctions
**变更**: 行数变化: +68

---

### services\passiveSkillService.ts

**规则**: extractFunctions
**变更**: 行数变化: +24

---

### services\performanceMonitoringService.ts

**规则**: extractFunctions
**变更**: 行数变化: +105

---

### services\roomService.ts

**规则**: extractFunctions
**变更**: 行数变化: +91

---

### services\securityAuditService.ts

**规则**: extractFunctions
**变更**: 行数变化: +59

---

### services\skillSystemService.ts

**规则**: extractFunctions
**变更**: 行数变化: +73

---

### services\systemAnnouncementService.ts

**规则**: extractFunctions
**变更**: 行数变化: +87

---

### services\votingService.ts

**规则**: extractFunctions
**变更**: 行数变化: +39

---

### test-setup.ts

**规则**: extractFunctions
**变更**: 行数变化: +26

---

### types\skill.types.ts

**规则**: extractFunctions
**变更**: 行数变化: +58

---

### types\skillSystem.types.ts

**规则**: extractFunctions
**变更**: 行数变化: +26

---

### utils\advancedInputValidationSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +246

---

### utils\advancedRBACSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +395

---

### utils\apiSecurityConfig.ts

**规则**: extractFunctions
**变更**: 行数变化: +109

---

### utils\automatedSecurityChecker.ts

**规则**: extractFunctions
**变更**: 行数变化: +243

---

### utils\common\errorHandling.ts

**规则**: extractFunctions
**变更**: 行数变化: +30

---

### utils\common\skillValidation.ts

**规则**: extractFunctions
**变更**: 行数变化: +30

---

### utils\componentRenderOptimizer.ts

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### utils\comprehensiveSecurityAudit.ts

**规则**: extractFunctions
**变更**: 行数变化: +104

---

### utils\consoleCleanup.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### utils\enhancedInputValidation.ts

**规则**: extractFunctions
**变更**: 行数变化: +214

---

### utils\enhancedPermissionSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +239

---

### utils\enhancedQueryCacheStrategy.ts

**规则**: extractFunctions
**变更**: 行数变化: +150

---

### utils\enhancedRealtimeManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +139

---

### utils\enhancedSkillSystemOptimizer.ts

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### utils\enhancedUserErrorInterface.ts

**规则**: extractFunctions
**变更**: 行数变化: +54

---

### utils\enhancedUserNotificationSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +79

---

### utils\errorClassifier.ts

**规则**: extractFunctions
**变更**: 行数变化: +45

---

### utils\errorHandler.ts

**规则**: extractFunctions
**变更**: 行数变化: +44

---

### utils\errorHandlingExamples.ts

**规则**: extractFunctions
**变更**: 行数变化: +64

---

### utils\errorMonitoringAndReporting.ts

**规则**: extractFunctions
**变更**: 行数变化: +116

---

### utils\globalErrorMonitor.ts

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### utils\improvedErrorSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +75

---

### utils\inputValidationManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +192

---

### utils\intelligentCacheStrategy.ts

**规则**: extractFunctions
**变更**: 行数变化: +194

---

### utils\masterErrorHandler.ts

**规则**: extractFunctions
**变更**: 行数变化: +38

---

### utils\memoryLeakPrevention.ts

**规则**: extractFunctions
**变更**: 行数变化: +45

---

### utils\memoryManagementSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +54

---

### utils\optimizedQueryCache.ts

**规则**: extractFunctions
**变更**: 行数变化: +44

---

### utils\optimizedRenderingSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +23

---

### utils\patterns\factory.ts

**规则**: extractFunctions
**变更**: 行数变化: +77

---

### utils\patterns\index.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### utils\patterns\observer.ts

**规则**: extractFunctions
**变更**: 行数变化: +106

---

### utils\patterns\singleton.ts

**规则**: extractFunctions
**变更**: 行数变化: +82

---

### utils\patterns\strategy.ts

**规则**: extractFunctions
**变更**: 行数变化: +75

---

### utils\performanceCriticalFixes.ts

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### utils\queryCacheOptimizer.ts

**规则**: extractFunctions
**变更**: 行数变化: +101

---

### utils\realtimeSubscriptionManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +143

---

### utils\roleConfiguration.ts

**规则**: extractFunctions
**变更**: 行数变化: +105

---

### utils\roleStateHelpers.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### utils\roleUtils.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### utils\securityEnhancement.ts

**规则**: extractFunctions
**变更**: 行数变化: +51

---

### utils\securityMiddleware.ts

**规则**: extractFunctions
**变更**: 行数变化: +54

---

### utils\skillBatchProcessor.ts

**规则**: extractFunctions
**变更**: 行数变化: +37

---

### utils\skillCache.ts

**规则**: extractFunctions
**变更**: 行数变化: +47

---

### utils\skillDataStandardizer.ts

**规则**: extractFunctions
**变更**: 行数变化: +48

---

### utils\skillEffectsManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +16

---

### utils\skillEffectStandardization.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### utils\skillMappingConfig.ts

**规则**: extractFunctions
**变更**: 行数变化: +104

---

### utils\skillSystemCache.ts

**规则**: extractFunctions
**变更**: 行数变化: +59

---

### utils\skillSystemHelpers.ts

**规则**: extractFunctions
**变更**: 行数变化: +9

---

### utils\skillSystemValidation.ts

**规则**: extractFunctions
**变更**: 行数变化: +585

---

### utils\skillUsageRestrictions.ts

**规则**: extractFunctions
**变更**: 行数变化: +61

---

### utils\skillValidationRules.ts

**规则**: extractFunctions
**变更**: 行数变化: +330

---

### utils\unifiedCacheManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +188

---

### utils\unifiedErrorHandler.ts

**规则**: extractFunctions
**变更**: 行数变化: +53

---

### utils\unifiedErrorManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +60

---

### utils\unifiedErrorSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +93

---

### utils\unifiedPermissionManager.ts

**规则**: extractFunctions
**变更**: 行数变化: +198

---

### utils\userNotificationSystem.ts

**规则**: extractFunctions
**变更**: 行数变化: +239

---

### utils\votingSystemHelpers.ts

**规则**: extractFunctions
**变更**: 行数变化: +54

---

### components\game\displays\GamePlayerStatusDisplay.tsx

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### components\game\optimized\AdvancedSkillAnalytics.tsx

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### components\game\optimized\OptimizedEnhancedSkillPanel.tsx

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### components\game\panels\EnhancedSkillPanel.tsx

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### components\judge\management\QuestionBankPanel.tsx

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### components\layout\LanguageSwitcher.tsx

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### components\lobby\AvatarUpload.tsx

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### config\security.config.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### hooks\useAutoProcessDayVote.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### hooks\useOptimizedSupabaseQuery.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### hooks\usePerformanceOptimizationNew.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### integrations\supabase\client.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### lib\logger.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### middleware\permissionMiddleware.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### services\automatedSecurityService.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### services\errorMonitoringService.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### services\securityAuditService.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### services\systemAnnouncementService.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\automatedSecurityChecker.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\common\errorHandling.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\comprehensiveSecurityAudit.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\enhancedUserNotificationSystem.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\errorClassifier.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\errorMonitoringAndReporting.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\globalErrorMonitor.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\memoryLeakPrevention.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\queryCacheOptimizer.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\roleConfiguration.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\securityEnhancement.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\skillBatchProcessor.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\skillSystemValidation.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\unifiedErrorHandler.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

### utils\unifiedErrorSystem.ts

**规则**: addTypeAnnotations
**变更**: 行数变化: 0

---

## 建议

1. 在应用重构后，运行完整的测试套件确保功能正常
2. 检查代码格式是否符合项目规范
3. 验证类型检查是否通过
4. 考虑进一步的手动优化

---

_报告由自动重构工具生成_
