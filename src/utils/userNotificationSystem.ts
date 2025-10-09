import { createLogger  } from '@/lib/logger';
import { masterErrorHandler  } from './masterErrorHandler';

/**
* 文件级注释：用户通知系统
* 提供统一的用户通知管理功能
* 支持多种通知类型和自定义样式
*
* 主要功能：
* - 多种通知类型（成功、警告、错误、信息）
* - 自定义通知样式和持续时间
* - 通知队列管理
* - 通知历史记录
* - 批量通知操作
 */

const logger = createLogger('user-notification-system');

/**
* 通知类型枚举
 */
export enum NotificationType { /** 成功通知  */
  SUCCESS = 'success',
  /** 警告通知  */
  WARNING = 'warning',
  /** 错误通知  */
  ERROR = 'error',
  /** 信息通知  */
  INFO = 'info';,
}

/**
* 通知位置枚举
 */
export enum NotificationPosition { /** 顶部左侧  */
  TOP_LEFT = 'top-left',
  /** 顶部中央  */
  TOP_CENTER = 'top-center',
  /** 顶部右侧  */
  TOP_RIGHT = 'top-right',
  /** 底部左侧  */
  BOTTOM_LEFT = 'bottom-left',
  /** 底部中央  */
  BOTTOM_CENTER = 'bottom-center',
  /** 底部右侧  */
  BOTTOM_RIGHT = 'bottom-right';,
}

/**
* 通知动作接口
 */
export interface NotificationAction { /** 动作标签  */
  label: string;
  /** 动作处理函数  */
  action: () => void;
  /** 是否为主要动作  */
  primary?: boolean;
  /** 是否在执行后关闭通知  */
  closeOnAction?: boolean;,
}

/**
* 通知配置接口
 */
export interface NotificationConfig { /** 通知类型  */
  type: NotificationType;
  /** 通知标题  */
  title: string;
  /** 通知消息  */
  message: string;
  /** 持续时间（毫秒），0表示不自动关闭  */
  duration?: number;
  /** 通知位置  */
  position?: NotificationPosition;
  /** 是否可关闭  */
  closable?: boolean;
  /** 是否显示图标  */
  showIcon?: boolean;
  /** 自定义图标  */
  icon?: string;
  /** 自定义CSS类  */
  className?: string;
  /** 通知动作  */
  actions?: NotificationAction[];
  /** 是否持久化（刷新页面后保留）  */
  persistent?: boolean;
  /** 通知优先级  */
  priority?: number;
  /** 自定义数据  */
  data?: any;,
}

/**
* 通知实例接口
 */
export interface NotificationInstance { /** 通知ID  */
  id: string;
  /** 通知配置  */
  config: NotificationConfig;
  /** 创建时间  */
  createdAt: number;
  /** 是否已显示  */
  shown: boolean;
  /** 是否已关闭  */
  closed: boolean;
  /** 关闭时间  */
  closedAt?: number;
  /** 定时器ID  */
  timerId?: NodeJS.Timeout;,
}

/**
* 通知系统配置接口
 */
export interface NotificationSystemConfig { /** 默认持续时间  */
  defaultDuration: number;
  /** 默认位置  */
  defaultPosition: NotificationPosition;
  /** 最大通知数量  */
  maxNotifications: number;
  /** 最大历史记录数量  */
  maxHistory: number;
  /** 是否启用声音  */
  enableSound: boolean;
  /** 是否启用动画  */
  enableAnimation: boolean;
  /** 动画持续时间  */
  animationDuration: number;
  /** 是否启用持久化  */
  enablePersistence: boolean;
  /** 存储键名  */
  storageKey: string;,
}

/**
* 通知统计接口
 */
export interface NotificationStats { /** 总通知数  */
  total: number;
  /** 按类型统计  */
  byType: Record<NotificationType, number>;
  /** 按位置统计  */
  byPosition: Record<NotificationPosition, number>;
  /** 平均显示时间  */
  averageDisplayTime: number;
  /** 用户交互率  */
  interactionRate: number;
  /** 最后通知时间  */
  lastNotificationTime: number;,
}

/**
* 用户通知系统类
* 提供统一的通知管理功能
 */
export class UserNotificationSystem { private static instance: UserNotificationSystem;

  /** 系统配置  */
  private config: NotificationSystemConfig;
  /** 活动通知  */
  private activeNotifications = new Map<string, NotificationInstance>();
  /** 通知历史  */
  private notificationHistory: NotificationInstance[] = [];
  /** 通知队列  */
  private notificationQueue: NotificationConfig[] = [];
  /** 统计信息  */
  private stats: NotificationStats;
  /** 是否已初始化  */
  private initialized = false;
  /** DOM容器  */
  private containers = new Map<NotificationPosition, HTMLElement>();

  private constructor() {
    // 默认配置
    this.config = {
      defaultDuration: 5000,
      defaultPosition: NotificationPosition.TOP_RIGHT,
      maxNotifications: 5,
      maxHistory: 100,
      enableSound: false,
      enableAnimation: true,
      animationDuration: 300,
      enablePersistence: true,
      storageKey: 'wolf_notifications',
};

    // 初始化统计
    this.stats = { total: 0,
      byType: {
        [NotificationType.SUCCESS]: 0,
        [NotificationType.WARNING]: 0,
        [NotificationType.ERROR]: 0,
        [NotificationType.INFO]: 0,
},
      byPosition: { [NotificationPosition.TOP_LEFT]: 0,
        [NotificationPosition.TOP_CENTER]: 0,
        [NotificationPosition.TOP_RIGHT]: 0,
        [NotificationPosition.BOTTOM_LEFT]: 0,
        [NotificationPosition.BOTTOM_CENTER]: 0,
        [NotificationPosition.BOTTOM_RIGHT]: 0,
},
      averageDisplayTime: 0,
      interactionRate: 0,
      lastNotificationTime: 0,
};

    logger.info('用户通知系统已初始化');,
}

  /**
  * 获取单例实例
   */
  public static getInstance(): UserNotificationSystem { if (!UserNotificationSystem.instance) {
      UserNotificationSystem.instance = new UserNotificationSystem();,
}
    return UserNotificationSystem.instance;,
}

  /**
  * 初始化通知系统
   */
  public async initialize(): Promise<void> { if (this.initialized) {
      logger.warn('通知系统已初始化');
      return;,
}

    try { // 创建DOM容器
      this.createContainers();

      // 加载持久化数据
      if (this.config.enablePersistence) {
        await this.loadPersistedNotifications();,
}

      // 处理队列中的通知
      this.processNotificationQueue();

      this.initialized = true;
      logger.info('通知系统初始化完成');,
} catch (error) { logger.error('通知系统初始化失败', error);
      throw error;,
}
  }

  /**
  * 配置通知系统
  * @param config - 系统配置
   */
  public configure(config: Partial<NotificationSystemConfig>): void { this.config = { ...this.config, ...config  };
    logger.info('通知系统配置已更新', this.config);,
}

  /**
  * 显示通知
  * @param config - 通知配置
  * @returns 通知实例ID
   */
  public async show(config: NotificationConfig): Promise<string> { try {
      // 如果未初始化，先加入队列
      if (!this.initialized) {
        this.notificationQueue.push(config);
        logger.info('通知已加入队列，等待系统初始化');
        return '';,
}

      // 创建通知实例
      const notification = this.createNotificationInstance(config);

      // 检查通知数量限制
      if (this.activeNotifications.size >= this.config.maxNotifications) { await this.removeOldestNotification();,
}

      // 添加到活动通知
      this.activeNotifications.set(notification.id, notification);

      // 渲染通知
      await this.renderNotification(notification);

      // 设置自动关闭
      if (notification.config.duration && notification.config.duration > 0) { notification.timerId = setTimeout(() => {
          this.close(notification.id);,
}, notification.config.duration);,
}

      // 更新统计
      this.updateStats(notification);

      // 持久化
      if (this.config.enablePersistence && notification.config.persistent) { await this.persistNotification(notification);,
}

      logger.info(`通知已显示: ${ notification.id }`, notification.config);
      return notification.id;,
} catch (error) { logger.error('显示通知失败', error);
      await masterErrorHandler.handleError(error, {
        component: 'UserNotificationSystem',
        operation: 'show',
        context: { config  },
});
      throw error;,
}
  }

  /**
  * 关闭通知
  * @param notificationId - 通知ID
   */
  public async close(notificationId: string): Promise<void> { const notification = this.activeNotifications.get(notificationId);
    if (!notification) {
      logger.warn(`通知不存在: ${notificationId }`);
      return;,
}

    try { // 清除定时器
      if (notification.timerId) {
        clearTimeout(notification.timerId);,
}

      // 标记为已关闭
      notification.closed = true;
      notification.closedAt = Date.now();

      // 移除DOM元素
      await this.removeNotificationElement(notification);

      // 从活动通知中移除
      this.activeNotifications.delete(notificationId);

      // 添加到历史记录
      this.addToHistory(notification);

      // 移除持久化数据
      if (this.config.enablePersistence) { await this.removePersistedNotification(notificationId);,
}

      logger.info(`通知已关闭: ${ notificationId }`);,
} catch (error) { logger.error(`关闭通知失败: ${notificationId }`, error);
      throw error;,
}
  }

  /**
  * 关闭所有通知
   */
  public async closeAll(): Promise<void> { const notificationIds = Array.from(this.activeNotifications.keys());

    for (const id of notificationIds) {
      await this.close(id);,
}

    logger.info('所有通知已关闭');,
}

  /**
  * 关闭指定类型的通知
  * @param type - 通知类型
   */
  public async closeByType(type: NotificationType): Promise<void> { const notificationsToClose = Array.from(this.activeNotifications.values());
    .filter(notification => notification.config.type === type);
    .map(notification => notification.id);

    for (const id of notificationsToClose) {
      await this.close(id);,
}

    logger.info(`已关闭所有 ${ type } 类型的通知`);,
}

  /**
  * 显示成功通知
  * @param title - 标题
  * @param message - 消息
  * @param options - 额外选项
   */
  public async success(title: string, message: string, options?: Partial<NotificationConfig>): Promise<string> { return this.show({
      type: NotificationType.SUCCESS,
      title,
      message,
      duration: this.config.defaultDuration,
      ...options,
});,
}

  /**
  * 显示警告通知
  * @param title - 标题
  * @param message - 消息
  * @param options - 额外选项
   */
  public async warning(title: string, message: string, options?: Partial<NotificationConfig>): Promise<string> { return this.show({
      type: NotificationType.WARNING,
      title,
      message,
      duration: this.config.defaultDuration,
      ...options,
});,
}

  /**
  * 显示错误通知
  * @param title - 标题
  * @param message - 消息
  * @param options - 额外选项
   */
  public async error(title: string, message: string, options?: Partial<NotificationConfig>): Promise<string> { return this.show({
      type: NotificationType.ERROR,
      title,
      message,
      duration: 0, // 错误通知默认不自动关闭
      ...options,
});,
}

  /**
  * 显示信息通知
  * @param title - 标题
  * @param message - 消息
  * @param options - 额外选项
   */
  public async info(title: string, message: string, options?: Partial<NotificationConfig>): Promise<string> { return this.show({
      type: NotificationType.INFO,
      title,
      message,
      duration: this.config.defaultDuration,
      ...options,
});,
}

  /**
  * 获取活动通知
   */
  public getActiveNotifications(): NotificationInstance[] { return Array.from(this.activeNotifications.values());,
}

  /**
  * 获取通知历史
   */
  public getNotificationHistory(): NotificationInstance[] { return [...this.notificationHistory];,
}

  /**
  * 获取统计信息
   */
  public getStats(): NotificationStats { return { ...this.stats  };,
}

  /**
  * 清空通知历史
   */
  public clearHistory(): void { this.notificationHistory = [];
    this.stats = {
      total: 0,
      byType: {
        [NotificationType.SUCCESS]: 0,
        [NotificationType.WARNING]: 0,
        [NotificationType.ERROR]: 0,
        [NotificationType.INFO]: 0,
},
      byPosition: { [NotificationPosition.TOP_LEFT]: 0,
        [NotificationPosition.TOP_CENTER]: 0,
        [NotificationPosition.TOP_RIGHT]: 0,
        [NotificationPosition.BOTTOM_LEFT]: 0,
        [NotificationPosition.BOTTOM_CENTER]: 0,
        [NotificationPosition.BOTTOM_RIGHT]: 0,
},
      averageDisplayTime: 0,
      interactionRate: 0,
      lastNotificationTime: 0,
};

    logger.info('通知历史已清空');,
}

  /**
  * 创建通知实例
   */
  private createNotificationInstance(config: NotificationConfig): NotificationInstance { const id = this.generateNotificationId();
    const now = Date.now();

    return {
      id,
      config: {
        duration: this.config.defaultDuration,
        position: this.config.defaultPosition,
        closable: true,
        showIcon: true,
        persistent: false,
        priority: 0,
        ...config,
},
      createdAt: now,
      shown: false,
      closed: false,
};,
}

  /**
  * 渲染通知
   */
  private async renderNotification(notification: NotificationInstance): Promise<void> { try {
      const position = notification.config.position || this.config.defaultPosition;
      const container = this.containers.get(position);

      if (!container) {
        throw new Error(`通知容器不存在: ${position }`);,
}

      // 创建通知元素
      const element = this.createNotificationElement(notification);

      // 添加到容器
      container.appendChild(element);

      // 标记为已显示
      notification.shown = true;

      // 播放声音
      if (this.config.enableSound) { this.playNotificationSound(notification.config.type);,
}

      // 添加动画
      if (this.config.enableAnimation) { await this.animateNotificationIn(element);,
}

    } catch (error) { logger.error('渲染通知失败', error);
      throw error;,
}
  }

  /**
  * 创建通知元素
   */
  private createNotificationElement(notification: NotificationInstance): HTMLElement { const element = document.createElement('div');
    element.id = `notification-${notification.id }`;
    element.className = this.getNotificationClasses(notification);

    // 创建通知内容
    const content = this.createNotificationContent(notification);
    element.appendChild(content);

    // 添加关闭按钮
    if (notification.config.closable) { const closeButton = this.createCloseButton(notification.id);
      element.appendChild(closeButton);,
}

    // 添加动作按钮
    if (notification.config.actions && notification.config.actions.length > 0) { const actionsContainer = this.createActionsContainer(notification);
      element.appendChild(actionsContainer);,
}

    return element;,
}

  /**
  * 创建通知内容
   */
  private createNotificationContent(notification: NotificationInstance): HTMLElement { const content = document.createElement('div');
    content.className = 'notification-content';

    // 图标
    if (notification.config.showIcon) {
      const icon = document.createElement('div');
      icon.className = 'notification-icon';
      icon.innerHTML = this.getNotificationIcon(notification.config.type);
      content.appendChild(icon);,
}

    // 文本内容
    const textContent = document.createElement('div');
    textContent.className = 'notification-text';

    const title = document.createElement('div');
    title.className = 'notification-title';
    title.textContent = notification.config.title;
    textContent.appendChild(title);

    const message = document.createElement('div');
    message.className = 'notification-message';
    message.textContent = notification.config.message;
    textContent.appendChild(message);

    content.appendChild(textContent);

    return content;,
}

  /**
  * 创建关闭按钮
   */
  private createCloseButton(notificationId: string): HTMLElement { const button = document.createElement('button');
    button.className = 'notification-close';
    button.innerHTML = '×';
    button.onclick = () => this.close(notificationId);
    return button;,
}

  /**
  * 创建动作容器
   */
  private createActionsContainer(notification: NotificationInstance): HTMLElement { const container = document.createElement('div');
    container.className = 'notification-actions';

    for (const action of notification.config.actions || []) {
      const button = document.createElement('button');
      button.className = `notification-action ${action.primary ? 'primary' : 'secondary' }`;
      button.textContent = action.label;
      button.onclick = () => { action.action();
        if (action.closeOnAction !== false) {
          this.close(notification.id);,
}
      };
      container.appendChild(button);,
}

    return container;,
}

  /**
  * 获取通知样式类
   */
  private getNotificationClasses(notification: NotificationInstance): string { const classes = [;
      'notification',
      `notification-${notification.config.type }`,
      notification.config.className || '',
];

    return classes.filter(Boolean).join(' ');,
}

  /**
  * 获取通知图标
   */
  private getNotificationIcon(type: NotificationType): string { const icons = {
      [NotificationType.SUCCESS]: '✓',
      [NotificationType.WARNING]: '⚠',
      [NotificationType.ERROR]: '✗',
      [NotificationType.INFO]: 'ℹ',
};

    return icons[type] || icons[NotificationType.INFO];,
}

  /**
  * 创建DOM容器
   */
  private createContainers(): void { const positions = Object.values(NotificationPosition);

    for (const position of positions) {
      const container = document.createElement('div');
      container.id = `notifications-${position }`;
      container.className = `notifications-container ${ position }`;

      // 添加样式
      this.applyContainerStyles(container, position);

      // 添加到页面
      document.body.appendChild(container);

      // 保存引用
      this.containers.set(position, container);,
}
  }

  /**
  * 应用容器样式
   */
  private applyContainerStyles(container: HTMLElement, position: NotificationPosition): void { container.style.position = 'fixed';
    container.style.zIndex = '9999';
    container.style.pointerEvents = 'none';

    switch (position) {
      case NotificationPosition.TOP_LEFT:
      container.style.top = '20px';
      container.style.left = '20px';
      break;
      case NotificationPosition.TOP_CENTER:
      container.style.top = '20px';
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      break;
      case NotificationPosition.TOP_RIGHT:
      container.style.top = '20px';
      container.style.right = '20px';
      break;
      case NotificationPosition.BOTTOM_LEFT:
      container.style.bottom = '20px';
      container.style.left = '20px';
      break;
      case NotificationPosition.BOTTOM_CENTER:
      container.style.bottom = '20px';
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      break;
      case NotificationPosition.BOTTOM_RIGHT:
      container.style.bottom = '20px';
      container.style.right = '20px';
      break;,
}
  }

  /**
  * 移除通知元素
   */
  private async removeNotificationElement(notification: NotificationInstance): Promise<void> { const element = document.getElementById(`notification-${notification.id }`);
    if (!element) { return;,
}

    try { // 添加退出动画
      if (this.config.enableAnimation) {
        await this.animateNotificationOut(element);,
}

      // 移除元素
      element.remove();,
} catch (error) { logger.error('移除通知元素失败', error);
      // 强制移除
      element.remove();,
}
  }

  /**
  * 入场动画
   */
  private async animateNotificationIn(element: HTMLElement): Promise<void> { return new Promise(resolve => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-20px)';
      element.style.transition = `all ${this.config.animationDuration }ms ease-out`;

      requestAnimationFrame(() => { element.style.opacity = '1';
        element.style.transform = 'translateY(0)';

        setTimeout(resolve, this.config.animationDuration);,
});,
});,
}

  /**
  * 退场动画
   */
  private async animateNotificationOut(element: HTMLElement): Promise<void> { return new Promise(resolve => {
      element.style.transition = `all ${this.config.animationDuration }ms ease-in`;
      element.style.opacity = '0';
      element.style.transform = 'translateY(-20px)';

      setTimeout(resolve, this.config.animationDuration);,
});,
}

  /**
  * 播放通知声音
   */
  private playNotificationSound(type: NotificationType): void { // 这里可以实现播放不同类型通知的声音
    // 例如使用Web Audio API或HTML5 Audio
    logger.debug(`播放 ${type } 通知声音`);,
}

  /**
  * 移除最旧的通知
   */
  private async removeOldestNotification(): Promise<void> { const notifications = Array.from(this.activeNotifications.values());
    if (notifications.length === 0) {
      return;,
}

    // 按创建时间排序，移除最旧的
    notifications.sort((a, b) => a.createdAt - b.createdAt);
    const oldest = notifications[0];

    await this.close(oldest.id);,
}

  /**
  * 处理通知队列
   */
  private processNotificationQueue(): void { while (this.notificationQueue.length > 0) {
      const config = this.notificationQueue.shift();
      if (config) {
        this.show(config).catch(error => {
          logger.error('处理队列通知失败', error);,
});,
}
    },
}

  /**
  * 更新统计信息
   */
  private updateStats(notification: NotificationInstance): void { this.stats.total++;
    this.stats.byType[notification.config.type]++;
    this.stats.byPosition[notification.config.position || this.config.defaultPosition]++;
    this.stats.lastNotificationTime = notification.createdAt;

    // 计算平均显示时间
    if (notification.closedAt) {
      const displayTime = notification.closedAt - notification.createdAt;
      this.stats.averageDisplayTime =;
      (this.stats.averageDisplayTime * (this.stats.total - 1) + displayTime) / this.stats.total;,
}
  }

  /**
  * 添加到历史记录
   */
  private addToHistory(notification: NotificationInstance): void { this.notificationHistory.unshift(notification);

    // 保持历史记录大小限制
    if (this.notificationHistory.length > this.config.maxHistory) {
      this.notificationHistory = this.notificationHistory.slice(0, this.config.maxHistory);,
}
  }

  /**
  * 持久化通知
   */
  private async persistNotification(notification: NotificationInstance): Promise<void> { try {
      const persistedNotifications = this.getPersistedNotifications();
      persistedNotifications[notification.id] = notification;

      localStorage.setItem(this.config.storageKey, JSON.stringify(persistedNotifications));,
} catch (error) { logger.error('持久化通知失败', error);,
}
  }

  /**
  * 移除持久化通知
   */
  private async removePersistedNotification(notificationId: string): Promise<void> { try {
      const persistedNotifications = this.getPersistedNotifications();
      delete persistedNotifications[notificationId];

      localStorage.setItem(this.config.storageKey, JSON.stringify(persistedNotifications));,
} catch (error) { logger.error('移除持久化通知失败', error);,
}
  }

  /**
  * 加载持久化通知
   */
  private async loadPersistedNotifications(): Promise<void> { try {
      const persistedNotifications = this.getPersistedNotifications();

      for (const notification of Object.values(persistedNotifications)) {
        if (!notification.closed) {
          this.activeNotifications.set(notification.id, notification);
          await this.renderNotification(notification);,
}
      },
} catch (error) { logger.error('加载持久化通知失败', error);,
}
  }

  /**
  * 获取持久化通知
   */
  private getPersistedNotifications(): Record<string, NotificationInstance> { try {
      const data = localStorage.getItem(this.config.storageKey);
      return data ? JSON.parse(data) : { };,
} catch (error) { logger.error('获取持久化通知失败', error);
      return { };,
}
  }

  /**
  * 生成通知ID
   */
  private generateNotificationId(): string { return `notification_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;,
}
}

/**
* 导出单例实例
 */
export const userNotificationSystem = UserNotificationSystem.getInstance();