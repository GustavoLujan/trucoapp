import { useCallback, useReducer } from 'react';
import { Vibration } from 'react-native';
import { WINNING_SCORES } from '../constants/game';
import type { GameMode, TeamId } from '../types/game';
import { createInitialState, gameReducer } from '../utils/gameReducer';

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, createInitialState('short'));

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
  };
}
