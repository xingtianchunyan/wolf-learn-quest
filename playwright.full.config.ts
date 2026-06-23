/**
 * 文件级注释：完整游戏流 Playwright 配置
 * 用于手动验证复杂联机链路，不默认接入 CI 门禁。
 */
import { defineConfig } from '@playwright/test';
import { createBasePlaywrightConfig } from './playwright.config';

const baseConfig = createBasePlaywrightConfig();

export default defineConfig({
  ...baseConfig,
  testMatch: '**/game-flow.spec.ts',
  globalSetup: './e2e/auth.setup.ts',
});
