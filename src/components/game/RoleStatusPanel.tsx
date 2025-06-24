
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoleStates } from '@/hooks/useRoleStates';
import { usePlayersRealtime } from '@/hooks/usePlayersRealtime';
import { useRoleDesigns } from '@/hooks/useRoleDesigns';
import { 
  getRoleStatusName, 
  getRoleStatusColor, 
  canPerformAction, 
  getSkillUsesRemaining 
} from '@/utils/roleStateHelpers';

interface RoleStatusPanelProps {
  roomId: string;
}

const RoleStatusPanel: React.FC<RoleStatusPanelProps> = ({ roomId }) => {
  const { roleStates, loading } = useRoleStates(roomId);
  const { players } = usePlayersRealtime(roomId);
  const { roleDesigns } = useRoleDesigns();

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
            const skillRemaining = getSkillUsesRemaining(roleState.skill_uses_remaining);
            
            return (
              <div 
                key={roleState.id}
                className="p-3 bg-werewolf-dark/40 rounded-md border border-gray-600"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-300">
                      {player?.name || '未知玩家'}
                    </div>
                    <div className="text-sm text-gray-400">
                      {role?.role_name || '未知角色'}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getRoleStatusColor(roleState.role_status)} border-current`}
                  >
                    {getRoleStatusName(roleState.role_status)}
                  </Badge>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <div>
                    技能剩余: {skillRemaining === 'unlimited' ? '无限' : skillRemaining}
                  </div>
                  
                  {roleState.status_effects && (
                    <div className="flex flex-wrap gap-1">
                      {canPerformAction(roleState.status_effects, 'can_chat') && (
                        <span className="px-1 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">聊天</span>
                      )}
                      {canPerformAction(roleState.status_effects, 'can_vote') && (
                        <span className="px-1 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">投票</span>
                      )}
                      {canPerformAction(roleState.status_effects, 'can_use_skill') && (
                        <span className="px-1 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">技能</span>
                      )}
                      {canPerformAction(roleState.status_effects, 'can_answer_questions') && (
                        <span className="px-1 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">答题</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
