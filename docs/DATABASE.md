# 数据库设计文档

## 概览

本项目使用Supabase作为后端数据库，采用PostgreSQL数据库系统。

## 数据库架构

### 核心表结构

#### 用户和认证

##### profiles 表
用户配置信息表，扩展Supabase Auth用户数据。

```sql
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL, -- 关联auth.users
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 游戏系统

##### rooms 表
游戏房间信息。

```sql
CREATE TABLE public.rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    creator_id UUID NOT NULL,
    max_players INTEGER DEFAULT 12,
    password TEXT,
    status TEXT DEFAULT 'waiting', -- 'waiting', 'active', 'ended'
    next_room_id UUID REFERENCES rooms(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

##### game_states 表
游戏状态管理。

```sql
CREATE TABLE public.game_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES rooms(id) UNIQUE,
    status TEXT DEFAULT 'waiting', -- 'waiting', 'active', 'paused', 'ended'
    current_phase INTEGER DEFAULT 1, -- 1=白天, 2=傍晚, 3=夜晚, 4=黎明
    current_round INTEGER DEFAULT 1,
    is_paused BOOLEAN DEFAULT false,
    phase_end_time TIMESTAMPTZ,
    winner_faction TEXT,
    end_reason TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
```

##### players 表
房间玩家信息。

```sql
CREATE TABLE public.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES rooms(id),
    user_id UUID NOT NULL,
    player_name TEXT NOT NULL,
    role TEXT,
    is_alive BOOLEAN DEFAULT true,
    is_ready BOOLEAN DEFAULT false,
    is_judge BOOLEAN DEFAULT false,
    joined_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(room_id, user_id)
);
```

#### 角色系统

##### role_designs 表
角色设计配置。

```sql
CREATE TABLE public.role_designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    display_name TEXT,
    faction TEXT NOT NULL, -- 'werewolf', 'villager', 'neutral'
    description TEXT,
    abilities JSONB DEFAULT '[]',
    max_count INTEGER DEFAULT 1,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

##### role_states 表
玩家角色状态。

```sql
CREATE TABLE public.role_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_state_id UUID REFERENCES game_states(id),
    user_id UUID NOT NULL,
    role_name TEXT NOT NULL,
    is_alive BOOLEAN DEFAULT true,
    state_data JSONB DEFAULT '{}',
    skill_uses JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(game_state_id, user_id)
);
```

#### 技能系统

##### skill_uses 表
技能使用记录。

```sql
CREATE TABLE public.skill_uses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_state_id UUID REFERENCES game_states(id),
    user_id UUID NOT NULL,
    skill_name TEXT NOT NULL,
    target_user_id UUID,
    round_number INTEGER NOT NULL,
    phase TEXT NOT NULL, -- 'day', 'evening', 'night', 'dawn'
    is_successful BOOLEAN DEFAULT true,
    effect_data JSONB DEFAULT '{}',
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

##### skill_effects 表
技能效果状态。

```sql
CREATE TABLE public.skill_effects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_state_id UUID REFERENCES game_states(id),
    skill_use_id UUID REFERENCES skill_uses(id),
    target_user_id UUID NOT NULL,
    effect_type TEXT NOT NULL,
    effect_data JSONB DEFAULT '{}',
    expires_at_round INTEGER,
    expires_at_phase TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 题目系统

##### questions 表
题目库。

```sql
CREATE TABLE public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option INTEGER NOT NULL CHECK (correct_option BETWEEN 1 AND 4),
    explanation TEXT,
    difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

##### room_questions 表
房间题目分配。

```sql
CREATE TABLE public.room_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES rooms(id),
    question_id UUID REFERENCES questions(id),
    question_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(room_id, question_order),
    UNIQUE(room_id, question_id)
);
```

##### room_answers 表
玩家答题记录。

```sql
CREATE TABLE public.room_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES rooms(id),
    user_id UUID NOT NULL,
    question_order INTEGER NOT NULL,
    selected_option INTEGER NOT NULL CHECK (selected_option BETWEEN 1 AND 4),
    is_correct BOOLEAN NOT NULL,
    response_time INTEGER, -- 毫秒
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(room_id, user_id, question_order)
);
```

#### 投票系统

##### voting_sessions 表
投票会话。

```sql
CREATE TABLE public.voting_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_state_id UUID REFERENCES game_states(id),
    room_id UUID REFERENCES rooms(id),
    round_number INTEGER NOT NULL,
    phase TEXT NOT NULL,
    voting_type TEXT DEFAULT 'elimination', -- 'elimination', 'sheriff'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

##### votes 表
投票记录。

```sql
CREATE TABLE public.votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voting_session_id UUID REFERENCES voting_sessions(id),
    voter_id UUID NOT NULL,
    target_id UUID, -- NULL表示弃票
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(voting_session_id, voter_id)
);
```

##### voting_results 表
投票结果。

```sql
CREATE TABLE public.voting_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    voting_session_id UUID REFERENCES voting_sessions(id),
    target_id UUID,
    vote_count INTEGER NOT NULL,
    is_eliminated BOOLEAN DEFAULT false,
    tie_broken_by TEXT, -- 'sheriff', 'previous_votes', 'random'
    created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 聊天系统

##### chat_messages 表
聊天消息。

```sql
CREATE TABLE public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES rooms(id),
    sender_id UUID NOT NULL,
    recipient_id UUID, -- NULL表示公开消息
    content TEXT NOT NULL,
    chat_type TEXT DEFAULT 'public', -- 'public', 'private', 'werewolf', 'system'
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### 索引设计

```sql
-- 性能优化索引
CREATE INDEX idx_players_room_user ON players(room_id, user_id);
CREATE INDEX idx_skill_uses_game_round_phase ON skill_uses(game_state_id, round_number, phase);
CREATE INDEX idx_skill_effects_target_active ON skill_effects(target_user_id, is_active);
CREATE INDEX idx_chat_messages_room_type ON chat_messages(room_id, chat_type);
CREATE INDEX idx_votes_session_voter ON votes(voting_session_id, voter_id);
CREATE INDEX idx_room_answers_room_user ON room_answers(room_id, user_id);
```

### 触发器

#### 自动更新时间戳
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 应用到相关表
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
    BEFORE UPDATE ON rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_states_updated_at
    BEFORE UPDATE ON game_states
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_role_states_updated_at
    BEFORE UPDATE ON role_states
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 行级安全策略 (RLS)

### 基本策略原则

1. **认证要求**: 所有操作都需要认证用户
2. **房间权限**: 只有房间参与者可以访问房间数据
3. **角色隔离**: 不同角色有不同的数据访问权限
4. **时间限制**: 某些操作有时间窗口限制

### 示例策略

#### profiles 表
```sql
-- 所有人可以查看profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

-- 用户只能更新自己的profile
CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE USING (auth.uid() = user_id);
```

#### rooms 表
```sql
-- 任何人都可以查看房间列表
CREATE POLICY "Anyone can view rooms" 
ON rooms FOR SELECT USING (true);

-- 只有创建者可以更新房间
CREATE POLICY "Only creator can update room" 
ON rooms FOR UPDATE USING (auth.uid() = creator_id);
```

#### players 表
```sql
-- 房间参与者可以查看玩家列表
CREATE POLICY "Room participants can view players" 
ON players FOR SELECT USING (
    room_id IN (
        SELECT room_id FROM players WHERE user_id = auth.uid()
    )
);
```

## 数据库函数

### 游戏控制函数

#### start_game(p_room_id UUID)
开始游戏，初始化游戏状态。

```sql
CREATE OR REPLACE FUNCTION start_game(p_room_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_game_state_id UUID;
    v_player_count INTEGER;
BEGIN
    -- 验证房间状态和玩家数量
    SELECT COUNT(*) INTO v_player_count
    FROM players
    WHERE room_id = p_room_id AND is_ready = true;
    
    IF v_player_count < 3 THEN
        RAISE EXCEPTION '玩家数量不足，至少需要3名玩家';
    END IF;
    
    -- 创建游戏状态
    INSERT INTO game_states (room_id, status, current_phase, current_round)
    VALUES (p_room_id, 'active', 1, 1)
    RETURNING id INTO v_game_state_id;
    
    -- 更新房间状态
    UPDATE rooms SET status = 'active' WHERE id = p_room_id;
    
    RETURN v_game_state_id::TEXT;
END;
$$;
```

#### advance_game_phase(p_room_id UUID)
推进游戏阶段。

```sql
CREATE OR REPLACE FUNCTION advance_game_phase(p_room_id UUID)
RETURNS TABLE(new_phase INTEGER, new_round INTEGER, phase_end_time TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_current_phase INTEGER;
    v_current_round INTEGER;
    v_new_phase INTEGER;
    v_new_round INTEGER;
    v_phase_duration INTEGER := 300; -- 5分钟默认
BEGIN
    -- 获取当前状态
    SELECT current_phase, current_round
    INTO v_current_phase, v_current_round
    FROM game_states
    WHERE room_id = p_room_id;
    
    -- 计算下一阶段
    IF v_current_phase = 4 THEN
        v_new_phase := 1;
        v_new_round := v_current_round + 1;
    ELSE
        v_new_phase := v_current_phase + 1;
        v_new_round := v_current_round;
    END IF;
    
    -- 更新游戏状态
    UPDATE game_states
    SET current_phase = v_new_phase,
        current_round = v_new_round,
        phase_end_time = now() + (v_phase_duration || ' seconds')::INTERVAL,
        updated_at = now()
    WHERE room_id = p_room_id;
    
    RETURN QUERY SELECT v_new_phase, v_new_round, (now() + (v_phase_duration || ' seconds')::INTERVAL);
END;
$$;
```

### 技能系统函数

#### use_skill_enhanced(...)
增强版技能使用函数。

```sql
CREATE OR REPLACE FUNCTION use_skill_enhanced(
    p_game_state_id UUID,
    p_user_id UUID,
    p_skill_name TEXT,
    p_target_user_id UUID DEFAULT NULL,
    p_skill_data JSONB DEFAULT '{}'::JSONB
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_skill_use_id UUID;
    v_current_round INTEGER;
    v_current_phase TEXT;
BEGIN
    -- 获取当前游戏状态
    SELECT current_round, 
           CASE current_phase
               WHEN 1 THEN 'day'
               WHEN 2 THEN 'evening'
               WHEN 3 THEN 'night'
               WHEN 4 THEN 'dawn'
           END
    INTO v_current_round, v_current_phase
    FROM game_states
    WHERE id = p_game_state_id;
    
    -- 记录技能使用
    INSERT INTO skill_uses (
        game_state_id,
        user_id,
        skill_name,
        target_user_id,
        round_number,
        phase,
        effect_data,
        priority
    ) VALUES (
        p_game_state_id,
        p_user_id,
        p_skill_name,
        p_target_user_id,
        v_current_round,
        v_current_phase,
        p_skill_data,
        COALESCE((p_skill_data->>'priority')::INTEGER, 0)
    ) RETURNING id INTO v_skill_use_id;
    
    RETURN v_skill_use_id::TEXT;
END;
$$;
```

## 实时数据同步

### Realtime 配置

启用表的实时更新：

```sql
-- 启用复制标识
ALTER TABLE game_states REPLICA IDENTITY FULL;
ALTER TABLE players REPLICA IDENTITY FULL;
ALTER TABLE chat_messages REPLICA IDENTITY FULL;
ALTER TABLE skill_uses REPLICA IDENTITY FULL;
ALTER TABLE votes REPLICA IDENTITY FULL;

-- 添加到realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE game_states;
ALTER PUBLICATION supabase_realtime ADD TABLE players;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE skill_uses;
ALTER PUBLICATION supabase_realtime ADD TABLE votes;
```

### 客户端订阅示例

```typescript
// 监听游戏状态变化
const gameStateChannel = supabase
  .channel('game_state_changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'game_states',
    filter: `room_id=eq.${roomId}`
  }, handleGameStateChange)
  .subscribe();

// 监听聊天消息
const chatChannel = supabase
  .channel('chat_changes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'chat_messages',
    filter: `room_id=eq.${roomId}`
  }, handleNewMessage)
  .subscribe();
```

## 性能优化

### 查询优化

1. **合理使用索引**: 为常用查询字段创建索引
2. **避免N+1查询**: 使用JOIN或子查询
3. **分页查询**: 对大量数据使用LIMIT和OFFSET
4. **缓存策略**: 使用React Query缓存不变数据

### 连接池管理

Supabase自动管理连接池，但需要注意：

1. **避免长连接**: 及时关闭不需要的订阅
2. **批量操作**: 将多个操作合并为事务
3. **异步处理**: 使用异步函数避免阻塞

## 数据迁移

### 版本控制

使用Supabase CLI进行数据库版本控制：

```bash
# 创建新迁移
supabase migration new add_new_feature

# 应用迁移
supabase db push

# 重置数据库
supabase db reset
```

### 迁移最佳实践

1. **向后兼容**: 新字段设置默认值
2. **分步迁移**: 大变更分多个步骤
3. **备份数据**: 重要变更前备份
4. **测试迁移**: 在开发环境充分测试

## 安全考虑

### 数据验证

1. **输入验证**: 使用CHECK约束验证数据
2. **类型安全**: 使用强类型字段
3. **外键约束**: 保证数据完整性

### 访问控制

1. **最小权限**: 用户只能访问必要数据
2. **角色隔离**: 不同角色有不同权限
3. **时间窗口**: 限制操作的时间范围

### 审计日志

考虑添加审计表记录重要操作：

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    old_data JSONB,
    new_data JSONB,
    user_id UUID,
    created_at TIMESTAMPTZ DEFAULT now()
);
```