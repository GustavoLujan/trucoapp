import { createInitialState, gameReducer } from '../../src/utils/gameReducer';
import type { GameState } from '../../src/types/game';

describe('gameReducer', () => {
  let initial: GameState;

  beforeEach(() => {
    initial = createInitialState('short');
  });

  describe('createInitialState', () => {
    it('starts with scores at 0', () => {
      expect(initial.nosotros.score).toBe(0);
      expect(initial.ellos.score).toBe(0);
    });

    it('starts with status playing', () => {
      expect(initial.status).toBe('playing');
      expect(initial.winner).toBeNull();
    });

    it('preserves the provided mode', () => {
      const longGame = createInitialState('long');
      expect(longGame.mode).toBe('long');
    });
  });

  describe('ADD_POINTS', () => {
    it('adds 1 point to nosotros', () => {
      const next = gameReducer(initial, { type: 'ADD_POINTS', team: 'nosotros', points: 1 });
      expect(next.nosotros.score).toBe(1);
      expect(next.ellos.score).toBe(0);
    });

    it('adds 2 points to ellos', () => {
      const next = gameReducer(initial, { type: 'ADD_POINTS', team: 'ellos', points: 2 });
      expect(next.ellos.score).toBe(2);
    });

    it('increments roundNumber', () => {
      const next = gameReducer(initial, { type: 'ADD_POINTS', team: 'nosotros', points: 1 });
      expect(next.roundNumber).toBe(1);
    });

    it('clamps score at winning score (15)', () => {
      const state: GameState = { ...initial, nosotros: { ...initial.nosotros, score: 14 } };
      const next = gameReducer(state, { type: 'ADD_POINTS', team: 'nosotros', points: 3 });
      expect(next.nosotros.score).toBe(15);
    });

    it('sets status=won when reaching 15', () => {
      const state: GameState = { ...initial, nosotros: { ...initial.nosotros, score: 14 } };
      const next = gameReducer(state, { type: 'ADD_POINTS', team: 'nosotros', points: 1 });
      expect(next.status).toBe('won');
      expect(next.winner).toBe('nosotros');
    });

    it('does not win at 14 points', () => {
      const state: GameState = { ...initial, nosotros: { ...initial.nosotros, score: 13 } };
      const next = gameReducer(state, { type: 'ADD_POINTS', team: 'nosotros', points: 1 });
      expect(next.status).toBe('playing');
      expect(next.winner).toBeNull();
    });

    it('ellos wins at 15 in long game at 30', () => {
      const longState = createInitialState('long');
      const state: GameState = { ...longState, ellos: { ...longState.ellos, score: 29 } };
      const next = gameReducer(state, { type: 'ADD_POINTS', team: 'ellos', points: 1 });
      expect(next.status).toBe('won');
      expect(next.winner).toBe('ellos');
      expect(next.ellos.score).toBe(30);
    });
  });

  describe('SUBTRACT_POINTS', () => {
    it('subtracts 1 point', () => {
      const state: GameState = { ...initial, nosotros: { ...initial.nosotros, score: 5 } };
      const next = gameReducer(state, { type: 'SUBTRACT_POINTS', team: 'nosotros' });
      expect(next.nosotros.score).toBe(4);
    });

    it('floors at 0', () => {
      const next = gameReducer(initial, { type: 'SUBTRACT_POINTS', team: 'ellos' });
      expect(next.ellos.score).toBe(0);
    });

    it('reverts won status if score drops below winning', () => {
      const wonState: GameState = {
        ...initial,
        nosotros: { ...initial.nosotros, score: 15 },
        status: 'won',
        winner: 'nosotros',
      };
      const next = gameReducer(wonState, { type: 'SUBTRACT_POINTS', team: 'nosotros' });
      expect(next.status).toBe('playing');
      expect(next.winner).toBeNull();
    });
  });

  describe('SET_MODE', () => {
    it('resets scores and switches mode to long', () => {
      const state: GameState = { ...initial, nosotros: { ...initial.nosotros, score: 10 } };
      const next = gameReducer(state, { type: 'SET_MODE', mode: 'long' });
      expect(next.mode).toBe('long');
      expect(next.nosotros.score).toBe(0);
      expect(next.ellos.score).toBe(0);
    });
  });

  describe('NEW_GAME', () => {
    it('resets scores but preserves mode', () => {
      const state: GameState = {
        ...initial,
        mode: 'long',
        nosotros: { ...initial.nosotros, score: 20 },
        ellos: { ...initial.ellos, score: 15 },
        status: 'won',
        winner: 'ellos',
      };
      const next = gameReducer(state, { type: 'NEW_GAME' });
      expect(next.nosotros.score).toBe(0);
      expect(next.ellos.score).toBe(0);
      expect(next.status).toBe('playing');
      expect(next.winner).toBeNull();
      expect(next.mode).toBe('long');
    });
  });
});
