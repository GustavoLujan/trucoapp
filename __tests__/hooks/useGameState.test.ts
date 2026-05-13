import { act, renderHook } from '@testing-library/react-native';
import { useGameState } from '../../src/hooks/useGameState';

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Vibration.vibrate = jest.fn();
  return rn;
});

describe('useGameState', () => {
  it('starts with score 0 for both teams', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.nosotros.score).toBe(0);
    expect(result.current.state.ellos.score).toBe(0);
  });

  it('adds points to nosotros', () => {
    const { result } = renderHook(() => useGameState());
    act(() => result.current.addPoints('nosotros', 2));
    expect(result.current.state.nosotros.score).toBe(2);
  });

  it('detects winner when reaching winningScore', () => {
    const { result } = renderHook(() => useGameState());
    for (let i = 0; i < 15; i++) {
      act(() => result.current.addPoints('ellos', 1));
    }
    expect(result.current.state.status).toBe('won');
    expect(result.current.state.winner).toBe('ellos');
  });

  it('canChangeMode is true at game start', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.canChangeMode).toBe(true);
  });

  it('canChangeMode is false once points are added', () => {
    const { result } = renderHook(() => useGameState());
    act(() => result.current.addPoints('nosotros', 1));
    expect(result.current.canChangeMode).toBe(false);
  });

  it('newGame resets scores and preserves mode', () => {
    const { result } = renderHook(() => useGameState());
    act(() => result.current.setMode('long'));
    act(() => result.current.addPoints('nosotros', 3));
    act(() => result.current.newGame());
    expect(result.current.state.nosotros.score).toBe(0);
    expect(result.current.state.mode).toBe('long');
  });

  it('subtractOne decrements score', () => {
    const { result } = renderHook(() => useGameState());
    act(() => result.current.addPoints('ellos', 2));
    act(() => result.current.subtractOne('ellos'));
    expect(result.current.state.ellos.score).toBe(1);
  });

  it('winningScore is 15 in short mode', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.winningScore).toBe(15);
  });

  it('winningScore is 30 in long mode', () => {
    const { result } = renderHook(() => useGameState());
    act(() => result.current.setMode('long'));
    expect(result.current.winningScore).toBe(30);
  });
});
