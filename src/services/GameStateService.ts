/**
 * @fileoverview 游戏状态服务
 * 专业化的游戏状态管理服务，负责处理游戏状态的维护、同步和持久化
 *
 * @author SOLO Coding
 * @version 1.0.0
 * @since 2024-12-19
 */
import type  {
  GameState,
  GamePhase,
  RoleType,
  PlayerState,
  VoteResult,
  GameEvent,
  GameConfig  } from '@/types/game';
import { getGameConfig  } from
  validateGameConfig,
  calculateRoleDistribution  } from '@/config/gameConfig';
import { validateValue  } from
  VALIDATION_RULE_GROUPS  } from '@/config/validationRules';
import { formatError  } from '@/config/errorMessages';
import { EventEmitter  } from '@/patterns/observer/EventEmitter';
import { StateHistoryManager  } from
  GamePhaseManager  } from '@/utils/common/stateHelpers';
import { MemoryCache  } from '@/utils/common/cacheUtils';

/**
 * 游戏状态变更接口
 */
export interface GameStateChange  {
  /** 变更类型 */
  type: 'phase' | 'player' | 'vote' | 'skill' | 'config' | 'event';
  /** 变更时间戳 */
  timestamp: number;
  /** 变更数据 */
  data: any;
  /** 变更原因 */
  reason?: string;
  /** 操作者ID */
  operatorId?: string
}

/**
 * 游戏状态快照接口
 */
export interface GameStateSnapshot  {
  /** 快照ID */
  id: string;
  /** 游戏ID */
  gameId: string;
  /** 快照时间戳 */
  timestamp: number;
  /** 游戏状态 */
  state: GameState;
  /** 快照描述 */
  description: string;
  /** 快照类型 */
  type: 'manual' | 'auto' | 'checkpoint'
}

/**
 * 游戏状态同步配置接口
 */
export interface GameStateSyncConfig  {
  /** 是否启用自动同步 */
  autoSync: boolean;
  /** 同步间隔（毫秒） */
  syncInterval: number;
  /** 是否启用增量同步 */
  incrementalSync: boolean;
  /** 最大重试次数 */
  maxRetries: number;
  /** 同步超时时间 */
  timeout: number
}

/**
 * 游戏状态验证结果接口
 */
export interface GameStateValidationResult  {
  /** 是否有效 */
  isValid: boolean;
  /** 错误列表 */
  errors: string[];
  /** 警告列表 */
  warnings: string[];
  /** 修复建议 */
  suggestions: string[]
}

/**
 * 游戏状态服务类
 */
export class GameStateService  {
  private static instance: GameStateService;
  private eventEmitter: EventEmitter;
  private stateHistory: StateHistoryManager<GameState>;
  private phaseManager: GamePhaseManager;
  private stateCache: MemoryCache<GameState>;
  private snapshotCache: MemoryCache<GameStateSnapshot>;
  private gameStates: Map<string, GameState>;
  private syncConfig: GameStateSyncConfig;
  private syncTimers: Map<string, NodeJS.Timeout>;

  /**
 * 构造函数
 */
private constructor()  {
    this.eventEmitter = new EventEmitter();
    this.stateHistory = new StateHistoryManager<GameState>({
      maxHistorySize: 1000,
      enableCompression: true 
});
    this.phaseManager = new GamePhaseManager();
    this.stateCache = new MemoryCache<GameState>({
      maxSize: 100,
      ttl: 300000, // 5分钟
    });
    this.snapshotCache = new MemoryCache<GameStateSnapshot>({
      maxSize: 50,
      ttl: 3600000, // 1小时
    });
    this.gameStates = new Map();
    this.syncTimers = new Map();

    this.syncConfig = { autoSync: true,
      syncInterval: 5000, // 5秒
      incrementalSync: true,
      maxRetries: 3,
      timeout: 10000, // 10秒
     };

    this.initializeEventHandlers()
}

  /**
 * 获取单例实例
 */
public static getInstance(): GameStateService  {
    if (!GameStateService.instance) {
      GameStateService.instance = new GameStateService()
}
    return GameStateService.instance
}

  /**
 * 初始化事件处理器
 */
private initializeEventHandlers(): void  {
    this.eventEmitter.on('gameStateChanged', (change: GameStateChange) => {
  this.handleStateChange(change)

});

    this.eventEmitter.on('gamePhaseChanged', (data: any) => {
  this.handlePhaseChange(data)

});

    this.eventEmitter.on('playerStateChanged', (data: any) => {
  this.handlePlayerStateChange(data)
})

}

  /**
   * 创建新游戏
   * @param gameId - 游戏ID
   * @param config - 游戏配置
   * @param players - 玩家列表
   * @returns 初始游戏状态
   */
  public async createGame(
    gameId: string,
    config: Partial<GameConfig>,
    players: string[]
  ): Promise<GameState> {
    try {
      // 1. 验证游戏配置
      const completeConfig = getGameConfig(config.mode || 'classic');
      const configValidation = validateGameConfig({
        ...completeConfig,
        ...config });

      if (!configValidation.isValid) {
        throw new Error(
          formatError('GAME_001', configValidation.errors).message
        )
}

      // 2. 验证玩家数量
      if (
        players.length < completeConfig.minPlayers ||
        players.length > completeConfig.maxPlayers
      ) {
        throw new Error(
          formatError('GAME_002', {
            current: players.length,
            min: completeConfig.minPlayers,
            max: completeConfig.maxPlayers 
}).message
        )
}

      // 3. 分配角色
      const roleDistribution = calculateRoleDistribution(
        players.length,
        completeConfig.roleConfig
      );
      const playerStates = this.assignRoles(players, roleDistribution);

      // 4. 创建初始游戏状态
      const initialState: GameState = {
        gameId,
        phase: 'waiting',
        round: 0,
        turn: 0,
        players: playerStates,
        config: { ...completeConfig, ...config },
        events: [],
        votes: [],
        skills: [],
        startTime: Date.now(),
        lastUpdateTime: Date.now(),
        isActive: true,
        winner: null,
        statistics: {
          totalRounds: 0,
          totalTurns: 0,
          playerActions: {
},
          phaseHistory: [],
          eventCounts: {
} } };

      // 5. 保存游戏状态
      this.gameStates.set(gameId, initialState);
      this.stateCache.set(gameId, initialState);

      // 6. 记录状态历史
      this.stateHistory.recordState(initialState, 'Game created');

      // 7. 创建快照
      await this.createSnapshot(gameId, 'Game initialization', 'auto');

      // 8. 启动自动同步
      if (this.syncConfig.autoSync) {
        this.startAutoSync(gameId)
}

      // 9. 发送事件
      this.eventEmitter.emit('gameCreated', {
        gameId,
        state: initialState,
        timestamp: Date.now() 
});

      return initialState
} catch (error) {
      this.eventEmitter.emit('gameCreationFailed', {
        gameId,
        error,
        timestamp: Date.now() 
});
      throw error
}
  }

  /**
   * 获取游戏状态
   * @param gameId - 游戏ID
   * @returns 游戏状态
   */
public getGameState(gameId: string): GameState | null  {
    // 先从缓存获取
    let state = this.stateCache.get(gameId);

    if (!state) {
      // 从内存获取
      state = this.gameStates.get(gameId);

      if (state) {
        // 更新缓存
        this.stateCache.set(gameId, state)
}
    }

    return state || null
}

  /**
   * 更新游戏状态
   * @param gameId - 游戏ID
   * @param updates - 状态更新
   * @param reason - 更新原因
   * @param operatorId - 操作者ID
   * @returns 更新后的状态
   */
  public async updateGameState(
    gameId: string,
    updates: Partial<GameState>,
    reason?: string,
    operatorId?: string
  ): Promise<GameState> {
    const currentState = this.getGameState(gameId);

    if (!currentState) {
      throw new Error(formatError('GAME_003', { gameId }).message)
}

    try { // 1. 合并状态更新
      const newState: GameState = {
        ...currentState,
        ...updates,
        lastUpdateTime: Date.now()  
};

      // 2. 验证新状态
      const validationResult = this.validateGameState(newState);
      if (!validationResult.isValid) {
        throw new Error(
          formatError('GAME_004', validationResult.errors).message
        )
}

      // 3. 保存新状态
      this.gameStates.set(gameId, newState);
      this.stateCache.set(gameId, newState);

      // 4. 记录状态变更
      const change: GameStateChange = { type: this.determineChangeType(updates),
        timestamp: Date.now(),
        data: updates,
        reason,
        operatorId  };

      this.stateHistory.recordState(newState, reason || 'State updated');

      // 5. 发送事件
      this.eventEmitter.emit('gameStateChanged', change);

      return newState
} catch (error) {
      this.eventEmitter.emit('gameStateUpdateFailed', {
        gameId,
        updates,
        error,
        timestamp: Date.now() 
});
      throw error
}
  }

  /**
   * 更新游戏阶段
   * @param gameId - 游戏ID
   * @param newPhase - 新阶段
   * @param reason - 更新原因
   * @returns 更新后的状态
   */
  public async updateGamePhase(
    gameId: string,
    newPhase: GamePhase,
    reason?: string
  ): Promise<GameState> {
    const currentState = this.getGameState(gameId);

    if (!currentState) {
      throw new Error(formatError('GAME_003', { gameId }).message)
}

    // 验证阶段转换
    const canTransition = this.phaseManager.canTransition(
      currentState.phase,
      newPhase
    );
    if (!canTransition) {
      throw new Error(
        formatError('GAME_005', {
          from: currentState.phase,
          to: newPhase 
}).message
      )
}

    // 执行阶段转换
    const phaseTransition = this.phaseManager.transition(
      currentState.phase,
      newPhase
    );

    const updates: Partial<GameState> = { phase: newPhase,
      turn:
        newPhase === 'day_discussion'
          ? currentState.turn + 1
          : currentState.turn,
      round: newPhase === 'night' ? currentState.round + 1 : currentState.round  
};

    // 添加阶段历史
    if (!updates.statistics) {
      updates.statistics = { ...currentState.statistics }
}
    updates.statistics.phaseHistory = [
      ...currentState.statistics.phaseHistory,
      {
        phase: newPhase,
        startTime: Date.now(),
        duration: 0 
} ];

    const newState = await this.updateGameState(
      gameId,
      updates,
      reason || `Phase changed to ${newPhase}`
    );

    // 发送阶段变更事件
    this.eventEmitter.emit('gamePhaseChanged', {
      gameId,
      oldPhase: currentState.phase,
      newPhase,
      transition: phaseTransition,
      timestamp: Date.now() 
});

    return newState
}

  /**
   * 更新玩家状态
   * @param gameId - 游戏ID
   * @param playerId - 玩家ID
   * @param updates - 玩家状态更新
   * @param reason - 更新原因
   * @returns 更新后的状态
   */
  public async updatePlayerState(
    gameId: string,
    playerId: string,
    updates: Partial<PlayerState>,
    reason?: string
  ): Promise<GameState> {
    const currentState = this.getGameState(gameId);

    if (!currentState) {
      throw new Error(formatError('GAME_003', { gameId }).message)
}

    const playerIndex = currentState.players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) {
      throw new Error(formatError('PLAYER_001', { playerId }).message)
}

    const oldPlayerState = currentState.players[playerIndex];
    const newPlayerState: PlayerState = { ...oldPlayerState,
      ...updates,
      lastActionTime: Date.now()  
};

    const newPlayers = [...currentState.players];
    newPlayers[playerIndex] = newPlayerState;

    const newState = await this.updateGameState(
      gameId,
      { players: newPlayers 
},
      reason || `Player ${playerId} state updated`
    );

    // 发送玩家状态变更事件
    this.eventEmitter.emit('playerStateChanged', {
      gameId,
      playerId,
      oldState: oldPlayerState,
      newState: newPlayerState,
      timestamp: Date.now() 
});

    return newState
}

  /**
   * 添加游戏事件
   * @param gameId - 游戏ID
   * @param event - 游戏事件
   * @returns 更新后的状态
   */
  public async addGameEvent(
    gameId: string,
    event: GameEvent
  ): Promise<GameState> {
    const currentState = this.getGameState(gameId);

    if (!currentState) {
      throw new Error(formatError('GAME_003', { gameId }).message)
}

    const newEvent: GameEvent = {
      ...event,
      id:
        event.id ||
        `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: event.timestamp || Date.now() 
};

    const newEvents = [...currentState.events, newEvent];

    // 限制事件数量
    if (newEvents.length > 1000) {
      newEvents.splice(0, newEvents.length - 1000)
}

    // 更新事件统计
    const newStatistics = { ...currentState.statistics  };
    if (!newStatistics.eventCounts[event.type]) {
      newStatistics.eventCounts[event.type] = 0
}
    newStatistics.eventCounts[event.type]++;

    const newState = await this.updateGameState(
      gameId,
      {
        events: newEvents,
        statistics: newStatistics 
},
      `Added event: ${event.type
}`
    );

    // 发送事件添加通知
    this.eventEmitter.emit('gameEventAdded', {
      gameId,
      event: newEvent,
      timestamp: Date.now() 
});

    return newState
}

  /**
   * 添加投票结果
   * @param gameId - 游戏ID
   * @param voteResult - 投票结果
   * @returns 更新后的状态
   */
  public async addVoteResult(
    gameId: string,
    voteResult: VoteResult
  ): Promise<GameState> {
    const currentState = this.getGameState(gameId);

    if (!currentState) {
      throw new Error(formatError('GAME_003', { gameId }).message)
}

    const newVotes = [...currentState.votes, voteResult];

    const newState = await this.updateGameState(
      gameId,
      { votes: newVotes 
},
      `Added vote result for ${voteResult.targetId}`
    );

    // 发送投票结果事件
    this.eventEmitter.emit('voteResultAdded', {
      gameId,
      voteResult,
      timestamp: Date.now() 
});

    return newState
}

  /**
   * 结束游戏
   * @param gameId - 游戏ID
   * @param winner - 获胜方
   * @param reason - 结束原因
   * @returns 最终状态
   */
  public async endGame(
    gameId: string,
    winner: 'werewolf' | 'villager' | 'draw',
    reason: string
  ): Promise<GameState> {
    const currentState = this.getGameState(gameId);

    if (!currentState) {
      throw new Error(formatError('GAME_003', { gameId }).message)
}

    const endTime = Date.now();
    const duration = endTime - currentState.startTime;

    const finalState = await this.updateGameState(
      gameId,
      {
        phase: 'ended',
        isActive: false,
        winner,
        endTime,
        statistics: {
          ...currentState.statistics,
          gameDuration: duration,
          endReason: reason 
} },
      `Game ended: ${winner
} wins - ${reason}`
    );

    // 停止自动同步
    this.stopAutoSync(gameId);

    // 创建最终快照
    await this.createSnapshot(gameId, 'Game ended', 'checkpoint');

    // 发送游戏结束事件
    this.eventEmitter.emit('gameEnded', {
      gameId,
      winner,
      reason,
      duration,
      finalState,
      timestamp: endTime 
});

    return finalState
}

  /**
   * 验证游戏状态
   * @param state - 游戏状态
   * @returns 验证结果
   */
public validateGameState(state: GameState): GameStateValidationResult  {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    try {
      // 验证基本字段
      if (!state.gameId) {
        errors.push('游戏ID不能为空')
}

      if (!state.phase) {
        errors.push('游戏阶段不能为空')
}

      if (!state.players || state.players.length === 0) {
        errors.push('玩家列表不能为空')
}

      // 验证玩家状态
      if (state.players) {
        for (const player of state.players) {
          const playerValidation = validateValue(
            player,
            VALIDATION_RULE_GROUPS.PLAYER_STATE,
            { gamePhase: state.phase 
}
          );

          if (!playerValidation.isValid) {
            errors.push(
              ...playerValidation.errors.map(e => `玩家 ${player.id}: ${e
}`)
            )
}
        }
      }

      // 验证游戏配置
      if (state.config) {
        const configValidation = validateGameConfig(state.config);
        if (!configValidation.isValid) {
          errors.push(...configValidation.errors)
}
      }

      // 检查游戏逻辑一致性
      this.validateGameLogic(state, errors, warnings, suggestions)
} catch (error) {
      errors.push(`验证过程中发生错误: ${error
}`)
}

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions }
}

  /**
   * 验证游戏逻辑
   * @param state - 游戏状态
   * @param errors - 错误列表
   * @param warnings - 警告列表
   * @param suggestions - 建议列表
   */
  private validateGameLogic(
    state: GameState,
    errors: string[],
    warnings: string[],
    suggestions: string[]
  ): void {
    // 检查存活玩家数量
    const alivePlayers = state.players.filter(p => p.isAlive);
    if (alivePlayers.length === 0 && state.isActive) {
      errors.push('游戏仍在进行中但没有存活玩家')
}

    // 检查角色分配
    const werewolves = state.players.filter(
      p => p.role === 'werewolf' && p.isAlive
    );
    const villagers = state.players.filter(
      p => p.role !== 'werewolf' && p.isAlive
    );

    if (state.isActive) {
      if (werewolves.length === 0 && !state.winner) {
        warnings.push('没有存活的狼人，游戏应该结束');
        suggestions.push('将获胜方设置为村民')
}

      if (werewolves.length >= villagers.length && !state.winner) {
        warnings.push('狼人数量大于等于村民数量，游戏应该结束');
        suggestions.push('将获胜方设置为狼人')
}
    }

    // 检查阶段转换
    if (state.phase === 'ended' && state.isActive) {
      errors.push('游戏已结束但仍标记为活跃状态')
}

    // 检查时间戳
    if (state.lastUpdateTime < state.startTime) {
      errors.push('最后更新时间早于游戏开始时间')
}
  }

  /**
   * 创建状态快照
   * @param gameId - 游戏ID
   * @param description - 快照描述
   * @param type - 快照类型
   * @returns 快照信息
   */
  public async createSnapshot(
    gameId: string,
    description: string,
    type: 'manual' | 'auto' | 'checkpoint' = 'manual'
  ): Promise<GameStateSnapshot> {
    const state = this.getGameState(gameId);

    if (!state) {
      throw new Error(formatError('GAME_003', { gameId }).message)
}

    const snapshot: GameStateSnapshot = {
      id: `snapshot_${gameId
}_${Date.now()}`,
      gameId,
      timestamp: Date.now(),
      state: JSON.parse(JSON.stringify(state)), // 深拷贝
      description,
      type };

    this.snapshotCache.set(snapshot.id, snapshot);

    this.eventEmitter.emit('snapshotCreated', {
      snapshot,
      timestamp: Date.now() 
});

    return snapshot
}

  /**
   * 恢复状态快照
   * @param snapshotId - 快照ID
   * @returns 恢复后的状态
   */
public async restoreSnapshot(snapshotId: string): Promise<GameState>  {
    const snapshot = this.snapshotCache.get(snapshotId);

    if (!snapshot) {
      throw new Error(formatError('GAME_006', { snapshotId }).message)
}

    const restoredState = JSON.parse(JSON.stringify(snapshot.state)); // 深拷贝
    restoredState.lastUpdateTime = Date.now();

    this.gameStates.set(snapshot.gameId, restoredState);
    this.stateCache.set(snapshot.gameId, restoredState);

    this.eventEmitter.emit('snapshotRestored', {
      snapshot,
      restoredState,
      timestamp: Date.now() 
});

    return restoredState
}

  /**
   * 分配角色
   * @param players - 玩家列表
   * @param roleDistribution - 角色分配
   * @returns 玩家状态列表
   */
  private assignRoles(
    players: string[],
    roleDistribution: Record<RoleType, number>
  ): PlayerState[] {
    const roles: RoleType[] = [];

    // 构建角色列表
    for (const [role, count] of Object.entries(roleDistribution)) {
      for (let i = 0; i < count; i++) {
        roles.push(role as RoleType)
}
    }

    // 随机打乱角色
    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]]
}

    // 分配给玩家
    return players.map((playerId, index) => ({
      id: playerId,
      role: roles[index] || 'villager',
      isAlive: true,
      health: 100,
      skills: [],
      effects: [],
      votes: [],
      lastActionTime: Date.now(),
      statistics: {
        actionsPerformed: 0,
        skillsUsed: 0,
        votesReceived: 0,
        survivalTime: 0 
} }))
}

  /**
   * 确定变更类型
   * @param updates - 状态更新
   * @returns 变更类型
   */
  private determineChangeType(
    updates: Partial<GameState>
  ): GameStateChange['type'] {
    if (updates.phase) {return 'phase'
}
    if (updates.players) {return 'player'
}
    if (updates.votes) {return 'vote'
}
    if (updates.skills) {return 'skill'
}
    if (updates.config) {return 'config'
}
    if (updates.events) {return 'event'
}
    return 'event'
}

  /**
   * 处理状态变更
   * @param change - 状态变更
   */
private handleStateChange(change: GameStateChange): void  {
    // 这里可以添加状态变更的后续处理逻辑
    console.log(
      `Game state changed: ${change.type
} at ${new Date(change.timestamp).toISOString()}`
    )
}

  /**
   * 处理阶段变更
   * @param data - 阶段变更数据
   */
private handlePhaseChange(data: any): void  {
    // 这里可以添加阶段变更的后续处理逻辑
    console.log(`Game phase changed from ${data.oldPhase} to ${data.newPhase}`)
}

  /**
   * 处理玩家状态变更
   * @param data - 玩家状态变更数据
   */
private handlePlayerStateChange(data: any): void  {
    // 这里可以添加玩家状态变更的后续处理逻辑
    console.log(`Player ${data.playerId} state changed`)
}

  /**
   * 启动自动同步
   * @param gameId - 游戏ID
   */
private startAutoSync(gameId: string): void  {
    if (this.syncTimers.has(gameId)) {
      this.stopAutoSync(gameId)
}

    const timer = setInterval(() => {
  this.syncGameState(gameId)
}, this.syncConfig.syncInterval);

    this.syncTimers.set(gameId, timer)

}

  /**
   * 停止自动同步
   * @param gameId - 游戏ID
   */
private stopAutoSync(gameId: string): void  {
    const timer = this.syncTimers.get(gameId);
    if (timer) {
      clearInterval(timer);
      this.syncTimers.delete(gameId)
}
  }

  /**
   * 同步游戏状态
   * @param gameId - 游戏ID
   */
private async syncGameState(gameId: string): Promise<void>  {
    try {
      const state = this.getGameState(gameId);
      if (state && state.isActive) {
        // 这里应该与后端API同步状态
        // 暂时只发送同步事件
        this.eventEmitter.emit('gameStateSynced', {
          gameId,
          timestamp: Date.now() 
})
}
    } catch (error) {
      this.eventEmitter.emit('gameStateSyncFailed', {
        gameId,
        error,
        timestamp: Date.now() 
})
}
  }

  /**
   * 获取游戏列表
   * @returns 游戏状态列表
   */
public getGameList(): GameState[]  {
    return Array.from(this.gameStates.values())
}

  /**
   * 删除游戏
   * @param gameId - 游戏ID
   */
public deleteGame(gameId: string): void  {
    this.gameStates.delete(gameId);
    this.stateCache.delete(gameId);
    this.stopAutoSync(gameId);

    // 清理相关快照
    for (const [key, snapshot] of this.snapshotCache.entries()) {
      if (snapshot && snapshot.gameId === gameId) {
        this.snapshotCache.delete(key)
}
    }

    this.eventEmitter.emit('gameDeleted', {
      gameId,
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

  /**
   * 获取状态历史
   * @param gameId - 游戏ID
   * @returns 状态历史
   */
public getStateHistory(gameId: string): any[]  {
    return this.stateHistory.getHistory()
}

  /**
 * 清理过期数据
 */
public cleanup(): void  {
    // 清理过期的游戏状态
    const now = Date.now();
    const expireTime = 24 * 60 * 60 * 1000; // 24小时

    for (const [gameId, state] of this.gameStates.entries()) {
      if (!state.isActive && now - state.lastUpdateTime > expireTime) {
        this.deleteGame(gameId)
}
    }

    // 清理缓存
    this.stateCache.clear();
    this.snapshotCache.clear()
}
}

/**
 * 游戏状态服务单例实例
 */
export const gameStateService = GameStateService.getInstance();
