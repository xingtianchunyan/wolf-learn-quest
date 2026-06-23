import { createClient, Session } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { getSupabaseEnv, buildStorageState, loadEnv } from './helpers/auth';

const AUTH_DIR = path.resolve('playwright', '.auth');
fs.mkdirSync(AUTH_DIR, { recursive: true });

const { url, anonKey } = getSupabaseEnv();
const env = loadEnv();
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

interface TestUser {
  name: string;
  storagePath: string;
  email: string;
  password: string;
  playerName: string;
}

const users: TestUser[] = [
  {
    name: 'host',
    storagePath: path.join(AUTH_DIR, 'host.json'),
    email: env.E2E_HOST_EMAIL || 'e2e-host@wolflearnquest-e2e.example.com',
    password: env.E2E_HOST_PASSWORD || 'TestPass123!',
    playerName: 'E2EHost',
  },
  {
    name: 'player',
    storagePath: path.join(AUTH_DIR, 'player.json'),
    email: env.E2E_PLAYER_EMAIL || 'e2e-player@wolflearnquest-e2e.example.com',
    password: env.E2E_PLAYER_PASSWORD || 'TestPass123!',
    playerName: 'E2EPlayer',
  },
];

const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const adminSupabase = serviceRoleKey
  ? createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cleanupUserState(userId: string): Promise<void> {
  if (!adminSupabase) return;

  // Remove the user from any rooms they are playing in.
  await adminSupabase.from('role_selections').delete().eq('user_id', userId);
  await adminSupabase.from('room_players').delete().eq('user_id', userId);

  // Delete any rooms where the user is the host or the human judge.
  const { data: ownedRooms } = await adminSupabase
    .from('rooms')
    .select('id')
    .or(`host_id.eq.${userId},judge_user_id.eq.${userId}`);

  for (const room of ownedRooms || []) {
    await adminSupabase.from('rooms').delete().eq('id', room.id);
  }
}

async function signInWithPassword(
  email: string,
  password: string
): Promise<Session | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    if (
      error.message.includes('Email not confirmed') ||
      error.message.includes('Invalid login credentials') ||
      error.message.includes('User not found')
    ) {
      return null;
    }
    throw error;
  }
  return data.session;
}

async function signUpNewUser(
  email: string,
  password: string,
  playerName: string,
  retries = 5
): Promise<Session | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          player_name: playerName,
          display_name: playerName,
        },
      },
    });
    if (!error) {
      // When email confirmation is disabled Supabase returns a session immediately.
      return data.session || null;
    }
    if (error.message.includes('already registered')) {
      return null;
    }
    if (
      error.message.includes('rate limit') ||
      error.message.includes('Rate limit')
    ) {
      if (attempt < retries) {
        const wait = (attempt + 1) * 10000;
        console.log(
          `[e2e setup] Hit auth rate limit, waiting ${wait}ms before retry...`
        );
        await delay(wait);
        continue;
      }
    }
    throw error;
  }
  return null;
}

async function createConfirmedUserViaAdmin(
  email: string,
  password: string,
  playerName: string
): Promise<void> {
  if (!adminSupabase) return;

  console.log(`[e2e setup] Creating confirmed user via admin API: ${email}`);
  const { error } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      player_name: playerName,
      display_name: playerName,
    },
  });

  if (error) {
    if (
      error.message.includes('already registered') ||
      error.message.includes('User already registered') ||
      (error as { code?: string }).code === 'user_already_exists'
    ) {
      console.log(`[e2e setup] User ${email} already exists, continuing...`);
      return;
    }
    throw error;
  }
}

async function ensureAuthState(user: TestUser): Promise<void> {
  console.log(`[e2e setup] Ensuring auth state for ${user.name}...`);

  let session = await signInWithPassword(user.email, user.password);
  await delay(500);

  if (!session) {
    if (adminSupabase) {
      await createConfirmedUserViaAdmin(
        user.email,
        user.password,
        user.playerName
      );
      await delay(500);
      session = await signInWithPassword(user.email, user.password);
    } else {
      console.log(`[e2e setup] Trying to sign up ${user.name}...`);
      const signUpSession = await signUpNewUser(
        user.email,
        user.password,
        user.playerName
      );
      if (signUpSession) {
        session = signUpSession;
      } else {
        // Email confirmation may be required. Wait a bit and try signing in again.
        await delay(1000);
        session = await signInWithPassword(user.email, user.password);
      }
    }
  }

  if (!session) {
    throw new Error(
      `Unable to authenticate E2E user "${user.name}".\n\n` +
        `Supabase requires email confirmation for ${user.email} (or the generated test account), ` +
        `and no service role key was provided.\n\n` +
        `To fix this, either:\n` +
        `1. Add SUPABASE_SERVICE_ROLE_KEY to your environment so tests can create confirmed users automatically, or\n` +
        `2. Create two confirmed accounts in your Supabase project and add them to the environment:\n` +
        `   E2E_HOST_EMAIL, E2E_HOST_PASSWORD, E2E_PLAYER_EMAIL, E2E_PLAYER_PASSWORD`
    );
  }

  // Ensure stale rooms from previous failed runs don't redirect the browser
  // away from the lobby before the test starts.
  await cleanupUserState(session.user.id);
  await delay(300);

  const storageState = buildStorageState(session);
  fs.writeFileSync(user.storagePath, JSON.stringify(storageState, null, 2));
  console.log(
    `[e2e setup] Saved auth state for ${user.name}: ${user.storagePath}`
  );
}

async function globalSetup(): Promise<void> {
  for (const user of users) {
    await ensureAuthState(user);
    await delay(1000);
  }
}

export default globalSetup;
