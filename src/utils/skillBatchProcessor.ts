import { createLogger  } from '@/lib/logger';
import { supabase  } from '@/integrations/supabase/client';

/**
* 技能系统批量处理器
* 优化数据库操作，减少连接频率，提升性能
 */

const logger = createLogger('skill-batch-processor');

interface BatchOperation { id: string;
  type: 'skill_use' | 'effect_update' | 'state_sync' | 'validation_check';
  data: any;
  priority: number;
  timestamp: number;
  gameStateId: string;
  userId?: string;,
}

interface BatchResult { success: boolean;
  processed: number;
  errors: Array<{ operation: BatchOperation; error: any  }>;
  duration: number;,
}

export class SkillBatchProcessor { private static instance: SkillBatchProcessor;
  private operationQueue: BatchOperation[] = [];
  private processing = false;
  private batchSize = 10; // 每批处理的操作数量
  private batchInterval = 1000; // 批处理间隔（毫秒）
  private maxWaitTime = 5000; // 最大等待时间
  private lastProcessTime = 0;

  static getInstance(): SkillBatchProcessor {
    if (!SkillBatchProcessor.instance) {
      SkillBatchProcessor.instance = new SkillBatchProcessor();,
}
    return SkillBatchProcessor.instance;,
}

  constructor() { this.startBatchProcessing();,
}

  /**
  * 添加操作到批处理队列
   */
  public addOperation(operation: Omit<BatchOperation, 'id' | 'timestamp'>): Promise<any> { const batchOperation: BatchOperation = {
      ...operation,
      id: this.generateOperationId(),
      timestamp: Date.now(),
};

    this.operationQueue.push(batchOperation);

    // 按优先级排序
    this.operationQueue.sort((a, b) => a.priority - b.priority);

    logger.debug('添加批处理操作', { type: operation.type,
      queueSize: this.operationQueue.length,
});

    // 如果队列达到批大小或等待时间过长，立即处理
    if (this.shouldProcessImmediately()) { this.processBatch();,
}

    // 返回一个Promise，可以等待处理完成
    return new Promise((resolve, reject) => { const checkResult = () => {
        const processed = !this.operationQueue.find(op => op.id === batchOperation.id);
        if (processed) {
          resolve(true);,
} else { setTimeout(checkResult, 100);,
}
      };
      checkResult();,
});,
}

  /**
  * 生成操作ID
   */
  private generateOperationId(): string { return `op_${Date.now() }_${ Math.random().toString(36).substr(2, 9) }`;,
}

  /**
  * 判断是否应该立即处理
   */
  private shouldProcessImmediately(): boolean { const now = Date.now();
    return (;
      this.operationQueue.length >= this.batchSize ||;
      (this.operationQueue.length > 0 && now - this.lastProcessTime > this.maxWaitTime)
    );,
}

  /**
  * 启动批处理循环
   */
  private startBatchProcessing(): void { setInterval(() => {
      if (!this.processing && this.operationQueue.length > 0) {
        this.processBatch();,
}
    }, this.batchInterval);,
}

  /**
  * 处理批操作
   */
  private async processBatch(): Promise<BatchResult> { if (this.processing || this.operationQueue.length === 0) {
      return { success: true, processed: 0, errors: [], duration: 0  };,
}

    this.processing = true;
    const startTime = Date.now();
    const currentBatch = this.operationQueue.splice(0, this.batchSize);
    const errors: Array<{ operation: BatchOperation; error: any  }> = [];

    logger.debug('开始处理批操作', { batchSize: currentBatch.length  });

    try { // 按类型分组操作
      const groupedOperations = this.groupOperationsByType(currentBatch);

      // 批量处理每种类型的操作
      for (const [type, operations] of Object.entries(groupedOperations)) {
        try {
          await this.processBatchByType(type as any, operations);,
} catch (error) { logger.error(`批处理${type }操作失败`, error);
          operations.forEach(op => { errors.push({ operation: op, error  });,
});,
}
      }

      const duration = Date.now() - startTime;
      this.lastProcessTime = Date.now();

      logger.debug('批处理完成', { processed: currentBatch.length - errors.length,
        errors: errors.length,
        duration,
});

      return { success: errors.length === 0,
        processed: currentBatch.length - errors.length,
        errors,
        duration,
};,
} catch (error) { logger.error('批处理执行失败', error);
      currentBatch.forEach(op => {
        errors.push({ operation: op, error  });,
});

      return { success: false,
        processed: 0,
        errors,
        duration: Date.now() - startTime,
};,
} finally { this.processing = false;,
}
  }

  /**
  * 按类型分组操作
   */
  private groupOperationsByType(operations: BatchOperation[]): Record<string, BatchOperation[]> { return operations.reduce((groups, operation) => {
      if (!groups[operation.type]) {
        groups[operation.type] = [];,
}
      groups[operation.type].push(operation);
      return groups;,
}, {} as Record<string, BatchOperation[]>);,
}

  /**
  * 按类型批量处理操作
   */
  private async processBatchByType(
    type: BatchOperation['type'],
    operations: BatchOperation[]
  ): Promise<void> { switch (type) {
      case 'skill_use':
      await this.batchProcessSkillUses(operations);
      break;
      case 'effect_update':
      await this.batchProcessEffectUpdates(operations);
      break;
      case 'state_sync':
      await this.batchProcessStateSyncs(operations);
      break;
      case 'validation_check':
      await this.batchProcessValidations(operations);
      break;
      default:
      logger.warn('未知的批处理操作类型', { type  });,
}
  }

  /**
  * 批量处理技能使用
   */
  private async batchProcessSkillUses(operations: BatchOperation[]): Promise<void> { const skillUses = operations.map(op => ({
      ...op.data,
      created_at: new Date().toISOString(),
}));

    const { error  } = await supabase;
    .from('skill_uses')
    .insert(skillUses);

    if (error) { throw error;,
}

    logger.debug('批量插入技能使用记录', { count: skillUses.length  });,
}

  /**
  * 批量处理效果更新
   */
  private async batchProcessEffectUpdates(operations: BatchOperation[]): Promise<void> { // 按游戏状态分组
    const byGameState = operations.reduce((groups, op) => {
      if (!groups[op.gameStateId]) {
        groups[op.gameStateId] = [];,
}
      groups[op.gameStateId].push(op);
      return groups;,
}, {} as Record<string, BatchOperation[]>);

    // 批量更新每个游戏状态的效果
    for (const [gameStateId, ops] of Object.entries(byGameState)) { const updates = ops.map(op => op.data);

      // 使用批量更新标准化技能目标表
      try {
        const { error  } = await supabase;
        .from('standardized_skill_targets')
        .upsert(updates.map(update => ({ ...update,
          updated_at: new Date().toISOString(),
})));

        if (error) { logger.error('批量更新技能效果失败', error);,
}
      } catch (error) { logger.error('批量更新异常', error);,
}
    },
}

  /**
  * 批量处理状态同步
   */
  private async batchProcessStateSyncs(operations: BatchOperation[]): Promise<void> { // 状态同步通常是读操作，可以并行处理
    const promises = operations.map(async op => {
      try {
        const { data, error  } = await supabase;
        .from('role_states')
        .select('*')
        .eq('game_state_id', op.gameStateId)
        .eq('user_id', op.userId);

        if (error) throw error;

        // 更新本地状态或缓存
        if (op.data.callback) { op.data.callback(data);,
}
      } catch (error) { logger.error('状态同步失败', error);,
}
    });

    await Promise.allSettled(promises);,
}

  /**
  * 批量处理验证检查
   */
  private async batchProcessValidations(operations: BatchOperation[]): Promise<void> { // 验证检查可以批量处理，减少数据库调用
    const validationGroups = operations.reduce((groups, op) => {
      const key = `${op.gameStateId }_${ op.data.skillName }`;
      if (!groups[key]) { groups[key] = [];,
}
      groups[key].push(op);
      return groups;,
}, {} as Record<string, BatchOperation[]>);

    for (const [key, ops] of Object.entries(validationGroups)) { try {
        const userIds = ops.map(op => op.userId).filter(Boolean);

        // 批量查询角色状态进行验证
        const { data, error  } = await supabase;
        .from('role_states')
        .select(`
        *,
        role_design!inner(*)
        `)
        .eq('game_state_id', ops[0].gameStateId)
        .in('user_id', userIds);

        if (error) throw error;

        // 处理验证结果
        ops.forEach(op => { if (op.data.callback && data) {
            const userRoleState = data.find(rs => rs.user_id === op.userId);
            op.data.callback(userRoleState);,
}
        });,
} catch (error) { logger.error('批量验证失败', error);,
}
    },
}

  /**
  * 获取批处理器状态
   */
  public getStatus() { return {
      queueSize: this.operationQueue.length,
      processing: this.processing,
      lastProcessTime: this.lastProcessTime,
      batchSize: this.batchSize,
      batchInterval: this.batchInterval,
};,
}

  /**
  * 清空队列
   */
  public clearQueue(): void { this.operationQueue = [];
    logger.debug('批处理队列已清空');,
}

  /**
  * 更新批处理配置
   */
  public updateConfig(config: { batchSize?: number;
    batchInterval?: number;
    maxWaitTime?: number;,
}): void { if (config.batchSize) this.batchSize = config.batchSize;
    if (config.batchInterval) this.batchInterval = config.batchInterval;
    if (config.maxWaitTime) this.maxWaitTime = config.maxWaitTime;

    logger.debug('批处理配置已更新', config);,
}
}

export const skillBatchProcessor = SkillBatchProcessor.getInstance();