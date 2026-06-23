/**
 * 文件级注释：应用基础冒烟测试
 * 验证首页、大厅认证门槛与基础交互，作为默认真实浏览器门禁。
 */
import { test, expect } from '@playwright/test';

test.describe('app smoke', () => {
  /**
   * 函数级注释：验证首页关键内容与大厅跳转
   */
  test('homepage renders and navigates to lobby', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Welcome to the Werewolf Social Learning' })
    ).toBeVisible();

    await page.getByRole('link', { name: 'Start Game' }).click();

    await expect(page).toHaveURL(/\/lobby$/);
    await expect(
      page.getByText('Please sign in to create or join game rooms')
    ).toBeVisible();
  });

  /**
   * 函数级注释：验证未登录状态下大厅入口受控
   */
  test('lobby keeps room creation behind authentication', async ({ page }) => {
    await page.goto('/lobby');

    await expect(
      page.getByRole('heading', { name: 'Authentication' })
    ).toBeVisible();
    await expect(
      page.getByText('Please sign in to create or join game rooms')
    ).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });
});
