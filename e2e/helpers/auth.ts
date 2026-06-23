import fs from 'fs';
import path from 'path';

export interface SupabaseEnv {
  url: string;
  anonKey: string;
  projectId: string;
}

/**
 * Load environment variables from the project `.env` file and merge them with
 * `process.env`. Values in `process.env` take precedence.
 */
export function loadEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  const envPath = path.resolve('.env');

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed
        .slice(idx + 1)
        .trim()
        .replace(/^["']|["']$/g, '');
      if (key) env[key] = value;
    }
  }

  return { ...env, ...process.env } as Record<string, string>;
}

export function getSupabaseEnv(): SupabaseEnv {
  const env = loadEnv();
  const url = env.VITE_SUPABASE_URL;
  const anonKey = env.VITE_SUPABASE_ANON_KEY;
  const projectId = env.VITE_SUPABASE_PROJECT_ID || getProjectIdFromUrl(url);

  if (!url || !anonKey) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
        'Please set them in the project .env file.'
    );
  }

  return { url, anonKey, projectId };
}

export function getProjectIdFromUrl(supabaseUrl: string): string {
  try {
    const host = new URL(supabaseUrl).hostname;
    return host.split('.')[0];
  } catch {
    throw new Error(
      `Unable to parse Supabase project ID from URL: ${supabaseUrl}`
    );
  }
}

export function getStorageKey(projectId: string): string {
  return `sb-${projectId}-auth-token`;
}

export interface StorageState {
  cookies: never[];
  origins: Array<{
    origin: string;
    localStorage: Array<{ name: string; value: string }>;
  }>;
}

/**
 * Build a Playwright storage-state payload from a Supabase session so that
 * loading it into a browser context restores the authenticated state.
 */
export function buildStorageState(
  session: Record<string, unknown>,
  origin = 'http://localhost:8080'
): StorageState {
  const { url, projectId } = getSupabaseEnv();
  const effectiveOrigin = origin || 'http://localhost:8080';
  return {
    cookies: [],
    origins: [
      {
        origin: effectiveOrigin,
        localStorage: [
          {
            name: getStorageKey(projectId),
            value: JSON.stringify(session),
          },
        ],
      },
    ],
  };
}

/**
 * Read a Playwright storage-state file and return the parsed Supabase session.
 */
export function readSessionFromStorageState(storageStatePath: string): {
  access_token: string;
  refresh_token: string;
} {
  const raw = fs.readFileSync(storageStatePath, 'utf-8');
  const state: StorageState = JSON.parse(raw);
  const { projectId } = getSupabaseEnv();
  const expectedStorageKey = getStorageKey(projectId);
  const origin =
    state.origins.find(
      o =>
        o.origin.includes('localhost:8080') || o.origin.includes('localhost:8081')
    ) ||
    state.origins[0];
  if (!origin) {
    throw new Error(`No origin found in storage state: ${storageStatePath}`);
  }
  const entry = origin.localStorage.find(e => e.name === expectedStorageKey);
  if (!entry) {
    throw new Error(
      `No Supabase auth token "${expectedStorageKey}" found in storage state: ${storageStatePath}`
    );
  }
  const session = JSON.parse(entry.value);
  if (!session.access_token || !session.refresh_token) {
    throw new Error(
      'Supabase session is missing access_token or refresh_token'
    );
  }
  return {
    access_token: session.access_token as string,
    refresh_token: session.refresh_token as string,
  };
}

export function getUserIdFromStorageState(storageStatePath: string): string {
  const { access_token } = readSessionFromStorageState(storageStatePath);
  const payload = JSON.parse(
    Buffer.from(access_token.split('.')[1], 'base64').toString('utf-8')
  );
  if (!payload.sub) {
    throw new Error(`No sub claim in access token: ${storageStatePath}`);
  }
  return payload.sub as string;
}
