
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Info } from 'lucide-react';
import { useRoleStates } from '@/hooks/useRoleStates';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { 
  getRoleStatusName, 
  getRoleStatusColor, 
  canPerformAction, 
  getSkillUsesRemaining,
  isHunterRevenge,
  getHunterRevengeTimeLeft,
  canUseSkillWithCurrentStatus
} from '@/utils/roleStateHelpers';
import { canUseSkillInPhase, getSkillEffectTypes } from '@/utils/skillSystemHelpers';
import RoleSkillInfo from './RoleSkillInfo';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface RoleStatusPanelProps {
  roomId: string;
}

const RoleStatusPanel: React.FC<RoleStatusPanelProps> = ({ roomId }) => {
  const { roleStates, loading } = useRoleStates(roomId);
  const { players } = usePlayersRealtime(roomId);
  const { roleDesigns, getSkillEffects, getRoleAttributes } = useRoleDesigns();
  const [_currentTime, setCurrentTime] = useState(Date.now());
  const [expandedPlayers, setExpandedPlayers] = useState<Set<string>>(new Set());

  // 每秒更新时间，用于猎人反击倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const togglePlayerExpansion = (playerId: string) => {
    setExpandedPlayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <Card className="bg-werewolf-card border-werewolf-purple/30">
        <CardHeader>
          <CardTitle className="text-werewolf-purple">角色状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-400 py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-werewolf-purple mx-auto"></div>
            <p className="mt-2">加载中...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader>
        <CardTitle className="text-werewolf-purple">角色状态</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {roleStates.map((roleState) => {
            const player = players.find(p => p.userId === roleState.user_id);
            const role = roleDesigns.find(r => r.id === roleState.role_id);
            const skillEffects = getSkillEffects(roleState.role_id);
            const roleAttributes = getRoleAttributes(roleState.role_id);
            const skillRemaining = getSkillUsesRemaining(roleState.skill_uses_remaining);
            const isHunterRevengeState = isHunterRevenge(roleState.status_effects);
            const revengeTimeLeft = getHunterRevengeTimeLeft(roleState.status_effects);
            const isExpanded = expandedPlayers.has(roleState.id);
            
            // 检查是否可以使用技能（基于新的技能系统）
            const canUseSkillByStatus = skillEffects ? 
              canUseSkillWithCurrentStatus(roleState.role_status, skillEffects.required_status) : false;
            
            return (
              <Collapsible key={roleState.id} open={isExpanded} onOpenChange={() => togglePlayerExpansion(roleState.id)}>
                <div className={`rounded-md border ${
                  isHunterRevengeState 
                    ? 'bg-yellow-900/40 border-yellow-500/50' 
                    : 'bg-werewolf-dark/40 border-gray-600'
                }`}>
                  <CollapsibleTrigger className="w-full p-3 text-left hover:bg-werewolf-dark/20 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-gray-300 flex items-center">
                          {player?.name || '未知玩家'}
                          <Info className="h-3 w-3 ml-2 text-gray-500" />
                        </div>
                        <div className="text-sm text-gray-400">
                          {role?.role_name || '未知角色'}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge 
                          variant="outline" 
                          className={`${getRoleStatusColor(roleState.role_status)} border-current`}
                        >
                          {getRoleStatusName(roleState.role_status)}
                        </Badge>
                        
                        {isHunterRevengeState && revengeTimeLeft > 0 && (
                          <Badge 
                            variant="outline" 
                            className="text-yellow-400 border-yellow-400 animate-pulse"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            反击 {revengeTimeLeft}s
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      <div>
                        技能剩余: {skillRemaining === 'unlimited' ? '无限' : skillRemaining}
                      </div>
                      
                      {isHunterRevengeState && (
                        <div className="text-yellow-400 font-medium">
                          猎人反击状态 - 可使用技能反击！
                        </div>
                      )}
                      
                      {roleState.status_effects && (
                        <div className="flex flex-wrap gap-1">
                          {canPerformAction(roleState.status_effects, 'can_chat') && (
                            <span className="px-1 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">聊天</span>
                          )}
                          {canPerformAction(roleState.status_effects, 'can_vote') && (
                            <span className="px-1 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">投票</span>
                          )}
                          {canPerformAction(roleState.status_effects, 'can_use_skill') && canUseSkillByStatus && (
                            <span className="px-1 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">技能</span>
                          )}
                          {canPerformAction(roleState.status_effects, 'can_answer_questions') && (
                            <span className="px-1 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">答题</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-3 pb-3">
                      <RoleSkillInfo
                        roleName={role?.role_name || '未知角色'}
                        skillEffects={skillEffects || undefined}
                        roleAttributes={roleAttributes || undefined}
                      />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
          
          {roleStates.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              暂无角色状态数据
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleStatusPanel;
