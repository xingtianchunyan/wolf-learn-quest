/**
 * @fileoverview 投票系统辅助函数测试文件
 *
 * 本文件包含对投票系统辅助函数的全面测试，包括：
 * - 投票摘要计算功能测试
 * - 投票结果描述生成测试
 * - 投票权限验证测试
 * - 投票时间格式化测试
 * - 边界情况和错误处理测试
 *
 * @author AI Assistant
 * @version 1.0.0
 * @since 2024-01-01
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  calculateVotingSummary,
  getVotingResultDescription,
  canStartVoting,
  getSessionTypeDisplayName,
  hasVotingPermission,
  canBeVoted,
  calculateVoteWeight,
  formatVoteTime,
  type VotingSummary,
} from '../votingSystemHelpers';

/**
 * 投票系统辅助函数测试套件
 *
 * 测试投票系统中各种辅助函数的功能正确性，包括：
 * - 投票统计和摘要计算
 * - 权限验证逻辑
 * - 时间格式化功能
 * - 各种边界情况处理
 */
describe('VotingSystemHelpers', () => {
  /**
   * 在每个测试前重置所有模拟
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * 投票摘要计算功能测试组
   *
   * 测试 calculateVotingSummary 函数的各种场景，包括：
   * - 基本投票统计
   * - 投票权重处理
   * - 平票情况
   * - 过半数判断
   */
  describe('calculateVotingSummary', () => {
    /**
     * 测试基本投票摘要计算功能
     */
    it('应该正确计算基本投票摘要', () => {
      // 准备测试数据
      const votes = [
        { target_id: 'player1', is_valid: true },
        { target_id: 'player1', is_valid: true },
        { target_id: 'player2', is_valid: true },
        { target_id: undefined, is_valid: true }, // 弃权票
        { target_id: 'player3', is_valid: false }, // 无效票
      ];

      const players = [
        { userId: 'player1', name: '玩家1' },
        { userId: 'player2', name: '玩家2' },
        { userId: 'player3', name: '玩家3' },
      ];

      // 执行测试
      const result = calculateVotingSummary(votes, players, 5);

      // 验证结果
      expect(result.totalVotes).toBe(5);
      expect(result.validVotes).toBe(4); // 4张有效票的权重总和
      expect(result.abstentions).toBe(1); // 1张弃权票
      expect(result.topCandidate).toEqual({
        playerId: 'player1',
        playerName: '玩家1',
        voteCount: 2,
        percentage: 50, // 2/4 * 100
      });
      expect(result.isTied).toBe(false);
      expect(result.hasMajority).toBe(false); // 2票不超过4票的一半
    });

    /**
     * 测试带权重的投票摘要计算
     */
    it('应该正确处理投票权重', () => {
      // 准备测试数据 - 包含不同权重的投票
      const votes = [
        { target_id: 'player1', is_valid: true, vote_weight: 2 },
        { target_id: 'player1', is_valid: true, vote_weight: 1 },
        { target_id: 'player2', is_valid: true, vote_weight: 3 },
      ];

      const players = [
        { userId: 'player1', name: '玩家1' },
        { userId: 'player2', name: '玩家2' },
      ];

      // 执行测试
      const result = calculateVotingSummary(votes, players, 3);

      // 验证结果
      expect(result.totalVotes).toBe(3);
      expect(result.validVotes).toBe(6); // 2+1+3=6 权重总和
      expect(result.topCandidate).toEqual({
        playerId: 'player1',
        playerName: '玩家1',
        voteCount: 3, // 2+1=3 权重
        percentage: 50, // 3/6 * 100
      });
      expect(result.hasMajority).toBe(false); // 3票等于6票的一半，不超过
    });

    /**
     * 测试平票情况
     */
    it('应该正确识别平票情况', () => {
      // 准备测试数据 - 两个候选人得票相同
      const votes = [
        { target_id: 'player1', is_valid: true },
        { target_id: 'player2', is_valid: true },
      ];

      const players = [
        { userId: 'player1', name: '玩家1' },
        { userId: 'player2', name: '玩家2' },
      ];

      // 执行测试
      const result = calculateVotingSummary(votes, players, 2);

      // 验证结果
      expect(result.isTied).toBe(true);
      expect(result.topCandidate?.voteCount).toBe(1);
    });

    /**
     * 测试过半数情况
     */
    it('应该正确判断过半数情况', () => {
      // 准备测试数据 - 一个候选人获得超过半数票
      const votes = [
        { target_id: 'player1', is_valid: true },
        { target_id: 'player1', is_valid: true },
        { target_id: 'player1', is_valid: true },
        { target_id: 'player2', is_valid: true },
      ];

      const players = [
        { userId: 'player1', name: '玩家1' },
        { userId: 'player2', name: '玩家2' },
      ];

      // 执行测试
      const result = calculateVotingSummary(votes, players, 4);

      // 验证结果
      expect(result.hasMajority).toBe(true); // 3票 > 4票/2
      expect(result.topCandidate?.voteCount).toBe(3);
    });

    /**
     * 测试无有效投票情况
     */
    it('应该正确处理无有效投票情况', () => {
      // 准备测试数据 - 所有投票都无效
      const votes = [
        { target_id: 'player1', is_valid: false },
        { target_id: 'player2', is_valid: false },
      ];

      const players = [
        { userId: 'player1', name: '玩家1' },
        { userId: 'player2', name: '玩家2' },
      ];

      // 执行测试
      const result = calculateVotingSummary(votes, players, 2);

      // 验证结果
      expect(result.totalVotes).toBe(2);
      expect(result.validVotes).toBe(0);
      expect(result.topCandidate).toBeUndefined();
      expect(result.isTied).toBe(false);
      expect(result.hasMajority).toBe(false);
    });

    /**
     * 测试未知玩家情况
     */
    it('应该正确处理未知玩家情况', () => {
      // 准备测试数据 - 投票目标不在玩家列表中
      const votes = [{ target_id: 'unknown_player', is_valid: true }];

      const players = [{ userId: 'player1', name: '玩家1' }];

      // 执行测试
      const result = calculateVotingSummary(votes, players, 1);

      // 验证结果
      expect(result.topCandidate?.playerName).toBe('未知玩家');
    });
  });

  /**
   * 投票结果描述功能测试组
   *
   * 测试 getVotingResultDescription 函数的各种结果类型描述
   */
  describe('getVotingResultDescription', () => {
    /**
     * 测试淘汰结果描述
     */
    it('应该返回正确的淘汰结果描述', () => {
      const result = getVotingResultDescription('eliminated', '玩家1');
      expect(result).toBe('玩家1被投票淘汰');
    });

    /**
     * 测试平票结果描述
     */
    it('应该返回正确的平票结果描述', () => {
      const result = getVotingResultDescription('tied');
      expect(result).toBe('投票结果平票，无人被淘汰');
    });

    /**
     * 测试救下结果描述
     */
    it('应该返回正确的救下结果描述', () => {
      const result = getVotingResultDescription('saved', '玩家2');
      expect(result).toBe('玩家2被救下，免于淘汰');
    });

    /**
     * 测试无结果描述
     */
    it('应该返回正确的无结果描述', () => {
      const result = getVotingResultDescription('no_result');
      expect(result).toBe('投票无有效结果');
    });

    /**
     * 测试未知结果类型
     */
    it('应该返回未知结果描述', () => {
      const result = getVotingResultDescription('unknown_type');
      expect(result).toBe('未知投票结果');
    });

    /**
     * 测试无目标名称情况
     */
    it('应该正确处理无目标名称情况', () => {
      const result = getVotingResultDescription('eliminated');
      expect(result).toBe('目标玩家被投票淘汰');
    });
  });

  /**
   * 投票开始条件检查功能测试组
   *
   * 测试 canStartVoting 函数的各种游戏状态检查
   */
  describe('canStartVoting', () => {
    /**
     * 测试正常开始投票条件
     */
    it('应该允许在白天阶段开始投票', () => {
      const result = canStartVoting(1, 'active', 5);
      expect(result.canStart).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    /**
     * 测试游戏未开始情况
     */
    it('应该拒绝在游戏未开始时投票', () => {
      const result = canStartVoting(1, 'waiting', 5);
      expect(result.canStart).toBe(false);
      expect(result.reason).toBe('游戏未开始');
    });

    /**
     * 测试玩家人数不足情况
     */
    it('应该拒绝玩家人数不足时投票', () => {
      const result = canStartVoting(1, 'active', 2);
      expect(result.canStart).toBe(false);
      expect(result.reason).toBe('玩家人数不足');
    });

    /**
     * 测试错误阶段情况
     */
    it('应该拒绝在非白天阶段投票', () => {
      const result = canStartVoting(2, 'active', 5); // 夜晚阶段
      expect(result.canStart).toBe(false);
      expect(result.reason).toBe('当前阶段不允许投票');
    });
  });

  /**
   * 投票会话类型显示名称功能测试组
   *
   * 测试 getSessionTypeDisplayName 函数的各种会话类型
   */
  describe('getSessionTypeDisplayName', () => {
    /**
     * 测试白天投票显示名称
     */
    it('应该返回正确的白天投票显示名称', () => {
      const result = getSessionTypeDisplayName('day_vote');
      expect(result).toBe('白天投票');
    });

    /**
     * 测试放逐投票显示名称
     */
    it('应该返回正确的放逐投票显示名称', () => {
      const result = getSessionTypeDisplayName('exile_vote');
      expect(result).toBe('放逐投票');
    });

    /**
     * 测试紧急投票显示名称
     */
    it('应该返回正确的紧急投票显示名称', () => {
      const result = getSessionTypeDisplayName('emergency_vote');
      expect(result).toBe('紧急投票');
    });

    /**
     * 测试未知会话类型
     */
    it('应该返回默认投票显示名称', () => {
      const result = getSessionTypeDisplayName('unknown_type');
      expect(result).toBe('投票');
    });
  });

  /**
   * 投票权限检查功能测试组
   *
   * 测试 hasVotingPermission 函数的各种权限状态
   */
  describe('hasVotingPermission', () => {
    /**
     * 测试正常状态下的投票权限
     */
    it('应该允许正常状态玩家投票', () => {
      const result = hasVotingPermission(null, 1);
      expect(result).toBe(true);
    });

    /**
     * 测试状态效果禁止投票
     */
    it('应该拒绝被状态效果禁止投票的玩家', () => {
      const statusEffects = { can_vote: false };
      const result = hasVotingPermission(statusEffects, 1);
      expect(result).toBe(false);
    });

    /**
     * 测试濒死状态下的投票权限
     */
    it('应该拒绝濒死状态玩家投票', () => {
      const result = hasVotingPermission(null, 2);
      expect(result).toBe(false);
    });

    /**
     * 测试虚弱状态下的投票权限
     */
    it('应该拒绝虚弱状态玩家投票', () => {
      const result = hasVotingPermission(null, 3);
      expect(result).toBe(false);
    });

    /**
     * 测试淘汰状态下的投票权限
     */
    it('应该拒绝淘汰状态玩家投票', () => {
      const result = hasVotingPermission(null, 4);
      expect(result).toBe(false);
    });

    /**
     * 测试未知状态下的投票权限
     */
    it('应该拒绝未知状态玩家投票', () => {
      const result = hasVotingPermission(null, 999);
      expect(result).toBe(false);
    });
  });

  /**
   * 被投票资格检查功能测试组
   *
   * 测试 canBeVoted 函数的各种被投票资格状态
   */
  describe('canBeVoted', () => {
    /**
     * 测试正常状态下的被投票资格
     */
    it('应该允许正常状态玩家被投票', () => {
      const result = canBeVoted(null, 1);
      expect(result).toBe(true);
    });

    /**
     * 测试状态效果禁止被投票
     */
    it('应该拒绝被状态效果保护的玩家被投票', () => {
      const statusEffects = { can_be_voted: false };
      const result = canBeVoted(statusEffects, 1);
      expect(result).toBe(false);
    });

    /**
     * 测试濒死状态下的被投票资格
     */
    it('应该拒绝濒死状态玩家被投票', () => {
      const result = canBeVoted(null, 2);
      expect(result).toBe(false);
    });

    /**
     * 测试虚弱状态下的被投票资格
     */
    it('应该允许虚弱状态玩家被投票', () => {
      const result = canBeVoted(null, 3);
      expect(result).toBe(true);
    });

    /**
     * 测试淘汰状态下的被投票资格
     */
    it('应该拒绝淘汰状态玩家被投票', () => {
      const result = canBeVoted(null, 4);
      expect(result).toBe(false);
    });

    /**
     * 测试未知状态下的被投票资格
     */
    it('应该拒绝未知状态玩家被投票', () => {
      const result = canBeVoted(null, 999);
      expect(result).toBe(false);
    });
  });

  /**
   * 投票权重计算功能测试组
   *
   * 测试 calculateVoteWeight 函数的各种权重计算场景
   */
  describe('calculateVoteWeight', () => {
    /**
     * 测试默认投票权重
     */
    it('应该返回默认权重1', () => {
      const result = calculateVoteWeight(null, null);
      expect(result).toBe(1);
    });

    /**
     * 测试角色效果权重
     */
    it('应该使用角色效果权重', () => {
      const roleEffects = { vote_weight: 2 };
      const result = calculateVoteWeight(roleEffects, null);
      expect(result).toBe(2);
    });

    /**
     * 测试状态效果权重
     */
    it('应该使用状态效果权重', () => {
      const statusEffects = { vote_weight: 3 };
      const result = calculateVoteWeight(null, statusEffects);
      expect(result).toBe(3);
    });

    /**
     * 测试角色效果优先级
     */
    it('应该优先使用角色效果权重', () => {
      const roleEffects = { vote_weight: 2 };
      const statusEffects = { vote_weight: 3 };
      const result = calculateVoteWeight(roleEffects, statusEffects);
      expect(result).toBe(2); // 角色效果优先
    });
  });

  /**
   * 投票时间格式化功能测试组
   *
   * 测试 formatVoteTime 函数的各种时间格式化场景
   */
  describe('formatVoteTime', () => {
    /**
     * 在每个测试前设置固定的当前时间
     */
    beforeEach(() => {
      // 设置固定的当前时间：2024-01-01 12:00:00
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
    });

    /**
     * 在每个测试后恢复真实时间
     */
    afterEach(() => {
      vi.useRealTimers();
    });

    /**
     * 测试秒级时间格式化
     */
    it('应该正确格式化秒级时间差', () => {
      // 30秒前的时间
      const voteTime = new Date('2024-01-01T11:59:30Z').toISOString();
      const result = formatVoteTime(voteTime);
      expect(result).toBe('30秒前');
    });

    /**
     * 测试分钟级时间格式化
     */
    it('应该正确格式化分钟级时间差', () => {
      // 5分钟前的时间
      const voteTime = new Date('2024-01-01T11:55:00Z').toISOString();
      const result = formatVoteTime(voteTime);
      expect(result).toBe('5分钟前');
    });

    /**
     * 测试小时级时间格式化
     */
    it('应该正确格式化小时级时间差', () => {
      // 2小时前的时间
      const voteTime = new Date('2024-01-01T10:00:00Z').toISOString();
      const result = formatVoteTime(voteTime);
      // 应该显示具体时间而不是相对时间
      expect(result).toMatch(/\d{2}:\d{2}/);
    });

    /**
     * 测试边界情况 - 刚好1分钟
     */
    it('应该正确处理刚好1分钟的情况', () => {
      // 刚好60秒前的时间
      const voteTime = new Date('2024-01-01T11:59:00Z').toISOString();
      const result = formatVoteTime(voteTime);
      expect(result).toBe('1分钟前');
    });

    /**
     * 测试边界情况 - 刚好1小时
     */
    it('应该正确处理刚好1小时的情况', () => {
      // 刚好60分钟前的时间
      const voteTime = new Date('2024-01-01T11:00:00Z').toISOString();
      const result = formatVoteTime(voteTime);
      // 应该显示具体时间
      expect(result).toMatch(/\d{2}:\d{2}/);
    });
  });

  /**
   * 边界情况和错误处理测试组
   *
   * 测试各种边界情况和异常输入的处理
   */
  describe('边界情况和错误处理', () => {
    /**
     * 测试空数组输入
     */
    it('应该正确处理空投票数组', () => {
      const result = calculateVotingSummary([], [], 0);
      expect(result.totalVotes).toBe(0);
      expect(result.validVotes).toBe(0);
      expect(result.abstentions).toBe(0);
      expect(result.topCandidate).toBeUndefined();
      expect(result.isTied).toBe(false);
      expect(result.hasMajority).toBe(false);
    });

    /**
     * 测试空玩家数组输入
     */
    it('应该正确处理空玩家数组', () => {
      const votes = [{ target_id: 'player1', is_valid: true }];
      const result = calculateVotingSummary(votes, [], 1);
      expect(result.topCandidate?.playerName).toBe('未知玩家');
    });

    /**
     * 测试无效的时间字符串
     */
    it('应该正确处理无效的时间字符串', () => {
      const result = formatVoteTime('invalid-date');
      // 应该不抛出错误，返回某种格式的字符串
      expect(typeof result).toBe('string');
    });

    /**
     * 测试极端权重值
     */
    it('应该正确处理极端权重值', () => {
      const votes = [
        { target_id: 'player1', is_valid: true, vote_weight: 0 },
        { target_id: 'player1', is_valid: true, vote_weight: -1 },
        { target_id: 'player2', is_valid: true, vote_weight: 1000 },
      ];

      const players = [
        { userId: 'player1', name: '玩家1' },
        { userId: 'player2', name: '玩家2' },
      ];

      // 应该不抛出错误
      expect(() => calculateVotingSummary(votes, players, 3)).not.toThrow();
    });
  });
});
