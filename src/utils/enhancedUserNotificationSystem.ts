import { createLogger  } from '@/lib/logger';
import { ErrorSeverity  } from './unifiedErrorHandler';

/**
* 文件级注释：增强的用户通知系统
* 提供统一的用户友好错误提示和通知机制
* 支持多种通知类型、自定义样式和交互操作
 */

const logger = createLogger('enhanced-user-notification');

/**
* 通知类型枚举
 */
export enum NotificationType { SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  LOADING = 'loading';,
}

/**
* 通知位置枚举
 */
export enum NotificationPosition { TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center';,
}

/**
* 通知动作接口
 */
export interface NotificationAction { /** 动作标签  */
  label: string;
  /** 动作处理函数  */
  action: () => void | Promise<void>;
  /** 动作样式  */
  style?: 'primary' | 'secondary' | 'danger';
  /** 是否在执行后关闭通知  */
  closeAfterAction?: boolean;,
}

/**
* 通知配置接口
 */
export interface NotificationConfig { /** 通知ID  */
  id?: string;
  /** 通知类型  */
  type: NotificationType;
  /** 标题  */
  title?: string;
  /** 消息内容  */
  message: string;
  /** 显示时长（毫秒），0表示不自动关闭  */
  duration?: number;
  /** 是否可关闭  */
  closable?: boolean;
  /** 通知位置  */
  position?: NotificationPosition;
  /** 图标  */
  icon?: string;
  /** 自定义CSS类  */
  className?: string;
  /** 动作按钮  */
  actions?: NotificationAction[];
  /** 是否显示进度条  */
  showProgress?: boolean;
  /** 点击回调  */
  onClick?: () => void;
  /** 关闭回调  */
  onClose?: () => void;
  /** 是否持久化（页面刷新后保留）  */
  persistent?: boolean;
  /** 优先级（数字越大优先级越高）  */
  priority?: number;,
}

/**
* 通知实例接口
 */
export interface NotificationInstance { /** 通知ID  */
  id: string;
  /** 通知配置  */
  config: NotificationConfig;
  /** 创建时间  */
  createdAt: Date;
  /** 是否已显示  */
  shown: boolean;
  /** 是否已关闭  */
  closed: boolean;
  /** 关闭通知  */
  close: () => void;
  /** 更新通知  */
  update: (config: Partial<NotificationConfig>) => void;,
}

/**
* 通知队列管理器接口
 */
interface NotificationQueue { /** 添加通知到队列  */
  add: (notification: NotificationInstance) => void;
  /** 从队列中移除通知  */
  remove: (id: string) => void;
  /** 获取队列中的通知  */
  get: (id: string) => NotificationInstance | undefined;
  /** 获取所有通知  */
  getAll: () => NotificationInstance[];
  /** 清空队列  */
  clear: () => void;
  /** 按位置分组获取通知  */
  getByPosition: (position: NotificationPosition) => NotificationInstance[];,
}

/**
* 增强的用户通知系统类
 */
export class EnhancedUserNotificationSystem { private static instance: EnhancedUserNotificationSystem;
  private notifications = new Map<string, NotificationInstance>();
  private queue: NotificationQueue;
  private maxNotifications = 5;
  private defaultDuration = 5000;
  private defaultPosition = NotificationPosition.TOP_RIGHT;
  private notificationContainer: HTMLElement | null = null;

  private constructor() {
    this.initializeQueue();
    this.initializeContainer();
    this.loadPersistedNotifications();

    logger.info('增强的用户通知系统已初始化');,
}

  /**
  * 获取单例实例
   */
  public static getInstance(): EnhancedUserNotificationSystem { if (!EnhancedUserNotificationSystem.instance) {
      EnhancedUserNotificationSystem.instance = new EnhancedUserNotificationSystem();,
}
    return EnhancedUserNotificationSystem.instance;,
}

  /**
  * 显示通知
  * @param config - 通知配置
  * @returns 通知实例
   */
  public show(config: NotificationConfig): NotificationInstance { const id = config.id || this.generateNotificationId();
    const notification = this.createNotification(id, config);

    // 检查是否超过最大通知数量
    this.enforceMaxNotifications();

    // 添加到队列
    this.queue.add(notification);

    // 渲染通知
    this.renderNotification(notification);

    // 设置自动关闭
    if (config.duration !== 0) {
      this.scheduleAutoClose(notification, config.duration || this.defaultDuration);,
}

    // 持久化通知
    if (config.persistent) { this.persistNotification(notification);,
}

    logger.debug('显示通知', { id, type: config.type, message: config.message  });

    return notification;,
}

  /**
  * 显示成功通知
  * @param message - 消息内容
  * @param options - 额外选项
   */
  public success(message: string, options: Partial<NotificationConfig> = {}): NotificationInstance { return this.show({
      type: NotificationType.SUCCESS,
      message,
      icon: '✅',
      duration: 3000,
      ...options,
});,
}

  /**
  * 显示错误通知
  * @param message - 消息内容
  * @param options - 额外选项
   */
  public error(message: string, options: Partial<NotificationConfig> = {}): NotificationInstance { return this.show({
      type: NotificationType.ERROR,
      message,
      icon: '❌',
      duration: 7000,
      closable: true,
      ...options,
});,
}

  /**
  * 显示警告通知
  * @param message - 消息内容
  * @param options - 额外选项
   */
  public warning(message: string, options: Partial<NotificationConfig> = {}): NotificationInstance { return this.show({
      type: NotificationType.WARNING,
      message,
      icon: '⚠️',
      duration: 5000,
      ...options,
});,
}

  /**
  * 显示信息通知
  * @param message - 消息内容
  * @param options - 额外选项
   */
  public info(message: string, options: Partial<NotificationConfig> = {}): NotificationInstance { return this.show({
      type: NotificationType.INFO,
      message,
      icon: 'ℹ️',
      duration: 4000,
      ...options,
});,
}

  /**
  * 显示加载通知
  * @param message - 消息内容
  * @param options - 额外选项
   */
  public loading(message: string, options: Partial<NotificationConfig> = {}): NotificationInstance { return this.show({
      type: NotificationType.LOADING,
      message,
      icon: '⏳',
      duration: 0, // 不自动关闭
      closable: false,
      showProgress: true,
      ...options,
});,
}

  /**
  * 根据错误严重级别显示通知
  * @param message - 消息内容
  * @param severity - 错误严重级别
  * @param options - 额外选项
   */
  public showBySeverity(
    message: string,
    severity: ErrorSeverity,
    options: Partial<NotificationConfig> = {}
  ): NotificationInstance { switch (severity) {
      case ErrorSeverity.CRITICAL:
      return this.error(message, {
        title: '严重错误',
        duration: 10000,
        persistent: true,
        priority: 10,
        ...options,
});

      case ErrorSeverity.HIGH:
      return this.error(message, { title: '错误',
        duration: 7000,
        priority: 8,
        ...options,
});

      case ErrorSeverity.MEDIUM:
      return this.warning(message, { title: '警告',
        duration: 5000,
        priority: 5,
        ...options,
});

      case ErrorSeverity.LOW:
      return this.info(message, { title: '提示',
        duration: 3000,
        priority: 2,
        ...options,
});

      default:
      return this.info(message, options);,
}
  }

  /**
  * 关闭通知
  * @param id - 通知ID
   */
  public close(id: string): void { const notification = this.notifications.get(id);
    if (notification && !notification.closed) {
      notification.close();,
}
  }

  /**
  * 关闭所有通知
  * @param type - 可选的通知类型过滤
   */
  public closeAll(type?: NotificationType): void { this.notifications.forEach(notification => {
      if (!type || notification.config.type === type) {
        notification.close();,
}
    });,
}

  /**
  * 更新通知
  * @param id - 通知ID
  * @param config - 新的配置
   */
  public update(id: string, config: Partial<NotificationConfig>): void { const notification = this.notifications.get(id);
    if (notification) {
      notification.update(config);,
}
  }

  /**
  * 获取通知实例
  * @param id - 通知ID
   */
  public get(id: string): NotificationInstance | undefined { return this.notifications.get(id);,
}

  /**
  * 获取所有通知
   */
  public getAll(): NotificationInstance[] { return Array.from(this.notifications.values());,
}

  /**
  * 设置最大通知数量
  * @param max - 最大数量
   */
  public setMaxNotifications(max: number): void { this.maxNotifications = max;
    this.enforceMaxNotifications();,
}

  /**
  * 设置默认持续时间
  * @param duration - 持续时间（毫秒）
   */
  public setDefaultDuration(duration: number): void { this.defaultDuration = duration;,
}

  /**
  * 设置默认位置
  * @param position - 通知位置
   */
  public setDefaultPosition(position: NotificationPosition): void { this.defaultPosition = position;,
}

  /**
  * 清理已关闭的通知
   */
  public cleanup(): void { const closedNotifications = Array.from(this.notifications.values());
    .filter(notification => notification.closed);

    closedNotifications.forEach(notification => {
      this.notifications.delete(notification.id);
      this.queue.remove(notification.id);,
});

    logger.debug('清理已关闭的通知', { count: closedNotifications.length  });,
}

  /**
  * 获取通知统计信息
   */
  public getStats() { const notifications = Array.from(this.notifications.values());
    const byType = notifications.reduce((acc, notification) => {
      acc[notification.config.type] = (acc[notification.config.type] || 0) + 1;
      return acc;,
}, {} as Record<NotificationType, number>);

    return { total: notifications.length,
      active: notifications.filter(n => !n.closed).length,
      byType,
      persistent: notifications.filter(n => n.config.persistent).length;,
};,
}

  /**
  * 初始化队列管理器
   */
  private initializeQueue(): void { this.queue = {
      add: (notification: NotificationInstance) => {
        this.notifications.set(notification.id, notification);,
},

      remove: (id: string) => { this.notifications.delete(id);,
},

      get: (id: string) => { return this.notifications.get(id);,
},

      getAll: () => { return Array.from(this.notifications.values());,
},

      clear: () => { this.notifications.clear();,
},

      getByPosition: (position: NotificationPosition) => { return Array.from(this.notifications.values());
        .filter(notification =>;
        (notification.config.position || this.defaultPosition) === position;
      );,
}
  };,
}

/**
* 初始化通知容器
 */
private initializeContainer(): void { // 检查是否已存在容器
  this.notificationContainer = document.getElementById('notification-container');

  if (!this.notificationContainer) {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.id = 'notification-container';
    this.notificationContainer.style.cssText = `;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 9999;
    `;
    document.body.appendChild(this.notificationContainer);,
}
}

/**
* 创建通知实例
 */
private createNotification(id: string, config: NotificationConfig): NotificationInstance { const notification: NotificationInstance = {
    id,
    config: {
      position: this.defaultPosition,
      closable: true,
      ...config,
},
    createdAt: new Date(),
    shown: false,
    closed: false,

    close: () => { if (!notification.closed) {
        notification.closed = true;
        this.removeNotificationElement(id);

        if (config.onClose) {
          config.onClose();,
}

        // 移除持久化
        if (config.persistent) { this.removePersistentNotification(id);,
}

        logger.debug('关闭通知', { id  });,
}
    },

    update: (newConfig: Partial<NotificationConfig>) => { notification.config = { ...notification.config, ...newConfig  };
      this.updateNotificationElement(notification);

      logger.debug('更新通知', { id, config: newConfig  });,
}
  };

  return notification;,
}

/**
* 渲染通知
 */
private renderNotification(notification: NotificationInstance): void { if (!this.notificationContainer) return;

  const element = this.createNotificationElement(notification);
  const positionContainer = this.getOrCreatePositionContainer(;
    notification.config.position || this.defaultPosition
  );

  positionContainer.appendChild(element);
  notification.shown = true;

  // 添加进入动画
  requestAnimationFrame(() => {
    element.classList.add('notification-enter');,
});

  if (notification.config.onClick) { element.addEventListener('click', notification.config.onClick);,
}
}

/**
* 创建通知元素
 */
private createNotificationElement(notification: NotificationInstance): HTMLElement { const { config  } = notification;
  const element = document.createElement('div');

  element.id = `notification-${ notification.id }`;
  element.className = `notification notification-${ config.type } ${ config.className || '' }`;
  element.style.cssText = `;
  background: ${ this.getNotificationBackground(config.type) };
  color: ${ this.getNotificationColor(config.type) };
  border: 1px solid ${ this.getNotificationBorder(config.type) };
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  max-width: 400px;
  min-width: 300px;
  position: relative;
  transform: translateX(100%);
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  `;

  // 构建通知内容
  let content = '';

  if (config.icon) { content += `<span class='notification-icon' style='margin-right: 8px; font-size: 16px;'>${config.icon }</span>`;,
}

  if (config.title) { content += `<div class='notification-title' style='font-weight: 600; margin-bottom: 4px;'>${config.title }</div>`;,
}

  content += `<div class='notification-message'>${ config.message }</div>`;

  if (config.actions && config.actions.length > 0) { content += '<div class='notification-actions' style='margin-top: 12px; display: flex; gap: 8px;'>';
    config.actions.forEach((action, index) => {
      const buttonStyle = this.getActionButtonStyle(action.style || 'secondary');
      content += `;
      <button
      class='notification-action';
      data-action-index='${index }';
      style='${ buttonStyle }';
      >
      ${ action.label }
      </button>
      `;,
});
    content += '</div>';,
}

  if (config.closable) { content += `;
    <button
    class='notification-close';
    style=';
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    padding: 4px;
    line-height: 1;
    '
    >
    ×
    </button>
    `;,
}

  if (config.showProgress) { content += `;
    <div class='notification-progress' style=';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0 0 8px 8px;
    '>
    <div class='notification-progress-bar' style=';
    height: 100%;
    background: currentColor;
    width: 0%;
    transition: width 0.1s ease;
    border-radius: 0 0 8px 8px;
    '></div>
    </div>
    `;,
}

  element.innerHTML = content;

  // 绑定事件
  this.bindNotificationEvents(element, notification);

  return element;,
}

/**
* 绑定通知事件
 */
private bindNotificationEvents(element: HTMLElement, notification: NotificationInstance): void { // 关闭按钮事件
  const closeButton = element.querySelector('.notification-close');
  if (closeButton) {
    closeButton.addEventListener('click', e => {
      e.stopPropagation();
      notification.close();,
});,
}

  // 动作按钮事件
  const actionButtons = element.querySelectorAll('.notification-action');
  actionButtons.forEach((button, index) => { button.addEventListener('click', async e => {
      e.stopPropagation();

      const action = notification.config.actions?.[index];
      if (action) {
        try {
          await action.action();

          if (action.closeAfterAction !== false) {
            notification.close();,
}
        } catch (error) { logger.error('通知动作执行失败', error);,
}
      },
});,
});,
}

/**
* 获取或创建位置容器
 */
private getOrCreatePositionContainer(position: NotificationPosition): HTMLElement { if (!this.notificationContainer) {
    throw new Error('通知容器未初始化');,
}

  const containerId = `notification-position-${ position }`;
  let container = document.getElementById(containerId);

  if (!container) { container = document.createElement('div');
    container.id = containerId;
    container.className = `notification-position-container notification-${position }`;
    container.style.cssText = this.getPositionContainerStyle(position);

    this.notificationContainer.appendChild(container);,
}

  return container;,
}

/**
* 获取位置容器样式
 */
private getPositionContainerStyle(position: NotificationPosition): string { const baseStyle = `;
  position: absolute;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 1000;
  `;

  switch (position) {
    case NotificationPosition.TOP_RIGHT:
    return baseStyle + 'top: 20px; right: 20px;';
    case NotificationPosition.TOP_LEFT:
    return baseStyle + 'top: 20px; left: 20px;';
    case NotificationPosition.TOP_CENTER:
    return baseStyle + 'top: 20px; left: 50%; transform: translateX(-50%);';
    case NotificationPosition.BOTTOM_RIGHT:
    return baseStyle + 'bottom: 20px; right: 20px; flex-direction: column-reverse;';
    case NotificationPosition.BOTTOM_LEFT:
    return baseStyle + 'bottom: 20px; left: 20px; flex-direction: column-reverse;';
    case NotificationPosition.BOTTOM_CENTER:
    return baseStyle + 'bottom: 20px; left: 50%; transform: translateX(-50%); flex-direction: column-reverse;';
    default:
    return baseStyle + 'top: 20px; right: 20px;';,
}
}

/**
* 更新通知元素
 */
private updateNotificationElement(notification: NotificationInstance): void { const element = document.getElementById(`notification-${notification.id }`);
  if (element) { // 重新创建元素内容
    const newElement = this.createNotificationElement(notification);
    element.innerHTML = newElement.innerHTML;

    // 重新绑定事件
    this.bindNotificationEvents(element, notification);,
}
}

/**
* 移除通知元素
 */
private removeNotificationElement(id: string): void { const element = document.getElementById(`notification-${id }`);
  if (element) { element.classList.add('notification-exit');

    setTimeout(() => {
      element.remove();,
}, 300);,
}
}

/**
* 安排自动关闭
 */
private scheduleAutoClose(notification: NotificationInstance, duration: number): void { setTimeout(() => {
    if (!notification.closed) {
      notification.close();,
}
  }, duration);

  // 如果显示进度条，更新进度
  if (notification.config.showProgress) { this.updateProgress(notification.id, duration);,
}
}

/**
* 更新进度条
 */
private updateProgress(notificationId: string, duration: number): void { const element = document.getElementById(`notification-${notificationId }`);
  const progressBar = element?.querySelector('.notification-progress-bar') as HTMLElement;

  if (progressBar) { const startTime = Date.now();
    const updateInterval = 100;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      progressBar.style.width = `${progress }%`;

      if (progress < 100) { setTimeout(updateProgress, updateInterval);,
}
    };

    updateProgress();,
}
}

/**
* 强制执行最大通知数量限制
 */
private enforceMaxNotifications(): void { const activeNotifications = Array.from(this.notifications.values());
  .filter(notification => !notification.closed);
  .sort((a, b) => {
    // 按优先级和创建时间排序
    const priorityDiff = (b.config.priority || 0) - (a.config.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;
    return a.createdAt.getTime() - b.createdAt.getTime();,
});

  while (activeNotifications.length >= this.maxNotifications) { const oldestNotification = activeNotifications.pop();
    if (oldestNotification) {
      oldestNotification.close();,
}
  },
}

/**
* 持久化通知
 */
private persistNotification(notification: NotificationInstance): void { try {
    const persistedNotifications = this.getPersistedNotifications();
    persistedNotifications[notification.id] = {
      config: notification.config,
      createdAt: notification.createdAt.toISOString(),
};

    localStorage.setItem('persistedNotifications', JSON.stringify(persistedNotifications));,
} catch (error) { logger.error('持久化通知失败', error);,
}
}

/**
* 移除持久化通知
 */
private removePersistentNotification(id: string): void { try {
    const persistedNotifications = this.getPersistedNotifications();
    delete persistedNotifications[id];

    localStorage.setItem('persistedNotifications', JSON.stringify(persistedNotifications));,
} catch (error) { logger.error('移除持久化通知失败', error);,
}
}

/**
* 获取持久化通知
 */
private getPersistedNotifications(): Record<string, any> { try {
    const stored = localStorage.getItem('persistedNotifications');
    return stored ? JSON.parse(stored) : { };,
} catch (error) { logger.error('获取持久化通知失败', error);
    return { };,
}
}

/**
* 加载持久化通知
 */
private loadPersistedNotifications(): void { try {
    const persistedNotifications = this.getPersistedNotifications();

    Object.entries(persistedNotifications).forEach(([id, data]: [string, any]) => {
      // 检查通知是否过期（24小时）
      const createdAt = new Date(data.createdAt);
      const now = new Date();
      const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        this.show({ ...data.config, id  });,
} else { // 清理过期的持久化通知
        this.removePersistentNotification(id);,
}
    });,
} catch (error) { logger.error('加载持久化通知失败', error);,
}
}

/**
* 生成通知ID
 */
private generateNotificationId(): string { return `notification_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;,
}

/**
* 获取通知背景色
 */
private getNotificationBackground(type: NotificationType): string { switch (type) {
    case NotificationType.SUCCESS: return '#f0f9ff';
    case NotificationType.ERROR: return '#fef2f2';
    case NotificationType.WARNING: return '#fffbeb';
    case NotificationType.INFO: return '#f0f9ff';
    case NotificationType.LOADING: return '#f9fafb';
    default: return '#ffffff';,
}
}

/**
* 获取通知文字颜色
 */
private getNotificationColor(type: NotificationType): string { switch (type) {
    case NotificationType.SUCCESS: return '#065f46';
    case NotificationType.ERROR: return '#991b1b';
    case NotificationType.WARNING: return '#92400e';
    case NotificationType.INFO: return '#1e40af';
    case NotificationType.LOADING: return '#374151';
    default: return '#111827';,
}
}

/**
* 获取通知边框颜色
 */
private getNotificationBorder(type: NotificationType): string { switch (type) {
    case NotificationType.SUCCESS: return '#10b981';
    case NotificationType.ERROR: return '#ef4444';
    case NotificationType.WARNING: return '#f59e0b';
    case NotificationType.INFO: return '#3b82f6';
    case NotificationType.LOADING: return '#6b7280';
    default: return '#d1d5db';,
}
}

/**
* 获取动作按钮样式
 */
private getActionButtonStyle(style: 'primary' | 'secondary' | 'danger'): string { const baseStyle = `;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  `;

  switch (style) {
    case 'primary':
    return baseStyle + `;
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
    `;
    case 'danger':
    return baseStyle + `;
    background: #ef4444;
    color: white;
    border-color: #ef4444;
    `;
    case 'secondary':
    default:
    return baseStyle + `;
    background: transparent;
    color: currentColor;
    border-color: currentColor;
    `;,
}
},
}

/**
* 导出单例实例
 */
export const enhancedUserNotificationSystem = EnhancedUserNotificationSystem.getInstance();

/**
* 便捷的通知函数
 */
export const notify = { success: (message: string, options?: Partial<NotificationConfig>) =>;
  enhancedUserNotificationSystem.success(message, options),

  error: (message: string, options?: Partial<NotificationConfig>) =>;
  enhancedUserNotificationSystem.error(message, options),

  warning: (message: string, options?: Partial<NotificationConfig>) =>;
  enhancedUserNotificationSystem.warning(message, options),

  info: (message: string, options?: Partial<NotificationConfig>) =>;
  enhancedUserNotificationSystem.info(message, options),

  loading: (message: string, options?: Partial<NotificationConfig>) =>;
  enhancedUserNotificationSystem.loading(message, options),

  bySeverity: (message: string, severity: ErrorSeverity, options?: Partial<NotificationConfig>) =>;
  enhancedUserNotificationSystem.showBySeverity(message, severity, options),
};