import { TEAM_LABELS, WINNING_SCORES } from '../constants/game';
import type { GameAction, GameMode, GameState, TeamId } from '../types/game';

export function createInitialState(mode: GameMode): GameState {
  return {
    nosotros: { id: 'nosotros', label: TEAM_LABELS.nosotros, score: 0 },
    ellos: { id: 'ellos', label: TEAM_LABELS.ellos, score: 0 },
    mode,
    status: 'playing',
    winner: null,
    roundNumber: 0,
  };
}

function checkWin(score: number, mode: GameMode): boolean {
  return score >= WINNING_SCORES[mode];
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_POINTS': {
      const team = action.team as TeamId;
      const winningScore = WINNING_SCORES[state.mode];
      const currentScore = state[team].score;
      const newScore = Math.min(currentScore + action.points, winningScore);
      const won = checkWin(newScore, state.mode);

      return {
        ...state,
        [team]: { ...state[team], score: newScore },
        status: won ? 'won' : 'playing',
        winner: won ? team : state.winner,
        roundNumber: state.roundNumber + 1,
      };
    }

    case 'SUBTRACT_POINTS': {
      const team = action.team as TeamId;
      const newScore = Math.max(state[team].score - 1, 0);
      const stillWon =
        state.status === 'won' &&
        state.winner === team &&
        checkWin(newScore, state.mode);

      return {
        ...state,
        [team]: { ...state[team], score: newScore },
        status: stillWon ? 'won' : 'playing',
        winner: stillWon ? state.winner : null,
        roundNumber: state.roundNumber + 1,
      };
    }

    case 'SET_MODE':
      return createInitialState(action.mode);

    case 'NEW_GAME':
      return createInitialState(state.mode);

    default:
      return state;
  }
}
