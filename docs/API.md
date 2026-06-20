# API 文档

## 服务层 API

### 认证服务 (AuthProvider)

#### 方法

- `login(email: string, password: string)` - 用户登录
- `signup(email: string, password: string, displayName: string)` - 用户注册
- `logout()` - 用户登出
- `requireAuth()` - 要求认证，未登录时显示登录对话框

#### 状态

- `currentUser` - 当前用户信息
- `isLoggedIn` - 登录状态
- `initializing` - 初始化状态

### 游戏服务 (GameService)

#### 游戏控制

```typescript
// 开始游戏
GameService.startGame(roomId: string): Promise<string>

// 推进游戏阶段
GameService.advanceGamePhase(roomId: string): Promise<{
  new_phase: number;
  new_round: number;
  phase_end_time: string | null;
}>

// 暂停/恢复游戏
GameService.toggleGamePause(roomId: string): Promise<boolean>

// 结束游戏
GameService.endGame(roomId: string, reason: string, winnerFaction?: string): Promise<void>
```

#### 游戏设置

```typescript
GameService.updateGameSettings(roomId: string, settings: {
  day_duration?: number;
  evening_duration?: number;
  night_duration?: number;
  dawn_duration?: number;
  is_auto_advance?: boolean;
}): Promise<void>
```

### 房间服务 (RoomService)

#### 房间操作

```typescript
// 加入房间
RoomService.joinRoom(roomId: string, userId: string): Promise<void>

// 离开房间
RoomService.leaveRoom(roomId: string, userId: string): Promise<void>

// 清除角色选择
RoomService.clearRoleSelection(roomId: string, userId: string): Promise<void>

// 更新准备状态
RoomService.updatePlayerReadyStatus(roomId: string, userId: string, isReady: boolean): Promise<void>

// 创建下一个房间
RoomService.createNextRoom(roomId: string): Promise<string>
```

### 技能服务 (EnhancedSkillService)

#### 技能使用

```typescript
// 使用技能
EnhancedSkillService.useSkillEnhanced(context: SkillUsageContext): Promise<string>

// 获取技能建议
EnhancedSkillService.getSkillUsageSuggestion(context: SkillUsageContext): Promise<{
  canUse: boolean;
  suggestion: string;
  timing: string;
}>

// 验证技能使用
EnhancedSkillService.validateSkillUsage(context: SkillUsageContext): Promise<SkillValidationResult>
```

#### 技能上下文

```typescript
interface SkillUsageContext {
  user: { id: string };
  gameState: { id: string; current_phase: number; current_round: number };
  room: { id: string };
  phase: number;
  round: number;
  roleState: any;
  roleDesign: any;
  skillName: string;
  targetUserId?: string;
  skillData?: any;
}
```

### 投票服务 (VotingService)

#### 投票操作

```typescript
// 创建投票会话
VotingService.createVotingSession(gameStateId: string, roomId: string, roundNumber: number, phase: number): Promise<string>

// 投票
VotingService.castVote(votingSessionId: string, voterId: string, targetId?: string): Promise<boolean>

// 计算投票结果
VotingService.calculateVotingResults(votingSessionId: string): Promise<void>

// 处理投票结果
VotingService.processVotingResult(votingResultId: string): Promise<boolean>
```

## Hooks API

### 游戏状态 Hooks

```typescript
// 游戏状态
useGameState(roomId: string): {
  gameState: GameState | null;
  loading: boolean;
  error: string | null;
}

// 角色状态
useRoleStates(roomId: string): {
  roleStates: RoleState[];
  loading: boolean;
}

// 玩家状态
usePlayersRealtime(roomId: string): {
  players: Player[];
  loading: boolean;
}
```

### 技能系统 Hooks

```typescript
// 增强技能系统
useEnhancedSkillSystem(gameStateId: string, roleState: any): {
  useSkill: (skillName: string, targetUserId?: string, skillData?: any) => Promise<void>;
  activeSkills: SkillConfig[];
  skillValidation: (skillName: string, targetUserId?: string) => SkillValidationResult;
  loading: boolean;
  error: string | null;
}

// 技能冲突解决
useSkillConflicts(gameStateId: string): {
  conflicts: SkillConflict[];
  resolveConflict: (conflictId: string, resolutionType: string) => Promise<void>;
  loading: boolean;
}
```

### 投票系统 Hooks

```typescript
// 投票系统
useVotingSystem(gameStateId: string, roomId: string): {
  currentSession: VotingSession | null;
  castVote: (targetId?: string) => Promise<void>;
  results: VotingResult[];
  loading: boolean;
}

// 投票结果
useVoteResults(votingSessionId: string): {
  results: VotingResult[];
  processResult: (resultId: string) => Promise<void>;
  loading: boolean;
}
```

### 聊天系统 Hooks

```typescript
// 多频道聊天
useMultiChannelChat(roomId: string): {
  channels: ChatChannel[];
  messages: Record<string, ChatMessage[]>;
  sendMessage: (message: string, chatType: string, recipientId?: string) => Promise<void>;
  currentChannel: string;
  setCurrentChannel: (channel: string) => void;
}
```

## 数据库函数

### 游戏相关

- `start_game(p_room_id)` - 开始游戏
- `advance_game_phase(p_room_id)` - 推进游戏阶段
- `toggle_game_pause(p_room_id)` - 切换游戏暂停状态

### 技能相关

- `use_skill_enhanced(p_game_state_id, p_skill_name, p_target_user_id, p_skill_data)` - 增强技能使用
- `process_skill_effects(p_game_state_id)` - 处理技能效果
- `cleanup_expired_skill_effects()` - 清理过期技能效果

### 投票相关

- `create_voting_session(p_game_state_id, p_room_id, p_round_number, p_phase)` - 创建投票会话
- `cast_vote(p_voting_session_id, p_voter_id, p_target_id)` - 投票
- `calculate_voting_results(p_voting_session_id)` - 计算投票结果
- `process_voting_result(p_voting_result_id)` - 处理投票结果

## 错误处理

所有 API 使用统一的错误处理机制：

```typescript
try {
  await GameService.startGame(roomId);
} catch (error) {
  if (error instanceof AppError) {
    console.error(`[${error.code}] ${error.message}`, error.details);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## 实时数据

使用 Supabase Realtime 进行实时数据同步：

- 游戏状态变化
- 角色状态更新
- 聊天消息
- 投票状态
- 技能使用记录

## 权限控制

所有 API 都通过 Row Level Security (RLS) 进行权限控制：

- 房间参与者可以查看房间相关数据
- 法官具有房间管理权限
- 用户只能操作自己的数据
- 系统函数具有适当的权限提升
