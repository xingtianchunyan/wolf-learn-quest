-- 继续创建其他技能系统相关函数

-- 2. 创建女巫技能验证函数
CREATE OR REPLACE FUNCTION public.validate_witch_potion_usage(
    p_user_id UUID,
    p_game_state_id UUID,
    p_potion_type TEXT,
    p_target_user_id UUID DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    role_state_record RECORD;
    witch_uses JSONB;
    night_deaths JSONB;
    result JSON;
BEGIN
    -- 获取女巫的角色状态
    SELECT * INTO role_state_record
    FROM role_states rs
    JOIN role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = p_user_id 
      AND rs.game_state_id = p_game_state_id
      AND rd.role_name = 'witch';

    IF NOT FOUND THEN
        RETURN json_build_object(
            'can_use', false,
            'reason', '只有女巫角色可以使用药剂'
        );
    END IF;

    -- 检查女巫药剂使用状态
    witch_uses := COALESCE(role_state_record.skill_uses_remaining->'witch_potion', '{}'::jsonb);

    -- 验证解药使用
    IF p_potion_type = 'protection' THEN
        -- 检查解药是否已使用
        IF (witch_uses->>'protection_used')::boolean = true THEN
            RETURN json_build_object(
                'can_use', false,
                'reason', '解药已经使用过了'
            );
        END IF;

        -- 检查当夜是否有死亡信息（需要先知道谁会死亡才能使用解药）
        SELECT jsonb_agg(
            jsonb_build_object(
                'target_user_id', su.target_user_id,
                'attacker_user_id', su.user_id,
                'skill_name', su.skill_name
            )
        ) INTO night_deaths
        FROM skill_uses su
        WHERE su.game_state_id = p_game_state_id
          AND su.round_number = (
              SELECT current_round FROM game_states WHERE id = p_game_state_id
          )
          AND su.phase = 'night'
          AND su.skill_name IN ('night_attack', 'self_destruct')
          AND su.execution_status = 'pending';

        RETURN json_build_object(
            'can_use', true,
            'night_deaths', COALESCE(night_deaths, '[]'::jsonb),
            'potion_type', 'protection'
        );
    END IF;

    -- 验证毒药使用
    IF p_potion_type = 'attack' THEN
        -- 检查毒药是否已使用
        IF (witch_uses->>'attack_used')::boolean = true THEN
            RETURN json_build_object(
                'can_use', false,
                'reason', '毒药已经使用过了'
            );
        END IF;

        -- 检查目标是否有效
        IF p_target_user_id IS NULL THEN
            RETURN json_build_object(
                'can_use', false,
                'reason', '使用毒药需要选择目标'
            );
        END IF;

        RETURN json_build_object(
            'can_use', true,
            'potion_type', 'attack',
            'target_user_id', p_target_user_id
        );
    END IF;

    RETURN json_build_object(
        'can_use', false,
        'reason', '未知的药剂类型'
    );
END;
$$;

-- 3. 创建猎人濒死触发函数
CREATE OR REPLACE FUNCTION public.trigger_hunter_dying_skill(
    p_hunter_user_id UUID,
    p_game_state_id UUID,
    p_trigger_reason TEXT DEFAULT 'elimination'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    room_id_val UUID;
    current_round_val INTEGER;
    current_phase_val INTEGER;
BEGIN
    -- 获取游戏信息
    SELECT gs.room_id, gs.current_round, gs.current_phase
    INTO room_id_val, current_round_val, current_phase_val
    FROM game_states gs
    WHERE gs.id = p_game_state_id;

    -- 验证是否是猎人角色
    IF NOT EXISTS (
        SELECT 1 FROM role_states rs
        JOIN role_design rd ON rd.id = rs.role_id
        WHERE rs.user_id = p_hunter_user_id
          AND rs.game_state_id = p_game_state_id
          AND rd.role_name = 'hunter'
          AND rs.role_status IN (1, 3) -- 正常或虚弱状态
    ) THEN
        RETURN false;
    END IF;

    -- 更新猎人状态为濒死，激活反击技能
    UPDATE role_states SET
        role_status = 2, -- 濒死状态
        status_effects = jsonb_build_object(
            'can_chat', false,
            'can_vote', false,
            'can_use_skill', true,
            'can_be_targeted', false,
            'can_answer_questions', true,
            'can_be_voted', false,
            'is_hunter_revenge', true,
            'hunter_revenge_end_time', (now() + interval '40 seconds')::text,
            'trigger_reason', p_trigger_reason
        ),
        updated_at = now()
    WHERE user_id = p_hunter_user_id
      AND game_state_id = p_game_state_id;

    -- 插入系统公告
    INSERT INTO chat_messages (
        room_id,
        sender_id,
        message,
        chat_type,
        game_round,
        game_phase
    ) VALUES (
        room_id_val,
        NULL, -- 系统消息
        '猎人进入濒死状态，获得反击机会（40秒内选择目标）',
        'system',
        current_round_val,
        CASE current_phase_val 
            WHEN 1 THEN 'day'
            WHEN 2 THEN 'evening'
            WHEN 3 THEN 'night'
            WHEN 4 THEN 'dawn'
            ELSE 'day'
        END
    );

    RETURN true;
END;
$$;

-- 4. 创建恶魔免疫检查函数
CREATE OR REPLACE FUNCTION public.check_demon_immunity(
    p_target_user_id UUID,
    p_attacker_user_id UUID,
    p_game_state_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_role TEXT;
    attacker_role TEXT;
BEGIN
    -- 获取目标角色
    SELECT rd.role_name INTO target_role
    FROM role_states rs
    JOIN role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = p_target_user_id
      AND rs.game_state_id = p_game_state_id;

    -- 获取攻击者角色  
    SELECT rd.role_name INTO attacker_role
    FROM role_states rs
    JOIN role_design rd ON rd.id = rs.role_id
    WHERE rs.user_id = p_attacker_user_id
      AND rs.game_state_id = p_game_state_id;

    -- 恶魔免疫狼人攻击
    IF target_role = 'demon' AND attacker_role IN ('werewolf', 'whitewolf') THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$;

-- 5. 创建多重保护检查函数
CREATE OR REPLACE FUNCTION public.check_multiple_protection(
    p_target_user_id UUID,
    p_game_state_id UUID,
    p_round_number INTEGER
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    protection_count INTEGER;
    protection_sources UUID[];
    result JSON;
BEGIN
    -- 统计当前回合对该目标的保护技能数量
    SELECT 
        COUNT(*),
        array_agg(DISTINCT su.user_id)
    INTO protection_count, protection_sources
    FROM skill_uses su
    WHERE su.game_state_id = p_game_state_id
      AND su.round_number = p_round_number
      AND su.target_user_id = p_target_user_id
      AND su.skill_name IN ('vigil', 'magic_potion')
      AND (su.skill_effects->>'effect_type' = 'protection' OR su.skill_name = 'vigil')
      AND su.execution_status = 'completed';

    -- 检查是否有多重保护
    IF protection_count >= 2 AND array_length(protection_sources, 1) >= 2 THEN
        result := json_build_object(
            'has_multiple_protection', true,
            'protection_count', protection_count,
            'should_eliminate', true,
            'reason', '多重保护导致淘汰'
        );
    ELSE
        result := json_build_object(
            'has_multiple_protection', false,
            'protection_count', protection_count,
            'should_eliminate', false
        );
    END IF;

    RETURN result;
END;
$$;

-- 创建索引优化技能系统查询性能
CREATE INDEX IF NOT EXISTS idx_skill_uses_execution_priority ON skill_uses(game_state_id, round_number, phase, execution_status, skill_priority, created_at);
CREATE INDEX IF NOT EXISTS idx_skill_conflicts_game_round_phase ON skill_conflicts(game_state_id, round_number, phase);
CREATE INDEX IF NOT EXISTS idx_standardized_skill_targets_active ON standardized_skill_targets(skill_use_id, is_active, effect_end_time);

-- 为技能冲突表添加唯一约束，防止重复冲突记录（如果不存在）
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_conflict_per_round_phase'
    ) THEN
        ALTER TABLE skill_conflicts 
        ADD CONSTRAINT unique_conflict_per_round_phase 
        UNIQUE (game_state_id, round_number, phase);
    END IF;
END $$;