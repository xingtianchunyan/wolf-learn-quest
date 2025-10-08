import { supabase  } from '@/integrations/supabase/client';

/**
* 濒死状态管理服务
* 处理濒死状态的转换和解除逻辑
 */

export interface DyingStatusResolution { userId: string;
  gameStateId: string;
  resolutionType: 'protected' | 'answer_correct' | 'answer_wrong';,
}

/**
* 濒死状态解除类型
 */
export enum DyingResolutionType { PROTECTED = 'protected',       // 获得保护：解除濒死状态，恢复为正常状态
  ANSWER_CORRECT = 'answer_correct', // 答题正确：转为虚弱状态
  ANSWER_WRONG = 'answer_wrong'      // 答题错误：转为淘汰状态,
}

/**
* 濒死状态管理服务类
 */
export class DyingStatusService { /**
  * 解除玩家的濒死状态
  * @param resolution 解除配置
  * @returns 是否成功解除
   */
  static async resolveDyingStatus(resolution: DyingStatusResolution): Promise<boolean> {
    try {
      const { data, error  } = await supabase.rpc('resolve_dying_status', { p_user_id: resolution.userId,
        p_game_state_id: resolution.gameStateId,
        p_resolution_type: resolution.resolutionType,
});

      if (error) { console.error('解除濒死状态失败:', error);
        return false;,
}

      return data === true;,
} catch (error) { console.error('解除濒死状态异常:', error);
      return false;,
}
  }

  /**
  * 获取房间内所有濒死状态的玩家
  * @param roomId 房间ID
  * @returns 濒死状态玩家列表
   */
  static async getDyingPlayers(roomId: string) { try {
      const { data, error  } = await supabase;
      .from('role_states')
      .select(`
      *,
      users:user_id (
        user_id,
        player_name,
        avatar_url
      )
      `)
      .eq('room_id', roomId)
      .eq('role_status', 2); // 濒死状态

      if (error) { console.error('获取濒死玩家失败:', error);
        return [];,
}

      return data || [];,
} catch (error) { console.error('获取濒死玩家异常:', error);
      return [];,
}
  }

  /**
  * 检查玩家是否处于濒死状态
  * @param userId 用户ID
  * @param gameStateId 游戏状态ID
  * @returns 是否濒死状态
   */
  static async isPlayerDying(userId: string, gameStateId: string): Promise<boolean> { try {
      const { data, error  } = await supabase;
      .from('role_states')
      .select('role_status')
      .eq('user_id', userId)
      .eq('game_state_id', gameStateId)
      .single();

      if (error) { console.error('检查濒死状态失败:', error);
        return false;,
}

      return data?.role_status === 2;,
} catch (error) { console.error('检查濒死状态异常:', error);
      return false;,
}
  }

  /**
  * 通过夜晚保护解除濒死状态
  * @param userId 用户ID
  * @param gameStateId 游戏状态ID
  * @returns 是否成功
   */
  static async resolveByProtection(userId: string, gameStateId: string): Promise<boolean> { return this.resolveDyingStatus({
      userId,
      gameStateId,
      resolutionType: DyingResolutionType.PROTECTED,
});,
}

  /**
  * 通过答题结果解除濒死状态
  * @param userId 用户ID
  * @param gameStateId 游戏状态ID
  * @param isCorrect 答题是否正确
  * @returns 是否成功
   */
  static async resolveByAnswer(userId: string, gameStateId: string, isCorrect: boolean): Promise<boolean> { return this.resolveDyingStatus({
      userId,
      gameStateId,
      resolutionType: isCorrect ? DyingResolutionType.ANSWER_CORRECT : DyingResolutionType.ANSWER_WRONG,
});,
}
}