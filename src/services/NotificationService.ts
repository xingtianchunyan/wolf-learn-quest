/**
 * @fileoverview 通知服务
 * 专业化的通知管理服务，提供统一的消息推送、通知管理和用户提醒功能
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import  { EventEmitter  } from '@/patterns/observer/EventEmitter';
import { MemoryCache  } from '@/utils/common/cacheUtils';
import { formatError  } from '@/config/errorMessages';

/**
 * 通知类型枚举
 */
export enum NotificationType  {
  /** 系统通知 */
  SYSTEM = 'system',
  /** 游戏通知 */
  GAME = 'game',
  /** 技能通知 */
  SKILL = 'skill',
  /** 投票通知 */
  VOTE = 'vote',
  /** 聊天通知 */
  CHAT = 'chat',
  /** 警告通知 */
  WARNING = 'warning',
  /** 错误通知 */
  ERROR = 'error',
  /** 成功通知 */
  SUCCESS = 'success',
  /** 信息通知 */
  INFO = 'info' }

/**
 * 通知优先级枚举
 */
export enum NotificationPriority  {
  /** 低优先级 */
  LOW = 'low',
  /** 普通优先级 */
  NORMAL = 'normal',
  /** 高优先级 */
  HIGH = 'high',
  /** 紧急优先级 */
  URGENT = 'urgent' }

/**
 * 通知渠道枚举
 */
export enum NotificationChannel  {
  /** 应用内通知 */
  IN_APP = 'in_app',
  /** 浏览器通知 */
  BROWSER = 'browser',
  /** 邮件通知 */
  EMAIL = 'email',
  /** 短信通知 */
  SMS = 'sms',
  /** WebSocket推送 */
  WEBSOCKET = 'websocket',
  /** 系统托盘 */
  SYSTEM_TRAY = 'system_tray' }

/**
 * 通知状态枚举
 */
export enum NotificationStatus  {
  /** 待发送 */
  PENDING = 'pending',
  /** 已发送 */
  SENT = 'sent',
  /** 已送达 */
  DELIVERED = 'delivered',
  /** 已读 */
  READ = 'read',
  /** 发送失败 */
  FAILED = 'failed',
  /** 已过期 */
  EXPIRED = 'expired' }

/**
 * 通知接口
 */
export interface Notification  {
  /** 通知ID */
  id: string;
  /** 通知类型 */
  type: NotificationType;
  /** 优先级 */
  priority: NotificationPriority;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 接收者ID */
  recipientId: string;
  /** 发送者ID */
  senderId?: string;
  /** 发送渠道 */
  channels: NotificationChannel[];
  /** 状态 */
  status: NotificationStatus;
  /** 创建时间 */
  createdAt: number;
  /** 发送时间 */
  sentAt?: number;
  /** 送达时间 */
  deliveredAt?: number;
  /** 阅读时间 */
  readAt?: number;
  /** 过期时间 */
  expiresAt?: number;
  /** 重试次数 */
  retryCount: number;
  /** 最大重试次数 */
  maxRetries: number;
  /** 附加数据 */
  metadata?: Record<string, any>;
  /** 操作按钮 */
  actions?: NotificationAction[];
  /** 是否可关闭 */
  dismissible: boolean;
  /** 自动关闭时间（毫秒） */
  autoCloseDelay?: number
}

/**
 * 通知操作接口
 */
export interface NotificationAction  {
  /** 操作ID */
  id: string;
  /** 操作标签 */
  label: string;
  /** 操作类型 */
  type: 'primary' | 'secondary' | 'danger';
  /** 操作处理器 */
  handler: (notification: Notification) => void | Promise<void>;
  /** 是否关闭通知 */
  closeOnClick: boolean
}

/**
 * 通知模板接口
 */
export interface NotificationTemplate  {
  /** 模板ID */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板类型 */
  type: NotificationType;
  /** 标题模板 */
  titleTemplate: string;
  /** 内容模板 */
  contentTemplate: string;
  /** 默认优先级 */
  defaultPriority: NotificationPriority;
  /** 默认渠道 */
  defaultChannels: NotificationChannel[];
  /** 默认过期时间 */
  defaultExpiresIn?: number;
  /** 模板变量 */
  variables: string[]
}

/**
 * 通知配置接口
 */
export interface NotificationConfig  {
  /** 是否启用通知 */
  enabled: boolean;
  /** 默认渠道 */
  defaultChannels: NotificationChannel[];
  /** 最大重试次数 */
  maxRetries: number;
  /** 重试间隔（毫秒） */
  retryInterval: number;
  /** 通知过期时间（毫秒） */
  defaultExpiresIn: number;
  /** 最大通知数量 */
  maxNotifications: number;
  /** 是否启用浏览器通知 */
  enableBrowserNotifications: boolean;
  /** 是否启用声音 */
  enableSound: boolean;
  /** 声音文件路径 */
  soundFile?: string;
  /** 通知显示时间 */
  displayDuration: number
}

/**
 * 通知统计接口
 */
export interface NotificationStats  {
  /** 总通知数 */
  total: number;
  /** 已发送数 */
  sent: number;
  /** 已送达数 */
  delivered: number;
  /** 已读数 */
  read: number;
  /** 失败数 */
  failed: number;
  /** 过期数 */
  expired: number;
  /** 按类型统计 */
  byType: Record<NotificationType, number>;
  /** 按优先级统计 */
  byPriority: Record<NotificationPriority, number>;
  /** 按渠道统计 */
  byChannel: Record<NotificationChannel, number>;
  /** 平均送达时间 */
  averageDeliveryTime: number;
  /** 阅读率 */
  readRate: number
}

/**
 * 通知过滤器接口
 */
export interface NotificationFilter  {
  /** 类型过滤 */
  types?: NotificationType[];
  /** 优先级过滤 */
  priorities?: NotificationPriority[];
  /** 状态过滤 */
  statuses?: NotificationStatus[];
  /** 接收者过滤 */
  recipientIds?: string[];
  /** 时间范围过滤 */
timeRange?:  {
    start: number;
    end: number
}
  /** 是否只显示未读 */
  unreadOnly?: boolean
}

/**
 * 通知服务类
 */
export class NotificationService  { private static instance: NotificationService;
  private eventEmitter: EventEmitter;
  private config: NotificationConfig;
  private notifications: Map<string, Notification>;
  private templates: Map<string, NotificationTemplate>;
  private notificationCache: MemoryCache<Notification>;
  private retryQueue: Map<string, NodeJS.Timeout>;
  private stats: NotificationStats;

  /**
 * 构造函数
 */
private constructor()  {
    this.eventEmitter = new EventEmitter();
    this.config = {
      enabled: true,
      defaultChannels: [NotificationChannel.IN_APP],
      maxRetries: 3,
      retryInterval: 5000,
      defaultExpiresIn: 24 * 60 * 60 * 1000, // 24小时
      maxNotifications: 1000,
      enableBrowserNotifications: true,
      enableSound: true,
      displayDuration: 5000  
};

    this.notifications = new Map();
    this.templates = new Map();
    this.notificationCache = new MemoryCache<Notification>({
      maxSize: 500,
      ttl: 3600000, // 1小时
    });
    this.retryQueue = new Map();

    this.stats = {
      total: 0,
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0,
      expired: 0,
      byType: {
} as Record<NotificationType, number>,
      byPriority: {
} as Record<NotificationPriority, number>,
      byChannel: {
} as Record<NotificationChannel, number>,
      averageDeliveryTime: 0,
      readRate: 0 
};

    this.initializeDefaultTemplates();
    this.requestBrowserPermission()
}

  /**
 * 获取单例实例
 */
public static getInstance(): NotificationService  {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
}
    return NotificationService.instance
}

  /**
 * 初始化默认模板
 */
private initializeDefaultTemplates(): void  {
    const defaultTemplates: NotificationTemplate[] = [
      {
        id: 'game_started',
        name: '游戏开始',
        type: NotificationType.GAME,
        titleTemplate: '游戏开始',
        contentTemplate: '游戏 {{gameId
}} 已开始，您的角色是 {{role}}',
        defaultPriority: NotificationPriority.HIGH,
        defaultChannels: [
          NotificationChannel.IN_APP,
          NotificationChannel.BROWSER ],
        variables: ['gameId', 'role'] },
      {
        id: 'game_ended',
        name: '游戏结束',
        type: NotificationType.GAME,
        titleTemplate: '游戏结束',
        contentTemplate: '游戏 {{gameId
}} 已结束，{{winner}} 获胜',
        defaultPriority: NotificationPriority.HIGH,
        defaultChannels: [
          NotificationChannel.IN_APP,
          NotificationChannel.BROWSER ],
        variables: ['gameId', 'winner'] },
      {
        id: 'skill_used',
        name: '技能使用',
        type: NotificationType.SKILL,
        titleTemplate: '技能使用',
        contentTemplate: '{{playerName
}} 使用了技能 {{skillName}}',
        defaultPriority: NotificationPriority.NORMAL,
        defaultChannels: [NotificationChannel.IN_APP],
        variables: ['playerName', 'skillName'] },
      {
        id: 'vote_started',
        name: '投票开始',
        type: NotificationType.VOTE,
        titleTemplate: '投票开始',
        contentTemplate: '{{voteType
}} 投票已开始，请投出您的一票',
        defaultPriority: NotificationPriority.HIGH,
        defaultChannels: [
          NotificationChannel.IN_APP,
          NotificationChannel.BROWSER ],
        variables: ['voteType'] 
},
      {
        id: 'chat_message',
        name: '聊天消息',
        type: NotificationType.CHAT,
        titleTemplate: '新消息',
        contentTemplate: '{{senderName
}}: {{message
}}',
        defaultPriority: NotificationPriority.LOW,
        defaultChannels: [NotificationChannel.IN_APP],
        variables: ['senderName', 'message'] },
      {
        id: 'system_error',
        name: '系统错误',
        type: NotificationType.ERROR,
        titleTemplate: '系统错误',
        contentTemplate: '发生错误: {{errorMessage
}}',
        defaultPriority: NotificationPriority.URGENT,
        defaultChannels: [
          NotificationChannel.IN_APP,
          NotificationChannel.BROWSER ],
        variables: ['errorMessage'] 
} ];

    defaultTemplates.forEach(template => {
  this.templates.set(template.id, template)
})

}

  /**
 * 请求浏览器通知权限
 */
private async requestBrowserPermission(): Promise<void>  {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission()
} catch (error) {
        console.warn('Failed to request notification permission:', error)
}
    }
  }

  /**
   * 发送通知
   * @param notification - 通知数据
   * @returns 通知ID
   */
  public async sendNotification(
    notification: Partial<Notification>
  ): Promise<string> {
    if (!this.config.enabled) {
      throw new Error('通知服务已禁用')
}

    const notificationId =
      notification.id ||
      `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const fullNotification: Notification = { id: notificationId,
      type: notification.type || NotificationType.INFO,
      priority: notification.priority || NotificationPriority.NORMAL,
      title: notification.title || '',
      content: notification.content || '',
      recipientId: notification.recipientId || '',
      senderId: notification.senderId,
      channels: notification.channels || this.config.defaultChannels,
      status: NotificationStatus.PENDING,
      createdAt: Date.now(),
      retryCount: 0,
      maxRetries: notification.maxRetries || this.config.maxRetries,
      metadata: notification.metadata,
      actions: notification.actions,
      dismissible: notification.dismissible !== false,
      autoCloseDelay: notification.autoCloseDelay,
      expiresAt: notification.expiresAt || Date.now() + this.config.defaultExpiresIn  
};

    // 验证通知数据
    this.validateNotification(fullNotification);

    // 保存通知
    this.notifications.set(notificationId, fullNotification);
    this.notificationCache.set(notificationId, fullNotification);

    // 更新统计
    this.updateStats('created', fullNotification);

    // 发送通知
    await this.deliverNotification(fullNotification);

    // 发送事件
    this.eventEmitter.emit('notificationCreated', {
      notification: fullNotification,
      timestamp: Date.now() 
});

    return notificationId
}

  /**
   * 使用模板发送通知
   * @param templateId - 模板ID
   * @param recipientId - 接收者ID
   * @param variables - 模板变量
   * @param options - 额外选项
   * @returns 通知ID
   */
  public async sendNotificationFromTemplate(
    templateId: string,
    recipientId: string,
    variables: Record<string, any>,
    options?: Partial<Notification>
  ): Promise<string> {
    const template = this.templates.get(templateId);

    if (!template) {
      throw new Error(formatError('NOTIFICATION_001', { templateId }).message)
}

    // 渲染模板
    const title = this.renderTemplate(template.titleTemplate, variables);
    const content = this.renderTemplate(template.contentTemplate, variables);

    const notification: Partial<Notification> = { type: template.type,
      priority: template.defaultPriority,
      title,
      content,
      recipientId,
      channels: template.defaultChannels,
      expiresAt: template.defaultExpiresIn
        ? Date.now() + template.defaultExpiresIn
        : undefined,
      ...options  };

    return this.sendNotification(notification)
}

  /**
   * 批量发送通知
   * @param notifications - 通知列表
   * @returns 通知ID列表
   */
  public async sendBatchNotifications(
    notifications: Partial<Notification>[]
  ): Promise<string[]> {
    const notificationIds: string[] = [];

    for (const notification of notifications) {
      try {
        const id = await this.sendNotification(notification);
        notificationIds.push(id)
} catch (error) {
        console.error('Failed to send notification:', error);
        // 继续发送其他通知
      }
    }

    this.eventEmitter.emit('batchNotificationsSent', {
      count: notificationIds.length,
      total: notifications.length,
      timestamp: Date.now() 
});

    return notificationIds
}

  /**
   * 投递通知
   * @param notification - 通知
   */
private async deliverNotification(notification: Notification): Promise<void>  {
    try {
      // 检查是否过期
      if (notification.expiresAt && Date.now() > notification.expiresAt) {
        await this.updateNotificationStatus(
          notification.id,
          NotificationStatus.EXPIRED
        );
        return
}

      // 更新状态为已发送
      await this.updateNotificationStatus(
        notification.id,
        NotificationStatus.SENT
      );

      // 按渠道发送
      const deliveryPromises = notification.channels.map(channel =>
        this.deliverToChannel(notification, channel)
      );

      await Promise.allSettled(deliveryPromises);

      // 更新状态为已送达
      await this.updateNotificationStatus(
        notification.id,
        NotificationStatus.DELIVERED
      );

      // 设置自动关闭
      if (notification.autoCloseDelay) {
        setTimeout(() => {
  this.dismissNotification(notification.id)
}, notification.autoCloseDelay)
}
    
} catch (error) {
      console.error('Failed to deliver notification:', error);
      await this.handleDeliveryFailure(notification, error)
}
  }

  /**
   * 按渠道投递通知
   * @param notification - 通知
   * @param channel - 渠道
   */
  private async deliverToChannel(
    notification: Notification,
    channel: NotificationChannel
  ): Promise<void> {
    switch (channel) {
      case NotificationChannel.IN_APP:
        await this.deliverInApp(notification);
        break;
      case NotificationChannel.BROWSER:
        await this.deliverBrowser(notification);
        break;
      case NotificationChannel.WEBSOCKET:
        await this.deliverWebSocket(notification);
        break;
      case NotificationChannel.EMAIL:
        await this.deliverEmail(notification);
        break;
      case NotificationChannel.SMS:
        await this.deliverSMS(notification);
        break;
      case NotificationChannel.SYSTEM_TRAY:
        await this.deliverSystemTray(notification);
        break;
      default: console.warn(`Unsupported notification channel: ${channel
}`)
}
  }

  /**
   * 应用内通知投递
   * @param notification - 通知
   */
private async deliverInApp(notification: Notification): Promise<void>  {
    // 发送应用内通知事件
    this.eventEmitter.emit('inAppNotification', {
      notification,
      timestamp: Date.now() 
});

    // 播放声音
    if (this.config.enableSound && this.config.soundFile) {
      try {
        const audio = new Audio(this.config.soundFile);
        await audio.play()
} catch (error) {
        console.warn('Failed to play notification sound:', error)
}
    }
  }

  /**
   * 浏览器通知投递
   * @param notification - 通知
   */
private async deliverBrowser(notification: Notification): Promise<void>  {
    if (
      !this.config.enableBrowserNotifications ||
      !('Notification' in window)
    ) {
      return
}

    if (Notification.permission !== 'granted') {
      console.warn('Browser notification permission not granted');
      return
}

    const browserNotification = new Notification(notification.title, {
      body: notification.content,
      icon: '/favicon.ico',
      tag: notification.id,
      requireInteraction: notification.priority === NotificationPriority.URGENT 
});

    browserNotification.onclick = () => {
      this.markAsRead(notification.id);
      browserNotification.close();

      // 聚焦窗口
      if (window.focus) {
        window.focus()
}
    };

    // 自动关闭
    setTimeout(() => {
  browserNotification.close()
}, this.config.displayDuration)

}

  /**
   * WebSocket通知投递
   * @param notification - 通知
   */
private async deliverWebSocket(notification: Notification): Promise<void>  {
    // 发送WebSocket通知事件
    this.eventEmitter.emit('webSocketNotification', {
      notification,
      timestamp: Date.now() 
})
}

  /**
   * 邮件通知投递
   * @param notification - 通知
   */
private async deliverEmail(notification: Notification): Promise<void>  {
    // 这里应该集成邮件服务
    console.log('Email notification delivery not implemented')
}

  /**
   * 短信通知投递
   * @param notification - 通知
   */
private async deliverSMS(notification: Notification): Promise<void>  {
    // 这里应该集成短信服务
    console.log('SMS notification delivery not implemented')
}

  /**
   * 系统托盘通知投递
   * @param notification - 通知
   */
private async deliverSystemTray(notification: Notification): Promise<void>  {
    // 这里应该集成系统托盘通知
    console.log('System tray notification delivery not implemented')
}

  /**
   * 处理投递失败
   * @param notification - 通知
   * @param error - 错误
   */
  private async handleDeliveryFailure(
    notification: Notification,
    error: any
  ): Promise<void> {
    notification.retryCount++;

    if (notification.retryCount < notification.maxRetries) {
      // 安排重试
      const retryTimeout = setTimeout(() => {
  this.deliverNotification(notification);
        this.retryQueue.delete(notification.id)

}, this.config.retryInterval * notification.retryCount);

      this.retryQueue.set(notification.id, retryTimeout);

      this.eventEmitter.emit('notificationRetry', {
        notification,
        retryCount: notification.retryCount,
        error,
        timestamp: Date.now() 
})
} else {
      // 标记为失败
      await this.updateNotificationStatus(
        notification.id,
        NotificationStatus.FAILED
      );

      this.eventEmitter.emit('notificationFailed', {
        notification,
        error,
        timestamp: Date.now() 
})
}
  }

  /**
   * 更新通知状态
   * @param notificationId - 通知ID
   * @param status - 新状态
   */
  public async updateNotificationStatus(
    notificationId: string,
    status: NotificationStatus
  ): Promise<void> {
    const notification = this.notifications.get(notificationId);

    if (!notification) {
      throw new Error(
        formatError('NOTIFICATION_002', { notificationId }).message
      )
}

    const oldStatus = notification.status;
    notification.status = status;

    // 更新时间戳
    const now = Date.now();
    switch (status) {
      case NotificationStatus.SENT:
        notification.sentAt = now;
        break;
      case NotificationStatus.DELIVERED:
        notification.deliveredAt = now;
        break;
      case NotificationStatus.READ:
        notification.readAt = now;
        break
}

    // 更新缓存
    this.notificationCache.set(notificationId, notification);

    // 更新统计
    this.updateStats('statusChanged', notification, oldStatus);

    // 发送事件
    this.eventEmitter.emit('notificationStatusChanged', {
      notificationId,
      oldStatus,
      newStatus: status,
      timestamp: now 
})
}

  /**
   * 标记为已读
   * @param notificationId - 通知ID
   */
public async markAsRead(notificationId: string): Promise<void>  {
    await this.updateNotificationStatus(
      notificationId,
      NotificationStatus.READ
    )
}

  /**
   * 批量标记为已读
   * @param notificationIds - 通知ID列表
   */
public async markBatchAsRead(notificationIds: string[]): Promise<void>  {
    const promises = notificationIds.map(id => this.markAsRead(id));
    await Promise.allSettled(promises);

    this.eventEmitter.emit('batchNotificationsRead', {
      count: notificationIds.length,
      timestamp: Date.now() 
})
}

  /**
   * 关闭通知
   * @param notificationId - 通知ID
   */
public dismissNotification(notificationId: string): void  {
    const notification = this.notifications.get(notificationId);

    if (notification && notification.dismissible) {
      this.notifications.delete(notificationId);
      this.notificationCache.delete(notificationId);

      // 清理重试队列
      const retryTimeout = this.retryQueue.get(notificationId);
      if (retryTimeout) {
        clearTimeout(retryTimeout);
        this.retryQueue.delete(notificationId)
}

      this.eventEmitter.emit('notificationDismissed', {
        notificationId,
        timestamp: Date.now() 
})
}
  }

  /**
   * 获取通知
   * @param notificationId - 通知ID
   * @returns 通知
   */
public getNotification(notificationId: string): Notification | undefined  {
    return this.notifications.get(notificationId)
}

  /**
   * 获取用户通知列表
   * @param userId - 用户ID
   * @param filter - 过滤条件
   * @returns 通知列表
   */
  public getUserNotifications(
    userId: string,
    filter?: NotificationFilter
  ): Notification[] {
    let notifications = Array.from(this.notifications.values()).filter(
      n => n.recipientId === userId
    );

    if (filter) {
      notifications = this.applyFilter(notifications, filter)
}

    // 按创建时间倒序排列
    return notifications.sort((a, b) => b.createdAt - a.createdAt)
}

  /**
   * 获取未读通知数量
   * @param userId - 用户ID
   * @returns 未读数量
   */
public getUnreadCount(userId: string): number  {
    return Array.from(this.notifications.values()).filter(
      n => n.recipientId === userId && n.status !== NotificationStatus.READ
    ).length
}

  /**
   * 应用过滤器
   * @param notifications - 通知列表
   * @param filter - 过滤条件
   * @returns 过滤后的通知列表
   */
  private applyFilter(
    notifications: Notification[],
    filter: NotificationFilter
  ): Notification[] {
    return notifications.filter(notification => {
      // 类型过滤
      if (filter.types && !filter.types.includes(notification.type)) {
        return false
}

      // 优先级过滤
      if (
        filter.priorities &&
        !filter.priorities.includes(notification.priority)
      ) {
        return false
}

      // 状态过滤
      if (filter.statuses && !filter.statuses.includes(notification.status)) {
        return false
}

      // 接收者过滤
      if (
        filter.recipientIds &&
        !filter.recipientIds.includes(notification.recipientId)
      ) {
        return false
}

      // 时间范围过滤
      if (filter.timeRange) {
        if (
          notification.createdAt < filter.timeRange.start ||
          notification.createdAt > filter.timeRange.end
        ) {
          return false
}
      }

      // 未读过滤
      if (
        filter.unreadOnly &&
        notification.status === NotificationStatus.READ
      ) {
        return false
}

      return true
})
}

  /**
   * 注册通知模板
   * @param template - 通知模板
   */
public registerTemplate(template: NotificationTemplate): void  {
    this.templates.set(template.id, template);

    this.eventEmitter.emit('templateRegistered', {
      template,
      timestamp: Date.now() 
})
}

  /**
   * 获取通知模板
   * @param templateId - 模板ID
   * @returns 通知模板
   */
public getTemplate(templateId: string): NotificationTemplate | undefined  {
    return this.templates.get(templateId)
}

  /**
   * 渲染模板
   * @param template - 模板字符串
   * @param variables - 变量
   * @returns 渲染结果
   */
  private renderTemplate(
    template: string,
    variables: Record<string, any>
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
  return variables[key] !== undefined ? String(variables[key]) : match
})

}

  /**
   * 验证通知数据
   * @param notification - 通知
   */
private validateNotification(notification: Notification): void  {
    if (!notification.title) {
      throw new Error('通知标题不能为空')
}

    if (!notification.content) {
      throw new Error('通知内容不能为空')
}

    if (!notification.recipientId) {
      throw new Error('接收者ID不能为空')
}

    if (notification.channels.length === 0) {
      throw new Error('至少需要指定一个通知渠道')
}
  }

  /**
   * 更新统计信息
   * @param action - 操作类型
   * @param notification - 通知
   * @param oldStatus - 旧状态
   */
  private updateStats(
    action: string,
    notification: Notification,
    oldStatus?: NotificationStatus
  ): void {
    if (action === 'created') {
      this.stats.total++;

      // 按类型统计
      if (!this.stats.byType[notification.type]) {
        this.stats.byType[notification.type] = 0
}
      this.stats.byType[notification.type]++;

      // 按优先级统计
      if (!this.stats.byPriority[notification.priority]) {
        this.stats.byPriority[notification.priority] = 0
}
      this.stats.byPriority[notification.priority]++;

      // 按渠道统计
      notification.channels.forEach(channel => {
        if (!this.stats.byChannel[channel]) {
          this.stats.byChannel[channel] = 0
}
        this.stats.byChannel[channel]++
})
}

    if (action === 'statusChanged') {
      // 更新状态统计
      switch (notification.status) {
        case NotificationStatus.SENT:
          this.stats.sent++;
          break;
        case NotificationStatus.DELIVERED:
          this.stats.delivered++;
          // 计算平均送达时间
          if (notification.sentAt && notification.deliveredAt) {
            const deliveryTime = notification.deliveredAt - notification.sentAt;
            this.stats.averageDeliveryTime =
              (this.stats.averageDeliveryTime * (this.stats.delivered - 1) +
                deliveryTime) /
              this.stats.delivered
}
          break;
        case NotificationStatus.READ:
          this.stats.read++;
          // 计算阅读率
          this.stats.readRate = this.stats.read / this.stats.delivered;
          break;
        case NotificationStatus.FAILED:
          this.stats.failed++;
          break;
        case NotificationStatus.EXPIRED:
          this.stats.expired++;
          break
}
    }
  }

  /**
   * 获取通知统计
   * @returns 通知统计
   */
public getNotificationStats(): NotificationStats  {
    return { ...this.stats }
}

  /**
 * 重置统计信息
 */
public resetStats(): void  {
    this.stats = {
      total: 0,
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0,
      expired: 0,
      byType: {
} as Record<NotificationType, number>,
      byPriority: {
} as Record<NotificationPriority, number>,
      byChannel: {
} as Record<NotificationChannel, number>,
      averageDeliveryTime: 0,
      readRate: 0 
};

    this.eventEmitter.emit('statsReset', {
      timestamp: Date.now() 
})
}

  /**
   * 更新配置
   * @param newConfig - 新配置
   */
public updateConfig(newConfig: Partial<NotificationConfig>): void { this.config =  { ...this.config, ...newConfig  };

    this.eventEmitter.emit('configUpdated', {
      config: this.config,
      timestamp: Date.now() 
})
}

  /**
   * 获取配置
   * @returns 当前配置
   */
public getConfig(): NotificationConfig  {
    return { ...this.config }
}

  /**
 * 清理过期通知
 */
public cleanup(): void  {
    const now = Date.now();
    const expiredNotifications: string[] = [];

    for (const [id, notification] of this.notifications.entries()) {
      if (notification.expiresAt && now > notification.expiresAt) {
        expiredNotifications.push(id)
}
    }

    expiredNotifications.forEach(id => {
  this.updateNotificationStatus(id, NotificationStatus.EXPIRED);
      this.dismissNotification(id)

});

    // 清理缓存
    this.notificationCache.clear();

    this.eventEmitter.emit('cleanupCompleted', {
      expiredCount: expiredNotifications.length,
      timestamp: Date.now() 
})
}

  /**
   * 监听事件
   * @param event - 事件名称
   * @param listener - 事件监听器
   */
public on(event: string, listener: (...args: any[]) => void): void  {
    this.eventEmitter.on(event, listener)
}

  /**
   * 移除事件监听器
   * @param event - 事件名称
   * @param listener - 事件监听器
   */
public off(event: string, listener: (...args: any[]) => void): void  {
    this.eventEmitter.off(event, listener)
}
}

/**
 * 通知服务单例实例
 */
export const notificationService = NotificationService.getInstance();
