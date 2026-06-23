/**
 * 文件级注释：完整游戏流 Playwright 测试
 * 覆盖从建房到结算的真实联调场景，适合作为手动深度回归。
 */
import { test, expect } from './fixtures';
import { LobbyPage } from './pages/lobby.page';
import { RoomPage } from './pages/room.page';
import { JudgePage } from './pages/judge.page';
import { GamePage } from './pages/game.page';
import {
  seedRoomForStart,
  getRoomIdFromUrl,
  addAIPlayersViaAdmin,
  assignJudgeViaAdmin,
  seedQuestionsForRoom,
  advancePhaseViaAdmin,
  waitForAllPlayersReady,
  ensureGameSettingsAutoAdvanceOff,
  getGameState,
  createVotingSessionViaAdmin,
} from './helpers/supabase';

test.describe('full game flow', () => {
  test('host creates room, player joins, judge starts and runs a game', async ({
    hostPage,
    playerPage,
  }) => {
    test.setTimeout(180000);
    const hostLobby = new LobbyPage(hostPage);
    const playerLobby = new LobbyPage(playerPage);
    const hostRoom = new RoomPage(hostPage);
    const playerRoom = new RoomPage(playerPage);
    const judge = new JudgePage(hostPage);
    const game = new GamePage(playerPage);

    // Host: home -> lobby -> create room
    await hostPage.goto('/');
    await hostPage.getByRole('link', { name: 'Start Game' }).click();
    await hostPage.waitForURL('/lobby');
    await hostLobby.expectLoaded();
    await hostLobby.createRoom();
    await hostPage.waitForURL(/\/room\/[a-f0-9\-]+$/);
    const roomDbId = getRoomIdFromUrl(hostPage.url());

    // Host configures the room while they are still the room owner. The judge
    // page does not expose these controls, so they must be set before leaving.
    await hostRoom.reduceMaxPlayersTo(6);
    // NOTE: the UI "Add AI" button is currently blocked by a missing RLS policy
    // (migration pending). We seed the AI players via the service role so the
    // room can reach the required size.
    await addAIPlayersViaAdmin(roomDbId, 4);
    // Refresh the host view because real-time player list updates are flaky in
    // Playwright when rows are inserted via the service role key.
    await hostPage.reload();
    await hostRoom.expectPlayerCount(5, 6);

    // Assign the host as judge directly. The lobby "Play as Judge" flow would
    // force the host to leave the room first, which breaks the judge's ability
    // to see room players through the current RLS policies.
    await assignJudgeViaAdmin(roomDbId, 'playwright/.auth/host.json');
    await hostPage.goto(`/room/${roomDbId}/judge`);
    await hostPage.waitForURL(`/room/${roomDbId}/judge`);

    // Seed quiz questions so the evening/dawn quiz phases have content.
    await seedQuestionsForRoom(roomDbId, [
      {
        question: 'E2E question 1',
        option_a: 'A',
        option_b: 'B',
        option_c: 'C',
        option_d: 'D',
        correct_option: 1,
      },
      {
        question: 'E2E question 2',
        option_a: 'A',
        option_b: 'B',
        option_c: 'C',
        option_d: 'D',
        correct_option: 2,
      },
    ]);

    // Player joins the room from the lobby, taking the last human seat.
    await playerPage.goto('/lobby');
    await playerLobby.expectLoaded();
    await playerLobby.joinRoom(roomDbId);
    await playerPage.waitForURL(`/room/${roomDbId}`);
    await playerRoom.expectPlayerCount(6, 6);

    // Bypass the UI role-selection gate: assign the human player a role and
    // mark everyone ready via the Supabase API. AI players cannot receive
    // role_selections because the table requires a non-null auth.users FK.
    await seedRoomForStart(
      roomDbId,
      'playwright/.auth/player.json',
      'werewolf'
    );
    await waitForAllPlayersReady(roomDbId);

    // Ensure game settings exist with auto-advance off before the judge starts,
    // otherwise the start-game flow creates settings with auto-advance enabled
    // and the background scheduler races with our manual phase advances.
    await ensureGameSettingsAutoAdvanceOff(roomDbId);

    // Judge opens the preparation dialog and starts the game.
    await judge.openPreparation();
    await judge.startGame();

    // Navigate the player directly to the game screen (real-time auto-navigation
    // is flaky in Playwright).
    await playerPage.goto(`/room/${roomDbId}/game`);
    await playerPage.waitForURL(`/room/${roomDbId}/game`);

    // Game starts in the evening quiz phase.
    await game.waitForPhase('傍晚答题阶段');

    // Advance to night and use the werewolf skill on the host.
    await advancePhaseViaAdmin(roomDbId);
    await playerPage.reload();
    await game.waitForPhase('夜晚行动阶段');
    await game.useWerewolfSkillOnHost();

    // Advance through dawn to daytime, then vote.
    await advancePhaseViaAdmin(roomDbId);
    await playerPage.reload();
    await game.waitForPhase('黎明答题阶段');
    await advancePhaseViaAdmin(roomDbId);
    await playerPage.reload();
    await game.waitForPhase('白天讨论阶段');

    // Create the voting session through the UI, falling back to a service-role
    // RPC if the real-time update needed by the panel is not yet visible.
    const gameState = await getGameState(roomDbId);
    await game.createVotingSession(async () => {
      await createVotingSessionViaAdmin(
        gameState.id,
        roomDbId,
        gameState.currentRound,
        gameState.currentPhase
      );
    });
    await game.selectFirstVotableTarget();
    await game.confirmVote();

    // Judge calculates and processes the vote, then ends the game.
    await judge.calculateResults();
    await judge.processResults();
    await judge.endGame();

    // Refresh the player page so it picks up the ended game state (real-time
    // updates are unreliable in the Playwright environment).
    await playerPage.reload();

    // Both pages should reflect that the game has ended.
    await expect(
      hostPage.getByRole('heading', { name: '游戏已结束', exact: true })
    ).toBeVisible();
    await expect(
      playerPage.getByRole('heading', { name: '游戏已结束', exact: true })
    ).toBeVisible();
  });
});
