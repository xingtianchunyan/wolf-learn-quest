# E2E Tests (Playwright)

This directory contains a Playwright end-to-end test suite that exercises the
full game flow:

`home -> lobby -> create/join room -> judge starts game -> evening -> night
skill -> dawn -> day vote -> judge ends game`.

## Running the tests

```bash
# Install the Playwright browser (may be slow on some networks)
npx playwright install chromium

# Run headless
npm run test:e2e

# Run with the interactive UI
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug
```

> **Note:** During development `npx playwright install chromium` timed out on
> this machine because of a slow connection to the Playwright CDN. The project
> config therefore uses `channel: 'chrome'` as a fallback to the system Chrome
> installation. If the bundled Chromium is installed, you can remove the
> `channel: 'chrome'` line from `playwright.config.ts`.

## Authentication

`e2e/auth.setup.ts` signs in two test users and stores their browser state in
`playwright/.auth/host.json` and `playwright/.auth/player.json`.

The setup first tries the generated accounts:

- `e2e-host@wolflearnquest.test` / `TestPass123!`
- `e2e-player@wolflearnquest.test` / `TestPass123!`

If your Supabase project requires email confirmation, the generated accounts
cannot be confirmed automatically and the setup will fall back to environment
credentials:

```bash
E2E_HOST_EMAIL=your-confirmed-host@example.com
E2E_HOST_PASSWORD=yourHostPassword
E2E_PLAYER_EMAIL=your-confirmed-player@example.com
E2E_PLAYER_PASSWORD=yourPlayerPassword
```

You can add these to the project `.env` file or export them before running the
tests. The two accounts must already exist and be confirmed in Supabase Auth.

## Workarounds used in the game flow

1. **AI players cannot select roles.** The `role_selections` table requires a
   non-null `user_id` foreign key to `auth.users`, so AI players cannot receive
   role selections. The test bypasses the UI ready-gate by directly updating
   `room_players.is_ready` and inserting a `role_selections` row for the human
   player via the Supabase API (`e2e/helpers/supabase.ts`). The judge's
   start-game check only verifies that all players are ready, so the game can
   still start.

2. **Role assignment.** The human player is assigned a `werewolf` role so that
   they have an active night skill to use during the test.
