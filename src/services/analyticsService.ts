// 用户行为分析服务
import { createLogger } from '@/lib/logger';
import { supabase } from '@/integrations/supabase/client';

const logger = createLogger('analytics-service');

export interface UserAction {
  userId: string;
  action: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface SkillUsageStats {
  skillName: string;
  totalUses: number;
  successRate: number;
  avgResponseTime: number;
  mostCommonTargets: string[];
  usageByPhase: Record<string, number>;
}

export interface UserBehaviorPattern {
  userId: string;
  mostUsedSkills: string[];
  avgDecisionTime: number;
  skillSuccessRate: number;
  preferredPhases: string[];
  activityPattern: {
    hour: number;
    count: number;
  }[];
}

class AnalyticsService {
  private actions: UserAction[] = [];
  private readonly MAX_ACTIONS = 10000;

  /**
   * 记录用户行为
   */
  trackAction(action: UserAction): void {
    this.actions.push({
      ...action,
      timestamp: Date.now()
    });

    // 限制存储的行为数量
    if (this.actions.length > this.MAX_ACTIONS) {
      this.actions = this.actions.slice(-this.MAX_ACTIONS);
    }

    logger.debug('用户行为记录', action);
  }

  /**
   * 获取技能使用统计
   */
  async getSkillUsageStats(
    gameStateId?: string,
    timeRange?: number
  ): Promise<SkillUsageStats[]> {
    try {
      let query = supabase
        .from('skill_uses')
        .select('skill_name, execution_status, phase, created_at, target_user_id');

      if (gameStateId) {
        query = query.eq('game_state_id', gameStateId);
      }

      if (timeRange) {
        const startTime = new Date(Date.now() - timeRange).toISOString();
        query = query.gte('created_at', startTime);
      }

      const { data, error } = await query;

      if (error) {
        logger.error('获取技能使用统计失败', error);
        return [];
      }

      // 按技能名称分组统计
      const statsMap = new Map<string, {
        total: number;
        success: number;
        targets: Map<string, number>;
        phases: Map<string, number>;
      }>();

      data?.forEach(skill => {
        if (!statsMap.has(skill.skill_name)) {
          statsMap.set(skill.skill_name, {
            total: 0,
            success: 0,
            targets: new Map(),
            phases: new Map()
          });
        }

        const stats = statsMap.get(skill.skill_name)!;
        stats.total++;
        
        if (skill.execution_status === 'completed') {
          stats.success++;
        }

        if (skill.target_user_id) {
          const targetCount = stats.targets.get(skill.target_user_id) || 0;
          stats.targets.set(skill.target_user_id, targetCount + 1);
        }

        const phaseCount = stats.phases.get(skill.phase) || 0;
        stats.phases.set(skill.phase, phaseCount + 1);
      });

      // 转换为结果格式
      const results: SkillUsageStats[] = [];
      statsMap.forEach((stats, skillName) => {
        const mostCommonTargets = Array.from(stats.targets.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([target]) => target);

        const usageByPhase: Record<string, number> = {};
        stats.phases.forEach((count, phase) => {
          usageByPhase[phase] = count;
        });

        results.push({
          skillName,
          totalUses: stats.total,
          successRate: stats.total > 0 ? stats.success / stats.total : 0,
          avgResponseTime: 0, // 需要额外的性能数据
          mostCommonTargets,
          usageByPhase
        });
      });

      return results;
    } catch (error) {
      logger.error('获取技能使用统计异常', error);
      return [];
    }
  }

  /**
   * 分析用户行为模式
   */
  analyzeUserBehavior(userId: string, timeRange: number = 86400000): UserBehaviorPattern {
    const now = Date.now();
    const userActions = this.actions.filter(
      a => a.userId === userId && now - a.timestamp < timeRange
    );

    // 统计最常用的技能
    const skillUsage = new Map<string, number>();
    const decisionTimes: number[] = [];
    const phaseActivity = new Map<string, number>();
    const hourlyActivity = new Map<number, number>();

    userActions.forEach(action => {
      if (action.action === 'use_skill') {
        const skillName = action.metadata?.skillName;
        if (skillName) {
          skillUsage.set(skillName, (skillUsage.get(skillName) || 0) + 1);
        }

        const decisionTime = action.metadata?.decisionTime;
        if (decisionTime) {
          decisionTimes.push(decisionTime);
        }

        const phase = action.metadata?.phase;
        if (phase) {
          phaseActivity.set(phase, (phaseActivity.get(phase) || 0) + 1);
        }
      }

      // 统计活动时段
      const hour = new Date(action.timestamp).getHours();
      hourlyActivity.set(hour, (hourlyActivity.get(hour) || 0) + 1);
    });

    // 获取最常用的技能
    const mostUsedSkills = Array.from(skillUsage.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill]) => skill);

    // 计算平均决策时间
    const avgDecisionTime = decisionTimes.length > 0
      ? decisionTimes.reduce((sum, time) => sum + time, 0) / decisionTimes.length
      : 0;

    // 获取偏好的游戏阶段
    const preferredPhases = Array.from(phaseActivity.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([phase]) => phase);

    // 生成活动模式
    const activityPattern = Array.from(hourlyActivity.entries())
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour - b.hour);

    return {
      userId,
      mostUsedSkills,
      avgDecisionTime,
      skillSuccessRate: 0, // 需要额外计算
      preferredPhases,
      activityPattern
    };
  }

  /**
   * 识别潜在问题
   */
  async detectPotentialIssues(gameStateId: string): Promise<{
    issues: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      affectedUsers?: string[];
    }>;
  }> {
    const issues: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
      affectedUsers?: string[];
    }> = [];

    try {
      // 检查技能使用异常
      const { data: skillUses } = await supabase
        .from('skill_uses')
        .select('user_id, skill_name, execution_status, created_at')
        .eq('game_state_id', gameStateId)
        .order('created_at', { ascending: false })
        .limit(100);

      if (skillUses) {
        // 检查失败率
        const failedSkills = skillUses.filter(s => s.execution_status === 'failed');
        const failureRate = failedSkills.length / skillUses.length;

        if (failureRate > 0.1) {
          issues.push({
            type: 'high_failure_rate',
            severity: 'high',
            description: `技能失败率过高: ${(failureRate * 100).toFixed(1)}%`,
            affectedUsers: Array.from(new Set(failedSkills.map(s => s.user_id)))
          });
        }

        // 检查用户活跃度
        const userActivity = new Map<string, number>();
        skillUses.forEach(skill => {
          userActivity.set(skill.user_id, (userActivity.get(skill.user_id) || 0) + 1);
        });

        const inactiveUsers = Array.from(userActivity.entries())
          .filter(([_, count]) => count < 2)
          .map(([userId]) => userId);

        if (inactiveUsers.length > 0) {
          issues.push({
            type: 'low_activity',
            severity: 'medium',
            description: `${inactiveUsers.length} 个用户活跃度过低`,
            affectedUsers: inactiveUsers
          });
        }
      }

      // 检查性能问题
      const recentActions = this.actions.filter(
        a => Date.now() - a.timestamp < 300000 // 最近5分钟
      );

      const slowActions = recentActions.filter(
        a => a.metadata?.responseTime && a.metadata.responseTime > 2000
      );

      if (slowActions.length > recentActions.length * 0.2) {
        issues.push({
          type: 'slow_response',
          severity: 'high',
          description: '系统响应速度过慢',
          affectedUsers: Array.from(new Set(slowActions.map(a => a.userId)))
        });
      }

      return { issues };
    } catch (error) {
      logger.error('检测潜在问题失败', error);
      return { issues };
    }
  }

  /**
   * 生成分析报告
   */
  async generateAnalyticsReport(
    gameStateId: string,
    timeRange: number = 86400000
  ): Promise<{
    summary: {
      totalActions: number;
      uniqueUsers: number;
      totalSkillUses: number;
      avgSuccessRate: number;
    };
    topSkills: SkillUsageStats[];
    potentialIssues: any;
  }> {
    const skillStats = await this.getSkillUsageStats(gameStateId, timeRange);
    const issues = await this.detectPotentialIssues(gameStateId);

    const now = Date.now();
    const recentActions = this.actions.filter(
      a => now - a.timestamp < timeRange
    );

    const uniqueUsers = new Set(recentActions.map(a => a.userId)).size;
    const skillActions = recentActions.filter(a => a.action === 'use_skill');

    const avgSuccessRate = skillStats.length > 0
      ? skillStats.reduce((sum, stat) => sum + stat.successRate, 0) / skillStats.length
      : 0;

    return {
      summary: {
        totalActions: recentActions.length,
        uniqueUsers,
        totalSkillUses: skillActions.length,
        avgSuccessRate
      },
      topSkills: skillStats.slice(0, 10),
      potentialIssues: issues
    };
  }

  /**
   * 清理旧数据
   */
  cleanup(maxAge: number = 86400000): void {
    const now = Date.now();
    this.actions = this.actions.filter(a => now - a.timestamp < maxAge);
    logger.debug('清理旧分析数据完成');
  }
}

export const analyticsService = new AnalyticsService();
