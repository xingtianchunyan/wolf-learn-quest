import { test as base, expect, type Page } from '@playwright/test';
import { cleanupTestUsers } from './helpers/supabase';

function attachConsoleListeners(page: Page) {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`[browser error] ${msg.text()}`);
    }
  });
  page.on('pageerror', error => {
    console.error(`[browser pageerror] ${error.message}`);
  });
}

export const test = base.extend<{
  hostPage: Page;
  playerPage: Page;
}>({
  hostPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/host.json',
    });
    const page = await context.newPage();
    attachConsoleListeners(page);
    await use(page);
    await context.close();
  },
  playerPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/player.json',
    });
    const page = await context.newPage();
    attachConsoleListeners(page);
    await use(page);
    await context.close();
  },
});

test.beforeEach(async () => {
  await cleanupTestUsers();
});

export { expect };
