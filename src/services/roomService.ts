import { supabase   } from '@/integrations/supabase/client';

export class RoomServiceError extends Error { code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'RoomServiceError';
    this.code = code
}
}

export class RoomService { private static sanitizeError(error: any): string {
    // Map common database errors to user-friendly messages
    if (error.code === '23505') { // Unique constraint violation
    if (error.message?.includes('role_selections_unique_room_role')) {
      return '该角色已被其他玩家选择'
}
    if (error.message?.includes('role_selections_unique_room_user')) { return '你已经选择了角色，请先取消当前选择'
}
    return '选择冲突，请重试'
}
  if (error.code === '42501') { // RLS policy violation
  return '权限不足，无法执行此操作'
}
if (error.code === 'PGRST301') { // No matching rows
return '数据不存在或无权访问'
}
// Default to original message for debugging, but log internally
console.error('RoomService Error:', error);
return '操作失败，请重试'
}

static async requireAuth(): Promise<string> { const { data: { user  
} } = await supabase.auth.getUser();
  if (!user?.id) { throw new RoomServiceError('Authentication required')
}
  return user.id
}

private static async validateUserId(providedUserId: string): Promise<void> { const authenticatedUserId = await this.requireAuth();
  if (providedUserId !== authenticatedUserId) {
    throw new RoomServiceError('身份验证失败：用户ID不匹配')
}
}

static async joinRoom(roomId: string, userId: string): Promise<void> { await this.validateUserId(userId);
  const authenticatedUserId = await this.requireAuth();

  const { error  } = await supabase;
  .from('room_players')
  .insert({ room_id: roomId,
    user_id: authenticatedUserId, // Use authenticated user ID instead of parameter
    is_ready: false,
    is_ai: false 
});

  if (error) { throw new RoomServiceError(this.sanitizeError(error), error.code)
}
}

static async leaveRoom(roomId: string, userId: string): Promise<void> { await this.validateUserId(userId);
  const authenticatedUserId = await this.requireAuth();

  const { error  } = await supabase;
  .from('room_players')
  .delete()
  .eq('room_id', roomId)
  .eq('user_id', authenticatedUserId); // Use authenticated user ID

  if (error) { throw new RoomServiceError(this.sanitizeError(error), error.code)
}
}

static async clearRoleSelection(roomId: string, userId: string): Promise<void> { await this.validateUserId(userId);
  const authenticatedUserId = await this.requireAuth();

  const { error  } = await supabase;
  .from('role_selections')
  .delete()
  .eq('room_id', roomId)
  .eq('user_id', authenticatedUserId); // Use authenticated user ID

  if (error) { throw new RoomServiceError(this.sanitizeError(error), error.code)
}
}

static async updatePlayerReadyStatus(roomId: string, userId: string, isReady: boolean): Promise<void> { await this.validateUserId(userId);
  const authenticatedUserId = await this.requireAuth();

  const { error  } = await supabase;
  .from('room_players')
  .update({ is_ready: isReady  
})
  .eq('room_id', roomId)
  .eq('user_id', authenticatedUserId); // Use authenticated user ID

  if (error) { throw new RoomServiceError(this.sanitizeError(error), error.code)
}
}

static async createNextRoom(roomId: string): Promise<string> { await this.requireAuth();

  const { data, error  } = await supabase;
  .rpc('create_next_room', { p_room_id: roomId  
});

  if (error) { throw new RoomServiceError(this.sanitizeError(error), error.code)
}

  return data
}
}