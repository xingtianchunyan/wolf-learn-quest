/**
 * 统一日志管理工具
 * 替换项目中的 console.log 使用
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogContext {
  component?: string;
  function?: string;
  userId?: string;
  roomId?: string;
  gameStateId?: string;
  [key: string]: any;
}

class Logger {
  private level: LogLevel;
  private isProduction: boolean;

  constructor() {
    this.level = process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG;
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextStr = context ? JSON.stringify(context) : '';
    
    return `[${timestamp}] [${levelName}] ${message} ${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: LogContext, ...args: any[]): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, context);
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, ...args);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, ...args);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, ...args);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, ...args);
        break;
    }

    // 在生产环境中，可以发送到日志服务
    if (this.isProduction && level >= LogLevel.ERROR) {
      this.sendToLogService(level, message, context, args);
    }
  }

  private sendToLogService(level: LogLevel, message: string, context?: LogContext, args?: any[]): void {
    // 在这里实现发送到外部日志服务的逻辑
    // 例如发送到 Supabase Edge Functions 进行日志收集
  }

  debug(message: string, context?: LogContext, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, context, ...args);
  }

  info(message: string, context?: LogContext, ...args: any[]): void {
    this.log(LogLevel.INFO, message, context, ...args);
  }

  warn(message: string, context?: LogContext, ...args: any[]): void {
    this.log(LogLevel.WARN, message, context, ...args);
  }

  error(message: string, context?: LogContext, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, context, ...args);
  }

  // 业务特定的日志方法
  gameAction(action: string, details: any, context?: LogContext): void {
    this.info(`Game Action: ${action}`, { 
      ...context, 
      action, 
      details,
      category: 'game'
    });
  }

  skillUsage(skillName: string, userId: string, targetId?: string, context?: LogContext): void {
    this.info(`Skill Used: ${skillName}`, {
      ...context,
      skillName,
      userId,
      targetId,
      category: 'skill'
    });
  }

  userAction(action: string, userId: string, details?: any, context?: LogContext): void {
    this.info(`User Action: ${action}`, {
      ...context,
      action,
      userId,
      details,
      category: 'user'
    });
  }

  systemEvent(event: string, details?: any, context?: LogContext): void {
    this.info(`System Event: ${event}`, {
      ...context,
      event,
      details,
      category: 'system'
    });
  }
}

// 导出单例实例
export const logger = new Logger();

// 导出便捷方法
export const log = {
  debug: logger.debug.bind(logger),
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
  gameAction: logger.gameAction.bind(logger),
  skillUsage: logger.skillUsage.bind(logger),
  userAction: logger.userAction.bind(logger),
  systemEvent: logger.systemEvent.bind(logger)
};