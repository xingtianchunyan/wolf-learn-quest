import { expect, type Page } from '@playwright/test';

export class GamePage {
  constructor(private page: Page) {}

  async waitForPhase(phaseLabel: string) {
    // Phase labels are rendered inside the game-info panel, e.g. "白天讨论阶段".
    await expect(this.page.getByText(phaseLabel)).toBeVisible();
  }

  async createVotingSession(fallback?: () => Promise<void>) {
    const createButton = this.page.getByTestId('create-voting-session');
    await expect(createButton).toBeVisible();
    await createButton.click();
    try {
      await expect(this.page.getByTestId('confirm-vote')).toBeVisible({
        timeout: 5000,
      });
    } catch {
      if (fallback) {
        console.log(
          '[e2e] UI voting session creation did not reflect; falling back to admin.'
        );
        await fallback();
        await expect(this.page.getByTestId('confirm-vote')).toBeVisible({
          timeout: 5000,
        });
      } else {
        throw new Error(
          'confirm-vote not visible after creating voting session'
        );
      }
    }
  }

  async selectFirstVotableTarget() {
    // Click the first human player card (not the current user "你", not an AI).
    // Use the player name text to ensure we hit the interactive card.
    const target = this.page
      .locator('[data-testid="player-status-card"]:has-text("E2EHost")')
      .first();
    await expect(target).toBeVisible();
    await target.click();

    // Wait until the voting panel reflects the selected target. If Playwright's
    // click didn't trigger the React handler, fall back to a native DOM click.
    const selectionText = this.page.getByText(/选择目标: /);
    try {
      await expect(selectionText).toBeVisible({ timeout: 2000 });
    } catch {
      console.log(
        '[e2e] Playwright click did not select target; using native click.'
      );
      await target.evaluate(el => el.click());
      await expect(selectionText).toBeVisible({ timeout: 5000 });
    }
  }

  async confirmVote() {
    const button = this.page.getByTestId('confirm-vote');
    await expect(button).toBeEnabled({ timeout: 5000 });
    await button.click();
    await expect(this.page.getByText('已完成投票')).toBeVisible();
  }

  async abstain() {
    await this.page.getByTestId('abstain-vote').click();
  }

  async useWerewolfSkillOnHost() {
    // Select the human host (judge) card so the target has a real auth user_id
    // and a corresponding role_states row.
    const target = this.page
      .locator('[data-testid="player-status-card"]:has-text("E2EHost")')
      .first();
    await expect(target).toBeVisible();
    await target.click();

    // The werewolf skill panel renders buttons named "攻击 <player>".
    const button = this.page.getByRole('button', { name: /^攻击/ }).first();
    await expect(button).toBeEnabled({ timeout: 5000 });
    await button.click();
  }
}
