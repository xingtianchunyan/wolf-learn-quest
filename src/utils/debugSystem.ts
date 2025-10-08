/**
 * @fileoverview 统一调试系统 - 提供全局调试、日志记录和状态追踪功能
 * @author SOLO Coding
 * @version 1.0.0
 */

/**
 * 调试级别枚举
 */
export enum DebugLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4
}

/**
 * 调试配置接口
 */
export interface DebugConfig {
  /** 是否启用调试 */
  enabled: boolean;
  /** 调试级别 */
  level: DebugLevel;
  /** 是否显示时间戳 */
  showTimestamp: boolean;
  /** 是否显示调用栈 */
  showStack: boolean;
  /** 是否保存到本地存储 */
  persistLogs: boolean;
  /** 最大日志条数 */
  maxLogs: number;
  /** 启用的模块 */
  enabledModules: string[];
  /** 禁用的模块 */
  disabledModules: string[];
}

/**
 * 调试日志条目接口
 */
export interface DebugLogEntry {
  /** 时间戳 */
  timestamp: number;
  /** 调试级别 */
  level: DebugLevel;
  /** 模块名称 */
  module: string;
  /** 消息 */
  message: string;
  /** 数据 */
  data?: any;
  /** 调用栈 */
  stack?: string;
  /** 用户ID */
  userId?: string;
  /** 会话ID */
  sessionId?: string;
}

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  /** 开始时间 */
  startTime: number;
  /** 结束时间 */
  endTime?: number;
  /** 持续时间 */
  duration?: number;
  /** 内存使用 */
  memoryUsage?: number;
  /** 标签 */
  label: string;
  /** 模块 */
  module: string;
}

/**
 * 状态快照接口
 */
export interface StateSnapshot {
  /** 时间戳 */
  timestamp: number;
  /** 模块名称 */
  module: string;
  /** 状态数据 */
  state: any;
  /** 操作类型 */
  action?: string;
  /** 用户ID */
  userId?: string;
}

/**
 * 统一调试系统类
 */
export class DebugSystem {
  private static instance: DebugSystem;
  private config: DebugConfig;
  private logs: DebugLogEntry[] = [];
  private performanceMetrics: Map<string, PerformanceMetrics> = new Map();
  private stateSnapshots: StateSnapshot[] = [];
  private sessionId: string;

  /**
   * 构造函数
   */
  private constructor() {
    this.sessionId = this.generateSessionId();
    this.config = this.getDefaultConfig();
    this.loadConfig();
    this.setupGlobalErrorHandler();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): DebugSystem {
    if (!DebugSystem.instance) {
      DebugSystem.instance = new DebugSystem();
    }
    return DebugSystem.instance;
  }

  /**
   * 获取默认配置
   */
  private getDefaultConfig(): DebugConfig {
    return {
      enabled: process.env.NODE_ENV === 'development',
      level: DebugLevel.DEBUG,
      showTimestamp: true,
      showStack: false,
      persistLogs: true,
      maxLogs: 1000,
      enabledModules: [],
      disabledModules: []
    };
  }

  /**
   * 加载配置
   */
  private loadConfig(): void {
    try {
      const savedConfig = localStorage.getItem('debug-config');
      if (savedConfig) {
        this.config = { ...this.config, ...JSON.parse(savedConfig) };
      }
    } catch (error) {
      console.warn('Failed to load debug config:', error);
    }
  }

  /**
   * 保存配置
   */
  private saveConfig(): void {
    try {
      localStorage.setItem('debug-config', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save debug config:', error);
    }
  }

  /**
   * 生成会话ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 设置全局错误处理器
   */
  private setupGlobalErrorHandler(): void {
    window.addEventListener('error', (event) => {
      this.error('Global', 'Uncaught error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.error('Global', 'Unhandled promise rejection', {
        reason: event.reason
      });
    });
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<DebugConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.saveConfig();
  }

  /**
   * 获取配置
   */
  public getConfig(): DebugConfig {
    return { ...this.config };
  }

  /**
   * 检查模块是否启用
   */
  private isModuleEnabled(module: string): boolean {
    if (this.config.disabledModules.includes(module)) {
      return false;
    }
    if (this.config.enabledModules.length > 0) {
      return this.config.enabledModules.includes(module);
    }
    return true;
  }

  /**
   * 检查日志级别
   */
  private shouldLog(level: DebugLevel): boolean {
    return this.config.enabled && level <= this.config.level;
  }

  /**
   * 添加日志条目
   */
  private addLogEntry(level: DebugLevel, module: string, message: string, data?: any): void {
    if (!this.shouldLog(level) || !this.isModuleEnabled(module)) {
      return;
    }

    const entry: DebugLogEntry = {
      timestamp: Date.now(),
      level,
      module,
      message,
      data,
      sessionId: this.sessionId
    };

    if (this.config.showStack) {
      entry.stack = new Error().stack;
    }

    this.logs.push(entry);

    // 限制日志数量
    if (this.logs.length > this.config.maxLogs) {
      this.logs = this.logs.slice(-this.config.maxLogs);
    }

    // 输出到控制台
    this.outputToConsole(entry);

    // 持久化日志
    if (this.config.persistLogs) {
      this.persistLog(entry);
    }
  }

  /**
   * 输出到控制台
   */
  private outputToConsole(entry: DebugLogEntry): void {
    const timestamp = this.config.showTimestamp 
      ? `[${new Date(entry.timestamp).toISOString()}]` 
      : '';
    
    const prefix = `${timestamp}[${DebugLevel[entry.level]}][${entry.module}]`;
    const message = `${prefix} ${entry.message}`;

    switch (entry.level) {
      case DebugLevel.ERROR:
        console.error(message, entry.data);
        break;
      case DebugLevel.WARN:
        console.warn(message, entry.data);
        break;
      case DebugLevel.INFO:
        console.info(message, entry.data);
        break;
      case DebugLevel.DEBUG:
        console.debug(message, entry.data);
        break;
      case DebugLevel.TRACE:
        console.trace(message, entry.data);
        break;
    }
  }

  /**
   * 持久化日志
   */
  private persistLog(entry: DebugLogEntry): void {
    try {
      const logs = this.getPersistedLogs();
      logs.push(entry);
      
      // 限制持久化日志数量
      const maxPersistedLogs = this.config.maxLogs * 2;
      if (logs.length > maxPersistedLogs) {
        logs.splice(0, logs.length - maxPersistedLogs);
      }
      
      localStorage.setItem('debug-logs', JSON.stringify(logs));
    } catch (error) {
      console.warn('Failed to persist log:', error);
    }
  }

  /**
   * 获取持久化日志
   */
  private getPersistedLogs(): DebugLogEntry[] {
    try {
      const logs = localStorage.getItem('debug-logs');
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.warn('Failed to get persisted logs:', error);
      return [];
    }
  }

  /**
   * 错误日志
   */
  public error(module: string, message: string, data?: any): void {
    this.addLogEntry(DebugLevel.ERROR, module, message, data);
  }

  /**
   * 警告日志
   */
  public warn(module: string, message: string, data?: any): void {
    this.addLogEntry(DebugLevel.WARN, module, message, data);
  }

  /**
   * 信息日志
   */
  public info(module: string, message: string, data?: any): void {
    this.addLogEntry(DebugLevel.INFO, module, message, data);
  }

  /**
   * 调试日志
   */
  public debug(module: string, message: string, data?: any): void {
    this.addLogEntry(DebugLevel.DEBUG, module, message, data);
  }

  /**
   * 跟踪日志
   */
  public trace(module: string, message: string, data?: any): void {
    this.addLogEntry(DebugLevel.TRACE, module, message, data);
  }

  /**
   * 开始性能测量
   */
  public startPerformance(label: string, module: string): void {
    const metrics: PerformanceMetrics = {
      startTime: performance.now(),
      label,
      module,
      memoryUsage: (performance as any).memory?.usedJSHeapSize
    };
    
    this.performanceMetrics.set(label, metrics);
    this.debug(module, `Performance measurement started: ${label}`);
  }

  /**
   * 结束性能测量
   */
  public endPerformance(label: string): PerformanceMetrics | null {
    const metrics = this.performanceMetrics.get(label);
    if (!metrics) {
      this.warn('Performance', `No performance measurement found for label: ${label}`);
      return null;
    }

    metrics.endTime = performance.now();
    metrics.duration = metrics.endTime - metrics.startTime;
    
    if ((performance as any).memory) {
      const currentMemory = (performance as any).memory.usedJSHeapSize;
      metrics.memoryUsage = currentMemory - (metrics.memoryUsage || 0);
    }

    this.info(metrics.module, `Performance measurement completed: ${label}`, {
      duration: `${metrics.duration.toFixed(2)}ms`,
      memoryUsage: metrics.memoryUsage ? `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB` : 'N/A'
    });

    this.performanceMetrics.delete(label);
    return metrics;
  }

  /**
   * 记录状态快照
   */
  public captureState(module: string, state: any, action?: string, userId?: string): void {
    const snapshot: StateSnapshot = {
      timestamp: Date.now(),
      module,
      state: JSON.parse(JSON.stringify(state)), // 深拷贝
      action,
      userId
    };

    this.stateSnapshots.push(snapshot);

    // 限制快照数量
    if (this.stateSnapshots.length > 100) {
      this.stateSnapshots = this.stateSnapshots.slice(-100);
    }

    this.debug(module, `State captured${action ? ` for action: ${action}` : ''}`, {
      stateSize: JSON.stringify(state).length,
      userId
    });
  }

  /**
   * 获取日志
   */
  public getLogs(filter?: {
    level?: DebugLevel;
    module?: string;
    startTime?: number;
    endTime?: number;
  }): DebugLogEntry[] {
    let filteredLogs = [...this.logs];

    if (filter) {
      if (filter.level !== undefined) {
        filteredLogs = filteredLogs.filter(log => log.level <= filter.level!);
      }
      if (filter.module) {
        filteredLogs = filteredLogs.filter(log => log.module === filter.module);
      }
      if (filter.startTime) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filter.startTime!);
      }
      if (filter.endTime) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filter.endTime!);
      }
    }

    return filteredLogs;
  }

  /**
   * 获取性能指标
   */
  public getPerformanceMetrics(): PerformanceMetrics[] {
    return Array.from(this.performanceMetrics.values());
  }

  /**
   * 获取状态快照
   */
  public getStateSnapshots(module?: string): StateSnapshot[] {
    if (module) {
      return this.stateSnapshots.filter(snapshot => snapshot.module === module);
    }
    return [...this.stateSnapshots];
  }

  /**
   * 清除日志
   */
  public clearLogs(): void {
    this.logs = [];
    try {
      localStorage.removeItem('debug-logs');
    } catch (error) {
      console.warn('Failed to clear persisted logs:', error);
    }
    this.info('Debug', 'Logs cleared');
  }

  /**
   * 清除性能指标
   */
  public clearPerformanceMetrics(): void {
    this.performanceMetrics.clear();
    this.info('Debug', 'Performance metrics cleared');
  }

  /**
   * 清除状态快照
   */
  public clearStateSnapshots(): void {
    this.stateSnapshots = [];
    this.info('Debug', 'State snapshots cleared');
  }

  /**
   * 导出调试数据
   */
  public exportDebugData(): {
    config: DebugConfig;
    logs: DebugLogEntry[];
    performanceMetrics: PerformanceMetrics[];
    stateSnapshots: StateSnapshot[];
    sessionId: string;
  } {
    return {
      config: this.config,
      logs: this.logs,
      performanceMetrics: Array.from(this.performanceMetrics.values()),
      stateSnapshots: this.stateSnapshots,
      sessionId: this.sessionId
    };
  }

  /**
   * 创建模块调试器
   */
  public createModuleDebugger(moduleName: string) {
    return {
      error: (message: string, data?: any) => this.error(moduleName, message, data),
      warn: (message: string, data?: any) => this.warn(moduleName, message, data),
      info: (message: string, data?: any) => this.info(moduleName, message, data),
      debug: (message: string, data?: any) => this.debug(moduleName, message, data),
      trace: (message: string, data?: any) => this.trace(moduleName, message, data),
      startPerformance: (label: string) => this.startPerformance(label, moduleName),
      endPerformance: (label: string) => this.endPerformance(label),
      captureState: (state: any, action?: string, userId?: string) => 
        this.captureState(moduleName, state, action, userId)
    };
  }
}

// 导出全局调试实例
export const debugSystem = DebugSystem.getInstance();

// 导出便捷函数
export const createDebugger = (moduleName: string) => 
  debugSystem.createModuleDebugger(moduleName);