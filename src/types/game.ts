export type TeamId = 'nosotros' | 'ellos';
export type GameMode = 'short' | 'long';
export type GameStatus = 'playing' | 'won';

export interface TeamState {
  id: TeamId;
  label: string;
  score: number;
}

export interface GameState {
  nosotros: TeamState;
  ellos: TeamState;
  mode: GameMode;
  status: GameStatus;
  winner: TeamId | null;
  roundNumber: number;
}

export type GameAction =
  | { type: 'ADD_POINTS'; team: TeamId; points: 1 | 2 | 3 }
  | { type: 'SUBTRACT_POINTS'; team: TeamId }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'NEW_GAME' };

export interface MatchRecord {
  id: string;
  winner: TeamId;
  nosotrosScore: number;
  ellosScore: number;
  mode: GameMode;
  date: string;
}

export interface TeamScoreProps {
  team: TeamState;
  winningScore: number;
  isWinner: boolean;
}

export interface TantoMarksProps {
  score: number;
  winningScore: number;
  color?: string;
}

export interface PointButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
}

export interface WinnerModalProps {
  visible: boolean;
  winner: TeamId | null;
  nosotrosScore: number;
  ellosScore: number;
  onNewGame: () => void;
  winnerLabel?: string;
}

export interface GameModeSelectorProps {
  mode: GameMode;
  onChange: (mode: GameMode) => void;
  disabled: boolean;
}
