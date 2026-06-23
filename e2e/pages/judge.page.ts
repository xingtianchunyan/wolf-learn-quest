import { expect, type Page } from '@playwright/test';

export class JudgePage {
  constructor(private page: Page) {}

  async openPreparation() {
    await this.page.getByTestId('preparation-phase-button').click();
    await expect(this.page.getByTestId('start-game-button')).toBeVisible();
  }

  async startGame() {
    await this.page.getByTestId('start-game-button').click();
    // Once the game starts the "next phase" control becomes enabled.
    await expect(this.page.getByTestId('next-phase-button')).toBeEnabled();
  }

  async nextPhase() {
    const button = this.page.getByTestId('next-phase-button');
    await expect(button).toBeEnabled();
    await button.click();
  }

  async endGame() {
    const button = this.page.getByTestId('end-game-button');
    await expect(button).toBeEnabled();
    await button.click();
  }

  async calculateResults() {
    const button = this.page.getByTestId('calculate-results-button');
    await expect(button).toBeVisible();
    await button.click();
  }

  async processResults() {
    const button = this.page.getByTestId('process-results-button');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled({ timeout: 10000 });
    await button.click();
  }
}
