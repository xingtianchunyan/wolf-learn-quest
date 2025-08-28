import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Target, Eye, Shield, Skull, Heart } from 'lucide-react';

interface SkillRecord {
  id: string;
  skill_name: string;
  target_user_id?: string;
  round_number: number;
  phase: string;
  execution_status: string;
  result?: any;
  created_at: string;
}

interface RoleBasedSkillRecordsProps {
  roleName: string;
  skillRecords: SkillRecord[];
  players: Array<{ userId: string; name: string; roleStatus: number }>;
  currentUserId: string;
}

export const RoleBasedSkillRecords: React.FC<RoleBasedSkillRecordsProps> = ({
  roleName,
  skillRecords,
  players,
  currentUserId
}) => {
  
  const getPlayerName = (userId?: string) => {
    if (!userId) return '未知玩家';
    return players.find(p => p.userId === userId)?.name || '未知玩家';
  };

  const getSkillIcon = (skillName: string) => {
    switch (skillName) {
      case 'Sleep': return <Clock className="w-4 h-4" />;
      case 'night_attack': return <Skull className="w-4 h-4" />;
      case 'prophecy': return <Eye className="w-4 h-4" />;
      case 'vigil': return <Shield className="w-4 h-4" />;
      case 'magic_potion': return <Heart className="w-4 h-4" />;
      case 'dying_shot': return <Target className="w-4 h-4" />;
      case 'voodoo': return <Skull className="w-4 h-4" />;
      case 'demon_eye': return <Eye className="w-4 h-4" />;
      case 'self_destruct': return <Skull className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getFilteredRecords = () => {
    const roleNameLower = roleName?.toLowerCase();
    
    // 根据角色过滤技能记录
    if (roleNameLower?.includes('villager') || roleNameLower?.includes('村民')) {
      // 村民：仅显示自己的睡觉技能记录
      return skillRecords.filter(record => 
        record.skill_name === 'Sleep' && 
        skillRecords.some(r => r.id === record.id)
      );
    }
    
    if (roleNameLower?.includes('witch') || roleNameLower?.includes('女巫')) {
      // 女巫：最多显示两条自己使用魔药技能的记录，包含目标和属性
      return skillRecords.filter(record => 
        record.skill_name === 'magic_potion'
      ).slice(0, 2);
    }
    
    if (roleNameLower?.includes('seer') || roleNameLower?.includes('预言家')) {
      // 预言家：仅显示自己的占卜技能记录，包含目标和阵营
      return skillRecords.filter(record => 
        record.skill_name === 'prophecy'
      );
    }
    
    if (roleNameLower?.includes('werewolf') || roleNameLower?.includes('狼人')) {
      // 狼人：仅显示自己的夜袭技能记录，包含目标
      return skillRecords.filter(record => 
        record.skill_name === 'night_attack'
      );
    }
    
    if (roleNameLower?.includes('white wolf') || roleNameLower?.includes('白狼')) {
      // 白狼：显示狼人夜袭记录和自己的自毁记录
      return skillRecords.filter(record => 
        record.skill_name === 'night_attack' || 
        (record.skill_name === 'self_destruct')
      );
    }
    
    if (roleNameLower?.includes('hunter') || roleNameLower?.includes('猎人')) {
      // 猎人：仅显示自己的濒死射击记录
      return skillRecords.filter(record => 
        record.skill_name === 'dying_shot'
      );
    }
    
    if (roleNameLower?.includes('warlock') || roleNameLower?.includes('暗夜术士')) {
      // 暗夜术士：仅显示唯一一条巫毒技能记录
      return skillRecords.filter(record => 
        record.skill_name === 'voodoo'
      ).slice(0, 1);
    }
    
    if (roleNameLower?.includes('demon') || roleNameLower?.includes('恶魔')) {
      // 恶魔：仅显示自己的恶魔之眼记录，包含目标和角色名称
      return skillRecords.filter(record => 
        record.skill_name === 'demon_eye'
      );
    }
    
    if (roleNameLower?.includes('guard') || roleNameLower?.includes('守卫')) {
      // 守卫：仅显示自己的守夜记录
      return skillRecords.filter(record => 
        record.skill_name === 'vigil'
      );
    }
    
    // 默认显示所有记录
    return skillRecords;
  };

  const renderSkillDetails = (record: SkillRecord) => {
    const roleNameLower = roleName?.toLowerCase();
    const details = [];

    // 目标ID显示
    if (record.target_user_id) {
      details.push(
        <span key="target" className="text-sm text-muted-foreground">
          目标: {getPlayerName(record.target_user_id)}
        </span>
      );
    }

    // 特殊信息显示
    if (roleNameLower?.includes('witch') || roleNameLower?.includes('女巫')) {
      // 女巫显示药剂类型
      const potionType = record.result?.potionType;
      if (potionType) {
        details.push(
          <Badge key="potion" variant={potionType === 'protection' ? 'default' : 'destructive'} className="text-xs">
            {potionType === 'protection' ? '保护' : '攻击'}
          </Badge>
        );
      }
    }

    if (roleNameLower?.includes('seer') || roleNameLower?.includes('预言家')) {
      // 预言家显示目标阵营
      const targetFaction = record.result?.faction;
      if (targetFaction) {
        details.push(
          <Badge key="faction" variant={targetFaction === '好人阵营' ? 'default' : 'destructive'} className="text-xs">
            {targetFaction}
          </Badge>
        );
      }
    }

    if (roleNameLower?.includes('demon') || roleNameLower?.includes('恶魔')) {
      // 恶魔显示目标角色名称
      const targetRole = record.result?.roleName;
      if (targetRole) {
        details.push(
          <Badge key="role" variant="outline" className="text-xs">
            {targetRole}
          </Badge>
        );
      }
    }

    return details;
  };

  const filteredRecords = getFilteredRecords();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          技能使用记录
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredRecords.length > 0 ? (
          <div className="space-y-2">
            {filteredRecords.map((record) => (
              <div 
                key={record.id} 
                className="flex items-center justify-between p-3 bg-muted rounded border"
              >
                <div className="flex items-center gap-3">
                  {getSkillIcon(record.skill_name)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{record.skill_name}</span>
                      <span className="text-sm text-muted-foreground">
                        第{record.round_number}轮 {record.phase}阶段
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderSkillDetails(record)}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={record.execution_status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {record.execution_status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            暂无技能使用记录
          </p>
        )}
      </CardContent>
    </Card>
  );
};