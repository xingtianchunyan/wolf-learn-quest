// 技能系统实时订阅
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getSkillConfigByEnglish } from '@/utils/skillMappingConfig';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { EnhancedSkillUse } from './useSkillData';

interface UseSkillRealtimeParams {
  gameStateId?: string;
  setSkillUses: React.Dispatch<React.SetStateAction<EnhancedSkillUse[]>>;
  fetchAllSkillData: () => Promise<void>;
}

export const useSkillRealtime = ({
  gameStateId,
  setSkillUses,
  fetchAllSkillData,
}: UseSkillRealtimeParams) => {
  // 优化的实时订阅 - 只订阅必要的表
  useEffect(() => {
    if (!gameStateId) return;

    const skillUsesChannel = supabase
      .channel(`enhanced_skill_uses_${gameStateId}`)
      .on<EnhancedSkillUse>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_uses',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        (payload: RealtimePostgresChangesPayload<EnhancedSkillUse>) => {
          if (payload.new && typeof payload.new === 'object') {
            const newSkillUse = payload.new as EnhancedSkillUse;
            const config = getSkillConfigByEnglish(newSkillUse.skill_name);
            const enhancedUse = {
              ...newSkillUse,
              chinese_name: config?.chineseName || newSkillUse.skill_name,
              skill_config: config,
            };

            if (payload.eventType === 'INSERT') {
              setSkillUses(current => [enhancedUse, ...current]);
            } else if (payload.eventType === 'UPDATE') {
              setSkillUses(current =>
                current.map(su => (su.id === enhancedUse.id ? enhancedUse : su))
              );
            } else if (payload.eventType === 'DELETE' && payload.old) {
              setSkillUses(current =>
                current.filter(
                  su => su.id !== (payload.old as EnhancedSkillUse).id
                )
              );
            }
          }
        }
      )
      .subscribe();

    // 订阅技能效果队列变化
    const queueChannel = supabase
      .channel(`skill_queue_${gameStateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_effects_queue',
          filter: `game_state_id=eq.${gameStateId}`,
        },
        () => {
          // 技能效果队列变化时重新获取数据
          fetchAllSkillData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(skillUsesChannel);
      supabase.removeChannel(queueChannel);
    };
  }, [gameStateId, setSkillUses, fetchAllSkillData]);
};
