/**
 * 文件级注释：默认 Playwright smoke 测试配置
 * 用于提供稳定、可接入 CI 的真实浏览器冒烟验证。
 */
import { defineConfig, devices } from '@playwright/test';

/**
 * 函数级注释：生成 Playwright 基础配置
 * 让 smoke 与 full flow 配置共享同一套基础运行参数。
 */
export const createBasePlaywrightConfig = () =>
  defineConfig({
    testDir: './e2e',
    testMatch: '**/*.smoke.spec.ts',
    workers: 1,
    fullyParallel: false,
    retries: process.env.CI ? 2 : 1,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
      baseURL: 'http://localhost:8080',
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'on-first-retry',
    },
    projects: [
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
          ...(process.env.PLAYWRIGHT_BROWSER_CHANNEL === 'chrome'
            ? { channel: 'chrome' as const }
            : {}),
        },
      },
    ],
    webServer: {
      command: 'npm run dev -- --port 8080',
      url: 'http://localhost:8080',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  });

export default createBasePlaywrightConfig();
