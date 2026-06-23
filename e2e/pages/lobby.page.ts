import { expect, type Page } from '@playwright/test';

export class LobbyPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/lobby');
  }

  async expectLoaded() {
    await expect(this.page.getByTestId('create-room-button')).toBeVisible();
  }

  async createRoom() {
    await this.page.getByTestId('create-room-button').click();
  }

  async playJudge(roomDbId: string) {
    const button = this.page.getByTestId(`play-judge-${roomDbId}`);
    await expect(button).toBeVisible();
    await button.click();
  }

  async joinRoom(roomDbId: string) {
    const button = this.page.getByTestId(`join-room-${roomDbId}`);
    await expect(button).toBeVisible();
    await button.click();
  }

  async expectRoomRow(roomDbId: string) {
    await expect(this.page.getByTestId(`room-row-${roomDbId}`)).toBeVisible();
  }
}
