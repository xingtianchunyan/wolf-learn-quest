import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  getSupabaseEnv,
  readSessionFromStorageState,
  loadEnv,
  getUserIdFromStorageState,
} from './auth';

export function createSupabaseClient(): SupabaseClient {
  const { url, anonKey } = getSupabaseEnv();
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function createAuthedSupabaseClient(
  storageStatePath: string
): Promise<SupabaseClient> {
  const { url, anonKey } = getSupabaseEnv();
  const { access_token, refresh_token } =
    readSessionFromStorageState(storageStatePath);
  const client = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await client.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return client;
}

/**
 * Assign a role to a human player and mark every room_player row as ready.
 *
 * Note: AI players cannot receive `role_selections` because the table requires
 * a non-null `user_id` foreign key to `auth.users`. The UI ready-gate is
 * therefore bypassed by directly updating `room_players.is_ready`. The judge
 * start-game check only verifies that all players are ready, which succeeds.
 */
export async function seedRoomForStart(
  roomId: string,
  playerStorageStatePath: string,
  roleName = 'werewolf'
): Promise<void> {
  const client = await createAuthedSupabaseClient(playerStorageStatePath);

  const {
    data: { user },
    error: userError,
  } = await client.auth.getUser();
  if (userError || !user) {
    throw new Error('Failed to get current user from player storage state');
  }

  // Pick a matching role_design for the human player.
  const { data: designs, error: designError } = await client
    .from('role_design')
    .select('id, role_name')
    .ilike('role_name', roleName)
    .limit(1);
  if (designError) throw designError;
  if (!designs || designs.length === 0) {
    throw new Error(`No role_design found matching ${roleName}`);
  }
  const roleId = designs[0].id;

  // Upsert the human player's role selection.
  const { error: selectionError } = await client.from('role_selections').upsert(
    {
      room_id: roomId,
      user_id: user.id,
      role_id: roleId,
    },
    { onConflict: 'room_id,user_id' }
  );
  if (selectionError) throw selectionError;

  // Mark all room_players rows as ready via the service role. The player
  // client can only update its own row; the host and AI rows need a bypass.
  const admin = createServiceRoleClient();
  const { data: players, error: playersError } = await admin
    .from('room_players')
    .select('id, user_id, is_ready')
    .eq('room_id', roomId);
  if (playersError) throw playersError;

  for (const player of players || []) {
    if (!player.is_ready) {
      const { error: updateError } = await admin
        .from('room_players')
        .update({ is_ready: true })
        .eq('id', player.id);
      if (updateError) throw updateError;
    }
  }
}

/**
 * Poll the database until every room_player row for the room is ready.
 * Use this after seeding readiness to avoid clicking a disabled start button.
 */
export async function waitForAllPlayersReady(
  roomId: string,
  timeoutMs = 10000
): Promise<void> {
  const admin = createServiceRoleClient();
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { data: players, error } = await admin
      .from('room_players')
      .select('is_ready')
      .eq('room_id', roomId);
    if (error) throw error;
    if ((players || []).length > 0 && players!.every(p => p.is_ready)) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Timed out waiting for all players to be ready in ${roomId}`);
}

export function getRoomIdFromUrl(pageUrl: string): string {
  const match = pageUrl.match(/\/room\/([a-f0-9\-]+)/i);
  if (!match) {
    throw new Error(`Could not extract room id from URL: ${pageUrl}`);
  }
  return match[1];
}

function createServiceRoleClient(): SupabaseClient {
  const env = loadEnv();
  const url = env.VITE_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is required to seed AI players for E2E tests.'
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Insert AI players directly via the service role key. The UI "Add AI" button
 * is currently blocked by a missing RLS policy; once the migration
 * `20250622175000_fix_ai_player_rls_and_leave_cleanup.sql` is applied, this
 * helper can be replaced with page-object clicks.
 */
export async function addAIPlayersViaAdmin(
  roomId: string,
  count: number
): Promise<void> {
  const admin = createServiceRoleClient();
  for (let i = 0; i < count; i++) {
    const { error } = await admin.from('room_players').insert({
      room_id: roomId,
      is_ai: true,
      is_ready: true,
      user_id: null,
    });
    if (error) throw error;
  }
}

/**
 * Assign a user as the human judge for a room. This bypasses the lobby
 * "Play as Judge" flow, which requires the judge to leave the room first and
 * therefore runs into RLS visibility issues.
 */
interface QuestionSeed {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: number;
  explanation?: string;
  category?: string;
  difficulty?: number;
}

export async function seedQuestionsForRoom(
  roomId: string,
  questions: QuestionSeed[]
): Promise<void> {
  const admin = createServiceRoleClient();

  const { data: inserted, error } = await admin
    .from('questions')
    .insert(
      questions.map(q => ({
        ...q,
        difficulty: q.difficulty ?? 1,
        category: q.category ?? 'e2e',
      }))
    )
    .select('id');
  if (error) throw error;

  const roomQuestions = (inserted || []).map((q, index) => ({
    room_id: roomId,
    question_id: q.id,
    question_order: index + 1,
  }));

  if (roomQuestions.length > 0) {
    const { error: linkError } = await admin
      .from('room_questions')
      .insert(roomQuestions);
    if (linkError) throw linkError;
  }
}

export async function assignJudgeViaAdmin(
  roomId: string,
  judgeStorageStatePath: string
): Promise<void> {
  const client = await createAuthedSupabaseClient(judgeStorageStatePath);
  const {
    data: { user },
    error: userError,
  } = await client.auth.getUser();
  if (userError || !user) {
    throw new Error('Failed to get judge user from storage state');
  }

  const admin = createServiceRoleClient();
  const { error } = await admin
    .from('rooms')
    .update({ judge_user_id: user.id })
    .eq('id', roomId);
  if (error) throw error;
}

async function cleanupUserById(admin: SupabaseClient, userId: string) {
  await admin.from('role_selections').delete().eq('user_id', userId);
  await admin.from('room_players').delete().eq('user_id', userId);

  const { data: ownedRooms } = await admin
    .from('rooms')
    .select('id')
    .or(`host_id.eq.${userId},judge_user_id.eq.${userId}`);

  for (const room of ownedRooms || []) {
    await admin.from('rooms').delete().eq('id', room.id);
  }
}

/**
 * Remove both E2E test users from any stale rooms. Called before each test so
 * that retries and re-runs don't get redirected away from the lobby.
 */
export async function advancePhaseViaAdmin(roomId: string): Promise<void> {
  const admin = createServiceRoleClient();
  const { error } = await admin.rpc('advance_game_phase', {
    p_room_id: roomId,
  });
  if (error) throw error;
}

export async function ensureGameSettingsAutoAdvanceOff(
  roomId: string
): Promise<void> {
  const admin = createServiceRoleClient();
  const { data: existing } = await admin
    .from('game_settings')
    .select('id')
    .eq('room_id', roomId)
    .maybeSingle();

  if (existing) {
    const { error } = await admin
      .from('game_settings')
      .update({ is_auto_advance: false })
      .eq('room_id', roomId);
    if (error) throw error;
  } else {
    const { error } = await admin.from('game_settings').insert({
      room_id: roomId,
      is_auto_advance: false,
      day_duration: 300,
      evening_duration: 40,
      night_duration: 180,
      dawn_duration: 40,
    });
    if (error) throw error;
  }
}

export async function createVotingSessionViaAdmin(
  gameStateId: string,
  roomId: string,
  roundNumber: number,
  phase: number
): Promise<string> {
  const admin = createServiceRoleClient();
  const { data, error } = await admin.rpc('create_voting_session', {
    p_game_state_id: gameStateId,
    p_room_id: roomId,
    p_round_number: roundNumber,
    p_phase: phase,
    p_session_type: 'day_vote',
  });
  if (error) throw error;
  if (!data) throw new Error('create_voting_session returned no id');
  return data as string;
}

export async function getGameStateId(roomId: string): Promise<string> {
  const admin = createServiceRoleClient();
  const { data, error } = await admin
    .from('game_states')
    .select('id')
    .eq('room_id', roomId)
    .single();
  if (error) throw error;
  if (!data?.id) throw new Error(`No game_state found for room ${roomId}`);
  return data.id;
}

export async function getGameState(roomId: string): Promise<{
  id: string;
  currentPhase: number;
  currentRound: number;
}> {
  const admin = createServiceRoleClient();
  const { data, error } = await admin
    .from('game_states')
    .select('id, current_phase, current_round')
    .eq('room_id', roomId)
    .single();
  if (error) throw error;
  if (!data) throw new Error(`No game_state found for room ${roomId}`);
  return {
    id: data.id,
    currentPhase: data.current_phase,
    currentRound: data.current_round,
  };
}

export async function cleanupTestUsers(): Promise<void> {
  const admin = createServiceRoleClient();
  const hostId = getUserIdFromStorageState('playwright/.auth/host.json');
  const playerId = getUserIdFromStorageState('playwright/.auth/player.json');
  await cleanupUserById(admin, hostId);
  await cleanupUserById(admin, playerId);
}
