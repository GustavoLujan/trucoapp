import type { GameMode, TeamId } from '../types/game';

export const WINNING_SCORES: Record<GameMode, number> = {
  short: 15,
  long: 30,
};

export const TEAM_LABELS: Record<TeamId, string> = {
  nosotros: 'Nosotros',
  ellos: 'Ellos',
};

export const COLORS = {
  green: '#1E5128',
  greenLight: '#27682F',
  chalk: '#F5F0E8',
  chalkDim: '#B8B0A0',
  accent: '#C8A951',
  danger: '#CC3333',
  bg: '#121212',
  surface: '#1E1E1E',
  surfaceAlt: '#2A2A2A',
  text: '#FFFFFF',
  textMuted: '#AAAAAA',
  border: '#333333',
};

export const STORAGE_KEY = '@truco_match_history';
