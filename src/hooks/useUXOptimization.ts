import { useState, useEffect, useCallback, useRef } from 'react';
import { useOperationFeedback } from '@/components/game/feedback/OperationFeedback';
import { useAccessibility } from '@/components/game/accessibility/AccessibilityEnhancement';

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

      announceText(`操作已记录: ${action}`);
    },
    [
      currentIndex,
      finalConfig.enableUndo,
      finalConfig.undoStackSize,
      announceText,
    ]
  );

  // 撤销操作
  const undoOperation = useCallback(() => {
    if (currentIndex < 0 || !finalConfig.enableUndo) return null;

    const operation = operationHistory[currentIndex];
    if (!operation.canUndo) {
      showWarning('无法撤销', '此操作不支持撤销');
      return null;
    }

    setCurrentIndex(prev => prev - 1);
    announceText(`已撤销操作: ${operation.action}`);
    showSuccess('操作已撤销', `撤销了: ${operation.action}`);

    return operation;
  }, [
    currentIndex,
    operationHistory,
    finalConfig.enableUndo,
    showWarning,
    showSuccess,
    announceText,
  ]);

  // 重做操作
  const redoOperation = useCallback(() => {
    if (currentIndex >= operationHistory.length - 1 || !finalConfig.enableUndo)
      return null;

    const operation = operationHistory[currentIndex + 1];
    setCurrentIndex(prev => prev + 1);
    announceText(`已重做操作: ${operation.action}`);
    showSuccess('操作已重做', `重做了: ${operation.action}`);

    return operation;
  }, [
    currentIndex,
    operationHistory,
    finalConfig.enableUndo,
    showSuccess,
    announceText,
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

      const confirmed = window.confirm(`确认要${action}吗？\n\n${message}`);
      if (confirmed) {
        try {
          await onConfirm();
          announceText(`已确认并执行: ${action}`);
          return true;
        } catch (error) {
          showError('操作失败', `执行${action}时发生错误: ${error}`);
          return false;
        }
      }

      announceText(`已取消操作: ${action}`);
      return false;
    },
    [finalConfig.confirmCriticalActions, showError, announceText]
  );

  // 智能加载状态管理
  const startLoading = useCallback(
    (operationId: string, message: string) => {
      setLoadingStates(prev => new Map(prev).set(operationId, message));
      const messageId = showLoading(message, `正在执行: ${operationId}`);
      return { operationId, messageId };
    },
    [showLoading]
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
        showSuccess('操作完成', result || `${operationId} 执行成功`);
      } else {
        showError('操作失败', result || `${operationId} 执行失败`);
      }
    },
    [removeMessage, showSuccess, showError]
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
        announceText('数据已自动保存');
      } catch (error) {
        showError('自动保存失败', '无法保存数据到本地存储');
      }
    },
    [isDirty, showError, announceText]
  );

  // 获取自动保存的数据
  const getAutoSavedData = useCallback(() => {
    try {
      const saved = localStorage.getItem('auto-save-data');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      showError('读取保存数据失败', '无法从本地存储读取数据');
      return null;
    }
  }, [showError]);

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
        '性能警告',
        `页面渲染耗时${renderTime.toFixed(2)}ms，可能影响用户体验`
      );
    }
  }, [finalConfig.enablePerformanceMonitoring, showWarning]);

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
          title: '基于历史操作',
          description: `您经常使用"${frequentAction}"，是否需要快捷方式？`,
          action: 'create_shortcut',
          data: { action: frequentAction },
        });
      }

      // 基于性能的建议
      if (performanceMetrics.renderTime > 50) {
        suggestions.push({
          type: 'performance',
          title: '性能优化建议',
          description: '检测到页面渲染较慢，建议开启性能模式',
          action: 'enable_performance_mode',
          data: {},
        });
      }

      // 基于错误的建议
      if (performanceMetrics.errorCount > 3) {
        suggestions.push({
          type: 'error',
          title: '错误频率较高',
          description: '建议查看操作指南或联系支持',
          action: 'show_help',
          data: {},
        });
      }

      return suggestions;
    },
    [finalConfig.enableSmartSuggestions, operationHistory, performanceMetrics]
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
