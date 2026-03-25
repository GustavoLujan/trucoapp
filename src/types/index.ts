export type GameMode = 15 | 30 | 45;

export type Team = 'A' | 'B';

export type TrucoCall = 'truco' | 'retruco' | 'vale4' | null;

export type EnvidoCall = 'envido' | 'realEnvido' | 'faltaEnvido' | null;

export interface GameState {
  teamAPoints: number;
  teamBPoints: number;
  gameMode: GameMode;
  currentServer: Team;
  trucoCall: TrucoCall;
  envidoCall: EnvidoCall;
  trucoAcceptedBy: Team | null;
  envidoPoints: { teamA: number; teamB: number } | null;
  matchWinner: Team | null;
}

export interface GameActions {
  addPoints: (team: Team, points: number) => void;
  subtractPoints: (team: Team, points: number) => void;
  setGameMode: (mode: GameMode) => void;
  changeServer: () => void;
  callTruco: () => void;
  acceptTruco: (team: Team) => void;
  rejectTruco: () => void;
  callEnvido: (call: EnvidoCall) => void;
  acceptEnvido: () => void;
  rejectEnvido: () => void;
  calculateEnvidoWinner: () => Team | null;
  resetGame: () => void;
  resetMatch: () => void;
}
