/**
 * 文件级注释：错误展示组件
 *
 * 该文件实现了一个用户友好的错误展示组件，旨在：
 * - 提供直观美观的错误信息展示界面
 * - 支持多种展示模式和交互方式
 * - 集成解决方案推荐和用户反馈功能
 * - 提供响应式设计和无障碍访问支持
 * - 支持主题切换和个性化配置
 *
 * 主要功能：
 * - 错误信息展示
 * - 解决方案推荐
 * - 用户反馈收集
 * - 重试和恢复操作
 * - 帮助资源链接
 *
 * @author SOLO Coding
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Zap,
} from 'lucide-react';
import {
  UserFriendlyErrorInfo,
  ErrorSolution,
  HelpLink,
  ErrorFeedback,
  ErrorDisplayConfig,
  useEnhancedUserErrorInterface,
} from '@/utils/enhancedUserErrorInterface';
import { ErrorSeverity } from '@/utils/unifiedErrorHandler';

/**
 * 接口注释：错误展示组件属性
 * 定义错误展示组件的属性接口
 */
export interface ErrorDisplayProps {
  /** 错误信息 */
  errorInfo: UserFriendlyErrorInfo;
  /** 展示配置 */
  config?: Partial<ErrorDisplayConfig>;
  /** 关闭回调 */
  onClose?: () => void;
  /** 重试回调 */
  onRetry?: () => Promise<void>;
  /** 反馈回调 */
  onFeedback?: (feedback: ErrorFeedback) => void;
  /** 解决方案执行回调 */
  onSolutionExecute?: (solutionId: string) => Promise<boolean>;
  /** 是否显示 */
  visible?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * 组件级注释：错误展示组件
 *
 * 实现用户友好的错误信息展示，提供：
 * - 清晰的错误信息展示
 * - 交互式解决方案
 * - 用户反馈收集
 * - 响应式设计
 */
export const ErrorDisplayComponent: React.FC<ErrorDisplayProps> = ({
  errorInfo,
  config,
  onClose,
  onRetry,
  onFeedback,
  onSolutionExecute,
  visible = true,
  className = '',
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showSolutions, setShowSolutions] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState<
    'helpful' | 'not_helpful' | 'suggestion' | 'bug_report'
  >('helpful');
  const [executingSolution, setExecutingSolution] = useState<string | null>(
    null
  );
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const { collectFeedback, updateSolutionSuccess } =
    useEnhancedUserErrorInterface(config);

  /**
   * 函数级注释：获取严重级别样式
   * 根据错误严重级别返回对应的样式类名
   */
  const getSeverityStyles = useCallback((severity: ErrorSeverity) => {
    switch (severity) {
      case ErrorSeverity.LOW:
        return {
          container: 'border-blue-200 bg-blue-50',
          header: 'text-blue-800',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
        };
      case ErrorSeverity.MEDIUM:
        return {
          container: 'border-yellow-200 bg-yellow-50',
          header: 'text-yellow-800',
          icon: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700',
        };
      case ErrorSeverity.HIGH:
        return {
          container: 'border-red-200 bg-red-50',
          header: 'text-red-800',
          icon: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700',
        };
      case ErrorSeverity.CRITICAL:
        return {
          container: 'border-purple-200 bg-purple-50',
          header: 'text-purple-800',
          icon: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700',
        };
      default:
        return {
          container: 'border-gray-200 bg-gray-50',
          header: 'text-gray-800',
          icon: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700',
        };
    }
  }, []);

  /**
   * 函数级注释：处理解决方案执行
   * 执行选定的解决方案
   */
  const handleSolutionExecute = useCallback(
    async (solution: ErrorSolution) => {
      if (!solution.action && !onSolutionExecute) return;

      setExecutingSolution(solution.id);

      try {
        let success = false;

        if (solution.action) {
          success = await solution.action();
        } else if (onSolutionExecute) {
          success = await onSolutionExecute(solution.id);
        }

        // 更新解决方案成功率
        updateSolutionSuccess(solution.id, success);

        if (success && onClose) {
          onClose();
        }
      } catch (error) {
        console.error('解决方案执行失败:', error);
        updateSolutionSuccess(solution.id, false);
      } finally {
        setExecutingSolution(null);
      }
    },
    [onSolutionExecute, onClose, updateSolutionSuccess]
  );

  /**
   * 函数级注释：处理反馈提交
   * 提交用户反馈
   */
  const handleFeedbackSubmit = useCallback(async () => {
    if (!feedbackText.trim()) return;

    const feedback: Omit<ErrorFeedback, 'timestamp' | 'userAgent' | 'pageUrl'> =
      {
        errorId: errorInfo.id,
        type: feedbackType,
        content: feedbackText,
        contact: '', // 可以添加联系方式输入
      };

    try {
      await collectFeedback(feedback);
      if (onFeedback) {
        onFeedback(feedback as ErrorFeedback);
      }

      setFeedbackText('');
      setShowFeedback(false);
    } catch (error) {
      console.error('反馈提交失败:', error);
    }
  }, [feedbackText, feedbackType, errorInfo.id, collectFeedback, onFeedback]);

  /**
   * 函数级注释：复制错误信息
   * 复制错误详情到剪贴板
   */
  const handleCopyError = useCallback(async () => {
    const errorText = `
错误ID: ${errorInfo.id}
标题: ${errorInfo.title}
描述: ${errorInfo.description}
详情: ${errorInfo.details || '无'}
严重级别: ${errorInfo.severity}
分类: ${errorInfo.classification.category}
时间: ${new Date().toLocaleString()}
    `.trim();

    try {
      await navigator.clipboard.writeText(errorText);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  }, [errorInfo]);

  /**
   * 函数级注释：获取影响范围图标
   * 根据影响范围返回对应图标
   */
  const getImpactIcon = useCallback((scope: string) => {
    switch (scope) {
      case 'user':
        return <Users className='w-4 h-4' />;
      case 'feature':
        return <Zap className='w-4 h-4' />;
      case 'system':
      case 'global':
        return <Clock className='w-4 h-4' />;
      default:
        return <Clock className='w-4 h-4' />;
    }
  }, []);

  const styles = getSeverityStyles(errorInfo.severity);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ${className}`}
    >
      <div
        className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg border-2 ${styles.container} shadow-xl`}
      >
        {/* 头部 */}
        <div className='flex items-start justify-between p-6 border-b border-gray-200'>
          <div className='flex items-start space-x-3'>
            <div className={`flex-shrink-0 ${styles.icon}`}>
              {errorInfo.icon}
            </div>
            <div className='flex-1'>
              <h3 className={`text-lg font-semibold ${styles.header}`}>
                {errorInfo.title}
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                {errorInfo.description}
              </p>
              <div className='flex items-center space-x-4 mt-2 text-xs text-gray-500'>
                <span className='flex items-center space-x-1'>
                  {getImpactIcon(errorInfo.impactScope)}
                  <span>影响范围: {errorInfo.impactScope}</span>
                </span>
                {errorInfo.estimatedResolutionTime && (
                  <span className='flex items-center space-x-1'>
                    <Clock className='w-4 h-4' />
                    <span>
                      预计解决时间: {errorInfo.estimatedResolutionTime}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className='flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* 详细信息 */}
        {errorInfo.details && (
          <div className='px-6 py-4 border-b border-gray-200'>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className='flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors'
            >
              {showDetails ? (
                <ChevronUp className='w-4 h-4' />
              ) : (
                <ChevronDown className='w-4 h-4' />
              )}
              <span>详细信息</span>
            </button>
            {showDetails && (
              <div className='mt-3 p-3 bg-gray-100 rounded text-sm text-gray-700'>
                {errorInfo.details}
              </div>
            )}
          </div>
        )}

        {/* 解决方案 */}
        {errorInfo.solutions.length > 0 && (
          <div className='px-6 py-4 border-b border-gray-200'>
            <button
              onClick={() => setShowSolutions(!showSolutions)}
              className='flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors'
            >
              {showSolutions ? (
                <ChevronUp className='w-4 h-4' />
              ) : (
                <ChevronDown className='w-4 h-4' />
              )}
              <span>解决方案 ({errorInfo.solutions.length})</span>
            </button>
            {showSolutions && (
              <div className='mt-4 space-y-3'>
                {errorInfo.solutions.map((solution, index) => (
                  <div
                    key={solution.id}
                    className={`p-4 rounded-lg border ${
                      solution.recommended
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center space-x-2'>
                          <h4 className='font-medium text-gray-900'>
                            {solution.title}
                          </h4>
                          {solution.recommended && (
                            <span className='px-2 py-1 text-xs bg-green-100 text-green-800 rounded'>
                              推荐
                            </span>
                          )}
                          <span className='text-xs text-gray-500'>
                            成功率: {Math.round(solution.successRate * 100)}%
                          </span>
                        </div>
                        <p className='mt-1 text-sm text-gray-600'>
                          {solution.description}
                        </p>
                        <div className='mt-2 text-xs text-gray-500'>
                          预计耗时: {solution.estimatedTime}
                        </div>
                        {solution.steps.length > 0 && (
                          <div className='mt-3'>
                            <p className='text-xs font-medium text-gray-700 mb-2'>
                              操作步骤:
                            </p>
                            <ol className='text-xs text-gray-600 space-y-1'>
                              {solution.steps.map((step, stepIndex) => (
                                <li
                                  key={stepIndex}
                                  className='flex items-start space-x-2'
                                >
                                  <span className='flex-shrink-0 w-4 h-4 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs'>
                                    {stepIndex + 1}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                      {(solution.action || onSolutionExecute) &&
                        solution.type === 'automatic' && (
                          <button
                            onClick={() => handleSolutionExecute(solution)}
                            disabled={executingSolution === solution.id}
                            className={`ml-4 px-3 py-1 text-sm text-white rounded transition-colors ${styles.button} disabled:opacity-50`}
                          >
                            {executingSolution === solution.id ? (
                              <RefreshCw className='w-4 h-4 animate-spin' />
                            ) : (
                              '执行'
                            )}
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 帮助链接 */}
        {errorInfo.helpLinks.length > 0 && (
          <div className='px-6 py-4 border-b border-gray-200'>
            <h4 className='text-sm font-medium text-gray-700 mb-3'>相关帮助</h4>
            <div className='space-y-2'>
              {errorInfo.helpLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors'
                >
                  <ExternalLink className='w-4 h-4' />
                  <span>{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 反馈区域 */}
        <div className='px-6 py-4 border-b border-gray-200'>
          <button
            onClick={() => setShowFeedback(!showFeedback)}
            className='flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors'
          >
            <MessageSquare className='w-4 h-4' />
            <span>提供反馈</span>
          </button>
          {showFeedback && (
            <div className='mt-4 space-y-3'>
              <div className='flex space-x-2'>
                {[
                  { value: 'helpful', label: '有帮助', icon: ThumbsUp },
                  { value: 'not_helpful', label: '没帮助', icon: ThumbsDown },
                  { value: 'suggestion', label: '建议', icon: MessageSquare },
                  {
                    value: 'bug_report',
                    label: '错误报告',
                    icon: MessageSquare,
                  },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setFeedbackType(value as any)}
                    className={`flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors ${
                      feedbackType === value
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className='w-3 h-3' />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <textarea
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder='请描述您的反馈...'
                className='w-full p-3 text-sm border border-gray-300 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                rows={3}
              />
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => setShowFeedback(false)}
                  className='px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors'
                >
                  取消
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={!feedbackText.trim()}
                  className='px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors disabled:opacity-50'
                >
                  提交反馈
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 底部操作 */}
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex items-center space-x-2'>
            <button
              onClick={handleCopyError}
              className='flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors'
            >
              <Copy className='w-4 h-4' />
              <span>{copiedToClipboard ? '已复制' : '复制错误信息'}</span>
            </button>
          </div>
          <div className='flex items-center space-x-3'>
            {errorInfo.retryable && onRetry && (
              <button
                onClick={onRetry}
                className={`flex items-center space-x-2 px-4 py-2 text-sm text-white rounded transition-colors ${styles.button}`}
              >
                <RefreshCw className='w-4 h-4' />
                <span>重试</span>
              </button>
            )}
            <button
              onClick={onClose}
              className='px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors'
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplayComponent;
