-- 删除现有函数后重新创建
DROP FUNCTION IF EXISTS public.detect_skill_conflicts(UUID, INTEGER, TEXT);

-- 1. 创建统一的技能冲突检测函数
CREATE OR REPLACE FUNCTION public.detect_skill_conflicts(
    p_game_state_id UUID,
    p_round_number INTEGER,
    p_phase TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    conflict_data JSON;
    skill_record RECORD;
    conflicts_found INTEGER := 0;
BEGIN
    -- 获取当前回合阶段的所有待执行技能
    FOR skill_record IN
        SELECT 
            su.id as skill_use_id,
            su.skill_name,
            su.target_user_id,
            su.skill_priority,
            su.user_id,
            COALESCE(su.skill_effects->>'effect_type', 'unknown') as effect_type
        FROM skill_uses su
        WHERE su.game_state_id = p_game_state_id
          AND su.round_number = p_round_number
          AND su.phase = p_phase
          AND su.execution_status = 'pending'
        ORDER BY su.skill_priority ASC, su.created_at ASC
    LOOP
        -- 检查技能冲突逻辑
        -- 守卫保护与狼人攻击同目标
        IF skill_record.skill_name = 'vigil' THEN
            -- 检查是否有狼人攻击相同目标
            IF EXISTS (
                SELECT 1 FROM skill_uses su2 
                WHERE su2.game_state_id = p_game_state_id
                  AND su2.round_number = p_round_number
                  AND su2.phase = p_phase
                  AND su2.skill_name = 'night_attack'
                  AND su2.target_user_id = skill_record.target_user_id
                  AND su2.execution_status = 'pending'
                  AND su2.id != skill_record.skill_use_id
            ) THEN
                -- 插入冲突记录
                INSERT INTO skill_conflicts (
                    game_state_id,
                    round_number,
                    phase,
                    conflicting_skills,
                    resolution_rule
                ) VALUES (
                    p_game_state_id,
                    p_round_number,
                    p_phase,
                    jsonb_build_array(
                        jsonb_build_object(
                            'skill_use_id', skill_record.skill_use_id,
                            'skill_name', skill_record.skill_name,
                            'priority', skill_record.skill_priority,
                            'target_user_id', skill_record.target_user_id
                        )
                    ),
                    'priority'
                ) ON CONFLICT (game_state_id, round_number, phase) DO UPDATE SET
                    conflicting_skills = skill_conflicts.conflicting_skills || EXCLUDED.conflicting_skills,
                    updated_at = now();
                
                conflicts_found := conflicts_found + 1;
            END IF;
        END IF;
        
        -- 女巫解药与狼人攻击同目标
        IF skill_record.skill_name = 'magic_potion' AND skill_record.effect_type = 'protection' THEN
            IF EXISTS (
                SELECT 1 FROM skill_uses su2 
                WHERE su2.game_state_id = p_game_state_id
                  AND su2.round_number = p_round_number
                  AND su2.phase = p_phase
                  AND su2.skill_name = 'night_attack'
                  AND su2.target_user_id = skill_record.target_user_id
                  AND su2.execution_status = 'pending'
                  AND su2.id != skill_record.skill_use_id
            ) THEN
                INSERT INTO skill_conflicts (
                    game_state_id,
                    round_number,
                    phase,
                    conflicting_skills,
                    resolution_rule
                ) VALUES (
                    p_game_state_id,
                    p_round_number,
                    p_phase,
                    jsonb_build_array(
                        jsonb_build_object(
                            'skill_use_id', skill_record.skill_use_id,
                            'skill_name', skill_record.skill_name,
                            'priority', skill_record.skill_priority,
                            'target_user_id', skill_record.target_user_id,
                            'effect_type', skill_record.effect_type
                        )
                    ),
                    'priority'
                ) ON CONFLICT (game_state_id, round_number, phase) DO UPDATE SET
                    conflicting_skills = skill_conflicts.conflicting_skills || EXCLUDED.conflicting_skills,
                    updated_at = now();
                
                conflicts_found := conflicts_found + 1;
            END IF;
        END IF;
    END LOOP;

    conflict_data := json_build_object(
        'conflicts_detected', conflicts_found,
        'game_state_id', p_game_state_id,
        'round_number', p_round_number,
        'phase', p_phase
    );

    RETURN conflict_data;
END;
$$;