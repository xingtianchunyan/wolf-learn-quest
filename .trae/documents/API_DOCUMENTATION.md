# API文档

## 概述

本文档详细介绍了狼人杀学习任务项目的所有API端点、WebSocket事件、错误码和数据模型。

## 目录

- [REST API端点](#rest-api端点)
- [WebSocket事件](#websocket事件)
- [数据模型](#数据模型)
- [错误码](#错误码)
- [认证授权](#认证授权)
- [最佳实践](#最佳实践)

## REST API端点

### 基础信息

- **基础URL**: `http://localhost:3000/api`
- **API版本**: v1
- **内容类型**: `application/json`
- **字符编码**: UTF-8

### 认证相关

#### POST /auth/login

用户登录

**请求体**:

```json
{
  "username": "string",
  "password": "string",
  "rememberMe": "boolean"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "admin | moderator | player",
      "avatar": "string",
      "createdAt": "string",
      "lastLoginAt": "string"
    },
    "token": "string",
    "refreshToken": "string",
    "expiresIn": "number"
  },
  "message": "登录成功"
}
```

**错误响应**:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "用户名或密码错误",
    "details": {}
  }
}
```

#### POST /auth/register

用户注册

**请求体**:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "player",
      "avatar": "string",
      "createdAt": "string"
    }
  },
  "message": "注册成功"
}
```

#### POST /auth/refresh

刷新访问令牌

**请求体**:

```json
{
  "refreshToken": "string"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "token": "string",
    "expiresIn": "number"
  }
}
```

#### POST /auth/logout

用户登出

**请求头**:

```
Authorization: Bearer <token>
```

**响应**:

```json
{
  "success": true,
  "message": "登出成功"
}
```

### 用户管理

#### GET /users/profile

获取当前用户信息

**请求头**:

```
Authorization: Bearer <token>
```

**响应**:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "avatar": "string",
    "stats": {
      "gamesPlayed": "number",
      "gamesWon": "number",
      "winRate": "number",
      "favoriteRole": "string"
    },
    "preferences": {
      "theme": "light | dark",
      "language": "zh | en",
      "notifications": "boolean"
    },
    "createdAt": "string",
    "lastLoginAt": "string"
  }
}
```

#### PUT /users/profile

更新用户信息

**请求头**:

```
Authorization: Bearer <token>
```

**请求体**:

```json
{
  "username": "string",
  "email": "string",
  "avatar": "string",
  "preferences": {
    "theme": "light | dark",
    "language": "zh | en",
    "notifications": "boolean"
  }
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "user": "UserProfile"
  },
  "message": "更新成功"
}
```

#### GET /users/:id

获取指定用户信息

**路径参数**:

- `id`: 用户ID

**响应**:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "username": "string",
    "avatar": "string",
    "role": "string",
    "stats": {
      "gamesPlayed": "number",
      "gamesWon": "number",
      "winRate": "number"
    },
    "createdAt": "string"
  }
}
```

### 游戏管理

#### GET /games

获取游戏列表

**查询参数**:

- `page`: 页码 (默认: 1)
- `limit`: 每页数量 (默认: 10)
- `status`: 游戏状态 (`waiting | playing | finished`)
- `mode`: 游戏模式 (`classic | custom`)
- `search`: 搜索关键词

**响应**:

```json
{
  "success": true,
  "data": {
    "games": [
      {
        "id": "string",
        "name": "string",
        "mode": "classic | custom",
        "status": "waiting | playing | finished",
        "currentPlayers": "number",
        "maxPlayers": "number",
        "createdBy": "string",
        "createdAt": "string",
        "startedAt": "string",
        "endedAt": "string"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number"
    }
  }
}
```

#### POST /games

创建游戏

**请求头**:

```
Authorization: Bearer <token>
```

**请求体**:

```json
{
  "name": "string",
  "mode": "classic | custom",
  "maxPlayers": "number",
  "settings": {
    "dayDuration": "number",
    "nightDuration": "number",
    "discussionDuration": "number",
    "votingDuration": "number",
    "roles": {
      "werewolf": "number",
      "villager": "number",
      "seer": "number",
      "witch": "number",
      "hunter": "number"
    }
  },
  "isPrivate": "boolean",
  "password": "string"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "game": {
      "id": "string",
      "name": "string",
      "mode": "string",
      "status": "waiting",
      "settings": "GameSettings",
      "createdBy": "string",
      "createdAt": "string"
    }
  },
  "message": "游戏创建成功"
}
```

#### GET /games/:id

获取游戏详情

**路径参数**:

- `id`: 游戏ID

**响应**:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "mode": "string",
    "status": "string",
    "phase": "string",
    "currentPlayers": "number",
    "maxPlayers": "number",
    "settings": "GameSettings",
    "players": [
      {
        "id": "string",
        "username": "string",
        "avatar": "string",
        "role": "string",
        "isAlive": "boolean",
        "position": "number"
      }
    ],
    "events": [
      {
        "id": "string",
        "type": "string",
        "description": "string",
        "timestamp": "string"
      }
    ],
    "createdBy": "string",
    "createdAt": "string",
    "startedAt": "string",
    "endedAt": "string"
  }
}
```

#### POST /games/:id/join

加入游戏

**路径参数**:

- `id`: 游戏ID

**请求头**:

```
Authorization: Bearer <token>
```

**请求体**:

```json
{
  "password": "string"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "player": {
      "id": "string",
      "username": "string",
      "avatar": "string",
      "position": "number"
    }
  },
  "message": "加入游戏成功"
}
```

#### POST /games/:id/leave

离开游戏

**路径参数**:

- `id`: 游戏ID

**请求头**:

```
Authorization: Bearer <token>
```

**响应**:

```json
{
  "success": true,
  "message": "离开游戏成功"
}
```

#### POST /games/:id/start

开始游戏

**路径参数**:

- `id`: 游戏ID

**请求头**:

```
Authorization: Bearer <token>
```

**响应**:

```json
{
  "success": true,
  "data": {
    "game": "GameState"
  },
  "message": "游戏开始"
}
```

### 游戏操作

#### POST /games/:id/vote

投票

**路径参数**:

- `id`: 游戏ID

**请求头**:

```
Authorization: Bearer <token>
```

**请求体**:

```json
{
  "targetId": "string",
  "voteType": "eliminate | skip"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "vote": {
      "voterId": "string",
      "targetId": "string",
      "voteType": "string",
      "timestamp": "string"
    }
  },
  "message": "投票成功"
}
```

#### POST /games/:id/skill

使用技能

**路径参数**:

- `id`: 游戏ID

**请求头**:

```
Authorization: Bearer <token>
```

**请求体**:

```json
{
  "skillType": "string",
  "targetId": "string",
  "parameters": "object"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "skillResult": {
      "skillType": "string",
      "executorId": "string",
      "targetId": "string",
      "success": "boolean",
      "effects": "array",
      "timestamp": "string"
    }
  },
  "message": "技能使用成功"
}
```

#### POST /games/:id/message

发送消息

**路径参数**:

- `id`: 游戏ID

**请求头**:

```
Authorization: Bearer <token>
```

**请求体**:

```json
{
  "content": "string",
  "type": "public | private | system",
  "targetId": "string"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "string",
      "content": "string",
      "type": "string",
      "senderId": "string",
      "targetId": "string",
      "timestamp": "string"
    }
  },
  "message": "消息发送成功"
}
```

### 统计数据

#### GET /stats/user/:id

获取用户统计数据

**路径参数**:

- `id`: 用户ID

**查询参数**:

- `period`: 统计周期 (`day | week | month | year | all`)

**响应**:

```json
{
  "success": true,
  "data": {
    "gamesPlayed": "number",
    "gamesWon": "number",
    "winRate": "number",
    "roleStats": {
      "werewolf": {
        "played": "number",
        "won": "number",
        "winRate": "number"
      },
      "villager": {
        "played": "number",
        "won": "number",
        "winRate": "number"
      }
    },
    "skillStats": {
      "skillsUsed": "number",
      "successfulSkills": "number",
      "skillSuccessRate": "number"
    },
    "timeStats": {
      "totalPlayTime": "number",
      "averageGameDuration": "number"
    }
  }
}
```

#### GET /stats/game/:id

获取游戏统计数据

**路径参数**:

- `id`: 游戏ID

**响应**:

```json
{
  "success": true,
  "data": {
    "duration": "number",
    "phases": "number",
    "votes": "number",
    "skillsUsed": "number",
    "messages": "number",
    "playerStats": [
      {
        "playerId": "string",
        "role": "string",
        "survived": "boolean",
        "votes": "number",
        "skillsUsed": "number",
        "messages": "number"
      }
    ]
  }
}
```

## WebSocket事件

### 连接管理

#### 连接建立

**URL**: `ws://localhost:3000/ws`

**认证**: 通过查询参数传递token

```
ws://localhost:3000/ws?token=<jwt_token>
```

#### 连接事件

**客户端 → 服务器**:

```typescript
// 加入游戏房间
{
  "type": "join_game",
  "data": {
    "gameId": "string"
  }
}

// 离开游戏房间
{
  "type": "leave_game",
  "data": {
    "gameId": "string"
  }
}

// 心跳检测
{
  "type": "ping",
  "data": {}
}
```

**服务器 → 客户端**:

```typescript
// 连接确认
{
  "type": "connected",
  "data": {
    "userId": "string",
    "connectionId": "string"
  }
}

// 心跳响应
{
  "type": "pong",
  "data": {}
}

// 错误消息
{
  "type": "error",
  "data": {
    "code": "string",
    "message": "string"
  }
}
```

### 游戏事件

#### 游戏状态变更

**服务器 → 客户端**:

```typescript
// 游戏开始
{
  "type": "game_started",
  "data": {
    "gameId": "string",
    "players": "Player[]",
    "settings": "GameSettings"
  }
}

// 阶段变更
{
  "type": "phase_changed",
  "data": {
    "gameId": "string",
    "phase": "string",
    "duration": "number",
    "timestamp": "string"
  }
}

// 玩家加入
{
  "type": "player_joined",
  "data": {
    "gameId": "string",
    "player": "Player"
  }
}

// 玩家离开
{
  "type": "player_left",
  "data": {
    "gameId": "string",
    "playerId": "string"
  }
}

// 玩家死亡
{
  "type": "player_died",
  "data": {
    "gameId": "string",
    "playerId": "string",
    "cause": "string"
  }
}

// 游戏结束
{
  "type": "game_ended",
  "data": {
    "gameId": "string",
    "winner": "werewolf | villager | draw",
    "reason": "string",
    "survivors": "string[]"
  }
}
```

#### 投票事件

**客户端 → 服务器**:

```typescript
// 投票
{
  "type": "vote",
  "data": {
    "gameId": "string",
    "targetId": "string",
    "voteType": "eliminate | skip"
  }
}
```

**服务器 → 客户端**:

```typescript
// 投票更新
{
  "type": "vote_updated",
  "data": {
    "gameId": "string",
    "votes": {
      "playerId": "string",
      "targetId": "string",
      "voteType": "string"
    }[]
  }
}

// 投票结果
{
  "type": "vote_result",
  "data": {
    "gameId": "string",
    "eliminatedPlayerId": "string",
    "voteCount": "object"
  }
}
```

#### 技能事件

**客户端 → 服务器**:

```typescript
// 使用技能
{
  "type": "use_skill",
  "data": {
    "gameId": "string",
    "skillType": "string",
    "targetId": "string",
    "parameters": "object"
  }
}
```

**服务器 → 客户端**:

```typescript
// 技能使用结果
{
  "type": "skill_used",
  "data": {
    "gameId": "string",
    "executorId": "string",
    "skillType": "string",
    "targetId": "string",
    "success": "boolean",
    "effects": "SkillEffect[]"
  }
}

// 技能冷却更新
{
  "type": "skill_cooldown_updated",
  "data": {
    "gameId": "string",
    "playerId": "string",
    "skillType": "string",
    "remainingTime": "number"
  }
}
```

#### 消息事件

**客户端 → 服务器**:

```typescript
// 发送消息
{
  "type": "send_message",
  "data": {
    "gameId": "string",
    "content": "string",
    "type": "public | private | system",
    "targetId": "string"
  }
}
```

**服务器 → 客户端**:

```typescript
// 新消息
{
  "type": "new_message",
  "data": {
    "gameId": "string",
    "message": {
      "id": "string",
      "content": "string",
      "type": "string",
      "senderId": "string",
      "senderName": "string",
      "targetId": "string",
      "timestamp": "string"
    }
  }
}
```

### 系统事件

**服务器 → 客户端**:

```typescript
// 系统通知
{
  "type": "system_notification",
  "data": {
    "type": "info | warning | error",
    "title": "string",
    "message": "string",
    "timestamp": "string"
  }
}

// 用户状态更新
{
  "type": "user_status_updated",
  "data": {
    "userId": "string",
    "status": "online | offline | in_game",
    "gameId": "string"
  }
}

// 服务器维护通知
{
  "type": "maintenance_notice",
  "data": {
    "message": "string",
    "startTime": "string",
    "duration": "number"
  }
}
```

## 数据模型

### 用户模型

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'player';
  avatar: string;
  stats: UserStats;
  preferences: UserPreferences;
  createdAt: string;
  lastLoginAt: string;
}

interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  favoriteRole: string;
  totalPlayTime: number;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
  notifications: boolean;
  soundEffects: boolean;
  autoReady: boolean;
}
```

### 游戏模型

```typescript
interface Game {
  id: string;
  name: string;
  mode: 'classic' | 'custom';
  status: 'waiting' | 'playing' | 'finished';
  phase: GamePhase;
  currentPlayers: number;
  maxPlayers: number;
  settings: GameSettings;
  players: Player[];
  events: GameEvent[];
  votes: Vote[];
  messages: Message[];
  createdBy: string;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  winner?: 'werewolf' | 'villager' | 'draw';
  winReason?: string;
}

interface GameSettings {
  dayDuration: number;
  nightDuration: number;
  discussionDuration: number;
  votingDuration: number;
  roles: RoleDistribution;
  allowSpectators: boolean;
  isPrivate: boolean;
  password?: string;
}

interface RoleDistribution {
  werewolf: number;
  villager: number;
  seer: number;
  witch: number;
  hunter: number;
}

type GamePhase =
  | 'waiting'
  | 'night'
  | 'day_discussion'
  | 'day_voting'
  | 'finished';
```

### 玩家模型

```typescript
interface Player {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  role: PlayerRole;
  isAlive: boolean;
  position: number;
  skills: PlayerSkill[];
  votes: number;
  isReady: boolean;
  lastActivity: string;
}

type PlayerRole = 'werewolf' | 'villager' | 'seer' | 'witch' | 'hunter';

interface PlayerSkill {
  type: string;
  usesRemaining: number;
  cooldownUntil?: string;
  isActive: boolean;
}
```

### 事件模型

```typescript
interface GameEvent {
  id: string;
  type: GameEventType;
  description: string;
  playerId?: string;
  targetId?: string;
  data?: any;
  timestamp: string;
  phase: GamePhase;
}

type GameEventType =
  | 'game_started'
  | 'phase_changed'
  | 'player_joined'
  | 'player_left'
  | 'player_died'
  | 'player_voted'
  | 'skill_used'
  | 'game_ended';
```

### 投票模型

```typescript
interface Vote {
  id: string;
  gameId: string;
  voterId: string;
  targetId: string;
  voteType: 'eliminate' | 'skip';
  timestamp: string;
  phase: GamePhase;
}

interface VoteResult {
  eliminatedPlayerId?: string;
  voteCount: Record<string, number>;
  totalVotes: number;
  requiredVotes: number;
}
```

### 消息模型

```typescript
interface Message {
  id: string;
  gameId: string;
  content: string;
  type: 'public' | 'private' | 'system';
  senderId: string;
  senderName: string;
  targetId?: string;
  timestamp: string;
  phase: GamePhase;
}
```

### 技能模型

```typescript
interface Skill {
  type: string;
  name: string;
  description: string;
  role: PlayerRole;
  maxUses: number;
  cooldown: number;
  targetType: 'self' | 'other' | 'any';
  phaseRestriction: GamePhase[];
}

interface SkillResult {
  success: boolean;
  effects: SkillEffect[];
  message: string;
  timestamp: string;
}

interface SkillEffect {
  type: 'kill' | 'protect' | 'reveal' | 'heal' | 'poison';
  targetId: string;
  duration?: number;
  value?: any;
}
```

## 错误码

### 认证错误 (AUTH\_\*)

| 错误码                        | HTTP状态码 | 描述             |
| ----------------------------- | ---------- | ---------------- |
| AUTH_INVALID_CREDENTIALS      | 401        | 用户名或密码错误 |
| AUTH_TOKEN_EXPIRED            | 401        | 访问令牌已过期   |
| AUTH_TOKEN_INVALID            | 401        | 访问令牌无效     |
| AUTH_REFRESH_TOKEN_EXPIRED    | 401        | 刷新令牌已过期   |
| AUTH_REFRESH_TOKEN_INVALID    | 401        | 刷新令牌无效     |
| AUTH_INSUFFICIENT_PERMISSIONS | 403        | 权限不足         |
| AUTH_ACCOUNT_LOCKED           | 423        | 账户已锁定       |
| AUTH_ACCOUNT_DISABLED         | 423        | 账户已禁用       |

### 验证错误 (VALIDATION\_\*)

| 错误码                       | HTTP状态码 | 描述         |
| ---------------------------- | ---------- | ------------ |
| VALIDATION_REQUIRED_FIELD    | 400        | 必填字段缺失 |
| VALIDATION_INVALID_FORMAT    | 400        | 字段格式无效 |
| VALIDATION_VALUE_TOO_SHORT   | 400        | 字段值太短   |
| VALIDATION_VALUE_TOO_LONG    | 400        | 字段值太长   |
| VALIDATION_INVALID_EMAIL     | 400        | 邮箱格式无效 |
| VALIDATION_INVALID_PASSWORD  | 400        | 密码格式无效 |
| VALIDATION_PASSWORD_MISMATCH | 400        | 密码不匹配   |
| VALIDATION_USERNAME_EXISTS   | 409        | 用户名已存在 |
| VALIDATION_EMAIL_EXISTS      | 409        | 邮箱已存在   |

### 游戏错误 (GAME\_\*)

| 错误码                      | HTTP状态码 | 描述                 |
| --------------------------- | ---------- | -------------------- |
| GAME_NOT_FOUND              | 404        | 游戏不存在           |
| GAME_ALREADY_STARTED        | 409        | 游戏已开始           |
| GAME_ALREADY_FINISHED       | 409        | 游戏已结束           |
| GAME_FULL                   | 409        | 游戏人数已满         |
| GAME_NOT_ENOUGH_PLAYERS     | 400        | 游戏人数不足         |
| GAME_INVALID_PASSWORD       | 401        | 游戏密码错误         |
| GAME_PLAYER_NOT_IN_GAME     | 403        | 玩家不在游戏中       |
| GAME_PLAYER_ALREADY_IN_GAME | 409        | 玩家已在游戏中       |
| GAME_INVALID_PHASE          | 400        | 游戏阶段无效         |
| GAME_ACTION_NOT_ALLOWED     | 403        | 当前阶段不允许此操作 |

### 技能错误 (SKILL\_\*)

| 错误码                  | HTTP状态码 | 描述               |
| ----------------------- | ---------- | ------------------ |
| SKILL_NOT_FOUND         | 404        | 技能不存在         |
| SKILL_NOT_AVAILABLE     | 403        | 技能不可用         |
| SKILL_ON_COOLDOWN       | 429        | 技能冷却中         |
| SKILL_NO_USES_REMAINING | 403        | 技能使用次数已用完 |
| SKILL_INVALID_TARGET    | 400        | 技能目标无效       |
| SKILL_TARGET_NOT_FOUND  | 404        | 技能目标不存在     |
| SKILL_EXECUTION_FAILED  | 500        | 技能执行失败       |

### 网络错误 (NETWORK\_\*)

| 错误码                    | HTTP状态码 | 描述         |
| ------------------------- | ---------- | ------------ |
| NETWORK_CONNECTION_FAILED | 503        | 网络连接失败 |
| NETWORK_TIMEOUT           | 408        | 网络请求超时 |
| NETWORK_RATE_LIMITED      | 429        | 请求频率限制 |

### 服务器错误 (SERVER\_\*)

| 错误码                | HTTP状态码 | 描述           |
| --------------------- | ---------- | -------------- |
| SERVER_INTERNAL_ERROR | 500        | 服务器内部错误 |
| SERVER_DATABASE_ERROR | 500        | 数据库错误     |
| SERVER_MAINTENANCE    | 503        | 服务器维护中   |

## 认证授权

### JWT令牌

项目使用JWT (JSON Web Token) 进行身份认证。

**令牌结构**:

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "username": "string",
    "role": "string",
    "iat": "number",
    "exp": "number"
  },
  "signature": "string"
}
```

**使用方式**:

```http
Authorization: Bearer <jwt_token>
```

### 权限级别

| 角色      | 权限               |
| --------- | ------------------ |
| admin     | 所有权限           |
| moderator | 游戏管理、用户管理 |
| player    | 基本游戏功能       |

### 权限检查

API端点会根据用户角色进行权限检查：

```typescript
// 示例：只有管理员可以删除游戏
DELETE /games/:id
Required Role: admin

// 示例：只有游戏创建者或管理员可以开始游戏
POST /games/:id/start
Required: game_creator OR admin
```

## 最佳实践

### API调用

1. **错误处理**：始终检查响应的`success`字段
2. **重试机制**：对网络错误实施指数退避重试
3. **缓存策略**：合理缓存不经常变化的数据
4. **请求去重**：避免重复发送相同请求
5. **超时设置**：设置合理的请求超时时间

### WebSocket使用

1. **连接管理**：实现自动重连机制
2. **心跳检测**：定期发送ping消息保持连接
3. **事件处理**：使用事件驱动架构处理消息
4. **错误恢复**：处理连接断开和重连场景
5. **消息队列**：离线时缓存消息，重连后发送

### 性能优化

1. **分页查询**：大数据量使用分页
2. **字段选择**：只请求需要的字段
3. **批量操作**：合并多个相似请求
4. **压缩传输**：启用gzip压缩
5. **CDN加速**：静态资源使用CDN

### 安全考虑

1. **HTTPS**：生产环境使用HTTPS
2. **输入验证**：严格验证所有输入
3. **SQL注入防护**：使用参数化查询
4. **XSS防护**：对输出进行转义
5. **CSRF防护**：使用CSRF令牌

## 示例代码

### JavaScript/TypeScript客户端

```typescript
// API客户端封装
class ApiClient {
  private baseURL = 'http://localhost:3000/api';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!data.success) {
      throw new ApiError(data.error.code, data.error.message);
    }

    return data;
  }

  // 用户相关
  async login(credentials: LoginCredentials) {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    return this.request<UserProfile>('/users/profile');
  }

  // 游戏相关
  async getGames(params: GetGamesParams) {
    const query = new URLSearchParams(params).toString();
    return this.request<GamesResponse>(`/games?${query}`);
  }

  async createGame(gameData: CreateGameData) {
    return this.request<CreateGameResponse>('/games', {
      method: 'POST',
      body: JSON.stringify(gameData),
    });
  }

  async joinGame(gameId: string, password?: string) {
    return this.request<JoinGameResponse>(`/games/${gameId}/join`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  }
}

// WebSocket客户端封装
class WebSocketClient {
  private ws: WebSocket | null = null;
  private token: string;
  private eventHandlers: Map<string, Function[]> = new Map();

  constructor(token: string) {
    this.token = token;
  }

  connect() {
    const url = `ws://localhost:3000/ws?token=${this.token}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.startHeartbeat();
    };

    this.ws.onmessage = event => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.reconnect();
    };

    this.ws.onerror = error => {
      console.error('WebSocket error:', error);
    };
  }

  private handleMessage(message: WebSocketMessage) {
    const handlers = this.eventHandlers.get(message.type) || [];
    handlers.forEach(handler => handler(message.data));
  }

  on(eventType: string, handler: Function) {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)!.push(handler);
  }

  off(eventType: string, handler: Function) {
    const handlers = this.eventHandlers.get(eventType) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  send(type: string, data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }

  private startHeartbeat() {
    setInterval(() => {
      this.send('ping', {});
    }, 30000);
  }

  private reconnect() {
    setTimeout(() => {
      this.connect();
    }, 5000);
  }
}

// 使用示例
const apiClient = new ApiClient();
const wsClient = new WebSocketClient(token);

// 登录
try {
  const response = await apiClient.login({
    username: 'player1',
    password: 'password123',
  });

  apiClient.setToken(response.data.token);
  wsClient.connect();
} catch (error) {
  console.error('Login failed:', error);
}

// 监听游戏事件
wsClient.on('game_started', data => {
  console.log('Game started:', data);
});

wsClient.on('phase_changed', data => {
  console.log('Phase changed:', data);
});

// 加入游戏
wsClient.send('join_game', { gameId: 'game-123' });
```

## 更新日志

### v1.0.0 (2024-12-19)

- 初始版本发布
- 完成所有REST API端点文档
- 完成WebSocket事件文档
- 完成数据模型定义
- 完成错误码规范
- 添加认证授权说明
- 提供完整的示例代码
