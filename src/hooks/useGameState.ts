import { useCallback, useReducer, useState } from 'react';
import { Vibration } from 'react-native';
import { TEAM_LABELS, WINNING_SCORES } from '../constants/game';
import type { GameMode, TeamId } from '../types/game';
import { createInitialState, gameReducer } from '../utils/gameReducer';

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, createInitialState('short'));
  const [teamNames, setTeamNames] = useState<Record<TeamId, string>>({
    nosotros: TEAM_LABELS.nosotros,
    ellos: TEAM_LABELS.ellos,
  });

  const winningScore = WINNING_SCORES[state.mode];

  const addPoints = useCallback((team: TeamId, points: 1 | 2 | 3) => {
    Vibration.vibrate(40);
    dispatch({ type: 'ADD_POINTS', team, points });
  }, []);

  const subtractOne = useCallback((team: TeamId) => {
    dispatch({ type: 'SUBTRACT_POINTS', team });
  }, []);

  const setMode = useCallback((mode: GameMode) => {
    dispatch({ type: 'SET_MODE', mode });
  }, []);

  const newGame = useCallback(() => {
    dispatch({ type: 'NEW_GAME' });
  }, []);

  const setTeamName = useCallback((team: TeamId, name: string) => {
    setTeamNames(prev => ({ ...prev, [team]: name }));
  }, []);

  const canChangeMode =
    state.nosotros.score === 0 && state.ellos.score === 0 && state.status === 'playing';

  return {
    state,
    winningScore,
    addPoints,
    subtractOne,
    setMode,
    newGame,
    canChangeMode,
    teamNames,
    setTeamName,
  };
}
