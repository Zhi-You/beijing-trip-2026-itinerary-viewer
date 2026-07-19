import type { BoardState } from '../types/board';

/** Ensure each day board has a removedCardIds array for deletion persistence. */
export function runBoardMigrations(state: BoardState): BoardState {
  const days: BoardState['days'] = {};
  for (const [dayId, dayBoard] of Object.entries(state.days)) {
    days[dayId] = {
      ...dayBoard,
      removedCardIds: dayBoard.removedCardIds ?? [],
    };
  }
  return { ...state, days };
}
