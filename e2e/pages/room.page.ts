import { expect, type Page } from '@playwright/test';

export class RoomPage {
  constructor(private page: Page) {}

  async leaveRoom() {
    await this.page.getByTestId('leave-room-button').click();
    await this.page.waitForURL('/lobby');
  }

  async reduceMaxPlayersTo(target: number) {
    const valueLocator = this.page.getByTestId('max-players-value');
    await expect(valueLocator).toHaveText(/^\d+$/);
    while (true) {
      const current = parseInt(
        (await valueLocator.textContent())?.trim() || '0',
        10
      );
      if (current <= target) break;
      const decreaseButton = this.page.getByTestId('decrease-max-players');
      await expect(decreaseButton).toBeEnabled();
      await decreaseButton.click({ force: true });
      await this.page.waitForTimeout(150);
    }
  }

  async addAIPlayers(targetTotal: number) {
    const listTitle = this.page.getByTestId('players-list-title');
    await expect(listTitle).toBeVisible();

    while (true) {
      const text = await listTitle.textContent();
      const match = text?.match(/\((\d+)\/(\d+)\)/);
      const current = match ? parseInt(match[1], 10) : 0;
      if (current >= targetTotal) break;

      const addButton = this.page.getByTestId('add-ai-player');
      await expect(addButton).toBeVisible();
      await addButton.click();

      // Wait for the realtime player list to update.
      await expect(listTitle).toHaveText(
        new RegExp(`\\(${current + 1}\\/${targetTotal}\\)`)
      );
    }
  }

  async expectPlayerCount(count: number, max: number) {
    await expect(this.page.getByTestId('players-list-title')).toHaveText(
      new RegExp(`\\(${count}\\/${max}\\)`)
    );
  }

  async clickReady() {
    await this.page.getByTestId('ready-button').click();
  }
}
