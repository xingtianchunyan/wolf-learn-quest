
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface SkillUse {
  id: string;
  game_state_id: string;
  player_id: string;
  skill_name: string;
  target_player_id?: string;
  phase: string;
  round_number: number;
  result?: any;
  created_at: string;
}

export interface PlayerGameState {
  id: string;
  game_state_id: string;
  player_id: string;
  role: string;
  is_alive: boolean;
  skill_uses_remaining: Record<string, number>;
  status_effects: any[];
  created_at: string;
  updated_at: string;
}

export interface SkillDefinition {
  name: string;
  description: string;
  targetRequired: boolean;
  phases: string[];
  usesPerGame?: number;
  cooldown?: number;
}

// 角色技能定义
export const ROLE_SKILLS: Record<string, SkillDefinition[]> = {
  'Seer': [{
    name: 'divine',
    description: '查验一名玩家的身份',
    targetRequired: true,
    phases: ['night'],
    usesPerGame: undefined // 无限次使用
  }],
  'Hunter': [{
    name: 'shoot',
    description: '死亡时可以带走一名玩家',
    targetRequired: true,
    phases: ['death'],
    usesPerGame: 1
  }],
  'Werewolf': [{
    name: 'kill',
    description: '夜晚杀死一名玩家',
    targetRequired: true,
    phases: ['night'],
    usesPerGame: undefined
  }],
  'Witch': [
    {
      name: 'heal',
      description: '救活一名被杀的玩家',
      targetRequired: true,
      phases: ['night'],
      usesPerGame: 1
    },
    {
      name: 'poison',
      description: '毒死一名玩家',
      targetRequired: true,
      phases: ['night'],
      usesPerGame: 1
    }
  ],
  'Guard': [{
    name: 'protect',
    description: '保护一名玩家免受伤害',
    targetRequired: true,
    phases: ['night'],
    usesPerGame: undefined,
    cooldown: 1 // 不能连续保护同一人
  }]
};

interface UseSkillSystemProps {
  gameStateId: string;
  playerId: string;
  currentPhase: string;
  currentRound: number;
}

// 类型转换辅助函数
const convertToPlayerGameState = (data: any): PlayerGameState => {
  return {
    ...data,
    skill_uses_remaining: data.skill_uses_remaining || {},
    status_effects: data.status_effects || []
  };
};

export const useSkillSystem = ({ gameStateId, playerId, currentPhase, currentRound }: UseSkillSystemProps) => {
  const [playerGameState, setPlayerGameState] = useState<PlayerGameState | null>(null);
  const [skillUses, setSkillUses] = useState<SkillUse[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  // 获取玩家游戏状态
  const fetchPlayerGameState = useCallback(async () => {
    if (!gameStateId || !playerId) return;

    try {
      const { data, error } = await supabase
        .from('player_game_states')
        .select('*')
        .eq('game_state_id', gameStateId)
        .eq('player_id', playerId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPlayerGameState(convertToPlayerGameState(data));
      } else {
        // 如果没有找到玩家状态，创建一个默认状态
        await initializePlayerGameState();
      }
    } catch (error) {
      console.error('Error fetching player game state:', error);
      toast({
        title: '获取玩家状态失败',
        description: '无法获取玩家游戏状态',
        variant: 'destructive'
      });
    }
  }, [gameStateId, playerId]);

  // 初始化玩家游戏状态
  const initializePlayerGameState = async () => {
    if (!gameStateId || !playerId) return;

    try {
      // 这里应该从 room_players 表获取玩家角色
      const { data: roomPlayer, error: roomError } = await supabase
        .from('room_players')
        .select('role')
        .eq('user_id', playerId)
        .maybeSingle();

      if (roomError) throw roomError;

      const role = roomPlayer?.role || 'Villager';
      const skills = ROLE_SKILLS[role] || [];
      const skillUsesRemaining: Record<string, number> = {};

      // 初始化技能使用次数
      skills.forEach(skill => {
        if (skill.usesPerGame !== undefined) {
          skillUsesRemaining[skill.name] = skill.usesPerGame;
        }
      });

      const { data, error } = await supabase
        .from('player_game_states')
        .insert({
          game_state_id: gameStateId,
          player_id: playerId,
          role: role,
          skill_uses_remaining: skillUsesRemaining
        })
        .select()
        .single();

      if (error) throw error;
      setPlayerGameState(convertToPlayerGameState(data));
    } catch (error) {
      console.error('Error initializing player game state:', error);
    }
  };

  // 获取技能使用记录
  const fetchSkillUses = useCallback(async () => {
    if (!gameStateId) return;

    try {
      const { data, error } = await supabase
        .from('skill_uses')
        .select('*')
        .eq('game_state_id', gameStateId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSkillUses(data || []);
    } catch (error) {
      console.error('Error fetching skill uses:', error);
    }
  }, [gameStateId]);

  // 使用技能
  const useSkill = async (skillName: string, targetPlayerId?: string): Promise<boolean> => {
    if (!playerGameState || processing) return false;

    setProcessing(true);

    try {
      // 验证技能是否可用
      const skills = ROLE_SKILLS[playerGameState.role] || [];
      const skill = skills.find(s => s.name === skillName);

      if (!skill) {
        throw new Error('未知技能');
      }

      if (!skill.phases.includes(currentPhase)) {
        throw new Error(`技能 ${skill.name} 不能在 ${currentPhase} 阶段使用`);
      }

      if (skill.targetRequired && !targetPlayerId) {
        throw new Error('此技能需要选择目标');
      }

      // 检查技能使用次数
      if (skill.usesPerGame !== undefined) {
        const remaining = playerGameState.skill_uses_remaining[skillName] || 0;
        if (remaining <= 0) {
          throw new Error('技能使用次数已用完');
        }
      }

      // 记录技能使用
      const { data: skillUseData, error: skillError } = await supabase
        .from('skill_uses')
        .insert({
          game_state_id: gameStateId,
          player_id: playerId,
          skill_name: skillName,
          target_player_id: targetPlayerId,
          phase: currentPhase,
          round_number: currentRound
        })
        .select()
        .single();

      if (skillError) throw skillError;

      // 更新技能使用次数
      if (skill.usesPerGame !== undefined) {
        const newSkillUsesRemaining = {
          ...playerGameState.skill_uses_remaining,
          [skillName]: (playerGameState.skill_uses_remaining[skillName] || skill.usesPerGame) - 1
        };

        const { error: updateError } = await supabase
          .from('player_game_states')
          .update({ skill_uses_remaining: newSkillUsesRemaining })
          .eq('id', playerGameState.id);

        if (updateError) throw updateError;
      }

      toast({
        title: '技能使用成功',
        description: `已使用技能：${skill.description}`
      });

      return true;
    } catch (error: any) {
      console.error('Error using skill:', error);
      toast({
        title: '技能使用失败',
        description: error.message || '技能使用失败',
        variant: 'destructive'
      });
      return false;
    } finally {
      setProcessing(false);
    }
  };

  // 获取可用技能
  const getAvailableSkills = (): SkillDefinition[] => {
    if (!playerGameState || !playerGameState.is_alive) return [];

    const roleSkills = ROLE_SKILLS[playerGameState.role] || [];
    return roleSkills.filter(skill => {
      // 检查阶段
      if (!skill.phases.includes(currentPhase)) return false;

      // 检查使用次数
      if (skill.usesPerGame !== undefined) {
        const remaining = playerGameState.skill_uses_remaining[skill.name] || 0;
        if (remaining <= 0) return false;
      }

      return true;
    });
  };

  // 实时订阅
  useEffect(() => {
    if (!gameStateId) return;

    const channel = supabase
      .channel(`skill_system_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'player_game_states',
          filter: `game_state_id=eq.${gameStateId}`
        },
        () => {
          fetchPlayerGameState();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`
        },
        () => {
          fetchSkillUses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameStateId, fetchPlayerGameState, fetchSkillUses]);

  // 初始化数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPlayerGameState(),
        fetchSkillUses()
      ]);
      setLoading(false);
    };

    if (gameStateId && playerId) {
      loadData();
    }
  }, [gameStateId, playerId, fetchPlayerGameState, fetchSkillUses]);

  return {
    playerGameState,
    skillUses,
    loading,
    processing,
    useSkill,
    getAvailableSkills
  };
};
