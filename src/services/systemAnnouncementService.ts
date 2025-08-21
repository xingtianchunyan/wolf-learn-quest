// 系统公告服务 - 处理技能使用和状态变更的公告信息
import { supabase } from '@/integrations/supabase/client';

export interface SystemAnnouncementData {
  type: 'skill_usage' | 'status_change' | 'hunter_broadcast' | 'whitewolf_broadcast';
  actorUserId: string;
  actorName: string;
  actorRole: string;
  skillName?: string;
  skillType?: string;
  targetUserId?: string;
  targetName?: string;
  targetRole?: string;
  finalStatus?: string;
  roomId: string;
  gameRound: number;
  gamePhase: string;
}

export interface AnnouncementVisibility {
  isVisibleToJudge: boolean;
  isVisibleToActor: boolean;
  isVisibleToTarget: boolean;
  isVisibleToWerewolves: boolean;
  isVisibleToRescuers: boolean;
  isVisibleToAll: boolean;
}

export class SystemAnnouncementService {
  /**
   * 创建技能使用公告
   */
  static async createSkillUsageAnnouncement(data: SystemAnnouncementData): Promise<boolean> {
    const message = this.formatSkillUsageMessage(data);
    const visibility = this.getSkillUsageVisibility(data);
    
    return this.sendAnnouncementMessage(message, data.roomId, visibility, data);
  }

  /**
   * 创建状态变更公告
   */
  static async createStatusChangeAnnouncement(data: SystemAnnouncementData): Promise<boolean> {
    const message = this.formatStatusChangeMessage(data);
    const visibility = this.getStatusChangeVisibility(data);
    
    return this.sendAnnouncementMessage(message, data.roomId, visibility, data);
  }

  /**
   * 创建猎人濒死广播
   */
  static async createHunterDeathBroadcast(data: SystemAnnouncementData): Promise<boolean> {
    const message = `【重要公告】${data.actorName}(${data.actorRole})进入濒死状态，身份公开！可在40秒内使用濒死击毙技能！`;
    const visibility: AnnouncementVisibility = {
      isVisibleToJudge: true,
      isVisibleToActor: true,
      isVisibleToTarget: false,
      isVisibleToWerewolves: false,
      isVisibleToRescuers: false,
      isVisibleToAll: true // 向所有玩家广播
    };
    
    return this.sendAnnouncementMessage(message, data.roomId, visibility, data);
  }

  /**
   * 创建白狼自爆广播
   */
  static async createWhiteWolfDestructBroadcast(data: SystemAnnouncementData): Promise<boolean> {
    const message = `【紧急公告】${data.actorName}(${data.actorRole})使用白爆技能，目标：${data.targetName}(${data.targetRole})！双方身份公开！`;
    const visibility: AnnouncementVisibility = {
      isVisibleToJudge: true,
      isVisibleToActor: true,
      isVisibleToTarget: true,
      isVisibleToWerewolves: false,
      isVisibleToRescuers: false,
      isVisibleToAll: true // 向所有玩家广播
    };
    
    return this.sendAnnouncementMessage(message, data.roomId, visibility, data);
  }

  /**
   * 格式化技能使用消息
   */
  private static formatSkillUsageMessage(data: SystemAnnouncementData): string {
    const { actorName, actorRole, skillName, skillType, targetName, targetRole } = data;
    
    if (targetName && targetRole) {
      return `${actorName}-${actorRole}，使用${skillName}-${skillType}，目标${targetName}-${targetRole}`;
    } else {
      return `${actorName}-${actorRole}，使用${skillName}-${skillType}`;
    }
  }

  /**
   * 格式化状态变更消息
   */
  private static formatStatusChangeMessage(data: SystemAnnouncementData): string {
    const { targetName, targetRole, skillName, skillType, finalStatus } = data;
    
    if (skillName && skillType) {
      return `${targetName}-${targetRole}，被${skillName}-${skillType}，最终判定变为-${finalStatus}状态`;
    } else {
      return `${targetName}-${targetRole}，最终判定变为-${finalStatus}状态`;
    }
  }

  /**
   * 获取技能使用公告的可见性规则
   */
  private static getSkillUsageVisibility(data: SystemAnnouncementData): AnnouncementVisibility {
    const { skillType } = data;
    
    // 狼人攻击技能的特殊可见性规则
    if (skillType === '攻击') {
      return {
        isVisibleToJudge: true,
        isVisibleToActor: true,
        isVisibleToTarget: false,
        isVisibleToWerewolves: true, // 狼人系角色可见
        isVisibleToRescuers: true,   // 女巫、暗夜术士可见
        isVisibleToAll: false
      };
    }
    
    // 其他技能默认只对法官和使用者可见
    return {
      isVisibleToJudge: true,
      isVisibleToActor: true,
      isVisibleToTarget: false,
      isVisibleToWerewolves: false,
      isVisibleToRescuers: false,
      isVisibleToAll: false
    };
  }

  /**
   * 获取状态变更公告的可见性规则
   */
  private static getStatusChangeVisibility(data: SystemAnnouncementData): AnnouncementVisibility {
    const { targetRole, finalStatus } = data;
    
    // 猎人状态变更的特殊规则
    if (targetRole === 'hunter' && finalStatus === '濒死') {
      return {
        isVisibleToJudge: true,
        isVisibleToActor: false,
        isVisibleToTarget: true, // 猎人自己可见
        isVisibleToWerewolves: false,
        isVisibleToRescuers: false,
        isVisibleToAll: false
      };
    }
    
    // 默认状态变更只对法官可见
    return {
      isVisibleToJudge: true,
      isVisibleToActor: false,
      isVisibleToTarget: false,
      isVisibleToWerewolves: false,
      isVisibleToRescuers: false,
      isVisibleToAll: false
    };
  }

  /**
   * 发送公告消息到数据库
   */
  private static async sendAnnouncementMessage(
    message: string, 
    roomId: string, 
    visibility: AnnouncementVisibility,
    data: SystemAnnouncementData
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          room_id: roomId,
          sender_id: 'system', // 系统消息
          message: message,
          chat_type: 'system',
          game_round: data.gameRound,
          game_phase: data.gamePhase,
          metadata: {
            announcement_type: data.type,
            visibility: visibility,
            data: data
          }
        });

      if (error) {
        console.error('Error sending system announcement:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending system announcement:', error);
      return false;
    }
  }

  /**
   * 检查用户是否可以查看特定公告
   */
  static async canUserViewAnnouncement(
    userId: string, 
    userRole: string, 
    visibility: AnnouncementVisibility,
    announcementData: SystemAnnouncementData
  ): Promise<boolean> {
    // 法官可以查看所有公告
    if (visibility.isVisibleToJudge) {
      // 检查用户是否为该房间的法官
      const { data: room, error } = await supabase
        .from('rooms')
        .select('judge_user_id')
        .eq('id', announcementData.roomId)
        .single();
      
      if (!error && room?.judge_user_id === userId) {
        return true;
      }
    }

    // 全体可见
    if (visibility.isVisibleToAll) {
      return true;
    }

    // 使用者可见
    if (visibility.isVisibleToActor && userId === announcementData.actorUserId) {
      return true;
    }

    // 目标可见
    if (visibility.isVisibleToTarget && userId === announcementData.targetUserId) {
      return true;
    }

    // 狼人可见
    if (visibility.isVisibleToWerewolves && ['werewolf', 'whitewolf', 'demon'].includes(userRole)) {
      return true;
    }

    // 施救者可见
    if (visibility.isVisibleToRescuers && ['witch', 'warlock'].includes(userRole)) {
      return true;
    }

    return false;
  }
}