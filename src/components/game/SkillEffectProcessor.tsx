import React, { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SkillEffectProcessorProps {
  gameStateId: string;
  onEffectProcessed?: (effect: any) => void;
}

interface SkillEffect {
  id: string;
  skill_name: string;
  player_id: string;
  target_player_id?: string;
  phase: string;
  round_number: number;
  result?: any;
}

const SkillEffectProcessor: React.FC<SkillEffectProcessorProps> = ({
  gameStateId,
  onEffectProcessed
}) => {
  const { toast } = useToast();

  // 处理技能效果
  const processSkillEffect = async (skillUse: SkillEffect) => {
    console.log('Processing skill effect:', skillUse);

    try {
      let result: any = {};
      
      switch (skillUse.skill_name) {
        case 'divine':
          // 预言家查验
          if (skillUse.target_player_id) {
            const { data: targetPlayer } = await supabase
              .from('player_game_states')
              .select('role')
              .eq('game_state_id', gameStateId)
              .eq('player_id', skillUse.target_player_id)
              .single();

            if (targetPlayer) {
              const isWerewolf = targetPlayer.role === 'Werewolf';
              result = {
                type: 'divine_result',
                target_id: skillUse.target_player_id,
                is_werewolf: isWerewolf,
                message: isWerewolf ? '这个人是狼人！' : '这个人是好人。'
              };

              // 只向预言家显示结果
              if (skillUse.player_id) {
                toast({
                  title: '查验结果',
                  description: result.message,
                  duration: 5000
                });
              }
            }
          }
          break;

        case 'kill':
          // 狼人杀人
          if (skillUse.target_player_id) {
            // 检查是否有守护
            const { data: protections } = await supabase
              .from('skill_uses')
              .select('*')
              .eq('game_state_id', gameStateId)
              .eq('skill_name', 'protect')
              .eq('target_player_id', skillUse.target_player_id)
              .eq('phase', skillUse.phase)
              .eq('round_number', skillUse.round_number);

            const isProtected = protections && protections.length > 0;

            if (!isProtected) {
              // 标记玩家为死亡
              await supabase
                .from('player_game_states')
                .update({ is_alive: false })
                .eq('game_state_id', gameStateId)
                .eq('player_id', skillUse.target_player_id);

              result = {
                type: 'kill_success',
                target_id: skillUse.target_player_id,
                message: '击杀成功'
              };
            } else {
              result = {
                type: 'kill_blocked',
                target_id: skillUse.target_player_id,
                message: '击杀被阻挡'
              };
            }
          }
          break;

        case 'heal':
          // 女巫救人
          if (skillUse.target_player_id) {
            // 检查目标是否在当晚被杀
            const { data: kills } = await supabase
              .from('skill_uses')
              .select('*')
              .eq('game_state_id', gameStateId)
              .eq('skill_name', 'kill')
              .eq('target_player_id', skillUse.target_player_id)
              .eq('phase', skillUse.phase)
              .eq('round_number', skillUse.round_number);

            if (kills && kills.length > 0) {
              // 救活玩家
              await supabase
                .from('player_game_states')
                .update({ is_alive: true })
                .eq('game_state_id', gameStateId)
                .eq('player_id', skillUse.target_player_id);

              result = {
                type: 'heal_success',
                target_id: skillUse.target_player_id,
                message: '救人成功'
              };
            } else {
              result = {
                type: 'heal_failed',
                target_id: skillUse.target_player_id,
                message: '目标没有受到致命伤害'
              };
            }
          }
          break;

        case 'poison':
          // 女巫毒人
          if (skillUse.target_player_id) {
            await supabase
              .from('player_game_states')
              .update({ is_alive: false })
              .eq('game_state_id', gameStateId)
              .eq('player_id', skillUse.target_player_id);

            result = {
              type: 'poison_success',
              target_id: skillUse.target_player_id,
              message: '毒杀成功'
            };
          }
          break;

        case 'protect':
          // 守卫保护
          result = {
            type: 'protect_success',
            target_id: skillUse.target_player_id,
            message: '保护生效'
          };
          break;

        case 'shoot':
          // 猎人开枪
          if (skillUse.target_player_id) {
            await supabase
              .from('player_game_states')
              .update({ is_alive: false })
              .eq('game_state_id', gameStateId)
              .eq('player_id', skillUse.target_player_id);

            result = {
              type: 'shoot_success',
              target_id: skillUse.target_player_id,
              message: '开枪成功'
            };
          }
          break;

        case 'self_destruct':
          // 白狼王自爆
          // 标记白狼王死亡
          await supabase
            .from('player_game_states')
            .update({ is_alive: false })
            .eq('game_state_id', gameStateId)
            .eq('player_id', skillUse.player_id);

          result = {
            type: 'self_destruct_success',
            player_id: skillUse.player_id,
            message: '白狼王自爆，游戏立即进入夜晚阶段',
            phase_change: 'night'
          };

          toast({
            title: '白狼王自爆',
            description: '游戏立即进入夜晚阶段',
            duration: 5000
          });
          break;

        case 'curse':
          // 暗夜术士诅咒
          if (skillUse.target_player_id) {
            // 给目标玩家添加沉默状态效果
            const { data: targetState } = await supabase
              .from('player_game_states')
              .select('status_effects')
              .eq('game_state_id', gameStateId)
              .eq('player_id', skillUse.target_player_id)
              .single();

            if (targetState) {
              const currentEffects = targetState.status_effects || [];
              const newEffects = [...currentEffects, {
                type: 'silenced',
                applied_round: skillUse.round_number,
                duration: 1 // 持续一天
              }];

              await supabase
                .from('player_game_states')
                .update({ status_effects: newEffects })
                .eq('game_state_id', gameStateId)
                .eq('player_id', skillUse.target_player_id);

              result = {
                type: 'curse_success',
                target_id: skillUse.target_player_id,
                message: '诅咒成功，目标次日白天无法发言'
              };
            }
          }
          break;

        case 'investigate':
          // 恶魔查看身份
          if (skillUse.target_player_id) {
            const { data: targetPlayer } = await supabase
              .from('player_game_states')
              .select('role')
              .eq('game_state_id', gameStateId)
              .eq('player_id', skillUse.target_player_id)
              .single();

            if (targetPlayer) {
              result = {
                type: 'investigate_result',
                target_id: skillUse.target_player_id,
                role: targetPlayer.role,
                message: `目标的真实身份是：${targetPlayer.role}`
              };

              // 只向恶魔显示结果
              if (skillUse.player_id) {
                toast({
                  title: '身份调查结果',
                  description: result.message,
                  duration: 5000
                });
              }
            }
          }
          break;

        default:
          console.log('Unknown skill:', skillUse.skill_name);
          return;
      }

      // 更新技能使用结果
      await supabase
        .from('skill_uses')
        .update({ result })
        .eq('id', skillUse.id);

      if (onEffectProcessed) {
        onEffectProcessed({ ...skillUse, result });
      }

    } catch (error) {
      console.error('Error processing skill effect:', error);
    }
  };

  // 监听技能使用
  useEffect(() => {
    if (!gameStateId) return;

    const channel = supabase
      .channel(`skill_effects_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`
        },
        (payload) => {
          if (payload.new && !payload.new.result) {
            // 只处理还没有结果的技能使用
            processSkillEffect(payload.new as SkillEffect);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameStateId]);

  return null; // 这是一个无UI的处理组件
};

export default SkillEffectProcessor;
