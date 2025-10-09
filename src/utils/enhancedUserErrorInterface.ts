/**
 * 文件级注释：增强的用户友好错误界面系统
 * 
 * 该文件实现了一个增强的用户友好错误界面系统，旨在：
 * - 提供直观易懂的错误提示界面
 * - 支持多种错误展示模式和交互方式
 * - 实现智能错误分析和解决方案推荐
 * - 提供错误反馈和报告机制
 * - 支持多语言和个性化错误提示
 * 
 * 主要功能：
 * - 智能错误消息生成
 * - 多模态错误展示
 * - 用户操作引导
 * - 错误解决方案推荐
 * - 错误反馈收集
 * 
 * @author SOLO Coding
 * @version 1.0.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Info, XCircle, CheckCircle, RefreshCw, MessageSquare, ExternalLink, Copy, Bug } from 'lucide-react';
import { ErrorSeverity } from './unifiedErrorHandler';
import { ErrorClassification } from './errorClassifier';

/**
 * 接口注释：错误展示配置
 * 定义错误界面的展示配置
 */
export interface ErrorDisplayConfig {
  /** 展示模式 */
  mode: 'toast' | 'modal' | 'inline' | 'banner' | 'sidebar';
  /** 主题样式 */
  theme: 'light' | 'dark' | 'auto';
  /** 动画效果 */
  animation: 'slide' | 'fade' | 'bounce' | 'none';
  /** 自动关闭时间（毫秒，0表示不自动关闭） */
  autoClose: number;
  /** 是否显示技术详情 */
  showTechnicalDetails: boolean;
  /** 是否显示解决方案 */
  showSolutions: boolean;
  /** 是否显示反馈按钮 */
  showFeedback: boolean;
  /** 是否显示重试按钮 */
  showRetry: boolean;
  /** 最大宽度 */
  maxWidth: string;
  /** 位置 */
  position: 'top' | 'bottom' | 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * 接口注释：用户友好错误信息
 * 定义用户友好的错误信息结构
 */
export interface UserFriendlyErrorInfo {
  /** 错误ID */
  id: string;
  /** 用户友好标题 */
  title: string;
  /** 简短描述 */
  description: string;
  /** 详细说明 */
  details?: string;
  /** 错误严重级别 */
  severity: ErrorSeverity;
  /** 错误分类 */
  classification: ErrorClassification;
  /** 解决方案列表 */
  solutions: ErrorSolution[];
  /** 相关帮助链接 */
  helpLinks: HelpLink[];
  /** 是否可重试 */
  retryable: boolean;
  /** 预计解决时间 */
  estimatedResolutionTime?: string;
  /** 影响范围 */
  impactScope: 'user' | 'feature' | 'system' | 'global';
  /** 错误图标 */
  icon: React.ReactNode;
  /** 错误颜色主题 */
  colorTheme: string;
}

/**
 * 接口注释：错误解决方案
 * 定义错误的解决方案信息
 */
export interface ErrorSolution {
  /** 解决方案ID */
  id: string;
  /** 解决方案标题 */
  title: string;
  /** 解决方案描述 */
  description: string;
  /** 操作步骤 */
  steps: string[];
  /** 解决方案类型 */
  type: 'automatic' | 'manual' | 'contact_support';
  /** 成功率 */
  successRate: number;
  /** 预计耗时 */
  estimatedTime: string;
  /** 操作函数 */
  action?: () => Promise<boolean>;
  /** 是否推荐 */
  recommended: boolean;
}

/**
 * 接口注释：帮助链接
 * 定义相关帮助资源的链接
 */
export interface HelpLink {
  /** 链接标题 */
  title: string;
  /** 链接URL */
  url: string;
  /** 链接类型 */
  type: 'documentation' | 'faq' | 'tutorial' | 'support' | 'community';
  /** 链接描述 */
  description?: string;
}

/**
 * 接口注释：错误反馈信息
 * 定义用户反馈的结构
 */
export interface ErrorFeedback {
  /** 错误ID */
  errorId: string;
  /** 反馈类型 */
  type: 'helpful' | 'not_helpful' | 'suggestion' | 'bug_report';
  /** 反馈内容 */
  content: string;
  /** 用户联系方式 */
  contact?: string;
  /** 时间戳 */
  timestamp: number;
  /** 用户代理 */
  userAgent: string;
  /** 页面URL */
  pageUrl: string;
}

/**
 * 类级注释：增强的用户错误界面
 * 
 * 实现智能的用户友好错误界面系统，提供：
 * - 直观的错误信息展示
 * - 智能解决方案推荐
 * - 用户反馈收集
 * - 多模态交互支持
 */
export class EnhancedUserErrorInterface {
  private static instance: EnhancedUserErrorInterface;
  private config: ErrorDisplayConfig;
  private feedbackHistory: ErrorFeedback[] = [];
  private solutionSuccessRates: Map<string, number> = new Map();

  /**
   * 函数级注释：构造函数
   * 初始化增强的用户错误界面
   */
  private constructor(config?: Partial<ErrorDisplayConfig>) {
    this.config = {
      mode: 'toast',
      theme: 'auto',
      animation: 'slide',
      autoClose: 5000,
      showTechnicalDetails: false,
      showSolutions: true,
      showFeedback: true,
      showRetry: true,
      maxWidth: '500px',
      position: 'top-right',
      ...config
    };
  }

  /**
   * 函数级注释：获取单例实例
   * 实现单例模式
   */
  public static getInstance(config?: Partial<ErrorDisplayConfig>): EnhancedUserErrorInterface {
    if (!EnhancedUserErrorInterface.instance) {
      EnhancedUserErrorInterface.instance = new EnhancedUserErrorInterface(config);
    }
    return EnhancedUserErrorInterface.instance;
  }

  /**
   * 函数级注释：生成用户友好错误信息
   * 将技术错误转换为用户友好的信息
   */
  public generateUserFriendlyError(
    error: any,
    classification: ErrorClassification
  ): UserFriendlyErrorInfo {
    const errorId = this.generateErrorId();
    const severity = classification.severity;
    
    // 根据错误类型生成友好信息
    const friendlyInfo = this.mapErrorToFriendlyInfo(error, classification);
    
    return {
      id: errorId,
      title: friendlyInfo.title,
      description: friendlyInfo.description,
      details: friendlyInfo.details,
      severity,
      classification,
      solutions: this.generateSolutions(error, classification),
      helpLinks: this.generateHelpLinks(error, classification),
      retryable: classification.isRetryable,
      estimatedResolutionTime: this.estimateResolutionTime(classification),
      impactScope: this.determineImpactScope(classification),
      icon: this.getErrorIcon(severity),
      colorTheme: this.getColorTheme(severity)
    };
  }

  /**
   * 函数级注释：映射错误到友好信息
   * 将技术错误映射为用户友好的描述
   */
  private mapErrorToFriendlyInfo(error: any, classification: ErrorClassification): {
    title: string;
    description: string;
    details?: string;
  } {
    const category = classification.category;
    
    switch (category) {
      case 'network':
        return {
          title: '网络连接问题',
          description: '无法连接到服务器，请检查您的网络连接',
          details: '这可能是由于网络不稳定、服务器维护或防火墙设置导致的'
        };
        
      case 'validation':
        return {
          title: '输入信息有误',
          description: '请检查并修正输入的信息',
          details: '某些必填字段可能为空或格式不正确'
        };
        
      case 'permission':
        return {
          title: '权限不足',
          description: '您没有执行此操作的权限',
          details: '请联系管理员获取相应权限或使用其他账户登录'
        };
        
      case 'skill':
        return {
          title: '技能使用失败',
          description: '技能无法正常使用，可能存在冲突或限制',
          details: '请检查技能使用条件或等待冷却时间结束'
        };
        
      case 'game_state':
        return {
          title: '游戏状态异常',
          description: '当前游戏状态不允许执行此操作',
          details: '请等待游戏进入正确阶段或刷新页面重试'
        };
        
      case 'data':
        return {
          title: '数据处理错误',
          description: '数据保存或读取时发生错误',
          details: '可能是由于数据格式问题或存储空间不足导致的'
        };
        
      default:
        return {
          title: '系统错误',
          description: '系统遇到了意外问题',
          details: '我们正在努力解决这个问题，请稍后重试'
        };
    }
  }

  /**
   * 函数级注释：生成解决方案
   * 根据错误类型生成可能的解决方案
   */
  private generateSolutions(error: any, classification: ErrorClassification): ErrorSolution[] {
    const solutions: ErrorSolution[] = [];
    const category = classification.category;
    
    switch (category) {
      case 'network':
        solutions.push(
          {
            id: 'check_connection',
            title: '检查网络连接',
            description: '确认您的设备已连接到互联网',
            steps: [
              '检查WiFi或移动数据连接',
              '尝试访问其他网站确认网络正常',
              '重启路由器或切换网络'
            ],
            type: 'manual',
            successRate: 0.7,
            estimatedTime: '2-5分钟',
            recommended: true
          },
          {
            id: 'retry_request',
            title: '重新尝试',
            description: '等待片刻后重新尝试操作',
            steps: ['点击重试按钮', '等待操作完成'],
            type: 'automatic',
            successRate: 0.6,
            estimatedTime: '30秒',
            action: async () => {
              // 这里应该实现重试逻辑
              return true;
            },
            recommended: false
          }
        );
        break;
        
      case 'validation':
        solutions.push({
          id: 'check_input',
          title: '检查输入信息',
          description: '仔细检查所有输入字段的格式和内容',
          steps: [
            '确认所有必填字段已填写',
            '检查邮箱、电话等格式是否正确',
            '确认密码符合要求'
          ],
          type: 'manual',
          successRate: 0.9,
          estimatedTime: '1-2分钟',
          recommended: true
        });
        break;
        
      case 'permission':
        solutions.push(
          {
            id: 'login_check',
            title: '检查登录状态',
            description: '确认您已正确登录',
            steps: [
              '检查是否已登录',
              '尝试重新登录',
              '清除浏览器缓存后重新登录'
            ],
            type: 'manual',
            successRate: 0.8,
            estimatedTime: '2-3分钟',
            recommended: true
          },
          {
            id: 'contact_admin',
            title: '联系管理员',
            description: '如果问题持续存在，请联系系统管理员',
            steps: [
              '记录错误信息',
              '联系技术支持',
              '提供详细的问题描述'
            ],
            type: 'contact_support',
            successRate: 0.95,
            estimatedTime: '1-24小时',
            recommended: false
          }
        );
        break;
        
      case 'skill':
        solutions.push({
          id: 'check_skill_conditions',
          title: '检查技能使用条件',
          description: '确认技能使用的前置条件',
          steps: [
            '检查技能冷却时间',
            '确认目标选择正确',
            '检查是否有技能冲突'
          ],
          type: 'manual',
          successRate: 0.85,
          estimatedTime: '1分钟',
          recommended: true
        });
        break;
        
      default:
        solutions.push(
          {
            id: 'refresh_page',
            title: '刷新页面',
            description: '重新加载页面可能解决临时问题',
            steps: [
              '保存当前进度（如果可能）',
              '刷新浏览器页面',
              '重新尝试操作'
            ],
            type: 'manual',
            successRate: 0.5,
            estimatedTime: '30秒',
            recommended: true
          },
          {
            id: 'clear_cache',
            title: '清除浏览器缓存',
            description: '清除缓存可能解决数据冲突问题',
            steps: [
              '打开浏览器设置',
              '清除浏览数据和缓存',
              '重新访问页面'
            ],
            type: 'manual',
            successRate: 0.4,
            estimatedTime: '2-3分钟',
            recommended: false
          }
        );
    }
    
    // 根据成功率排序
    return solutions.sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return b.successRate - a.successRate;
    });
  }

  /**
   * 函数级注释：生成帮助链接
   * 根据错误类型生成相关帮助资源
   */
  private generateHelpLinks(error: any, classification: ErrorClassification): HelpLink[] {
    const links: HelpLink[] = [];
    const category = classification.category;
    
    // 通用帮助链接
    links.push({
      title: '常见问题解答',
      url: '/help/faq',
      type: 'faq',
      description: '查看常见问题的解决方案'
    });
    
    // 根据错误类型添加特定链接
    switch (category) {
      case 'network':
        links.push({
          title: '网络连接故障排除',
          url: '/help/network-troubleshooting',
          type: 'tutorial',
          description: '详细的网络问题解决指南'
        });
        break;
        
      case 'skill':
        links.push({
          title: '技能系统使用指南',
          url: '/help/skills-guide',
          type: 'documentation',
          description: '了解技能系统的使用方法'
        });
        break;
        
      case 'permission':
        links.push({
          title: '权限管理说明',
          url: '/help/permissions',
          type: 'documentation',
          description: '了解系统权限设置'
        });
        break;
    }
    
    // 联系支持
    links.push({
      title: '联系技术支持',
      url: '/support/contact',
      type: 'support',
      description: '获得专业技术支持'
    });
    
    return links;
  }

  /**
   * 函数级注释：估算解决时间
   * 根据错误分类估算解决时间
   */
  private estimateResolutionTime(classification: ErrorClassification): string {
    switch (classification.severity) {
      case ErrorSeverity.LOW:
        return '1-5分钟';
      case ErrorSeverity.MEDIUM:
        return '5-15分钟';
      case ErrorSeverity.HIGH:
        return '15分钟-1小时';
      case ErrorSeverity.CRITICAL:
        return '1-24小时';
      default:
        return '未知';
    }
  }

  /**
   * 函数级注释：确定影响范围
   * 根据错误分类确定影响范围
   */
  private determineImpactScope(classification: ErrorClassification): 'user' | 'feature' | 'system' | 'global' {
    switch (classification.category) {
      case 'validation':
      case 'permission':
        return 'user';
      case 'skill':
      case 'game_state':
        return 'feature';
      case 'network':
      case 'data':
        return 'system';
      default:
        return 'global';
    }
  }

  /**
   * 函数级注释：获取错误图标
   * 根据严重级别返回对应图标
   */
  private getErrorIcon(severity: ErrorSeverity): React.ReactNode {
    switch (severity) {
      case ErrorSeverity.LOW:
        return <Info className="w-5 h-5" />;
      case ErrorSeverity.MEDIUM:
        return <AlertTriangle className="w-5 h-5" />;
      case ErrorSeverity.HIGH:
        return <XCircle className="w-5 h-5" />;
      case ErrorSeverity.CRITICAL:
        return <Bug className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  }

  /**
   * 函数级注释：获取颜色主题
   * 根据严重级别返回对应颜色主题
   */
  private getColorTheme(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.LOW:
        return 'blue';
      case ErrorSeverity.MEDIUM:
        return 'yellow';
      case ErrorSeverity.HIGH:
        return 'red';
      case ErrorSeverity.CRITICAL:
        return 'purple';
      default:
        return 'gray';
    }
  }

  /**
   * 函数级注释：收集用户反馈
   * 收集用户对错误处理的反馈
   */
  public async collectFeedback(feedback: Omit<ErrorFeedback, 'timestamp' | 'userAgent' | 'pageUrl'>): Promise<void> {
    const completeFeedback: ErrorFeedback = {
      ...feedback,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href
    };
    
    this.feedbackHistory.push(completeFeedback);
    
    // 这里可以添加发送反馈到服务器的逻辑
    console.log('用户反馈已收集:', completeFeedback);
  }

  /**
   * 函数级注释：更新解决方案成功率
   * 根据用户反馈更新解决方案的成功率
   */
  public updateSolutionSuccessRate(solutionId: string, success: boolean): void {
    const currentRate = this.solutionSuccessRates.get(solutionId) || 0.5;
    const newRate = success ? Math.min(currentRate + 0.1, 1.0) : Math.max(currentRate - 0.1, 0.0);
    this.solutionSuccessRates.set(solutionId, newRate);
  }

  /**
   * 函数级注释：生成错误ID
   * 生成唯一的错误标识符
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 函数级注释：更新配置
   * 动态更新显示配置
   */
  public updateConfig(newConfig: Partial<ErrorDisplayConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * 函数级注释：获取反馈历史
   * 获取用户反馈历史记录
   */
  public getFeedbackHistory(): ErrorFeedback[] {
    return [...this.feedbackHistory];
  }

  /**
   * 函数级注释：获取解决方案统计
   * 获取解决方案成功率统计
   */
  public getSolutionStats(): Map<string, number> {
    return new Map(this.solutionSuccessRates);
  }
}

/**
 * 函数级注释：创建增强用户错误界面Hook
 * React Hook，用于在组件中使用增强的错误界面
 */
export function useEnhancedUserErrorInterface(config?: Partial<ErrorDisplayConfig>) {
  const [interface] = useState(() => EnhancedUserErrorInterface.getInstance(config));

  const showError = useCallback((error: any, classification: ErrorClassification) => {
    return interface.generateUserFriendlyError(error, classification);
  }, [interface]);

  const collectFeedback = useCallback((feedback: Omit<ErrorFeedback, 'timestamp' | 'userAgent' | 'pageUrl'>) => {
    return interface.collectFeedback(feedback);
  }, [interface]);

  const updateSolutionSuccess = useCallback((solutionId: string, success: boolean) => {
    interface.updateSolutionSuccessRate(solutionId, success);
  }, [interface]);

  return {
    showError,
    collectFeedback,
    updateSolutionSuccess,
    updateConfig: interface.updateConfig.bind(interface),
    getFeedbackHistory: interface.getFeedbackHistory.bind(interface),
    getSolutionStats: interface.getSolutionStats.bind(interface)
  };
}