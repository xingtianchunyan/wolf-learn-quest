import { useState, useEffect, useCallback, useRef } from 'react';
import { useOperationFeedback } from '@/components/game/feedback/OperationFeedback';
import { useAccessibility } from '@/components/game/accessibility/AccessibilityEnhancement';
import { useLanguage } from '@/components/layout/LanguageSwitcher';

interface UXOptimizationConfig {
  // 操作确认
  confirmCriticalActions: boolean;
  // 自动保存
  autoSaveInterval: number;
  // 操作撤销
  enableUndo: boolean;
  undoStackSize: number;
  // 智能预测
  enableSmartSuggestions: boolean;
  // 操作引导
  showOnboarding: boolean;
  // 性能监控
  enablePerformanceMonitoring: boolean;
}

interface OperationHistory {
  id: string;
  action: string;
  data: any;
  timestamp: number;
  canUndo: boolean;
}

interface PerformanceMetrics {
  renderTime: number;
  interactionDelay: number;
  memoryUsage: number;
  errorCount: number;
}

const defaultConfig: UXOptimizationConfig = {
  confirmCriticalActions: true,
  autoSaveInterval: 30000, // 30秒
  enableUndo: true,
  undoStackSize: 10,
  enableSmartSuggestions: true,
  showOnboarding: true,
  enablePerformanceMonitoring: true,
};

export const useUXOptimization = (
  config: Partial<UXOptimizationConfig> = {}
) => {
  const finalConfig = { ...defaultConfig, ...config };
  const { t } = useLanguage();
  const { announceText } = useAccessibility();
  const { showSuccess, showError, showWarning, showLoading, removeMessage } =
    useOperationFeedback();

  // 操作历史栈
  const [operationHistory, setOperationHistory] = useState<OperationHistory[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(-1);

  // 性能监控
  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>({
      renderTime: 0,
      interactionDelay: 0,
      memoryUsage: 0,
      errorCount: 0,
    });

  // 自动保存状态
  const [lastSaveTime, setLastSaveTime] = useState<number>(Date.now());
  const [isDirty, setIsDirty] = useState(false);

  // 加载状态管理
  const [loadingStates, setLoadingStates] = useState<Map<string, string>>(
    new Map()
  );

  // 引用和计时器
  const autoSaveTimer = useRef<ReturnType<typeof setInterval>>();
  const performanceObserver = useRef<PerformanceObserver>();
  const renderStartTime = useRef<number>();

  // 记录操作到历史栈
  const recordOperation = useCallback(
    (action: string, data: any, canUndo: boolean = true) => {
      if (!finalConfig.enableUndo) return;

      const operation: OperationHistory = {
        id: Math.random().toString(36).substr(2, 9),
        action,
        data,
        timestamp: Date.now(),
        canUndo,
      };

      setOperationHistory(prev => {
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push(operation);

        // 限制历史栈大小
        if (newHistory.length > finalConfig.undoStackSize) {
          newHistory.shift();
        }

        return newHistory;
      });

      setCurrentIndex(prev =>
        Math.min(prev + 1, finalConfig.undoStackSize - 1)
      );
      setIsDirty(true);

      announceText(t('hook.ux.operation_recorded', { action }));
    },
    [
      currentIndex,
      finalConfig.enableUndo,
      finalConfig.undoStackSize,
      announceText,
      t,
    ]
  );

  // 撤销操作
  const undoOperation = useCallback(() => {
    if (currentIndex < 0 || !finalConfig.enableUndo) return null;

    const operation = operationHistory[currentIndex];
    if (!operation.canUndo) {
      showWarning(
        t('hook.ux.cannot_undo_title'),
        t('hook.ux.cannot_undo_desc')
      );
      return null;
    }

    setCurrentIndex(prev => prev - 1);
    announceText(t('hook.ux.undone', { action: operation.action }));
    showSuccess(
      t('hook.ux.undo_success_title'),
      t('hook.ux.undo_success_desc', { action: operation.action })
    );

    return operation;
  }, [
    currentIndex,
    operationHistory,
    finalConfig.enableUndo,
    showWarning,
    showSuccess,
    announceText,
    t,
  ]);

  // 重做操作
  const redoOperation = useCallback(() => {
    if (currentIndex >= operationHistory.length - 1 || !finalConfig.enableUndo)
      return null;

    const operation = operationHistory[currentIndex + 1];
    setCurrentIndex(prev => prev + 1);
    announceText(t('hook.ux.redone', { action: operation.action }));
    showSuccess(
      t('hook.ux.redo_success_title'),
      t('hook.ux.redo_success_desc', { action: operation.action })
    );

    return operation;
  }, [
    currentIndex,
    operationHistory,
    finalConfig.enableUndo,
    showSuccess,
    announceText,
    t,
  ]);

  // 确认关键操作
  const confirmCriticalAction = useCallback(
    async (
      action: string,
      message: string,
      onConfirm: () => Promise<void> | void
    ): Promise<boolean> => {
      if (!finalConfig.confirmCriticalActions) {
        await onConfirm();
        return true;
      }

      const confirmed = window.confirm(
        t('hook.ux.confirm_message', { action, message })
      );
      if (confirmed) {
        try {
          await onConfirm();
          announceText(t('hook.ux.confirmed', { action }));
          return true;
        } catch (error) {
          showError(
            t('hook.ux.critical_failed_title'),
            t('hook.ux.critical_failed_desc', { action, error })
          );
          return false;
        }
      }

      announceText(t('hook.ux.cancelled', { action }));
      return false;
    },
    [finalConfig.confirmCriticalActions, showError, announceText, t]
  );

  // 智能加载状态管理
  const startLoading = useCallback(
    (operationId: string, message: string) => {
      setLoadingStates(prev => new Map(prev).set(operationId, message));
      const messageId = showLoading(
        message,
        t('hook.ux.loading_detail', { operationId })
      );
      return { operationId, messageId };
    },
    [showLoading, t]
  );

  const finishLoading = useCallback(
    (
      operationId: string,
      messageId: string,
      success: boolean,
      result?: string
    ) => {
      setLoadingStates(prev => {
        const newMap = new Map(prev);
        newMap.delete(operationId);
        return newMap;
      });

      removeMessage(messageId);

      if (success) {
        showSuccess(
          t('common.success'),
          result || t('hook.ux.operation_success_desc', { operationId })
        );
      } else {
        showError(
          t('common.operation_failed'),
          result || t('hook.ux.operation_failed_desc', { operationId })
        );
      }
    },
    [removeMessage, showSuccess, showError, t]
  );

  // 自动保存功能
  const triggerAutoSave = useCallback(
    (data: any) => {
      if (!isDirty) return;

      try {
        localStorage.setItem(
          'auto-save-data',
          JSON.stringify({
            data,
            timestamp: Date.now(),
          })
        );
        setLastSaveTime(Date.now());
        setIsDirty(false);
        announceText(t('hook.ux.auto_save_success'));
      } catch (error) {
        showError(
          t('hook.ux.auto_save_failed_title'),
          t('hook.ux.auto_save_failed_desc')
        );
      }
    },
    [isDirty, showError, announceText, t]
  );

  // 获取自动保存的数据
  const getAutoSavedData = useCallback(() => {
    try {
      const saved = localStorage.getItem('auto-save-data');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      showError(
        t('hook.ux.read_saved_failed_title'),
        t('hook.ux.read_saved_failed_desc')
      );
      return null;
    }
  }, [showError, t]);

  // 性能监控开始
  const startPerformanceMonitoring = useCallback(() => {
    if (!finalConfig.enablePerformanceMonitoring) return;

    renderStartTime.current = performance.now();

    if ('PerformanceObserver' in window) {
      performanceObserver.current = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'measure') {
            setPerformanceMetrics(prev => ({
              ...prev,
              renderTime: entry.duration,
            }));
          }
        });
      });

      performanceObserver.current.observe({ entryTypes: ['measure'] });
    }
  }, [finalConfig.enablePerformanceMonitoring]);

  // 性能监控结束
  const endPerformanceMonitoring = useCallback(() => {
    if (!finalConfig.enablePerformanceMonitoring || !renderStartTime.current)
      return;

    const renderTime = performance.now() - renderStartTime.current;
    performance.mark('render-end');
    performance.measure('render-duration', 'render-start', 'render-end');

    setPerformanceMetrics(prev => ({
      ...prev,
      renderTime,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
    }));

    // 如果渲染时间过长，显示警告
    if (renderTime > 100) {
      showWarning(
        t('hook.ux.performance_warning_title'),
        t('hook.ux.performance_warning_desc', {
          time: renderTime.toFixed(2),
        })
      );
    }
  }, [finalConfig.enablePerformanceMonitoring, showWarning, t]);

  // 智能建议系统
  const getSmartSuggestions = useCallback(
    (context: any) => {
      if (!finalConfig.enableSmartSuggestions) return [];

      const suggestions = [];

      // 基于操作历史的建议
      if (operationHistory.length > 0) {
        const recentActions = operationHistory.slice(-3).map(op => op.action);
        const frequentAction = recentActions.reduce((a, b, _, arr) =>
          arr.filter(v => v === a).length >= arr.filter(v => v === b).length
            ? a
            : b
        );

        suggestions.push({
          type: 'pattern',
          title: t('hook.ux.suggestion_pattern_title'),
          description: t('hook.ux.suggestion_pattern_desc', {
            action: frequentAction,
          }),
          action: 'create_shortcut',
          data: { action: frequentAction },
        });
      }

      // 基于性能的建议
      if (performanceMetrics.renderTime > 50) {
        suggestions.push({
          type: 'performance',
          title: t('hook.ux.suggestion_performance_title'),
          description: t('hook.ux.suggestion_performance_desc'),
          action: 'enable_performance_mode',
          data: {},
        });
      }

      // 基于错误的建议
      if (performanceMetrics.errorCount > 3) {
        suggestions.push({
          type: 'error',
          title: t('hook.ux.suggestion_error_title'),
          description: t('hook.ux.suggestion_error_desc'),
          action: 'show_help',
          data: {},
        });
      }

      return suggestions;
    },
    [
      finalConfig.enableSmartSuggestions,
      operationHistory,
      performanceMetrics,
      t,
    ]
  );

  // 自动保存定时器
  useEffect(() => {
    if (finalConfig.autoSaveInterval > 0) {
      autoSaveTimer.current = setInterval(() => {
        if (isDirty) {
          // 这里需要外部提供保存数据的回调
          setLastSaveTime(Date.now());
          setIsDirty(false);
        }
      }, finalConfig.autoSaveInterval);

      return () => {
        if (autoSaveTimer.current) {
          clearInterval(autoSaveTimer.current);
        }
      };
    }
  }, [finalConfig.autoSaveInterval, isDirty]);

  // 性能监控清理
  useEffect(() => {
    return () => {
      if (performanceObserver.current) {
        performanceObserver.current.disconnect();
      }
    };
  }, []);

  return {
    // 操作历史
    operationHistory,
    currentIndex,
    recordOperation,
    undoOperation,
    redoOperation,
    canUndo: currentIndex >= 0,
    canRedo: currentIndex < operationHistory.length - 1,

    // 关键操作确认
    confirmCriticalAction,

    // 加载状态
    loadingStates,
    startLoading,
    finishLoading,

    // 自动保存
    triggerAutoSave,
    getAutoSavedData,
    lastSaveTime,
    isDirty,
    markDirty: () => setIsDirty(true),

    // 性能监控
    performanceMetrics,
    startPerformanceMonitoring,
    endPerformanceMonitoring,

    // 智能建议
    getSmartSuggestions,

    // 配置
    config: finalConfig,
  };
};
