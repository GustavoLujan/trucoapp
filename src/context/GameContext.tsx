import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameActions, Team, GameMode, TrucoCall, EnvidoCall } from '../types';

const initialState: GameState = {
  teamAPoints: 0,
  teamBPoints: 0,
  gameMode: 30,
  currentServer: 'A',
  trucoCall: null,
  envidoCall: null,
  trucoAcceptedBy: null,
  envidoPoints: null,
  matchWinner: null,
};

type GameAction =
  | { type: 'ADD_POINTS'; team: Team; points: number }
  | { type: 'SUBTRACT_POINTS'; team: Team; points: number }
  | { type: 'SET_GAME_MODE'; mode: GameMode }
  | { type: 'CHANGE_SERVER' }
  | { type: 'CALL_TRUCO'; call: TrucoCall }
  | { type: 'ACCEPT_TRUCO'; team: Team }
  | { type: 'REJECT_TRUCO' }
  | { type: 'CALL_ENVIDO'; call: EnvidoCall }
  | { type: 'ACCEPT_ENVIDO' }
  | { type: 'REJECT_ENVIDO' }
  | { type: 'SET_ENVIDO_POINTS'; teamA: number; teamB: number }
  | { type: 'SET_MATCH_WINNER'; team: Team }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_MATCH' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_POINTS': {
      const newPoints = action.team === 'A'
        ? { teamAPoints: state.teamAPoints + action.points, teamBPoints: state.teamBPoints }
        : { teamBPoints: state.teamBPoints + action.points, teamAPoints: state.teamAPoints };
      
      const winner = newPoints.teamAPoints >= state.gameMode ? 'A' 
                   : newPoints.teamBPoints >= state.gameMode ? 'B' 
                   : null;
      
      return {
        ...state,
        ...newPoints,
        matchWinner: winner,
        trucoCall: winner ? null : state.trucoCall,
        trucoAcceptedBy: winner ? null : state.trucoAcceptedBy,
        envidoCall: winner ? null : state.envidoCall,
      };
    }
    
    case 'SUBTRACT_POINTS': {
      const newPoints = action.team === 'A'
        ? { teamAPoints: Math.max(0, state.teamAPoints - action.points), teamBPoints: state.teamBPoints }
        : { teamBPoints: Math.max(0, state.teamBPoints - action.points), teamAPoints: state.teamAPoints };
      return { ...state, ...newPoints };
    }
    
    case 'SET_GAME_MODE':
      return { ...state, gameMode: action.mode };
    
    case 'CHANGE_SERVER':
      return { ...state, currentServer: state.currentServer === 'A' ? 'B' : 'A' };
    
    case 'CALL_TRUCO':
      return { ...state, trucoCall: action.call };
    
    case 'ACCEPT_TRUCO':
      return { ...state, trucoAcceptedBy: action.team };
    
    case 'REJECT_TRUCO': {
      const rejectingTeam = state.currentServer;
      return {
        ...state,
        trucoCall: null,
        trucoAcceptedBy: null,
        teamAPoints: rejectingTeam === 'B' ? state.teamAPoints + 1 : state.teamAPoints,
        teamBPoints: rejectingTeam === 'A' ? state.teamBPoints + 1 : state.teamBPoints,
      };
    }
    
    case 'CALL_ENVIDO':
      return { ...state, envidoCall: action.call };
    
    case 'ACCEPT_ENVIDO':
      return { ...state };
    
    case 'REJECT_ENVIDO':
      return { ...state, envidoCall: null };
    
    case 'SET_ENVIDO_POINTS':
      return { ...state, envidoPoints: { teamA: action.teamA, teamB: action.teamB } };
    
    case 'SET_MATCH_WINNER':
      return { ...state, matchWinner: action.team };
    
    case 'RESET_GAME':
      return { ...initialState, gameMode: state.gameMode };
    
    case 'RESET_MATCH':
      return initialState;
    
    default:
      return state;
  }
}

const GameContext = createContext<(GameState & GameActions) | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const actions: GameActions = {
    addPoints: (team, points) => dispatch({ type: 'ADD_POINTS', team, points }),
    subtractPoints: (team, points) => dispatch({ type: 'SUBTRACT_POINTS', team, points }),
    setGameMode: (mode) => dispatch({ type: 'SET_GAME_MODE', mode }),
    changeServer: () => dispatch({ type: 'CHANGE_SERVER' }),
    callTruco: () => {
      const nextCall: TrucoCall = state.trucoCall === null ? 'truco' 
        : state.trucoCall === 'truco' ? 'retruco' 
        : state.trucoCall === 'retruco' ? 'vale4' : null;
      if (nextCall) dispatch({ type: 'CALL_TRUCO', call: nextCall });
    },
    acceptTruco: (team) => dispatch({ type: 'ACCEPT_TRUCO', team }),
    rejectTruco: () => dispatch({ type: 'REJECT_TRUCO' }),
    callEnvido: (call) => dispatch({ type: 'CALL_ENVIDO', call }),
    acceptEnvido: () => dispatch({ type: 'ACCEPT_ENVIDO' }),
    rejectEnvido: () => dispatch({ type: 'REJECT_ENVIDO' }),
    calculateEnvidoWinner: () => {
      if (!state.envidoPoints) return null;
      if (state.envidoPoints.teamA > state.envidoPoints.teamB) return 'A';
      if (state.envidoPoints.teamB > state.envidoPoints.teamA) return 'B';
      return state.currentServer;
    },
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
    resetMatch: () => dispatch({ type: 'RESET_MATCH' }),
  };

  return (
    <GameContext.Provider value={{ ...state, ...actions }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameState & GameActions {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
